module API::V1
  class CommentsController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create, :update]

    def index
      @comments = Comment.order(created_at: :desc).limit(25)
      @comments = @comments.where(id: params[:ids]) if params[:ids]

      render json: @comments, include: [:user]
    end
  end
end
