class APIKeySerializer < ActiveModel::Serializer
  attributes :access_token

  def include_access_token?
    current_user == object.user
  end
end
