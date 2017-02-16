class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :organizations

  before_save { self.email = email.downcase }

  validates :name, :mobile, :email, presence: true
  validates :mobile, :email, uniqueness: { case_sensitive: false }
  validates :email, email: true
  validates :password, length: { minimum: 6 }, allow_blank: true
end
