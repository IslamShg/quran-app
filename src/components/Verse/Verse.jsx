import React, { useEffect, useRef, useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'

import styles from './verse.module.scss'
import { AUDIOS_URL } from '../../api'

const Verse = ({
  verse: {
    words,
    verse_key,
    audio: { url },
    id,
  },
  audios,
  setAudios,
}) => {
  const [playing, setPlaying] = useState(false)
  const audio = useRef(new Audio(AUDIOS_URL + url))

  const playVerse = () => {
    if (playing) {
      setPlaying(false)
      return audio.current.pause()
    }

    audios.forEach(({ audio }) => audio.current.pause())
    setAudios((prev) => [...prev])
    setPlaying(true)
    audio.current.play()
  }

  useEffect(() => {
    if (!audios.length) return

    const { audio } = audios.find((audio) => audio.id === id)
    if (audio.current.paused) setPlaying(false)
  }, [audios, id])

  useEffect(() => {
    setAudios((prev) => [...prev, { id, audio }])
    audio.current.addEventListener('ended', () => setPlaying(false))
    return () =>
      audio.current.removeEventListener('ended', () => setPlaying(false))
  }, [audio, id, setAudios])

  return (
    <div className={styles.verse}>
      <div className={styles.verseHeader}>
        <span className={styles.verseNumber}>{verse_key}</span>
        <span className={styles.verseArabicText}>
          {words.map((word) => ' ' + word.text)}
        </span>
      </div>

      <div className={styles.verseBody}>
        {words.map((word, index) =>
          index === words.length - 1 ? '.' : ' ' + word.translation.text
        )}
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

export default React.memo(Verse)
