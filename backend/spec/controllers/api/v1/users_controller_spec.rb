require 'rails_helper'

describe API::V1::UsersController do
  describe "GET #index" do
    it "returns all the users" do
      users = FactoryGirl.create_list(:user, 3)
      serialized_users = ActiveModel::ArraySerializer.new(users, root: :users)

      get :index

      expect(json).to be_json_eq serialized_users
    end

    context "with role query param" do
      it "returns the users with given role" do
        FactoryGirl.create(:user)
        admin = FactoryGirl.create(:admin)
        serialized_users = ActiveModel::ArraySerializer.new([admin], root: :users)

        get :index, role: "admin"

        expect(json).to be_json_eq serialized_users
      end
    end
  end

  describe "GET #show" do
    it "returns a user" do
      user = FactoryGirl.build_stubbed(:user)

      expect(User).to receive(:find).with(user.id.to_s) { user }

      get :show, id: user.id

      expect(json).to be_json_eq UserSerializer.new(user)
    end
  end
end
