module API::V1
  class QuestionsController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create]

    def index
      render json: Question.includes(:user).order(created_at: :desc).limit(25)
    end

    def show
      render json: Question.find(params[:id])
    end

    def create
      @question = current_user.questions.build(question_params)

      if @question.save
        render json: @question, status: :created, location: [:api, :v1, @question]
      else
        render json: { errors: @question.errors }, status: :unprocessable_entity
      end
    end

    private

    def question_params
      params.require(:question).permit(:body, :title)
    end
  end
end
