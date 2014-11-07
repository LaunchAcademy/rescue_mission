class CreateAPIKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.integer :user_id, null: false
      t.string :access_token, null: false
      t.datetime :expires_at, null: false

      t.timestamps
    end

    add_index :api_keys, :user_id
    add_index :api_keys, :access_token, unique: true
  end
end
