module API::V1
  class QuestionsController < ApplicationController
    def index
      render json: Question.includes(:user).order(created_at: :desc).limit(25)
    end
  end
end
