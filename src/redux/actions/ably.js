export const setAblyInstance = (ablyInstance) => ({
  type: 'SET_ABLY_INSTANCE',
  ablyInstance,
});

export const setPrivateRoom = (room) => ({
  type: 'SET_PRIVATE_ROOM',
  room,
});

export const setMember = (member) => ({
  type: 'SET_MEMBER_TO_LIST',
  member,
});

export const deleteMember = (member) => ({
  type: 'DELETE_MEMBER_TO_LIST',
  member,
});

export const setUserBadge = (clientId) => {
  return {
    type: 'SET_BADGE_TO_USER',
    clientId,
  };
};

export const deleteUserBadge = (clientId) => ({
  type: 'DELETE_BADGE_TO_USER',
  clientId,
});
