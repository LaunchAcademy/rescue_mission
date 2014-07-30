class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_edit,
    :title

  has_one :user

  def can_edit
    object.user == scope
  end
end
