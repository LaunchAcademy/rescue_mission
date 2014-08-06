module API::V1
  class AnswersController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create, :update]

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
      @answer = current_user.answers.build(create_answer_params)

      if @answer.save
        render json: @answer,
          status: :created,
          location: [:api, :v1, @answer]
      else
        render json: { errors: @answer.errors }, status: :unprocessable_entity
      end
    end

    def update
      @answer = current_user.answers.find(params[:id])

      if @answer.update(update_answer_params)
        render json: @answer, status: :ok, location: [:api, :v1, @answer]
      else
        render json: { errors: @answer.errors }, status: :unprocessable_entity
      end
    end

    private

    def create_answer_params
      params.require(:answer).permit(:body, :question_id)
    end

    def update_answer_params
      params.require(:answer).permit(:body)
    end
  end
end
