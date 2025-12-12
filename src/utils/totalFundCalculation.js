import axios from 'axios'

export const getTotalFund = async () => {
  try {
    const res = await axios.get("/funding/total");
    return res.data.total;
  } catch (err) {
    console.error("Failed to fetch total fund:", err);
    return 0;
  }
};


// import axiosSecure from "../Hooks/useAxiosSecure";

// export const getTotalFund = async (axiosSecure) => {
//   try {
//     const res = await axiosSecure.get("/funding/total");
//     return res.data.total;
//   } catch (err) {
//     console.error("Failed to fetch total fund:", err);
//     return 0;
//   }
// };

// import axiosSecure from '../hooks/useAxiosSecure'
// export const getTotalFund = async () => {
//   try {
//     const res = await axiosSecure.get("/funding/total");
//     return res.data.total || 0;
//   } catch (err) {
//     console.error("Failed to fetch total fund:", err);
//     return 0;
//   }
// };

