require 'rails_helper'

describe API::V1::AuthenticationsController do
  describe "POST #create" do
    context "when authentication is succesful" do
      it "returns an access token" do
        api_key = FactoryGirl.build_stubbed(:api_key)
        authentication = double('Authentication')
        expect(Authentication).to receive(:new).and_return(authentication)
        expect(authentication).to receive(:save).and_return(true)
        expect(authentication).to receive(:api_key).and_return(api_key)

        post :create, { something: 'valid' }

        expect(json).to be_json_eq APIKeySerializer.new(api_key)
      end
    end

    context "when authentication fails" do
      it "returns a set of errors" do
        authentication = double('Authentication')
        expect(Authentication).to receive(:new).and_return(authentication)
        expect(authentication).to receive(:save).and_return(false)

        post :create, { something: 'not valid' }

        expect(json).to be_json_eq({ errors: { broken: 'it is, for sure.' } })
      end
    end
  end
end
