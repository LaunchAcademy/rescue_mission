module API::V1
  class AnswersController < ApplicationController
    def index
      @answers = Answer.includes(:user, :question).order(created_at: :desc).limit(25)
      @answers = @answers.where(id: params[:ids]) if params[:ids]

      render json: @answers, include: [:user]
    end
  end
end
