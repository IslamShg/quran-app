import React, { useEffect, useMemo, useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'

import styles from './verse.module.scss'
import { AUDIOS_URL } from '../../api'

const Verse = ({
  verse: {
    words,
    verse_key,
    audio: { url },
  },
}) => {
  const [playing, setPlaying] = useState(false)
  const audio = useMemo(() => new Audio(AUDIOS_URL + url), [url])

  const playVerse = () => {
    if (playing) {
      setPlaying(false)
      return audio.pause()
    }
    setPlaying(true)
    audio.play()
  }

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => audio.removeEventListener('ended', () => setPlaying(false))
  }, [audio])

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

export default Verse
