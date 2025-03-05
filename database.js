const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const sharp = require('sharp');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// เชื่อมต่อ Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ruammit',
    database: 'ruammit_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

const storage = multer.diskStorage({
    destination: "./app/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.body.room_name || !req.body.limit_user || !req.body.type  || !req.body.gender || !req.body.description) return res.status(400).json({ message: "❌ Missing required fields." });
    if (!req.file) return res.status(400).send('No file uploaded.');

    /* if (!req.body.gender) return res.status(400).send('gender is required.'); */

    const roomName = req.body.room_name;
    const type_room = req.body.type;
    const descrip= req.body.description;
    const limituser = parseInt(req.body.limit_user, 10); 
    const gender_user = req.body.gender;
    const imagePath = `./uploads/${req.file.filename}`;

    if (isNaN(limituser)) {
        return res.status(400).json({ message: '❌ limit_user ต้องเป็นตัวเลข!' });
    }


    const sql = "INSERT INTO rooms (room_name,image_path,limit_user,type,gender,description) VALUES (?, ?, ?, ?, ?,?)";
    db.query(sql, [roomName, imagePath, limituser, type_room, gender_user, descrip], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.json({ message: 'Image uploaded and cropped successfully', roomName, imagePath, limituser, type_room,  gender_user  });
    });
});



app.get("/image", (req, res) => {
    const sql = "SELECT * FROM rooms";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "❌ Database error" });
        }
        res.json(results);
    });
});

app.get("/image/:room_id", (req, res) => {
    const sql = "SELECT * FROM rooms WHERE room_id = ?";
    
    db.query(sql, [req.params.room_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "❌ Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "❌ Room not found" });
        }

        // ✅ ตรวจสอบว่ามี description หรือไม่
        let roomData = results[0];
        roomData.description = roomData.description || "ไม่มีข้อมูล"; // ถ้า description ไม่มี ให้ใช้ "ไม่มีข้อมูล"

        res.json(roomData);
    });
});



app.listen(7000, () => console.log('Server running on port 7000'));
