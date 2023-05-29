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


const validateFieldsPost = (title: string, author: string, availableResolutions: string[],
                            minAgeRestriction: number) => {

    let errorsArrPost: Error[] = []
    if (!title || !title.trim() || title.length > 40) {
        errorsArrPost.push({
            message: "Incorrect title",
            field: "title"
        })
    }
    if (!author || !author.trim() || author.length > 20) {
        errorsArrPost.push({
            message: "Incorrect author",
            field: "author"
        })
    }
    availableResolutions.forEach(el => {
        if (!resolutions.some(el1 => el1 === el)) {
            errorsArrPost.push({
                message: "Incorrect availableResolutions",
                field: "availableResolutions"
            })
        }
    })
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArrPost.push({
            message: "Incorrect minAgeRestriction",
            field: "minAgeRestriction"
        })
    }

    return errorsArrPost
}

// const validateFieldsPut = (title: string, author: string, availableResolutions: string[],
//                            minAgeRestriction: number, canBeDownloaded: boolean,
//                            publicationDate:string) => {
//
//     let errorsArrPut: Error[] = []
//     if (!title || !title.trim() || title.length > 40) {
//         errorsArrPut.push({
//             message: "Incorrect title",
//             field: "title"
//         })
//     }
//     if (!author || !author.trim() || author.length > 20) {
//         errorsArrPut.push({
//             message: "Incorrect author",
//             field: "author"
//         })
//     }
//     availableResolutions.forEach(el => {
//         if (!resolutions.some(el1 => el1 === el)) {
//             errorsArrPut.push({
//                 message: "Incorrect availableResolutions",
//                 field: "availableResolutions"
//             })
//         }
//     })
//     if (minAgeRestriction < 1 || minAgeRestriction > 18) {
//         errorsArrPut.push({
//             message: "Incorrect minAgeRestriction",
//             field: "minAgeRestriction"
//         })
//     }
//
//     if (typeof (canBeDownloaded) !== "boolean") {
//         errorsArrPut.push({
//             message: "Incorrect canBeDownloaded",
//             field: "canBeDownloaded"
//         })
//     }
//     if (publicationDate){
//         errorsArrPut.push({
//             message: "Incorrect publicationDate",
//             field: "publicationDate"
//         })
//     }
//     return errorsArrPut
// }


videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {

    const postDate = new Date()

    const {title, author, availableResolutions, minAgeRestriction} = req.body

    const post = validateFieldsPost(title, author,
        availableResolutions, minAgeRestriction)


    if (post.length > 0) {
        res.status(400).json({errorsMessages: post})
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

    const errorsArrPut: Error[] = []

    const videoPut = videos.find(p => p.id === +req.params.id)

    if (!videoPut) {
        res.sendStatus(404)
        return;
    }

    const {
        title, author, minAgeRestriction, canBeDownloaded,
        availableResolutions, publicationDate
    } = req.body

    if (!title || !(typeof (title) === "string") || !title.trim() || title.length > 40) {
        errorsArrPut.push({
            message: "Incorrect title",
            field: "title"
        })
    }
    if (!author || !(typeof (author) === "string") || !author.trim() || author.length > 20) {
        errorsArrPut.push({
            message: "Incorrect author",
            field: "author"
        })
    }
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArrPut.push({
            message: "Incorrect minAgeRestriction",
            field: "minAgeRestriction"
        })
    }

    resolutions.forEach(el => {
        if (!resolutions.some(el1 => el1 === el)) {
            errorsArrPut.push({
                message: "Incorrect availableResolutions",
                field: "availableResolutions"
            })
        }

    })

    if (!publicationDate || typeof (publicationDate) === "number") {
        errorsArrPut.push({
            message: "Incorrect publicationDate",
            field: "publicationDate"
        })
    }

    if (!canBeDownloaded || typeof (canBeDownloaded) !== "boolean") {
        errorsArrPut.push({
            message: "Incorrect canBeDownloaded",
            field: "canBeDownloaded"
        })
        return
    }


    // const b = validateFieldsPut(title, author,
    //     availableResolutions, minAgeRestriction, canBeDownloaded, publicationDate)


    if (errorsArrPut.length > 0) {
        res.status(400).json({errorsMessages: errorsArrPut})
        return
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
