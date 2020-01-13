import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as Calculator from './Calc';
import { Types } from './Calc';


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

const App: React.FC = () => {

  const { x2, x1, x05, x0 } = Calculator.getForAttack(Types.FIRE);

  return (
    <div className="App">
      <p>Tipo Fuego:</p>
      <p>Hace un x2 a los tipos:</p>
      {x2.map(t => <span><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x1 a los tipos:</p>
      {x1.map(t => <span><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x1/2 a los tipos:</p>
      {x05.map(t => <span><strong>{localizeType(t)}</strong>, </span>)}
      <p>Hace un x0 a los tipos:</p>
      {x0.map(t => <span><strong>{localizeType(t)}</strong>, </span>)}
    </div>
  );
}

export default App;