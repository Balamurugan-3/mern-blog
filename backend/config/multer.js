import multer from "multer"
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

function fileFilter(req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    const allowedFiles = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedFiles.includes(file.mimetype)) {
        // To reject this file pass `false`, like so:
        cb(new Error('Images only Allowed'), false)
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload