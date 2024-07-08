/* Напишите HTTP сервер и реализуйте два обработчика, где:
— По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
— А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
— Также реализуйте обработку несуществующих роутов (404).
— * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.*/


const http = require("http");

// Объект для хранения счетчика просмотров страниц
const viewCounts = { "/": 0, "/about": 0 };

const server = http.createServer((req, res) => {
  // Увеличение счетчика просмотров
  viewCounts[req.url] += 1;

  if (req.url === "/") {
      res.writeHead(
          200,
          { "Content-Type": "text/html; charset=UTF-8" });
    res.end(
      `<h1>Корневая страница</h1><p>Просмотры: ${viewCounts["/"]}</p><a href="/about">Ссылка на about page</a>`
    );
  } else if (req.url === "/about") {
      res.writeHead(
          200,
          { "Content-Type": "text/html; charset=UTF-8" });
    res.end(
      `<h1>Страница About</h1><p>Просмотры: ${viewCounts["/about"]}</p><a href="/">Ссылка на main page</a>`
    );
  } else {
      res.writeHead(
          404,
          { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Страница не найдена</h1>`);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});