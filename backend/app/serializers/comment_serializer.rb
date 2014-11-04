class CommentSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_edit,
    :commentable_id,
    :commentable_type

  has_one :user

  def can_edit
    policy.edit?
  end

  private

  def policy
    Pundit.policy!(scope, object)
  end
end
