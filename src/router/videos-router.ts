import {Request, Response, Router} from "express";
import {http_statuses} from "../index";
import {ErrorType, VideoType} from "../types";


export const videosRouter = Router()

const getNextDayDate = (dateNow: Date): Date => {
    const nextDay = new Date()
    return new Date(nextDay.setDate(dateNow.getDate() + 1))
}
const initDate = new Date()

export const videos:VideoType[] = []

const errors:ErrorType[] = []
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
            availableResolutions:["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
        }

    videos.push(videosGet)

    res.status(200).send(videos)
})

videosRouter.post('/', (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body

    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errors.push({
                message: "Incorrect title",
                field: "title"
        })
    }
    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errors.push({
            message: "Incorrect author",
            field: "author"
        })
    }

    if (errors.length > 0) {
        res.status(400).send(errors)
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
        res.status(404)
    } else {
        res.send(videosGetId)
    }
})
//
videosRouter.put('/:id', (req: Request, res: Response) => {

    const video = videos.find(p => p.id === +req.params.id)
    if (!video) {
        res.status(404)
        return
    }
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction} = req.body

    if (!title || !(typeof (title) === 'string') || !title.trim() || title.length > 40) {
        errors.push({
                message: "Incorrect title",
                field: "title"
        })

    }
    if (!author || !(typeof (author) === 'string') || !author.trim() || author.length > 20) {
        errors.push({
            message: "Incorrect author",
            field: "author"
        })

    }
    if (!(typeof (minAgeRestriction) === "number") || minAgeRestriction < 1 ||
        minAgeRestriction > 18) {

        errors.push({
                message: "Incorrect minAgeRestriction",
                field: "minAgeRestriction"
        })
    }

    if (errors.length > 0) {
        res.status(400).send(errors)
        return
    }
    const dateNow = new Date()
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
    for(let i = 0; i<videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i, 1)
            res.status(204)
            return
        }
    }
    res.status(404)


    // for (let key of videos) {
    //     if (videos[key] === +req.params.id) {
    //         videos.splice(key.id, 1)
    //         res.status(204)
    //     }
    // }
    // res.status(404)
})
