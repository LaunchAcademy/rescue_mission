class AddAcceptedFieldToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :accepted, :boolean, default: false
  end
end
