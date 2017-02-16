require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:user1)
  end
 
  def teardown
    @user = nil
  end

  test "validates name presence" do
    @user.name = ""
    assert_not @user.save
    assert_not @user.errors[:name].empty?
  end

  test "validates mobile presence" do
    @user.mobile = ""
    assert_not @user.save
    assert_not @user.errors[:mobile].empty?
  end

  test "validates email presence" do
    @user.email = ""
    assert_not @user.save
    assert_not @user.errors[:email].empty?
  end

  test "validates mobile uniqueness" do
    @user.mobile = "11111111112"
    assert_not @user.save
    assert_not @user.errors[:mobile].empty?

    @user.mobile = "12345678901"
    assert @user.save!
    assert @user.errors[:mobile].empty?
  end

  test "validates email uniqueness" do
    @user.email = "user2@duixiangyun.com"
    assert_not @user.save
    assert_not @user.errors[:email].empty?

    @user.email = "123456789@duixiangyun.com"
    assert @user.save!
    assert @user.errors[:email].empty?
  end

  test "validates email valid" do
    @user.email = "12345"
    assert_not @user.save
    assert_not @user.errors[:email].empty?

    @user.email = "12345@duixiangyun.com"
    assert @user.save!
    assert @user.errors[:email].empty?
  end

  test "validates password length" do
    invalid_password = "12345"
    valid_password = "123456"

    @user.password = invalid_password
    assert_not @user.save
    assert_not @user.errors[:password].empty?

    @user.password = valid_password
    assert @user.save!
    assert @user.errors[:password].empty?
  end

  test "validates password presence" do
    user = {
      name: "user_password",
      email: "user_password@duixiangyun.com",
      mobile: "12345678901",
    }
    password = "123456"

    assert @user.save!, "update user without password will saved"
    assert @user.errors[:password].empty?

    @user = User.new user
    assert_not @user.save, "create user without password will not saved"
    assert_not @user.errors[:password].empty?

    @user.password = password
    @user.password_digest = password
    assert @user.save!, "create user with password will saved"
    assert @user.errors[:password].empty?
  end

  test "user has secure password" do
    new_password = "123456"
    wrong_password = "654321"

    @user.password = new_password
    @user.password_confirmation = new_password
    assert @user.authenticate(new_password)
    assert_not @user.authenticate(wrong_password)
  end

end
