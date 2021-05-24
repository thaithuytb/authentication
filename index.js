require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

//middleware
const verifyToken = require('./middleware/auth');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const users = [
    {
        id: 1,
        username: "thaithuytb",
    },
    {
        id: 2,
        username: "ngocaiyeu",
    }
]

const myPosts = [
    {
        id: 1,
        title: "Yêu vội vàng",
        userId: 1,
    },
    {
        id: 2,
        title: "Sợ yêu",
        userId: 1,
    },
    {
        id: 3,
        title: "Dòng thời gian",
        userId: 2,
    },
];

app.get('/posts', verifyToken ,(req, res) => {

    console.log(req.userId);
    const posts = myPosts.filter((post) => post.userId === req.userId);

    res.send(posts);
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = users.find((user) => user.username === username);

    if (!user) return res.sendStatus(401);

    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "200s"
    });

    res.send({accesstoken});

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`sever running at port: ${PORT}`));