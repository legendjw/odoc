class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :users, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false
      t.string :mobile, null: false
      t.string :email, null: false
      t.string :password_digest
      t.string :remember_token
      t.string :password_reset_token
      t.integer :status, default: 1, limit: 1, null: false
      t.datetime :created_at
      t.datetime :updated_at

      t.index :name
      t.index :email, unique: true
      t.index :mobile, unique: true
    end
  end
end
