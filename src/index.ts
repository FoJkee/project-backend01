import express from 'express'
import bodyParser from "body-parser";
import {videosRouter} from "./router/videos-router";
import {testingRouter} from "./router/testing-router";

const app = express()
const port = process.env.PORT || 4000

const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

export const http_statuses = {
    OK_200: 200,
    Created_201: 201,
    No_Content_204: 204,
    Bad_Request_400: 400,
    Not_Found_404: 404,
}


app.use('/videos', videosRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})