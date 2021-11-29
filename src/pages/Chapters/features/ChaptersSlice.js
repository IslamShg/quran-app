import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { asyncActionCreators } from './asyncActions'

const { fetchChapters, fetchVersesByChapter, fetchSingleTafsir } =
  asyncActionCreators

const initialState = {
  chapters: [],
  status: 'idle',
  versesStatus: 'idle',
  pagination: {
    per_page: 25,
    total_records: null,
    total_pages: null,
    next_page: null,
  },
  chapterVerses: [],
  tajweedChapterVerses: [],
  autoPlayedAudioId: null,
  selectedVerse: null,
  versesContainerScroll: null,
  tafsir: null,
  tafsirStatus: 'idle',
}

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChaptersList(state, { payload }) {
      state.chapters = payload
    },
    setAutoPlayedAudId(state, { payload }) {
      state.autoPlayedAudioId = payload
    },
    selectVerse(state, { payload }) {
      state.selectedVerse = payload
    },
    setVersesScroll(state, { payload }) {
      state.versesContainerScroll = payload
    },
    setTafsir(state, { payload }) {
      state.tafsir = payload
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
    builder.addCase(fetchSingleTafsir.pending, (state) => {
      state.tafsirStatus = 'loading'
    })
    builder.addCase(fetchSingleTafsir.fulfilled, (state, { payload }) => {
      state.tafsir = payload
      state.tafsirStatus = 'success'
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
