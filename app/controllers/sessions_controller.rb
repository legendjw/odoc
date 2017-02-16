class SessionsController < ApplicationController
  skip_before_action :require_sign_in, only: [:new, :create]

  def new
    redirect_to root_url if signed_in?
  end

  def create
    session_model = Session.new session_params
    result = false

    if session_model.valid?
      sign_in session_model.user
      result = true
    end

    args = result ?
    {status: :created, location: signed_in_back_url, request.format.to_sym => {message: '登录成功'}} :
    {status: :unprocessable_entity, request.format.to_sym => {message: '验证失败', 'errors': session_model.errors}}
    
    respond_to do |format|
      format.any(:xml, :json) { render args }
    end
  end

  def destroy
    sign_out if signed_in?
    redirect_to signin_url
  end

  private
    def session_params
      params.require(:session).permit(:username, :password)
    end
end
