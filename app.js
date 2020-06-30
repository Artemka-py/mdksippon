const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
//const log = require('./log')(module)

const app = express()

app.use(express.json({ extendet: true }))
app.use('/api/auth', require('./routes/auth.rorutes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started in port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        //log.error((new Date).toUTCString() + 'uncaughtException:', e.message)
        //log.error(e.stack)
        process.exit(1)
    }
}

start()
module.exports = start
