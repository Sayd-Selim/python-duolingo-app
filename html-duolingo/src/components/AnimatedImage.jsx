import React, { useRef, useEffect } from 'react';

const AnimatedImage = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const image = new window.Image();
    image.src = '/human.png'; // Используем картинку из public/images/avatar.png

    let x = 0;
    let speed = 0;

    const draw = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.drawImage(image, x, 50, 100, 100);
      x += speed;
      if (x > 200 || x < 0) speed = -speed;
      requestAnimationFrame(draw);
    };

    image.onload = () => draw();
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default AnimatedImage; 