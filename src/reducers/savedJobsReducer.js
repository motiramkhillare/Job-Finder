export function savedJobsReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.some((job) => job.id === action.job.id);
      return exists
        ? state.filter((job) => job.id !== action.job.id)
        : [...state, action.job];
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
