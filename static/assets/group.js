'use strict'
var createGroup = function(arr) {
  Vue.component('group', {
    name: 'group',
    template: `<div>
        <div v-for="item in OrderData" class="group">
          <div v-text="item.name" :class="['name', { isDirectory: item.isDirectory }]" :data-ext="item.ext"></div>
          <template v-if="item.isDirectory">
            <group :data="item.childrens" v-show="item.isCollapse" class="children-group"></group>
          </template>
          <div class="info">
            <div>文件名称：<span v-text="item.name"></span></div>
            <div>文件路径：<span v-text="item.path"></span></div>
            <div>文件相对路径：<span v-text="item.relativePath"></span></div>
            <template v-if="!item.isDirectory">
              <div>文件大小：<span v-text="item.size"></span></div>
              <div>文件最后修改时间：<span v-text="formatDate(item.ctime, 'yyyy-MM-dd hh:mm:ss')"></span></div>
            </template>
          </div>
        </div>
      </div>`,
    props: ['data'],
    computed: {
      OrderData: function() {
        var directoryArr = []
        var fileArr = []
        Array.from(this.data, (obj) => {
          if (obj.isDirectory) {
            obj.isCollapse = true
            directoryArr.push(obj)
          }
          else {
            fileArr.push(obj)
          }
        })
        return directoryArr.concat(fileArr)
      }
    },
    methods: {
      formatDate: function(date, fmt) {
        var o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      }
    }
  })
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createGroup
} else {
  this.createGroup = createGroup
}