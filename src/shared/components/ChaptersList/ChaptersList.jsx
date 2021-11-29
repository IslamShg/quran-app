import React from 'react'
import NavChapter from '../NavChapter/NavChapter'

const ChaptersList = ({ chapters, setAudios, versesRef }) => (
  <>
    {chapters.map((chapter) => (
      <NavChapter
        versesRef={versesRef}
        key={chapter.id}
        chapter={chapter}
        setAudios={setAudios}
      />
    ))}
  </>
)

export default React.memo(ChaptersList)
