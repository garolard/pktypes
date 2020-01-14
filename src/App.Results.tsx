import * as React from 'react';
import * as Calculator from './Calc';
import { Types } from './Calc';

export const localizeType = (type: number): string => {
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
    case Types.POISON: return 'Veneno';
    case Types.FLY: return 'Volador';
    default: return '';
  }
};


const buildResultBox = (key: string, type: Types) => {
  const classes = `result-box ${Types[type].toLocaleLowerCase()}`;
  return <span key={`${key}${type}`} className={classes}><strong>{localizeType(type)}</strong></span>;
}


export const TypesForAttack: React.FC<{ type: Types }> = ({ type }: { type: Types }) => {

  if (type < 0) return null;

  const { x2, x1, x05, x0 } = Calculator.getForAttack(type);
  return (
    <div className='result-container'>
      <p>Hace un x2 a los tipos:</p>
      <div className='result-group'>
        {x2.map(t => buildResultBox('x2', t))}
      </div>

      <p>Hace un x1 a los tipos:</p>
      <div className='result-group'>
        {x1.map(t => buildResultBox('x1', t))}
      </div>

      <p>Hace un x1/2 a los tipos:</p>
      <div className='result-group'>
        {x05.map(t => buildResultBox('x05', t))}
      </div>

      <p>Hace un x0 a los tipos:</p>
      <div className='result-group'>
        {x0.map(t => buildResultBox('x0', t))}
      </div>
    </div>
  );
}

export const TypesForDefense: React.FC<{ primaryType: Types, secondaryType?: Types }> = ({ primaryType, secondaryType }: { primaryType: Types, secondaryType?: Types }) => {

  if (primaryType < 0) return null;

  const { x4, x2, x1, x05, x0 } = Calculator.getForDefense(primaryType, secondaryType ? secondaryType : -1);
  return (
    <div className='result-container'>
      <p>Recibe un x4 de los tipos:</p>
      <div className='result-group'>
        {x4.map(t => buildResultBox('dx4', t))}
      </div>

      <p>Recibe un x2 de los tipos:</p>
      <div className='result-group'>
        {x2.map(t => buildResultBox('dx2', t))}
      </div>

      <p>Recibe un x1 de los tipos:</p>
      <div className='result-group'>
        {x1.map(t => buildResultBox('dx1', t))}
      </div>

      <p>Recibe un x1/2 de los tipos:</p>
      <div className='result-group'>
        {x05.map(t => buildResultBox('dx05', t))}
      </div>

      <p>Recibe un x0 de los tipos:</p>
      <div className='result-group'>
        {x0.map(t => buildResultBox('dx0', t))}
      </div>
    </div>
  );
}
