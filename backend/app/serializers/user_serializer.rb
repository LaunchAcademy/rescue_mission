class UserSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :avatar_url, :username

  has_many :questions

  def avatar_url
    Gravatar.new(object.email).image_url(ssl: true)
  end
end
