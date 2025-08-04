import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../../hooks/useLessonProgress";
import CodeHighlight from "../../../components/CodeHighlight";
import WarningHighlight from "../../../components/WarningHighlight";
import ReminderBlock from "../../../components/ReminderBlock";

function ExpressLesson2() {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [additionalTaskAnswers, setAdditionalTaskAnswers] = useState({});
  const [additionalTaskHints, setAdditionalTaskHints] = useState({});
  const [additionalTaskAttempts, setAdditionalTaskAttempts] = useState({});
  const [additionalTaskShowAnswer, setAdditionalTaskShowAnswer] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("MyExpress.js");
  const navigate = useNavigate();
  // ЗАКОММЕНТИРОВАНО: Проверка авторизации
  // const { user } = useAuth();

  // Создаем фиктивного пользователя для работы без авторизации
  const user = { userId: "demo_user_123" };

  // Функции для работы с localStorage
  const saveLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
      }
      console.log("Урок сохранен в localStorage:", lessonId);
    } catch (error) {
      console.error("Ошибка сохранения в localStorage:", error);
    }
  };

  const checkLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      return completedLessons.includes(lessonId);
    } catch (error) {
      console.error("Ошибка проверки localStorage:", error);
      return false;
    }
  };

  // Используем новый хук для управления прогрессом
  const { currentStep, lessonProgress, updateCurrentStep, saveStepAnswer, getStepAnswer, isLessonCompleted, completeLesson, clearLessonProgress } =
    useLessonProgress(3); // Новый id урока

  // Отладка изменений isCorrect (перемещено после объявления currentStep)
  useEffect(() => {
    console.log("=== isCorrect ИЗМЕНИЛСЯ ===");
    console.log("Новое значение isCorrect:", isCorrect);
    console.log("Текущий шаг:", currentStep);
    console.log("userAnswer:", userAnswer);
  }, [isCorrect, currentStep, userAnswer]);

  // Отладка перерендеров компонента
  console.log("=== КОМПОНЕНТ ПЕРЕРЕНДЕРЕН ===");
  console.log("currentStep:", currentStep);
  console.log("userAnswer:", userAnswer);
  console.log("isCorrect:", isCorrect);

  // Мемоизируем шаги урока
  const steps = useMemo(
    () => [
      {
        type: "code",
        title: "Нанимаем первого сотрудника — app.post() 🥳",
        content:
          "Поздравляем! Наш отель только открылся, и уже появился первый посетитель, который хочет зарегистрироваться. Но мы заметили, что **в офисе пока нет ни одного сотрудника, кто умеет принимать данные**.\n\n" +
          "Чтобы не терять клиента, срочно нанимаем нового сотрудника — POST!\n\n" +
          "Мы используем <CodeHighlight>app.post()</CodeHighlight>, чтобы сказать: «Если кто-то принесёт нам данные по адресу <CodeHighlight>'/register'</CodeHighlight>, прими их и вежливо ответь».",
          codeFiles: {
            "server.js": `app.post('/register', (req, res) => {
        // 📩 Клиент пришёл с анкетой на регистрацию (данные отправлены через POST)

        // ✨ Пока мы просто отвечаем словами, что регистрация прошла успешно
        res.send('Вы успешно зарегистрированы!');

        // ⚠️ Но на самом деле пользователь ещё **не зарегистрирован по-настоящему**
        // Сейчас это только имитация ответа, а не реальная обработка

        // 🛠 Чтобы действительно зарегистрировать клиента, нам нужно:
        // 1. Прочитать данные из req.body (например, имя, email, пароль)
        // 2. Проверить, что всё введено корректно
        // 3. Сохранить эти данные в базу данных
        // 4. Вернуть реальный статус или токен авторизации, если всё прошло успешно

        // 🔒 Всё это мы обязательно разберём в следующих уроках — не волнуйся!
      });`,
            "client.js": `// 🚀 Клиент приходит к нашему серверу
import axios from 'axios';

// 📞 Делаем POST запрос на регистрацию
const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name: 'Иван',
      email: 'ivan@example.com',
      password: '123456'
    });
    
    console.log('Ответ сервера:', response.data);
    // Выведет: "Вы успешно зарегистрированы!"
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

// 🚀 Запускаем функцию
registerUser();`
          },
        metaphor: [
          "📬 Метафора:",
          "Клиент подошёл к стойке и передаёт анкету для регистрации.",
          "Сотрудник POST принимает её, кивает и отвечает: «Вы успешно зарегистрированы!»",
          "🧳 <CodeHighlight>req</CodeHighlight> — всё, что принёс клиент: имя, email и другие данные.",
          "🗣️ <CodeHighlight>res</CodeHighlight> — голос сотрудника, который отвечает клиенту.",
        ],
        realExample: [
          "🌐 Пример из жизни приложения:",
          "Представь: ты заходишь в приложение и заполняешь форму регистрации — имя, email, пароль.",
          "Нажимая кнопку «Зарегистрироваться», ты как бы передаёшь анкету на ресепшн.",
          "Сотрудник POST берёт твою анкету, проверяет, всё ли заполнено, и — 📥 — вносит тебя в журнал гостей (базу данных).",
          "С этого момента ты официально зарегистрирован в приложении или на сайте.",
        ],
        whatWeLearned: [
          "📬 Добавили маршрут <CodeHighlight>app.post()</CodeHighlight> — он принимает данные от клиента.",
          "🧳 Изучили объект <CodeHighlight>req</CodeHighlight> — он содержит информацию, которую клиент отправил.",
          "🗣️ Ответ вернули с помощью <CodeHighlight>res.send()</CodeHighlight>.",
        ],
        whatNext: [
          "🎉 Гость успешно зарегистрировался — его данные сохранены в базе.",
          "📱 Теперь он хочет посмотреть, какие номера доступны, что входит в обслуживание.",
          "🤔 Но сотрудник POST умеет **только принимать заявки** — он регистрирует гостей, но **ничего не показывает**.",
          "😅 А чтобы выдавать информацию — например, список номеров, новости, профили других пользователей — нужен другой сотрудник.",
          "➡️ Поэтому мы нанимаем специалиста, который умеет **давать ответы** на подобные запросы.",
          "👀 Спойлер: это будет <CodeHighlight>GET</CodeHighlight> — именно он говорит: «Вот, посмотри» каждый раз, когда пользователь хочет что-то узнать.",
        ],
      },

      {
        type: "code_files",
        title: "Нанимаем второго сотрудника — app.get() 🥳",
        content:
          "После того как первый клиент успешно зарегистрировался с помощью <CodeHighlight>POST</CodeHighlight>, он захотел узнать, какие в отеле есть свободные номера и услуги.\n\n" +
          "Но POST умеет только **принимать данные**. А вот чтобы **показывать информацию**, нам нужен новый сотрудник — <CodeHighlight>GET</CodeHighlight>.\n\n" +
          "🎉 Поздравляем! В нашем отеле появился сотрудник, который умеет **отвечать на вопросы клиентов** и предоставлять нужные данные.\n\n" +
          "Вот как он работает: если клиент заходит на главную страницу (например, <CodeHighlight>'/'</CodeHighlight>), он получает информацию о доступных номерах.",
        codeFiles: {
          "server.js": `app.get('/', (req, res) => {
        // 🛎️ Клиент подошёл к ресепшену и хочет узнать, какие есть свободные номера
        // Он не передаёт анкету, а просто вежливо спрашивает: "Что у вас есть?"

        // 🧳 Объект req — это его вопрос, а точнее GET-запрос
        // 📤 Объект res — это наш сотрудник, который отвечает клиенту

        // ✨ Пока что мы просто возвращаем текст со списком доступных номеров
        res.send('Добро пожаловать в наш отель! Вот список доступных номеров.');

        // ⚠️ Но в реальном приложении здесь может быть гораздо больше:
        // 1. Получение списка номеров или данных из базы данных
        // 2. Фильтрация по категориям (люкс, стандарт и т.д.)
        // 3. Поддержка параметров запроса (например, ?дата=2025-08-01)
        // 4. Формирование ответа в виде HTML или JSON

        // 🔍 Всё это мы постепенно изучим — шаг за шагом!
      });`,
          "client.js": `// 🚀 Клиент запрашивает информацию
import axios from 'axios';

// 📋 Делаем GET запрос для получения информации
const getRooms = async () => {
  try {
    const response = await axios.get('http://localhost:3000/');
    
    console.log('Доступные номера:', response.data);
    // Выведет: "Добро пожаловать в наш отель! Вот список доступных номеров."
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

// 🚀 Запускаем функцию
getRooms();`
        },
        metaphor: [
          "📄 Метафора:",
          "👤 Клиент подходит к стойке ресепшн и спрашивает: «Какие у вас есть свободные номера?»",
          "🧑‍💼 Сотрудник GET отвечает: рассказывает, показывает, объясняет.",
          "<CodeHighlight>req</CodeHighlight> — это вопрос от клиента.",
          "<CodeHighlight>res</CodeHighlight> — это наш ответ: что мы ему показываем или говорим.",
          "💬 Если не вызвать <CodeHighlight>res.send()</CodeHighlight>, клиент будет стоять и ждать, думая, что его игнорируют.",
        ],
        whatWeLearned: [
          "📄 Наняли сотрудника GET, который отвечает за выдачу информации.",
          "🧠 Поняли, что <CodeHighlight>GET</CodeHighlight> нужен для получения данных (например, список номеров, профиля, товаров и т.д.).",
          "🔁 Познакомились с объектами <CodeHighlight>req</CodeHighlight> (запрос) и <CodeHighlight>res</CodeHighlight> (ответ).",
        ],
        realExample: [
          "🌐 Пример из жизни приложения:",
          "Ты заходишь на сайт интернет-магазина и хочешь посмотреть список товаров.",
          "Когда ты нажимаешь на категорию «Электроника» — браузер отправляет GET-запрос на сервер.",
          "Сервер возвращает тебе список всех товаров в этой категории.",
          "Именно такой запрос мы здесь обрабатываем!",
        ],
        whatNext: [
          "🚀 Всё идёт отлично — клиенты заселяются, смотрят доступные номера, изучают предложения...",
          "🤔 Но вот один из гостей подошёл к стойке и сказал: «Можно мне поменять номер? Я хочу с видом на море!»",
          "😳 Наши сотрудники переглянулись... Такой запрос — это не регистрация и не просмотр. Это **изменение существующих данных**!",
          "🔧 Значит, нужен ещё один сотрудник, который умеет не просто принимать или показывать, а **обновлять информацию**.",
          "➡️ Совсем скоро мы познакомимся с таким сотрудником — его зовут <CodeHighlight>PUT</CodeHighlight> 🛠️",
          "Он помогает обновить бронирование, профиль или любую другую уже существующую информацию.",
        ],
      },

      {
        type: "code_files",
        title: "Нанимаем третьего сотрудника — app.put() 🥳",
        content:
          "Наш клиент уже зарегистрировался, выбрал номер и даже посмотрел, какие есть предложения. Всё шло отлично…\n\n" +
          "Но вдруг он вернулся к стойке и сказал: «Я хочу поменять номер — можно мне с видом на море?» 🌊\n\n" +
          "Это уже не регистрация и не просто просмотр. Это **обновление** ранее сохранённой информации.\n\n" +
          "Для таких случаев мы используем <CodeHighlight>app.put()</CodeHighlight> — сотрудника, который умеет **менять существующие данные**.",
        codeFiles: {
          "server.js": `app.put('/booking', (req, res) => {
        // 🔄 Гость хочет изменить своё бронирование (например, номер на другой)
      
        // 🧾 Объект req содержит новые данные — что именно он хочет изменить
      
        // 🗣️ Мы пока просто отвечаем, что изменения приняты
        res.send('Ваша бронь успешно обновлена!');
      
        // ⚠️ Это пока не настоящее обновление — просто сообщение
      
        // 🛠 Чтобы всё работало по-настоящему, нужно:
        // 1. Проверить, кто делает запрос (аутентификация)
        // 2. Найти бронь в базе по ID
        // 3. Обновить нужные поля (например, номер или дату)
        // 4. Вернуть клиенту подтверждение или сообщение об ошибке
      
        // 🔐 Всё это мы научимся делать в будущих уроках!
      });`,
          "client.js": `// 🚀 Клиент обновляет бронирование
import axios from 'axios';

// 🔄 Обновляем бронирование
const updateBooking = async (bookingId) => {
  try {
    const response = await axios.put(\`http://localhost:3000/booking\`, {
      id: bookingId,
      newRoom: 'люкс с видом на море'
    });
    
    console.log('Результат обновления:', response.data);
    // Выведет: "Ваша бронь успешно обновлена!"
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

// 🚀 Запускаем функцию
updateBooking(123);`
        },
        metaphor: [
          "🔧 Метафора:",
          "Гость возвращается к стойке и говорит: «Я передумал — дайте мне номер получше».",
          "Сотрудник PUT смотрит в журнал, находит бронирование, вносит правки и подтверждает: «Готово!»",
          "<CodeHighlight>req</CodeHighlight> — обновлённые данные от клиента.",
          "<CodeHighlight>res</CodeHighlight> — ответ: всё обновлено, всё хорошо.",
        ],
        whatWeLearned: [
          "🛠 Познакомились с <CodeHighlight>app.put()</CodeHighlight> — маршрутом для обновления данных.",
          "📥 <CodeHighlight>req</CodeHighlight> приносит новые данные от клиента.",
          "📤 <CodeHighlight>res.send()</CodeHighlight> сообщает об успехе или ошибке.",
        ],
        realExample: [
          "🌐 Пример из жизни приложения:",
          "Ты заходишь в профиль на сайте бронирования и меняешь даты поездки или номер.",
          "Когда ты нажимаешь 'Сохранить изменения' — приложение отправляет PUT-запрос на сервер.",
          "Сервер обновляет бронь и возвращает сообщение: «Изменения сохранены».",
        ],
        whatNext: [
          "🚪 Всё идёт по плану: гости регистрируются, получают информацию, даже вносят изменения...",
          "😮 Но что, если кто-то захочет **отменить бронь** или удалить свой профиль?",
          "🗑️ Для таких ситуаций нужен ещё один сотрудник — тот, кто умеет **удалять данные** по запросу.",
          "➡️ Скоро мы его наймём — его зовут <CodeHighlight>DELETE</CodeHighlight>.",
        ],
      },

      {
        type: "code_files",
        title: "Нанимаем четвертого сотрудника — app.delete() 🥳",
        content:
          "Отель работает вовсю: гости регистрируются, смотрят номера, меняют бронирования...\n\n" +
          "Но вот появился клиент с грустным видом. Он говорит: «Я отменяю свою бронь и ухожу» 😔\n\n" +
          "Всё, что когда-то было записано, теперь нужно **удалить**.\n\n" +
          "Для этого нам нужен особый сотрудник — <CodeHighlight>app.delete()</CodeHighlight>. Он умеет **удалять информацию** по запросу.",
        codeFiles: {
          "server.js": `app.delete('/booking', (req, res) => {
        // 🗑️ Клиент хочет отменить своё бронирование
      
        // 📩 Он отправляет DELETE-запрос с указанием, что именно нужно удалить
      
        // ✨ Пока просто отвечаем, что бронь удалена
        res.send('Ваша бронь успешно отменена.');
      
        // ⚠️ На самом деле, пока мы ничего не удаляем — это только сообщение
      
        // 🛠 Чтобы реально удалить данные, нужно:
        // 1. Проверить, кто делает запрос (безопасность!)
        // 2. Найти нужную бронь в базе данных
        // 3. Удалить её
        // 4. Подтвердить удаление клиенту
      
        // 🔐 Все эти шаги мы изучим в будущих уроках!
      });`,
          "client.js": `// 🚀 Клиент отменяет бронирование
import axios from 'axios';

// 🗑️ Делаем DELETE запрос для отмены брони
const cancelBooking = async (bookingId) => {
  try {
    await axios.delete(\`http://localhost:3000/booking/\${bookingId}\`);
    
    console.log('Бронирование отменено');
    
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
};

// 🚀 Запускаем функцию
cancelBooking(123);`
        },
        metaphor: [
          "🗑️ Метафора:",
          "Клиент возвращается в отель и говорит: «Пожалуйста, удалите мою бронь».",
          "Сотрудник DELETE берёт его заявление, вычёркивает бронь из журнала и кивает: «Готово»",
          "<CodeHighlight>req</CodeHighlight> — это заявление от клиента.",
          "<CodeHighlight>res</CodeHighlight> — наш официальный ответ: данные удалены.",
        ],
        whatWeLearned: [
          "🗑️ Познакомились с <CodeHighlight>app.delete()</CodeHighlight> — маршрутом для удаления данных.",
          "🧠 Поняли, как DELETE отличается от POST, GET и PUT — он убирает то, что было создано.",
          "📥 Научились принимать запрос и отвечать на него даже без настоящей базы.",
        ],
        realExample: [
          "🌐 Пример из жизни приложения:",
          "Ты заходишь в личный кабинет и нажимаешь кнопку 'Удалить аккаунт'.",
          "Приложение отправляет DELETE-запрос на сервер.",
          "Сервер удаляет твои данные и присылает подтверждение: «Аккаунт удалён».",
        ],
        whatNext: [
          "📦 Теперь у нас полный набор: регистрация (POST), получение информации (GET), обновление (PUT), удаление (DELETE).",
          "Но вот случилась новая ситуация...",
          "👤 Клиент подошёл к стойке и сказал: «Покажите мне **номер 42**, я хочу именно его!»",
          "🤔 Мы переглянулись: раньше нас просили просто *всё подряд*, а теперь — *что-то конкретное*.",
          "🧠 Нужно пойти к сотруднику GET и передать ему точный номер.",
          "🚪 Мы постучали в его кабинет и сказали: «Клиент просит показать номер с ID 42…»",
          "😮 Сотрудник немного удивился, но кивнул: «Хорошо, я разберусь!»",
          "🕵️‍♂️ Что было дальше?.. Узнаем в следующем уроке — познакомимся с <CodeHighlight>params</CodeHighlight> 🧩",
        ],
      },

      {
        type: "intro",
        title: "Первый этаж полностью укомплектован! 🏨👥",
        content:
          "Поздравляем! 🎉 Мы закончили обустройство первого этажа отеля.\n\n" +
          "Теперь у нас есть целая команда сотрудников, и каждый отвечает за своё направление:\n\n" +
          "— <CodeHighlight>POST</CodeHighlight> принимает гостей и обрабатывает анкеты (регистрация и формы),\n" +
          "— <CodeHighlight>GET</CodeHighlight> показывает клиентам доступные номера и информацию,\n" +
          "— <CodeHighlight>PUT</CodeHighlight> помогает изменить данные — например, сменить номер или обновить профиль,\n" +
          "— <CodeHighlight>DELETE</CodeHighlight> удаляет брони и аккаунты по просьбе клиента.\n\n" +
          "🛎️ Все запросы проходят через наш ресепшн — объект <CodeHighlight>app</CodeHighlight>.\n\n" +
          "Мы поняли, что Express — это не просто библиотека, а целая система организации сервиса. Наш отель уже не просто здание — он живой и рабочий!",
        metaphor: [
          "🏨 Метафора:",
          "Мы открыли ресепшн, наняли ключевых сотрудников, и теперь любой гость может зарегистрироваться, получить помощь, что-то поменять или даже уехать.",
          "Каждый маршрут — как отдельный работник в отеле, у которого своя роль и зона ответственности.",
        ],
        whatWeLearned: [
          "📬 <CodeHighlight>POST</CodeHighlight> — для приёма данных.",
          "📄 <CodeHighlight>GET</CodeHighlight> — для получения информации.",
          "🛠 <CodeHighlight>PUT</CodeHighlight> — для изменения существующего.",
          "🗑 <CodeHighlight>DELETE</CodeHighlight> — для удаления.",
          "🧩 Все маршруты настраиваются через <CodeHighlight>app.METHOD(path, handler)</CodeHighlight>.",
        ],
        whatNext: [
          "👥 Но бывает, что клиент не говорит: «Покажи всё»…",
          "Он говорит: «Покажи **номер 42**» или «Измени бронирование с **ID 17**».",
          "Как передать ID маршруту? Как получить именно нужный номер или профиль?",
          "🧠 Для этого мы изучим специальные **параметры маршрута**.",
          "➡️ В следующем уроке мы научимся работать с <CodeHighlight>req.params</CodeHighlight> — и точно находить нужную информацию 🔍",
        ],
      },
    ],
    []
  );

  // Мемоизируем текущий шаг
  const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);

  // Обработка завершения урока
  const handleLessonCompletion = useCallback(async () => {
    if (isLessonCompleted) return;

    try {
      // Завершаем урок локально
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        // Сохраняем прогресс в localStorage
        saveLessonProgress(4);
        console.log("Урок успешно завершен!");

        // Перенаправляем на страницу с уроками Express через 3 секунды
        setTimeout(() => {
          navigate("/libraries-from-scratch");
        }, 3000);
      } else {
        console.error("Ошибка завершения урока");
      }
    } catch (error) {
      console.error("Ошибка при завершении урока:", error);
    }
  }, [completeLesson, isLessonCompleted, navigate, user?.userId]);

  // Загрузка сохраненного ответа при изменении шага
  useEffect(() => {
    const stepAnswer = getStepAnswer(currentStep);
    if (stepAnswer && stepAnswer.answer) {
      setUserAnswer(stepAnswer.answer);
      // Восстанавливаем правильность ответа для всех типов заданий
      setIsCorrect(stepAnswer.isCorrect);
    } else {
      setUserAnswer("");
      setIsCorrect(null);
    }
  }, [currentStep, getStepAnswer, steps]);

  // Очистка сохраненных ответов при загрузке урока (если урок не завершен)
  useEffect(() => {
    if (!isLessonCompleted) {
      clearLessonProgress();
      console.log("Очищены сохраненные ответы для повторного прохождения");
    }
  }, [isLessonCompleted, clearLessonProgress]);

  // Инициализация прогресса при загрузке
  useEffect(() => {
    if (lessonProgress.progress === 0) {
      updateCurrentStep(currentStep, steps.length);
    }

    // Проверяем, пройден ли урок
    const lessonPassed = checkLessonProgress(4);
    setIsLessonPassed(lessonPassed);
  }, [currentStep, steps.length, lessonProgress.progress, updateCurrentStep]);

  // Сохранение ответа в localStorage
  const saveAnswer = (answer) => {
    saveStepAnswer(currentStep, answer);
  };

  const handleNext = () => {
    // Проверяем, выполнено ли текущее задание
    const currentStepData = steps[currentStep];
    let canProceed = true;

    if (currentStepData.type === "practice") {
      // Для практических заданий проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "quiz") {
      // Для тестов проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "theory_practice") {
      // Для теории с практикой проверяем, что задание выполнено
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "additional_practice") {
      // Для дополнительных задач проверяем, что все 5 задач выполнены правильно
      const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
      if (completedTasks.length < 5) {
        canProceed = false;
      }
    }

    // Нельзя перейти дальше на последнем шаге
    if (currentStep >= steps.length - 1) {
      canProceed = false;
    }

    if (canProceed && currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setAdditionalTaskAnswers({});
      setAdditionalTaskHints({});
      setAdditionalTaskAttempts({});
      setAdditionalTaskShowAnswer({});
      setIsCorrect(null);
    } else if (!canProceed) {
      // Показываем предупреждение
      if (currentStep >= steps.length - 1) {
        alert("🎯 Это последний шаг урока. Ответьте на вопрос выше!");
      } else if (currentStepData.type === "additional_practice") {
        const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
        alert(`⚠️ Выполните все 5 задач правильно! Выполнено: ${completedTasks.length}/5`);
      } else {
        alert("⚠️ Сначала выполните текущее задание правильно!");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setAdditionalTaskAnswers({});
      setAdditionalTaskHints({});
      setAdditionalTaskAttempts({});
      setAdditionalTaskShowAnswer({});
      setIsCorrect(null);
    }
  };

  // Оптимизированный обработчик изменения текста
  const handleTextChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  // Оптимизированный обработчик изменения ответа в тесте
  const handleQuizAnswerChange = useCallback((e) => {
    console.log("=== ИЗМЕНЕНИЕ ОТВЕТА В ТЕСТЕ ===");
    console.log("e.target.value:", e.target.value);
    console.log("typeof e.target.value:", typeof e.target.value);
    setUserAnswer(e.target.value);
    console.log("setUserAnswer вызван с:", e.target.value);
  }, []);

  // Оптимизированный обработчик показа подсказки
  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  // Функция для парсинга JSX тегов в тексте
  const parseJSXInText = (text) => {
    if (!text) return [];

    const parts = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      // Ищем CodeHighlight теги
      const codeOpenTagIndex = text.indexOf("<CodeHighlight>", currentIndex);
      // Ищем WarningHighlight теги
      const warningOpenTagIndex = text.indexOf("<WarningHighlight>", currentIndex);

      // Определяем, какой тег ближе
      let openTagIndex = -1;
      let tagType = "";
      let openTagLength = 0;
      let closeTagLength = 0;

      if (codeOpenTagIndex !== -1 && (warningOpenTagIndex === -1 || codeOpenTagIndex < warningOpenTagIndex)) {
        openTagIndex = codeOpenTagIndex;
        tagType = "code";
        openTagLength = 15; // "<CodeHighlight>".length
        closeTagLength = 16; // "</CodeHighlight>".length
      } else if (warningOpenTagIndex !== -1) {
        openTagIndex = warningOpenTagIndex;
        tagType = "warning";
        openTagLength = 18; // "<WarningHighlight>".length
        closeTagLength = 19; // "</WarningHighlight>".length
      }

      if (openTagIndex === -1) {
        // Нет больше тегов, добавляем оставшийся текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Добавляем текст до тега
      if (openTagIndex > currentIndex) {
        parts.push({ type: "text", content: text.slice(currentIndex, openTagIndex) });
      }

      // Ищем закрывающий тег
      const closeTagName = tagType === "code" ? "</CodeHighlight>" : "</WarningHighlight>";
      const closeTagIndex = text.indexOf(closeTagName, openTagIndex);

      if (closeTagIndex === -1) {
        // Нет закрывающего тега, добавляем как обычный текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Извлекаем содержимое тега
      const tagContent = text.slice(openTagIndex + openTagLength, closeTagIndex);
      parts.push({ type: tagType, content: tagContent });

      currentIndex = closeTagIndex + closeTagLength;
    }

    return parts;
  };

  // Улучшенная проверка ответа с более гибким сравнением
  const normalizeAnswer = (answer) => {
    return answer
      .trim()
      .replace(/\s+/g, "") // Убираем все пробелы
      .replace(/["""]/g, '"') // Нормализуем кавычки
      .replace(/[''']/g, "'") // Нормализуем одинарные кавычки
      .toLowerCase();
  };

  // Функция для анализа ошибок в коде
  const analyzeCodeErrors = (userCode, correctCode) => {
    const userLines = userCode
      .trim()
      .split("\n")
      .filter((line) => line.trim());
    const correctLines = correctCode
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    const errors = [];

    // Проверяем количество строк
    if (userLines.length < correctLines.length) {
      errors.push(`Проверь, что ты написал все ${correctLines.length} строки кода`);
    }

    // Проверяем наличие ключевых элементов
    if (!userCode.includes("print")) {
      errors.push("Проверь, что ты используешь функцию print() для вывода результата");
    }

    // Проверяем математические операторы
    const operators = ["+", "-", "*", "/", "//", "%", "**"];
    const missingOperators = operators.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingOperators.length > 0) {
      if (missingOperators.length === 1) {
        errors.push(`Проверь, что ты используешь оператор ${missingOperators[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы: ${missingOperators.join(", ")}`);
      }
    }

    // Проверяем переменные и их значения
    const variablePattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^#\n]+)/g;
    const correctVars = {};
    const userVars = {};

    // Извлекаем переменные из правильного кода
    let match;
    while ((match = variablePattern.exec(correctCode)) !== null) {
      const varName = match[1].trim();
      const varValue = match[2].trim();
      correctVars[varName] = varValue;
    }

    // Извлекаем переменные из кода пользователя
    variablePattern.lastIndex = 0; // Сбрасываем индекс для повторного использования
    while ((match = variablePattern.exec(userCode)) !== null) {
      const varName = match[1].trim();
      const varValue = match[2].trim();
      userVars[varName] = varValue;
    }

    // Проверяем отсутствующие переменные
    const missingVars = Object.keys(correctVars).filter((varName) => !userVars[varName]);
    if (missingVars.length > 0) {
      errors.push(`Проверь, что ты создал переменную ${missingVars[0]}`);
    }

    // Проверяем неправильные значения переменных
    Object.keys(correctVars).forEach((varName) => {
      if (userVars[varName] && userVars[varName] !== correctVars[varName]) {
        errors.push(`Проверь переменную ${varName} - правильно ли ты написал число ${correctVars[varName]}`);
      }
    });

    // Проверяем операторы сравнения
    const comparisonOps = ["==", "!=", ">", "<", ">=", "<="];
    const missingComparison = comparisonOps.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingComparison.length > 0) {
      if (missingComparison.length === 1) {
        errors.push(`Проверь, что ты используешь оператор сравнения ${missingComparison[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы сравнения: ${missingComparison.join(", ")}`);
      }
    }

    // Проверяем синтаксис
    if (userCode.includes("==") && !userCode.includes("print")) {
      errors.push("Проверь, что ты выводишь результат сравнения через print()");
    }

    // Проверяем логические операторы
    const logicalOps = ["and", "or", "not"];
    const missingLogical = logicalOps.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingLogical.length > 0) {
      if (missingLogical.length === 1) {
        errors.push(`Проверь, что ты используешь логический оператор ${missingLogical[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь логические операторы: ${missingLogical.join(", ")}`);
      }
    }

    return errors;
  };

  const handleAnswerSubmit = useCallback(() => {
    console.log("=== НАЧАЛО handleAnswerSubmit ===");
    console.log("currentStep:", currentStep);
    console.log("userAnswer:", userAnswer);
    console.log("typeof userAnswer:", typeof userAnswer);

    const currentStepData = steps[currentStep];
    console.log("currentStepData:", currentStepData);
    console.log("currentStepData.type:", currentStepData.type);

    let isAnswerCorrect = false;

    if (currentStepData.type === "practice") {
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrectAnswer = normalizeAnswer(currentStepData.answer);

      // Проверяем точное совпадение
      const isExactMatch = normalizedUserAnswer === normalizedCorrectAnswer;

      // Проверяем наличие ключевых элементов для разных типов заданий
      const hasInput = normalizedUserAnswer.includes("input");
      const hasPrint = normalizedUserAnswer.includes("print");
      const hasInt = normalizedUserAnswer.includes("int");
      const hasFString = normalizedUserAnswer.includes('f"') || normalizedUserAnswer.includes("f'");
      const hasQuotes = normalizedUserAnswer.includes('"') || normalizedUserAnswer.includes("'");

      if (isExactMatch) {
        setIsCorrect(true);
        isAnswerCorrect = true;
      } else {
        // Анализируем ошибки
        const errors = analyzeCodeErrors(userAnswer, currentStepData.answer);
        if (errors.length > 0) {
          setIsCorrect({ type: "error", errors });
        } else {
          setIsCorrect("almost");
        }
        isAnswerCorrect = false;
      }
    } else if (currentStepData.type === "quiz") {
      console.log("=== ОБРАБОТКА ТЕСТА ===");
      console.log("userAnswer:", userAnswer);
      console.log("currentStepData.correct:", currentStepData.correct);
      console.log("typeof userAnswer:", typeof userAnswer);
      console.log("typeof currentStepData.correct:", typeof currentStepData.correct);

      // Приводим оба значения к строкам для корректного сравнения
      const userAnswerStr = userAnswer.toString();
      const correctAnswerStr = currentStepData.correct.toString();

      console.log("userAnswerStr:", userAnswerStr);
      console.log("correctAnswerStr:", correctAnswerStr);

      isAnswerCorrect = userAnswerStr === correctAnswerStr;
      console.log("isAnswerCorrect:", isAnswerCorrect);

      setIsCorrect(isAnswerCorrect);
      console.log("setIsCorrect вызван с:", isAnswerCorrect);
    } else if (currentStepData.type === "additional_practice") {
      // Для дополнительных задач проверяем ответы по очереди
      const normalizedUserAnswer = normalizeAnswer(userAnswer);

      // Проверяем все задачи в текущем блоке
      let foundCorrectAnswer = false;
      for (const task of currentStepData.tasks) {
        const normalizedCorrectAnswer = normalizeAnswer(task.answer);
        if (normalizedUserAnswer === normalizedCorrectAnswer) {
          foundCorrectAnswer = true;
          break;
        }
      }

      setIsCorrect(foundCorrectAnswer);
      isAnswerCorrect = foundCorrectAnswer;
    }

    // Сохраняем ответ
    console.log("=== СОХРАНЕНИЕ ОТВЕТА ===");
    console.log("currentStep:", currentStep);
    console.log("userAnswer:", userAnswer);
    console.log("isAnswerCorrect:", isAnswerCorrect);

    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
    console.log("=== КОНЕЦ handleAnswerSubmit ===");
  }, [currentStep, steps, userAnswer, normalizeAnswer, saveStepAnswer]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6 mb-5 bg-gray-50 min-h-screen">
      {/* Модальное окно с поздравлением */}
      {showCongratulations && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Поздравляем!</h2>
            <p className="text-gray-600 mb-6">Вы успешно завершили урок "HTTP методы и Axios"!</p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium mb-2">🎯 Вы изучили:</p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• HTTP методы: GET, POST, PUT, DELETE</li>
                <li>• Создание маршрутов в Express.js</li>
                <li>• Работу с axios для HTTP-запросов</li>
                <li>• Связь между клиентом и сервером</li>
              </ul>
            </div>
            <p className="text-gray-500 text-sm">Перенаправление на страницу уроков Express через 3 секунды...</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div className="bg-green-500 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Прогресс бар */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">📚 Урок 2: HTTP методы и Axios</span>
            {isLessonPassed && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">✅ Пройден</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              📍 {currentStep + 1} из {steps.length}
            </span>
            <span className="text-sm font-medium text-green-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
        <motion.h1
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          {currentStepData.title}
        </motion.h1>

        <motion.div key={`content-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Теоретический контент */}
          {currentStepData.content && (
            <div className="text-gray-700 leading-relaxed text-lg">
              {currentStepData.content.split("\n").map((line, index) => (
                <p key={index} className="mb-3">
                  {parseJSXInText(line).map((part, partIndex) =>
                    part.type === "code" ? (
                      <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                    ) : part.type === "warning" ? (
                      <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                    ) : (
                      <span key={partIndex}>{part.content}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          )}

           {/* Код с вкладками */}
           {currentStepData.codeFiles && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {Object.keys(currentStepData.codeFiles).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => setActiveCodeTab(fileName)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeCodeTab === fileName ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      📁 {fileName}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.codeFiles[activeCodeTab])}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <div className="overflow-y-auto p-4 border border-gray-200 rounded-lg">
                <code className="whitespace-pre text-base font-mono text-gray-800">
                  {currentStepData.codeFiles[activeCodeTab]?.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed">
                      {line.split(" ").map((word, wordIndex) => {
                        // Простая подсветка синтаксиса
                        let className = "text-gray-800";
                        // Комментарии (проверяем первым, чтобы они имели приоритет)
                        if (word.startsWith("//") || line.trim().startsWith("//")) {
                          className = "text-gray-500 italic";
                        }
                        // Ключевые слова
                        else if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                          className = "text-blue-600 font-semibold";
                        }
                        // Строки
                        else if (word.includes("'") || word.includes('"')) {
                          className = "text-green-600";
                        }
                        // Числа
                        else if (/^\d+$/.test(word)) {
                          className = "text-orange-600";
                        }
                        // Методы
                        else if (word.includes("(") && !word.startsWith("(")) {
                          className = "text-purple-600";
                        }

                        return (
                          <span key={wordIndex} className={className}>
                            {word}{" "}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </code>
              </div>
            </div>
          )}

          {/* Обычный код (для других шагов) */}
          {currentStepData.code && !currentStepData.codeFiles && currentStepData.type !== "theory_practice" && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium flex items-center"> JavaScript</span>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.code)}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <div className="overflow-y-auto p-4 border border-gray-200 rounded-lg">
                <code className="whitespace-pre text-base font-mono text-gray-800">
                  {currentStepData.code.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed">
                      {line.split(" ").map((word, wordIndex) => {
                        // Простая подсветка синтаксиса
                        let className = "text-gray-800";

                        // Комментарии (проверяем первым, чтобы они имели приоритет)
                        if (word.startsWith("//") || line.trim().startsWith("//")) {
                          className = "text-gray-500 italic";
                        }
                        // Ключевые слова
                        else if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                          className = "text-blue-600 font-semibold";
                        }
                        // Строки
                        else if (word.includes("'") || word.includes('"')) {
                          className = "text-green-600";
                        }
                        // Числа
                        else if (/^\d+$/.test(word)) {
                          className = "text-orange-600";
                        }
                        // Методы
                        else if (word.includes("(") && !word.startsWith("(")) {
                          className = "text-purple-600";
                        }

                        return (
                          <span key={wordIndex} className={className}>
                            {word}{" "}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </code>
              </div>
            </div>
          )}

          {/* Цель урока */}
          {currentStepData.goal && (
            <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 border-l-4 border-orange-400 rounded-xl p-6 shadow-lg mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200 to-orange-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-full shadow-lg mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-orange-800 font-bold text-xl">Цель урока</h3>
                    <p className="text-orange-600 text-sm">Что мы изучим в этом шаге</p>
                  </div>
                </div>
                <div className="text-orange-800 text-lg font-medium leading-relaxed">
                  {parseJSXInText(currentStepData.goal).map((part, partIndex) =>
                    part.type === "code" ? (
                      <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                    ) : part.type === "warning" ? (
                      <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                    ) : (
                      <span key={partIndex}>{part.content}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Метафора */}
          {currentStepData.metaphor && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎭</span>
                <span className="text-purple-800 font-bold text-xl">Метафора</span>
              </div>
              <div className="space-y-3">
                {currentStepData.metaphor.map((line, i) => (
                  <p key={i} className="text-purple-700 text-lg">
                    {parseJSXInText(line).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Реальный пример из жизни */}
          {currentStepData.realExample && (
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-400 rounded-xl p-6 shadow-lg mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full -mr-20 -mt-20 opacity-15"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-full -ml-16 -mb-16 opacity-15"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full shadow-lg mr-4">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 font-bold text-xl">Пример из жизни</h3>
                    <p className="text-indigo-600 text-sm">Как это работает в реальных приложениях</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {currentStepData.realExample.map((line, i) => (
                    <p key={i} className="text-indigo-800 text-lg">
                      {parseJSXInText(line).map((part, partIndex) =>
                        part.type === "code" ? (
                          <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                        ) : part.type === "warning" ? (
                          <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                        ) : (
                          <span key={partIndex}>{part.content}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Объяснение кода */}
          {currentStepData.explanation && currentStepData.type !== "theory_practice" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💡</span>
                <span className="text-blue-800 font-semibold">Объяснение</span>
              </div>
              <div className="text-blue-800 text-lg">
                {currentStepData.explanation.split("\n").map((line, index) => (
                  <p key={index} className="mb-3">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Частые ошибки новичков */}
          {currentStepData.errorExample && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-4 rounded-xl mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">⚠️</span>
                <span className="text-red-800 font-semibold">Частые ошибки новичков:</span>
              </div>
              <div className="text-red-800 text-lg">
                <pre className="bg-gray-900 rounded-lg p-3 text-red-300 text-sm mb-2 overflow-x-auto">{currentStepData.errorExample.code}</pre>
                <div>{currentStepData.errorExample.explanation}</div>
              </div>
            </div>
          )}

          {/* Где пригодится (дополнительный пример) */}
          {currentStepData.examples && (
            <div className="space-y-8 mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">🛠️</span>
                <span className="text-green-800 font-semibold text-lg">Разбор операторов:</span>
              </div>
              {/* Группировка по типам данных и сбор резюме */}
              {(() => {
                // Группируем по типам данных и собираем резюме отдельно
                const groups = [];
                let currentGroup = null;
                let currentType = null;
                const typeRegex = /Где пригодится (.+)\?:/i;
                const resumeBlocks = [];

                let inResume = false;
                let currentResume = [];
                currentStepData.examples.forEach((ex, i) => {
                  // Начало резюме
                  if (ex.trim().startsWith("Резюмируя:") || ex.trim().startsWith("Резюмируя:")) {
                    if (currentResume.length > 0) {
                      resumeBlocks.push([...currentResume]);
                      currentResume = [];
                    }
                    inResume = true;
                    currentResume.push(ex);
                    return;
                  }
                  // Если встретили новый тип данных — закрываем резюме, если оно было
                  const match = ex.match(typeRegex);
                  if (match) {
                    if (inResume && currentResume.length > 0) {
                      resumeBlocks.push([...currentResume]);
                      currentResume = [];
                      inResume = false;
                    }
                    if (currentGroup) groups.push(currentGroup);
                    currentType = match[1].trim();
                    currentGroup = {
                      type: currentType,
                      items: [
                        {
                          type: "header",
                          content: ex,
                        },
                      ],
                    };
                    return;
                  }
                  // Если мы в резюме — продолжаем собирать
                  if (inResume) {
                    currentResume.push(ex);
                    return;
                  }
                  // Обычные элементы типа данных
                  if (currentGroup) {
                    currentGroup.items.push({ type: "item", content: ex });
                  }
                });
                // Закрываем последнее резюме, если оно было
                if (inResume && currentResume.length > 0) {
                  resumeBlocks.push([...currentResume]);
                }
                if (currentGroup) groups.push(currentGroup);
                // Рендерим группы типов данных
                return (
                  <>
                    {groups.map((group, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-green-300 rounded-2xl shadow-lg p-6 space-y-4 animate-fade-in"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">🔹</span>
                          <span className="text-green-900 font-bold text-xl">{group.type}</span>
                        </div>
                        <div className="space-y-4">
                          {group.items.map((item, i) => {
                            const ex = item.content;
                            // Блок: Где пригодится ... (заголовок)
                            if (item.type === "header") {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">📦</span>
                                  <span className="text-yellow-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Ошибка
                            if (ex.trim().startsWith("⚠️") || ex.trim().startsWith("❌")) {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-red-100 to-pink-50 border-l-4 border-red-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">⚠️</span>
                                  <span className="text-red-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Правильное решение
                            if (ex.trim().startsWith("✅")) {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-green-100 to-emerald-50 border-l-4 border-green-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">✅</span>
                                  <span className="text-green-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Пример (код)
                            const isCode =
                              ex.trim().match(/^[a-zA-Z_][a-zA-Z0-9_ ]* ?=|print\(|total ?=|score ?=|item[12] ?=|result ?=|^#|^\d+\./) ||
                              ex.trim() === "score + 10";
                            if (isCode) {
                              return (
                                <pre
                                  key={i}
                                  className="bg-gray-900 rounded-xl p-3 text-green-300 text-sm mb-2 overflow-x-auto border border-gray-700 animate-fade-in"
                                >
                                  {ex}
                                </pre>
                              );
                            }

                            // Блок: Обычный текст
                            return (
                              <div
                                key={i}
                                className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 shadow rounded-xl p-4 text-blue-900 animate-fade-in"
                              >
                                {ex}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {/* Резюме отдельными секциями */}
                    {resumeBlocks.length > 0 && (
                      <div className="space-y-6 mt-16">
                        {resumeBlocks.map((resumeArr, i) => (
                          <div key={i} className="bg-white border border-gray-200 shadow rounded-2xl p-6 flex items-start space-x-4 animate-fade-in">
                            <span className="text-3xl mt-1 text-blue-400">📌</span>
                            <div className="space-y-2 w-full">
                              {resumeArr.map((ex, j) =>
                                j === 0 ? (
                                  <div key={j} className="text-lg font-semibold text-blue-800 mb-1">
                                    {ex.replace(/Резюмируя:/, "Резюмируя:")}
                                  </div>
                                ) : (
                                  <div key={j} className="text-base text-gray-800 leading-relaxed">
                                    {ex}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* Пояснение о типах данных */}
          {/* {currentStepData.examples && (
            <div className="mt-4 text-green-900 text-base bg-green-50 border-l-4 border-green-400 rounded p-3">
              <span className="font-semibold">Важно:</span> Это не значит, что нужно всегда использовать только один тип данных (например,{" "}
              <span className="font-mono">int</span>). Просто для каждой задачи есть свой подходящий тип данных: для чисел —{" "}
              <span className="font-mono">int</span> или <span className="font-mono">float</span>, для текста — <span className="font-mono">str</span>, для
              ответов "да/нет" — <span className="font-mono">bool</span>. Главное — использовать тот тип, который подходит для вашей задачи!"
            </div>
          )} */}

          {/* Практическое задание */}
          {currentStepData.type === "practice" && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Задание
              </h3>
              <p className="text-yellow-700 mb-4 text-lg">{currentStepData.task}</p>

              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={handleTextChange}
                  placeholder="✍️ Введите ваш код здесь..."
                  className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-mono resize-none"
                  spellCheck="false"
                />

                <div className="flex space-x-4">
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>✅</span>
                    <span>Проверить</span>
                  </button>
                  <button
                    onClick={toggleHint}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>💡</span>
                    <span>Подсказка</span>
                  </button>
                </div>

                {showHint && (
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💡</span>
                      <span className="text-blue-800 font-semibold">Подсказка</span>
                    </div>
                    <div className="text-blue-800 text-lg">
                      {currentStepData.hint.split("\n").map((line, index) => (
                        <p key={index} className="mb-3">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {isCorrect !== null && (
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect === true
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                        : isCorrect === "almost"
                        ? "bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300"
                        : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                    }`}
                  >
                    {isCorrect === true ? (
                      <p className="text-green-800 text-lg font-semibold">🎉 Правильно! Отличная работа! Теперь можете перейти к следующему шагу.</p>
                    ) : isCorrect === "almost" ? (
                      <p className="text-yellow-800 text-lg font-semibold">
                        ⚠️ Ответ почти верный, но проверь скобки и кавычки. Убедись, что используешь правильные кавычки и нет лишних пробелов.
                      </p>
                    ) : isCorrect.type === "error" ? (
                      <div className="text-red-800">
                        <p className="text-lg font-semibold mb-3">❌ Проверь свой код:</p>
                        <ul className="space-y-2">
                          {isCorrect.errors.map((error, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-red-600 mt-1">•</span>
                              <span className="text-base">{error}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-red-800 text-lg font-semibold">❌ Попробуйте еще раз. Проверьте синтаксис.</p>
                    )}
                  </div>
                )}

                {/* Информация о необходимости выполнения задания */}
                {currentStepData.type === "practice" && isCorrect === null && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-blue-800 text-lg">Выполните задание правильно, чтобы перейти к следующему шагу</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Дополнительные задачи */}
          {currentStepData.type === "additional_practice" && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-indigo-800 flex items-center">{currentStepData.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-indigo-700">
                    Выполнено: {currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length}/5
                  </span>
                  <div className="w-16 h-2 bg-indigo-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{
                        width: `${(currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-indigo-700 mb-6 text-lg">{currentStepData.content}</p>

              <div className="space-y-6">
                {currentStepData.tasks.map((task, index) => (
                  <div key={index} className="bg-white border border-indigo-200 rounded-lg p-4 shadow-md">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Задача {index + 1}:</h4>
                    <p className="text-gray-700 mb-4 text-lg">{task.task}</p>

                    <div className="space-y-3">
                      <textarea
                        value={additionalTaskAnswers[index] || ""}
                        onChange={(e) => {
                          setAdditionalTaskAnswers((prev) => ({
                            ...prev,
                            [index]: e.target.value,
                          }));
                        }}
                        placeholder="✍️ Введите ваш код здесь..."
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base font-mono resize-none"
                        spellCheck="false"
                      />

                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            const answer = additionalTaskAnswers[index] || "";
                            const normalizedUserAnswer = normalizeAnswer(answer);
                            const normalizedCorrectAnswer = normalizeAnswer(task.answer);
                            const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

                            // Увеличиваем счетчик попыток только если ответ неправильный
                            if (!isCorrect) {
                              const currentAttempts = additionalTaskAttempts[index] || 0;
                              const newAttempts = currentAttempts + 1;
                              setAdditionalTaskAttempts((prev) => ({
                                ...prev,
                                [index]: newAttempts,
                              }));
                            }

                            let result;
                            if (isCorrect) {
                              result = true;
                            } else {
                              const errors = analyzeCodeErrors(answer, task.answer);
                              result = { type: "error", errors };
                            }

                            // Обновляем состояние для конкретной задачи
                            setAdditionalTaskAnswers((prev) => ({
                              ...prev,
                              [`${index}_correct`]: result,
                            }));
                          }}
                          disabled={!additionalTaskAnswers[index] || additionalTaskAnswers[index].trim() === ""}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md text-sm ${
                            additionalTaskAnswers[index] && additionalTaskAnswers[index].trim() !== ""
                              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <span>✅</span>
                          <span>Проверить</span>
                        </button>
                        <button
                          onClick={() => {
                            setAdditionalTaskHints((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }));
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-md text-sm"
                        >
                          <span>💡</span>
                          <span>Подсказка</span>
                        </button>
                        <button
                          onClick={() => {
                            setAdditionalTaskShowAnswer((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }));
                          }}
                          disabled={additionalTaskAnswers[`${index}_correct`] !== true && (additionalTaskAttempts[index] || 0) < 5}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md text-sm ${
                            additionalTaskAnswers[`${index}_correct`] === true || (additionalTaskAttempts[index] || 0) >= 5
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <span>🎯</span>
                          <span>Показать ответ</span>
                          {additionalTaskAnswers[`${index}_correct`] !== true && (additionalTaskAttempts[index] || 0) < 5 && (
                            <span className="text-xs">({additionalTaskAttempts[index] || 0}/5)</span>
                          )}
                        </button>
                      </div>

                      {additionalTaskHints[index] && (
                        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">💡</span>
                            <span className="text-blue-800 font-semibold">Подсказка</span>
                          </div>
                          <div className="text-blue-800 text-base">{task.hint}</div>
                        </div>
                      )}

                      {additionalTaskAnswers[`${index}_correct`] !== undefined && (
                        <div
                          className={`p-3 rounded-lg ${
                            additionalTaskAnswers[`${index}_correct`] === true
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                              : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                          }`}
                        >
                          {additionalTaskAnswers[`${index}_correct`] === true ? (
                            <p className="text-green-800 text-base font-semibold">🎉 Правильно! Отличная работа!</p>
                          ) : additionalTaskAnswers[`${index}_correct`].type === "error" ? (
                            <div className="text-red-800">
                              <p className="text-base font-semibold mb-2">❌ Проверь свой код:</p>
                              <ul className="space-y-1">
                                {additionalTaskAnswers[`${index}_correct`].errors.map((error, errorIndex) => (
                                  <li key={errorIndex} className="flex items-start space-x-2">
                                    <span className="text-red-600 mt-1">•</span>
                                    <span className="text-sm">{error}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-red-800 text-base font-semibold">❌ Попробуйте еще раз. Проверьте синтаксис.</p>
                          )}
                        </div>
                      )}

                      {/* Показать ответ */}
                      {additionalTaskShowAnswer[index] && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">🎯</span>
                            <span className="text-purple-800 font-semibold">Ответ:</span>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
                            <div className="flex items-center mb-2">
                              <span className="text-gray-700 font-medium text-sm"> JavaScript</span>
                            </div>
                            <div className="overflow-y-auto p-3 bg-gray-50 border border-gray-200 rounded">
                              <code className="whitespace-pre text-sm font-mono text-gray-800">
                                {task.answer.split("\n").map((line, lineIndex) => (
                                  <div key={lineIndex} className="leading-relaxed">
                                    {line.split(" ").map((word, wordIndex) => {
                                      let className = "text-gray-800";

                                      if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                                        className = "text-blue-600 font-semibold";
                                      } else if (word.includes("'") || word.includes('"')) {
                                        className = "text-green-600";
                                      } else if (/^\d+$/.test(word)) {
                                        className = "text-orange-600";
                                      } else if (word.startsWith("//")) {
                                        className = "text-gray-500 italic";
                                      } else if (word.includes("(") && !word.startsWith("(")) {
                                        className = "text-purple-600";
                                      }

                                      return (
                                        <span key={wordIndex} className={className}>
                                          {word}{" "}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ))}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Информация о выполнении задач */}
              {(() => {
                const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
                const totalTasks = currentStepData.tasks.length;

                if (completedTasks.length === 0) {
                  return (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">ℹ️</span>
                        <p className="text-blue-800 text-lg">Выполните все 5 задач правильно, чтобы перейти к следующему шагу</p>
                      </div>
                    </div>
                  );
                } else if (completedTasks.length < totalTasks) {
                  return (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎯</span>
                        <p className="text-yellow-800 text-lg">
                          Отлично! Выполнено {completedTasks.length} из {totalTasks} задач. Продолжайте!
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎉</span>
                        <p className="text-green-800 text-lg font-semibold">Превосходно! Все задачи выполнены правильно! Можете перейти к следующему шагу.</p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          )}

          {/* Теория с практикой */}
          {currentStepData.type === "theory_practice" && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💻</span>
                Самостоятельная практика
              </h3>

              <div className="space-y-6">
                {/* Ожидаемый результат */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🎯</span>
                    <span className="text-blue-800 font-semibold">Ожидаемый результат:</span>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-lg font-mono">{currentStepData.expectedOutput}</pre>
                  </div>
                </div>

                {/* Инструкции */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">📝</span>
                    <span className="text-yellow-800 font-semibold">Инструкции:</span>
                  </div>
                  <ol className="text-yellow-700 text-lg space-y-2">
                    <li>1. Откройте ваш редактор кода (PyCharm, VS Code, IDLE или любой другой)</li>
                    <li>2. Создайте новый файл с расширением .py</li>
                    <li>3. Напишите код согласно заданию</li>
                    <li>4. Запустите программу и проверьте результат</li>
                    <li>5. Убедитесь, что вывод совпадает с ожидаемым результатом</li>
                    <li>6. Когда будете готовы, нажмите "Продолжить"</li>
                  </ol>
                </div>

                {/* Кнопки */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      // Автоматически помечаем как выполненное
                      setIsCorrect(true);
                      saveStepAnswer(currentStep, "theory_practice_completed", true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>✅</span>
                    <span>Продолжить</span>
                  </button>
                  <button
                    onClick={toggleHint}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>💡</span>
                    <span>Подсказка</span>
                  </button>
                  <button
                    onClick={() => setShowAnswer((prev) => !prev)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>🎯</span>
                    <span>{showAnswer ? "Скрыть ответ" : "Показать ответ"}</span>
                  </button>
                </div>

                {/* Показать ответ */}
                {showAnswer && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">🎯</span>
                      <span className="text-purple-800 font-semibold">Решение:</span>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-green-400 font-medium flex items-center">🐍 Python</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(currentStepData.code)}
                          className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                        >
                          <span>📋</span>
                          <span>Копировать</span>
                        </button>
                      </div>
                      <pre className="text-green-400 overflow-x-auto text-lg">
                        <code>{currentStepData.code}</code>
                      </pre>
                    </div>
                    {currentStepData.explanation && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-xl mt-4">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">💡</span>
                          <span className="text-blue-800 font-semibold">Объяснение</span>
                        </div>
                        <div className="text-blue-800 text-lg">
                          {currentStepData.explanation.split("\n").map((line, index) => (
                            <p key={index} className="mb-3">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {showHint && currentStepData.hint && (
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💡</span>
                      <span className="text-blue-800 font-semibold">Подсказка</span>
                    </div>
                    <div className="text-blue-800 text-lg">
                      {currentStepData.hint.split("\n").map((line, index) => (
                        <p key={index} className="mb-3">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Информация о выполнении */}
                {isCorrect === null && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-emerald-800 text-lg">Выполните задание в своем редакторе кода, затем нажмите "Продолжить"</p>
                    </div>
                  </div>
                )}

                {isCorrect === true && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🎉</span>
                      <p className="text-green-800 text-lg font-semibold">Отлично! Вы можете перейти к следующему шагу.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Тест */}
          {currentStepData.type === "quiz" && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🧠</span>
                Вопрос
              </h3>
              <p className="text-purple-700 mb-6 text-lg">{currentStepData.question}</p>

              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-purple-100 transition-colors">
                    <input
                      type="radio"
                      name="quiz"
                      value={index}
                      checked={userAnswer === index.toString()}
                      onChange={handleQuizAnswerChange}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-purple-700 text-lg">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    console.log('=== КНОПКА "ПРОВЕРИТЬ ОТВЕТ" НАЖАТА ===');
                    console.log("userAnswer перед вызовом:", userAnswer);
                    console.log("typeof userAnswer:", typeof userAnswer);
                    console.log("disabled:", !userAnswer);
                    handleAnswerSubmit();
                  }}
                  disabled={!userAnswer}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg ${
                    userAnswer
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span>✅</span>
                  <span>Проверить ответ</span>
                </button>
                <button
                  onClick={toggleHint}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <span>💡</span>
                  <span>Подсказка</span>
                </button>
              </div>

              {showHint && currentStepData.hint && (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4 mt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">💡</span>
                    <span className="text-blue-800 font-semibold">Подсказка</span>
                  </div>
                  <div className="text-blue-800 text-lg">
                    {currentStepData.hint.split("\n").map((line, index) => (
                      <p key={index} className="mb-3">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {isCorrect !== null && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    isCorrect
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                      : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                  }`}
                >
                  <p className={`text-lg font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect
                      ? "🎉 Правильно! input() всегда возвращает строку, даже если пользователь ввел число. Теперь можете перейти к следующему шагу."
                      : "❌ Неправильно. Попробуйте еще раз."}
                  </p>
                </div>
              )}

              {/* Информация о необходимости ответа на вопрос */}
              {currentStepData.type === "quiz" && isCorrect === null && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">ℹ️</span>
                    <p className="text-blue-800 text-lg">
                      {userAnswer ? "Ответьте на вопрос правильно, чтобы перейти к следующему шагу" : "Выберите ответ на вопрос выше"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Напоминание из курса */}
          {currentStepData.reminders && <ReminderBlock reminders={currentStepData.reminders} />}

          {/* Что мы изучили */}
          {currentStepData.whatWeLearned && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Что мы изучили
              </h3>
              <div className="space-y-3">
                {currentStepData.whatWeLearned.map((item, index) => (
                  <div key={index} className="text-green-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Краткое резюме */}
          {currentStepData.summary && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Краткое резюме урока
              </h3>
              <div className="space-y-3">
                {currentStepData.summary.map((item, index) => (
                  <div key={index} className="text-purple-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Что дальше */}
          {currentStepData.whatNext && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🚀</span>
                Что дальше
              </h3>
              <div className="space-y-3">
                {currentStepData.whatNext.map((item, index) => (
                  <div key={index} className="text-blue-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            currentStep === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg"
          }`}
        >
          <span>←</span>
          <span>Назад</span>
        </button>

        <div className="flex space-x-4">
          <Link
            to="/python-course"
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <span>📚</span>
            <span>К Python курсу</span>
          </Link>

          {lessonCompleted ? (
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg animate-pulse">
              <span>🎉</span>
              <span>Урок завершен! Перенаправление...</span>
            </div>
          ) : isLessonPassed ? (
            <button
              onClick={() => {
                // Сбрасываем прогресс урока для повторного прохождения
                clearLessonProgress();
                setLessonCompleted(false);
                setShowCongratulations(false);
                setIsLessonPassed(false);
                updateCurrentStep(0, steps.length);
                setUserAnswer("");
                setIsCorrect(null);
                setShowHint(false);

                // Удаляем урок из localStorage для полного сброса
                try {
                  const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
                  const updatedLessons = completedLessons.filter((id) => id !== 4);
                  localStorage.setItem("completedLessons", JSON.stringify(updatedLessons));
                  console.log("Урок удален из localStorage для повторного прохождения");
                } catch (error) {
                  console.error("Ошибка удаления урока из localStorage:", error);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>🔄</span>
              <span>Повторить урок</span>
            </button>
          ) : currentStep === steps.length - 1 && (currentStepData.type === "intro" || isCorrect === true) ? (
            <button
              onClick={handleLessonCompletion}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>🎉</span>
              <span>Завершить урок</span>
            </button>
          ) : currentStep === steps.length - 1 ? (
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg">
              <span>🎯</span>
              <span>Ответьте на вопрос выше для завершения урока</span>
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={(() => {
                const currentStepData = steps[currentStep];
                if (currentStepData.type === "practice" || currentStepData.type === "quiz" || currentStepData.type === "theory_practice") {
                  // Если урок уже был пройден, не блокируем кнопку
                  return isCorrect !== true && !isLessonPassed;
                } else if (currentStepData.type === "additional_practice") {
                  // Для дополнительных задач проверяем, что все 5 задач выполнены правильно
                  const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
                  return completedTasks.length < 5;
                }
                return false;
              })()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${(() => {
                const currentStepData = steps[currentStep];
                if (currentStepData.type === "practice" || currentStepData.type === "quiz" || currentStepData.type === "theory_practice") {
                  return isCorrect !== true && !isLessonPassed
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
                } else if (currentStepData.type === "additional_practice") {
                  const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
                  return completedTasks.length < 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
                }
                return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
              })()}`}
            >
              <span>Далее</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>

      {/* Мотивация */}
      {currentStepData.motivation && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-xl mt-8">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">💪</span>
            <span className="text-yellow-800 font-semibold">Мотивация:</span>
          </div>
          <div className="text-yellow-800 text-lg">
            {parseJSXInText(currentStepData.motivation).map((part, partIndex) =>
              part.type === "code" ? (
                <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
              ) : part.type === "warning" ? (
                <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
              ) : (
                <span key={partIndex}>{part.content}</span>
              )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ExpressLesson2;
