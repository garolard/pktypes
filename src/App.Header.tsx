import * as React from 'react';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();

  return (
      <header className='app-header'>
      <h1>{t('TITLE_LBL')}</h1>
      </header>
  );
}