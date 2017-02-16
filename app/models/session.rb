class Session
  include ActiveModel::Model

  attr_accessor :username, :password

  validates :username, :password, presence: true
  validate :authenticate

  def authenticate
    if !username.blank? && !password.blank?
      if !user || !user.authenticate(password)
        errors.add :username, '用户名或密码错误'
      end
    end
  end

  def user
    User.where("mobile = :username OR email = :username", {username: username}).first
  end
end
