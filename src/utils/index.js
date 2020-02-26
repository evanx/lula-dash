const formatRedisStreamIdTime = id => {
  const match = id.match(/\d+/)
  if (match.length) {
    const time = parseInt(match.pop())
    if (time > 1555000111) {
      const date = new Date(time)
      return (
        date.getDate() +
        ' ' +
        date.getHours() +
        'h' +
        date.getMinutes() +
        ' ' +
        ('0' + date.getSeconds()).slice(-2) +
        '.' +
        ('00' + date.getMilliseconds()).slice(-3)
      )
    }
  }
  return id
}

const formatRedisStreamIdMinute = id => {
  const match = id.match(/\d+/)
  if (match.length) {
    const time = parseInt(match.pop())
    if (time > 1555000111) {
      const date = new Date(time)
      return date.getDate() + ' ' + date.getHours() + 'h' + date.getMinutes()
    }
  }
  return id
}

module.exports = { formatRedisStreamIdTime, formatRedisStreamIdMinute }
