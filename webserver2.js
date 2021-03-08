const http = require('http'); // http라는 모듈을 담음.
// 모듈을 가져와서 쓸 때는 require라는 함수를 사용한다.


const hostname = '127.0.0.1';
const port = 8080;

// 사용자가 들어왔을 때 어떤 내용을 출력할 지를 넣어줌.
// res : 응답과 관련되있음.
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// 위와 같음
// var server = http.createServer(function (req, res){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// })

// function ()  === () =>   둘다 같음

// listen 작업은 시간이 좀 걸릴수도있는 작업이라 callback으로 비동기적으로 작동함.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});