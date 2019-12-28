export default (state = {
  maxOnPage: 16,
  pageNum: 1,
  sort: 'createdAt',
  incDec: 'ASC',
  search: '',
  category: '',
  priceFilter: {
    min: null,
    max: null,
  },
  sale: false,
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
  case 'SET_CATEGORY':
    return { ...state, category: action.payload };
  case 'SET_PRICE_FILTER':
    return {
      ...state,
      priceFilter: {
        min: action.payload.min,
        max: action.payload.max,
        sale: action.payload.sale,
      },
    };
  case 'SET_IS_SALE':
    return {
      ...state,
      sale: action.payload,
    };
  case 'SET_MAX_PRICE':
    return { ...state, maxPrice: action.payload };
  default:
    return state;
  }
};
