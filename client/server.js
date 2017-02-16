var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3001
app.listen(port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//signin api
app.post('/sessions', function(req, res) {
  if (req.body.session.username == 'admin' && req.body.session.password == 'admin') {
    res.json({status: 1, url: '/'})
  }
  else {
    res.json({status: 0, message: '用户名或者密码错误'})
  }
})

//get menu api
app.get('/api/menus', function(req, res) {
  res.json([
    {
      id: 1,
      name: '登录页面',
      parent_id: '',
      url: 'login.html',
      sort: 0
    },
    {
      id: 2,
      name: '通用页面',
      parent_id: '',
      url: '',
      sort: 0
    },
    {
      id: 3,
      name: '列表页面',
      parent_id: 2,
      url: 'list.html?id=user',
      sort: 0
    },
    {
      id: 4,
      name: '列表2页面',
      parent_id: 2,
      url: 'list.html?id=customer',
      sort: 0
    }
  ])
})

//get object data api
app.get('/api/object/:id', function(req, res) {
  var data = {
    user: {
      id: 'user',
      name: '用户',
      operations: [
        {
          id: 'new',
          name: '创建',
          url: '/api/object/new/user'
        },
        {
          id: 'import',
          name: '导入',
          url: '/api/object/import/user'
        },
        {
          id: 'test',
          name: '测试',
          url: '/test',
          method: 'post'
        }
      ],
      list_attributes: [
        {
          id: 'name',
          name: '姓名'
        },
        {
          id: 'mobile',
          name: '电话'
        },
        {
          id: 'status',
          name: '状态'
        }
      ]
    },
    customer: {
      id: 'customer',
      name: '客户',
      list_attributes: [
        {
          id: 'name',
          name: '名称'
        },
        {
          id: 'address',
          name: '地址'
        },
        {
          id: 'leader',
          name: '负责人'
        },
        {
          id: 'created_at',
          name: '创建时间'
        }
      ]
    }
  }
  if (req.params.id !== '' && data[req.params.id]) {
    res.json({object: data[req.params.id]})
  }
  else {
    res.json({status: 0, error: '参数错误'})
  }
})

//get object list data api
app.get('/api/object/list/:id', function(req, res) {
  var data = {
    user: {
      items: [
        {
          id: 1,
          name: '张三',
          mobile: '1234567890',
          status: 1
        },
        {
          id: 2,
          name: '李四',
          mobile: '1234567890',
          status: 0
        },
        {
          id: 3,
          name: '王二',
          mobile: '1234567890',
          status: 1
        }
      ],
      page: {
        total_page: 1,
        total_count: 3,
        items: [
          {
            name: '上一页',
            url: '/api/object/list/user?page=1',
          },
          {
            name: '1',
            url: '/api/object/list/user?page=1',
          },
          {
            name: '2',
            url: '/api/object/list/user?page=2',
          },
          {
            name: '下一页',
            url: '/api/object/list/user?page=3',
          }
        ]
      }
    },
    customer: {
      items: [
        {
          id: 1,
          name: '南京客户1有限公司',
          address: '南京江宁区龙眠大道',
          leader: 1,
          created_at: '2016-5-6 18:34:00'
        },
        {
          id: 2,
          name: '南京客户2有限公司',
          address: '南京鼓楼区',
          leader: 2,
          created_at: '2016-5-6 18:34:00'
        }
      ],
      page: {
        total_page: 1,
        total_count: 3,
        items: [
          {
            name: '上一页',
            url: '/api/object/list/customer?page=1',
          },
          {
            name: '1',
            url: '/api/object/list/customer?page=1',
          },
          {
            name: '2',
            url: '/api/object/list/customer?page=2',
          },
          {
            name: '下一页',
            url: '/api/object/list/customer?page=3',
          }
        ]
      }
    }
  }
  if (req.params.id !== '' && data[req.params.id]) {
    res.json({data: data[req.params.id]})
  }
  else {
    res.json({status: 0, error: '参数错误'})
  }
})

// 返回对象新增所需的接口数据
app.get('/api/object/new/:id', function(req, res) {
  var data = {
    user: {
      attributes: [
        {
          id: 'base',
          name: '基本信息',
          attributes: [
            {
              id: 'name',
              name: '姓名',
              type: {
                id: 'text'
              }
            },
            {
              id: 'age',
              name: '年龄',
              type: {
                id: 'text'
              }
            },
            {
              id: 'sex',
              name: '性别',
              type: {
                id: 'text'
              }
            },
            {
              id: 'height',
              name: '身高',
              type: {
                id: 'text'
              }
            },
            {
              id: 'weight',
              name: '体重',
              type: {
                id: 'text'
              }
            }
          ]
        },
        {
          id: 'other',
          name: '其他信息',
          attributes: [
            {
              id: 'remark',
              name: '备注',
              type: {
                id: 'textarea',
                separateLine: true
              }
            }
          ]
        }
      ]
    }
  }
  if (req.params.id !== '' && data[req.params.id]) {
    res.json({form: data[req.params.id]})
  }
  else {
    res.json({status: 0, error: '参数错误'})
  }
})
