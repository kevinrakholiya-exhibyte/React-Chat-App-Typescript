import express, { Request, Response } from "express"
import cors from "cors"
import userRoutes from './routes/user.routes'
import { startGraphQL } from "./graphql"

const app = express()

app.use(cors({
  origin: "http://localhost:5173" 
}))

app.use(express.json())
app.use("/api/users", userRoutes)
startGraphQL(app)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

export default app
