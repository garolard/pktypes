import React, { useState } from 'react';

import './App.css';
import './App.small.css';

import { useTranslation } from 'react-i18next';

import { Header } from './App.Header';
import { Footer } from './App.Footer';
import { Types } from './Calc';

import { AttackTab, DefenseTab } from './Tab';

enum Modes {
  ATTACK,
  DEFENSE,
  POKEDEX
}


const App: React.FC = () => {

  const { t } = useTranslation();

  const [mode, setMode] = useState(Modes.ATTACK);
  const [primaryType, setPrimaryType] = useState(-1);
  const [secondaryType, setSecondaryType] = useState(-1);

  // const animateSecondaryContainer = () => { 
  //   if (!secondaryButtonGrid)
  //     return;
    
  //   secondaryButtonGrid.current!.classList.add('animate');
  //   setTimeout(() => {
  //     secondaryButtonGrid.current!.classList.remove('animate');
  //   }, 550);
  // };

  // const typesButtons = (primaryOrSecondary: 1 | 2, setTypeFn: React.Dispatch<React.SetStateAction<number>>) => {
  //   const buttons = Array.from(Array(18).keys()).map(t => {

  //     const click = () => {
  //       if (primaryOrSecondary === 1 && secondaryType === t)
  //         setSecondaryType(-1);
  //       setTypeFn(t);

  //       if (primaryOrSecondary === 1)
  //         if (mode === Modes.ATTACK)
  //           scrollToRef(resultBoxRef);
  //         else {
  //           scrollToRef(secondaryTypeRef);
  //           animateSecondaryContainer();
  //         }
  //       else
  //         scrollToRef(resultBoxRef);
  //     };

  //     const classes = ['type-button', Types[t].toLocaleLowerCase()];

  //     if ((primaryOrSecondary === 1 && t === primaryType) ||
  //         ((primaryOrSecondary === 2 && t === secondaryType) &&
  //         (primaryOrSecondary === 2 && primaryType !== t)))
  //       classes.push('selected');
      
  //     return <button key={t} className={classnames(classes)} disabled={primaryOrSecondary === 2 && primaryType === t} onClick={click}>{localizeType(t)}</button>
  //   });

  //   if (primaryOrSecondary === 2) {
  //     const typeClass = `type-button ${secondaryType < 0 ? 'selected' : ''}`;
  //     return [<button key={-1} className={typeClass} onClick={() => setSecondaryType(-1)}>Ninguno</button>].concat(buttons);
  //   }
    
  //   return buttons;
  // };

  const onPrimaryTypeSelected = (type: Types) => {
    if (type === secondaryType)
      setSecondaryType(-1);
    
    setPrimaryType(type);
  };

  const onSecondaryTypeSelected = (type: Types) => setSecondaryType(type);

  const tab = () => {
    switch (mode) {
      case Modes.ATTACK:
        return <AttackTab
          primaryType={primaryType}
          onPrimaryTypeSelected={onPrimaryTypeSelected} />;
      case Modes.DEFENSE:
        return <DefenseTab
          primaryType={primaryType}
          secondaryType={secondaryType}
          onPrimaryTypeSelected={onPrimaryTypeSelected}
          onSecondaryTypeSelected={onSecondaryTypeSelected} />;
      case Modes.POKEDEX:
        return null;
    }
  }

  return (
    <div className="App">
      
      <Header />

      <nav className='navigation'>
        <div className='tabs-container'>
          <button className={mode === Modes.ATTACK ? 'selected' : ''} onClick={() => setMode(Modes.ATTACK)}>{t('ATTACK_BTN')}</button>
          <button className={mode === Modes.DEFENSE ? 'selected' : ''} onClick={() => setMode(Modes.DEFENSE)}>{t('DEFENSE_BTN')}</button>
          {/* <button className={mode === Modes.POKEDEX ? 'selected' : ''} onClick={() => setMode(Modes.POKEDEX)}>{t('POKEDEX_BTN')}</button> */}
        </div>
      </nav>

      <section className='app-container'>
        
        <div>
          {tab()}
        </div>

      </section>

      <Footer />

    </div>
  );
}

export default App;