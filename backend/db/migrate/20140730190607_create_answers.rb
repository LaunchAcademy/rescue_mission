class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :body, null: false
      t.integer :user_id, null: false
      t.integer :question_id, null: false

      t.timestamps
    end
  end
end
