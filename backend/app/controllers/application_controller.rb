class ApplicationController < ActionController::API
  protected
  def api_key
    @access_token ||= APIKey.from_request(request)
  end

  def current_user
    api_key.user if api_key
  end
end
