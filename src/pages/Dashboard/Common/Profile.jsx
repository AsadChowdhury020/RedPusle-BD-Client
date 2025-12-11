import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Camera, Mail, User, Shield, Edit, Lock, Droplet, MapPin } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState({});
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isPasswordOpen, setPasswordOpen] = useState(false);

  // Fetch user data from DB
  useEffect(() => {
    const getUser = async () => {
      if (!user?.email) return;
      const res = await axiosSecure.get(`/users/email?email=${user?.email}`);
      setDbUser(res.data);
    };
    getUser();
  }, [user]);

  // Update Profile Handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const bloodGroup = form.bloodGroup.value;

    const updateData = { name, bloodGroup };

    const res = await axiosSecure.patch(
      `/users?email=${user.email}`,
      updateData
    );

    if (res.data) {
      Swal.fire("Updated!", "Profile Updated Successfully", "success");
      setUpdateOpen(false);
      setDbUser({ ...dbUser, ...updateData });
    }
  };

  // Change Password Handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newPass = e.target.password.value;

    try {
      await user.updatePassword(newPass);
      Swal.fire("Success!", "Password Updated Successfully", "success");
      setPasswordOpen(false);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-base-300 shadow-xl rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-40 bg-gradient-to-r from-red-500 to-primary">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16 p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {dbUser?.name || user?.displayName}
          </h2>

          <p className="text-gray-500 dark:text-gray-300 flex items-center justify-center gap-2 mt-1">
            <Mail className="w-4 h-4 text-primary" />
            {user?.email}
          </p>

          <p className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-primary text-white shadow">
            {dbUser?.role
              ? dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)
              : "Donor"}
          </p>

          {/* Blood Group */}
          {/* {dbUser?.bloodGroup && (
            <p className="mt-3 flex justify-center gap-2 text-lg font-semibold text-primary">
              <Droplet className="w-5 h-5" />
              Blood Group: {dbUser.bloodGroup}
            </p>
          )} */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={() => setUpdateOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-primary text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              <Edit className="w-4 h-4" />
              Update Profile
            </button>

            <button
              onClick={() => setPasswordOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Account Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-base-100 rounded-lg shadow flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{dbUser?.name}</p>
              </div>
            </div>

            <div className="p-4 bg-base-100 rounded-lg shadow flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="p-4 bg-base-100 rounded-lg shadow flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{dbUser?.upazila},{dbUser?.district}</p>
              </div>
            </div>

            <div className="p-4 bg-base-100 rounded-lg shadow flex items-center gap-3">
              <Droplet className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{dbUser?.bloodGroup}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-lg w-80"
          >
            <h3 className="text-lg font-bold mb-3">Update Profile</h3>

            <input
              name="name"
              defaultValue={dbUser?.name}
              placeholder="Full Name"
              className="input input-bordered w-full mb-3"
            />

            <input
              name="bloodGroup"
              defaultValue={dbUser?.bloodGroup}
              placeholder="Blood Group (A+, O-, etc)"
              className="input input-bordered w-full mb-3"
            />

            <button className="btn btn-primary w-full mt-2">Update</button>
            <button
              type="button"
              onClick={() => setUpdateOpen(false)}
              className="btn btn-ghost w-full mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handlePasswordChange}
            className="bg-white p-6 rounded-xl shadow-lg w-80"
          >
            <h3 className="text-lg font-bold mb-3">Change Password</h3>

            <input
              name="password"
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full mb-3"
            />

            <button className="btn btn-primary w-full mt-2">Change</button>
            <button
              type="button"
              onClick={() => setPasswordOpen(false)}
              className="btn btn-ghost w-full mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
