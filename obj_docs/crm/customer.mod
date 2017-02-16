id: customer
name: 客户
attributes:
  - id: name
    name: 名称
  - id: source
    name: 来源
    type:
      id: radio
      options:
        1: 推广活动
        2: 媒体广告
        3: 电话咨询
        4: 熟人推荐
        5: 其他
  - id: contact
    name: 联系方式
    type: textarea
  - id: address
    name: 地址
  - id: remarks
    name: 备注
