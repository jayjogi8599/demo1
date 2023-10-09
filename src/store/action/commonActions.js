// commonActions.js
export const CREATE_COMMON = 'CREATE_ROLE';
export const EDIT_COMMON = 'EDIT_ROLE';
export const DELETE_COMMON = 'DELETE_ROLE';
export const RESET_STORE = 'RESET_STORE';

export const CREATE_USER = 'RESET_STORE';
export const EDIT_USER = 'EDIT_USER'; 

export const createUser = (sliceName, user,userPermission) => ({
  type: CREATE_USER,
  payload: { sliceName, user,userPermission },
});

export const createCommon = (sliceName, id, name) => ({
  type: CREATE_COMMON,
  payload:  { sliceName, item: { id, name } },
});


export const editUser = (sliceName, userId, updatedUserData) => ({
  type: EDIT_USER,
  payload: { sliceName, userId, updatedUserData },
});

export const editCommon = (sliceName, id, changes={}) => ({
 
  type: EDIT_COMMON,
  payload:{ sliceName, id, changes  },
  
});

export const deleteCommon = (sliceName, id) => ({
  type: DELETE_COMMON,
  payload: { sliceName, id },
});

export const resetStoreAction = () => ({
  type: RESET_STORE,
});