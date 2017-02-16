require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Odoc
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    
    #config.i18n.available_locales = ['zh-CN', 'en']

    config.i18n.default_locale = 'zh-CN'

    config.time_zone = 'Beijing'
    
    # autoload lib
    config.autoload_paths << "#{Rails.root}/lib" << "#{Rails.root}/lib/validators"

    # custom configuration
    config.doc_path = "#{Rails.root}/obj_docs"
  end
end
