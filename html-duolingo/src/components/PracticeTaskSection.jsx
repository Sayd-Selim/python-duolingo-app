import React, { useState, useEffect } from "react";
import MotivationalMessage from "./MotivationalMessage";
import AvatarAssistant from "./AvatarAssistant";
import { motion, AnimatePresence } from "framer-motion";
import MentorEditor from "./MentorEditor";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import AnimatedImage from "./AnimatedImage";

const confettiEmojis = ["🎉", "✨", "🎊", "🥳", "💥", "🌟"];

const bonusMessages = [
  "Бонус! +1 попытка бесплатно 🎁",
  "Ты нашёл секретную сову! 🦉",
  "HTML любит твой энтузиазм! 🚀",
  "Супер! Ты получаешь лайк от совы 🦉👍",
  "Вау! Ты активировал режим профи! 👑",
];

// Компонент для отображения 3D-персонажа с анимацией
function AnimatedCharacter({ url, animationName }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions && animationName && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions && animationName && actions[animationName]) {
        actions[animationName].fadeOut(0.5);
      }
    };
  }, [actions, animationName]);

  // Дополнительная проверка на валидность scene
  if (!scene || typeof scene !== "object" || !("type" in scene)) {
    return null;
  }

  return <primitive object={scene} scale={1.5} />;
}

const PracticeTaskSection = ({ setCorrectAnswers, onComplete }) => {
  const [valueTask, setValueTask] = useState("");

  const tasks = [
    {
      id: 1,
      type: "write",
      question: "Напишите HTML-код для заголовка 'Привет, мир!' с нуля.",
      trainingCode: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>`,
      freeCode: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>`,
      answer: `<!DOCTYPE html>
<html>
<head>
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>`,
      hint: "Впишите 'Привет, мир!' внутрь тега <h1>.",
      browserSignals: [
        {
          signal: (code) => !code.includes("<!DOCTYPE html>"),
          message: "😵‍💫 Без DOCTYPE я не знаю, как интерпретировать этот документ! Добавь <!DOCTYPE html> в начало.",
        },
      ],
    },
    {
      id: 2,
      type: "fill",
      question: "Заполните пропуск, чтобы получить абзац с текстом 'Я учу HTML на Duolingo!'",
      trainingCode: "<p>Я учу HTML на Duolingo!</p>",
      freeCode: "<p>___</p>",
      answer: "Я учу HTML на Duolingo!",
      hint: "Впишите текст внутрь тега <p>.",
      browserMessage:
        "📝 Отлично! Теперь давай создадим абзац. Тег <p> нужен для текста. Просто напиши 'Я учу HTML на Duolingo!' между открывающим и закрывающим тегами!",
    },
    {
      id: 3,
      type: "fix",
      question: "Исправьте ошибку: заголовок написан не тем тегом.",
      trainingCode: "<h1>Привет, мир!</h1>",
      freeCode: "<h2>Привет, мир!</h2>",
      answer: "<h1>Привет, мир!</h1>",
      hint: "Заголовок первого уровня — это <h1>.",
      browserMessage: "🔧 Ой! Я вижу ошибку в коде. Ты использовал <h2>, но для главного заголовка нужен <h1>. Исправь это, и я покажу правильный результат!",
    },
  ];

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("practiceStep");
    return saved ? Number(saved) : 0;
  });
  const [input, setInput] = useState(() => {
    const saved = localStorage.getItem("practiceInput");
    if (saved) return saved;
    return tasks[0].template !== undefined ? tasks[0].template : "";
  });
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("practiceCompleted");
    return saved === "true";
  });
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem("practiceAttemptsCurrent");
    return saved ? Number(saved) : 0;
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationType, setMotivationType] = useState("correct");
  const [showBonus, setShowBonus] = useState(false);
  const [bonusMsg, setBonusMsg] = useState("");
  const [bonusKey, setBonusKey] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("practiceStep", step);
  //   localStorage.setItem("practiceInput", input);
  //   localStorage.setItem("practiceCompleted", completed);
  //   localStorage.setItem("practiceAttemptsCurrent", attempts);
  // }, [step, input, completed, attempts]);

  const currentTask = tasks[step];
  const progress2 = Math.round((step / tasks.length) * 100);

  const typeLabels = {
    write: "Напиши с нуля",
    fill: "Заполни пропуски",
    fix: "Исправь ошибку",
  };

  const checkAnswer = () => {
    let isCorrect = false;
    console.log("currentTask", currentTask);

    isCorrect = valueTask.trim() === currentTask.answer.trim();

    if (isCorrect) {
      setFeedback("✅ Верно! Молодец!");
      setShowAnswer(false);
      setShowConfetti(true);
      setShowMotivation(true);
      setMotivationType("correct");
      setShowNextButton(true);
    } else {
      setFeedback("Неправильно. Попробуйте ещё раз!");
      setAttempts((a) => a + 1);
      setShowMotivation(true);
      setMotivationType("incorrect");
      if (attempts + 1 >= 3) {
        setShowAnswer(true);
      }
      setTimeout(() => setShowMotivation(false), 1500);
    }
  };

  const handleBonusClick = () => {
    setShowBonus(false);
    setBonusMsg(bonusMessages[Math.floor(Math.random() * bonusMessages.length)]);
    setTimeout(() => setBonusMsg(""), 2000);
  };

  const handleNext = () => {
    setShowNextButton(false);
    setShowConfetti(false);
    setShowMotivation(false);
    setValueTask("");
    setProgress(0);
    if (step + 1 < tasks.length) {
      setStep(step + 1);
      setInput(tasks[step + 1].template !== undefined ? tasks[step + 1].template : "");
      setShowHint(false);
      setFeedback("");
      setAttempts(0);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <section className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-2xl text-center max-w-2xl mx-auto mt-8 animate-fade-in">
        <div className="flex flex-col items-center mb-4">
          <span className="text-5xl mb-2 animate-bounce">🎉</span>
          <h2 className="text-3xl font-bold mb-2 text-indigo-700 drop-shadow">Урок завершён!</h2>
          <p className="text-gray-700 mb-4 text-lg">Вы выполнили все задания. Отличная работа!</p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg bg-green-600 border-green-700 text-white">
            <div className="text-2xl mt-1">🎉</div>
            <div className="flex-1">
              <div className="font-bold mb-1">Браузер говорит:</div>
              <div className="text-sm leading-relaxed">Молодец! Ты справился с этим заданием!</div>
            </div>
          </div>
        </div>
        <div className="mb-6 bg-white/80 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <span className="text-xl">📊</span>Статистика по попыткам:
          </h3>
          <ul className="text-left mx-auto max-w-md divide-y divide-indigo-100">
            {tasks.map((t, i) => (
              <li key={i} className="py-2 flex items-center gap-2">
                <span className="text-indigo-500">{i + 1}.</span> <span className="flex-1">{t.question}</span>{" "}
                <span className="font-bold text-indigo-700">{attempts || 0}</span> попыток
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            setStep(0);
            setCompleted(false);
            setInput(tasks[0].template !== undefined ? tasks[0].template : "");
            setShowHint(false);
            setFeedback("");
            setAttempts(0);
            localStorage.removeItem("practiceStep");
            localStorage.removeItem("practiceInput");
            localStorage.removeItem("practiceCompleted");
            localStorage.removeItem("practiceAttemptsCurrent");
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <span className="mr-2">🔄</span>Пройти ещё раз
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-2xl  mt-8 animate-fade-in relative overflow-hidden">
        {/* {showConfetti && (
          <motion.div
            key="confetti"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="pointer-events-none absolute inset-0 flex flex-wrap justify-center items-start z-40"
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="text-3xl animate-bounce"
                style={{
                  position: "absolute",
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random()}s`,
                }}
              >
                {confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]}
              </span>
            ))}
          </motion.div>
        )} */}
        {showMotivation && <MotivationalMessage type={motivationType} />}
        {showBonus && (
          <motion.button
            key={bonusKey}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleBonusClick}
            className="fixed top-24 right-10 z-50 px-6 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full font-bold shadow-lg text-lg animate-pulse hover:scale-110 transition-transform"
          >
            🎁 Бонус!
          </motion.button>
        )}
        {bonusMsg && (
          <motion.div
            key={bonusMsg}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-36 right-10 z-50 bg-white rounded-xl shadow-lg px-6 py-4 text-lg text-indigo-700 border border-indigo-100"
          >
            {bonusMsg}
          </motion.div>
        )}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress2}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">
            Задание <span className="font-bold text-indigo-700">{step + 1}</span> из {tasks.length}
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-6 mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl bg-indigo-100 text-indigo-600 rounded-full p-2 shadow">📝</span>
            <h2 className="text-xl font-semibold text-indigo-700">{currentTask.question}</h2>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                currentTask.type === "write"
                  ? "bg-blue-100 text-blue-700"
                  : currentTask.type === "fill"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {typeLabels[currentTask.type]}
            </span>
          </div>
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Практика</h2>
            <MentorEditor
              task={currentTask}
              onComplete={() => {
                setAttempts((prev) => prev + 1);
                setCorrectAnswers((prev) => prev + 1);
                onComplete();
              }}
              valueTask={valueTask}
              setValueTask={setValueTask}
              progress={progress}
              setProgress={setProgress}
              userCode={valueTask}
              currentTask={currentTask}
              step={step}
            />
          </section>

          <div className="mb-2 p-3 bg-indigo-50 border border-indigo-100 rounded shadow-inner">
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <span>👁️</span>Предпросмотр:
            </div>
            <div dangerouslySetInnerHTML={{ __html: input }} />
          </div>
          <div className="flex flex-wrap gap-3 mb-2 justify-center">
            {showNextButton ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform"
              >
                <span>➡️</span>Дальше
              </button>
            ) : (
              <>
                <button
                  onClick={checkAnswer}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                >
                  <span>✅</span>Проверить
                </button>
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                >
                  <span>💡</span>Подсказка
                </button>
              </>
            )}
          </div>
          {showHint && (
            <div className="mb-2 flex items-center gap-2 text-yellow-800 bg-yellow-100 p-3 rounded shadow animate-fade-in">
              <span className="text-xl">💡</span> {currentTask.hint}
            </div>
          )}
          {/* {showAnswer && (
            <div className="mb-2 flex items-start gap-2 text-blue-800 bg-blue-100 p-3 rounded shadow animate-fade-in">
              <span className="text-xl">ℹ️</span>{" "}
              <span>
                Правильный ответ:
                <br />
                <pre className="whitespace-pre-wrap break-words bg-blue-50 rounded p-2 mt-1">{currentTask.answer}</pre>
              </span>
            </div>
          )} */}
          {feedback && (
            <div
              className={`mb-2 flex items-center gap-2 p-3 rounded shadow animate-fade-in ${
                feedback.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {feedback.startsWith("✅") ? "🎉" : "❌"} {feedback}
            </div>
          )}
          <div className="text-xs text-gray-500 text-right">Попыток: {attempts}</div>
        </div>
        {/* <AnimatedImage /> */}
      </section>
      <AvatarAssistant />
    </>
  );
};

export default PracticeTaskSection;
