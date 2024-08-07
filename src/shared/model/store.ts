import { useDispatch } from 'react-redux'

import { inctagramService } from '@/src/shared/model/inctagram.service'
import { Action, Store, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramService.middleware),
    reducer: {
      [inctagramService.reducerPath]: inctagramService.reducer,
    },
  })

export const wrapper = createWrapper<Store<AppState>>(makeStore, { debug: true })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, any, unknown, Action>

export const useAppDispatch = () => useDispatch()
