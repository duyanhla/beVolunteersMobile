import { 
  USERNAME_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CATEGORY_CHANGED,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = { 
  username: '', 
  password: '',
  user: null,
  error: '',
  loading: false,
  selectedCategory: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload,};
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Thông tin đăng nhập không đúng.', loading: false};
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT_USER:
      return { ...state};
    case CATEGORY_CHANGED:
      return { ...state, selectedCategory: action.payload, loading: false};
    default:
      return state;
  }
};