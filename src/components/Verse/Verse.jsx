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
  pausedAudioId,
  setPausedAudioId,
}) => {
  const [playing, setPlaying] = useState(false)
  const audio = useRef(new Audio(AUDIOS_URL + url))

  const playVerse = () => {
    if (playing) {
      setPlaying(false)
      return audio.current.pause()
    }

    audios.forEach(({ id, audio }) => {
      if (!audio.current.paused) {
        audio.current.pause()
        setPausedAudioId(id)
      }
    })
    setPlaying(true)
    audio.current.play()
  }

  useEffect(() => {
    if (pausedAudioId === id) setPlaying(false)
  }, [pausedAudioId, id])

  useEffect(() => {
    const { current } = audio
    setAudios((prev) => [...prev, { id, audio }])

    current.addEventListener('ended', () => setPlaying(false))
    return () => {
      current.pause()
      current.removeEventListener('ended', () => setPlaying(false))
    }
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
