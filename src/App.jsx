// src/App.js
import React, {  useState } from 'react';
import './App.css';
import {Home} from './Home';
import { Visualizer } from './components/Visualizer';
import { CSSTransition } from 'react-transition-group';

const App = () => {
  const nodeRef = React.useRef(null)
  const nodeRef2 = React.useRef(null)

  const [pageDisplayed, setPageDisplayed] = useState('home');

  const fadeInFadeOutClassName = 'fade';
  const fadeInFadeOutDuration = 300; // duration in milliseconds

  return (
    <>
      <CSSTransition
      nodeRef={nodeRef}
        in={pageDisplayed === 'home'}
        classNames={fadeInFadeOutClassName}
        timeout={fadeInFadeOutDuration}
        unmountOnExit
      >
        <Home ref={nodeRef} onChangeLocation={setPageDisplayed} />
      </CSSTransition>

      <CSSTransition
      nodeRef={nodeRef2}
        in={pageDisplayed !== 'home'}
        classNames={fadeInFadeOutClassName}
        timeout={fadeInFadeOutDuration}
        unmountOnExit
      >
        <Visualizer ref={nodeRef2} onChangeLocation={setPageDisplayed} />
      </CSSTransition>
    </>
  );
};

export default App;
