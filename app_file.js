const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs =require('fs')
app.set('views', './views_file')
app.set('view engine', 'jade')
app.locals.pretty = true;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.listen(3000, function(){
    console.log("Connected 3000 port")
})

// 글쓰는 화면
app.get('/topic/new', function(req, res){
    fs.readdir('data', function (err, files){
        if(err){
            res.status(500).send('Internal Server Error')
        }
        res.render('new', {topics: files})
    })
})

// 메인화면?
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error')
        }
        const id = req.params.id
        if(id){
            fs.readFile('data/'+id, 'utf8', function (err, data){
                if(err){
                    res.status(500).send('Internal Server Error')
                }
                let content={
                    title: id,
                    description : data,
                    topics : files
                }
                res.render('view', content)
            })
        }
        else {
            res.render('view', {topics: files, title: 'Welcome', description: 'Hello, javscript server'})
        }
    })

})

app.post('/topic', function(req, res){
    res.setHeader('Content-Type', 'text/plain')
    let title = req.body.title
    let description = req.body.description
    fs.writeFile('data/' + title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error')
        }
        res.redirect('topic/'+ title)
    })
})

// app.get('/topic/:id', function(req, res){
//     let id = req.params.id;
//     fs.readdir('data', function(err, files){
//         if(err){
//             res.status(500).send('Internal Server Error')
//         }
//
//     })
//
// })

app.post('/topic/')