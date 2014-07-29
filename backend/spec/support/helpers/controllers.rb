module Helpers
  module Controllers
    def mock_authentication_with(api_key)
      request.env['HTTP_AUTHORIZATION'] = "Bearer #{api_key.access_token}"
    end

    def json
      @json ||= JSON.parse(response.body)
    end
  end
end
