import * as React from 'react';

import classnames from 'classnames';
import Result from './Result';

import { IScrollableTo, localizeType, scrollToRef } from '../util';
import { Types } from '../../calculator';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';


type TabButtonsContainerProps = {
  title: string;
  type: Types;
  disableOnType?: Types;
  onTypeSelected?: (type: Types) => void;
};

class TabButtonsContainer extends React.Component<TabButtonsContainerProps> implements IScrollableTo {

  private ref = React.createRef<HTMLDivElement>();

  scrollToThis = () => {
    this.ref && this.ref.current && this.ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  render() {
    const { title, type, disableOnType, onTypeSelected } = this.props;

    const typesRange = Array.from(Array(18).keys());

    let buttons = typesRange.map(t => {
      const classes = ['type-button', Types[t].toLocaleLowerCase()];

      if (t === type)
        classes.push('selected');

      return <button key={t} className={classnames(classes)} disabled={disableOnType !== undefined && disableOnType === t} onClick={() => onTypeSelected && onTypeSelected(t)}>{localizeType(t)}</button>
    });

    if (disableOnType !== undefined) {
      const typeClass = `type-button ${type < 0 ? 'selected' : ''}`
      buttons = [<button key={-1} className={typeClass} onClick={() => onTypeSelected && onTypeSelected(-1)}>{localizeType(-1)}</button>].concat(buttons);
    }

    return (
      <div ref={this.ref}>
        <h5>{title}</h5>
        <div className='buttons-grid'>{buttons}</div>
      </div>
    );
  }
}


type AttackTabProps = {
  primaryType: Types;
  onPrimaryTypeSelected: (type: Types) => void;
};

export const AttackTab: React.FC<AttackTabProps> = ({ primaryType, onPrimaryTypeSelected }: AttackTabProps) => {

  const { t } = useTranslation();
  const ref = useRef(null);

  const onTypeSelected = (type: Types) => {
    onPrimaryTypeSelected(type);
    scrollToRef(ref);
  };

  return (
    <>
      <TabButtonsContainer title={t('PRIMARY_TYPE_LBL')} type={primaryType} onTypeSelected={onTypeSelected} />
      <Result ref={ref} t={t} primaryType={primaryType} />
    </>
  );
}


type DefenseTabProps = {
  primaryType: Types;
  secondaryType: Types;
  onPrimaryTypeSelected: (types: Types) => void;
  onSecondaryTypeSelected: (types: Types) => void;
};

export const DefenseTab: React.FC<DefenseTabProps> = ({ primaryType, secondaryType, onPrimaryTypeSelected, onSecondaryTypeSelected }: DefenseTabProps) => {
  const { t } = useTranslation();
  const secondaryTypeRef = useRef(null);
  const resultRef = useRef(null);

  const primaryTypeSelected = (type: Types) => {
    onPrimaryTypeSelected(type);
    scrollToRef(secondaryTypeRef);
  };

  const secondaryTypeSelected = (type: Types) => {
    onSecondaryTypeSelected(type);
    scrollToRef(resultRef);
  };

  return (
    <>
      <TabButtonsContainer title={t('PRIMARY_TYPE_LBL')} type={primaryType} onTypeSelected={primaryTypeSelected} />
      <TabButtonsContainer ref={secondaryTypeRef} title={t('SECONDARY_TYPE_LBL')} type={secondaryType} onTypeSelected={secondaryTypeSelected} disableOnType={primaryType} />
      <Result ref={resultRef} t={t} primaryType={primaryType} secondaryType={secondaryType} />
    </>
  );
}