import { useEffect, useState } from "react";
import axios from "axios";

const useDistrictsUpazilas = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          axios.get("/districts.json"),
          axios.get("/upazilas.json"),
        ]);

        // extract and sort
        const districtsList = districtRes.data[2].data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        const upazilasList = upazilaRes.data[2].data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setDistricts(districtsList);
        setUpazilas(upazilasList);
      } catch (error) {
        console.error("Error loading location data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { districts, upazilas, loading };
};

export default useDistrictsUpazilas;
