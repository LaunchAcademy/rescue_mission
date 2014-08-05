require 'rails_helper'

describe Question do
  describe "associations" do
    it { should belong_to :user }
    it { should have_many(:answers).dependent(:destroy) }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(30).is_at_most(10000) }
    it { should ensure_length_of(:title).is_at_least(15).is_at_most(150) }
    it { should validate_presence_of(:user) }
  end

  describe "#accepted_answer" do
    it "returns accepted answer if question has an answer marked 'accepted'" do
      question = FactoryGirl.create(:question)
      accepted_answer = FactoryGirl.create(:answer, question: question, accepted: true)

      expect(question.accepted_answer).to eq accepted_answer
    end

    it "returns nil if question does not have an accepted answer" do
      question = FactoryGirl.create(:question)
      unaccepted_answer = FactoryGirl.create(:answer, question: question)

      expect(question.accepted_answer).to be_nil
    end
  end
end
