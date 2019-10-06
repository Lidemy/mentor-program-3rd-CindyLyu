import * as ActionTypes from './actionTypes';

const state = {
  postList: [],
  post: {},
  error: '',
  isLoadingGetPostList: false,
  isLoadingGetPost: false,
  isLoadingDeletePost: false,
  isLoadingCreatePost: false,
  isLoadingUpdatePost: false,
};

const reducer = (globalState = state, action) => {
  switch (action.type) {
    case ActionTypes.GET_POST_LIST_PENDING:
      return {
        ...globalState,
        isLoadingGetPostList: true,
      };
    case ActionTypes.GET_POST_LIST_FULFILLED:
      return {
        ...globalState,
        isLoadingGetPostList: false,
        postList: action.payload.data,
      };
    case ActionTypes.GET_POST_LIST_REJECTED:
      return {
        ...globalState,
        isLoadingGetPostList: false,
        error: action.payload,
      };
    case ActionTypes.GET_POST_PENDING:
      return {
        ...globalState,
        isLoadingGetPost: true,
        post: {}, // 如果有資料時，讓在更新中途不會先顯示舊資料
      };
    case ActionTypes.GET_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingGetPost: false,
        post: action.payload.data,
      };
    case ActionTypes.DELETE_POST_PENDING:
      return {
        ...globalState,
        isLoadingDeletePost: true,
      };
    case ActionTypes.DELETE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingDeletePost: false,
      };
    case ActionTypes.DELETE_POST_REJECTED:
      return {
        ...globalState,
        isLoadingDeletePost: false,
        error: action.payload,
      };
    case ActionTypes.CREATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingCreatePost: true,
      };
    case ActionTypes.CREATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingCreatePost: false,
      };
    case ActionTypes.CREATE_POST_REJECTED:
      return {
        ...globalState,
        isLoadingCreatePost: false,
        error: action.payload,
      };
    case ActionTypes.UPDATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingUpdatePost: true,
      };
    case ActionTypes.UPDATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingUpdatePost: false,
      };
    case ActionTypes.UPDATE_POST_REJECTED:
      return {
        ...globalState,
        isLoadingUpdatePost: false,
        error: action.payload,
      };
    default:
      return globalState;
  }
};

export default reducer;
