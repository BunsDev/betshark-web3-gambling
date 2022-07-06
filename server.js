import express from 'express'
const app = express()
import { join, resolve } from 'path'
import cors from 'cors'

// modules don't have __dirname
const __dirname = resolve()

app.use(cors())
app.use(express.static(join(__dirname, 'dist')))

app.get('/tries', (request, response) => {
    const { game, address } = request.query
    if (!game || !address) {
        return response.status(400).send('Missing game')
    }
    if (game === 'coinflip') {
        return response.json(3)
    }
})

app.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});