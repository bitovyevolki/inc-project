import { del, get, set } from 'idb-keyval'

export const setIndexedDBItem = (key: string, value: any) => {
  set(key, value)
    .then(val => console.log(val))
    .catch(err => console.log('It failed!', err))
}

export const getIndexedDBItem = (key: string) => {
  get(key)
    .then(val => console.log(val))
    .catch(err => console.log('It failed!', err))
}

export const removeIndexedDBItem = (key: string) => {
  del(key)
    .then(val => console.log(val))
    .catch(err => console.log('It failed!', err))
}
