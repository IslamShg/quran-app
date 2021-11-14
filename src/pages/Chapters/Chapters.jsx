import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'

import { MainActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'
import Verse from '../../components/Verse/Verse'

const Chapters = () => {
  const { chapterId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchChapters, fetchVersesByChapter } = MainActionCreators()
  const { chapters, status, chapterVerses, pagination } = useSelector(
    (s) => s.chapters
  )
  const { lang } = useSelector((s) => s.common)
  const page = searchParams.get('page')

  useEffect(() => {
    fetchChapters({ lang })
  }, [lang])

  useEffect(() => {
    fetchVersesByChapter({
      id: chapterId,
      lang,
      page,
    })
  }, [chapterId, lang, searchParams])

  useEffect(() => {
    setSearchParams({ page: 1 })
  }, [setSearchParams])

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
            to={`/chapters/${chapter.id}?page=1`}
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
          <Verse key={verse.id} verse={verse} />
        ))}

        {!!pagination.next_page && (
          <span onClick={() => setSearchParams({ page: +page + 1 })}>
            Загрузить еще
          </span>
        )}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  )
}

export default Chapters
