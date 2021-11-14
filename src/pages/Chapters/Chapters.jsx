import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

import { MainActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'

const Chapters = () => {
  const { chapterId } = useParams()
  const { fetchChapters, fetchVersesByChapter } = MainActionCreators()
  const { chapters, status, chapterVerses } = useSelector((s) => s.chapters)
  const { lang } = useSelector((s) => s.common)

  useEffect(() => {
    fetchChapters({ lang })
  }, [lang])

  useEffect(() => {
    fetchVersesByChapter({ id: chapterId, lang })
  }, [chapterId, lang])

  return status === 'completed' ? (
    <div className={styles.container}>
      <div className={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <NavLink
            key={chapter.id}
            className={({ isActive }) =>
              isActive
                ? `${styles.chapterLink} ${styles.active}`
                : `${styles.chapterLink}`
            }
            to={`/chapters/${chapter.id}`}
          >
            <div className={styles.chapter}>
              <span className={styles.chapterNumber}>{chapter.id}</span>
              <div className={styles.chapterInfo}>
                <span className={styles.chapterName}>
                  {chapter.name_simple}
                </span>
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
        ))}
      </div>

      <div className={styles.versesContainer}>
        {chapterVerses.map((verse) => (
          <div className={styles.verse} key={verse.id}>
            {verse.words.map((word) => ' ' + word.translation.text)}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  )
}

export default Chapters
