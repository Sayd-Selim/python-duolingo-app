import React, { useState } from 'react';
import { motion } from 'framer-motion';

const pythonReference = [
    {
        concept: 'Переменные',
        description: 'Контейнеры для хранения данных в программе',
        metaphor: 'Представьте переменные как коробки с наклейками. Вы кладете что-то в коробку и пишете на наклейке название. Потом можете найти эту коробку по названию и использовать то, что в ней лежит.',
        examples: [
            {
                code: 'name = "Иван"',
                result: 'Создается переменная name со значением "Иван"'
            },
            {
                code: 'age = 25\nprint(age)',
                result: '25',
                note: 'Переменная age содержит число 25'
            }
        ],
        pitfalls: [
            'Не используйте зарезервированные слова Python (if, for, while, etc.)',
            'Имена переменных чувствительны к регистру (name и Name - разные переменные)',
            'Не начинайте имена с цифр'
        ]
    },
    {
        concept: 'Типы данных',
        description: 'Различные виды данных, которые может хранить Python',
        metaphor: 'Типы данных - это как разные виды контейнеров. Стеклянная банка для жидкости, коробка для твердых предметов, конверт для бумаг. Каждый тип данных предназначен для определенного вида информации.',
        examples: [
            {
                code: '# Строка (str)\nname = "Python"\n\n# Число (int)\nage = 25\n\n# Число с плавающей точкой (float)\nheight = 1.75\n\n# Логическое значение (bool)\nis_student = True',
                result: 'Разные типы данных для разных целей'
            }
        ],
        pitfalls: [
            'Не смешивайте строки и числа без преобразования',
            'Помните, что деление в Python всегда возвращает float',
            'Сравнивайте значения одного типа'
        ]
    },
    {
        concept: 'Условные операторы',
        description: 'Конструкции для принятия решений в программе',
        metaphor: 'Условные операторы - это как светофор на дороге. Если горит зеленый (условие истинно) - едем, если красный (условие ложно) - стоим. Программа "решает", какой код выполнить.',
        examples: [
            {
                code: 'age = 18\nif age >= 18:\n    print("Совершеннолетний")\nelse:\n    print("Несовершеннолетний")',
                result: 'Совершеннолетний'
            }
        ],
        pitfalls: [
            'Не забывайте двоеточие после условия',
            'Правильно отступайте код внутри блоков',
            'Используйте == для сравнения, а не ='
        ]
    },
    {
        concept: 'Циклы',
        description: 'Конструкции для повторения кода',
        metaphor: 'Циклы - это как конвейер на заводе. Одна и та же операция повторяется много раз, пока не закончатся детали или не выполнится условие остановки.',
        examples: [
            {
                code: '# Цикл for\nfor i in range(5):\n    print(i)\n\n# Цикл while\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1',
                result: '0\n1\n2\n3\n4\n\n0\n1\n2'
            }
        ],
        pitfalls: [
            'Будьте осторожны с бесконечными циклами while',
            'Не изменяйте список во время итерации по нему',
            'Используйте break для выхода из цикла'
        ]
    },
    {
        concept: 'Функции',
        description: 'Блоки кода, которые можно переиспользовать',
        metaphor: 'Функции - это как рецепты. Вы записываете последовательность действий один раз, а потом можете использовать этот рецепт много раз, просто называя его по имени.',
        examples: [
            {
                code: 'def greet(name):\n    return f"Привет, {name}!"\n\nmessage = greet("Иван")\nprint(message)',
                result: 'Привет, Иван!'
            }
        ],
        pitfalls: [
            'Не забывайте return для возврата значений',
            'Используйте осмысленные имена функций',
            'Документируйте сложные функции'
        ]
    },
    {
        concept: 'Списки',
        description: 'Упорядоченные коллекции элементов',
        metaphor: 'Списки - это как шкаф с полками. Каждый элемент имеет свой номер (индекс), и вы можете добавлять, удалять или изменять элементы на любой полке.',
        examples: [
            {
                code: 'fruits = ["яблоко", "банан", "апельсин"]\nfruits.append("груша")\nprint(fruits[0])\nprint(len(fruits))',
                result: 'яблоко\n4'
            }
        ],
        pitfalls: [
            'Индексы начинаются с 0, а не с 1',
            'Не выходите за границы списка',
            'Списки изменяемы - используйте копии при необходимости'
        ]
    }
];

function Reference() {
    const [activeConcept, setActiveConcept] = useState(0);
    const [activeTab, setActiveTab] = useState('examples');

    const toggleTab = (conceptIndex, tabName) => {
        setActiveConcept(conceptIndex);
        setActiveTab(tabName);
    };

    const getConceptCategory = (concept) => {
        if (['Переменные', 'Типы данных'].includes(concept)) return 'Основы';
        if (['Условные операторы', 'Циклы'].includes(concept)) return 'Управление';
        if (['Функции', 'Списки'].includes(concept)) return 'Структуры';
        return 'Другое';
    };

    const categories = ['Все', 'Основы', 'Управление', 'Структуры'];
    const [activeCategory, setActiveCategory] = useState('Все');

    const filteredConcepts = activeCategory === 'Все' 
        ? pythonReference 
        : pythonReference.filter(concept => getConceptCategory(concept.concept) === activeCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto p-6"
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                    🐍 Справочник Python
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Полный справочник по основам Python с примерами, объяснениями и типичными ошибками
                </p>
            </div>

            {/* Категории */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg border border-green-200 p-1 bg-green-50">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-lg transition-colors ${
                                activeCategory === category
                                    ? 'bg-green-600 text-white'
                                    : 'text-green-600 hover:bg-green-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Список концепций */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredConcepts.map((concept, index) => (
                    <motion.div
                        key={concept.concept}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-green-500"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-green-600">
                                    {getConceptCategory(concept.concept)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Python
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {concept.concept}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {concept.description}
                            </p>
                            <button
                                onClick={() => toggleTab(index, 'examples')}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Подробнее
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Детальная информация */}
            {filteredConcepts.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {filteredConcepts[activeConcept].concept}
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab('examples')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    activeTab === 'examples'
                                        ? 'bg-green-600 text-white'
                                        : 'text-green-600 hover:bg-green-100'
                                }`}
                            >
                                Примеры
                            </button>
                            <button
                                onClick={() => setActiveTab('metaphor')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    activeTab === 'metaphor'
                                        ? 'bg-green-600 text-white'
                                        : 'text-green-600 hover:bg-green-100'
                                }`}
                            >
                                Объяснение
                            </button>
                            <button
                                onClick={() => setActiveTab('pitfalls')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    activeTab === 'pitfalls'
                                        ? 'bg-green-600 text-white'
                                        : 'text-green-600 hover:bg-green-100'
                                }`}
                            >
                                Ошибки
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {activeTab === 'examples' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Примеры использования</h3>
                                <div className="space-y-4">
                                    {filteredConcepts[activeConcept].examples.map((example, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="bg-gray-900 rounded-lg p-4 mb-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-green-400 font-medium">Python</span>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(example.code)}
                                                        className="text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        📋 Копировать
                                                    </button>
                                                </div>
                                                <pre className="text-green-400 overflow-x-auto">
                                                    <code>{example.code}</code>
                                                </pre>
                                            </div>
                                            <div className="text-gray-700">
                                                <strong>Результат:</strong> {example.result}
                                            </div>
                                            {example.note && (
                                                <div className="mt-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                                                    💡 {example.note}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'metaphor' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Простое объяснение</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                    <p className="text-blue-800 leading-relaxed">
                                        {filteredConcepts[activeConcept].metaphor}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pitfalls' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Типичные ошибки</h3>
                                <div className="space-y-3">
                                    {filteredConcepts[activeConcept].pitfalls.map((pitfall, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <span className="text-red-500 text-lg">⚠️</span>
                                            <p className="text-gray-700">{pitfall}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default Reference; 