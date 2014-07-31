class AnswerSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :body, :can_edit

  has_one :user
  has_one :question

  def can_edit
    object.user == scope
  end
end
