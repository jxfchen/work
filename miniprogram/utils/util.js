const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isMobile = m => {
  const p = /^1([358][0-9]|4[1579]|66|7[0135678]|9[89])[0-9]{8}/;
  return p.test(m);
}

module.exports = {
  formatTime: formatTime,
  isMobile: isMobile
}