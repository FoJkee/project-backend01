import {Request, Response, Router} from "express";
import {http_statuses} from "../index";
import {ErrorType, VideoType} from "../types";

export const videosRouter = Router()

const getNextDayDate = (dateNow: Date): Date => {
    const nextDay = new Date()
    return new Date(nextDay.setDate(dateNow.getDate() + 1))
}

const initDate = new Date()

export const videos: VideoType[] = [
    {
        id: 0,
        title: "any string",
        author: "any string",
        canBeDownloaded: false,
        minAgeRestriction: 12,
        createdAt: initDate.toISOString(),
        publicationDate: getNextDayDate(initDate).toISOString(),
        availableResolutions: ["P144"]
    }
]
videosRouter.get('/', (req: Request, res: Response) => {
    res.status(http_statuses.OK_200).send(videos)
})

videosRouter.post('/', (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const errorsMessages: ErrorType[] = []

    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "title"
        })
    }
    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errorsMessages.push({
            message: "Incorrect author",
            field: "author"
        })
    }
    if (errorsMessages.length > 0) {
        res.status(400).send(errorsMessages)
        return
    }
    const dateNow = new Date()

    const newVideo: VideoType = {
        id: +dateNow,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: getNextDayDate(dateNow).toISOString(),
        availableResolutions: availableResolutions
    }
    videos.push(newVideo)
    res.status(http_statuses.Created_201)

})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const videosGetId = videos.find(p => p.id === +req.params.id)
    if (!videosGetId) {
        res.status(http_statuses.Not_Found_404)
        return
    }
    res.status(http_statuses.OK_200).send(videosGetId)
})
//
videosRouter.put('/:id', (req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction} = req.body
    const errorsMessages: ErrorType[] = []


    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "title"
        })
    }
    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errorsMessages.push({
            message: "Incorrect author",
            field: "author"
        })
    }
    if (!(typeof (minAgeRestriction) === "number") ||
        minAgeRestriction < 1 || minAgeRestriction > 18 ||
        !minAgeRestriction) {

        errorsMessages.push({
            message: "Incorrect age",
            field: "age"
        })
    }

    if (errorsMessages.length > 0) {
        res.status(http_statuses.Bad_Request_400).send(errorsMessages)
        return
    }


    const dateNow = new Date()

    const video = videos.find(p => p.id === +req.params.id)

    if (!video) {
        res.status(http_statuses.Not_Found_404)
        return
    }

    video.id = +dateNow
    video.title = title
    video.author = author
    video.canBeDownloaded = canBeDownloaded
    video.minAgeRestriction = minAgeRestriction
    video.createdAt = dateNow.toISOString()
    video.publicationDate = getNextDayDate(dateNow).toISOString()
    video.availableResolutions = availableResolutions


    res.status((http_statuses.No_Content_204))
})



videosRouter.delete('/:id', (req: Request, res: Response) => {
    const videosDeleteId = videos.filter(p => p.id !== +req.params.id)
    if (!videosDeleteId) {
        res.status(http_statuses.Not_Found_404)
    } else {
        res.status(http_statuses.No_Content_204).send(videosDeleteId)
    }
})
