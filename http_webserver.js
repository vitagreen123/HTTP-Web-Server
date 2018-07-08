var http = require('http');
var fs = require('fs');
const path = require('path')
var url = require('url');

const checkContentType = (pathname) => {
  const contentType = path.parse(pathname);
  if(contentType.ext === '.html'){
    return 'text/html';
  }
  if(contentType.ext === '.css'){
    return 'text/css';
  }
}

http.createServer(function(request,response){         //서버 생성
  var pathname = url.parse(request.url).pathname;     //url뒤에 있는 디렉토리/파일이름 파싱
                                                      //console.log(request.url);
  if(pathname == '/'){
    pathname = '/index.html';                         //파일 이름이 비어있다면 index.html 로 설정
  }
  if(pathname === '/favicon.ico'){
    return 204;
  }

  fs.readFile(__dirname + '/public' + pathname,  function (err, data) {
    if (err) {
       console.log(err);
       response.writeHead(404, {'Content-Type': 'text/html'});
    }else{	
       response.writeHead(200, {'Content-Type': checkContentType(pathname)});	
       
       // 파일을 읽어와서 responseBody 에 작성
       response.write(data.toString());		
    }
    // responseBody 전송
    response.end();
 });   
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');