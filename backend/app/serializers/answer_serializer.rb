class AnswerSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :body, :can_edit

  has_one :user
  has_one :question

  has_many :comments

  def can_edit
    policy.edit?
  end

  private

  def policy
    Pundit.policy!(scope, object)
  end
end
