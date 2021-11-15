import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'

import { ChaptersActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'
import Verse from '../../components/Verse/Verse'

const Chapters = () => {
  const [audios, setAudios] = useState([])
  const [pausedAudioId, setPausedAudioId] = useState(true)
  const mount = useRef(true)

  const { fetchChapters, fetchVersesByChapter } = ChaptersActionCreators()
  const { chapters, status, chapterVerses, pagination, versesStatus } =
    useSelector((s) => s.chapters)
  const { lang } = useSelector((s) => s.common)

  const { chapterId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')

  useEffect(() => {
    if (mount.current && chapters.length) mount.current = false
    else {
      fetchChapters({ lang })
      mount.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    fetchVersesByChapter({
      id: chapterId,
      lang,
      page,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, lang, page])

  useEffect(() => {
    setSearchParams({ page: 1 })
  }, [setSearchParams])

  return status === 'completed' ? (
    <div className={styles.container}>
      <div className={styles.chaptersContainer}>
        {chapters.map((chapter) => (
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
        {versesStatus === 'completed'
          ? chapterVerses.map((verse) => (
              <Verse
                audios={audios}
                setAudios={setAudios}
                key={verse.id}
                verse={verse}
                pausedAudioId={pausedAudioId}
                setPausedAudioId={setPausedAudioId}
              />
            ))
          : 'Loading'}

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
