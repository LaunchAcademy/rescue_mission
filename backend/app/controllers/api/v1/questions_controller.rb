module API::V1
  class QuestionsController < ApplicationController
    def index
      render json: Question.includes(:user).order(created_at: :desc).limit(25)
    end

    def show
      render json: Question.find(params[:id])
    end
  end
end
