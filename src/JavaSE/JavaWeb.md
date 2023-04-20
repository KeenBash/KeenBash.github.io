---
category:
  - JavaSE
tag:
  - JavaWeb
---

# JavaWeb

- [JavaWeb](#javaweb)
  - [Servlet](#servlet)
  - [Filter](#filter)
  - [JDBC](#jdbc)
    - [原生jdbc](#原生jdbc)
    - [SqlSessionFactory](#sqlsessionfactory)
  - [邮件发送](#邮件发送)
  - [文件](#文件)

## Servlet

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/school"/>
                <property name="username" value="root"/>
                <property name="password" value="80root"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper class="com.example.mapper.AccountMapper"/>
    </mappers>
</configuration>
```

AccountMapper.java

```java
public interface AccountMapper {

    @Select("select * from account where user = #{user} and pwd = #{pwd}")
    Account getAccount(@Param("user") String user, @Param("pwd") String pwd);
}
```

LoggingServlet.java

```java
@WebServlet("/login")
public class LogginServlet extends HttpServlet {

    private SqlSessionFactory factory;

    @Override
    public void init() {
        // 初始化数据库连接配置
        try {
            factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Cookie直接访问
        Cookie[] cookies = req.getCookies();
        // 无Cookie
        if (cookies == null) {
            req.getRequestDispatcher("/").forward(req, resp);
            return;
        }
        // 有Cookie
        String user = null;
        String pwd = null;
        for (Cookie cookie : cookies) {
            if ("user".equals(cookie.getName())) {
                user = cookie.getValue();
            }
            if ("pwd".equals(cookie.getName())) {
                pwd = cookie.getValue();
            }
        }
        // 密码匹配上
        if (user != null && pwd != null) {
            try (SqlSession sqlSession = factory.openSession(true)) {
                AccountMapper userMapper = sqlSession.getMapper(AccountMapper.class);
                Account account = userMapper.getAccount(user, pwd);
                if (account != null) {
                    HttpSession session = req.getSession();
                    session.setAttribute("account", account);
                    resp.sendRedirect("time");
                } else {
                    // 账号为空
                    Cookie cookieUser = new Cookie("user", user);
                    cookieUser.setMaxAge(0);
                    Cookie cookiePwd = new Cookie("pwd", pwd);
                    cookiePwd.setMaxAge(0);
                    resp.addCookie(cookieUser);
                    resp.addCookie(cookiePwd);
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // post登录
        resp.setContentType("text/html;charset=UTF-8");
        Map<String, String[]> map = req.getParameterMap();
        if (map.containsKey("user") && map.containsKey("pwd")) {
            String user = req.getParameter("user");
            String pwd = req.getParameter("pwd");

            try (SqlSession sqlSession = factory.openSession(true)) {
                AccountMapper userMapper = sqlSession.getMapper(AccountMapper.class);
                Account account = userMapper.getAccount(user, pwd);

                if (account != null) {
                    // 判断是否勾选记住我
                    if (map.containsKey("remember-me")) {
                        // 使用Cookie保存信息
                        Cookie cookieUser = new Cookie("user", user);
                        cookieUser.setMaxAge(30);
                        Cookie cookiePwd = new Cookie("pwd", pwd);
                        cookiePwd.setMaxAge(30);
                        resp.addCookie(cookieUser);
                        resp.addCookie(cookiePwd);
                    }
                    HttpSession session = req.getSession();
                    session.setAttribute("account", account);
                    // 登录成功
                    resp.sendRedirect("time");
                } else {
                    resp.getWriter().write("false");
                }
            }
        } else {
            resp.getWriter().write("error");
        }
    }
}

```

## Filter

```java
@WebFilter("/*")
public class MainFilter extends HttpFilter {
    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        System.out.println("main");
        String url = req.getRequestURL().toString();
        // 设置资源过滤
        if (!url.endsWith(".js") && !url.endsWith(".css") && !url.endsWith(".jpg")) {
            HttpSession session = req.getSession();
            Account account = (Account) session.getAttribute("account");
            // 判断账号访问
            if (account == null && !url.endsWith("login")) {
                res.sendRedirect("login");
                return;
            }
        }
        chain.doFilter(req, res);
    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
```

## JDBC

### 原生jdbc

```java
public class DataConnect {

    public static void main(String[] args) {
        String url = "jdbc:mysql://192.168.73.130:3306/school";
        String user = "root";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            connection.setAutoCommit(false);
            Statement statement = connection.createStatement();

            // 结果集遍历
            // 使用拼接语句
            String sql1 = "select * from student where sid = " + "1";
            ResultSet set = statement.executeQuery(sql1);
            while (set.next()) {
                System.out.println(set.getString(1) + set.getString(2) + set.getString(3));
            }

            // 预编译SQL语句的对象
            // 防止SQL注入
            // 使用?占位，通过set指定值
            String sql2 = "select * from student where sid % 2 = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.setInt(1, 1);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<Student> students = new ArrayList<>();
            while (resultSet.next()) {
                students.add(new Student(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3)));
            }
            students.forEach(System.out::println);

            // savepoint
            // 事件回滚
            // 记得先设置关闭自动提交事务
            statement.executeUpdate("insert into student(name, sex) values('老5', '男')");
            Savepoint savepoint = connection.setSavepoint();
            statement.executeUpdate("insert into student(name, sex) values('老6', '男')");
            // 回滚到savepoint
            connection.rollback(savepoint);
            // 手动提交事务
            connection.commit();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

### SqlSessionFactory

连接工具

```java
public class MybatisUtil {

    private MybatisUtil() {
    }

    private static final SqlSessionFactory FACTORY;

    static {
        try {
            FACTORY = new SqlSessionFactoryBuilder()
                    .build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static SqlSession getSession(boolean autoCommit) {
        return FACTORY.openSession(autoCommit);
    }
}
```

使用

```java
try(SqlSession sqlSession = MybatisUtil.getSession(false)){
    TestMapper mapper = sqlSession.getMapper(TestMapper.class);
    // 操作
    sqlSession.commit();
}
```

## 邮件发送

pom

```xml
<dependency>
    <groupId>javax.mail</groupId>
    <artifactId>mail</artifactId>
    <version>1.4.7</version>
</dependency>
```

```java
public class MailAuthentic {

    public static void send(int code, String email) throws Exception {
        String host = "smtp.qq.com";
        String sender = "2047604092@qq.com";
        String password = "whwqieuucgaybcec";

        // 连接QQ邮箱服务器
        Properties properties = new Properties();
        properties.setProperty("mail.host", host);
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.auth", "true");

        // ssl验证
        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.ssl.socketFactory", sf);


        // 验证
        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }
        });

        // 开启debug调试消息
        session.setDebug(true);

        Transport transport = session.getTransport();
        transport.connect(host, sender, password);

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(sender));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        // 标题
        message.setSubject("注册验证码");
        // 内容
        message.setContent("验证码:" + code, "text/html;charset=utf-8");

        transport.sendMessage(message, message.getAllRecipients());
        transport.close();

    }
}
```

## 文件

```java
@WebServlet("/do-file")
@MultipartConfig
public class DoFileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 下载文件
        String filename = req.getParameter("filename");
        String path = "D:\\upload\\" + filename;
        resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
        OutputStream outputStream = resp.getOutputStream();
        InputStream inputStream = Files.newInputStream(Paths.get(path));
        IOUtils.copy(inputStream, outputStream);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 上传文件
        Part part = req.getPart("filename");
        part.write("D:\\upload\\" + part.getSubmittedFileName());


        // try (FileOutputStream stream = new FileOutputStream("D:\\upload\\" + part.getSubmittedFileName())) {
        //     IOUtils.copy(part.getInputStream(), stream);
        // }

        resp.sendRedirect("file");
    }
}
```
