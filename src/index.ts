import express, {Request, Response} from 'express'
import {videosRouter} from "./router/videos-router";
import {testingRouter} from "./router/testing-router";

const app = express()
const port = process.env.PORT || 4000

const parserMiddleware = express.json()

app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing', testingRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hey you!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})