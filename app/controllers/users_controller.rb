class UsersController < ApplicationController
  before_action :set_object, only: [:object, :index]
  skip_before_action :require_sign_in, only: [:signup]

  def object
    respond_to do |format|
      format.any(:xml, :json) { render request.format.to_sym => @object }
    end
  end

  def index
    render && return if request.format == :html

    @models = User.page(params[:page])
    data = {items: [], page: paginate(models: @models)}

    @models.each do |model|
      item = {id: model.id}
      @object[:list_attributes].each { |attribute| item[attribute[:id]] = model[attribute[:id]] }
      data[:items].push item
    end

    respond_to do |format|
      format.any(:xml, :json) { render request.format.to_sym => data }
    end
  end

  def new
    form = {
      attributes: [
        {
          id: 'base',
          name: '基本信息',
          model: 'user',
          attributes: [
            {
              id: 'name',
              name: '姓名',
              type: {
                id: 'text'
              }
            },
            {
              id: 'email',
              name: '邮箱',
              type: {
                id: 'text'
              }
            },
            {
              id: 'mobile',
              name: '手机号',
              type: {
                id: 'text'
              }
            },
            {
              id: 'status',
              name: '状态',
              type: {
                id: 'radio',
                options: {
                  '1': '正常',
                  '0': '禁用'
                }
              }
            }
          ]
        }
      ]
    }

    respond_to do |format|
      format.any(:xml, :json) { render request.format.to_sym => form }
    end
  end

  def signup
    render && return if request.format == :html

    @organization = Organization.new organization_params
    @user = User.new user_params
    args = errors = {}
    format_sym = request.format.to_sym

    if @organization.invalid?
      errors['organization'] = @organization.errors.messages
    end
    if @user.invalid?
      errors['user'] = @user.errors.messages
    end

    if errors.blank?
      result = User.transaction do
        @organization.save!
        @user.save!
        @user.organizations << @organization
        sign_in @user
      end
      args = result ?
        {status: :created, location: root_url, format_sym => {message: '创建成功'}} :
        {status: :internal_server_error, format_sym => {message: '提交事务失败'}}
    else
      args = {status: :unprocessable_entity, format_sym => {message: '验证失败', errors: errors}}
    end

    respond_to do |format|
      format.any(:xml, :json) { render args }
    end
  end

  private
    def organization_params
      params.require(:organization).permit(:name)
    end

    def user_params
      params.require(:user).permit(:mobile, :email, :name, :password)
    end

    def set_object
      @object = {
        id: 'user',
        name: '用户',
        path: 'users',
        operations: [
          {
            id: 'new',
            name: '创建',
            url: new_user_path(format: :json)
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
            id: 'email',
            name: '邮箱'
          },
          {
            id: 'status',
            name: '状态'
          },
          {
            id: 'created_at',
            name: '创建时间'
          }
        ]
      }
    end
end
