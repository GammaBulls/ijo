import { useLocation } from "react-router-dom";

export default function useQueryParameters() {
  return new URLSearchParams(useLocation().search);
}
