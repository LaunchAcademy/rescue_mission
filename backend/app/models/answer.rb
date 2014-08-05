class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  validates :body, length: { in: 30..10000 }
  validates :accepted, uniqueness: true, if: :accepted
  validates :question, presence: true
  validates :user, presence: true
end
