import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useLoaderData } from "react-router";
import Container from "../../components/Shared/Container";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
  const axiosPublic = useAxios();

  // Load district & upazila data from loader (same as SignUp)
  const { upazilasData, districtsData } = useLoaderData();

  const districtsList = districtsData[2].data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const upazilasList = upazilasData[2].data.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Form state
  const [searchData, setSearchData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Initialize dropdown data (same as signup)
  useEffect(() => {
    setDistricts(districtsList);
    setUpazilas(upazilasList);
  }, [districtsList, upazilasList]);

  // Filter upazilas based on selected district
  useEffect(() => {
    const selectedDistrict = searchData.district;
    const districtMatch = districts.find((d) => d.name === selectedDistrict);

    if (districtMatch) {
      const filtered = upazilas.filter((u) => u.district_id === districtMatch.id);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [searchData.district, districts, upazilas]);

  // Query donors
  const { data: donors = [], refetch, isFetching } = useQuery({
    queryKey: ["search-donors", searchData],
    enabled: false,
    queryFn: async () => {
      const res = await axiosPublic.get("/donors/search", { params: searchData });
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    refetch();
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto p-6 my-16">
        <h2 className="text-4xl md:text-4xl font-bold text-primary text-center mb-5">
          Search Blood Donors
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-100 shadow rounded p-4"
        >
          {/* Blood Group */}
          <div className="form-control flex flex-col">
            <label className="label font-semibold">Blood Group</label>
            <select
              className="select select-bordered"
              value={searchData.bloodGroup}
              onChange={(e) =>
                setSearchData({ ...searchData, bloodGroup: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="form-control flex flex-col">
            <label className="label font-semibold">District</label>
            <select
              className="select select-bordered"
              value={searchData.district}
              onChange={(e) =>
                setSearchData({ ...searchData, district: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="form-control flex flex-col">
            <label className="label font-semibold">Upazila</label>
            <select
              className="select select-bordered"
              value={searchData.upazila}
              onChange={(e) =>
                setSearchData({ ...searchData, upazila: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="md:col-span-3">
            <button className="btn btn-primary w-full mt-2">Search Donors</button>
          </div>
        </form>

        {/* Donor Results */}
        <div className="mt-6">
          {!submitted && (
            <p className="text-gray-500 text-center">
              Fill the form and click search to see donor results.
            </p>
          )}

          {submitted && isFetching && (
            <div className="text-center text-primary">Loading donors...</div>
          )}

          {submitted && !isFetching && donors.length === 0 && (
            <p className="text-center text-gray-500">No donors found.</p>
          )}

          {donors.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="p-4 bg-base-100 rounded shadow transition hover:shadow-lg"
                >
                  <h3 className="font-bold text-lg text-primary">
                    {donor.name}
                  </h3>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district}</p>
                  <p>Upazila: {donor.upazila}</p>
                  <p>Status: {donor.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Search;
