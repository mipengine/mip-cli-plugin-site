/**
 * @file debug script
 * @author wangyisheng@baidu.com (wangyisheng)
 */

if (location.href.indexOf('/wishwing') === -1) {
  document.querySelector('.input-wrapper').style.display = 'block'
}

let urlFromParams
if (location.search.indexOf('url=') !== -1) {
  try {
    urlFromParams = location.search.match(/url=([^&]+)/)[1]
  } catch (e) {}
  if (urlFromParams) {
    document.querySelector('#url').value = urlFromParams
  }
}
let cacheButton = document.querySelector('#fromCache')

// 默认设置为线下
if (window.localStorage.mipsitenocache === undefined) {
  window.localStorage.mipsitenocache = '1'
}
let fromCache = window.localStorage.mipsitenocache !== '1'
toggleCache(fromCache)

document.querySelector('#go-button').addEventListener('click', () => {
  let url = document.querySelector('#url').value
  if (!url) {
    alert('必须输入目标页面的 URL');
    return
  }
  url = '/wishwing' + makeCacheUrl(url)
  console.log('跳转前往：', url)

  let logo = document.querySelector('#logo').value
  let title = document.querySelector('#title').value

  let options
  if (logo || title) {
    let obj = {type: 'cambrian'}
    if (logo) {
      obj.logo = logo
    }
    if (title) {
      obj.title = title
    }
    options = {
      title: JSON.stringify(obj)
    }
    console.log('SF Loading参数', options)
  }

  document.querySelectorAll('#sfr-app .sfa-view').forEach(oldView => oldView.remove())
  fif.action.redirect(url, null, options)
})

cacheButton.addEventListener('click', () => {
  fromCache = !fromCache
  window.localStorage.mipsitenocache = fromCache ? '' : '1'
  toggleCache(fromCache)
})

function isCacheUrl (pageUrl) {
  return /mipcache.bdstatic.com/.test(pageUrl) ||
    /^(\/\/|http:\/\/|https:\/\/)([A-Za-z0-9]{1,}-?){1,}.mipcdn.com\/(stati)?c\//.test(pageUrl)
}

function makeCacheUrl (url, type, containsHost) {
  if (isCacheUrl(url) ||
    (url && url.length < 8) ||
    !(url.indexOf('http') === 0 || url.indexOf('//') === 0)
  ) {
    return url
  }
  let prefix = (type === 'img') ? '/i/' : '/c/'
  if (url.indexOf('//') === 0 || url.indexOf('https') === 0) {
    prefix += 's/'
  }
  let urlParas = url.split('//')
  urlParas.shift()
  let host = urlParas[0].substring(0, urlParas[0].indexOf('/'))
  url = urlParas.join('//')

  let result = prefix + url
  if (containsHost) {
    result = location.protocol + '//' + host.replace(/-/g, '--').replace(/\./g, '-') + '.mipcdn.com' + result
  }

  return result
}

function toggleCache (fromCache) {
  cacheButton.innerHTML = `当前状态：<span>线${fromCache ? '上' : '下'}测试</span>`
  document.querySelectorAll('.cache-hint').forEach(span => {
    let force = span.getAttribute('type').indexOf('Online') !== -1
    if (!fromCache) {
      force = !force
    }
    span.style.display = force ? 'block' : 'none'
  })
}
