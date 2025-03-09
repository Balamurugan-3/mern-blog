import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from "cors"
import connectDatabase from "./db/connectDatabase.js"

// import routes
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import categoryRoute from "./routes/category.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import blogLikeRoute from "./routes/blogLike.route.js"

const app = express()

dotenv.config()
app.use(express.json())
app.use(cookieParser())


// ✅ Updated CORS Configuration
app.use(
    cors({
        origin: ["https://mern-blog-frontend-8526.onrender.com", "http://localhost:5173"],
        credentials: true,
    })
);

// ✅ API Endpoints
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/blog", blogRoute)
app.use("/api/comment", commentRoute)
app.use("/api/blogLike", blogLikeRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server Running Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    connectDatabase()
})
