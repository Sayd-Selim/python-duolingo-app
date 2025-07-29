import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

function HTMLLesson1() {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const navigate = useNavigate();
  
  // Создаем фиктивного пользователя для работы без авторизации
  const user = { userId: 'demo_user_123' };
  const { refreshUserProgress } = useProgress();
  
  // Функции для работы с localStorage
  const saveLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
      console.log('Урок сохранен в localStorage:', lessonId);
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  };

  const checkLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      return completedLessons.includes(lessonId);
    } catch (error) {
      console.error('Ошибка проверки localStorage:', error);
      return false;
    }
  };
  
  // Используем новый хук для управления прогрессом
  const {
    currentStep,
    lessonProgress,
    isLoading,
    updateCurrentStep,
    saveStepAnswer,
    getStepAnswer,
    isLessonCompleted,
    completeLesson,
    clearLessonProgress,
    loadProgressFromServer
  } = useLessonProgress(1);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: '🌟 Добро пожаловать в мир HTML! 🌐',
      content: '🎯 HTML (HyperText Markup Language) - это язык разметки, который является основой веб-разработки. Он определяет структуру и содержимое веб-страниц.\n\n💡 Представьте HTML как скелет веб-страницы. Он создает основу, на которую потом накладываются стили и добавляется интерактивность!\n\n🚀 Готовы создать свою первую веб-страницу?',
      code: null
    },
    {
      type: 'theory',
      title: '🤔 Что такое HTML?',
      content: '✨ HTML - это:\n\n📝 Язык разметки (не программирования)\n🌐 Основа всех веб-страниц\n🏗️ Инструкция для браузера\n📋 Способ структурирования контента\n\n🎮 HTML — как конструктор LEGO для веб-страниц. У вас есть готовые блоки (теги), и вы просто соединяете их, чтобы создать страницу!\n\n💪 Начнем с простого и постепенно перейдем к сложному!',
      code: null
    },
    {
      type: 'code',
      title: '🎉 Ваша первая HTML страница',
      content: '🎯 Каждая HTML страница имеет базовую структуру:\n\n💭 Представьте HTML документ как дом. У него есть фундамент (html), крыша (head) и комнаты (body). Каждая часть имеет свое назначение.\n\n🎪 Это как строительство дома - сначала фундамент, потом стены, потом крыша!',
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая HTML страница.</p>
</body>
</html>`,
      explanation: '🔍 <!DOCTYPE html> — объявление типа документа\n\n<html> — корневой элемент страницы\n\n<head> — служебная информация (заголовок, мета-теги)\n\n<title> — заголовок страницы в браузере\n\n<body> — видимое содержимое страницы\n\n📝 Это как написать письмо — у вас есть конверт (html), адрес (head) и само письмо (body).\n\n🎨 Теперь вы архитектор веб-страниц!'
    },
    {
      type: 'practice',
      title: '🎯 Попробуйте сами!',
      content: '✍️ Создайте простую HTML страницу с заголовком "Мой сайт" и параграфом "Добро пожаловать!"\n\n🗣️ Представьте, что вы создаете визитную карточку в интернете. Вы указываете заголовок и добавляете приветствие.\n\n🎭 Это как написать открытку — у вас есть заголовок и текст поздравления!',
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Мой сайт</title>
</head>
<body>
    <h1>Мой сайт</h1>
    <p>Добро пожаловать!</p>
</body>
</html>`,
      task: 'Создайте HTML страницу с заголовком "Мой сайт" и параграфом "Добро пожаловать!"',
      answer: '<!DOCTYPE html><html><head><title>Мой сайт</title></head><body><h1>Мой сайт</h1><p>Добро пожаловать!</p></body></html>',
      hint: '💡 Начните с <!DOCTYPE html>, затем создайте структуру html > head > title и body > h1 > p\n\n📝 Помните: каждый открывающий тег должен иметь закрывающий тег\n\n🎯 Не забудьте про заголовок в <title> и содержимое в <body>!'
    },
    {
      type: 'theory',
      title: '🏷️ Что такое теги?',
      content: '📝 Теги - это специальные слова в угловых скобках, которые говорят браузеру, как отображать контент.\n\n📖 Представьте теги как инструкции для браузера. Вы говорите: "покажи это как заголовок", "сделай это параграфом", "выдели это жирным". Браузер читает ваши инструкции и отображает страницу соответственно.\n\n🎨 Теги - это ваш инструмент для создания красивых веб-страниц!',
      code: '<h1>Это заголовок</h1>\n<p>Это параграф</p>\n<strong>Это жирный текст</strong>',
      explanation: '🔍 <h1> — тег заголовка первого уровня\n\n<p> — тег параграфа\n\n<strong> — тег для выделения жирным\n\n📌 Угловые скобки <> — это как кавычки для тегов\n\n💭 Каждый тег имеет свое назначение и влияет на отображение текста!'
    },
    {
      type: 'practice',
      title: '📝 Задача 1: Основные теги',
      content: '✍️ Создайте HTML страницу с заголовком "Мой блог", подзаголовком "О программировании" и параграфом "Здесь я буду писать о программировании"\n\n🗣️ Представьте, что вы создаете блог. У вас есть главный заголовок, подзаголовок раздела и описание.\n\n🎭 Это как создать обложку книги — у вас есть название, подзаголовок и аннотация!',
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Мой блог</title>
</head>
<body>
    <h1>Мой блог</h1>
    <h2>О программировании</h2>
    <p>Здесь я буду писать о программировании</p>
</body>
</html>`,
      task: 'Создайте HTML страницу с заголовком "Мой блог", подзаголовком "О программировании" и параграфом "Здесь я буду писать о программировании"',
      answer: '<!DOCTYPE html><html><head><title>Мой блог</title></head><body><h1>Мой блог</h1><h2>О программировании</h2><p>Здесь я буду писать о программировании</p></body></html>',
      hint: '💡 Используйте h1 для главного заголовка, h2 для подзаголовка и p для параграфа\n\n📝 Помните про правильную структуру: html > head > title и body > h1 > h2 > p\n\n🎯 Не забудьте закрыть все теги!'
    },
    {
      type: 'theory',
      title: '📋 Структура HTML документа',
      content: '🏗️ Каждый HTML документ имеет четкую структуру:\n\n📖 DOCTYPE — объявление типа документа\n\nhtml — корневой элемент\n\nhead — метаинформация (не видна на странице)\n\nbody — видимое содержимое\n\n🎨 Это как план дома — сначала фундамент, потом стены, потом интерьер!',
      code: `<!DOCTYPE html>          <!-- Объявление типа документа -->
<html>                <!-- Корневой элемент -->
<head>                <!-- Служебная информация -->
    <title>Заголовок</title>
    <meta charset="utf-8">
</head>
<body>                <!-- Видимое содержимое -->
    <h1>Заголовок</h1>
    <p>Текст</p>
</body>
</html>`,
      explanation: '🔍 DOCTYPE — говорит браузеру, что это HTML5\n\nhtml — обертка для всего документа\n\nhead — содержит метаданные (заголовок, кодировка, стили)\n\nbody — содержит то, что видит пользователь\n\n📌 Эта структура обязательна для любой HTML страницы!'
    },
    {
      type: 'practice',
      title: '🎯 Финальная задача',
      content: '✍️ Создайте полноценную HTML страницу с заголовком "Мой первый сайт", подзаголовком "Добро пожаловать" и параграфом "Это моя первая веб-страница, созданная с помощью HTML!"\n\n🗣️ Представьте, что вы создаете свою первую веб-страницу. Это как написать первое письмо или создать первый рисунок!\n\n🎭 Это ваш первый шаг в веб-разработке!',
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Мой первый сайт</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Мой первый сайт</h1>
    <h2>Добро пожаловать</h2>
    <p>Это моя первая веб-страница, созданная с помощью HTML!</p>
</body>
</html>`,
      task: 'Создайте полноценную HTML страницу с заголовком "Мой первый сайт", подзаголовком "Добро пожаловать" и параграфом "Это моя первая веб-страница, созданная с помощью HTML!"',
      answer: '<!DOCTYPE html><html><head><title>Мой первый сайт</title><meta charset="utf-8"></head><body><h1>Мой первый сайт</h1><h2>Добро пожаловать</h2><p>Это моя первая веб-страница, созданная с помощью HTML!</p></body></html>',
      hint: '💡 Включите все элементы: DOCTYPE, html, head с title и meta charset, body с h1, h2 и p\n\n📝 Убедитесь, что все теги правильно закрыты\n\n🎯 Это ваша первая полноценная HTML страница!'
    }
  ], []);

  // Обработчики событий
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1);
    } else {
      // Урок завершен
      setLessonCompleted(true);
      setShowCongratulations(true);
      saveLessonProgress(1); // Сохраняем прогресс первого урока
    }
  }, [currentStep, steps.length, updateCurrentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
    }
  }, [currentStep, updateCurrentStep]);

  const handleAnswerSubmit = useCallback(() => {
    const currentStepData = steps[currentStep];
    if (currentStepData.type === 'practice') {
      const normalizedUserAnswer = userAnswer.replace(/\s+/g, '').toLowerCase();
      const normalizedCorrectAnswer = currentStepData.answer.replace(/\s+/g, '').toLowerCase();
      
      if (normalizedUserAnswer === normalizedCorrectAnswer) {
        setIsCorrect(true);
        setTimeout(() => {
          setIsCorrect(null);
          setUserAnswer('');
          handleNext();
        }, 1500);
      } else {
        setIsCorrect(false);
        setShowHint(true);
      }
    }
  }, [userAnswer, currentStep, steps, handleNext]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit();
    }
  }, [handleAnswerSubmit]);

  // Загружаем прогресс при монтировании
  useEffect(() => {
    const loadProgress = async () => {
      try {
        await loadProgressFromServer();
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error);
      }
    };
    loadProgress();
  }, [loadProgressFromServer]);

  // Проверяем, завершен ли урок
  useEffect(() => {
    const completed = checkLessonProgress(1);
    if (completed) {
      setLessonCompleted(true);
    }
  }, []);

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок урока */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-4xl mb-4">🌐</div>
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            Урок 1: Введение в HTML
          </h1>
          <p className="text-gray-600">
            Изучаем основы HTML и создаем первую веб-страницу
          </p>
        </motion.div>

        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Прогресс урока</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Основной контент */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          {/* Заголовок шага */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
            <div className="text-sm text-gray-500">
              Шаг {currentStep + 1} из {steps.length}
            </div>
          </div>

          {/* Контент шага */}
          <div className="mb-6">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentStepData.content}
            </div>
          </div>

          {/* Код (если есть) */}
          {currentStepData.code && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💻 Код:</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">{currentStepData.code}</pre>
              </div>
            </div>
          )}

          {/* Объяснение (если есть) */}
          {currentStepData.explanation && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Объяснение:</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentStepData.explanation}
                </div>
              </div>
            </div>
          )}

          {/* Практическое задание */}
          {currentStepData.type === 'practice' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Задание:</h3>
              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 font-medium">{currentStepData.task}</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваш ответ:
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="6"
                  placeholder="Введите ваш HTML код здесь..."
                />
              </div>

              {/* Результат */}
              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
                >
                  ✅ Правильно! Отличная работа!
                </motion.div>
              )}

              {isCorrect === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
                >
                  ❌ Попробуйте еще раз. Проверьте синтаксис и структуру.
                </motion.div>
              )}

              {/* Подсказка */}
              {showHint && currentStepData.hint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4"
                >
                  💡 Подсказка: {currentStepData.hint}
                </motion.div>
              )}

              <button
                onClick={handleAnswerSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium"
              >
                Проверить ответ
              </button>
            </div>
          )}

          {/* Кнопки навигации */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              ← Назад
            </button>

            {currentStepData.type !== 'practice' && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                {currentStep === steps.length - 1 ? 'Завершить урок' : 'Далее →'}
              </button>
            )}
          </div>
        </motion.div>

        {/* Поздравления */}
        {showCongratulations && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Поздравляем!
              </h2>
              <p className="text-gray-600 mb-6">
                Вы успешно завершили первый урок HTML! Теперь вы знаете основы создания веб-страниц.
              </p>
              <div className="space-y-3">
                <Link
                  to="/html-course"
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  К следующему уроку
                </Link>
                <Link
                  to="/"
                  className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  На главную
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HTMLLesson1; 