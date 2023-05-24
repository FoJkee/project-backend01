import express, {Request, Response} from 'express'
import {availableParallelism} from "os";

const app = express()
const port = 3008

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
    minAgeRestriction: null,
    createdAt: Date,
    publicationDate: Date,
    availableResolutions: string[]
}

const videos: { bd: videoType[] } = {
        bd: [{
            id: 0,
            title: "string",
            author: "string",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
        }
        ]
    }

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.bd = []
    res.sendStatus(http_statuses.No_Content_204)
})

app.get('/videos', (req: Request, res: Response) => {
    const videoGet = videos.bd
    if (videoGet) {
        res.send(videoGet).sendStatus(http_statuses.OK_200)
        return
    }
    res.sendStatus(http_statuses.Not_Found_404)
})


app.get('/videos/:id', (req: Request, res: Response) => {
    const videosGetId = videos.bd.find(p => p.id === +req.params.id)
    if (!videosGetId) {
        res.sendStatus(http_statuses.Not_Found_404)
        return
    }
    res.send(videosGetId)
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const videosDeleteId = videos.bd.filter(c => c.id !== +req.params.id)
    if (!videosDeleteId) {
        res.send('Not Found').status(404)
        return
    }
    res.send(videosDeleteId).status(204)
})
//
// app.put('/videos/:id', (req: Request, res: Response) => {
//     if (!req.body.title) {
//         res.send({
//             errorsMessages: [
//                 {
//                     "message": "string",
//                     "field": "string"
//                 }
//             ]
//         })
//             .status(400)
//         return;
//     }
//     const videoPut = videos.find(p => p.id === +req.params.id)
//     if (!videoPut) {
//         res.send('Not Found')
//             .status(404)
//         return
//     }
//     videoPut.title = req.body.title
//     res.send('No Content').status(204)
// })
//
app.post('/videos', (req: Request, res: Response) => {
    const videoPost: any = {
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions[0]
    }
videos.bd.push(videoPost)
res.sendStatus(http_statuses.Created_201)







})









app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})