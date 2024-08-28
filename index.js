var express = require('express');
var cors = require('cors');
require('dotenv').config();
const fs= require('fs');
const multer = require('multer');
var app = express();
const path = './public/uploads';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
       cb(null, './public/uploads')
 },
filename: function (req, file, cb) {
      cb(null,file.originalname)
}
});

const upload = multer({ storage: storage });
app.post("/api/fileanalyse", upload.single('upfile'),(req,res)=>{
  try {
    const fileName = req.file.filename;
    const fileSize = req.file.size;
    const fileType = req.file.mimetype;
    

    // Send file details as a response or use them as needed
    res.json({
      
      name: fileName,
      type: fileType,
      size: fileSize,
      
    });
  } catch (error) {
    console.log(error.message)
  }
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
