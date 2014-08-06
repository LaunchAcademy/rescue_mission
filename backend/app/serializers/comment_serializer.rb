class CommentSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :body, :commentable_id, :commentable_type

  has_one :user
end
