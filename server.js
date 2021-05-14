//connect특징 : 원하는 만큼 많은 미들웨어 함수를 등록할 수 있는 능력
const connect =require('connect');  //웹서버 생성을 위해 connect모듈 사용,
const app = connect();

function logger(req,res,next){          //로깅 미들웨어
    console.log(req.method,req.url);    //브라우저에서 접속했을때 요청 주소 확인
    next();
};

function helloWorld(req,res,next){
    res.setHeader('Content-Type','text/plain'); //Content-Type헤더 설정
    res.end('Hello World');                     //end메소드 응답텍스트
};
function goodByeWorld(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.end('GoodBye');
};

app.use(logger);
app.use('/hello',helloWorld);        //use메소드로 connect서버에 등록, helloWorld 미들웨어 연결
app.use('/goodbye',goodByeWorld);

app.listen(3000);

console.log('server runing');