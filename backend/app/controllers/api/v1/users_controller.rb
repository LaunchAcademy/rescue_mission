module API::V1
  class UsersController < ApplicationController
    def show
      user = User.find(params[:id])

      authorize user

      render json: user
    end
  end
end
