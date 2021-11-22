/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { ChaptersActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'
import Verse from '../../components/Verse/Verse'
import ChaptersList from '../../components/ChaptersList/ChaptersList'
import TafsirBlock from '../../components/TafsirBlock/TafsirBlock'

const Chapters = () => {
  const [audios, setAudios] = useState([])
  const [pausedAudioId, setPausedAudioId] = useState(null)
  const mount = useRef(true)
  const versesRef = useRef()

  const { fetchChapters, fetchVersesByChapter, setVersesScroll } =
    ChaptersActionCreators()
  const {
    chapters,
    status,
    chapterVerses,
    pagination,
    versesStatus,
    selectedVerse,
    versesContainerScroll,
  } = useSelector((s) => s.chapters)
  const { lang, selectedReciterId } = useSelector((s) => s.common)

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

    return () => setVersesScroll(0)
  }, [lang])

  useEffect(() => {
    if (versesContainerScroll) {
      versesRef.current.scrollTo(0, versesContainerScroll)
    }
  }, [versesContainerScroll, selectedVerse])

  useEffect(() => {
    fetchVersesByChapter({
      id: chapterId,
      lang,
      page,
    })
  }, [chapterId, lang, page, selectedReciterId])

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
        {!selectedVerse ? (
          <>
            {chapterVerses.map((verse) => (
              <Verse
                audios={audios}
                setAudios={setAudios}
                key={verse.id}
                verse={verse}
                pausedAudioId={pausedAudioId}
                setPausedAudioId={setPausedAudioId}
                versesRef={versesRef}
              />
            ))}

            {versesStatus === 'loading' && <div>Загрузка</div>}
            {!!pagination.next_page && (
              <span onClick={() => setSearchParams({ page: +page + 1 })}>
                Загрузить еще
              </span>
            )}
          </>
        ) : (
          <TafsirBlock versesRef={versesRef} />
        )}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  )
}

export default Chapters
