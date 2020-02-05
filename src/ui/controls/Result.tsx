import * as React from 'react';
import { TFunction } from 'i18next';

import * as Calculator from '../../calculator';

import { Types } from '../../calculator';
import { localizeType } from '../util';


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
    this.ref && this.ref.current && this.ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
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