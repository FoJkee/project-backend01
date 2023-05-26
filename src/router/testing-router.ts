import {Request, Response, Router} from "express";
import {http_statuses} from "../index";

const videos: videoType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: false,
        minAgeRestriction: 12,
        createdAt: new Date().toISOString(),
        publicationDate: "2023-05-26T08:23:49.964Z",
        availableResolutions: ["P144"]
    }
]
export const testingRouter = Router()
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.splice(0)
    res.send(videos).sendStatus(http_statuses.No_Content_204)
})
