class Authentication
  attr_accessor :api_key, :user

  def initialize(params)
    @params = params
  end

  def save
    find_or_create_user!
    find_or_create_api_key!

    valid?
  end

  def valid?
    user.present? && api_key.present?
  end

  private
  def oauth_info
    @oauth_info = OAuthInfoHash.new(@params[:code]).fetch
  end

  def find_or_create_user!
    @user ||= User.find_or_create_from_oauth!(oauth_info)
  end

  def find_or_create_api_key!
    @api_key ||= user.api_keys.first_or_create!
  end
end
