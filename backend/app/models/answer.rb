class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  has_many :comments, as: :commentable, dependent: :destroy

  validates :body, length: { in: 30..10000 }
  validates :question, presence: true
  validates :user, presence: true
end
