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

  describe "GET #show" do
    it "returns a comment" do
      comment = FactoryGirl.create(:comment)
      serialized_comment = CommentSerializer.new(comment)

      get :show, id: comment.id

      expect(json).to be_json_eq serialized_comment
    end
  end

  describe "POST #create" do
    context "with valid access token" do
      let(:api_key) { FactoryGirl.create(:api_key) }
      let(:current_user) { api_key.user }

      before do
        mock_authentication_with(api_key)
      end

      context "with valid attributes" do
        it "creates a new comment" do
          question = FactoryGirl.create(:question)
          comment_attributes = FactoryGirl.attributes_for(:comment)
          comment_attributes[:commentable_id] = question.id
          comment_attributes[:commentable_type] = 'Question'

          expect {
            post :create, comment: comment_attributes
          }.to change{Comment.count}.by(+1)

          expect(response.status).to eq 201
          expect(json).to be_json_eq CommentSerializer.new(Comment.first, scope: current_user)
        end
      end

      context "with invalid attributes" do
        it "is not successful" do
          post :create, comment: { invalid: '' }

          expect(response.status).to eq 422
        end
      end
    end

    it "requires authentication" do
      post :create, comment: { derp: 'mcderp' }

      expect(response.status).to eq 401
    end
  end

  describe "PUT #update" do
    context "with valid access token" do
      let(:api_key) { FactoryGirl.create(:api_key) }
      let(:current_user) { api_key.user }

      before do
        mock_authentication_with(api_key)
      end

      context "when comment belongs to current user" do
        context "with valid attributes" do
          it "updates the comment" do
            comment = FactoryGirl.create(:comment,
              user: current_user,
              body: "What's the name of the best band ever? I really like the Beatles but I'm not sure.")

            expect {
              put :update, id: comment.id,
                comment: { body: "Just kidding, I'm not a troll. It's Mr. Vanilla Ice" }
            }.to_not change{ Comment.count }

            comment.reload
            expect(response.status).to eq 200
            expect(json).to be_json_eq CommentSerializer.new(comment, scope: current_user)
            expect(comment.body).to eq "Just kidding, I'm not a troll. It's Mr. Vanilla Ice"
          end
        end

        context "with invalid attributes" do
          it "is not successful" do
            comment = FactoryGirl.create(:comment, user: current_user)

            put :update, id: comment.id, comment: { body: '' }

            expect(response.status).to eq 422
          end
        end
      end

      context "when comment belongs to another user" do
        it "doesn't update the comment" do
          comment = FactoryGirl.create(:comment)

          expect {
            put :update, id: comment.id,
              comment: { body: "Doesn't really matter but I'll provide one" }
          }.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    context "without valid access token" do
      it "is unauthorized" do
        put :update, id: 'anything'

        expect(response.status).to eq 401
      end
    end
  end

  def response_includes?(comment)
    serialized_comment = CommentSerializer.new(comment, root: false).to_json
    response.body.include?(serialized_comment)
  end
end
