import React, { useState, useEffect, useCallback, useMemo } from "react";
import BrowserHelper from "./BrowserHelper";

function MentorEditor({ task, onComplete, setValueTask, valueTask, progress, setProgress, currentTask, step }) {
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedCode, setCompletedCode] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [preview, setPreview] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTrainingMode, setIsTrainingMode] = useState(true);
  const [audioContext, setAudioContext] = useState(null);

  const fullCode = task.trainingCode || task.answer;
  const template = task.freeCode || task.template;

  // Мемоизируем вычисления прогресса
  const progress_procent = useMemo(() => {
    return Math.round((progress / fullCode.length) * 100);
  }, [progress, fullCode.length]);

  // Мемоизируем цвет прогресса
  const progressColor = useMemo(() => {
    if (progress_procent <= 20) return "text-red-500";
    if (progress_procent <= 60) return "text-yellow-500";
    return "text-green-500";
  }, [progress_procent]);

  // Инициализация аудио контекста один раз
  useEffect(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
      return () => {
        if (ctx.state !== 'closed') {
          ctx.close();
        }
      };
    } catch (error) {
      console.log("Аудио не поддерживается:", error);
    }
  }, []);

  // Мемоизируем рендер кода
  const renderCode = useCallback(() => {
    if (isTrainingMode) {
      return fullCode.split("").map((char, i) => {
        const userChar = valueTask[i];
        if (userChar === undefined)
          return (
            <span key={i} className="text-gray-400">
              {char}
            </span>
          );
        if (userChar === char)
          return (
            <span key={i} className="text-green-400 transition-colors duration-200">
              {char}
            </span>
          );
        return (
          <span key={i} className="text-red-500 transition-colors duration-200">
            {char}
          </span>
        );
      });
    } else {
      switch (task.type) {
        case "write":
          return <span className="text-white">{valueTask}</span>;
        case "fill":
          const filledTemplate = template.replace("___", valueTask);
          return <span className="text-white">{filledTemplate}</span>;
        case "fix":
          return <span className="text-white">{valueTask}</span>;
        default:
          return <span className="text-white">{valueTask}</span>;
      }
    }
  }, [isTrainingMode, fullCode, valueTask, task.type, template]);

  // Оптимизированная функция воспроизведения звука
  const playSound = useCallback((isCorrect) => {
    if (!audioContext) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (isCorrect) {
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else {
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    } catch (error) {
      console.log("Звук не может быть воспроизведен:", error);
    }
  }, [audioContext]);

  // Дебаунсинг для показа подсказки
  const [hintTimer, setHintTimer] = useState(null);

  // Оптимизированный обработчик изменений
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setValueTask(value);

    // Если режим свободного кода, не проверяем символы
    if (!isTrainingMode) {
      return;
    }

    // Очищаем предыдущий таймер
    if (hintTimer) {
      clearTimeout(hintTimer);
    }

    let correctChars = 0;
    let shouldPlayCorrect = false;
    let shouldPlayIncorrect = false;

    for (let i = 0; i < value.length; i++) {
      if (value[i] === fullCode[i]) {
        correctChars++;
        if (i === value.length - 1) {
          shouldPlayCorrect = true;
        }
      } else {
        shouldPlayIncorrect = true;
        break;
      }
    }

    // Обновляем состояния только если нужно
    if (shouldPlayCorrect) {
      playSound(true);
      setCorrectCount(prev => prev + 1);
    } else if (shouldPlayIncorrect) {
      playSound(false);
      setIncorrectCount(prev => prev + 1);
    }

    // Обновляем прогресс только если изменился
    const newProgress = value.length < progress ? value.length : correctChars;
    if (newProgress !== progress) {
      setProgress(newProgress);
    }

    // Скрываем подсказку
    setShowHint(false);

    // Устанавливаем таймер для показа подсказки
    const timer = setTimeout(() => {
      if (value.length < fullCode.length) {
        setShowHint(true);
      }
    }, 3000);

    setHintTimer(timer);
  }, [isTrainingMode, fullCode, progress, setProgress, playSound, hintTimer]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (hintTimer) {
        clearTimeout(hintTimer);
      }
    };
  }, [hintTimer]);

  // Переключение режимов
  const toggleMode = useCallback(() => {
    setIsTrainingMode(prev => {
      const newMode = !prev;
      if (newMode) {
        // Переключаемся в режим тренировки
        setValueTask("");
        setProgress(0);
        setCorrectCount(0);
        setIncorrectCount(0);
      } else {
        // Переключаемся в режим свободного кода
        const freeCodeToUse = task.freeCode || task.answer;
        setValueTask(freeCodeToUse);
        setProgress(freeCodeToUse.length);
      }
      return newMode;
    });
  }, [task.freeCode, task.answer, setValueTask, setProgress]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isCorrect && <span className="text-green-400 animate-bounce">✅ Верно!</span>}
          <div className="flex items-center gap-2">
            <span className="text-gray-300 font-medium">Прогресс:</span>
            <span className={`font-bold text-lg ${progressColor}`}>{progress_procent}%</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-400">✓ {correctCount}</span>
          <span className="text-red-400">✗ {incorrectCount}</span>
        </div>
      </div>

      {/* Переключатель режимов */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-700">Режим:</span>
          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isTrainingMode
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🎯 Тренировка
          </button>
          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              !isTrainingMode
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            💻 Свободный код
          </button>
        </div>
      </div>

      <div className="flex h-[500px]">
        {/* Code area */}
        <div className="w-1/2 border-r border-gray-200 relative">
          {/* Display mentor code with color-coding */}
          <div className="p-4 font-mono text-base whitespace-pre-wrap h-[460px] bg-gray-900 text-white relative z-0 overflow-auto">
            {renderCode()}
          </div>

          {/* Улучшенный input - теперь не прозрачный, а поверх кода */}
          <textarea
            value={valueTask}
            onChange={handleChange}
            onFocus={() => setShowWelcome(true)}
            className="absolute top-0 left-0 w-full h-[460px] bg-gray-900 text-white p-4 font-mono text-base resize-none focus:outline-none z-10 caret-white"
            spellCheck="false"
            style={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              color: 'transparent',
              caretColor: 'white'
            }}
          />
        </div>

        {/* Preview */}
        <div className="w-1/2">
          <div className="bg-gray-100 text-gray-700 px-4 py-2 text-sm border-b border-gray-200">Результат</div>
          <div className="w-full h-[460px] border-0 bg-white p-4">
            <iframe
              title="preview"
              srcDoc={valueTask}
              style={{ width: "100%", height: "100%", border: "none" }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-t border-gray-200"> 
        <BrowserHelper userCode={valueTask} currentTask={currentTask} welcome={showWelcome} step={step} />
      </div>
    </div>
  );
}

export default MentorEditor;
