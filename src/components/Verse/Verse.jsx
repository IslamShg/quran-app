import React from 'react'

import styles from './verse.module.scss'

const Verse = ({ verse: { words, verse_key, id } }) => {
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

      <div className={styles.verseFooter}></div>
    </div>
  )
}

export default Verse
