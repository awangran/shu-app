const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const app = express();
const PORT = 5000;

// MongoDB connection
const mongoURI = 'mongodb+srv://awangran:shuapp@shu.jjglqac.mongodb.net/?retryWrites=true&w=majority&appName=shu';
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, useUnifiedTopology: true 
});
const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {

    const customId = req.body.id;  
      if (!customId) {
        return reject(new Error('No custom ID provided'));
      }

      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + 
                            path.extname(file.originalname);
        const fileInfo = {
          _id:customId,
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
