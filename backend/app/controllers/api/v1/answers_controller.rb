module API::V1
  class AnswersController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create]

    def index
      @answers = Answer.includes(:user, :question).order(created_at: :desc).limit(25)
      @answers = @answers.where(id: params[:ids]) if params[:ids]

      render json: @answers, include: [:user]
    end

    def show
      @answer = Answer.includes(:user, :question).find(params[:id])

      render json: @answer, include: [:user, :question]
    end

    def create
      @answer = current_user.answers.build(answer_params)
      @answer.question

      if @answer.save
        render json: @answer,
          status: :created,
          location: [:api, :v1, @answer]
      else
        render json: { errors: @answer.errors }, status: :unprocessable_entity
      end
    end

    private

    def answer_params
      params.require(:answer).permit(:body, :question_id)
    end
  end
end
