(function () {
  'use strict'
  var createApp = function (arr) {
    Vue.component('group', {
    name: 'group',
    template: `
      <div>
        <div v-for="item in OrderData" class="group">
          <a :href="'#' + item.name" v-text="item.name" :class="['name', { isDirectory: item.isDirectory, isEmpty: item.childrens && item.childrens.length === 0 }]" :data-ext="item.ext"></a>
          <div class="info" :id="item.name">
            <div>文件名称：<span v-text="item.name"></span></div>
            <div>文件路径：<span v-text="item.path"></span></div>
            <div>文件相对路径：<span v-text="item.relativePath"></span></div>
            <template v-if="!item.isDirectory">
              <div>文件大小：<span v-text="item.size"></span></div>
              <div>文件最后修改时间：<span v-text="formatDate(item.ctime, 'yyyy-MM-dd hh:mm:ss')"></span></div>
            </template>
          </div>
          <template v-if="item.isDirectory && item.childrens.length">
            <group :data="item.childrens" v-show="item.isCollapse" class="children-group"></group>
          </template>
        </div>
      </div>`,
    props: ['data'],
    computed: {
      OrderData: function() {
        var directoryArr = []
        var fileArr = []
        if (!this.data) return []
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
    return new Vue({
      template: `<div id="app">
        <group :data="arr"></group>
      </div>`,
      data: {
        counter: 0,
        arr: []
      },
      methods: {
      },
      created: function () {
        Array.from(arr, obj => this.arr.push(obj))
      }
    })
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)