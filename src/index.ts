import express, {Request, Response} from 'express'
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


type videoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}


/// Данные вводим сами эти?
const videos: videoType[] = [
    {
        id: 0,
        title: '',
        author: '',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    }
]


app.use('/videos', videosRouter)
app.use('/testing', testingRouter)








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})