const express = require("express")
const app = express()
const articleRouter = require("./routes/articles")
const methodOverride = require('method-override')
//For Database
const mongoose = require("mongoose")
const Article = require('./models/articleModel')
//For Connection database
mongoose.connect('mongodb://localhost/blog',
    { useNewUrlParser: true, useUnifiedTopology: true })


app.set('view engine', 'ejs');

//use Middleware for reading request body
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use("/articles", articleRouter)


app.get("/", async (req, res) => {
    // const articles = [{
    //     title: 'Test Article',
    //     createdAt: new Date(),
    //     description: "Test Description"
    // },

    // {
    //     title: 'Test Article 2',
    //     createdAt: new Date(),
    //     description: "Test Description 2"
    // }]

    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles })
})
app.listen(5000)