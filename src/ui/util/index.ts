import i18n from 'i18next';

import { Types } from '../../calc';

export interface IScrollableTo {
	scrollToThis: () => void;
}

export const scrollToRef = (ref: React.RefObject<IScrollableTo>) => setTimeout(() => ref.current!.scrollToThis(), 100);


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
		default: return i18n.t('TYPE_NONE');
	}
};