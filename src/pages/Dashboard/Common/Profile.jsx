import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Mail,
  User,
  Edit,
  Lock,
  Droplet,
  MapPin,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState({});

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/users/email?email=${user.email}`)
      .then((res) => setDbUser(res.data));
  }, [user, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-10">
      <div className="w-full max-w-3xl bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="relative h-40 bg-primary">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-base-100 shadow object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-16 p-6 text-center">
          <h2 className="text-2xl font-bold text-base-content flex justify-center gap-2">
            <User className="text-primary" />
            {dbUser?.name}
          </h2>

          <p className="text-base-content/60 flex justify-center gap-2 mt-1">
            <Mail className="text-primary" />
            {user?.email}
          </p>

          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-primary text-primary-content text-sm">
            {dbUser?.role}
          </span>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={() => navigate("/dashboard/update-profile")}
              className="btn btn-primary"
            >
              <Edit className="w-4 h-4" /> Update Profile
            </button>

            <button className="btn btn-outline">
              <Lock className="w-4 h-4" /> Change Password
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-base-200 rounded-lg flex gap-3">
            <User className="text-primary" />
            <div>
              <p className="text-sm text-base-content/60">Full Name</p>
              <p className="font-medium">{dbUser?.name}</p>
            </div>
          </div>

          <div className="p-4 bg-base-200 rounded-lg flex gap-3">
            <Mail className="text-primary" />
            <div>
              <p className="text-sm text-base-content/60">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="p-4 bg-base-200 rounded-lg flex gap-3">
            <MapPin className="text-primary" />
            <div>
              <p className="text-sm text-base-content/60">Address</p>
              <p className="font-medium">
                {dbUser?.upazila}, {dbUser?.district}
              </p>
            </div>
          </div>

          <div className="p-4 bg-base-200 rounded-lg flex gap-3">
            <Droplet className="text-primary" />
            <div>
              <p className="text-sm text-base-content/60">Blood Group</p>
              <p className="font-medium">{dbUser?.bloodGroup}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
