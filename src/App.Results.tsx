import * as React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import * as Calculator from './Calc';
import { Types } from './Calc';

export const localizeType = (type: number): string => {
  switch (type) {
    case Types.STEEL: return i18n.t('TYPE_STEEL');
    case Types.WATER: return i18n.t('TYPE_WATER');
    case Types.BUG: return i18n.t('TYPE_BUG');
    case Types.DRAGON: return i18n.t('TYPE_DRAGON');
    case Types.ELECTRIC: return i18n.t('TYPE_ELECTRIC');
    case Types.GHOST: return i18n.t('TYPE_GHOST');
    case Types.FIRE: return i18n.t('TYPE_FIRE');
    case Types.FAIRY: return i18n.t('TYPE_FAIRY');
    case Types.ICE: return i18n.t('TYPE_ICE');
    case Types.FIGHT: return i18n.t('TYPE_FIGHT');
    case Types.NORMAL: return i18n.t('TYPE_NORMAL');
    case Types.GRASS: return i18n.t('TYPE_GRASS');
    case Types.PSYCHIC: return i18n.t('TYPE_PSYCHIC');
    case Types.ROCK: return i18n.t('TYPE_ROCK');
    case Types.DARK: return i18n.t('TYPE_DARK');
    case Types.GROUND: return i18n.t('TYPE_GROUND');
    case Types.POISON: return i18n.t('TYPE_POISON');
    case Types.FLY: return i18n.t('TYPE_FLY');
    default: return '';
  }
};


const buildResultBox = (key: string, type: Types) => {
  const classes = `result-box ${Types[type].toLocaleLowerCase()}`;
  return <span key={`${key}${type}`} className={classes}><strong>{localizeType(type)}</strong></span>;
}


export const TypesForAttack: React.FC<{ type: Types }> = ({ type }: { type: Types }) => {

  const { t } = useTranslation();

  if (type < 0) return null;

  const { x2, x1, x05, x0 } = Calculator.getForAttack(type);
  return (
    <div className='result-container'>

      {
        x2.length > 0
          ? (
            <>
              <p>{t('DEALS_2X_LBL')}</p>
              <div className='result-group'>
                {x2.map(t => buildResultBox('x2', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x1.length > 0
          ? (
            <>
              <p>{t('DEALS_1X_LBL')}</p>
              <div className='result-group'>
                {x1.map(t => buildResultBox('x1', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x05.length > 0
          ? (
            <>
              <p>{t('DEALS_05X_LBL')}</p>
              <div className='result-group'>
                {x05.map(t => buildResultBox('x05', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x0.length > 0
          ? (
            <>
              <p>{t('DEALS_0X_LBL')}</p>
              <div className='result-group'>
                {x0.map(t => buildResultBox('x0', t))}
              </div>
            </>
          )
          : null
      }
      
    </div>
  );
}

export const TypesForDefense: React.FC<{ primaryType: Types, secondaryType?: Types }> = ({ primaryType, secondaryType }: { primaryType: Types, secondaryType?: Types }) => {

  const { t } = useTranslation();

  if (primaryType < 0) return null;

  const { x4, x2, x1, x05, x025, x0 } = Calculator.getForDefense(primaryType, secondaryType ? secondaryType : -1);
  return (
    <div className='result-container'>
      {
        x4.length > 0
          ? (
            <>
              <p>{t('TAKES_4X_LBL')}</p>
              <div className='result-group'>
                {x4.map(t => buildResultBox('dx4', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x2.length > 0
          ? (
            <>
              <p>{t('TAKES_2X_LBL')}</p>
              <div className='result-group'>
                {x2.map(t => buildResultBox('dx2', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x1.length > 0
          ? (
            <>
              <p>{t('TAKES_1X_LBL')}</p>
              <div className='result-group'>
                {x1.map(t => buildResultBox('dx1', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x05.length > 0
          ? (
            <>
              <p>{t('TAKES_05X_LBL')}</p>
              <div className='result-group'>
                {x05.map(t => buildResultBox('dx05', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x025.length > 0
          ? (
            <>
              <p>{t('TAKES_025X_LBL')}</p>
              <div className='result-group'>
                {x025.map(t => buildResultBox('dx025', t))}
              </div>
            </>
          )
          : null
      }
      
      {
        x0.length > 0
          ? (
            <>
              <p>{t('TAKES_0X_LBL')}</p>
              <div className='result-group'>
                {x0.map(t => buildResultBox('dx0', t))}
              </div>
            </>
          )
          : null
      }
      
    </div>
  );
}
