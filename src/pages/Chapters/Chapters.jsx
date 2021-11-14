import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { MainActionCreators } from './features/ChaptersSlice'
import styles from './chapters.module.scss'

const Chapters = () => {
  const { chapterId } = useParams()
  const { fetchChapters, fetchVersesByChapter } = MainActionCreators()
  const { chapters, status, chapterVerses } = useSelector((s) => s.chapters)
  const { lang } = useSelector((s) => s.common)
  const selectedChapter = chapters[chapterId - 1]
  console.log(selectedChapter)

  useEffect(() => {
    fetchChapters({ lang })
  }, [lang])

  useEffect(() => {
    fetchVersesByChapter({ id: chapterId, lang })
  }, [chapterId, lang])

  return status === 'completed' ? (
    <div className={styles.container}>
      <div className={styles.chaptersContainer}>
        Суры
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <Link to={`/chapters/${chapter.id}`}>{chapter.name_simple}</Link>
          </div>
        ))}
      </div>

      <div className={styles.versesContainer}>
        <h1>{selectedChapter.translated_name.name}</h1>
        {chapterVerses.map((verse) => (
          <div key={verse.id}>
            {verse.words.map((word) => ' ' + word.translation.text)}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  )
}

export default Chapters
