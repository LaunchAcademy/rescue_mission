require 'policy_spec_helper'

describe ApplicationPolicy do
  subject { described_class }

  let(:user) { User.new }
  let(:answer) { Answer.new }

  permissions :index? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :show? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :new? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :create? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :edit? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :update? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end

  permissions :destroy? do
    it "is not permitted" do
      expect(subject).to_not permit(user, answer)
    end
  end
end
