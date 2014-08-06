class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id,
    :body,
    :can_edit,
    :title,
    :can_accept_answer

  has_one :user

  has_many :answers
  has_many :comments

  def can_edit
    object.user == scope
  end

  def can_accept_answer
    object.user == scope && !object.accepted_answer
  end
end
