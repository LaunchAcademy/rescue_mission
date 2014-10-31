require 'policy_spec_helper'

describe UserPolicy do
  subject { described_class }

  permissions :show? do
    it "is permitted as a visitor" do
      expect(subject).to permit(nil, User.new)
    end
  end
end
