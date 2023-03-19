// src/App.js
import React, {  useState } from 'react';
import './App.css';
import {Home} from './Home';
import { Visualizer } from './components/Visualizer';
import { CSSTransition } from 'react-transition-group';

const App = () => {
  const [pageDisplayed, setPageDisplayed] = useState('home');

  const fadeInFadeOutClassName = 'fade';
  const fadeInFadeOutDuration = 300; // duration in milliseconds

  return (
    <>
      <CSSTransition
        in={pageDisplayed === 'home'}
        classNames={fadeInFadeOutClassName}
        timeout={fadeInFadeOutDuration}
        unmountOnExit
      >
        <Home onChangeLocation={setPageDisplayed} />
      </CSSTransition>

      <CSSTransition
        in={pageDisplayed !== 'home'}
        classNames={fadeInFadeOutClassName}
        timeout={fadeInFadeOutDuration}
        unmountOnExit
      >
        <Visualizer onChangeLocation={setPageDisplayed} />
      </CSSTransition>
    </>
  );
};

export default App;
