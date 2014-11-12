class Question < ActiveRecord::Base
  enum status: %w(open answered)

  belongs_to :accepted_answer, class_name: "Answer"
  belongs_to :assignee, class_name: "User"
  belongs_to :user

  has_many :answers, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy

  validate :accepted_answer_belongs_to_question, if: :accepted_answer
  validates :body, length: { in: 30..10000 }
  validates :status, presence: true
  validates :title, length: { in: 15..150 }
  validates :user, presence: true

  private

  def accepted_answer_belongs_to_question
    unless accepted_answer.question == self
      errors.add(:accepted_answer, "must be in response to this question")
    end
  end
end
