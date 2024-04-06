import React, { useState, useEffect } from 'react';

function MouseCircle() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="MouseCircle">
      <div
        className="red-circle"
        style={{
          top: mousePosition.y - 25, // Adjust vertically to position the center of the circle
          left: mousePosition.x - 25, // Adjust horizontally to position the center of the circle
        }}
      ></div>
    </div>
  );
}

export default MouseCircle;
