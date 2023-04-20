---
category:
  - Extension
tag:
  - Maven
---

# Maven

[参考](https://www.cnblogs.com/lenve/p/12047793.html)

[中央仓库](https://mvnrepository.com/)

## 仓库

设置远程阿里镜像仓库

我电脑IDEA默认Maven目录 `F:\IntelliJ IDEA 2022.1\plugins\maven\lib\maven3`

cong\settings.xml

```xml
    <mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>*</mirrorOf>
      <name>Nexus aliyun</name>
      <url>https://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
```

### 修改依赖下载路径

```xml
<localRepository>F:\Maven\repository</localRepository>
```
  
## 多模块依赖

## 依赖范围
