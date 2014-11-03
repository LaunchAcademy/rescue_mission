class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_assign,
    :can_edit,
    :title

  has_one :assignee
  has_one :user

  has_many :answers
  has_many :comments

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
