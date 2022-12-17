const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())


app.use('/api/members', require('./routes/api/member'))


app.listen(port, () => {
    console.log(`Backend Listening at Port ${port}`)
})