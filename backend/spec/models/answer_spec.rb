require 'rails_helper'

describe Answer do
  describe "associations" do
    it { should belong_to :question }
    it { should belong_to :user }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(30).is_at_most(10000) }
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:question) }
  end
end
