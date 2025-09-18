import multer from "multer"


const upload = multer({ storage })

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./public")
    },
    filename: (req, file, callBack) => {
        callBack(null,file.originalname)
    }
})

export default upload