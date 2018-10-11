let tools = {
  /** param:
   * obj: 对象类型
   * str: 要新增的属性
   * val: 赋值
   */
  setObjData: function (obj, str, val) {
    str = str.split('.')
    while (str.length > 1) {
      var key = str.shift()
      var index = key.match(/\[[0-9]+\]/)
      if (index) {
        index = index[0]
        key = key.replace(index, '')
        index = parseInt(index.match(/[0-9]+/)[0])
        if (obj[key]) {
          obj = obj[key][index]
        } else {
          obj[key] = []
          obj[key][index] = {}
          obj = obj[key][index]
        }
      } else {
        if (!obj[key]) {
          obj[key] = {}
        }
        obj = obj[key]
      }
    }
    obj[str.shift()] = val

    return obj
  },
  /** param:
   * obj: 对象类型
   * str: 要获取的属性
   */
  getObjData: function (obj, str) {
    try {
      str = str.split('.')
      while (str.length > 0) {
        var key = str.shift()
        var index = key.match(/\[[0-9]+\]/g)
        if (index) {
          key = key.replace(index.join(''), '')
          obj = obj[key]
          while (index.length > 0) {
            var index1 = index.shift()
            index1 = parseInt(index1.match(/[0-9]+/)[0])
            obj = obj[index1]
          }
        } else {
          obj = obj[key]
        }
      }
    } catch (e) {
      console.log(e)
      obj = undefined
    }
    return obj
  }
}
export default tools
