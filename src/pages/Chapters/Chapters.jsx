import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { ChaptersActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'
import Verse from '../../components/Verse/Verse'
import ChaptersList from '../../components/ChaptersList/ChaptersList'

const Chapters = () => {
  const [audios, setAudios] = useState([])
  const [pausedAudioId, setPausedAudioId] = useState(true)
  const mount = useRef(true)
  const versesRef = useRef()

  const { fetchChapters, fetchVersesByChapter } = ChaptersActionCreators()
  const { chapters, status, chapterVerses, pagination, versesStatus } =
    useSelector((s) => s.chapters)
  const { lang } = useSelector((s) => s.common)

  const { chapterId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')

  useEffect(() => {
    versesRef.current && versesRef.current.scrollTo(0, 0)
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
        <ChaptersList
          versesRef={versesRef}
          chapters={chapters}
          setAudios={setAudios}
        />
      </div>

      <div ref={versesRef} className={styles.versesContainer}>
        {chapterVerses.map((verse) => (
          <Verse
            audios={audios}
            setAudios={setAudios}
            key={verse.id}
            verse={verse}
            pausedAudioId={pausedAudioId}
            setPausedAudioId={setPausedAudioId}
          />
        ))}
        {versesStatus === 'loading' && <div>Загрузка</div>}

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
