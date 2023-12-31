
const mongoose = require('mongoose')
//import Marked and slug
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)
//Make a Schema for New Article
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    markdown: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    
})

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }



    next()
})


module.exports = mongoose.model('Article', articleSchema)