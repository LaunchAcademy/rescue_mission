require 'policy_spec_helper'

describe QuestionPolicy do
  subject { described_class }

  permissions :show? do
    it "is permitted as a visitor" do
      expect(subject).to permit(nil, Question.new)
    end
  end

  permissions :create? do
    it "is not permitted as a visitor" do
      expect(subject).to_not permit(nil, Question.new)
    end

    it "is permitted as a user" do
      expect(subject).to permit(User.new, Question.new)
    end
  end

  permissions :update? do
    it "is not permitted as a visitor" do
      expect(subject).to_not permit(nil, Question.new)
    end

    it "is not permitted as a user who didn't create the question" do
      user = FactoryGirl.build_stubbed(:user)
      expect(subject).to_not permit(user, Question.new)
    end

    it "is permitted as the user who created the question" do
      user = User.new
      expect(subject).to permit(user, Question.new(user: user))
    end

    it "is permitted as an admin" do
      user = FactoryGirl.build_stubbed(:admin)
      expect(subject).to permit(user, Question.new)
    end
  end

  permissions :assign? do
    it "is not permitted as a visitor" do
      expect(subject).to_not permit(nil, Question.new)
    end

    it "is not permitted as a user" do
      user = User.new
      expect(subject).to_not permit(user, Question.new)
    end

    it "is permitted as an admin" do
      user = User.new(role: 'admin')
      expect(subject).to permit(user, Question.new)
    end
  end

  describe "#permitted_attributes" do
    subject { QuestionPolicy.new(user, Question.new) }

    context "as a user" do
      let(:user) { User.new }

      it { should permit_attributes(:body, :title) }
      it { should_not permit_attributes(:assignee_id) }
    end

    context "as an admin" do
      let(:user) { User.new(role: 'admin') }

      it { should permit_attributes(:body, :title, :assignee_id) }
    end
  end
end
