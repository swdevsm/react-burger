import { useParams } from "react-router-dom";

const ProfileOrderPage = () => {
  const { number } = useParams<"number">();
  return <>{`profile order ${number}`}</>;
};

export default ProfileOrderPage;
