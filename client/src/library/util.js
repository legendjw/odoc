/**
 * 实用工具类
 */
export default class Util {
  /**
   * 根据指定配置设置对象
   */
  static configureObj(obj, config = {}) {
    const keys = Object.keys(config)
    if (keys.length > 0) {
      keys.forEach(key => {
        obj[key] = config[key]
      })
    }
    return obj
  }

  /**
   * 转换Map为Object
   */
  static mapToObj(map) {
    let obj = Object.create(null)
    map.forEach((value, key) => {
      obj[key] = value
    })
    return obj
  }

  /**
   * 转换Object为Map
   */
  static objToMap(obj) {
    let map = new Map()
    Object.keys(obj).forEach((key) => {
      map.set(key, obj[key])
    })
    return map
  }

  /**
   * 模糊查找一个页面元素
   */
  static fuzzyQuerySelector(selector) {
    let element
    const fuzzyTypes = [
      `#${selector}`,
      `.${selector}`,
      `*[name=${selector}]`
    ]
    fuzzyTypes.some(fuzzyType => {
      element = document.querySelector(fuzzyType)
      return element
    })

    return element ? element : document.querySelector(selector)
  }
}
