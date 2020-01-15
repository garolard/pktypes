import React, { useState, useRef } from 'react';
import './App.css';
import './App.small.css';
import { Header } from './App.Header';
import { Footer } from './App.Footer';
import { TypesForAttack, TypesForDefense, localizeType } from './App.Results';
import { Types } from './Calc';

enum Modes {
  ATTACK,
  DEFENSE,
  POKEDEX
}

const scrollToRef = (ref: React.RefObject<HTMLElement>) => ref.current!.scrollIntoView();

const App: React.FC = () => {

  const secondaryTypeRef = useRef(null);
  const resultBoxRef = useRef(null);

  const [mode, setMode] = useState(Modes.ATTACK);
  const [primaryType, setPrimaryType] = useState(-1);
  const [secondaryType, setSecondaryType] = useState(-1);

  const typesButtons = (primaryOrSecondary: 1 | 2, setTypeFn: React.Dispatch<React.SetStateAction<number>>) => {
    const buttons = Array.from(Array(18).keys()).map(t => {

      const click = () => {
        if (primaryOrSecondary === 1 && secondaryType === t)
          setSecondaryType(-1);
        setTypeFn(t);

        if (primaryOrSecondary === 1)
          if (mode === Modes.ATTACK)
            scrollToRef(resultBoxRef);
          else
            scrollToRef(secondaryTypeRef);
        else
          scrollToRef(resultBoxRef);
      };

      let typeClass = `type-button ${Types[t].toLocaleLowerCase()}`;

      if ((primaryOrSecondary === 1 && t === primaryType) ||
          ((primaryOrSecondary === 2 && t === secondaryType) &&
          (primaryOrSecondary === 2 && primaryType !== t)))
        typeClass += ' selected';
      
      return <button key={t} className={typeClass} disabled={primaryOrSecondary === 2 && primaryType === t} onClick={click}>{localizeType(t)}</button>
    });

    if (primaryOrSecondary === 2) {
      const typeClass = `type-button ${secondaryType < 0 ? 'selected' : ''}`;
      return [<button className={typeClass} onClick={() => setSecondaryType(-1)}>Ninguno</button>].concat(buttons);
    }
    
    return buttons;
  };

  return (
    <div className="App">
      
      <Header />

      <nav className='navigation'>
        <div className='tabs-container'>
          <button className={mode === Modes.ATTACK ? 'selected' : ''} onClick={() => setMode(Modes.ATTACK)}>Ataque</button>
          <button className={mode === Modes.DEFENSE ? 'selected' : ''} onClick={() => setMode(Modes.DEFENSE)}>Defensa</button>
        </div>
      </nav>

      <section className='app-container'>

        <div>
          <h5>Elige un tipo</h5>
          <div className='buttons-grid'>{typesButtons(1, setPrimaryType)}</div>
        </div>

        <div ref={secondaryTypeRef} style={{ display: mode === Modes.DEFENSE ? 'grid' : 'none'}}>
          <h5>Elige un segundo tipo</h5>
          <div className='buttons-grid'>{mode === Modes.DEFENSE ? typesButtons(2, setSecondaryType) : null}</div>
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