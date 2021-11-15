import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './navChapter.module.scss'

const NavChapter = ({ chapter, setAudios }) => {
  const { lang } = useSelector((s) => s.common)

  return (
    <NavLink
      key={chapter.id}
      onClick={() => {
        setAudios([])
      }}
      className={({ isActive }) =>
        isActive
          ? `${styles.chapterLink} ${styles.active}`
          : `${styles.chapterLink}`
      }
      to={`/chapters/${chapter.id}?page=1`}
    >
      <div className={styles.chapter}>
        <span className={styles.chapterNumber}>{chapter.id}</span>
        <div className={styles.chapterInfo}>
          <span className={styles.chapterName}>{chapter.name_simple}</span>
          <span
            style={{
              textTransform: lang === 'en' ? 'uppercase' : 'none',
              fontSize: lang === 'en' ? '14px' : '16px',
            }}
            className={styles.chapterNameTranslated}
          >
            {chapter.translated_name.name}
          </span>
        </div>
      </div>
    </NavLink>
  )
}

export default React.memo(NavChapter)
