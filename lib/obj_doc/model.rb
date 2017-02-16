module ObjDoc
  # Model代表对象文档目录下具体的某一模型
  class Model
    # 模型对应文档的文件扩展名
    DOC_EXTENSION = 'mod'

    attr_reader :path

    def initialize(path)
      @path = Pathname.new path
      @doc = doc
    end

    def id
      return @id if !@id.nil?
      @id = !@doc.nil? && @doc.key?(:id) ? @doc[:id] : @path.basename('.*').to_s
    end

    # 模型的完整id(包含模块)
    def full_id
      return @full_id if !@full_id.nil?
      modules = []
      m = self.module
      while !m.root? do
        modules.unshift m.id
        m = m.module
      end 
      @full_id = modules.empty? ? id : "#{modules.join('::')}::#{id}"
    end

    def name
      return @name if !@name.nil?
      @name = !@doc.nil? && @doc.key?(:name) ? @doc[:name] : @path.basename('.*').to_s.humanize
    end

    def module
      return @module if !@module.nil?
      @module = Module.new @path.dirname
    end

    private
      # 获取对应文档所表示的对象
      def doc
        hash = YAML.load_file(path)
        hash.is_a?(Hash) ? hash.symbolize_keys : nil
      end
  end
end
