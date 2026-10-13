import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { savedJobsReducer } from "../reducers/savedJobsReducer.js";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [stored, setStored] = useLocalStorage("savedJobs", []);
  const [saved, dispatch] = useReducer(savedJobsReducer, stored);

  useEffect(() => {
    setStored(saved);
  }, [saved, setStored]);

  const toggleSave = useCallback(
    (job) => dispatch({ type: "TOGGLE", job }),
    []
  );

  const isSaved = useCallback(
    (id) => saved.some((job) => job.id === id),
    [saved]
  );

  const value = useMemo(
    () => ({ saved, toggleSave, isSaved }),
    [saved, toggleSave, isSaved]
  );

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useSavedJobs() {
  return useContext(SavedJobsContext);
}