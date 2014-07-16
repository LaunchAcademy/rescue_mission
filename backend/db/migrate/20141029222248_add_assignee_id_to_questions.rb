class AddAssigneeIdToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :assignee_id, :integer
    add_index :questions, :assignee_id
  end
end
