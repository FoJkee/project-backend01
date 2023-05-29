import {Request, Response, Router} from "express";
import {Error, VideoType} from "../types";


export const videosRouter = Router()

const getNextDayDate = (dateNow: Date): Date => {
    const nextDay = new Date()
    return new Date(nextDay.setDate(dateNow.getDate() + 1))
}
const initDate = new Date()
const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
export const videos: VideoType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: initDate.toISOString(),
        publicationDate: getNextDayDate(initDate).toISOString(),
        availableResolutions: resolutions
    }
]

const validateFields = (title: string, author: string, availableResolutions: string[], minAgeRestriction: number) => {
    let errorsArr: Error[] = []
    if (!title || !title.trim() || title.length > 40) {
        errorsArr.push({
            message: "Incorrect title",
            field: "title"
        })
    }
    if (!author || !author.trim() || author.length > 20) {
        errorsArr.push({
            message: "Incorrect author",
            field: "author"
        })
    }
    availableResolutions.forEach(el => {
        if (!resolutions.some(el1 => el1 === el)) {
            errorsArr.push({
                message: "Incorrect availableResolutions",
                field: "availableResolutions"
            })
        }
    })
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArr.push({
            message: "Incorrect minAgeRestriction",
            field: "minAgeRestriction"
        })
    }

    return errorsArr
}

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {

    const postDate = new Date()

    const {title, author, availableResolutions, minAgeRestriction} = req.body

    const a = validateFields(title, author,
        availableResolutions, minAgeRestriction)

    if (a.length > 0) {
        res.status(400).json({errorsMessages: a})
        return
    } else {
        const newVideo: VideoType = {
            id: +postDate,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: postDate.toISOString(),
            publicationDate: getNextDayDate(postDate).toISOString(),
            availableResolutions: availableResolutions
        }

        videos.push(newVideo)
        res.status(201).send(newVideo)
    }
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const videosGetId = videos.find(el => el.id === +req.params.id)
    if (!videosGetId) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(videosGetId)
})
videosRouter.put('/:id', (req: Request, res: Response) => {

    const {
        title, author, minAgeRestriction, canBeDownloaded,
        availableResolutions, publicationDate
    } = req.body

    const b = validateFields(title, author,
        availableResolutions, minAgeRestriction)

    if (b.length > 0) {
        res.status(400).json({errorsMessages: b})
        return
    }

    const videoPut = videos.find(p => p.id === +req.params.id)

    if (!videoPut) {
        res.sendStatus(404)
        return;
    }

    videoPut.title = title
    videoPut.author = author
    videoPut.canBeDownloaded = canBeDownloaded
    videoPut.minAgeRestriction = minAgeRestriction
    videoPut.publicationDate = publicationDate
    videoPut.availableResolutions = availableResolutions
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

})
