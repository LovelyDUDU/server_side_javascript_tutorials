const express = require('express');
const app = express();
// const multer = require('multer')
const bodyParser = require('body-parser')

// Semantic_URL : 의미있는 URL
// root : 정적인 파일이 위치할 디렉토리
// 기본적으로 body로 넘어온 것은 undefined => body-parser나 multer 사용해야한다.
// body-parser = MiddleWare

app.set('views', './views') // views, 템플릿이 있는 디렉토리. (생략가능. views 가 기본값)
app.set('view engine', 'jade') // template engine = jade 로 연결
app.locals.pretty = true;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/form', function (req, res) {
    res.render('form')
})

app.get('/form_receiver', function(req, res){
    let title = req.query.title
    let description = req.query.description
    let content = {
        title: title,
        description: description,
    }

    res.render('result', content)
})

app.post('/form_receiver', function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    let title = req.body.title
    let description = req.body.description
    let content = {
        title: title,
        description: description,
    }

    res.send(title + ',' + description)
})
app.get('/topic/:id', function (req, res) {
    let topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...',
    ];
    let links =
        `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br>
<!--    <a href="/topic?id=0">Javascript</a><br>-->
<!--    <a href="/topic?id=1">Nodejs</a><br>-->
<!--    <a href="/topic?id=2">Express</a><br>-->
    
    <br>
    ${topics[req.params.id]}
    `
    res.send(links)
})
// 쿼리스트링 방식 : req가 가진 query 사용
// Semantic URL 방식 : query를 params로 바꿈
app.get('/template', function (req, res) { // /template으로 들어오면 'temp'를 렌더링해줌.
    const content = {
        time: Date(),
        _title: 'Jade'
    }
    res.render('temp', content);
})

app.get('/', function (req, res) {
    res.send('Hello home page');
});

app.get('/dynamic', function (req, res) {
    let lis = '';
    let time = new Date()
    for (var i = 0; i < 5; i++) {
        lis += '<li>coding</li>'
    }
    const output = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title??</title>
    </head>
    <body>
        Hello, Dynamic
        ${lis}
        ${time}
    </body>
</html>
`;
    res.send(output)
})

app.get('/login', function (req, res) {
    res.send('Login Plz');
});

app.get('/route', function (req, res) {
    res.send('Hello Router, <img src="/logo.jpg">')
})
app.listen(3000, function () {
    console.log("Connected 3000 port!");
});