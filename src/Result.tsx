import * as React from 'react';
import i18n, { TFunction } from 'i18next';

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
    case Types.FIGHTING: return i18n.t('TYPE_FIGHT');
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


const ResultType: React.FC<{ resultType: string, resultKey: string, type: Types }> = ({ resultType, resultKey, type }: { resultType: string, resultKey: string, type: Types }) => {
  const classes = `result-box ${Types[type].toLocaleLowerCase()}`;
  return <span key={`${resultType}_${resultKey}_${type}`} className={classes}><strong>{localizeType(type)}</strong></span>;
}

const ResultElements: React.FC<{ resultType: string, title: string, elements: number[] }> = ({ resultType, title, elements }: { resultType: string, title: string, elements: number[] }) => {

  if (elements.length <= 0) return null;

  return (
    <>
      <p>{title}</p>
      <div className='result-group'>
        {elements.map(el => <ResultType key={title} resultType={resultType} resultKey={title} type={el} />)}
      </div>
    </>
  );
}


type ResultProps = {
  primaryType: Types;
  secondaryType?: Types;
  t: TFunction;
};

class Result extends React.Component<ResultProps> {

  private ref = React.createRef<HTMLDivElement>();

  scrollToThis = () => {
    this.ref && this.ref.current && this.ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  render() {
    const { primaryType, secondaryType, t } = this.props;

    if (primaryType < 0) return null;

    const results = secondaryType !== undefined
      ? Calculator.getForDefense(primaryType, secondaryType)
      : Calculator.getForAttack(primaryType);

    return (
      <div ref={this.ref} className='result-container'>
        {
          secondaryType !== undefined
            ? (
              <>
                <ResultElements title={t('TAKES_4X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x4} />
                <ResultElements title={t('TAKES_2X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x2} />
                <ResultElements title={t('TAKES_1X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x1} />
                <ResultElements title={t('TAKES_05X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x05} />
                <ResultElements title={t('TAKES_025X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x025} />
                <ResultElements title={t('TAKES_0X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x0} />
              </>
            )
            : (
              <>
                <ResultElements title={t('DEALS_2X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x2} />
                <ResultElements title={t('DEALS_1X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x1} />
                <ResultElements title={t('DEALS_05X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x05} />
                <ResultElements title={t('DEALS_0X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x0} />
              </>
            )
        }
      </div>
    );  
  }

}

// const Result: React.FC<ResultProps> = ({ primaryType, secondaryType }: ResultProps) => {

//   const { t } = useTranslation();

//   if (primaryType < 0) return null;

//   const results = secondaryType !== undefined
//     ? Calculator.getForDefense(primaryType, secondaryType)
//     : Calculator.getForAttack(primaryType);

//   return (
//     <div className='result-container'>
//       {
//         secondaryType !== undefined
//           ? (
//             <>
//               <ResultElements title={t('TAKES_4X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x4} />
//               <ResultElements title={t('TAKES_2X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x2} />
//               <ResultElements title={t('TAKES_1X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x1} />
//               <ResultElements title={t('TAKES_05X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x05} />
//               <ResultElements title={t('TAKES_025X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x025} />
//               <ResultElements title={t('TAKES_0X_LBL')} resultType='defense' elements={(results as Calculator.ForDefenseResult).x0} />
//             </>
//           )
//           : (
//             <>
//               <ResultElements title={t('DEALS_2X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x2} />
//               <ResultElements title={t('DEALS_1X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x1} />
//               <ResultElements title={t('DEALS_05X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x05} />
//               <ResultElements title={t('DEALS_0X_LBL')} resultType='attack' elements={(results as Calculator.ForAttackResult).x0} />
//             </>
//           )
//       }
//     </div>
//   );
// };

export default Result;