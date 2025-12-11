import axios from 'axios'

export const getTotalFund = async () => {
  try {
    const res = await axios.get("/fundings/total");
    return res.data.total;
  } catch (err) {
    console.error("Failed to fetch total fund:", err);
    return 0;
  }
};
;
