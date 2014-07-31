require 'rails_helper'

describe API::V1::AnswersController do
  describe "GET #index" do
    it "returns all the answers, ordered by recency" do
      older_answer = FactoryGirl.create(:answer,
        created_at: Time.zone.now - 1.week)
      old_answer = FactoryGirl.create(:answer,
        created_at: Time.zone.now - 1.day)
      oldest_answer = FactoryGirl.create(:answer,
        created_at: Time.zone.now - 1.year)
      ordered_answers = [old_answer, older_answer, oldest_answer]
      serialized_answers = ActiveModel::ArraySerializer.new(ordered_answers,
        root: :answers, include: [:user])

      get :index

      expect(json).to be_json_eq serialized_answers
    end

    context "with ids in params" do
      it "returns only specified answers" do
        answer1, answer2, answer3 = FactoryGirl.create_list(:answer, 3)

        get :index, ids: [answer1.id, answer3.id]

        expect(response_includes?(answer1)).to eq true
        expect(response_includes?(answer3)).to eq true
        expect(response_includes?(answer2)).to eq false
      end
    end
  end

  def response_includes?(answer)
    serialized_answer = AnswerSerializer.new(answer, root: false).to_json
    response.body.include?(serialized_answer)
  end
end
