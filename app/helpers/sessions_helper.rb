module SessionsHelper
  SIGNED_IN_BACK_URL = :signed_in_back_url
  CURRENT_USER_ID = :current_user_id

  # 检测是否登录，若未登录则记录当前位置跳转到登录页面
  def require_sign_in
    unless signed_in?
      store_signed_in_back_url
      redirect_to signin_url, notice: "请登录"
    end
  end

  def sign_in(user)
    session[CURRENT_USER_ID] = user.id
    current_user = user
  end

  def signed_in?
    !current_user.nil?
  end

  def current_user
    @current_user = User.find session[CURRENT_USER_ID] if session.key? CURRENT_USER_ID
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user?(user)
    user = current_user
  end

  def sign_out
    session.delete CURRENT_USER_ID
    current_user = nil
  end

  # 存储登陆后需要回跳的地址
  def store_signed_in_back_url(url = nil)
    if url.nil?
      url = request.get? ? request.url : root_url
    end

    session[SIGNED_IN_BACK_URL] = url
  end

  # 跳转到登录前记录的回跳地址
  def redirect_signed_in_back_url(default)
    redirect_to(signed_in_back_url || default)
  end

  def signed_in_back_url(delete = true)
    back_url = root_url
    if session.key? SIGNED_IN_BACK_URL
      back_url = session[SIGNED_IN_BACK_URL]
      session.delete SIGNED_IN_BACK_URL if delete
    end

    back_url
  end
end
