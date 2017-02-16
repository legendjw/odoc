# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

organization = Organization.create(
  name: '对象云'
)

user = User.create(
  name: '管理员', 
  email: 'admin@duixiangyun.com', 
  mobile: '11111111111', 
  password: '123456', 
  password_confirmation: '123456'
)

user.organizations << organization

(1..100).each do |i|
  user = User.create(
    name: "测试#{i}", 
    email: "test#{i}@duixiangyun.com", 
    mobile: 11111111111 + i, 
    password: '123456', 
    password_confirmation: '123456'
  )
  user.organizations << organization
end
