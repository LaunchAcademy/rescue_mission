class Question < ActiveRecord::Base
  belongs_to :user

  has_many :answers, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy

  validates :body, length: { in: 30..10000 }
  validates :title, length: { in: 15..150 }
  validates :user, presence: true
end
