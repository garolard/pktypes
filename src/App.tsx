import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import * as Calculator from './Calc';
import { Types } from './Calc';

enum Modes {
  ATTACK,
  DEFENSE,
  POKEDEX
}

const localizeType = (type: number): string => {
  switch (type) {
    case Types.STEEL: return 'Acero';
    case Types.WATER: return 'Agua';
    case Types.BUG: return 'Bicho';
    case Types.DRAGON: return 'Dragón';
    case Types.ELECTRIC: return 'Eléctrico';
    case Types.GHOST: return 'Fantasma';
    case Types.FIRE: return 'Fuego';
    case Types.FAIRY: return 'Hada';
    case Types.ICE: return 'Hielo';
    case Types.FIGHT: return 'Lucha';
    case Types.NORMAL: return 'Normal';
    case Types.GRASS: return 'Hierba';
    case Types.PSYCHIC: return 'Psíquico';
    case Types.ROCK: return 'Roca';
    case Types.DARK: return 'Siniestro';
    case Types.GROUND: return 'Tierra';
    case Types.POSION: return 'Veneno';
    case Types.FLY: return 'Volador';
    default: return '';
  }
};

const TypesForAttack: React.FC<{ type: Types }> = ({ type }: { type: Types }) => {
  const { x2, x1, x05, x0 } = Calculator.getForAttack(type);
  return (
    <>
      <p>Hace un x2 a los tipos:</p>
      {x2.map(t => <span key={`x2${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x1 a los tipos:</p>
      {x1.map(t => <span key={`x1${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x1/2 a los tipos:</p>
      {x05.map(t => <span key={`x05${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x0 a los tipos:</p>
      {x0.map(t => <span key={`x0${t}`}><strong>{localizeType(t)}</strong>, </span>)}
    </>
  );
}

const TypesForDefense: React.FC<{ primaryType: Types, secondaryType?: Types }> = ({ primaryType, secondaryType }: { primaryType: Types, secondaryType?: Types }) => {
  const { x4, x2, x1, x05, x0 } = Calculator.getForDefense(primaryType, secondaryType ? secondaryType : -1);
  return (
    <>
      <p>Recibe un x4 de los tipos:</p>
      {x4.map(t => <span key={`x4${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Recibe un x2 de los tipos:</p>
      {x2.map(t => <span key={`x2${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Recibe un x1 de los tipos:</p>
      {x1.map(t => <span key={`x1${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Recibe un x1/2 de los tipos:</p>
      {x05.map(t => <span key={`x05${t}`}><strong>{localizeType(t)}</strong>, </span>)}
      <p>Recibe un x0 de los tipos:</p>
      {x0.map(t => <span key={`x0${t}`}><strong>{localizeType(t)}</strong>, </span>)}
    </>
  );
}

const App: React.FC = () => {

  const [mode, setMode] = useState(Modes.ATTACK);
  const [primaryType, setPrimaryType] = useState(-1);
  const [secondaryType, setSecondaryType] = useState(-1);

  const typesButtons = (setTypeFn: React.Dispatch<React.SetStateAction<number>>) => {
    return Array.from(Array(18).keys())
      .map(t => <button key={t} onClick={() => setTypeFn(t)}>{localizeType(t)}</button>);
  };

  return (
    <div className="App">

      <div>
        <button onClick={() => setMode(Modes.ATTACK)}>Ataque</button>
        <button onClick={() => setMode(Modes.DEFENSE)}>Defensa</button>
      </div>

      <div>{typesButtons(setPrimaryType)}</div>
      <div>{mode === Modes.DEFENSE ? typesButtons(setSecondaryType) : null}</div>

      <p>{`Tipo ${primaryType}:`}</p>
      {
        mode === Modes.ATTACK
          ? <TypesForAttack type={primaryType} />
          : <TypesForDefense primaryType={primaryType} secondaryType={secondaryType} />
      }
    </div>
  );
}

export default App;