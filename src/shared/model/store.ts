import { useDispatch } from 'react-redux'

import { Action, Store, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makestore = () =>
  configureStore({
    devTools: true,
    reducer: {},
  })

export const wrapper = createWrapper<Store<AppState>>(makestore, { debug: true })

export type AppStore = ReturnType<typeof makestore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, any, unknown, Action>

export const useAppDispatch = () => useDispatch()
