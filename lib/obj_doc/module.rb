module ObjDoc
  # Module代表对象文档目录下具体的某一模块
  class Module
    # 模块对应文档的文件名
    DOC_NAME = 'main'
    # 模块对应文档的文件扩展名
    DOC_EXTENSION = 'modu'
    # 根模块的id
    ROOT_ID = 'root'

    attr_reader :path

    class << self
      def root
        return @root if !@root.nil?
        @root = self.new Rails.configuration.doc_path
      end
    end

    def initialize(path)
      @path = path.instance_of?(Pathname) ? path : Pathname.new(path)
      @doc = doc
    end

    def id
      return @id if !@id.nil?
      if root?
        @id = ROOT_ID
      elsif !@doc.nil? && @doc.key?(:id)
        @id = @doc[:id]
      else
        @id = @path.basename.to_s
      end
    end

    def name
      return @name if !@name.nil?
      @name = !@doc.nil? && @doc.key?(:name) ? @doc[:name] : @path.basename.to_s.humanize
    end

    def module
      return @module if !@module.nil?
      @module = Module.new @path.dirname
    end

    def [](key)
      models[key]
    end

    # 返回模块下所有的模型的Hash结构
    def models
      return @models if !@models.nil?
      model_files = Pathname.glob "#{path}/*.#{ObjDoc::Model::DOC_EXTENSION}"
      @models = model_files.empty? ? {} : (model_files.map { |file| model = ObjDoc::Model.new file; [model.id, model] }).to_h
    end

    # 循环模块下的模块以及模型
    def each(recursive = true, &block)
      _each(['module', 'model'], recursive, &block)
    end

    # 循环模块下的模型
    def each_model(recursive = true, &block)
      _each(['model'], recursive, &block)
    end

    # 循环模块下的模块
    def each_module(recursive = true, &block)
      _each(['module'], recursive, &block)
    end

    # 是否是根模块
    def root?
      @path.to_s == Rails.configuration.doc_path
    end

    private
      # 获取对应文档所表示的对象
      def doc
        doc_files = Pathname.glob "#{path}/#{DOC_NAME}.#{DOC_EXTENSION}*"
        return nil if doc_files.empty?
        hash = YAML.load_file(doc_files.first)
        hash.is_a?(Hash) ? hash.symbolize_keys : nil
      end

      # 内部循环模块下的子元素
      def _each(objects = [], recursive = true, &block)
        throw 'each method need a block' if !block_given?
        childs = @path.children
        childs.each do |child|
          if child.directory?
            m = Module.new(child)
            if objects.include?('module')
              yield m
            end
            m.send(:_each, objects, recursive, &block) if recursive
          elsif objects.include?('model') && child.extname == '.' + Model::DOC_EXTENSION
            m = Model.new child
            yield m
          end
        end
      end
  end
end
