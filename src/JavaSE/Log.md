---
category:
  - JavaSE
tag:
  - Log
---

# 日志系统

## Logback

logback日志

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="60 seconds" debug="false">
    <!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径-->
    <property name="LOG_HOME" value="路径" />

    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!--输出日志文件-->
    <appender name="logbackFile" class="ch.qos.logback.core.FileAppender">
        <file>${LOG_HOME}/logbackFile.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!--滚动日志文件-->
    <!--文件日志， 按照每天生成日志文件 -->
    <appender name="logbackRollFile" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/logbackRollFile-%d{yyyy-MM-dd}.%i.log</FileNamePattern>

            <MaxHistory>30</MaxHistory>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <!--日志文件最大的大小-->
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
        <encoder>
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <logger name="LogbackTest" level="warn" />

    <!-- 日志输出级别 -->
    <root level="WARN">
        <appender-ref ref="STDOUT" />
<!--        <appender-ref ref="logbackRollFile" />-->
<!--        <appender-ref ref="logbackFile" />-->
    </root>

</configuration>

```

## Log4j

log4j日志

```properties
# 定义根: log4j.rootLogger = [ level ] , appenderName
log4j.rootLogger=DEBUG, console
# console 将日志输出到控制台
# logfile 将日志输出到文件中

################# 屏蔽输出 ################
# log4j.logger.包名设置日志输出等级，优先级高于rootLogger
log4j.logger.org.springframework=ERROR
log4j.logger.org.mybatis.spring=ERROR
log4j.logger.org.apache.ibatis=ERROR
log4j.logger.com.zaxxer.hikari=ERROR


################# 控制台 ################
log4j.appender.console=org.apache.log4j.ConsoleAppender
# 使用流的形式输出到控制台
log4j.appender.console.Target=System.out
# 输出DEBUG以上级别
log4j.appender.console.Threshold=DEBUG
# 配置console设置为自定义布局模式
log4j.appender.console.layout=org.apache.log4j.PatternLayout
# 配置console日志的输出格式
# %r耗费毫秒数 %p日志的优先级 %t线程名 %C所属类名通常为全类名 %L代码中的行号 %x线程相关联的NDC %m日志 %n换行
log4j.appender.console.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n


################# 滚动日志 ################
# RollingFileAppender文件大小到达指定尺寸的时候产生新的日志文件
log4j.appender.fileLog=org.apache.log4j.RollingFileAppender
# 保存编码格式
log4j.appender.fileLog.Encoding=UTF-8
# 输出DEBUG以上级别
log4j.appender.fileLog.Threshold=DEBUG
# 输出文件位置
log4j.appender.fileLog.File=F:/myLog.log
# 后缀可以是KB, MB, GB达到该大小后创建新的日志文件
log4j.appender.fileLog.MaxFileSize=1MB
# 设置追加写
log4j.appender.fileLog.File.Append=true
# 设置滚动文件的索引最大值3，指可以产生log, log.1, log.2, log.3, 四个日志文件
log4j.appender.fileLog.MaxBackupIndex=5
# 配置fileLog为自定义布局模式
log4j.appender.fileLog.layout=org.apache.log4j.PatternLayout
log4j.appender.fileLog.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
```
