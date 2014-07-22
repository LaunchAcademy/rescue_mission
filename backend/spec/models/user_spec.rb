require 'rails_helper'

describe User do
  describe "validations" do
    it { should validate_presence_of :email }
    it { should validate_presence_of :provider }
    it { should validate_presence_of :uid }
    it { should validate_presence_of :username }

    it { should validate_uniqueness_of(:uid).scoped_to(:provider) }
  end
end
