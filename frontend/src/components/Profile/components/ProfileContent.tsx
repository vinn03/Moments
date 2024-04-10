import { useEffect, useState } from "react";
import { ProfileController } from "../../../controllers/profile.controller";
import { ProfileType } from "../../../models/profile";

export default function ProfileContent({ id }) {
  const [profileData, setProfileData] = useState<ProfileType>({
    uid: "",
    bio: "",
    status_message: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    ProfileController.get(id)
      .then((data) => {
        setProfileData(data);
      })
      .catch((e) => {
        console.error("Error fetching accounts: ", e);
      });
  }, []);

  const handleUpdateProfile = () => {
    ProfileController.update(id, profileData)
      .then((data) => {
        console.log("Profile updated successfully: ", data);
        setEditMode(false);
      })
      .catch((e) => {
        console.error("Error updating profile: ", e);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {editMode ? (
        <>
          <input
            type="text"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            className="mb-2"
          />
          <input
            type="text"
            name="status_message"
            value={profileData.status_message}
            onChange={handleChange}
            className="mb-2"
          />
          <button
            onClick={() => setEditMode(false)}
            className="button-link text-blue-800 bg-blue-100 border-blue-800 border-2 p-2 text-center rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProfile}
            className="button-link text-blue-800 bg-blue-100 border-blue-800 border-2 p-2 text-center rounded-lg"
          >
            Update Profile
          </button>
        </>
      ) : (
        <>
          <p className="italic text-sky-800">
            <span className="font-bold">Current Status: </span>{profileData.status_message}
          </p>
          <p className="italic text-sky-800">
            <span className="font-bold">User Bio: </span>{profileData.bio}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="button-link text-sky-800 bg-sky-100 hover:bg-sky-50 p-2 mt-2 text-center rounded-lg"
          >
            Edit Profile
          </button>
        </>
      )}
    </>
  );
}
