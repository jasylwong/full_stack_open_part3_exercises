const express = require('express')
const app = express()

app.get('/', (req, res) => 
  res.send('hello world')
)

const Port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${Port}`)
})