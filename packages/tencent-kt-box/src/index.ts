// 签到成功次数
let count = 0

//去除水印， 添加开关样式
GM_addStyle(
  [
    "a[class*='marquee animation'],txpdiv[class*='player-inject'],.switchButton-checkbox {",
    '    display: none!important;',
    '}',
    '/* 开关 */',
    '.switchButton {',
    '    position: relative;',
    '    width: 90px;',
    '    margin: 15px 514.33px 15px auto;',
    '    z-index: 9999;',
    '    user-select: none;',
    '    -webkit-user-select: none;',
    '    -moz-user-select: none;',
    '    -ms-user-select: none;',
    '}',
    '.switchButton::before {',
    '    display: block;',
    "    content: '自动签到开关';",
    '    color: #aaa;',
    '    font-size: 18px;',
    '    line-height: 33px;',
    '    position: absolute;',
    '    left: -115px;',
    '}',
    '.switchButton-label {',
    '    display: block;',
    '    overflow: hidden;',
    '    cursor: pointer;',
    '    border: 2px solid #999999;',
    '    border-radius: 20px;',
    '}',
    '.switchButton-inner {',
    '    display: block;',
    '    width: 200%;',
    '    margin-left: -100%;',
    '    transition: margin 0.3s ease-in 0s;',
    '}',
    '.switchButton-inner::before,',
    '.switchButton-inner::after {',
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
    '.switchButton-inner::after {',
    '    content: attr(data-on);',
    '    padding-left: 10px;',
    '    background-color: #23b8ff;',
    '    color: #FFFFFF;',
    '}',
    '.switchButton-inner::before {',
    '    content: attr(data-off);',
    '    padding-right: 10px;',
    '    background-color: ##1d1d1d;',
    '    color: #FFFFFF;',
    '    text-align: right;',
    '}',
    '.switchButton-switch {',
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
    '.switchButton-checkbox:checked+.switchButton-label .switchButton-inner {',
    '    margin-left: 0;',
    '}',
    '.switchButton-checkbox:checked+.switchButton-label .switchButton-switch {',
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
    '}'
  ].join('\n')
)

// 创建开关
const switchButton = GM_addElement(document.body, 'div', {
  class: 'switchButton'
})
GM_addElement(switchButton, 'input', {
  id: 'ON_OFF',
  type: 'checkbox',
  checked: true
})
const label = GM_addElement(switchButton, 'label', {
  class: 'switchButton-label',
  for: 'ON_OFF'
})
GM_addElement(label, 'span', {
  class: 'switchButton-inner',
  'data-on': 'ON',
  'data-off': 'OFF'
})
GM_addElement(label, 'span', {
  class: 'switchButton-switch'
})


// 签到成功提示
const tips = GM_addElement(switchButton, 'div', {
  class: 'myTips'
})

// 点击确认按钮
function autoConfirm() {
  const confirmButton = document.querySelector('.s-btn.s-btn--primary.s-btn--m') as HTMLElement
  try {
    if (/确.*定/g.test(confirmButton.innerHTML)) {
      confirmButton!.click()
    }
  } catch (e) {
    console.error('点击确定按钮失败，原因: ', e)
  }
}

// 点击签到按钮
function autoSign() {
  const signButton = document.querySelector('.s-btn.s-btn--primary.s-btn--m') as HTMLElement
  try {
    if (/签.*到/g.test(signButton.innerHTML)) {
      signButton.click()
      count += 1
      tips.innerHTML = `签到成功<span style='color: red'>${count}</span>次!`
      tips.style.display = `block`
      setTimeout(autoConfirm, 2000)
    }
  } catch (e) {
    console.error('点击签到按钮失败，原因: ', e)
  }
}

// 默认开启自动签到
let timer = setInterval(autoSign, 3500)

// 控制自动签到的开关状态
const switchBtn = document.getElementById('ON_OFF') as HTMLInputElement
switchBtn?.addEventListener('click', () => {

  if (switchBtn.checked) {
    // 开启自动签到
    timer = setInterval(autoSign, 3500)
  } else {
    // 关闭自动签到
    clearInterval(timer)
  }
})
