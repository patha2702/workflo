import express, {Request, Response} from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port= process.env.PORT || 3000

app.post("/sign-up", (req: Request, res: Response) => {

})

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`)
})