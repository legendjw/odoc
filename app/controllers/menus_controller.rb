class MenusController < ApplicationController
  def index
    @menus = []
    system_menus = [
      {
        id: '_system',
        name: '系统',
        parent_id: ObjDoc::Module::ROOT_ID,
        sort: 0
      },
      {
        id: 'user',
        name: '用户',
        parent_id: '_system',
        url: 'users',
        sort: 0
      },
      {
        id: 'market',
        name: '应用市场',
        parent_id: '_system', sort: 1
      },
      {
        id: 'doc',
        name: '文档管理',
        parent_id: '_system',
        sort: 2
      }
    ]

    ObjDoc::Module.root.each do |m|
      menu = {
        id: m.id,
        name: m.name,
        parent_id: m.module.id,
        url: m.instance_of?(ObjDoc::Module) ? "" : "models/#{m.full_id}",
        sort: 0
      }
      @menus.push menu
    end

    @menus += system_menus

    respond_to do |format|
      format.any(:xml, :json) { render request.format.to_sym => @menus }
    end
  end
end
