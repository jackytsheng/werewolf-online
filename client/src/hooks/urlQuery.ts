import { useLocation } from "react-router";

const useQuery = (param: String = ""): String => {
  const query = useLocation().search;

  const regrex = new RegExp(`(\\?)(${param})\\=`, "g");

  return regrex.test(query) ? query.split(`${param}=`)[1] : "";
};

export default useQuery;
