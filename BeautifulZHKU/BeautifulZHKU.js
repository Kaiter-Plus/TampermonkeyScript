// ==UserScript==
// @name         仲恺农业工程学院网络管理系统主页面美化修改
// @author       Kaiter
// @icon         data:image/png;base64,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
// @noframes
// @description  给仲恺教务网每个功能模块添加圆角、过渡和阴影，去除一些没有用的标签！
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/BeautifulZHKU
// @match        http://jw.zhku.edu.cn/*
// @match        http://202.192.94.172/*
// @require      http://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @run-at       document-end
// @version      1.0
// ==/UserScript==

;(function () {
  // 获取所有 iframe
  const frames = $('iframe')

  // 获取登录界面 iframe
  const login = frames.get(0)
  // 获取通知公告界面 iframe
  const notice = frames.get(1)
  // 获取日历界面 iframe
  const cal = frames.get(2)

  // 设置主页背景
  $('body').css({
    overflow: 'auto',
    background: 'linear-gradient(to right, #cedeeb, #c5e5f0)',
  })

  // 获取 head
  const head = $('head')
  // 导入自定义样式
  head.append($('<style type="text/css">').text(getCSS('mainCSS')))

  ///////////↓ 用户登录界面 ↓///////////////
  // 给登录界面 div 添加 id 方便添加 css
  const loginDiv = $(login).parents('div').attr('id', 'loginDiv').removeAttr('style').get(0)
  // 移除登录界面父级 td 默认样式，并添加圆角
  $(login).parent().removeAttr('style').css({
    backgroundColor: '#fafafa',
    borderRadius: '6px',
  })
  // 登录界面加载完成后操作
  login.onload = function () {
    let loginDocument
    // 不知道怎么回事，有时候 iframe 的 domain 会变成 zhku.edu.cn，那就加一个错误处理好了
    try {
      // 获取登录界面 document
      loginDocument = login.contentWindow.document || login.contentDocument
    } catch (e) {
      // 强行修改主页的 domain ，达到操作 iframe 的目的， emm....
      document.domain = 'zhku.edu.cn'
      loginDocument = login.contentWindow.document || login.contentDocument
    }
    // 设置登录界面圆角和阴影
    $(login).css({
      borderRadius: '6px',
      border: 'none',
      height: '294px',
    })
    //获取登录界面 head
    const loginHead = loginDocument.head
    // 获取 下拉栏 并添加属性 class 和 style
    let select = $('[name=Sel_Type]').addClass('selector').css({
      width: '16px',
      height: '22px',
      color: '#666',
      border: 'none',
    })
    // 获取 select 的父元素 div，添加 class
    select.parent().addClass('selectDiv').css({
      border: '1px solid rgb(228, 228, 228)',
      padding: '4px',
      width: '156px',
      height: '22px',
      backgroundColor: '#FFF',
    })
    // 美化输入框
    let loginInput = $('.tx1', loginDocument)
    for (let inputItem of loginInput) {
      if (inputItem.id === 'txt_pewerwedsdfsdff') {
        $(inputItem).css('display', 'none')
        continue
      }
      $(inputItem).removeAttr('style')
    }
    // 导入自定义样式
    $(loginHead).append($('<style type="text/css">').text(getCSS('loginCSS')))
  }

  ///////////↓ 教学安排 ↓///////////////
  // 设置通知公告 div 的 id 方便添加 css
  let scheduleDiv = loginDiv.parentNode.children[1]
  scheduleDiv.id = 'scheduleDiv'
  scheduleDiv.removeAttribute('style')

  // 设置 table 高和宽都是 100%
  $(scheduleDiv.children[0]).css({
    height: '100%',
    width: '100%',
  })

  // 移除友情链接
  scheduleDiv.parentNode.removeChild(scheduleDiv.parentNode.children[2])

  // 设置圆角
  let sTableRows = scheduleDiv.children[0].children[0].children
  let sTableTop = sTableRows[0].children[0]
  sTableTop.removeChild(sTableTop.children[0])
  $(sTableTop).css({
    textAlign: 'left',
    background: 'url("images/home_new/d_jxap_bg.gif")',
    borderRadius: '6px 6px 0 0',
  })
  sTableRows[1].children[0].removeAttribute('style')
  let sTableBottom = sTableRows[1].children[0].children[0]
  $(sTableBottom).css({
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '0 0 6px 6px',
  })

  //////////↓ 通知公告 ↓//////////
  // 设置通知公告 div 的 id 方便添加 css
  const noticeDiv = $(notice).parents('div').attr('id', 'noticeDiv').removeAttr('style').get(0)
  // 设置通知公告模块圆角
  setRadius(noticeDiv)

  ///////////↓ 公共下载 ↓////////////
  // 设置通知公告 div 的 id 方便添加 css
  let downloadDiv = $(noticeDiv.parentNode.children[1])
    .attr('id', 'downloadDiv')
    .removeAttr('style')
    .css('background-color', '#fafafa')
  // 设置公共下载模块圆角
  setRadius(downloadDiv.get(0))

  //////////↓ 日历界面 ↓//////////
  // 移除原来的日历
  let calParent = cal.parentNode
  calParent.removeChild(cal)
  $(calParent).css({
    marginTop: '0',
    width: '100%',
    height: '290px',
    paddingBottom: '5px',
  })

  // 创建 div ,导入自定义日历
  let calDiv = $('<div>').attr({
    id: 'calendar',
    class: 'calendar',
  })

  // 将创建的 div, css 加入覆盖原来的日历
  $(calParent).append(calDiv)

  ///////↓ 作息时间、查看校历、管理人员 ↓//////////
  // 设置作息时间、查看校历、管理人员 div 的 class 方便添加 css
  let otherParent = calParent.parentNode.children[1].children[0].children[0]
  let other = otherParent.children
  for (let i = 0; i < 3; i++) {
    let x = document.createElement('div')
    x.setAttribute('class', 'otherDiv' + i)
    x.appendChild(other[0])
    x.children[0].children[0].children[0].removeAttribute('onclick')
    otherParent.appendChild(x)
  }
  // 添加涟漪效果
  const addRippleEffect = function (e) {
    let target = e.target
    if (target.tagName.toLowerCase() !== 'img') return false
    let div = target.parentNode.parentNode.parentNode.parentNode
    let rect = div.getBoundingClientRect()
    let ripple = div.querySelector('.ripple')
    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
      div.appendChild(ripple)
    }
    ripple.classList.remove('show')
    let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
    let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    ripple.classList.add('show')
    return false
  }
  document.addEventListener('click', addRippleEffect, false)
  // 使用 iframe 展示 “作息时间、查看校历、管理人员”
  const otherIframe = document.createElement('iframe')
  otherIframe.setAttribute('class', 'otherIframe')
  otherIframe.style.position = 'absolute'
  otherIframe.style.top = (screen.height - 660) / 2 + 'px'
  otherIframe.style.left = (screen.width - 630) / 2 - 12 + 'px'
  document.body.appendChild(otherIframe)
  let flag = false
  const displayOther = function (e) {
    let target = e.target
    if (target.tagName.toLowerCase() !== 'img') {
      // 实现点击其它任意位置关闭
      if (flag) {
        flag = !flag
        otherIframe.style.display = 'none'
      }
      return false
    } else {
      if (!flag) {
        flag = !flag
      }
      let div = target.parentNode.parentNode.parentNode.parentNode
      if (flag) {
        if (div.className === 'otherDiv0') {
          otherIframe.src = '_data/index_zxsj.aspx'
        }
        if (div.className === 'otherDiv1') {
          otherIframe.src = '_data/index_lookxl.aspx'
        }
        if (div.className === 'otherDiv2') {
          otherIframe.src = '_data/index_GLRY.aspx'
        }
        otherIframe.style.display = 'block'
      } else {
        otherIframe.style.display = 'none'
      }
    }
  }
  document.addEventListener('click', displayOther, false)

  ///////////↓ 管理规定 ↓///////////
  // 设置管理规定 div 的 id 方便添加 css
  let managerDiv = $(calParent.parentNode.parentNode.parentNode.children[1].children[0].children[0])
    .attr('id', 'managerDiv')
    .removeAttr('style')
  managerDiv.parent().removeAttr('height')
  // 设置管理规定模块圆角
  setRadius(managerDiv.get(0))

  ////////////↓ 页脚 ↓///////////
  let footParent = loginDiv.parentNode.parentNode.parentNode
  let foot = $(footParent.children[2].children[0])
  foot.css({
    color: '#fff',
    background: '#1f8dda',
  })

  /******************* 分隔线 ********************/

  /* 下面是使用到的函数 */

  // 清除没用的单元格，设置圆角函数
  function setRadius(pDiv) {
    // 设置表格宽度为 100%
    pDiv.children[0].width = '100%'

    // 移除没用的单元格
    let tableRows = pDiv.children[0].children[0].children
    if (tableRows[0].children[1] || tableRows[1].children[1]) {
      tableRows[0].children[1].parentNode.removeChild(tableRows[0].children[1])
      tableRows[1].children[1].parentNode.removeChild(tableRows[1].children[1])
    }

    // 设置单元格圆角
    if (pDiv.id !== 'otherDiv') {
      let tableTop = tableRows[0].children[0]
      let tableBottom = tableRows[1].children[0]
      tableTop.width = '100%'
      if (pDiv.id === 'managerDiv') {
        $(tableTop).css({
          backgroundColor: '#eee',
          borderRadius: '6px 6px 0 0',
          textAlign: 'left',
          fontSize: '15px',
          color: '#2c93db',
          paddingLeft: '15px',
          fontWeight: 'bold',
          fontFamily: '微软雅黑',
        })
        $(tableBottom).css({
          height: '204px',
          backgroundColor: '#fafafa',
          borderRadius: '0 0 6px 6px',
        })
      } else {
        $(tableTop).css({
          backgroundColor: '#eee',
          borderRadius: '6px 6px 0 0',
        })
        $(tableBottom).css({
          height: '246px',
          backgroundColor: '#fafafa',
          borderRadius: '0 0 6px 6px',
        })
      }
      if (tableRows[1].children[0].children[0]) {
        let tableBottomDiv = tableRows[1].children[0].children[0]
        tableBottomDiv.removeAttribute('style')
      }
    }
  }

  // 生成日历函数
  $(function () {
    $('#calendar').calendar({
      ifSwitch: true, // 是否切换月份
      hoverDate: true, // hover是否显示当天信息
      backToday: true, // 是否返回当天
    })
  })
  ;(function ($) {
    // ========== 使用到的方法 ========== //
    const dateObj = (function () {
      let _date = new Date()
      return {
        getDate: function () {
          return _date
        },
        setDate: function (date) {
          _date = date
        },
      }
    })()
    const Calendar = function (elem, options) {
      this.$calendar = elem
      this.defaults = {
        ifSwitch: true,
        hoverDate: false,
        backToday: false,
      }
      this.opts = $.extend({}, this.defaults, options)
    }
    Calendar.prototype = {
      // hover 时显示当天信息
      showHoverInfo: function (obj) {
        const _dateStr = $(obj).attr('data')
        const offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2
        const offset_l = $(obj).offset().left + $(obj).width()
        const changeStr = _dateStr.substr(0, 4) + '-' + _dateStr.substr(4, 2) + '-' + _dateStr.substring(6)
        const _week = changingStr(changeStr).getDay()
        let _weekStr = ''
        this.$calendar_today.show()
        this.$calendar_today
          .css({
            left: offset_l + 30,
            top: offset_t - 24,
          })
          .stop()
          .animate({
            left: offset_l + 16,
            top: offset_t - 24,
            opacity: 1,
          })
        switch (_week) {
          case 0:
            _weekStr = '星期日'
            break
          case 1:
            _weekStr = '星期一'
            break
          case 2:
            _weekStr = '星期二'
            break
          case 3:
            _weekStr = '星期三'
            break
          case 4:
            _weekStr = '星期四'
            break
          case 5:
            _weekStr = '星期五'
            break
          case 6:
            _weekStr = '星期六'
            break
        }
        this.$calendarToday_date.text(changeStr)
        this.$calendarToday_week.text(_weekStr)
      },

      // 输入数据并显示
      showCalendar: function () {
        const year = dateObj.getDate().getFullYear()
        const month = dateObj.getDate().getMonth() + 1
        const dateStr = returnDateStr(dateObj.getDate())
        const firstDay = new Date(year, month - 1, 1)
        this.$calendarTitle_text.text(year + '/' + dateStr.substr(4, 2))

        // allDay: 得到当前列表显示的所有天数
        this.$calendarDate_item.each(function (i) {
          const allDay = new Date(year, month - 1, i + 1 - firstDay.getDay())
          const allDay_str = returnDateStr(allDay)
          $(this).text(allDay.getDate()).attr('data', allDay_str)
          if (returnDateStr(new Date()) === allDay_str) {
            $(this).attr('class', 'item item-curDay')
          } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
            $(this).attr('class', 'item item-curMonth')
          } else {
            $(this).attr('class', 'item')
          }
        })
      },

      // 渲染DOM
      renderDOM: function () {
        this.$calendar_title = $('<div class="calendar-title"></div>')
        this.$calendar_week = $('<ul class="calendar-week"></ul>')
        this.$calendar_date = $('<ul class="calendar-date"></ul>')
        this.$calendar_today = $('<div class="calendar-today"></div>')
        const _titleStr = `<a href="javascript:void(0);" class="title"></a>
                             <a href="javascript:;" id="backToday">今</a>
                             <div class="arrow">
                              <span class="arrow-prev"><</span>
                              <span class="arrow-next">></span>
                             </div>`
        const _weekStr = `<li class="item">日</li>
                            <li class="item">一</li>
                            <li class="item">二</li>
                            <li class="item">三</li>
                            <li class="item">四</li>
                            <li class="item">五</li>
                            <li class="item">六</li>`
        let _dateStr = ''
        const _dayStr = `<i class="leftTriangle"></i>
                           <p class="date"></p>
                           <p class="week"></p>`
        for (let i = 0; i < 6; i++) {
          _dateStr += `<li class="item">26</li>
                         <li class="item">26</li>
                         <li class="item">26</li>
                         <li class="item">26</li>
                         <li class="item">26</li>
                         <li class="item">26</li>
                         <li class="item">26</li>`
        }
        this.$calendar_title.html(_titleStr)
        this.$calendar_week.html(_weekStr)
        this.$calendar_date.html(_dateStr)
        this.$calendar_today.html(_dayStr)
        this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today)
        this.$calendar.show()
      },

      // 初始化
      inital: function () {
        const self = this
        this.renderDOM()
        this.$calendarTitle_text = this.$calendar_title.find('.title')
        this.$backToday = $('#backToday')
        this.$arrow_prev = this.$calendar_title.find('.arrow-prev')
        this.$arrow_next = this.$calendar_title.find('.arrow-next')
        this.$calendarDate_item = this.$calendar_date.find('.item')
        this.$calendarToday_date = this.$calendar_today.find('.date')
        this.$calendarToday_week = this.$calendar_today.find('.week')
        this.showCalendar()
        if (this.opts.ifSwitch) {
          this.$arrow_prev.bind('click', function () {
            const _date = dateObj.getDate()
            dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1))
            self.showCalendar()
          })
          this.$arrow_next.bind('click', function () {
            const _date = dateObj.getDate()
            dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1))
            self.showCalendar()
          })
        }
        if (this.opts.backToday) {
          this.$backToday.bind('click', function () {
            if (!self.$calendarDate_item.hasClass('item-curDay')) {
              dateObj.setDate(new Date())
              self.showCalendar()
            }
          })
        }
        this.$calendarDate_item.hover(
          function () {
            self.showHoverInfo($(this))
          },
          function () {
            self.$calendar_today
              .css({
                left: 0,
                top: 0,
              })
              .hide()
          }
        )
      },
      constructor: Calendar,
    }
    $.fn.calendar = function (options) {
      const calendar = new Calendar(this, options)
      return calendar.inital()
    }

    // 日期转字符串
    function returnDateStr(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month <= 9 ? '0' + month : '' + month
      day = day <= 9 ? '0' + day : '' + day
      return year + month + day
    }

    // 字符串转日期
    function changingStr(fDate) {
      const fullDate = fDate.split('-')
      return new Date(fullDate[0], fullDate[1] - 1, fullDate[2])
    }
  })(jQuery, window, document)

  // 获取 css
  function getCSS(str) {
    let css
    if (str === 'mainCSS') {
      css = [
        '/* 清空默认边距  */',
        'body,h1,h2,h3,h4,h5,h6,pdl,dt,dd {',
        '    margin:0px;',
        '}',
        'div,ul,ol,li,pre,code,form,fieldset,legend,input,texarea,blockquote,th,td {',
        '    margin:0px;',
        '    padding:0px;',
        '}',

        '/* 设置表格默认背景为透明 */',
        'table {',
        '    background-color: rgba(0,0,0,0)!important;',
        '}',

        '/* 登录界面 */',
        '#loginDiv {',
        '    height: 294px;',
        '    margin-right: 12px;',
        '}',

        '/* 教学安排 */',
        '#scheduleDiv {',
        '    width: 262px;',
        '    height: 550px;',
        '    margin-top: 15px;',
        '}',

        '/* 通知公告 */',
        '#noticeDiv {',
        '    width: 98%;',
        '    height: 294px;',
        '}',

        '/* 公共下载 */',
        '#downloadDiv {',
        '    width: 98%;',
        '    height: 294px;',
        '    margin-top: 15px;',
        '}',
        '#downloadDiv div {',
        '    height: 250px;',
        '    overflow: auto',
        '}',
        '/* 通知公告更多,公共下载更多 */',
        '#spn_tzgz:hover,#spn_ggxz:hover {',
        '    color: #1f8dda;',
        '    cursor: pointer',
        '}',

        '/* 时间、校历、人员 */',
        "div[class*='otherDiv'] {",
        '    height: 83px;',
        '    margin-top: 15px;',
        '    overflow: hidden;',
        '    position: relative;',
        '}',
        "div[class*='otherDiv'] img {",
        '    width: 273px;',
        '    position: absolute;',
        '    top: -5px;',
        '}',
        "div[class*='otherDiv'] img::nth-child(1) {",
        '    height: 93px;',
        '}',
        "div[class*='otherDiv'] img::nth-child(2) {",
        '    height: 89px;',
        '}',
        "div[class*='otherDiv'] img::nth-child(3) {",
        '    height: 104px;',
        '}',
        '/* 添加点击涟漪效果 */',
        '.ripple {',
        '    position: absolute;',
        '    background: rgba(0, 0, 0, .15);',
        '    border-radius: 50%;',
        '    transform: scale(0);',
        '    ointer-events: none;',
        '}',
        '.show {',
        '    animation: ripple .75s ease-out;',
        '}',
        '@keyframes ripple {',
        '    to {',
        '        transform: scale(2);',
        '        pacity: 0;',
        '    }',
        '}',
        '.otherIframe {',
        '    width: 650px;',
        '    height: 680px;',
        '    display: none;',
        '    border-radius: 6px;',
        '    box-sizing: border-box;',
        '    border: 6px solid #78b9d7;',
        '    box-shadow: 0 0 6px 2px #888;',
        '}',

        '/* 管理规定 */',
        '#managerDiv {',
        '    height: 240px;',
        '    margin: 15px 0;',
        '}',

        '/* 添加圆角、阴影、过渡 */',
        "#loginDiv,#scheduleDiv,#noticeDiv,#downloadDiv,div[class*='otherDiv'],#managerDiv {",
        '    border-radius: 6px;',
        '    transition: box-shadow 200ms;',
        '    box-shadow: 0 0 6px 2px #888;',
        '}',
        '#loginDiv:hover,#scheduleDiv:hover,#noticeDiv:hover,#downloadDiv:hover,',
        "div[class*='otherDiv']:hover,#managerDiv:hover {",
        '    box-shadow: 0 0 2px 0 #888;',
        '}',

        '/* 下面的 css 是日历界面 */',
        'a,a:hover {',
        '    color:#888;',
        '    text-decoration:none;',
        '}',
        'ul,li {',
        '    list-style:none;',
        '}',
        '.calendar {',
        '    box-shadow:0 0 6px 2px #888;',
        "    font-family:'微软雅黑';",
        '    font-size:12px;',
        '    color:#888;',
        '    display:none;',
        '    width:245px;',
        '    padding:4px 13px;',
        '    background-color:#fafafa;',
        '    border-radius:6px;',
        '    transition:all 200ms;',
        '    -webkit-transition:all 200ms;',
        '}',
        '.calendar:hover {',
        '    box-shadow:0 0 2px 0 #888;',
        '    background-color:#fff;',
        '}',
        '.calendar-title {',
        '    position:relative;',
        '    height:20px;',
        '    line-height:20px;',
        '    padding:10px 0;',
        '}',
        '.calendar-title a.title {',
        '    display:inline-block;',
        '    font-size:16px;',
        '    text-indent:10px;',
        '}',
        '#backToday {',
        '    position:absolute;',
        '    left:60%;',
        '    top:8px;',
        '    width:30px;',
        '    height:30px;',
        '    line-height:30px;',
        '    text-align:center;',
        '    border-radius:50%;',
        '    color:#fff;',
        '    background-color:#78b9d7;',
        '    font-size:18px;',
        '}',
        '.calendar-title .arrow {',
        '    position:absolute;',
        '    top:8px;',
        '    right:0;',
        '    width:50px;',
        '}',
        '.calendar-title .arrow span {',
        '    color:#ddd;',
        '    font-size:26px;',
        '    cursor:pointer;',
        '    -webkit-user-select:none;',
        '    -moz-user-select:none;',
        '    -ms-user-select:none;',
        '    -o-user-select:none;',
        '    user-select:none;',
        '}',
        '.calendar-title .arrow span:hover {',
        '    color:#888;',
        '}',
        '.calendar-title .arrow-prev {',
        '    float:left;',
        '}',
        '.calendar-title .arrow-next {',
        '    float:right;',
        '}',
        '.calendar-week,.calendar-date {',
        '    overflow:hidden;',
        '}',
        '.calendar-week .item,.calendar-date .item {',
        '    float:left;',
        '    width:35px;',
        '    height:35px;',
        '    line-height:35px;',
        '    text-align:center;',
        '}',
        '.calendar-week {',
        '    border-bottom:1px solid #78b9d7;',
        '    font-weight:bold;',
        '    font-size:16px;',
        '}',
        '.calendar-date .item {',
        '    border-radius:50%;',
        '    color:#dfdfdf;',
        '    cursor:pointer;',
        '    font-size:14px;',
        '}',
        '.calendar-date .item:hover,.calendar-date .item-curMonth:hover {',
        '    background-color:#dfdfdf;',
        '}',
        '.calendar-date .item-curMonth {',
        '    color:#333;',
        '}',
        '.calendar-date .item-curDay,.calendar-date .item-curDay:hover {',
        '    color:#fff;',
        '    background-color:#78b9d7;',
        '}',
        '.calendar-today {',
        '    display:none;',
        '    opacity:0;',
        '    position:absolute;',
        '    right:20px;',
        '    top:20px;',
        '    width:90px;',
        '    height:48px;',
        '    padding:6px 10px;',
        '    background-color:#78b9d7;',
        '    border-radius:5px;',
        '}',
        '.LeftTriangle,.rightTriangle {',
        '    position:absolute;',
        '    top:50%;',
        '    left:-16px;',
        '    margin-top:-8px;',
        '    border-width:8px;',
        '    border-style:solid;',
        '}',
        '.LeftTriangle {',
        '    border-color:transparent #78b9d7 transparent transparent;',
        '}',
        '.rightTriangle {',
        '    border-color:transparent transparent transparent #78b9d7;',
        '}',
        '.calendar-today p {',
        '    color:#fff;',
        '    margin:6px 0;',
        '    font-size:14px;',
        '    line-height:14px;',
        '}',
      ].join('\n')
    } else {
      css = [
        '/* 修改背景色 */',
        '.mdui-loaded {',
        '    background-color: #fafafa;',
        '}',
        '/* 清除聚焦时外边框 */',
        ':focus {',
        '    outline: 0px;',
        '    outline-offset: 0px;',
        '}',

        '/* 添加鼠标覆盖/聚焦的阴影效果 */',
        '.selectDiv:hover,.tx1:focus,.tx1:hover,#imgCode:hover {',
        '    box-shadow: 0 0 4px 2px #78b9d7;',
        '}',

        '/* 给登录界面的所有输入框定义样式 */',
        '.tx1 {',
        '    margin: 0!important;',
        '    height: 30px;',
        '    width: 164px;',
        '    line-height: 30px;',
        '    margin-bottom: 4px;',
        '    vertical-align: bottom;',
        '    color: rgb(204, 204, 204);',
        '    border: 1px solid rgb(228, 228, 228);',
        '    background-color: rgb(254, 255, 255);',
        '}',
        '#txt_pewerwedsdfsdff:focus {',
        '    color: #000;',
        '}',

        '/* 验证码输入框样式 */',
        '.tx1#txt_sdertfgsadscxcadsads {',
        '    width: 120px;',
        '}',

        '/* 验证码高度调成和输入框一致 */',
        '#imgCode {',
        '    height: 32px!important;',
        '    vertical-align: bottom;',
        '}',

        '/* 登录按钮添加按钮效果 */',
        '.btnlogin:hover {',
        '    opacity: 0.6;',
        '}',
        '.btnlogin:focus {',
        '    opacity: 1.0;',
        '}',
      ].join('\n')
    }
    return css
  }
})()
