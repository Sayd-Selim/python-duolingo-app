import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CandlestickChart = ({ data, width = 600, height = 300, showLabels = true, interactive = true }) => {
  console.log('CandlestickChart render:', { data, width, height, showLabels, interactive });
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [selectedCandle, setSelectedCandle] = useState(null);

  // Находим минимум и максимум для масштабирования
  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  const scaleY = (price) => {
    return height - ((price - minPrice + padding) / (priceRange + padding * 2)) * height;
  };

  const candleWidth = width / data.length * 0.8;
  const candleSpacing = width / data.length;

  const getCandleColor = (open, close) => {
    return close >= open ? '#10b981' : '#ef4444';
  };

  const getCandleBody = (candle) => {
    const x = candle.index * candleSpacing + candleSpacing / 2 - candleWidth / 2;
    const openY = scaleY(candle.open);
    const closeY = scaleY(candle.close);
    const bodyHeight = Math.abs(closeY - openY) || 2;
    const bodyY = Math.min(openY, closeY);

    return {
      x,
      y: bodyY,
      width: candleWidth,
      height: bodyHeight,
      color: getCandleColor(candle.open, candle.close)
    };
  };

  const getCandleWick = (candle) => {
    const x = candle.index * candleSpacing + candleSpacing / 2;
    const highY = scaleY(candle.high);
    const lowY = scaleY(candle.low);
    const openY = scaleY(candle.open);
    const closeY = scaleY(candle.close);

    return {
      x,
      highY,
      lowY,
      openY,
      closeY,
      color: getCandleColor(candle.open, candle.close)
    };
  };

  const handleCandleClick = (candle) => {
    if (interactive) {
      setSelectedCandle(selectedCandle?.index === candle.index ? null : candle);
    }
  };

  const handleCandleHover = (candle) => {
    if (interactive) {
      setHoveredCandle(candle);
    }
  };

  return (
    <div className="relative">
      <svg width={width} height={height} className="border border-gray-300 rounded-lg bg-white">
        {/* Сетка */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Свечи */}
        {data.map((candle, index) => {
          const candleWithIndex = { ...candle, index };
          const body = getCandleBody(candleWithIndex);
          const wick = getCandleWick(candleWithIndex);
          const isHovered = hoveredCandle?.index === index;
          const isSelected = selectedCandle?.index === index;

          return (
            <g key={index}>
              {/* Тень (wick) */}
              <line
                x1={wick.x}
                y1={wick.highY}
                x2={wick.x}
                y2={wick.lowY}
                stroke={wick.color}
                strokeWidth="2"
                opacity={isHovered || isSelected ? 1 : 0.8}
              />
              
              {/* Тело свечи */}
              <rect
                x={body.x}
                y={body.y}
                width={body.width}
                height={body.height}
                fill={body.color}
                stroke={isHovered || isSelected ? "#000" : "none"}
                strokeWidth={isHovered || isSelected ? "2" : "0"}
                opacity={isHovered || isSelected ? 1 : 0.9}
                cursor={interactive ? "pointer" : "default"}
                onClick={() => handleCandleClick(candleWithIndex)}
                onMouseEnter={() => handleCandleHover(candleWithIndex)}
                onMouseLeave={() => setHoveredCandle(null)}
              />
            </g>
          );
        })}

        {/* Подписи цен */}
        {showLabels && (
          <g>
            <text x="10" y="20" fill="#6b7280" fontSize="12" fontWeight="bold">
              ${maxPrice.toFixed(2)}
            </text>
            <text x="10" y={height - 10} fill="#6b7280" fontSize="12" fontWeight="bold">
              ${minPrice.toFixed(2)}
            </text>
          </g>
        )}
      </svg>

      {/* Информационная панель */}
      {(hoveredCandle || selectedCandle) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
          style={{
            left: (hoveredCandle || selectedCandle)?.index * candleSpacing + 50,
            top: -80,
            minWidth: '200px'
          }}
        >
          <div className="text-sm">
            <div className="font-bold mb-2">
              Свеча {(hoveredCandle || selectedCandle)?.index + 1}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Открытие:</span>
                <span className="font-mono">${(hoveredCandle || selectedCandle)?.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Максимум:</span>
                <span className="font-mono">${(hoveredCandle || selectedCandle)?.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Минимум:</span>
                <span className="font-mono">${(hoveredCandle || selectedCandle)?.low}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Закрытие:</span>
                <span className="font-mono">${(hoveredCandle || selectedCandle)?.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Тип:</span>
                <span className={`font-semibold ${
                  (hoveredCandle || selectedCandle)?.close >= (hoveredCandle || selectedCandle)?.open 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {(hoveredCandle || selectedCandle)?.close >= (hoveredCandle || selectedCandle)?.open 
                    ? 'Бычья (зеленая)' 
                    : 'Медвежья (красная)'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CandlestickChart; 