import "react";
import { provideHooks } from "redial";

const PreloadData = ({ children }) => children;

export default provideHooks({
  fetch: ({ dispatch }) => {}
  // Promise.all([
  //   dispatch(fetchDictionaries({}, { useCache: true })),
  // ])
})(PreloadData);
