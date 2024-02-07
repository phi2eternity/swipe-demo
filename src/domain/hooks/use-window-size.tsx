import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize(); // Initialize size

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default useWindowSize;
