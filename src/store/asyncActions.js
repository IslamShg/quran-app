import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuranApiInstance } from '../api'

const fetchReciters = createAsyncThunk('common/fetchReciters', async () => {
  const { data } = await QuranApiInstance('resources/recitations?language=en')
  return data.recitations
})

export const asyncActionCreators = { fetchReciters }
