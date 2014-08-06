module API::V1
  class QuestionsController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create, :update]

    def index
      render json: Question.includes(:user, :answers).order(created_at: :desc).limit(25)
    end

    def show
      @question = Question.includes(:user, :comments, answers: :user).find(params[:id])

      render json: @question, include: [:answers, :comments, :user]
    end

    def create
      @question = current_user.questions.build(question_params)

      if @question.save
        render json: @question,
          status: :created,
          location: [:api, :v1, @question]
      else
        render json: { errors: @question.errors }, status: :unprocessable_entity
      end
    end

    def update
      @question = current_user.questions.find(params[:id])

      if @question.update(question_params)
        render json: @question, status: :ok, location: [:api, :v1, @question]
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
