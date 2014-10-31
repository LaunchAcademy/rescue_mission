module API::V1
  class AuthenticationsController < ApplicationController
    skip_after_action :verify_authorized, only: [:create]

    def create
      authentication = Authentication.new(params)

      if authentication.save
        render json: authentication.api_key, status: :created
      else
        render json: { errors: { broken: 'it is, for sure.' } },
          status: :unprocessable_entity
      end
    end
  end
end
