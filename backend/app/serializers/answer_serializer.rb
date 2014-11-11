class AnswerSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :body, :can_edit, :is_accepted

  has_one :user
  has_one :question

  has_many :comments

  def can_edit
    policy.edit?
  end

  def is_accepted
    object.question.accepted_answer == object
  end

  private

  def policy
    Pundit.policy!(scope, object)
  end
end
