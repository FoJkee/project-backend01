import express, {Request, Response} from 'express'
import {isNumberObject} from "util/types";
const app = express()
const port = 3008




const videos = [
    {
        id: Number(),
        title: "title",
        author: "author",
        canBeDownloaded: Boolean(),
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions:[ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

    }
]

app.delete('/videos/', (req:Request, res:Response) => {
    res.send('All data is deleted').status(204)
})


app.get('/videos/', (req:Request, res:Response) => {
    res.send(videos)
})

app.get('/videos/:id', (req:Request, res:Response) => {
const videosGetId = videos.find(p => p.id === +req.params.id)
if(!videosGetId) {
    res.send(`If video for passed id doesn't exist`).status(404)
    return
}
res.send(videosGetId)
})

 app.delete('/videos/:id', (req:Request, res:Response) => {
    const videosDeleteId = videos.filter(c => c.id !== +req.params.id)
     if(!videosDeleteId){
        res.send('Not Found').status(404)
         return
     }

    res.send(videosDeleteId).status(204)
})

app.put('/videos/:id', (req:Request, res:Response) => {
   if(!req.body.title){
       res.send({
           errorsMessages: [
               {
                   "message": "string",
                   "field": "string"
               }
           ]
       })
           .status(400)
       return;
   }
   const videoPut = videos.find(p => p.id === +req.params.id)
if(!videoPut) {
    res.send('Not Found')
        .status(404)
    return
}
    videoPut.title = req.body.title
res.send('No Content').status(204)
})

app.post('/videos/', (req:Request, res:Response) => {
    if(!req.body.title) {
        res.send({
            errorsMessages: [
                {
                    'message': "string",
                    'field': "string"
                }]
        })
            .status(400)
        return
    }

    const newVideo:any  = {
        id: new Date(),
        title: req.body.title,
        author: '',
    }
    videos.push(newVideo)

    res.send('Returns the newly created video')
        .status(201)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})