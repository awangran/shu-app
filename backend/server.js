const express = require("express")
const multer = require("multer")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "../frontend/public/assets/images")
    },
    filename: function( req, file, cb) {
        return cb(null, file.originalname)
    }
})

const upload = multer({storage})
 

app.post('/upload', upload.single('file'), (req,res) => {
    //console.log(req.body)
    //const imagename = req.file.filename
    //console.log(imagename)
})

app.listen(3001, () => {
    console.log('Server is running....')
})