# odoc

odoc 是一个基于对象文档描述的通用数据管理系统。

## 安装

```bash
git clone git@github.com:legendjw/odoc.git
cd odoc
bundle install
rails db:create
cd client
npm install
cd ../
foreman start -f Procfile.dev
```

安装完成后打开 [http://localhost:4000/](http://localhost:4000/) 访问系统，系统的前端可以单独访问[http://localhost:5000/](http://localhost:5000/) 

## 所用技术

- React + Redux
- Semantic-UI
- Rails

## Copyright and license

Copyright 2016 legendjw. Code released under [MIT License](http://www.opensource.org/licenses/MIT).
