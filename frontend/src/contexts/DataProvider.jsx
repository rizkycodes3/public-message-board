import { createContext, useReducer, useEffect, useState } from "react";
import { initialState, dataReducer } from "../dataReducer.js";

import axios from "axios";

export const dataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [fetchMessage, fetchTopic] = await Promise.all([axios.get("http://localhost:3001/v1/api/message"), axios.get("http://localhost:3001/v1/api/topic")]);

        dispatch({
          type: "SET_DATA",
          payload: {
            message: fetchMessage.data,
            topic: fetchTopic.data,
          },
        });
      } catch (e) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return <dataContext.Provider value={{ state, dispatch, isLoading }}>{children}</dataContext.Provider>;
};

export default DataProvider;
