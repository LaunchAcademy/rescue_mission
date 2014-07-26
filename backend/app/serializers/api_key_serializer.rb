class APIKeySerializer < ActiveModel::Serializer
  embed :ids

  attributes :access_token

  has_one :user
end
