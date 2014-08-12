require 'rails_helper'

describe Comment do
  describe "associations" do
    it { should belong_to :user }
    it { should belong_to :commentable }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(15).is_at_most(10000) }
    it { should validate_presence_of(:commentable) }
    it { should validate_presence_of(:user) }
  end
end
