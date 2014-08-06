class CommentSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_edit,
    :commentable_id,
    :commentable_type

  has_one :user

  def can_edit
    object.user == scope
  end
end
