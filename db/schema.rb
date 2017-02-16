# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170117080039) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table "organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string   "name",                             null: false
    t.integer  "status",     limit: 2, default: 1, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["name"], name: "index_organizations_on_name", unique: true, using: :btree
  end

  create_table "organizations_users", id: false, force: :cascade do |t|
    t.uuid "organization_id"
    t.uuid "user_id"
    t.index ["organization_id"], name: "index_organizations_users_on_organization_id", using: :btree
    t.index ["user_id"], name: "index_organizations_users_on_user_id", using: :btree
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string   "name",                                       null: false
    t.string   "email",                                      null: false
    t.string   "mobile",                                     null: false
    t.string   "password_digest"
    t.string   "remember_token"
    t.string   "password_reset_token"
    t.integer  "status",               limit: 2, default: 1, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["mobile"], name: "index_users_on_mobile", unique: true, using: :btree
    t.index ["name"], name: "index_users_on_name", using: :btree
  end

end
