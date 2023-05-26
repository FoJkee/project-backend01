import {Request, Response, Router} from "express";
import {http_statuses} from "../index";


export const videosRouter = Router()


const createdAt = new Date()
const publicationDate = new Date()
publicationDate.setDate(createdAt.getDate() + 1)

const videos: videoType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: false,
        minAgeRestriction: 12,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P144"]
    }
]
videosRouter.get('/', (req: Request, res: Response) => {
        res.send(videos).sendStatus(http_statuses.OK_200)
})

videosRouter.post('/', (req: Request, res: Response) => {
    const videoPost:any = {
        id: +(new Date()),
        title: req.body.title,
        author:req.body.author,
    }

    if (!req.body.title || !(req.body.title.length <= 40) || !(typeof (req.body.title) === 'string')) {
        res.send({
                errorsMessages: [
                    {
                        message: "Correct title",
                        field: 'title'
                    }
                ]
            }
        ).sendStatus(http_statuses.Bad_Request_400)
        return
    }
        videos.push(videoPost)
        res.json(201)

    if (!req.body.author || !(req.body.author.length <= 20) || !(typeof (req.body.author) === 'string')) {
        res.send({
                errorsMessages: [
                    {
                        message: "Correct author",
                        field: 'author'
                    }
                ]
            }).sendStatus(http_statuses.Bad_Request_400)
        return
    }
    videos.push(videoPost)
    res.json(201)



})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const videosGetId = videos.find(p => p.id === +req.params.id)
    if (!videosGetId) {
        res.sendStatus(http_statuses.Not_Found_404)
        return
    }
        res.json(videosGetId).sendStatus(http_statuses.OK_200)
})
//
videosRouter.put('/:id', (req: Request, res: Response) => {

    const videoPut = videos.find(p => p.id === +req.params.id)
    if (!videoPut) {
        res.status(404)
        return
    }
    if (!req.body.title || !(req.body.title.length <= 40) || !(typeof (req.body.title) === 'string')) {
        res.send({
                errorsMessages: [
                    {
                        message: "Correct title",
                        field: 'title'
                    }
                ]
            }
        ).sendStatus(http_statuses.Bad_Request_400)
        return
    }
    if (!req.body.author || !(req.body.author.length <= 20) || !(typeof (req.body.author) === 'string')) {
        res.send({
                errorsMessages: [
                    {
                        message: "Correct author",
                        field: 'author'
                    }
                ]
            }
        ).sendStatus(http_statuses.Bad_Request_400)
        return
    }
    if (req.body.minAgeRestriction < 1 && req.body.minAgeRestriction > 18) {
        res.send({
                errorsMessages: [
                    {
                        message: "Correct age",
                        field: 'Age'
                    }
                ]
            }
        ).sendStatus(http_statuses.Bad_Request_400)
        return
    }

    if (videoPut) {
        videoPut.title = req.body.title
        videoPut.author = req.body.author
        videoPut.availableResolutions = req.body.availableResolutions
        videoPut.canBeDownloaded = req.body.canBeDownloaded
        videoPut.minAgeRestriction = req.body.minAgeRestriction
        videoPut.publicationDate = new Date().toISOString()
        res.sendStatus(http_statuses.No_Content_204)
    } else {
        res.sendStatus(http_statuses.Not_Found_404)
    }
})

//
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const videosDeleteId = videos.filter(p => p.id !== +req.params.id)
    if (!videosDeleteId) {
        res.sendStatus(http_statuses.Not_Found_404)
        return
    } else {
        res.send(videosDeleteId).sendStatus(http_statuses.No_Content_204)
    }
})
