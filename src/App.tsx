import React, { useState, useRef } from 'react';
import classnames from 'classnames';

import './App.css';
import './App.small.css';

import { useTranslation } from 'react-i18next';

import { Header } from './App.Header';
import { Footer } from './App.Footer';
import { TypesForAttack, TypesForDefense, localizeType } from './App.Results';
import { Types } from './Calc';

enum Modes {
  ATTACK,
  DEFENSE,
  POKEDEX
}

const scrollToRef = (ref: React.RefObject<HTMLElement>) => setTimeout(() => ref.current!.scrollIntoView(), 100);

const App: React.FC = () => {

  const { t } = useTranslation();

  const secondaryTypeRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const secondaryButtonGrid: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const resultBoxRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [mode, setMode] = useState(Modes.ATTACK);
  const [primaryType, setPrimaryType] = useState(-1);
  const [secondaryType, setSecondaryType] = useState(-1);

  const animateSecondaryContainer = () => { 
    if (!secondaryButtonGrid)
      return;
    
    secondaryButtonGrid.current!.classList.add('animate');
    setTimeout(() => {
      secondaryButtonGrid.current!.classList.remove('animate');
    }, 550);
  };

  const typesButtons = (primaryOrSecondary: 1 | 2, setTypeFn: React.Dispatch<React.SetStateAction<number>>) => {
    const buttons = Array.from(Array(18).keys()).map(t => {

      const click = () => {
        if (primaryOrSecondary === 1 && secondaryType === t)
          setSecondaryType(-1);
        setTypeFn(t);

        if (primaryOrSecondary === 1)
          if (mode === Modes.ATTACK)
            scrollToRef(resultBoxRef);
          else {
            scrollToRef(secondaryTypeRef);
            animateSecondaryContainer();
          }
        else
          scrollToRef(resultBoxRef);
      };

      const classes = ['type-button', Types[t].toLocaleLowerCase()];

      if ((primaryOrSecondary === 1 && t === primaryType) ||
          ((primaryOrSecondary === 2 && t === secondaryType) &&
          (primaryOrSecondary === 2 && primaryType !== t)))
        classes.push('selected');
      
      return <button key={t} className={classnames(classes)} disabled={primaryOrSecondary === 2 && primaryType === t} onClick={click}>{localizeType(t)}</button>
    });

    if (primaryOrSecondary === 2) {
      const typeClass = `type-button ${secondaryType < 0 ? 'selected' : ''}`;
      return [<button key={-1} className={typeClass} onClick={() => setSecondaryType(-1)}>Ninguno</button>].concat(buttons);
    }
    
    return buttons;
  };

  return (
    <div className="App">
      
      <Header />

      <nav className='navigation'>
        <div className='tabs-container'>
          <button className={mode === Modes.ATTACK ? 'selected' : ''} onClick={() => setMode(Modes.ATTACK)}>{t('ATTACK_BTN')}</button>
          <button className={mode === Modes.DEFENSE ? 'selected' : ''} onClick={() => setMode(Modes.DEFENSE)}>{t('DEFENSE_BTN')}</button>
          <button className={mode === Modes.POKEDEX ? 'selected' : ''} onClick={() => setMode(Modes.POKEDEX)}>{t('POKEDEX_BTN')}</button>
        </div>
      </nav>

      <section className='app-container'>

        <div>
          <h5>{t('PRIMARY_TYPE_LBL')}</h5>
          <div className='buttons-grid'>{typesButtons(1, setPrimaryType)}</div>
        </div>

        <div ref={secondaryTypeRef} style={{ display: mode === Modes.DEFENSE ? 'grid' : 'none'}}>
          <h5>{t('SECONDARY_TYPE_LBL')}</h5>
          <div ref={secondaryButtonGrid} className='buttons-grid secondary'>{mode === Modes.DEFENSE ? typesButtons(2, setSecondaryType) : null}</div>
        </div>
        
        <div ref={resultBoxRef}>
          {
            mode === Modes.ATTACK
              ? <TypesForAttack type={primaryType} />
              : <TypesForDefense primaryType={primaryType} secondaryType={secondaryType} />
          }
        </div>

      </section>

      <Footer />

    </div>
  );
}

export default App;