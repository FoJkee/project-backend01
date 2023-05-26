import {Request, Response, Router} from "express";
import {http_statuses} from "../index";
import {videos} from "./videos-router";


export const testingRouter = Router()
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.splice(0)
    res.status(http_statuses.No_Content_204).send(videos)
})
