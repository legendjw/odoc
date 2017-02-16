require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user_data = {
      name: 'new_user',
      email: 'new_user@duixiangyun.com',
      mobile: '12398764736',
      password: '123456'
    }
    @user = User.new(@user_data)

    @organization_data = {name: 'new_organization'}
    @organization = Organization.new(@organization_data)
  end
 
  def teardown
    @user = nil
  end

  test "should get signup" do
    get signup_url
    assert_response :success
  end

  test "signup with wrong fields" do
    post signup_url, params: {organization: {name: ''}, user: @user_data}, headers: {Accept: "application/json"}
    assert_response :unprocessable_entity
  end

  test "signup with correct fields" do
    assert_difference ['Organization.count', 'User.count'] do
      post signup_url, params: {organization: @organization_data, user: @user_data}, headers: {Accept: "application/json"}
      assert_response :created
      assert @controller.signed_in?
    end
  end
end
