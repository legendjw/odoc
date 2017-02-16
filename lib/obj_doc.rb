require 'active_support'

module ObjDoc
  extend ActiveSupport::Autoload

  autoload :Module
  autoload :Model
end
