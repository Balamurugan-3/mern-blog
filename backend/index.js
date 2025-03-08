// import express from 'express'
// import dotenv from "dotenv"
// import cookieParser from 'cookie-parser'
// import cors from "cors"
// import connectDatabase from "./db/connectDatabase.js"
// // import routes
// import authRoute from "./routes/auth.route.js"
// import userRoute from "./routes/user.route.js"
// import categoryRoute from "./routes/category.route.js"
// import blogRoute from "./routes/blog.route.js"
// import commentRoute from "./routes/comment.route.js"
// import blogLikeRoute from "./routes/blogLike.route.js"

// const app = express()

// dotenv.config()
// app.use(express.json())
// app.use(cookieParser())
// // app.use(cors({ origin: "https://mern-blog-ury1.vercel.app", credentials: true }))
// app.use(
//     cors({
//         origin: "https://mern-blog-ury1.vercel.app",
//         credentials: true,
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         allowedHeaders: "Content-Type,Authorization",
//     })
// );

// // api end points
// app.use("/api/auth", authRoute)
// app.use("/api/user", userRoute)
// app.use("/api/category", categoryRoute)
// app.use("/api/blog", blogRoute)
// app.use("/api/comment", commentRoute)
// app.use("/api/blogLike", blogLikeRoute)

// app.listen(process.env.PORT, () => {
//     console.log(`Server Running Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
//     connectDatabase()
// })

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

// ✅ Add Cache-Control Headers Middleware (Prevents 304 status)
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
});

// ✅ Updated CORS Configuration
app.use(
    cors({
        origin: "https://mern-blog-ury1.vercel.app",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
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
