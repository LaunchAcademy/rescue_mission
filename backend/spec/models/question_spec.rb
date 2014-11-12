require 'rails_helper'

describe Question do
  describe "associations" do
    it { should belong_to(:accepted_answer) }
    it { should belong_to(:assignee).class_name("User") }
    it { should belong_to(:user) }
    it { should have_many(:answers).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe "validations" do
    it { should ensure_length_of(:body).is_at_least(30).is_at_most(10000) }
    it { should validate_presence_of(:status) }
    it { should ensure_length_of(:title).is_at_least(15).is_at_most(150) }
    it { should validate_presence_of(:user) }

    describe "#accepted_answer_belongs_to_question" do
      let(:error) { "must be in response to this question" }

      it "is valid when the answer is in response to this question" do
        question = Question.new
        answer = Answer.new(question: question)

        question.accepted_answer = answer
        question.valid?

        expect(question.errors[:accepted_answer]).to_not include error
      end

      it "is not valid when answer is not in response to this question" do
        question = Question.new
        answer = Answer.new

        question.accepted_answer = answer
        question.valid?

        expect(question.errors[:accepted_answer]).to include error
      end
    end
  end

  describe "#statuses" do
    subject { Question.statuses }

    it { should have_key :open }
    it { should have_key :answered }
  end

  describe "#status" do
    it "defaults to 'open'" do
      expect(Question.new).to be_open
    end
  end
end
