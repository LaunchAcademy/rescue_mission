require 'rails_helper'

describe API::V1::CommentsController do
  describe "GET #index" do
    it "returns all the comments, ordered by recency" do
      older_comment = FactoryGirl.create(:comment,
        created_at: Time.zone.now - 1.week)
      old_comment = FactoryGirl.create(:comment,
        created_at: Time.zone.now - 1.day)
      oldest_comment = FactoryGirl.create(:comment,
        created_at: Time.zone.now - 1.year)
      ordered_comments = [old_comment, older_comment, oldest_comment]
      serialized_comments = ActiveModel::ArraySerializer.new(ordered_comments,
        root: :comments, include: [:user])

      get :index

      expect(json).to be_json_eq serialized_comments
    end

    context "with ids in params" do
      it "returns only specified comments" do
        comment1, comment2, comment3 = FactoryGirl.create_list(:comment, 3)

        get :index, ids: [comment1.id, comment3.id]

        expect(response_includes?(comment1)).to eq true
        expect(response_includes?(comment3)).to eq true
        expect(response_includes?(comment2)).to eq false
      end
    end
  end

  def response_includes?(answer)
    serialized_answer = CommentSerializer.new(answer, root: false).to_json
    response.body.include?(serialized_answer)
  end
end
