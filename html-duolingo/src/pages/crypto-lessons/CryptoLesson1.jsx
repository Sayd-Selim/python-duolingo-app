import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

function CryptoLesson1() {
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
  } = useLessonProgress(1);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: '🌟 Добро пожаловать в мир криптотрейдинга! 📈',
      content: '🎯 Криптотрейдинг - это торговля цифровыми валютами на специальных биржах. Это увлекательный мир, где можно заработать на колебаниях цен криптовалют.\n\n💡 Представьте криптовалюты как цифровое золото. Вы покупаете его, когда цена низкая, и продаете, когда цена поднимается, зарабатывая на разнице!\n\n🚀 Готовы научиться читать графики и принимать правильные торговые решения?',
      code: null
    },
    {
      type: 'theory',
      title: '🤔 Что такое криптовалюты?',
      content: '✨ Криптовалюты - это цифровые валюты, основанные на технологии блокчейн:\n\n📝 Децентрализованные - не контролируются банками\n📚 Безопасные - используют криптографию\n👥 Прозрачные - все транзакции видны\n🌍 Глобальные - доступны по всему миру\n\n🎮 Криптовалюты — как интернет-деньги будущего. У вас есть цифровой кошелек, и вы можете отправлять деньги кому угодно в любой точке мира!\n\n💪 Начнем с основ и постепенно перейдем к сложным стратегиям!',
      code: null
    },
    {
      type: 'code',
      title: '🎉 Топ-5 криптовалют',
      content: '🎯 Вот самые популярные криптовалюты по капитализации:\n\n💭 Bitcoin (BTC) - первая и самая известная криптовалюта\nEthereum (ETH) - платформа для смарт-контрактов\nBinance Coin (BNB) - токен крупнейшей биржи\nCardano (ADA) - научный подход к блокчейну\nSolana (SOL) - быстрые и дешевые транзакции\n\n🎪 Это как выбирать акции на фондовом рынке - каждая криптовалюта имеет свои особенности и потенциал!',
      code: 'Bitcoin (BTC) - $45,000\nEthereum (ETH) - $3,200\nBinance Coin (BNB) - $320\nCardano (ADA) - $0.45\nSolana (SOL) - $95',
      explanation: '🔍 Каждая криптовалюта имеет свою рыночную капитализацию и цену.\n\nЦена постоянно меняется в зависимости от спроса и предложения на рынке.\n\n📝 Это как цены на товары в магазине - они могут расти и падать.\n\n🎨 Теперь вы знаете основные игроки крипторынка!'
    },
    {
      type: 'practice',
      title: '🎯 Проверьте свои знания!',
      content: '✍️ Какая криптовалюта была создана первой?\n\n🗣️ Вспомните, какая криптовалюта положила начало всему крипторынку и стала первой цифровой валютой.\n\n🎭 Это как знать, кто изобрел первый автомобиль - важно понимать историю!',
      code: 'Bitcoin был создан в 2009 году Сатоши Накамото',
      task: 'Выберите правильный ответ',
      answer: 'Bitcoin',
      hint: '💡 Первая криптовалюта была создана в 2009 году.\n\n📝 Имя создателя - Сатоши Накамото.\n\n🎯 Эта криптовалюта до сих пор остается самой популярной.'
    },
    {
      type: 'theory',
      title: '💬 Как работает криптобиржа',
      content: '📝 Криптобиржа - это платформа для покупки и продажи криптовалют. Она работает как обычная биржа, но торгует цифровыми активами.\n\n📖 Представьте биржу как большой рынок. Продавцы выставляют свои криптовалюты на продажу, а покупатели предлагают свои цены. Когда цены совпадают, происходит сделка.\n\n🎨 Криптобиржи - это ваши ворота в мир цифровых финансов!',
      code: 'Покупка: USD → BTC\nПродажа: BTC → USD\nТорговля: BTC ↔ ETH',
      explanation: '🔍 Биржа сводит покупателей и продавцов.\n\nКаждая сделка записывается в блокчейн и становится необратимой.\n\n📌 Это как eBay для криптовалют - безопасная площадка для торговли.\n\n💭 Биржи берут небольшую комиссию за каждую сделку.'
    },
    {
      type: 'quiz',
      title: '🧠 Тест: Основы криптотрейдинга',
      content: 'Проверьте свои знания о криптовалютах и торговле',
      question: 'Что такое криптовалюта?',
      options: [
        'Физические деньги в цифровом виде',
        'Цифровая валюта на основе блокчейн',
        'Обычные деньги в интернете',
        'Электронные платежные карты'
      ],
      correctAnswer: 1,
      hint: '💡 Криптовалюты используют технологию блокчейн для безопасности.\n\n📝 Они не имеют физической формы и существуют только в цифровом виде.\n\n🎯 Блокчейн обеспечивает децентрализацию и прозрачность.'
    },
    {
      type: 'theory_practice',
      title: '💻 Практическое задание: Создание кошелька',
      content: 'Создайте свой первый криптокошелек для безопасного хранения криптовалют',
      expectedOutput: 'Кошелек создан успешно!\nАдрес: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\nБаланс: 0 BTC\nГотов к использованию!',
      hint: '💡 Используйте надежные кошельки: MetaMask, Trust Wallet, или аппаратные кошельки.\n\n📝 Никогда не делитесь своими приватными ключами.\n\n🎯 Начните с небольших сумм для практики.'
    }
  ], []);

  // Функция переключения подсказки
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  // Функция завершения урока
  const handleLessonCompletion = useCallback(async () => {
    try {
      console.log('Завершение урока криптотрейдинга...');
      
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        saveLessonProgress(1);
        console.log('Урок криптотрейдинга успешно завершен!');
        
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
    
    const lessonPassed = checkLessonProgress(1);
    setIsLessonPassed(lessonPassed);
    
    console.log('Инициализация урока криптотрейдинга:', { lessonPassed, currentStep, lessonProgress });
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
            <p className="text-gray-600">Загружаем урок криптотрейдинга...</p>
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
          <div className="text-6xl mb-4">📈</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Урок 1: Основы криптотрейдинга
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
                        {isCorrect ? '🎉 Правильно! Bitcoin был первой криптовалютой. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
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
                      {isCorrect ? '🎉 Правильно! Криптовалюты - это цифровые валюты на основе блокчейн. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
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
                      <li>1. Скачайте и установите кошелек MetaMask</li>
                      <li>2. Создайте новый кошелек</li>
                      <li>3. Сохраните seed-фразу в безопасном месте</li>
                      <li>4. Проверьте, что кошелек работает</li>
                      <li>5. Убедитесь, что адрес кошелька отображается</li>
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
                          Выполните задание по созданию кошелька, затем нажмите "Продолжить"
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
                  const updatedLessons = completedLessons.filter(id => id !== 1);
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

export default CryptoLesson1; 