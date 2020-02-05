import React, { useState } from 'react';

import './App.css';
import './App.small.css';

import { useTranslation } from 'react-i18next';

import { Header } from './App.Header';
import { Footer } from './App.Footer';
import { Types } from './calculator';

import { AttackTab, DefenseTab } from './ui/controls/Tab';

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