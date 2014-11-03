require 'rails_helper'

describe Question do
  describe "associations" do
    it { should belong_to(:assignee).class_name("User") }
    it { should belong_to(:user) }
    it { should have_many(:answers).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(30).is_at_most(10000) }
    it { should ensure_length_of(:title).is_at_least(15).is_at_most(150) }
    it { should validate_presence_of(:user) }
  end
end
