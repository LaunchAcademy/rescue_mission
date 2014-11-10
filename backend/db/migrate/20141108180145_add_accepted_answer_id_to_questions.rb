class AddAcceptedAnswerIdToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :accepted_answer_id, :integer
  end
end
