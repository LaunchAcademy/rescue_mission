require 'rails_helper'

describe API::V1::QuestionsController do
  describe "GET #index" do
    it "returns all the questions" do
      older_question = FactoryGirl.create(:question, created_at: Time.zone.now - 1.week)
      old_question = FactoryGirl.create(:question, created_at: Time.zone.now - 1.day)
      oldest_question = FactoryGirl.create(:question, created_at: Time.zone.now - 1.year)
      ordered_questions = [old_question, older_question, oldest_question]

      get :index

      expect(json).to be_json_eq(
        ActiveModel::ArraySerializer.new(ordered_questions, root: :questions)
      )
    end
  end

  describe "GET #show" do
    it "returns a question" do
      question = FactoryGirl.create(:question)

      get :show, id: question.id

      expect(json).to be_json_eq QuestionSerializer.new(question)
    end
  end
end
