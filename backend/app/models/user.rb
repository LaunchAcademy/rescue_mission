class User < ActiveRecord::Base
  has_many :answers, dependent: :destroy
  has_many :assigned_questions, class_name: "Question", inverse_of: :assignee
  has_many :api_keys, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :questions, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true
  validates :role, presence: true, inclusion: { in: %w(member admin) }
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :username, presence: true, uniqueness: true

  def admin?
    role == 'admin'
  end

  def self.find_or_create_from_oauth!(oauth)
    find_by(uid: oauth.uid, provider: oauth.provider) || create_from_oauth!(oauth)
  end

  def self.create_from_oauth!(oauth)
    create!(attributes_from_oauth(oauth))
  end

  def self.attributes_from_oauth(oauth)
    {
      email: oauth.email,
      provider: oauth.provider,
      uid: oauth.uid,
      username: oauth.username
    }
  end
end
