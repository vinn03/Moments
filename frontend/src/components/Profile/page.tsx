import { useEffect, useState } from "react";
import { UserController } from "../../controllers/user.controller";
import Header from "../Header/header";
import { UserType } from "../../models/user";

const Profile = () => {
  const [userData, setUserData] = useState<UserType>({
    uid: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  });
  const [id, setID] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idFromQuery = searchParams.get("id") || "";
    setID(idFromQuery);

    UserController.get_user_profile(idFromQuery)
      .then((data) => {
        setUserData(data);
      })
      .catch((e) => {
        console.error("Error fetching accounts: ", e);
      });
  }, []);

  return (
    <main className="Profile w-2/3 text-left m-auto mt-10 bg-blue-200 p-10 pr-20 pl-20 rounded-3xl border-2 border-blue-800">
      <Header id={id}></Header>

      <h2 className="text-blue-800 text-3xl mb-4">User Profile</h2>
      <p className="italic text-blue-800">
        Name: {userData.first_name} {userData.last_name}
      </p>
      <p className="italic text-blue-800">Username: {userData.username}</p>
      <p className="italic text-blue-800">Email: {userData.email}</p>
    </main>
  );
};

export default Profile;
