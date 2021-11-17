import React, { useEffect, useMemo, useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { useSelector } from 'react-redux'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import styles from './verse.module.scss'
import { AUDIOS_URL } from '../../api'
import { ChaptersActionCreators } from '../../pages/Chapters/features/ChaptersSlice'

const Verse = ({
  verse,
  audios,
  setAudios,
  pausedAudioId,
  setPausedAudioId,
  versesRef,
}) => {
  const {
    words,
    verse_key,
    audio: { url },
    id,
  } = verse
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState()
  const audio = useMemo(() => new Audio(AUDIOS_URL + url), [url])

  const { setAutoPlayedAudId, selectVerse, setVersesScroll } =
    ChaptersActionCreators()
  const { autoPlayedAudioId } = useSelector((s) => s.chapters)

  useEffect(() => {
    if (pausedAudioId === id) setPlaying(false)
  }, [pausedAudioId, id])

  useEffect(() => {
    if (autoPlayedAudioId === id) playVerse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayedAudioId])

  useEffect(() => {
    setAudios((prev) => [...prev, { id, audio }])

    audio.addEventListener('ended', () => {
      setPlaying(false)
      setEnded(true)
    })
    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [audio, id, setAudios])

  const playVerse = () => {
    if (playing) {
      setPlaying(false)
      return audio.pause()
    }

    audios.forEach(({ id, audio }) => {
      if (!audio.paused) {
        audio.pause()
        setPausedAudioId(id)
      }
    })
    setPlaying(true)
    audio.play()
  }

  const playNext = () => {
    const idx = audios.findIndex((audio) => audio.id === id)
    const nextAudio = idx + 1 === audios.length ? null : audios[idx + 1]
    if (!nextAudio) return
    setAutoPlayedAudId(nextAudio.id)
  }

  useEffect(() => {
    if (ended) {
      playNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended])

  return (
    <div
      className={!playing ? styles.verse : `${styles.verse} ${styles.active}`}
    >
      <div className={styles.verseHeader}>
        <span className={styles.verseNumber}>{verse_key}</span>
        <span className={styles.verseArabicText}>
          {words.map((word) => ' ' + word.text)}
        </span>
      </div>

      <div className={styles.verseBody}>
        <div
          onClick={() => {
            setVersesScroll(versesRef.current.scrollTop)
            selectVerse(verse)
            setAutoPlayedAudId(null)
          }}
          className={styles.tafseerLink}
          to=''
        >
          <span>SEE TAFSEER</span>
          <ArrowRightAltIcon className={styles.arrowIcon} />
        </div>
        <span className={styles.verseTranslation}>
          {words.map((word, index) =>
            index === words.length - 1 ? '.' : ' ' + word.translation.text
          )}
        </span>
      </div>

      <div className={styles.verseFooter}>
        <span onClick={playVerse}>
          {playing ? (
            <PauseCircleOutlineIcon className={styles.resumeVerseIcon} />
          ) : (
            <PlayCircleOutlineIcon className={styles.resumeVerseIcon} />
          )}
        </span>
      </div>
    </div>
  )
}

export default Verse
