require 'test_helper'

class ModelTest < ActiveSupport::TestCase
  def setup
    @doc_path = Rails.configuration.doc_path
    @model = ObjDoc::Model.new @doc_path + '/crm/customer.mod'
    @top_model = ObjDoc::Model.new @doc_path + '/top.mod'
    @empty_model = ObjDoc::Model.new @doc_path + '/empty/customer.mod'
  end
 
  def teardown
    @module = @empty_module = nil
  end

  test "a model has correct attributes" do
    assert_equal 'customer', @model.id
    assert_equal '客户', @model.name
    assert_equal 'crm::customer', @model.full_id

    assert_equal 'customer', @empty_model.id
    assert_equal 'Customer', @empty_model.name
    assert_equal 'empty::customer', @empty_model.full_id

    assert_equal 'top', @top_model.full_id
  end

  test "a model has correct module" do
    @module = ObjDoc::Module.new @doc_path + '/crm'
    assert_equal @module.path, @model.module.path
  end
end
