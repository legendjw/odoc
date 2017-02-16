require 'test_helper'

class ModuleTest < ActiveSupport::TestCase
  def setup
    @doc_path = Rails.configuration.doc_path
    @module = ObjDoc::Module.new @doc_path + '/crm'
    @empty_module = ObjDoc::Module.new @doc_path + '/empty'
    @model = ObjDoc::Model.new @doc_path + '/crm/customer.mod'
  end
 
  def teardown
    @module = @empty_module = nil
  end

  test "a module has correct attributes" do
    assert_equal 'crm', @module.id
    assert_equal '客户关系', @module.name

    assert_equal 'empty', @empty_module.id
    assert_equal 'Empty', @empty_module.name
  end

  test "a module has correct module" do
    assert_equal @module.module.path.to_s, @doc_path
  end

  test "a module has correct models" do
    assert_not_empty @module.models
    assert_instance_of Hash, @module.models
    assert @module.models.key? 'customer'
    assert_not @module['customer'].nil?
    assert @module['wrong'].nil?
    @module.each_model { |model| assert_instance_of ObjDoc::Model, model }
  end

  test "root module" do
    @root = ObjDoc::Module.root
    assert @root.root?
    assert_not @module.root?
  end

  test "module each" do
    @root = ObjDoc::Module.root
    all = []
    @root.each { |m| all.push m }
    models = []
    @root.each_model { |m| models.push m }
    modules = []
    @root.each_module { |m| modules.push m }

    assert all.any? { |m| m.id == 'crm' }
    assert all.any? { |m| m.id == 'customer' }
    assert modules.any? { |m| m.id == 'crm' }
    assert models.any? { |m| m.id == 'customer' }
    assert_equal all.size, models.size + modules.size
  end
end
