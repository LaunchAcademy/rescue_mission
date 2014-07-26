require 'ostruct'

class OAuthInfoHash
  def initialize(auth_code)
    @auth_code = auth_code
  end

  def fetch
    access_token = exchange_auth_code_for_access_token(@auth_code)
    user_info = fetch_user_info(access_token)
    normalized_user_info(user_info)
  end

  private

  def normalized_user_info(user_info)
    OpenStruct.new(
      email: user_info.email,
      provider: 'github',
      uid: user_info.id.to_s,
      username: user_info.login
    )
  end

  def exchange_auth_code_for_access_token(auth_code)
    app_client.exchange_code_for_token(auth_code)
  end

  def fetch_user_info(access_token)
    info = user_client(access_token).user

    if info.email.blank?
      info.email = user_client.emails.find { |e| e.primary }.email
    end

    info
  end

  def app_client
    @app_client ||= Octokit::Client.new(
      client_id: ENV['GITHUB_CLIENT_ID'],
      client_secret: ENV['GITHUB_CLIENT_SECRET']
    )
  end

  def user_client(token)
    @user_client ||= Octokit::Client.new(access_token: token.access_token)
  end
end
