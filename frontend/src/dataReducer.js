export const initialState = {
  message: [],
  topic: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        message: action.payload.message,
        topic: action.payload.topic,
      };

    case "SET_MESSAGES":
      return { ...state, message: action.payload };

    case "SET_TOPICS":
      return { ...state, topic: action.payload };

    default:
      return state;
  }
};
