import express, { Request, Response } from "express"
import cors from "cors"
import userRoutes from './routes/user.routes'

const app = express()

app.use(cors({
  origin: "http://localhost:5173" 
}))

app.use(express.json())
app.use("/api/users", userRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

export default app
