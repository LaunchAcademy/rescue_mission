module API::V1
  class QuestionsController < ApplicationController
    before_action :ensure_valid_api_key!, only: [:create, :update]

    def index
      @questions = Question.includes(:user, :answers, :assignee).order(created_at: :desc)
      @questions = @questions.open if params[:status] == "open"
      @questions = @questions.page(params[:page])

      meta = {
        current_page: @questions.current_page,
        total_pages: @questions.total_pages
      }

      render json: @questions, include: [:user], meta: meta
    end

    def show
      @question = Question.includes(:user, :comments, answers: :user).find(params[:id])

      authorize @question

      render json: @question, include: [:answers, :comments, :user]
    end

    def create
      @question = current_user.questions.build(question_params)

      authorize @question

      if @question.save
        QuestionCreated.new(@question).perform

        render json: @question,
          status: :created,
          location: [:api, :v1, @question]
      else
        render json: { errors: @question.errors }, status: :unprocessable_entity
      end
    end

    def update
      @question = Question.find(params[:id])

      authorize @question

      if @question.update(question_params)
        if @question.accepted_answer.present?
          @question.answered!
        else
          @question.open!
        end

        render json: @question, include: [:answers], status: :ok, location: [:api, :v1, @question]
      else
        render json: { errors: @question.errors }, status: :unprocessable_entity
      end
    end

    private

    def question_params
      params.require(:question).permit(*policy(@question || Question).permitted_attributes)
    end
  end
end
