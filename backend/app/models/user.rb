class User < ActiveRecord::Base
  has_many :api_keys, dependent: :destroy

  validates :email, presence: true
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :username, presence: true
end
