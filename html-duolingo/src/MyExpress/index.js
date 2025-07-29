// 📁 index.js

const express = require("./MyExpress"); // импортируем как express

const app = express(); // создаём экземпляр сервера (наш "офис")


app.get("/money", (req, res) => { 
   // Отправляем тело ответа клиенту
   res.send('Добро пожаловать в наш почтовый офис! get');

});

app.post("/auth", (req, res) => { 
   // Отправляем тело ответа клиенту
   res.send('Добро пожаловать в наш почтовый офис! post');
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});

console.log('routes',app.routes);
