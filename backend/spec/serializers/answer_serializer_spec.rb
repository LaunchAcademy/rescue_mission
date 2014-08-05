require 'rails_helper'

describe AnswerSerializer do
  describe "#can_edit" do
    it "is true when current user created the answer" do
      answer = FactoryGirl.build_stubbed(:answer)
      current_user = answer.user

      serializer = AnswerSerializer.new(answer, scope: current_user)

      expect(serializer.can_edit).to eq true
    end

    it "is false when another user created the answer" do
      answer = FactoryGirl.build_stubbed(:answer)
      current_user = FactoryGirl.build_stubbed(:user)

      serializer = AnswerSerializer.new(answer, scope: current_user)

      expect(serializer.can_edit).to eq false
    end
  end
end
