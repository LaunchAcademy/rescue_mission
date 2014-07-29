class QuestionSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :title, :body

  has_one :user
end
