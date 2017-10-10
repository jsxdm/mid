# mid
	- 用nodejs开发的一套基于URI的 MVC 框架，适用于前后端分离项目。
	- 采用 MVC 架构，运用nodejs + es6(7) + component + less
	- 如果使用 PM2 来部署，并且开启了PM2的cluster("exec_mode": "cluster") 模式，那么就cpuNums=1就好。

## 框架介绍及使用方法
详细查看[DOC.md](https://github.com/xudeming208/mid/blob/master/DOC.md)


## Usage
1. sudo npm install -g pm2
2. sudo npm install -g midc (midc是mid框脚手架)
3. midc init (midc -h; midc -v)
	- 默认打开的是H5页, 如果想看PC页，请修改配置

## Nginx
* 绑定host `host` => sudo vi /etc/hosts，如下：

```javascript
127.0.0.1 h5.fedevot.test.com pc.fedevot.test.com
```
* 安装 `nginx` 然后配置如下：

```javascript
server {
    listen 80;
    server_name *.fedevot.test.com;
    location / {
    	proxy_set_header Host               $http_host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8083;
    }
}
```

**ps:**
	当然你也可以以80端口启动node服务，然后用sudo启动，但是不推荐这样。

## 配置文件相关说明

### defaultPage：
	- 表示用真实IP地址（不是127.0.0.1或者localhost）访问的页面（PC or H5）,默认为H5

### defaultMod：
	- 表示默认查找controller的JS文件

### server：
	- 表示的是response headers中的server字段

### apiTimeOut：
	- 表示访问接口的超时时间

### merge（未完成）：
	- 表示是否合并CSS和JS；

### debug：
	- 此字段为true时：HTML、CSS和JS不压缩，静态资源不缓存（包括内存的缓存及浏览器的缓存）；

### 生产环境：
	- 生产环境下，应该是先merge和compress静态资源，然后传至CDN；
	- ~~生产环境下，运行npm run build；~~
	- ~~开发环境下，运行npm run dev；~~

## FAQ
* 查看[DOC.md](https://github.com/xudeming208/mid/blob/master/DOC.md)
* Contact me: `xudeming208@126.com`
