// 📁 MyExpress.js
      
const http = require('http');
      
function express() {
  const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };

  function get(path, handler) {
    routes.GET[path] = handler;
  }

  function post(path, handler) {
    routes.POST[path] = handler;
  }

  function put(path, handler) {
    routes.PUT[path] = handler;
  }

  function del(path, handler) {
    routes.DELETE[path] = handler;
  }

  function listen(port, callback) {
    const server = http.createServer((req, res) => {
      // 📦 Добавляем метод send в res
      res.send = (body, statusCode = 200, contentType = 'text/plain; charset=utf-8') => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', contentType);
        res.end(body);
      };

      const method = req.method;
      const url = req.url;

      const handler = routes[method] && routes[method][url];

      if (handler) {
        handler(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });

    server.listen(port, callback);
  }

  return {
    get,
    post,
    put,
    del,
    listen,
    routes
  };
}

module.exports = express;