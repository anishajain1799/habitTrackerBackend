import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"

const app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim()).filter(Boolean)
const corsOptions = {
    origin(origin, cb) {
        if(!origin) return cb(null, true)
        if(/^https?:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
            return cb(null, true)
        }
        if(allowedOrigins.includes(origin)) return cb(null, true)
        return cb(new Error("Not allowed by CORS"))
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions))
app.options(/.*/i, cors(corsOptions))
app.use(express.json({limit: "10mb"}))

// Routes
app.get("/habitService/api/health", (req, res) => {
    res.json({message: "Welcome to the Habit Tracker API"})
})

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 8000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

export default app
