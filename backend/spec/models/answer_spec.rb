require 'rails_helper'

describe Answer do
  describe "associations" do
    it { should belong_to :question }
    it { should belong_to :user }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(30).is_at_most(10000) }
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:question) }

    it "should validate that only one answer per question can be marked accepted" do
      FactoryGirl.create(:answer, accepted: true)

      expect { FactoryGirl.create(:answer, accepted: true) }.to raise_error.with_message(/Accepted has already been taken/)
    end
  end
end
