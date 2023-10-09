import {
  CREATE_USER,
  CREATE_COMMON,
  EDIT_USER,
  EDIT_COMMON,
  DELETE_COMMON,
  RESET_STORE,
 
} from "../action/commonActions";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("commonData");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading data from localStorage:", err);
    return undefined;
  }
};

const initialState = loadFromLocalStorage() || {
  roles: [],
  modules: [],
  designations: [],
  pagesone: [],
  manageUser: []
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMON:
      const { sliceName, item } = action.payload;

      const newStateCreate = {
        ...state,
        [sliceName]: [...state[sliceName], item],
      };

      localStorage.setItem("commonData", JSON.stringify(newStateCreate));
      return newStateCreate;

    case CREATE_USER:
      const { sliceName: userSliceName, user,userPermission  } = action.payload;
      const userStateCreate = {
        ...state,
        [userSliceName]: [...state[userSliceName], user], 
        manageUser: {
          ...state.manageUser,
          userPermission: userPermission, 
        },
      };

      localStorage.setItem("commonData", JSON.stringify(userStateCreate));
      return userStateCreate;

    case EDIT_USER:
      const {
        sliceName: editSliceName,
        userId,
        updatedUserData,
      } = action.payload;
      const userIndexToEdit = state[editSliceName].findIndex(
        (user) => user.id === userId
      );

      if (userIndexToEdit === -1) {
        
        return state;
      }
      
      const updatedUserArray = [...state[editSliceName]];
      updatedUserArray[userIndexToEdit] = {
        ...updatedUserArray[userIndexToEdit],
        ...updatedUserData,
      };

      const editedState = {
        ...state,
        [editSliceName]: updatedUserArray,
      };

      
      localStorage.setItem("commonData", JSON.stringify(editedState));

      return editedState;

    case EDIT_COMMON:
      const { sliceName: editedSliceName, id, changes } = action.payload;
      const { name = "", moduleName = "",moduleId = "" } = changes;// Destructure name and moduleName
      const newStateEdit = {
        ...state,
        [editedSliceName]: state[editedSliceName].map((item) =>
          item.id === id ? { ...item, name, moduleName,moduleId  } : item
        ),
      };
      localStorage.setItem("commonData", JSON.stringify(newStateEdit));
      return newStateEdit;

    case DELETE_COMMON:
      const { sliceName: deletedSliceName, id: deletedItemId } = action.payload;
      const newStateDelete = {
        ...state,
        [deletedSliceName]: state[deletedSliceName].filter(
          (item) => item.id !== deletedItemId
        ),
      };

      localStorage.setItem("commonData", JSON.stringify(newStateDelete));
      return newStateDelete;

    case RESET_STORE:
      localStorage.removeItem("commonData");
      return {
        ...state,
        manageUser: [], // Set manageUser to an empty array
      };

    default:
      return state;
  }
};

export default commonReducer;
