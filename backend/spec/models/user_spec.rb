require 'rails_helper'

describe User do
  describe "assocations" do
    it { should have_many(:api_keys).dependent(:destroy) }
    it { should have_many(:questions).dependent(:destroy) }
    it { should have_many(:answers).dependent(:destroy) }
  end

  describe "validations" do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }

    it { should validate_presence_of(:provider) }

    it { should validate_presence_of(:uid) }
    it { should validate_uniqueness_of(:uid).scoped_to(:provider) }

    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
  end

  describe ".find_or_create_from_oauth!" do
    context "when user already exists" do
      it "finds the user with matching credentials" do
        user = FactoryGirl.create(:user)
        oauth = double(provider: user.provider, uid: user.uid)

        expect(User.find_or_create_from_oauth!(oauth)).to eq user
      end
    end

    context "when user doesn't exist" do
      it "creates a new user" do
        user_attributes = FactoryGirl.attributes_for(:user)
        oauth = double(provider: user_attributes[:provider], uid: user_attributes[:uid])

        expect(User).to receive(:create_from_oauth!).with(oauth)

        User.find_or_create_from_oauth!(oauth)
      end
    end

    describe ".create_from_oauth" do
      it "creates a new user with given information" do
        user_attributes = FactoryGirl.attributes_for(:user)
        oauth = double(
          email: user_attributes[:email],
          provider: user_attributes[:provider],
          uid: user_attributes[:uid],
          username: user_attributes[:username]
        )

        expect(User).to receive(:create!).with(user_attributes)

        User.create_from_oauth!(oauth)
      end
    end
  end
end
