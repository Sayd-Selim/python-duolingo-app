import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line
} from 'recharts';

const RechartsCandlestickChart = ({ data, width = 800, height = 400, title = "Свечной график (Recharts)" }) => {
  // Преобразуем данные для Recharts
  const chartData = data.map((item, index) => ({
    name: `Свеча ${index + 1}`,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volume || 0,
    // Для отображения свечей используем разницу между open и close
    body: item.close - item.open,
    // Цвет свечи
    color: item.close >= item.open ? '#26a69a' : '#ef5350',
    // Для отображения теней
    upperShadow: item.high - Math.max(item.open, item.close),
    lowerShadow: Math.min(item.open, item.close) - item.low,
  }));

  // Кастомный тултип
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
          <p className="font-bold text-gray-800">{label}</p>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-600">Открытие:</span> <span className="font-mono">${data.open}</span></p>
            <p><span className="text-gray-600">Максимум:</span> <span className="font-mono">${data.high}</span></p>
            <p><span className="text-gray-600">Минимум:</span> <span className="font-mono">${data.low}</span></p>
            <p><span className="text-gray-600">Закрытие:</span> <span className="font-mono">${data.close}</span></p>
            <p><span className="text-gray-600">Тип:</span> 
              <span className={`font-semibold ml-1 ${data.close >= data.open ? 'text-green-600' : 'text-red-600'}`}>
                {data.close >= data.open ? 'Бычья' : 'Медвежья'}
              </span>
            </p>
            {data.volume > 0 && (
              <p><span className="text-gray-600">Объем:</span> <span className="font-mono">{data.volume.toLocaleString()}</span></p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Кастомные бары для свечей
  const CustomCandlestick = (props) => {
    const { x, y, width, height, payload } = props;
    const data = payload;
    
    if (!data) return null;

    const isGreen = data.close >= data.open;
    const bodyHeight = Math.abs(data.body);
    const bodyY = data.body >= 0 ? y : y + data.body;
    
    return (
      <g>
        {/* Тени */}
        <line
          x1={x + width / 2}
          y1={y - data.upperShadow}
          x2={x + width / 2}
          y2={y + height + data.lowerShadow}
          stroke={isGreen ? '#26a69a' : '#ef5350'}
          strokeWidth="2"
        />
        {/* Тело свечи */}
        <rect
          x={x + width * 0.2}
          y={bodyY}
          width={width * 0.6}
          height={Math.max(bodyHeight, 2)}
          fill={isGreen ? '#26a69a' : '#ef5350'}
          stroke={isGreen ? '#26a69a' : '#ef5350'}
          strokeWidth="1"
        />
      </g>
    );
  };

  return (
    <div className="recharts-chart-container">
      <div className="chart-header mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Бычьи свечи</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Медвежьи свечи</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Объем</span>
          </div>
        </div>
      </div>
      
      <div className="chart-wrapper border border-gray-300 rounded-lg overflow-hidden">
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Свечи */}
            <Bar 
              dataKey="body" 
              fill="#8884d8" 
              shape={<CustomCandlestick />}
              name="Свечи"
            />
            
            {/* Объем */}
            <Bar 
              dataKey="volume" 
              fill="#8884d8" 
              opacity={0.3}
              name="Объем"
              yAxisId={1}
            />
            
            {/* Линия тренда */}
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="#2196F3" 
              strokeWidth={2}
              dot={false}
              name="Цена закрытия"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-info mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Особенности графика Recharts:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Интерактивность:</strong> Наведение курсора показывает детальную информацию</li>
          <li>• <strong>Адаптивность:</strong> График автоматически подстраивается под размер экрана</li>
          <li>• <strong>Множественные серии:</strong> Свечи, объем и линия тренда на одном графике</li>
          <li>• <strong>Кастомизация:</strong> Легко настраиваемые цвета и стили</li>
          <li>• <strong>Легенда:</strong> Автоматическое отображение легенды</li>
          <li>• <strong>Сетка:</strong> Помогает ориентироваться в ценах</li>
        </ul>
      </div>
    </div>
  );
};

export default RechartsCandlestickChart; 