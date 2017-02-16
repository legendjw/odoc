require 'test_helper'

class SessionTest < ActiveSupport::TestCase
  def setup
    @user = users(:user1)
    @user.password = @user.name * 2;

    @session = Session.new username: @user.mobile, password: @user.password
  end
 
  def teardown
    @session = nil
  end

  test "validates username presence" do
    @session.username = ""
    assert_not @session.valid?
    assert_not @session.errors[:username].empty?
  end

  test "validates password presence" do
    @session.password = ""
    assert_not @session.valid?
    assert_not @session.errors[:password].empty?
  end

  test "validates with wrong password" do
    @session.password = "wrong"
    assert_not @session.valid?
    assert_not @session.errors[:username].empty?
  end

  test "validates with correct password" do
    assert @session.valid?
  end
end
