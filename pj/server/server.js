const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const uri = "mongodb://localhost:27017";
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

let carList = [];
let memberList = [];
let session = [];

let db;
// Function to connect to the server
async function run() {
    try {
        await client.connect();
        db = client.db("homework");
        
        // db.collection("session").deleteMany({}); // 서버 재실행 시 세션을 비움

        let cursor = db.collection("cars").find({}, { projection: { _id: 0 } });
        carList = await cursor.toArray();

        cursor = db.collection("members").find({}, { projection: { _id: 0 } });
        memberList = await cursor.toArray();

        console.log("Connected successfully to db server");
    } finally {

    }
}

app.set('port', 5000);
console.log("__dirname:", __dirname);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// public 디렉토리를 static으로 사용하기 위한 설정
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());
// POST 요청 시 파라미터를 body에서 사용하기 위한 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/db', (req, res) => {
    res.send(carList);
});

app.post('/db', async (req, res) => {
    let searchResult = [];
    let query = {};

    if (req.body.text === "") {
        return res.send(carList);
    }

    switch (req.body.option) {
        case "차종":
            query = { name: req.body.text };
            break;
        case "타입":
            query = { type: req.body.text };
            break;
        case "연식":
            query = { year: { $lte: parseInt(req.body.text) } };
            break;
        case "가격":
            query = { price: { $lte: parseInt(req.body.text) } };
            break;
        default:
            query = {}; // 잘못된 옵션이 들어올 경우 모든 데이터를 반환하거나 에러 처리
    }

    try {
        const cursor = db.collection("cars").find(query, { projection: { _id: 0 } });
        searchResult = await cursor.toArray(); // 쿼리 결과를 배열로 변환하여 저장
        res.send(searchResult);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database query failed");
    }
});

app.post('/login', async (req, res) => {
    const inputId = req.body.id;
    const inputPw = req.body.password;
    let idx = memberList.findIndex((member) => {
        return member.id === inputId;
    });
    if (idx !== -1) {
        if (inputPw === memberList[idx].pw) {
            try {
                // 비동기적으로 insertOne() 호출
                await db.collection("session").insertOne(memberList[idx]);
                return res.send(true);
            } catch (error) {
                console.error('세션 삽입 실패:', error);
                return res.status(500).send(false);
            }
        }
    }
    res.send(false);
});

app.get('/logout', (req, res) => {
    db.collection("session").deleteMany({});
    res.send(false);
});

app.get('/check-session', async (req, res) => {
    let cursor = db.collection("session").find({}, { projection: { _id: 0 } });
    session = await cursor.toArray(); // 항상 첫 번째 세션 정보만 사용함. 여러 개의 세션을 넣는 것은 상정하지 않음
    let sessionMember = session[0];
    if (sessionMember) {
        res.send(sessionMember);
    } else {
        res.send(null);
    }
});


const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중>>> http://localhost:${app.get('port')}`);
    run().catch(console.dir);
});