import {Request, Response, Router} from "express";
import {http_statuses} from "../index";

export const videosRouter = Router({})

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

const videos: videoType[] = [

]
videosRouter.get('/', (req: Request, res: Response) => {
    if (videos) {
        res.send(videos).sendStatus(http_statuses.OK_200)
        return
    }
    res.sendStatus(http_statuses.Not_Found_404)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const videosGetId = videos.find(p => p.id === +req.params.id)
    if (!videosGetId) {
        res.sendStatus(http_statuses.Not_Found_404)
        return
    }
    res.send(videosGetId)
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const videosDeleteId = videos.filter(p => p.id !== +req.params.id)
    if (!videosDeleteId) {
        res.sendStatus(http_statuses.Not_Found_404)
        return
    }
    res.send(videosDeleteId).sendStatus(http_statuses.No_Content_204)
})
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
videosRouter.post('/', (req: Request, res: Response) => {

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

    /// Данные вводим сами эти?

    const createdAt = new Date()
    const publicationDate = new Date()
    publicationDate.setDate(createdAt.getDate() + 1)

    const videoPost = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    if (videoPost) {
        videos.push(videoPost)
        res.sendStatus(http_statuses.Created_201)
        return;
    }


})
