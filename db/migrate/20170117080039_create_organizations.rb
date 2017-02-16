class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :organizations, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false
      t.integer :status, default: 1, limit: 1, null: false
      t.datetime :created_at
      t.datetime :updated_at

      t.index :name, unique: true
    end

    create_table :organizations_users, id: false do |t|
      t.belongs_to :organization, type: :uuid, index: true
      t.belongs_to :user, type: :uuid, index: true
    end
  end
end
