const http = require("express");
const app = express();
const fs = require("fs");

function readFile(req, res, file) {
  if (req.url === "/read") {
    fs.readFile(file, function (error, contentFile) {
      if (error) {
        res.writeHead(404);
        res.write("Oh, my gosh! Not found the file!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(contentFile);
      }

      res.end();
    });
  } else {
    //4.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<h1>Você esqueceu de colocar o /read no endereço! Tente novamente! </h1>"
    );
        res.end();
  }
  return true;
}

app.get('/read',(req,res)=>{
    let file = "meuarquivo.csv";
    let status;

    let ip = req.headers['x-forwarded-for'] ||
     req.socket.localAddress ||
     null;
     let port = req.headers['x-forwarded-for'] ||
     req.socket.localPort ||
     null;
    console.log(`Conexão estabelecida com Cliente através do IP: ${ip} e porta: ${port}.`);
    status = readFile(req, res, file);
    if (!status) {
        res.write("Problemas ao acessar o arquivo!");
        res.end();
    }
});

  const server = app.listen(port,address,function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e na porta ${port}`);
 });