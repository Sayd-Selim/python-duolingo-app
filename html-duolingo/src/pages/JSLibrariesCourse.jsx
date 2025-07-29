import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

const JSLibrariesCourse = () => {
  const { user } = useAuth();
  const { updateProgress } = useProgress();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  // Определяем библиотеки для изучения
  const libraries = [
    // {
    //   id: 'react',
    //   name: 'React с нуля',
    //   icon: '⚛️',
    //   description: 'Создайте свою React-подобную библиотеку',
    //   color: 'from-blue-500 to-cyan-600',
    //   lessons: [
    //     { id: 1, title: 'Virtual DOM', description: 'Создание Virtual DOM системы' },
    //     { id: 2, title: 'JSX парсер', description: 'Парсинг JSX в JavaScript' },
    //     { id: 3, title: 'Компоненты', description: 'Система компонентов' },
    //     { id: 4, title: 'Хуки', description: 'Создание useState и useEffect' },
    //     { id: 5, title: 'Контекст', description: 'React Context API' },
    //     { id: 6, title: 'Роутинг', description: 'Простой роутер' },
    //     { id: 7, title: 'Оптимизация', description: 'React.memo и useMemo' },
    //     { id: 8, title: 'Тестирование', description: 'Тесты для компонентов' },
    //     { id: 9, title: 'DevTools', description: 'Инструменты разработчика' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценное приложение' }
    //   ]
    // },
    // {
    //   id: 'vue',
    //   name: 'Vue.js с нуля',
    //   icon: '🟢',
    //   description: 'Создайте свою Vue-подобную библиотеку',
    //   color: 'from-green-500 to-emerald-600',
    //   lessons: [
    //     { id: 1, title: 'Реактивность', description: 'Система реактивности' },
    //     { id: 2, title: 'Computed', description: 'Вычисляемые свойства' },
    //     { id: 3, title: 'Watchers', description: 'Наблюдатели' },
    //     { id: 4, title: 'Компоненты', description: 'Vue компоненты' },
    //     { id: 5, title: 'Директивы', description: 'v-if, v-for, v-model' },
    //     { id: 6, title: 'События', description: 'Обработка событий' },
    //     { id: 7, title: 'Жизненный цикл', description: 'Lifecycle hooks' },
    //     { id: 8, title: 'Роутинг', description: 'Vue Router' },
    //     { id: 9, title: 'Состояние', description: 'Vuex store' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценное приложение' }
    //   ]
    // },
    {
      id: 'websocket',
      name: 'WebSocket с нуля',
      icon: '🔌',
      description: 'Создайте свою WebSocket библиотеку',
      color: 'from-teal-500 to-cyan-600',
      lessons: [
        { id: 1, title: 'WebSocket протокол', description: 'Основы WebSocket протокола' },
        { id: 2, title: 'Сервер WebSocket', description: 'Создание WebSocket сервера' },
        { id: 3, title: 'Клиент WebSocket', description: 'WebSocket клиент' },
        { id: 4, title: 'События и обработчики', description: 'onopen, onmessage, onclose' },
        { id: 5, title: 'Переподключение', description: 'Автоматическое переподключение' },
        { id: 6, title: 'Heartbeat', description: 'Пинг-понг механизм' },
        { id: 7, title: 'Комнаты и каналы', description: 'Группировка соединений' },
        { id: 8, title: 'Бинарные данные', description: 'Работа с бинарными данными' },
        { id: 9, title: 'Безопасность', description: 'Аутентификация и авторизация' },
        { id: 10, title: 'Финальный проект', description: 'Чат приложение' }
      ]
    },
    // {
    //   id: 'react-router',
    //   name: 'React Router с нуля',
    //   icon: '⚛️',
    //   description: 'Создайте свою библиотеку клиентского роутинга',
    //   color: 'from-blue-500 to-indigo-600',
    //   lessons: [
    //     { id: 1, title: 'История роутинга', description: 'От серверного к клиентскому роутингу' },
    //     { id: 2, title: 'Browser Router', description: 'Работа с History API' },
    //     { id: 3, title: 'Route компоненты', description: 'Создание маршрутов' },
    //     { id: 4, title: 'Link и NavLink', description: 'Навигация между страницами' },
    //     { id: 5, title: 'Параметры URL', description: 'useParams, useSearchParams' },
    //     { id: 6, title: 'Вложенные роуты', description: 'Nested Routes' },
    //     { id: 7, title: 'Защищенные роуты', description: 'Private Routes и Guards' },
    //     { id: 8, title: 'Ленивая загрузка', description: 'Code Splitting и Lazy Loading' },
    //     { id: 9, title: 'Middleware роутера', description: 'Guards и Interceptors' },
    //     { id: 10, title: 'Финальный проект', description: 'SPA с роутингом' }
    //   ]
    // },
    // {
    //   id: 'axios',
    //   name: 'Axios с нуля',
    //   icon: '📡',
    //   description: 'Создайте свою HTTP клиент библиотеку',
    //   color: 'from-green-500 to-emerald-600',
    //   lessons: [
    //     { id: 1, title: 'HTTP протокол', description: 'Основы HTTP/HTTPS протокола' },
    //     { id: 2, title: 'XMLHttpRequest', description: 'Нативный HTTP клиент' },
    //     { id: 3, title: 'Fetch API', description: 'Современный браузерный API' },
    //     { id: 4, title: 'Axios Core', description: 'Создание базового HTTP клиента' },
    //     { id: 5, title: 'Interceptors', description: 'Request/Response перехватчики' },
    //     { id: 6, title: 'Transformers', description: 'Трансформация данных' },
    //     { id: 7, title: 'Error Handling', description: 'Обработка ошибок' },
    //     { id: 8, title: 'Cancel Tokens', description: 'Отмена запросов' },
    //     { id: 9, title: 'Upload/Download', description: 'Работа с файлами' },
    //     { id: 10, title: 'Финальный проект', description: 'REST API клиент' }
    //   ]
    // },
    // {
    //   id: 'mongodb-mongoose',
    //   name: 'MongoDB & Mongoose с нуля',
    //   icon: '🍃',
    //   description: 'Создайте свою ODM библиотеку для MongoDB',
    //   color: 'from-green-600 to-teal-700',
    //   lessons: [
    //     { id: 1, title: 'NoSQL базы данных', description: 'Основы NoSQL и MongoDB' },
    //     { id: 2, title: 'MongoDB драйвер', description: 'Нативный MongoDB драйвер' },
    //     { id: 3, title: 'Схемы и модели', description: 'Создание схем данных' },
    //     { id: 4, title: 'CRUD операции', description: 'Create, Read, Update, Delete' },
    //     { id: 5, title: 'Валидация данных', description: 'Схемы валидации' },
    //     { id: 6, title: 'Middleware', description: 'Pre/post хуки' },
    //     { id: 7, title: 'Агрегация', description: 'MongoDB агрегация' },
    //     { id: 8, title: 'Индексы', description: 'Оптимизация запросов' },
    //     { id: 9, title: 'Транзакции', description: 'ACID транзакции' },
    //     { id: 10, title: 'Финальный проект', description: 'REST API с MongoDB' }
    //   ]
    // },
    // {
    //   id: 'promise',
    //   name: 'Promise с нуля',
    //   icon: '⚡',
    //   description: 'Создайте свою Promise библиотеку',
    //   color: 'from-yellow-500 to-orange-600',
    //   lessons: [
    //     { id: 1, title: 'Асинхронность в JavaScript', description: 'Event Loop и асинхронность' },
    //     { id: 2, title: 'Callback Hell', description: 'Проблемы колбэков' },
    //     { id: 3, title: 'Promise/A+ спецификация', description: 'Стандарт Promise' },
    //     { id: 4, title: 'Promise конструктор', description: 'Создание Promise' },
    //     { id: 5, title: 'then/catch/finally', description: 'Методы Promise' },
    //     { id: 6, title: 'Promise.all/race/allSettled', description: 'Статические методы' },
    //     { id: 7, title: 'Микротаски и макротаски', description: 'Event Loop детально' },
    //     { id: 8, title: 'async/await', description: 'Синтаксический сахар' },
    //     { id: 9, title: 'Error handling', description: 'Обработка ошибок' },
    //     { id: 10, title: 'Финальный проект', description: 'Асинхронная библиотека' }
    //   ]
    // },
    // {
    //   id: 'styled-components',
    //   name: 'Styled-components с нуля',
    //   icon: '🎨',
    //   description: 'Создайте свою CSS-in-JS библиотеку',
    //   color: 'from-pink-500 to-purple-600',
    //   lessons: [
    //     { id: 1, title: 'CSS-in-JS концепция', description: 'Что это и зачем нужно' },
    //     { id: 2, title: 'Тегированные шаблоны', description: 'Как работают styled.div' },
    //     { id: 3, title: 'CSS парсер', description: 'Парсинг CSS в JavaScript' },
    //     { id: 4, title: 'Динамические стили', description: 'Props и условные стили' },
    //     { id: 5, title: 'Темизация', description: 'ThemeProvider и контекст' },
    //     { id: 6, title: 'CSS-in-JS движок', description: 'Инъекция стилей в DOM' },
    //     { id: 7, title: 'Псевдоклассы и медиа-запросы', description: ':hover, @media' },
    //     { id: 8, title: 'Анимации и переходы', description: 'keyframes и transitions' },
    //     { id: 9, title: 'SSR поддержка', description: 'Серверный рендеринг' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная CSS-in-JS библиотека' }
    //   ]
    // },
    // {
    //   id: 'webpack',
    //   name: 'Webpack с нуля',
    //   icon: '⚙️',
    //   description: 'Создайте свой бандлер и сборщик',
    //   color: 'from-blue-600 to-indigo-700',
    //   lessons: [
    //     { id: 1, title: 'Основы бандлинга', description: 'Что такое бандлер и зачем он нужен' },
    //     { id: 2, title: 'Парсинг зависимостей', description: 'AST и граф зависимостей' },
    //     { id: 3, title: 'Loaders система', description: 'Обработка файлов через loaders' },
    //     { id: 4, title: 'Plugin система', description: 'Расширение функциональности' },
    //     { id: 5, title: 'Code splitting', description: 'Разделение кода на чанки' },
    //     { id: 6, title: 'Tree shaking', description: 'Удаление неиспользуемого кода' },
    //     { id: 7, title: 'Source maps', description: 'Отладка и source maps' },
    //     { id: 8, title: 'Hot Module Replacement', description: 'Горячая перезагрузка' },
    //     { id: 9, title: 'Оптимизация', description: 'Минификация и сжатие' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценный бандлер' }
    //   ]
    // },
    // {
    //   id: 'jest',
    //   name: 'Jest с нуля',
    //   icon: '🧪',
    //   description: 'Создайте свой тестовый фреймворк',
    //   color: 'from-green-600 to-emerald-700',
    //   lessons: [
    //     { id: 1, title: 'Test Runner', description: 'Запуск тестов и управление ими' },
    //     { id: 2, title: 'Assertions', description: 'Функции проверки и сравнения' },
    //     { id: 3, title: 'Mocks и Stubs', description: 'Создание моков и заглушек' },
    //     { id: 4, title: 'Test Suites', description: 'Группировка тестов в наборы' },
    //     { id: 5, title: 'Setup и Teardown', description: 'beforeEach/afterEach хуки' },
    //     { id: 6, title: 'Async тесты', description: 'Тестирование асинхронного кода' },
    //     { id: 7, title: 'Snapshot тестирование', description: 'Сравнение снимков' },
    //     { id: 8, title: 'Coverage', description: 'Покрытие кода тестами' },
    //     { id: 9, title: 'CLI интерфейс', description: 'Командная строка и отчеты' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценный тестовый фреймворк' }
    //   ]
    // },
    // {
    //   id: 'framer-motion',
    //   name: 'Framer Motion с нуля',
    //   icon: '🎭',
    //   description: 'Создайте свою анимационную библиотеку',
    //   color: 'from-purple-500 to-pink-600',
    //   lessons: [
    //     { id: 1, title: 'Основы анимаций', description: 'CSS transitions и transforms' },
    //     { id: 2, title: 'React анимации', description: 'useState и useEffect для анимаций' },
    //     { id: 3, title: 'Spring анимации', description: 'Физические анимации с пружинами' },
    //     { id: 4, title: 'Motion компоненты', description: 'Создание анимированных компонентов' },
    //     { id: 5, title: 'Variants', description: 'Варианты анимаций' },
    //     { id: 6, title: 'Gestures', description: 'Обработка жестов (drag, hover, tap)' },
    //     { id: 7, title: 'Layout анимации', description: 'Автоматические анимации layout' },
    //     { id: 8, title: 'Exit анимации', description: 'Анимации при удалении компонентов' },
    //     { id: 9, title: 'Orchestration', description: 'Управление последовательностью анимаций' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная анимационная библиотека' }
    //   ]
    // },
    // {
    //   id: 'service-workers',
    //   name: 'Service Workers с нуля',
    //   icon: '📱',
    //   description: 'Создайте свой PWA фреймворк',
    //   color: 'from-orange-500 to-red-600',
    //   lessons: [
    //     { id: 1, title: 'Основы Service Workers', description: 'Что это и как работают' },
    //     { id: 2, title: 'Регистрация и установка', description: 'Lifecycle Service Worker' },
    //     { id: 3, title: 'Кэширование', description: 'Cache API и стратегии кэширования' },
    //     { id: 4, title: 'Перехват запросов', description: 'Fetch события и обработка' },
    //     { id: 5, title: 'Фоновая синхронизация', description: 'Background sync' },
    //     { id: 6, title: 'Push уведомления', description: 'Отправка и получение уведомлений' },
    //     { id: 7, title: 'Офлайн функциональность', description: 'Работа без интернета' },
    //     { id: 8, title: 'Стратегии кэширования', description: 'Cache First, Network First' },
    //     { id: 9, title: 'Обновление кэша', description: 'Версионирование и очистка' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценное PWA приложение' }
    //   ]
    // },
    // {
    //   id: 'eslint',
    //   name: 'ESLint с нуля',
    //   icon: '🔍',
    //   description: 'Создайте свой линтер для JavaScript',
    //   color: 'from-blue-600 to-indigo-700',
    //   lessons: [
    //     { id: 1, title: 'Основы линтинга', description: 'Что такое линтер и зачем нужен' },
    //     { id: 2, title: 'AST парсинг', description: 'Парсинг кода в Abstract Syntax Tree' },
    //     { id: 3, title: 'Создание правил', description: 'Как писать правила для проверки' },
    //     { id: 4, title: 'Плагины', description: 'Расширение функциональности' },
    //     { id: 5, title: 'Конфигурация', description: 'Настройка правил и опций' },
    //     { id: 6, title: 'Отчеты', description: 'Генерация отчетов об ошибках' },
    //     { id: 7, title: 'Автоисправление', description: 'Автоматическое исправление ошибок' },
    //     { id: 8, title: 'Целевые файлы', description: 'Фильтрация файлов для проверки' },
    //     { id: 9, title: 'CLI интерфейс', description: 'Командная строка и опции' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценный линтер' }
    //   ]
    // },
    // {
    //   id: 'react-hook-form',
    //   name: 'React Hook Form с нуля',
    //   icon: '📝',
    //   description: 'Создайте свою библиотеку управления формами',
    //   color: 'from-green-500 to-emerald-600',
    //   lessons: [
    //     { id: 1, title: 'Основы форм в React', description: 'useState, useEffect для форм' },
    //     { id: 2, title: 'Создание useForm хука', description: 'Основной хук для управления формой' },
    //     { id: 3, title: 'Валидация', description: 'Создание системы валидации' },
    //     { id: 4, title: 'Регистрация полей', description: 'register функция для полей' },
    //     { id: 5, title: 'Обработка ошибок', description: 'Отображение ошибок валидации' },
    //     { id: 6, title: 'Оптимизация', description: 'Минимизация ре-рендеров' },
    //     { id: 7, title: 'Контролируемые компоненты', description: 'Создание кастомных полей' },
    //     { id: 8, title: 'Массивы полей', description: 'Динамические поля (add/remove)' },
    //     { id: 9, title: 'Формы с зависимостями', description: 'Условная валидация' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная форма библиотека' }
    //   ]
    // },
    // {
    //   id: 'react-query',
    //   name: 'React Query с нуля',
    //   icon: '🔄',
    //   description: 'Создайте свою библиотеку управления серверным состоянием',
    //   color: 'from-purple-500 to-violet-600',
    //   lessons: [
    //     { id: 1, title: 'Основы серверного состояния', description: 'Отличие от клиентского состояния' },
    //     { id: 2, title: 'Создание useQuery хука', description: 'Основной хук для получения данных' },
    //     { id: 3, title: 'Кэширование', description: 'Система кэширования данных' },
    //     { id: 4, title: 'useMutation хук', description: 'Изменение данных на сервере' },
    //     { id: 5, title: 'Рефетчинг', description: 'Автоматическое обновление данных' },
    //     { id: 6, title: 'Оптимистичные обновления', description: 'Мгновенные UI обновления' },
    //     { id: 7, title: 'Инвалидация кэша', description: 'Управление актуальностью данных' },
    //     { id: 8, title: 'Query Client', description: 'Центральное управление запросами' },
    //     { id: 9, title: 'Infinite Queries', description: 'Пагинация и бесконечная прокрутка' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная библиотека React Query' }
    //   ]
    // },
    // {
    //   id: 'jwt',
    //   name: 'JWT с нуля',
    //   icon: '🔐',
    //   description: 'Создайте свою систему аутентификации',
    //   color: 'from-red-500 to-pink-600',
    //   lessons: [
    //     { id: 1, title: 'Основы JWT', description: 'Что такое JSON Web Token и зачем нужен' },
    //     { id: 2, title: 'Структура токена', description: 'Header, Payload, Signature' },
    //     { id: 3, title: 'Создание токенов', description: 'Генерация JWT с секретным ключом' },
    //     { id: 4, title: 'Валидация токенов', description: 'Проверка подписи и срока действия' },
    //     { id: 5, title: 'Refresh токены', description: 'Обновление токенов доступа' },
    //     { id: 6, title: 'Безопасность', description: 'Защита от атак и уязвимостей' },
    //     { id: 7, title: 'Middleware', description: 'Интеграция с Express.js' },
    //     { id: 8, title: 'Клиентская часть', description: 'Хранение и использование токенов' },
    //     { id: 9, title: 'Роли и права', description: 'Role-based access control (RBAC)' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная система аутентификации' }
    //   ]
    // },
    // {
    //   id: 'tailwind-css',
    //   name: 'Tailwind CSS с нуля',
    //   icon: '🎨',
    //   description: 'Создайте свою утилитарную CSS библиотеку',
    //   color: 'from-cyan-500 to-blue-600',
    //   lessons: [
    //     { id: 1, title: 'Основы утилитарного CSS', description: 'Что это и зачем нужен' },
    //     { id: 2, title: 'Генерация классов', description: 'Создание утилитарных классов' },
    //     { id: 3, title: 'Spacing система', description: 'Отступы, поля, размеры' },
    //     { id: 4, title: 'Цветовая система', description: 'Палитра цветов и градиенты' },
    //     { id: 5, title: 'Typography', description: 'Шрифты, размеры, веса' },
    //     { id: 6, title: 'Responsive дизайн', description: 'Медиа-запросы и брейкпоинты' },
    //     { id: 7, title: 'Pseudo-классы', description: 'Hover, focus, active состояния' },
    //     { id: 8, title: 'Кастомизация', description: 'Конфигурация и темизация' },
    //     { id: 9, title: 'Оптимизация', description: 'Purge CSS и tree shaking' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная CSS библиотека' }
    //   ]
    // },
    // {
    //   id: 'tooltip-popup',
    //   name: 'Tooltip/Popup с нуля',
    //   icon: '💬',
    //   description: 'Создайте свою UI библиотеку всплывающих элементов',
    //   color: 'from-orange-500 to-red-600',
    //   lessons: [
    //     { id: 1, title: 'Основы всплывающих элементов', description: 'Что такое tooltip и popup' },
    //     { id: 2, title: 'Позиционирование', description: 'Автоматическое размещение элементов' },
    //     { id: 3, title: 'Триггеры', description: 'Hover, click, focus события' },
    //     { id: 4, title: 'Анимации', description: 'Fade, slide, scale эффекты' },
    //     { id: 5, title: 'Responsive поведение', description: 'Адаптивность на мобильных' },
    //     { id: 6, title: 'Управление состоянием', description: 'Показ/скрытие элементов' },
    //     { id: 7, title: 'Кастомизация', description: 'Темы и стили' },
    //     { id: 8, title: 'Доступность', description: 'ARIA атрибуты и клавиатура' },
    //     { id: 9, title: 'Производительность', description: 'Оптимизация рендеринга' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная UI библиотека' }
    //   ]
    // },
    // {
    //   id: 'zustand',
    //   name: 'Zustand с нуля',
    //   icon: '🗃️',
    //   description: 'Создайте свою библиотеку управления состоянием',
    //   color: 'from-green-500 to-emerald-600',
    //   lessons: [
    //     { id: 1, title: 'Основы управления состоянием', description: 'Что такое state management' },
    //     { id: 2, title: 'Создание store', description: 'Основной store и его структура' },
    //     { id: 3, title: 'useStore хук', description: 'React интеграция и подписка на изменения' },
    //     { id: 4, title: 'Actions и reducers', description: 'Изменение состояния' },
    //     { id: 5, title: 'Middleware система', description: 'Расширение функциональности' },
    //     { id: 6, title: 'Подписки', description: 'Автоматическое обновление компонентов' },
    //     { id: 7, title: 'Оптимизация', description: 'Мемоизация и селекторы' },
    //     { id: 8, title: 'Persist middleware', description: 'Сохранение состояния' },
    //     { id: 9, title: 'DevTools', description: 'Интеграция с Redux DevTools' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная библиотека управления состоянием' }
    //   ]
    // },
    // {
    //   id: 'mobx',
    //   name: 'MobX с нуля',
    //   icon: '🔄',
    //   description: 'Создайте свою реактивную библиотеку управления состоянием',
    //   color: 'from-blue-500 to-indigo-600',
    //   lessons: [
    //     { id: 1, title: 'Основы реактивности', description: 'Что такое реактивное программирование' },
    //     { id: 2, title: 'Observable состояния', description: 'Создание наблюдаемых объектов' },
    //     { id: 3, title: 'Computed значения', description: 'Вычисляемые свойства' },
    //     { id: 4, title: 'Actions', description: 'Изменение состояния' },
    //     { id: 5, title: 'React интеграция', description: 'useObserver и observer HOC' },
    //     { id: 6, title: 'Store паттерн', description: 'Организация состояния' },
    //     { id: 7, title: 'Reactions', description: 'Автоматические реакции' },
    //     { id: 8, title: 'Конфигурация', description: 'Настройка MobX' },
    //     { id: 9, title: 'DevTools', description: 'Отладка и мониторинг' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная реактивная библиотека' }
    //   ]
    // },
    // {
    //   id: 'lodash',
    //   name: 'Lodash с нуля',
    //   icon: '🛠️',
    //   description: 'Создайте свою утилитарную библиотеку',
    //   color: 'from-gray-500 to-slate-600',
    //   lessons: [
    //     { id: 1, title: 'Основы утилитарных функций', description: 'Что такое Lodash и зачем нужен' },
    //     { id: 2, title: 'Array функции', description: 'map, filter, reduce, find, includes' },
    //     { id: 3, title: 'Object функции', description: 'get, set, merge, clone, keys' },
    //     { id: 4, title: 'Collection функции', description: 'each, map, filter, reduce' },
    //     { id: 5, title: 'Function функции', description: 'debounce, throttle, memoize' },
    //     { id: 6, title: 'String функции', description: 'camelCase, snake_case, kebab-case' },
    //     { id: 7, title: 'Number функции', description: 'random, clamp, inRange' },
    //     { id: 8, title: 'Date функции', description: 'now, format, parse' },
    //     { id: 9, title: 'Math функции', description: 'sum, mean, max, min' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценная утилитарная библиотека' }
    //   ]
    // },

    // {
    //   id: 'Redux-toolkit',
    //   name: 'Redux-toolkit с нуля',
    //   icon: '📦',
    //   description: 'Создайте свой Redux-toolkit библиотеку',
    //   color: 'from-purple-500 to-indigo-600',
    //   lessons: [
    //     { id: 1, title: 'Store', description: 'Создание store' },
    //     { id: 2, title: 'Actions', description: 'Action creators' },
    //     { id: 3, title: 'Reducers', description: 'Pure functions' },
    //     { id: 4, title: 'Dispatch', description: 'Отправка actions' },
    //     { id: 5, title: 'Middleware', description: 'Redux middleware' },
    //     { id: 6, title: 'Thunk', description: 'Redux Thunk' },
    //     { id: 7, title: 'DevTools', description: 'Redux DevTools' },
    //     { id: 8, title: 'Селекторы', description: 'Reselect' },
    //     { id: 9, title: 'Комбинирование', description: 'combineReducers' },
    //     { id: 10, title: 'Финальный проект', description: 'Полноценное приложение' }
    //   ]
    // },
    {
      id: 'express',
      name: 'Express.js с нуля',
      icon: '🚀',
      description: 'Создайте свой Express.js библиотеку',
      color: 'from-orange-500 to-red-600',
      lessons: [
        { id: 1, title: 'HTTP сервер', description: 'Базовый HTTP сервер' },
        { id: 2, title: 'Передача данных', description: 'Params, Query, Body' },
        { id: 3, title: 'Middleware', description: 'Express middleware' },
        { id: 4, title: 'Статические файлы', description: 'serve-static' },
        { id: 5, title: 'Body parser', description: 'Парсинг тела запроса' },
        { id: 6, title: 'Обработка ошибок', description: 'Error handling' },
        { id: 7, title: 'Валидация', description: 'Валидация данных' },
        { id: 8, title: 'Аутентификация', description: 'JWT auth' },
        { id: 9, title: 'База данных', description: 'Подключение к БД' },
        { id: 10, title: 'Финальный проект', description: 'REST API' }
      ]
    }
  ];

  useEffect(() => {
    // В демо режиме загружаем прогресс из localStorage
    if (!user) {
      const savedProgress = localStorage.getItem('jsLibrariesProgress');
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      }
    }
  }, [user]);

  const handleLessonComplete = (lessonId) => {
    if (!user) {
      // Демо режим - сохраняем в localStorage
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem('jsLibrariesProgress', JSON.stringify(newCompleted));
    } else {
      // Реальный режим - сохраняем через API
      updateProgress('jsLibraries', lessonId);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonLocked = (lessonId) => {
    // В демо режиме доступны первые 3 урока
    if (!user) {
      return lessonId > 2;
    }
    // В реальном режиме проверяем прогресс
    // Урок 1 доступен всегда, остальные после завершения предыдущего
    if (lessonId === 1) return false;
    return !isLessonCompleted(lessonId - 1);
  };

  const handleLibrarySelect = (library) => {
    setSelectedLibrary(library);
  };

  const handleBackToLibraries = () => {
    setSelectedLibrary(null);
  };

  // Если выбрана библиотека, показываем её уроки
  if (selectedLibrary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedLibrary.color} text-white`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={handleBackToLibraries}
                  className="text-white/80 hover:text-white transition-colors mb-2"
                >
                  ← Назад к библиотекам
                </button>
                <h1 className="text-4xl font-bold">{selectedLibrary.icon} {selectedLibrary.name}</h1>
                <p className="text-white/80 mt-2">{selectedLibrary.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">{selectedLibrary.icon}</div>
                <div className="text-sm text-white/80">Продвинутый уровень</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс курса</span>
              <span className="text-sm text-gray-500">
                {completedLessons.length} из {selectedLibrary.lessons.length} уроков
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${selectedLibrary.color} h-2 rounded-full transition-all duration-300`}
                style={{
                  width: `${(completedLessons.length / selectedLibrary.lessons.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedLibrary.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isLessonCompleted(lesson.id)
                    ? 'border-green-500 shadow-green-100'
                    : isLessonLocked(lesson.id)
                    ? 'border-gray-200 opacity-60'
                    : 'border-purple-200 hover:border-purple-400 hover:shadow-xl'
                }`}
              >
                {/* Lock Icon */}
                {isLessonLocked(lesson.id) && (
                  <div className="absolute top-4 right-4 text-gray-400">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}

                {/* Completed Check */}
                {isLessonCompleted(lesson.id) && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <span className="text-2xl">✅</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{selectedLibrary.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        Урок {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                  </div>

                  {isLessonLocked(lesson.id) ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      🔒 Заблокировано
                    </button>
                  ) : (
                    <Link
                      to={selectedLibrary.id === 'express' 
                        ? `/js-libraries-course/express/lesson/${lesson.id}`
                        : `/js-libraries-course/${selectedLibrary.id}/lesson/${lesson.id}`
                      }
                      className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 ${
                        isLessonCompleted(lesson.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r ${selectedLibrary.color} text-white hover:opacity-90`
                      }`}
                    >
                      {isLessonCompleted(lesson.id) ? '✅ Повторить' : '🚀 Начать'}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Показываем выбор библиотеки
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      

      {/* Library Selection */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎯 Выберите библиотеку для изучения
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Каждая библиотека содержит 10 уроков, где вы создадите её с нуля, 
            понимая все принципы работы под капотом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {libraries.map((library, index) => (
            <motion.div
              key={library.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleLibrarySelect(library)}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${library.color} p-8 text-white text-center`}>
                <div className="text-6xl mb-4">{library.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{library.name}</h3>
                <p className="text-lg opacity-90">{library.description}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{library.lessons.length}</div>
                    <div className="text-sm text-gray-600">Уроков</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">10-12</div>
                    <div className="text-sm text-gray-600">Недель</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Что вы создадите:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {library.lessons.slice(0, 5).map((lesson, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className={`w-2 h-2 bg-gradient-to-r ${library.color} rounded-full mr-3`}></span>
                        {lesson.title}
                      </li>
                    ))}
                    {library.lessons.length > 5 && (
                      <li className="text-purple-600 font-medium">... и ещё {library.lessons.length - 5} уроков</li>
                    )}
                  </ul>
                </div>

                <button
                  className={`w-full py-4 bg-gradient-to-r ${library.color} hover:opacity-90 text-white rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <span>{library.icon} Изучить {library.name}</span>
                  <span className="text-xl">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Info
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 О курсе JavaScript библиотеки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">🎯 Что вы изучите:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Архитектуру современных JavaScript библиотек</li>
                <li>• Принципы работы Virtual DOM</li>
                <li>• Системы реактивности</li>
                <li>• State management паттерны</li>
                <li>• Middleware архитектуру</li>
                <li>• Тестирование и документацию</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">👥 Для кого этот курс:</h3>
              <p className="text-gray-600 mb-4">
                Продвинутые JavaScript разработчики, которые хотят понять, как работают популярные библиотеки под капотом.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">📊 Статистика курса:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-600 font-medium">Библиотек:</span> 21
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Уроков:</span> 210
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Уровень:</span> Продвинутый
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Проектов:</span> 21
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default JSLibrariesCourse; 