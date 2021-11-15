import React from 'react'
import NavChapter from '../NavChapter/NavChapter'

const ChaptersList = ({ chapters, setAudios }) => (
  <>
    {chapters.map((chapter) => (
      <NavChapter key={chapter.id} chapter={chapter} setAudios={setAudios} />
    ))}
  </>
)

export default React.memo(ChaptersList)
