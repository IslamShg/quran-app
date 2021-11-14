import React from 'react'

import { CommonActionCreators } from '../../store/commonSlice'
import styles from './header.module.scss'

const Header = () => {
  const { setLang } = CommonActionCreators()

  const setSiteLang = (lang) => {
    setLang(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <div className={styles.container}>
      <span>Quran</span>
      <div className={styles.changeLangBlock}>
        <span onClick={() => setSiteLang('ru')}>RU</span> |{' '}
        <span onClick={() => setSiteLang('en')}>EN</span>
      </div>
    </div>
  )
}

export default Header
