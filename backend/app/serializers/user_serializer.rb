class UserSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :username

  has_many :questions
end
