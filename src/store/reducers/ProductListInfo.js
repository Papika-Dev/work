export default (state = {
  maxOnPage: 16,
  pageNum: 1,
  sort: 'created_at',
  incDec: 'ASC',
  search: '',
}, action) => {
  switch (action.type) {
  case 'SET_INFO':
    return {
      ...state,
      length: action.payload.length,
      maxCount: action.payload.maxCount,
    };
  case 'SET_All_TITLES':
    return { ...state, headers: action.payload };
  case 'SET_NUM_OF_PAGE':
    return {
      ...state,
      pageNum: action.payload,
    };
  case 'SEARCH_TEXT':
    return { ...state, search: action.payload };
  case 'SORT_INC_DEC':
    return { ...state, incDec: action.payload };
  case 'SET_SORT_TYPE':
    return { ...state, sort: action.payload };
  default:
    return state;
  }
};
