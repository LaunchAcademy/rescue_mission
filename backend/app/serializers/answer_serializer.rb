class AnswerSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :body

  has_one :user
  has_one :question
end
