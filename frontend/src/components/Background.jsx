import React from 'react';

const Background = () => {
  const bgStyle = {
    backgroundImage: `url('bg.png')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',  // full viewport height
    width: '100vw',   // full viewport width
    position: 'fixed', // so it stays in the background while scrolling
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={bgStyle}></div>
  );
};

export default Background;
