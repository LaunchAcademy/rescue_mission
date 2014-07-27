require 'rails_helper'

describe Question do
  describe "associations" do
    it { should belong_to :user }
  end

  describe "validations" do
    it { should validate_presence_of :body }
    it { should validate_presence_of :title }
    it { should validate_presence_of :user }
  end
end
