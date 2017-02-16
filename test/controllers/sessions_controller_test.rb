require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:user1)
    @user.password = @user.name * 2;
  end
 
  def teardown
    @user = nil
  end

  test "should get signin" do
    get signin_url
    assert_response :success
  end

  test "signin with wrong password" do
    post sessions_path, params: {session: {username: @user.mobile, password: "wrong_password"}}, headers: {Accept: "application/json"}
    assert_response :unprocessable_entity
  end

  test "signin with correct password" do
    post sessions_path, params: {session: {username: @user.mobile, password: @user.password}}, headers: {Accept: "application/json"}
    assert_response :created
    #assert_equal root_url, body["url"]
    assert @controller.signed_in?
    assert @controller.current_user? @user
  end

  test "signout" do
    sign_in_as @user
    delete signout_url
    assert_redirected_to signin_url
    assert_not @controller.signed_in?
  end
end
