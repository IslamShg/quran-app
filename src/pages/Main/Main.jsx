import React from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Header from '../../components/Header/Header'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import FavoriteIcon from '@mui/icons-material/Favorite'

import Chapters from '../Chapters/Chapters'
import styles from './main.module.scss'

const Main = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <nav className={styles.sidebarMenu}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            to='/'
          >
            <ImportContactsIcon className={styles.icon} />
          </NavLink>
          <NavLink
            to='/savedAyahs'
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <FavoriteIcon className={styles.icon} />
          </NavLink>
        </nav>

        <div className={styles.content}>
          <Routes>
            <Route path='/chapters/:chapterId' element={<Chapters />} />
            <Route path='savedAyahs' element={<div>Сохраненные аяты</div>} />
            <Route path='*' element={<Navigate to='/chapters/1' />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Main
