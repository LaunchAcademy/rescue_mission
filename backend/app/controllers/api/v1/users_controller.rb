module API::V1
  class UsersController < ApplicationController
    def index
      users = User.limit(20)
      users = users.where(role: params[:role]) if params[:role]

      render json: users
    end

    def show
      user = User.find(params[:id])

      authorize user

      render json: user
    end
  end
end
