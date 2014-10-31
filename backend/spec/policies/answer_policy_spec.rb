require 'policy_spec_helper'

describe AnswerPolicy do
  subject { described_class }

  permissions :show? do
    it "is permitted as a visitor" do
      expect(subject).to permit(nil, Answer.new)
    end
  end

  permissions :create? do
    it "is not permitted as a visitor" do
      expect(subject).to_not permit(nil, Answer.new)
    end

    it "is permitted as a user" do
      expect(subject).to permit(User.new, Answer.new)
    end
  end

  permissions :update? do
    it "is not permitted as a visitor" do
      expect(subject).to_not permit(nil, Answer.new)
    end

    it "is not permitted as a user who didn't create the answer" do
      user = FactoryGirl.build_stubbed(:user)
      expect(subject).to_not permit(user, Answer.new)
    end

    it "is permitted as the user who created the answer" do
      user = User.new
      expect(subject).to permit(user, Answer.new(user: user))
    end

    it "is permitted as an admin" do
      user = FactoryGirl.build_stubbed(:admin)
      expect(subject).to permit(user, Answer.new)
    end
  end
end
