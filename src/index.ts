import express, {Request, Response} from 'express'

const app = express()
const port = 3008

app.get('/', (req:Request, res:Response) => {
    let helloWorld = 'Hello World!!!';
    res.send(helloWorld)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})