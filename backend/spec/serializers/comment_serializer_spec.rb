require 'rails_helper'

describe CommentSerializer do
  describe "#can_edit" do
    it "is true when current user created the comment" do
      comment = FactoryGirl.build_stubbed(:comment)
      current_user = comment.user

      serializer = CommentSerializer.new(comment, scope: current_user)

      expect(serializer.can_edit).to eq true
    end

    it "is false when another user created the comment" do
      comment = FactoryGirl.build_stubbed(:comment)
      current_user = FactoryGirl.build_stubbed(:user)

      serializer = CommentSerializer.new(comment, scope: current_user)

      expect(serializer.can_edit).to eq false
    end
  end
end
