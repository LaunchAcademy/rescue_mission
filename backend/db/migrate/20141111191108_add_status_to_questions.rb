class AddStatusToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :status, :integer, default: 0, null: false
  end
end
