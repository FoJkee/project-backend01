import express, {Request, Response} from 'express'
import {videosRouter} from "./router/videos-router";
import {testingRouter} from "./router/testing-router";

export const app = express()
const port = process.env.PORT || 4000

const parserMiddleware = express.json()

app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing', testingRouter)

export const http_statuses = {
    OK_200: 200,
    Created_201: 201,
    No_Content_204: 204,
    Bad_Request_400: 400,
    Not_Found_404: 404,
}
app.get('/', (req: Request, res: Response) => {
    res.send('Hey you!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})