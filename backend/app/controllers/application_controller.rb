class ApplicationController < ActionController::API
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized

  after_action :verify_authorized, except: :index

  protected
  def ensure_valid_api_key!
    api_key || render_unauthorized
  end

  def api_key
    @api_key ||= APIKey.from_request(request)
  end

  def current_user
    api_key.user if api_key
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Bearer realm="Application"'
    render json: { errors: 'Bad credentials' }, status: :unauthorized
  end
end
