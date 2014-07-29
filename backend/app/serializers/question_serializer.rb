class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_edit,
    :title

  has_one :user

  def can_edit
    object.user_id == current_user.id
  end
end
