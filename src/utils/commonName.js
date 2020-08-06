const commonRoomName = (...names) =>
  names.sort((a, b) => (a === b ? 0 : (a < b && -1) || (a > b && 1))).join('-');

export default commonRoomName;
