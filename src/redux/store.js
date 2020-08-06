import { createStore, combineReducers } from 'redux';
import {
  AblyInstanceR,
  PrivatChatRoomR,
  UserListR,
  UserBadgeR,
} from './reducers/ably';

const reducers = combineReducers({
  ablyInstance: AblyInstanceR,
  privateChatRoom: PrivatChatRoomR,
  userList: UserListR,
  userBadgeList: UserBadgeR,
});

const store = createStore(reducers);

export default store;
