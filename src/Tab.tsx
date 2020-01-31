import * as React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import Result, { localizeType } from './Result';
import { Types } from './Calc';

type TabButtonsContainerProps = {
	title: string;
	type: Types;
	disableOnType?: Types;
	onTypeSelected?: (type: Types) => void;
};

const TabButtonsContainer: React.FC<TabButtonsContainerProps> = ({ title, type, disableOnType, onTypeSelected }: TabButtonsContainerProps) => {
	const typesRange = Array.from(Array(18).keys());
	let buttons = typesRange.map(t => {
		const classes = ['type-button', Types[t].toLocaleLowerCase()];

		if (t === type)
			classes.push('selected');

		return <button key={t} className={classnames(classes)} disabled={disableOnType !== undefined && disableOnType === t} onClick={() => onTypeSelected && onTypeSelected(t)}>{localizeType(t)}</button>
	});

	if (disableOnType !== undefined) {
		const typeClass = `type-button ${type < 0 ? 'selected' : ''}`
		buttons = [<button key={-1} className={typeClass} onClick={() => onTypeSelected && onTypeSelected(-1)}>Ninguno</button>].concat(buttons);
	}

	return (
		<div>
			<h5>{title}</h5>
			<div className='buttons-grid'>{buttons}</div>
		</div>
	);
}


type AttackTabProps = {
	primaryType: Types;
	onPrimaryTypeSelected: (type: Types) => void;
};

export const AttackTab: React.FC<AttackTabProps> = ({ primaryType, onPrimaryTypeSelected }: AttackTabProps) => {

	const { t } = useTranslation();

	return (
		<>
			<TabButtonsContainer title={t('PRIMARY_TYPE_LBL')} type={primaryType} onTypeSelected={onPrimaryTypeSelected} />
			<Result primaryType={primaryType} />
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

	return (
		<>
			<TabButtonsContainer title={t('PRIMARY_TYPE_LBL')} type={primaryType} onTypeSelected={onPrimaryTypeSelected} />
			<TabButtonsContainer title={t('SECONDARY_TYPE_LBL')} type={secondaryType} onTypeSelected={onSecondaryTypeSelected} disableOnType={primaryType} />
			<Result primaryType={primaryType} secondaryType={secondaryType} />
		</>
	);
}