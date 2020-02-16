import React, { useState } from 'react';

import './App.css';
import './App.small.css';

import { useTranslation } from 'react-i18next';

import { Header } from './App.Header';
import { Footer } from './App.Footer';
import { Types, stringToType } from './calculator';

import { AttackTab, DefenseTab } from './ui/controls/Tab';
import { PokedexTab } from './ui/controls/PokedexTab';
import { PokedexEntry } from './pokedex';

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

  const onPokemonSelected = (poke: PokedexEntry) => {
    setMode(Modes.DEFENSE);
    setPrimaryType(stringToType(poke.type[0]));
    if (poke.type.length > 1)
      setSecondaryType(stringToType(poke.type[1]));
  }

  const activeTab = () => {
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
        return <PokedexTab onPokemonSelected={onPokemonSelected} />;
    }
  }

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
          {activeTab()}
        </div>

      </section>

      <Footer />

    </div>
  );
}

export default App;