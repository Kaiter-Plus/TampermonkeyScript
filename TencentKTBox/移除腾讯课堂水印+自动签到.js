// ==UserScript==
// @name         腾讯课堂自动签到 + 去除“xxx正在观看xx”水印
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/TencentKTBox
// @version      1.45
// @description  主要功能是腾讯课堂自动签到以及去除“xxx正在观看xx”水印，修改签到成功提示在自动签到开关的左边进行显示，感谢大家的反馈，如果还有什么建议和意见也可以反馈给我，再次感谢！
// @author       Kaiter-Plus
// @match        https://ke.qq.com/webcourse/*
// @icon         https://8.url.cn/edu/edu_modules/edu-ui/img/nohash/favicon.ico
// @require      http://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @grant        none
// @note         2020/03/26 去除“xxx正在观看xx”水印
// @note         2020/03/31 添加自动签到功能
// @note         2020/04/11 添加自动签到开关按钮（页面右上角）
// @note         2020/04/13 添加更新日志（方便后期管理）
// @note         2020/04/13 修改命名空间，防止变量共享引起一些bug
// @note         2020/04/17 修复开关按钮挡住“分享”的bug
// @note         2020/04/17 紧急修复自动签到不能使用的bug
// @note         2020/04/21 最近腾讯课堂又更新了，自动签到暂时不能用，先下架功能研究一下，后期完善再上架
// @note         2020/04/21 更新自动签到功能
// @note         2020/04/23 添加自动签到如果成功会弹框提示，没有弹框提示则没有签到
// @note         2020/04/23 修改签到成功提示在自动签到开关的左边进行显示
// ==/UserScript==

;(function () {
  // 签到成功次数
  let count = 0

  //去除水印， 添加开关样式
  $('head').append(
    $('<style type="text/css">').text(
      [
        "a[class*='marquee animation'],txpdiv[class*='player-inject'],.testSwitch-checkbox {",
        '    display: none!important;',
        '}',
        '/* 开关 */',
        '.testSwitch {',
        '    position: relative;',
        '    width: 90px;',
        '    margin: 15px 514.33px 15px auto;',
        '    z-index: 9999;',
        '    user-select: none;',
        '    -webkit-user-select: none;',
        '    -moz-user-select: none;',
        '    -ms-user-select: none;',
        '}',
        '.testSwitch::before {',
        '    display: block;',
        "    content: '自动签到开关';",
        '    color: #aaa;',
        '    font-size: 18px;',
        '    line-height: 33px;',
        '    position: absolute;',
        '    left: -115px;',
        '}',
        '.testSwitch-label {',
        '    display: block;',
        '    overflow: hidden;',
        '    cursor: pointer;',
        '    border: 2px solid #999999;',
        '    border-radius: 20px;',
        '}',
        '.testSwitch-inner {',
        '    display: block;',
        '    width: 200%;',
        '    margin-left: -100%;',
        '    transition: margin 0.3s ease-in 0s;',
        '}',
        '.testSwitch-inner::before,',
        '.testSwitch-inner::after {',
        '    display: block;',
        '    float: right;',
        '    width: 50%;',
        '    height: 30px;',
        '    padding: 0;',
        '    line-height: 30px;',
        '    font-size: 14px;',
        '    color: white;',
        '    font-family: Trebuchet, Arial, sans-serif;',
        '    font-weight: bold;',
        '    box-sizing: border-box;',
        '}',
        '.testSwitch-inner::after {',
        '    content: attr(data-on);',
        '    padding-left: 10px;',
        '    background-color: #23b8ff;',
        '    color: #FFFFFF;',
        '}',
        '.testSwitch-inner::before {',
        '    content: attr(data-off);',
        '    padding-right: 10px;',
        '    background-color: ##1d1d1d;',
        '    color: #FFFFFF;',
        '    text-align: right;',
        '}',
        '.testSwitch-switch {',
        '    position: absolute;',
        '    display: block;',
        '    width: 26px;',
        '    height: 26px;',
        '    margin: 4px;',
        '    background: #FFFFFF;',
        '    top: 0;',
        '    bottom: 0;',
        '    right: 56px;',
        '    border: 2px solid #999999;',
        '    border-radius: 20px;',
        '    transition: all 0.3s ease-in 0s;',
        '}',
        '.testSwitch-checkbox:checked+.testSwitch-label .testSwitch-inner {',
        '    margin-left: 0;',
        '}',
        '.testSwitch-checkbox:checked+.testSwitch-label .testSwitch-switch {',
        '    right: 0px;',
        '}',
        '.myTips {',
        '    display: none;',
        '    position: absolute;',
        '    font-size: 18px;',
        '    line-height: 33px;',
        '    color: #aaa;',
        '    left: -270px;',
        '    top: 0;',
        '}',
      ].join('\n')
    )
  )

  // 创建开关
  const testSwitch = $('<div>')
    .addClass('testSwitch')
    .append(
      $('<input>').addClass('testSwitch-checkbox').attr({
        id: 'ON_OFF',
        type: 'checkbox',
        checked: true,
      })
    )
    .appendTo($('body'))
  const label = $('<label>')
    .addClass('testSwitch-label')
    .prop('for', 'ON_OFF')
    .append(
      $('<span>').addClass('testSwitch-inner').attr({
        'data-on': 'ON',
        'data-off': 'OFF',
      })
    )
    .appendTo(testSwitch)
  $('<span>').addClass('testSwitch-switch').appendTo(label)

  // 签到成功提示
  const tips = $('<div>').addClass('myTips').appendTo(testSwitch)

  // 点击确认按钮
  function autoConfirm() {
    const confirmButton = $('.s-btn.s-btn--primary.s-btn--m').get(0)
    try {
      if (/确.*定/g.test(confirmButton.innerHTML)) {
        confirmButton.click()
      }
    } catch (e) {}
  }

  // 点击签到按钮
  function autoSign() {
    //var signButton = document.querySelector(".im-dialog-wrap>im-dialog>btn-group>span")
    const signButton = $('.s-btn.s-btn--primary.s-btn--m').get(0)
    try {
      if (/签.*到/g.test(signButton.innerHTML)) {
        signButton.click()
        count++
        tips.html("签到成功<span style='color: red'>" + count + '</span>次!').css('display', 'block')
        setTimeout(autoConfirm, 2000)
      }
    } catch (e) {}
  }

  // 默认开启自动签到
  let timer = setInterval(autoSign, 3500)

  // 控制自动签到的开关状态
  $('#ON_OFF').on('click', function () {
    if ($('#ON_OFF').is(':checked')) {
      // 开启自动签到
      timer = setInterval(autoSign, 3500)
    } else {
      // 关闭自动签到
      clearInterval(timer)
    }
  })
})()
