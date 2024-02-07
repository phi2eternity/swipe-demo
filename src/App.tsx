import React from 'react';
import "./App.css";
import MainPage from '@pages/main';
import useWindowSize from '@domain/hooks/use-window-size';

function App() {
  const [width, height] = useWindowSize();

  return (
      <MainPage/>
  );
}

export default App;
