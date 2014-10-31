module API::V1
  class UsersController < ApplicationController
    after_action :verify_authorized, except: :index

    def show
      user = User.find(params[:id])

      authorize user

      render json: user
    end
  end
end
