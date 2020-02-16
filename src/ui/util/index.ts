import i18n from 'i18next';

import { Types } from '../../calculator';

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
		case Types.FLYING: return i18n.t('TYPE_FLY');
		default: return i18n.t('TYPE_NONE');
	}
};

export function hashCode(s: string) {
    let h: number = 0;
    for(let i = 0; i < s.length; i++) 
          h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}

export function padWithZero(n: number) {
	const zeros = 3 - n.toString().length;
	let res = '';

	for (let i = 0; i < zeros; i++) {
		res += '0';
	}

	return res + n.toString();
}