import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const ProfessionalCandlestickChart = ({ data, width = 800, height = 400, title = "Свечной график" }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Создаем график
    const chart = createChart(chartContainerRef.current, {
      width: width,
      height: height,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#ddd',
      },
      timeScale: {
        borderColor: '#ddd',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Создаем серию свечей
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderDownColor: '#ef5350',
      borderUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      wickUpColor: '#26a69a',
    });

    // Добавляем данные
    candlestickSeries.setData(data);

    // Добавляем объем (если есть)
    if (data[0] && data[0].volume) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      
      const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume,
        color: item.close >= item.open ? '#26a69a' : '#ef5350',
      }));
      
      volumeSeries.setData(volumeData);
    }

    // Добавляем скользящие средние
    const sma20Data = calculateSMA(data, 20);
    const sma20Series = chart.addLineSeries({
      color: '#2196F3',
      lineWidth: 2,
      title: 'SMA 20',
    });
    sma20Series.setData(sma20Data);

    const sma50Data = calculateSMA(data, 50);
    const sma50Series = chart.addLineSeries({
      color: '#FF9800',
      lineWidth: 2,
      title: 'SMA 50',
    });
    sma50Series.setData(sma50Data);

    // Сохраняем ссылку на график
    chartRef.current = chart;
    setIsLoaded(true);

    // Обработчик изменения размера
    const handleResize = () => {
      chart.applyOptions({ width: width, height: height });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, width, height]);

  // Функция для расчета скользящего среднего
  const calculateSMA = (data, period) => {
    const smaData = [];
    
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.close, 0);
      const average = sum / period;
      
      smaData.push({
        time: data[i].time,
        value: average,
      });
    }
    
    return smaData;
  };

  return (
    <div className="professional-chart-container">
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
            <span>SMA 20</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
            <span>SMA 50</span>
          </div>
        </div>
      </div>
      
      <div className="chart-wrapper border border-gray-300 rounded-lg overflow-hidden">
        <div ref={chartContainerRef} className="chart-container"></div>
      </div>
      
      {!isLoaded && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Загрузка графика...</span>
        </div>
      )}
      
      <div className="chart-info mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Информация о графике:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Зеленые свечи:</strong> Цена закрытия выше цены открытия (бычий тренд)</li>
          <li>• <strong>Красные свечи:</strong> Цена закрытия ниже цены открытия (медвежий тренд)</li>
          <li>• <strong>SMA 20:</strong> Скользящее среднее за 20 периодов (синяя линия)</li>
          <li>• <strong>SMA 50:</strong> Скользящее среднее за 50 периодов (оранжевая линия)</li>
          <li>• <strong>Тени свечей:</strong> Показывают максимальную и минимальную цены</li>
          <li>• <strong>Тело свечи:</strong> Показывает цену открытия и закрытия</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalCandlestickChart; 