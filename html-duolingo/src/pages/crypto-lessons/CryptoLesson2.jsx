import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import CandlestickChart from '../../components/CandlestickChart';
import ProfessionalCandlestickChart from '../../components/ProfessionalCandlestickChart';
import RechartsCandlestickChart from '../../components/RechartsCandlestickChart';

function CryptoLesson2() {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const navigate = useNavigate();
  const { refreshUserProgress } = useProgress();
  
  // Создаем фиктивного пользователя для работы без авторизации
  const user = { userId: 'demo_user_123' };
  
  // Функции для работы с localStorage
  const saveLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('cryptoCompletedLessons') || '[]');
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('cryptoCompletedLessons', JSON.stringify(completedLessons));
      }
      console.log('Урок криптотрейдинга сохранен в localStorage:', lessonId);
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  };

  const checkLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('cryptoCompletedLessons') || '[]');
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
  } = useLessonProgress(2);

  // Данные для графиков
  const chartData = useMemo(() => [
    // Простые примеры для обучения
    { open: 100, high: 105, low: 98, close: 103 },
    { open: 103, high: 108, low: 102, close: 106 },
    { open: 106, high: 110, low: 104, close: 107 },
    { open: 107, high: 112, low: 105, close: 109 },
    { open: 109, high: 115, low: 107, close: 113 },
    { open: 113, high: 118, low: 110, close: 116 },
    { open: 116, high: 120, low: 112, close: 114 },
    { open: 114, high: 116, low: 108, close: 110 },
    { open: 110, high: 113, low: 105, close: 107 },
    { open: 107, high: 109, low: 100, close: 102 }
  ], []);

  // Профессиональные данные с временными метками
  const professionalChartData = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const data = [];
    
    for (let i = 0; i < 100; i++) {
      const basePrice = 50000 + Math.sin(i * 0.1) * 5000 + Math.random() * 2000;
      const open = basePrice;
      const close = basePrice + (Math.random() - 0.5) * 1000;
      const high = Math.max(open, close) + Math.random() * 500;
      const low = Math.min(open, close) - Math.random() * 500;
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      data.push({
        time: now - (100 - i) * 3600, // Каждый час
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
        volume: volume
      });
    }
    
    return data;
  }, []);

  const specialPatternsData = useMemo(() => [
    // Доджи
    { open: 100, high: 102, low: 98, close: 100 },
    // Марубозу (бычий)
    { open: 100, high: 110, low: 100, close: 110 },
    // Хаммер
    { open: 100, high: 102, low: 90, close: 101 },
    // Обычная свеча
    { open: 100, high: 105, low: 98, close: 103 }
  ], []);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: '🕯️ Добро пожаловать в мир японских свечей! 📊',
      content: '🎯 Японские свечи - это один из самых популярных способов отображения цен на финансовых рынках. Они были изобретены в Японии в XVIII веке для торговли рисом и теперь используются во всем мире.\n\n💡 Представьте свечу как рассказ о том, что происходило с ценой за определенный период времени. Каждая свеча показывает открытие, закрытие, максимум и минимум цены.\n\n🚀 Готовы научиться читать эти "истории" и предсказывать движение цен?',
      code: null
    },
    {
      type: 'theory',
      title: '🤔 Что такое японская свеча?',
      content: '✨ Японская свеча состоит из двух частей:\n\n📝 Тело свечи (body) - показывает цену открытия и закрытия\n📚 Тени (shadows/wicks) - показывают максимальную и минимальную цены\n\n👥 Зеленая свеча (бычья) - цена закрытия выше цены открытия\n🌍 Красная свеча (медвежья) - цена закрытия ниже цены открытия\n\n🎮 Свечи — как эмоции рынка. Зеленые свечи показывают оптимизм (быки побеждают), а красные - пессимизм (медведи побеждают).\n\n💪 Научившись читать свечи, вы сможете понимать настроение рынка!',
      code: null
    },
    {
      type: 'code',
      title: '🎉 Структура японской свечи',
      content: '🎯 Каждая свеча содержит 4 ключевые точки данных:\n\n💭 Open (Открытие) - цена в начале периода\nHigh (Максимум) - самая высокая цена за период\nLow (Минимум) - самая низкая цена за период\nClose (Закрытие) - цена в конце периода\n\n🎪 Тело свечи - это прямоугольник между Open и Close\nТени - это тонкие линии от тела до High и Low\n\n🎨 Цвет свечи зависит от направления движения цены!\n\n📊 Ниже вы видите интерактивный график. Наведите курсор на свечи, чтобы увидеть их данные!',
      code: 'Бычья свеча (зеленая):\nOpen: $100\nHigh: $110\nLow: $95\nClose: $108\n\nМедвежья свеча (красная):\nOpen: $100\nHigh: $105\nLow: $90\nClose: $92',
      explanation: '🔍 Зеленая свеча: Close > Open (цена выросла)\nКрасная свеча: Close < Open (цена упала)\n\nРазмер тела показывает силу движения.\nДлинные тени показывают волатильность.\n\n📝 Чем больше тело, тем сильнее настроение рынка.\n\n🎨 Теперь вы понимаете язык свечей!',
      chart: chartData
    },
    {
      type: 'practice',
      title: '🎯 Проверьте свои знания!',
      content: '✍️ Какого цвета будет свеча, если цена открытия $100, а цена закрытия $105?\n\n🗣️ Вспомните правило: если цена закрытия выше цены открытия, то это бычья свеча.\n\n🎭 Это как определить, выросла ли температура за день!\n\n📊 Изучите график ниже, чтобы лучше понять структуру свечей!',
      code: 'Цена открытия: $100\nЦена закрытия: $105\nРезультат: Зеленая свеча (бычья)',
      task: 'Выберите правильный ответ',
      answer: 'Зеленая',
      hint: '💡 Если цена закрытия выше цены открытия, свеча зеленая.\n\n📝 Зеленые свечи показывают рост цены (бычий тренд).\n\n🎯 Быки = рост = зеленый цвет.',
      chart: chartData
    },
    {
      type: 'theory',
      title: '💬 Типы свечей по размеру',
      content: '📝 Свечи можно классифицировать по размеру их тела:\n\n📖 Доджи (Doji) - тело очень маленькое или отсутствует\nМарубозу (Marubozu) - тело большое, тени отсутствуют\nХаммер (Hammer) - маленькое тело, длинная нижняя тень\n\n🎨 Каждый тип свечи имеет свое значение и может предсказывать будущее движение цены.\n\n📌 Доджи часто указывает на неопределенность рынка.\nМарубозу показывает сильное движение в одном направлении.\nХаммер может сигнализировать о развороте тренда.\n\n📊 Изучите график ниже с разными типами свечей!',
      code: 'Доджи: Open ≈ Close\nМарубозу: Open = Low, Close = High (бычий)\nХаммер: маленькое тело + длинная нижняя тень',
      explanation: '🔍 Доджи - рынок не может определиться с направлением.\n\nМарубозу - сильное движение без откатов.\n\nХаммер - продавцы были активны, но покупатели отбили цену.\n\n📌 Эти паттерны помогают понять настроение рынка.\n\n💭 Каждая свеча рассказывает свою историю!',
      chart: specialPatternsData
    },
    {
      type: 'quiz',
      title: '🧠 Тест: Японские свечи',
      content: 'Проверьте свои знания о японских свечах',
      question: 'Что показывает тело японской свечи?',
      options: [
        'Только максимальную и минимальную цены',
        'Цену открытия и закрытия',
        'Объем торгов',
        'Время торгов'
      ],
      correctAnswer: 1,
      hint: '💡 Тело свечи - это прямоугольник между ценой открытия и закрытия.\n\n📝 Тени показывают максимум и минимум.\n\n🎯 Тело = Open и Close, тени = High и Low.'
    },
    {
      type: 'theory_practice',
      title: '💻 Практическое задание: Анализ свечей',
      content: 'Изучите реальные свечи на графике и определите их типы',
      expectedOutput: 'Анализ завершен!\nНайдено: 5 бычьих свечей, 3 медвежьих свечи\nСпециальные паттерны: 2 доджи, 1 хаммер\nРекомендация: Внимательно следить за доджи',
      hint: '💡 Используйте TradingView или Binance для просмотра реальных графиков.\n\n📝 Обратите внимание на размеры тел и теней.\n\n🎯 Практикуйтесь на исторических данных.'
    },
    {
      type: 'intro',
      title: '📚 Библиотеки для создания графиков',
      content: '🎯 В мире веб-разработки существует множество библиотек для создания профессиональных графиков:\n\n🚀 **TradingView Lightweight Charts** - самая популярная для финансовых графиков\n📈 **Recharts** - мощная библиотека для React с множеством типов графиков\n🎨 **Chart.js** - простая и гибкая библиотека\n📊 **D3.js** - самая мощная, но сложная в освоении\n\n💡 Каждая библиотека имеет свои преимущества и подходит для разных задач.',
      code: '// Пример использования TradingView\nimport { createChart } from "lightweight-charts";\n\nconst chart = createChart(container, {\n  width: 800,\n  height: 400\n});\n\nconst candlestickSeries = chart.addCandlestickSeries();\ncandlestickSeries.setData(data);',
      explanation: '🔍 TradingView - лучший выбор для финансовых графиков\n\nRecharts - отлично подходит для React приложений\n\nChart.js - простая и быстрая разработка\n\nD3.js - максимальная кастомизация\n\n📝 Выбор библиотеки зависит от требований проекта!'
    }
  ], []);

  // Функция переключения подсказки
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  // Функция завершения урока
  const handleLessonCompletion = useCallback(async () => {
    try {
      console.log('Завершение урока японских свечей...');
      
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        saveLessonProgress(2);
        console.log('Урок японских свечей успешно завершен!');
        
        setTimeout(() => {
          navigate('/crypto-trading-course');
        }, 3000);
      } else {
        console.error('Ошибка завершения урока');
      }
    } catch (error) {
      console.error('Ошибка при завершении урока:', error);
    }
  }, [completeLesson, navigate]);

  // Загрузка сохраненного ответа при изменении шага
  useEffect(() => {
    const stepAnswer = getStepAnswer(currentStep);
    if (stepAnswer && stepAnswer.answer) {
      setUserAnswer(stepAnswer.answer);
      setIsCorrect(stepAnswer.isCorrect);
    } else {
      setUserAnswer('');
      setIsCorrect(null);
    }
  }, [currentStep, getStepAnswer]);

  // Очистка сохраненных ответов при загрузке урока
  useEffect(() => {
    if (!isLessonCompleted) {
      clearLessonProgress();
      console.log('Очищены сохраненные ответы для повторного прохождения');
    }
  }, [isLessonCompleted, clearLessonProgress]);

  // Инициализация прогресса при загрузке
  useEffect(() => {
    if (lessonProgress.progress === 0) {
      updateCurrentStep(currentStep, steps.length);
    }
    
    const lessonPassed = checkLessonProgress(2);
    setIsLessonPassed(lessonPassed);
    
    console.log('Инициализация урока японских свечей:', { lessonPassed, currentStep, lessonProgress });
  }, [currentStep, steps.length, lessonProgress.progress, updateCurrentStep]);

  const handleNext = useCallback(() => {
    const currentStepData = steps[currentStep];
    let canProceed = true;
    
    if (currentStepData.type === 'practice' || currentStepData.type === 'quiz' || currentStepData.type === 'theory_practice') {
      if (isCorrect !== true) {
        canProceed = false;
      }
    }
    
    if (currentStep >= steps.length - 1) {
      canProceed = false;
    }
    
    if (canProceed && currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1, steps.length);
      setShowHint(false);
    } else if (!canProceed) {
      if (currentStep >= steps.length - 1) {
        alert('🎯 Это последний шаг урока. Ответьте на вопрос выше!');
      } else {
        alert('⚠️ Сначала выполните текущее задание правильно!');
      }
    }
  }, [currentStep, steps, isCorrect, updateCurrentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1, steps.length);
      setShowHint(false);
    }
  }, [currentStep, updateCurrentStep, steps.length]);

  const normalizeAnswer = useCallback((answer) => {
    const normalized = answer
      .trim()
      .replace(/#\s+/g, '# ')
      .replace(/\s+#/g, ' #')
      .replace(/\s+/g, ' ')
      .replace(/["""]/g, '"')
      .replace(/[''']/g, "'")
      .toLowerCase();
    
    console.log('Нормализация:', { original: answer, normalized });
    return normalized;
  }, []);

  const handleAnswerSubmit = useCallback(() => {
    console.log('handleAnswerSubmit вызвана!', {
      currentStep,
      userAnswer,
      stepType: steps[currentStep]?.type
    });
    
    const currentStepData = steps[currentStep];
    let isAnswerCorrect = false;
    
    if (currentStepData.type === 'practice') {
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrectAnswer = normalizeAnswer(currentStepData.answer);
      isAnswerCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    } else if (currentStepData.type === 'quiz') {
      isAnswerCorrect = parseInt(userAnswer) === currentStepData.correctAnswer;
    }
    
    setIsCorrect(isAnswerCorrect);
    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
    
    console.log('Результат проверки:', isAnswerCorrect);
  }, [currentStep, userAnswer, steps, normalizeAnswer, saveStepAnswer]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем урок японских свечей...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      {/* Заголовок урока */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="text-6xl mb-4">🕯️</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Урок 2: Японские свечи
          </h1>
        </motion.div>
        
        {/* Прогресс бар */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Прогресс урока</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Шаг {currentStep + 1} из {steps.length}
          </div>
        </div>
      </div>

      {/* Контент урока */}
      <div className="mb-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Заголовок шага */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-3xl mr-3">{currentStepData.icon || '📚'}</span>
              {currentStepData.title}
            </h2>
          </div>

          {/* Содержимое шага */}
          <div className="p-6">

            {/* Введение */}
            {currentStepData.type === 'intro' && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
                <div className="text-lg text-blue-800 space-y-4">
                  {currentStepData.content.split('\n').map((line, index) => (
                    <p key={index} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Теория */}
            {currentStepData.type === 'theory' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
                <div className="text-lg text-green-800 space-y-4">
                  {currentStepData.content.split('\n').map((line, index) => (
                    <p key={index} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                
                {currentStepData.code && (
                  <div className="mt-6 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💻</span>
                      <span className="text-gray-800 font-semibold">Пример:</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-green-400 text-lg font-mono">
                        {currentStepData.code}
                      </pre>
                    </div>
                    {currentStepData.explanation && (
                      <div className="mt-4 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                        <div className="text-blue-800 text-lg space-y-3">
                          {currentStepData.explanation.split('\n').map((line, index) => (
                            <p key={index} className="leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Интерактивный график */}
                {currentStepData.chart && (
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-xl mr-2">📊</span>
                      <span className="text-blue-800 font-semibold text-lg">Интерактивный график</span>
                    </div>
                    <div className="flex justify-center">
                      <CandlestickChart 
                        data={currentStepData.chart} 
                        width={600} 
                        height={300}
                        interactive={true}
                      />
                    </div>
                    <div className="mt-4 text-center text-blue-700 text-sm">
                      💡 Наведите курсор на свечи, чтобы увидеть их данные. Кликните для выделения.
                    </div>
                  </div>
                )}

                {/* Профессиональный график */}
                {currentStepData.type === 'code' && (
                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-xl mr-2">🚀</span>
                      <span className="text-green-800 font-semibold text-lg">Профессиональный график (TradingView)</span>
                    </div>
                    <div className="flex justify-center">
                      <ProfessionalCandlestickChart 
                        data={professionalChartData} 
                        width={800} 
                        height={400}
                        title="Bitcoin/USD - Свечной график"
                      />
                    </div>
                    <div className="mt-4 text-center text-green-700 text-sm">
                      🎯 Профессиональный график с индикаторами SMA 20 и SMA 50. Используйте колесико мыши для масштабирования!
                    </div>
                  </div>
                )}

                {/* Recharts график */}
                {currentStepData.type === 'theory' && currentStepData.chart && (
                  <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-xl mr-2">📈</span>
                      <span className="text-purple-800 font-semibold text-lg">График Recharts</span>
                    </div>
                    <div className="flex justify-center">
                      <RechartsCandlestickChart 
                        data={currentStepData.chart} 
                        width={800} 
                        height={400}
                        title="Типы свечей - Recharts"
                      />
                    </div>
                    <div className="mt-4 text-center text-purple-700 text-sm">
                      🎨 График создан с помощью библиотеки Recharts. Изучите разные типы свечей!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Практическое задание */}
            {currentStepData.type === 'practice' && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Практическое задание
                </h3>
                
                <div className="text-yellow-700 mb-6 text-lg space-y-4">
                  {currentStepData.content.split('\n').map((line, index) => (
                    <p key={index} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

                {currentStepData.code && (
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💻</span>
                      <span className="text-gray-800 font-semibold">Правильный ответ:</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-green-400 text-lg font-mono">
                        {currentStepData.code}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Интерактивный график для практики */}
                {currentStepData.chart && (
                  <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-xl mr-2">📊</span>
                      <span className="text-blue-800 font-semibold text-lg">Изучите график</span>
                    </div>
                    <div className="flex justify-center">
                      <CandlestickChart 
                        data={currentStepData.chart} 
                        width={600} 
                        height={300}
                        interactive={true}
                      />
                    </div>
                    <div className="mt-4 text-center text-blue-700 text-sm">
                      💡 Наведите курсор на свечи, чтобы увидеть их данные. Найдите зеленые и красные свечи!
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-yellow-800 font-semibold mb-2">
                      Ваш ответ:
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Введите ваш ответ..."
                      className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAnswerSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 shadow-lg"
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
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">💡</span>
                        <span className="text-blue-800 font-semibold">Подсказка</span>
                      </div>
                      <div className="text-blue-800 text-lg space-y-3">
                        {currentStepData.hint.split('\n').map((line, index) => (
                          <p key={index} className="leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {isCorrect !== null && (
                    <div className={`p-4 rounded-lg ${isCorrect ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300' : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-300'}`}>
                      <p className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? '🎉 Правильно! Зеленая свеча показывает рост цены. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
                      </p>
                    </div>
                  )}

                  {currentStepData.type === 'practice' && isCorrect === null && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">ℹ️</span>
                        <p className="text-yellow-800 text-lg">
                          Ответьте на вопрос правильно, чтобы перейти к следующему шагу
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Тест */}
            {currentStepData.type === 'quiz' && (
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
                        onChange={(e) => {
                          setUserAnswer(e.target.value);
                        }}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-purple-700 text-lg">{option}</span>
                    </label>
                  ))}
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
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
                    <div className="text-blue-800 text-lg space-y-3">
                      {currentStepData.hint.split('\n').map((line, index) => (
                        <p key={index} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {isCorrect !== null && (
                  <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300' : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-300'}`}>
                    <p className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? '🎉 Правильно! Тело свечи показывает цену открытия и закрытия. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
                    </p>
                  </div>
                )}

                {currentStepData.type === 'quiz' && isCorrect === null && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-blue-800 text-lg">
                        Ответьте на вопрос правильно, чтобы перейти к следующему шагу
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Теория с практикой */}
            {currentStepData.type === 'theory_practice' && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💻</span>
                  Самостоятельная практика
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">🎯</span>
                      <span className="text-blue-800 font-semibold">Ожидаемый результат:</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-green-400 text-lg font-mono">
                        {currentStepData.expectedOutput}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">📝</span>
                      <span className="text-yellow-800 font-semibold">Инструкции:</span>
                    </div>
                    <ol className="text-yellow-700 text-lg space-y-2">
                      <li>1. Откройте TradingView или Binance</li>
                      <li>2. Выберите любую криптовалюту (BTC, ETH)</li>
                      <li>3. Переключитесь на свечной график</li>
                      <li>4. Изучите разные типы свечей</li>
                      <li>5. Найдите доджи, хаммеры, марубозу</li>
                      <li>6. Когда будете готовы, нажмите "Продолжить"</li>
                    </ol>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setIsCorrect(true);
                        saveStepAnswer(currentStep, 'theory_practice_completed', true);
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
                  </div>

                  {showHint && currentStepData.hint && (
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">💡</span>
                        <span className="text-blue-800 font-semibold">Подсказка</span>
                      </div>
                      <div className="text-blue-800 text-lg space-y-3">
                        {currentStepData.hint.split('\n').map((line, index) => (
                          <p key={index} className="leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {isCorrect === null && (
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">ℹ️</span>
                        <p className="text-emerald-800 text-lg">
                          Изучите реальные свечи на графике, затем нажмите "Продолжить"
                        </p>
                      </div>
                    </div>
                  )}

                  {isCorrect === true && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎉</span>
                        <p className="text-green-800 text-lg font-semibold">
                          Отлично! Вы можете перейти к следующему шагу.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            currentStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg'
          }`}
        >
          <span>←</span>
          <span>Назад</span>
        </button>

        <div className="flex space-x-4">
          <Link
            to="/crypto-trading-course"
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <span>📚</span>
            <span>К курсу криптотрейдинга</span>
          </Link>
          
          {lessonCompleted ? (
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg animate-pulse">
              <span>🎉</span>
              <span>Урок завершен! Перенаправление...</span>
            </div>
          ) : isLessonPassed ? (
            <button
              onClick={() => {
                clearLessonProgress();
                setLessonCompleted(false);
                setShowCongratulations(false);
                setIsLessonPassed(false);
                updateCurrentStep(0, steps.length);
                setUserAnswer('');
                setIsCorrect(null);
                setShowHint(false);
                
                try {
                  const completedLessons = JSON.parse(localStorage.getItem('cryptoCompletedLessons') || '[]');
                  const updatedLessons = completedLessons.filter(id => id !== 2);
                  localStorage.setItem('cryptoCompletedLessons', JSON.stringify(updatedLessons));
                  console.log('Урок удален из localStorage для повторного прохождения');
                } catch (error) {
                  console.error('Ошибка удаления урока из localStorage:', error);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>🔄</span>
              <span>Повторить урок</span>
            </button>
          ) : currentStep === steps.length - 1 && isCorrect === true ? (
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
                if (currentStepData.type === 'practice' || currentStepData.type === 'quiz' || currentStepData.type === 'theory_practice') {
                  return isCorrect !== true && !isLessonPassed;
                }
                return false;
              })()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                (() => {
                  const currentStepData = steps[currentStep];
                  if (currentStepData.type === 'practice' || currentStepData.type === 'quiz' || currentStepData.type === 'theory_practice') {
                    return (isCorrect !== true && !isLessonPassed)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg';
                  }
                  return 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg';
                })()
              }`}
            >
              <span>Далее</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CryptoLesson2; 