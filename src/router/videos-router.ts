import {Request, Response, Router} from "express";
import {ErrorType, VideoType} from "../types";


export const videosRouter = Router()

const getNextDayDate = (dateNow: Date): Date => {
    const nextDay = new Date()
    return new Date(nextDay.setDate(dateNow.getDate() + 1))
}
const initDate = new Date()

export const videos: VideoType[] = [
    // {
    //     id: 0,
    //     title: "string",
    //     author: "string",
    //     canBeDownloaded: false,
    //     minAgeRestriction: null,
    //     createdAt: initDate.toISOString(),
    //     publicationDate: getNextDayDate(initDate).toISOString(),
    //     availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    // },
    // {
    //     id: 1,
    //     title: "string",
    //     author: "string",
    //     canBeDownloaded: false,
    //     minAgeRestriction: null,
    //     createdAt: initDate.toISOString(),
    //     publicationDate: getNextDayDate(initDate).toISOString(),
    //     availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    // },
    // {
    //     id: 2,
    //     title: "string",
    //     author: "string",
    //     canBeDownloaded: false,
    //     minAgeRestriction: null,
    //     createdAt: initDate.toISOString(),
    //     publicationDate: getNextDayDate(initDate).toISOString(),
    //     availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    // }

]

const errors: ErrorType[] = []
videosRouter.get('/', (req: Request, res: Response) => {
    const {title, author} = req.body
    const videosGet: VideoType =
        {
            id: +initDate,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: initDate.toISOString(),
            publicationDate: getNextDayDate(initDate).toISOString(),
            availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
        }

    videos.push(videosGet)

    res.status(200).send(videos)
})

videosRouter.post('/', (req: Request, res: Response) => {

    const {title, author} = req.body

    const newVideo: VideoType = {
        id: +initDate,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: initDate.toISOString(),
        publicationDate: getNextDayDate(initDate).toISOString(),
        availableResolutions: ["P144"]
    }

    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errors.push({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }]
        })
    }

    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errors.push({
            errorsMessages: [{
                message: "Incorrect author",
                field: "author"
            }]
        })
    }

    if (errors.length > 0) {
        res.status(400).send(errors)
        return;
    }
    videos.push(newVideo)
    res.status(201).send(videos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const videosGetId = videos.find(el => el.id === +req.params.id)
    if (!videosGetId) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(videosGetId)
})
//
videosRouter.put('/:id', (req: Request, res: Response) => {
    const {title, author, minAgeRestriction} = req.body

    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errors.push({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }]
        })
    }

    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errors.push({
            errorsMessages: [{
                message: "Incorrect author",
                field: "author"
            }]
        })

    }
    if (!(typeof (minAgeRestriction) === "number") || minAgeRestriction < 1 ||
        minAgeRestriction > 18) {

        errors.push({
            errorsMessages: [{
                message: "Incorrect minAgeRestriction",
                field: "minAgeRestriction"
            }]
        })
    }

    if (errors.length > 0) {
        res.status(400).send(errors)
        return;
    }
    const videoPut = videos.find(p => p.id === +req.params.id)

    if (!videoPut) {
        res.sendStatus(404)
        return;
    }

    videoPut.id = +initDate
    videoPut.title = title
    videoPut.author = author
    videoPut.canBeDownloaded = true
    videoPut.minAgeRestriction = 18
    videoPut.createdAt = initDate.toISOString()
    videoPut.publicationDate = getNextDayDate(initDate).toISOString()
    videoPut.availableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

        res.sendStatus(204)

})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)


    // for (let key of videos) {
    //     if (videos[key] === +req.params.id) {
    //         videos.splice(key.id, 1)
    //         res.status(204)
    //     }
    // }
    // res.status(404)
})
