import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  // console.log('Hello')
  const {
    data: role,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      // const res = await axiosInstance.get(`/users/${user.email}/role`);
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      // console.log(res.data.role)
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
