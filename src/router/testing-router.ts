import {Request, Response, Router} from "express";
import {http_statuses} from "../index";

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
export const testingRouter = Router({})
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    const deleteAll: videoType[] = []
    res.send(deleteAll).sendStatus(http_statuses.No_Content_204)
})
