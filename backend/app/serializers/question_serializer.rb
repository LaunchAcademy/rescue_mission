class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_accept_answer,
    :can_assign,
    :can_edit,
    :status,
    :title

  has_one :accepted_answer
  has_one :assignee
  has_one :user

  has_many :answers
  has_many :comments

  def can_accept_answer
    policy.accept_answer?
  end

  def can_assign
    policy.assign?
  end

  def can_edit
    policy.edit?
  end

  private

  def policy
    Pundit.policy!(scope, object)
  end
end
