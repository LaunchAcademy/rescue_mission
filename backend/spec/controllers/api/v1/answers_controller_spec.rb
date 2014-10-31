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

  describe "GET #show" do
    it "returns a answer" do
      answer = FactoryGirl.create(:answer)
      serialized_answer = AnswerSerializer.new(answer,
        include: [:user, :question])

      get :show, id: answer.id

      expect(json).to be_json_eq serialized_answer
    end
  end

  describe "POST #create" do
    context "with valid access token" do
      let(:api_key) { FactoryGirl.create(:api_key) }
      let(:current_user) { api_key.user }

      before do
        mock_authentication_with(api_key)
      end

      context "with valid attributes" do
        it "creates a new answer" do
          question = FactoryGirl.create(:question)
          answer_attributes = FactoryGirl.attributes_for(:answer)
          answer_attributes[:question_id] = question.id

          expect {
            post :create, answer: answer_attributes
          }.to change{Answer.count}.by(+1)

          expect(response.status).to eq 201
          expect(json).to be_json_eq AnswerSerializer.new(Answer.first, scope: current_user)
        end
      end

      context "with invalid attributes" do
        it "is not successful" do
          post :create, answer: { invalid: '' }

          expect(response.status).to eq 422
        end
      end
    end

    it "requires authentication" do
      post :create, answer: { derp: 'mcderp' }

      expect(response.status).to eq 401
    end
  end

  describe "PUT #update" do
    context "with valid access token" do
      let(:api_key) { FactoryGirl.create(:api_key) }
      let(:current_user) { api_key.user }

      before do
        mock_authentication_with(api_key)
      end

      context "with valid attributes" do
        it "updates the answer" do
          answer = FactoryGirl.create(:answer,
            user: current_user,
            body: "What's the name of the best band ever? I really like the Beatles but I'm not sure.")

          expect {
            put :update, id: answer.id,
              answer: { body: "Just kidding, I'm not a troll. It's Mr. Vanilla Ice" }
          }.to_not change{ Answer.count }

          answer.reload
          expect(response.status).to eq 200
          expect(json).to be_json_eq AnswerSerializer.new(answer, scope: current_user)
          expect(answer.body).to eq "Just kidding, I'm not a troll. It's Mr. Vanilla Ice"
        end
      end

      context "with invalid attributes" do
        it "is not successful" do
          answer = FactoryGirl.create(:answer, user: current_user)

          put :update, id: answer.id, answer: { body: '' }

          expect(response.status).to eq 422
        end
      end
    end
  end

  def response_includes?(answer)
    serialized_answer = AnswerSerializer.new(answer, root: false).to_json
    response.body.include?(serialized_answer)
  end
end
