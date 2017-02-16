ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  def sign_in_as(user)
    user.password = user.name * 2 if user.password.blank?
    post sessions_path, params: {session: {username: user.mobile, password: user.password}}, headers: {Accept: "application/json"}
  end
end
