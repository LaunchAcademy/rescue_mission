require 'rails_helper'

describe APIKeySerializer do
  describe "#access_token" do
    it "includes access token when key belongs to current user" do
      api_key = FactoryGirl.build_stubbed(:api_key)
      current_user = api_key.user

      serializer = APIKeySerializer.new(api_key, scope: current_user)

      expect(serializer.access_token).to eq api_key.access_token
    end

    it "omits access token when key belongs to another user" do
      api_key = FactoryGirl.build_stubbed(:api_key)
      current_user = FactoryGirl.build_stubbed(:user)

      serializer = APIKeySerializer.new(api_key, scope: current_user)

      expect(serializer.access_token).to eq nil
    end
  end
end
