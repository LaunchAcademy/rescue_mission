require 'rails_helper'

describe API::V1::UsersController do
  describe "GET #show" do
    it "returns a user" do
      user = FactoryGirl.build_stubbed(:user)

      expect(User).to receive(:find).with(user.id.to_s) { user }

      get :show, id: user.id

      expect(json).to be_json_eq UserSerializer.new(user)
    end
  end
end
