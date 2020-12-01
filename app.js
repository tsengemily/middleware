const express = require('express')
const time = require('express-timestamp')
const app = express()
const port = 3000

app.use(time.init)

app.use(function (req, res, next) {
  const time = req.timestamp.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const method = req.method
  const url = req.url
  const starttime = new Date()

  res.on('finish', () => {
    const finishtime = new Date()
    const totaltime = finishtime - starttime
    console.log(
      `${time} | ${method} from ${url} | total time : ${totaltime} ms`
    )
  })

  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
