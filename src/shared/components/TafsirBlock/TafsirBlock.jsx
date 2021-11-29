import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { ChaptersActionCreators } from '../../../pages/Chapters/features/ChaptersSlice'
import styles from './tafsirBlock.module.scss'

const TafsirBlock = ({ versesRef }) => {
  const { selectedVerse, tafsir, tafsirStatus } = useSelector((s) => s.chapters)
  const { selectVerse, fetchSingleTafsir, setTafsir } = ChaptersActionCreators()
  const { verse_key, words } = selectedVerse

  useEffect(() => {
    versesRef.current.scrollTo(0, 0)

    fetchSingleTafsir({ verse_key: selectedVerse.verse_key })
    return () => setTafsir(null)
  }, [])

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
        {tafsirStatus === 'success' ? (
          <span
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tafsir) }}
            className={styles.tafsirsText}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default TafsirBlock
