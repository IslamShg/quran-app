import { configureStore } from '@reduxjs/toolkit'
import { chaptersSlice } from '../pages/Chapters/features/ChaptersSlice'
import { commonSlice } from './commonSlice'

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    chapters: chaptersSlice.reducer,
  },
})
