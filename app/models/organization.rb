class Organization < ApplicationRecord
  has_and_belongs_to_many :users

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
end
