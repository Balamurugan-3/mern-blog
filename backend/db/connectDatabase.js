import mongoose from "mongoose"

const connectDatabase = async (req, res) => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb is connected on ${con.connection.host}`)
    } catch (error) {
        console.log(`error on connect mongodb : ${error.message}`)
        process.exit(1)
    }
}

export default connectDatabase