import { put, select } from 'redux-saga/effects'
import BookmarkActions from '../Redux/BookmarkRedux'

export const getBookmark = (state) => state.bookmark.data

export function * setBookmark (action) {
  const { data, order = '' } = action
  let bookmarkState = yield select(getBookmark)
  let bookmark = [data]
  if (bookmarkState) {
    bookmark = [...bookmarkState]
    var index = bookmark.indexOf(data)
    if (index !== -1) bookmark.splice(index, 1)
    if (order !== 'remove') bookmark = [data, ...bookmark]
  }
  yield put(BookmarkActions.bookmarkSuccess(bookmark))
}
