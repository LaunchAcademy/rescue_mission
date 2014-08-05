require 'rails_helper'

describe QuestionSerializer do
  describe "#can_edit" do
    it "is true when current user created the question" do
      question = FactoryGirl.build_stubbed(:question)
      current_user = question.user

      serializer = QuestionSerializer.new(question, scope: current_user)

      expect(serializer.can_edit).to eq true
    end

    it "is false when another user created the question" do
      question = FactoryGirl.build_stubbed(:question)
      current_user = FactoryGirl.build_stubbed(:user)

      serializer = QuestionSerializer.new(question, scope: current_user)

      expect(serializer.can_edit).to eq false
    end
  end

  describe "#can_accept_answer" do
    it "is true when current user created the question and no answer has been accepted" do
      question = FactoryGirl.build_stubbed(:question)
      current_user = question.user

      serializer = QuestionSerializer.new(question, scope: current_user)

      expect(serializer.can_accept_answer).to eq true
    end

    it "is false when another user created the question" do
      question = FactoryGirl.build_stubbed(:question)
      current_user = FactoryGirl.build_stubbed(:user)

      serializer = QuestionSerializer.new(question, scope: current_user)

      expect(serializer.can_accept_answer).to eq false
    end

    it "is false when an answer has already been accepted" do
      question = FactoryGirl.build_stubbed(:question)
      answer = FactoryGirl.create(:answer, question: question, accepted: true)
      current_user = question.user

      serializer = QuestionSerializer.new(question, scope: current_user)

      expect(serializer.can_accept_answer).to eq false
    end
  end
end
