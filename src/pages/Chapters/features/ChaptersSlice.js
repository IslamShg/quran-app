import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { asyncActionCreators } from './asyncActions'

const { fetchChapters, fetchVersesByChapter } =
  asyncActionCreators

const initialState = {
  chapters: [],
  status: 'idle',
  versesStatus: 'idle',
  pagination: {
    per_page: 50,
    total_records: null,
    total_pages: null,
    next_page: null,
  },
  chapterVerses: [],
  tajweedChapterVerses: []
}

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChaptersList(state, action) {
      state.chapters = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(fetchChapters.fulfilled, (state, { payload }) => {
      state.chapters = payload
      state.status = 'completed'
    })
    builder.addCase(fetchVersesByChapter.pending, (state) => {
      state.versesStatus = 'pending'
    })
    builder.addCase(fetchVersesByChapter.fulfilled, (state, { payload }) => {
      state.chapterVerses =
        +payload.page === 1
          ? payload.verses
          : [...state.chapterVerses, ...payload.verses]

      state.pagination = {
        ...state.pagination,
        total_records: payload.pagination.total_records,
        total_pages: payload.pagination.total_pages,
        next_page: payload.pagination.next_page,
      }
      state.versesStatus = 'completed'
    })
  },
})

export const ChaptersActionCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    { ...chaptersSlice.actions, ...asyncActionCreators },
    dispatch
  )
}
