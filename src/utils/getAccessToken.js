import { useSelector } from "react-redux";

// access token을 갖고 오는 함수
export default function useGetAccessToken() {
  const { token: localToken } = useSelector((state) => state.local);
  const { token: sessionToken } = useSelector((state) => state.session.session);

  if (localToken !== "") {
    return localToken;
  } else if (sessionToken !== "") {
    return sessionToken;
  } else {
    return "";
  }
}
