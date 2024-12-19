
const container: Element = document.getElementsByClassName('fed-user-list fed-part-rows fed-back-whits')[0]
const all: HTMLCollectionOf<Element> = document.getElementsByClassName('fed-padding-x fed-part-rows fed-line-top')
// 实现排序
container.innerHTML =
  document.getElementsByClassName('fed-padding-x fed-part-rows')[0].outerHTML +
  Array.from(all)
    .sort((a, b) => getDateTime(b) - getDateTime(a))
    .map(item => item.outerHTML)
    .join('')

// 添加最新更新样式
GM_addStyle(`
    .lastUpdate a {
      color: red;
    }
    .lastUpdate a:visited {
      color: #000;
    }
    .lastUpdate a:hover {
      color: #27ae60;
    }
  `)

// 获取更新时间戳
function getDateTime(DOM: Element) {
  const updateTime = new Date(DOM.children[0].children[3].innerHTML).getTime()
  if (new Date(updateTime).toLocaleDateString() === new Date().toLocaleDateString()) {
    DOM.classList.add('lastUpdate')
  }
  return updateTime
}