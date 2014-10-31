module API::V1
  class QuestionsController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create, :update]
    after_action :verify_authorized, except: :index

    def index
      @questions = Question.includes(:user, :answers)
        .order(created_at: :desc)
        .page(params[:page])

      meta = {
        current_page: @questions.current_page,
        total_pages: @questions.total_pages
      }

      render json: @questions, meta: meta
    end

    def show
      question = Question.includes(:user, :comments, answers: :user).find(params[:id])

      authorize question

      render json: question, include: [:answers, :comments, :user]
    end

    def create
      question = current_user.questions.build(question_params)

      authorize question

      if question.save
        render json: question,
          status: :created,
          location: [:api, :v1, question]
      else
        render json: { errors: question.errors }, status: :unprocessable_entity
      end
    end

    def update
      question = Question.find(params[:id])

      authorize question

      if question.update(question_params)
        render json: question, status: :ok, location: [:api, :v1, question]
      else
        render json: { errors: question.errors }, status: :unprocessable_entity
      end
    end

    private

    def question_params
      params.require(:question).permit(:body, :title)
    end
  end
end
