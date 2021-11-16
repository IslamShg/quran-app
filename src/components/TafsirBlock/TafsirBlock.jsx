import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { ChaptersActionCreators } from '../../pages/Chapters/features/ChaptersSlice'
import styles from './tafsirBlock.module.scss'

const TafsirBlock = ({ versesRef }) => {
  const selectedVerse = useSelector((s) => s.chapters.selectedVerse)
  const { selectVerse } = ChaptersActionCreators()
  const { verse_key, words, tafsirs } = selectedVerse
  const tafsirText = tafsirs[0]?.text

  useEffect(() => {
    versesRef.current.scrollTo(0, 0)
  }, [versesRef])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <KeyboardBackspaceIcon
          className={styles.backIcon}
          onClick={() => {
            selectVerse(null)
          }}
        />
        <div className={styles.headerBottom}>
          <span className={styles.verseNumber}>{verse_key}</span>
          <span className={styles.verseArabicText}>
            {words.map((word) => ' ' + word.text)}
          </span>
        </div>
      </div>

      <span className={styles.verseTranslation}>
        {words.map((word, index) =>
          index === words.length - 1 ? '.' : ' ' + word.translation.text
        )}
      </span>

      <div className={styles.tafsirBlock}>
        <span className={styles.title}>Verse Tafsir:</span>
        <span
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tafsirText) }}
          className={styles.tafsirsText}
        />
      </div>
    </div>
  )
}

export default TafsirBlock
