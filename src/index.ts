import express, {Request, Response} from 'express'
import {isNumberObject} from "util/types";
const app = express()
const port = 3008




const videos = [
    {id: 1, title: 'front'},
    {id: 2, title: "back"}

]


app.get('/videos/', (req:Request, res:Response) => {
    res.send(videos).status(200)
})

app.get('/videos/:id', (req:Request, res:Response) => {
const videosId = videos.find(c => c.id === +req.params.id)
if(!videosId) {
    res.send(`If video for passed id doesn't exist`).status(404)
    return
}
res.send(videosId)
})

 app.delete('/videos/:id', (req:Request, res:Response) => {
    const videosId = videos.filter(c => c.id !== +req.params.id)
    res.send(videosId).status(204)
})

app.put('/videos/:id', (req:Request, res:Response) => {
   if(!req.body.title){
       res.send('If the inputModel has incorrect values')
           .status(400)
       return;
   }
   const videoUpdate = videos.find(p => p.id === +req.params.id)
if(!videoUpdate) {
    res.send('Not Found')
        .status(404)
    return
}
    videoUpdate.title = req.body.title
res.send('No Content').status(204)
})

app.post('/videos/', (req:Request, res:Response) => {
    if(!req.body.title) {
        res.send(`If the inputModel has incorrect values`)
            .status(400)
        return
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
    }
    videos.push(newVideo)
    res.send('Returns the newly created video')
        .status(201)
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})