import { useLocation } from "react-router";

const useQuery = (param: string = ""): string => {
  const query = useLocation().search;

  const regrex = new RegExp(`(\\?|\\&)(${param})\=([^&])+`, "g");

  const extract = regrex.exec(query);

  return extract ? extract[0].split(`${param}=`)[1] : "";
};

export default useQuery;
