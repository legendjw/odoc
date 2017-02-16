class ApplicationController < ActionController::Base
  include SessionsHelper

  protect_from_forgery with: :exception
  
  before_action :require_sign_in

  private
    # 获取分页数据
    # 
    # {
    #   total_pages: 5,
    #   total_count:  100,
    #   current_page: 1,
    #   items: [
    #     {name: 1, url: '/users.json?page=1'},
    #     {name: 2, url: '/users.json?page=2'}
    #   ]
    # }
    #
    def paginate(options = {})
      models = options[:models]
      format = options[:format] || :json
      left_count = options[:left_count] || 3
      right_count = options[:right_count] || 3
      current_page = models.current_page
      prev_page = models.prev_page
      next_page = models.next_page
      total_pages = models.total_pages
      total_count = models.total_count

      path = -> (page) do
        polymorphic_path(controller_name, page: page, format: format)
      end

      items = []
      if !models.first_page?
        #items << {name: '首页', url: path.call(1)}
        items << {name: '上一页', url: path.call(prev_page)}
      end

      start_page = current_page - left_count > 1 ? current_page - left_count : 1
      end_page = current_page + right_count > total_pages ? total_pages : current_page + right_count

      (start_page..end_page).each { |n| items << {name: n, url: path.call(n)} }

      if !models.last_page?
        items << {name: '下一页', url: path.call(next_page)}
        #items << {name: '最后一页', url: path.call(total_pages)}
      end

      {
        total_pages: total_pages,
        total_count: total_count,
        current_page: current_page,
        items: items
      }
    end
end
