import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '../../components/Header/Header'

import Chapters from '../Chapters/Chapters'
import styles from './main.module.scss'
import NavMenu from '../../components/NavMenu/NavMenu'

const Main = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <NavMenu />

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
