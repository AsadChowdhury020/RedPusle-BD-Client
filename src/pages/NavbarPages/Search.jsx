import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import useAxios from "../../hooks/useAxios";
import useDistrictsUpazilas from "../../hooks/useDistrictsUpozilas";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
  const axiosInstance = useAxios();
  const { districts : districtsData, upazilas : upazilasData , loading : dataLoading } = useDistrictsUpazilas()
  const [ afterSearch, setAfterSearch] = useState(false)


  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [searchData, setSearchData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setDistricts(districtsData);
    setUpazilas(upazilasData);
  }, [districtsData, upazilasData]);

  useEffect(() => {
    const selectedDistrict = searchData.district;
    const districtMatch = districts.find((d) => d.name === selectedDistrict);

    if (districtMatch) {
      setFilteredUpazilas(
        upazilas.filter((u) => u.district_id === districtMatch.id)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [searchData.district, districts, upazilas]);

  const {
    data: donors = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["search-donors", searchData],
    enabled: false,
    queryFn: async () => {
      const res = await axiosInstance.get("/search-donors", {
        params: searchData,
      });
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setCurrentPage(1); // reset pagination on new search
    refetch();
    setAfterSearch(true)

  };

  //  Pagination Logic
  const totalPages = Math.ceil(donors.length / itemsPerPage);
  const currentData = donors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if(dataLoading){
    return <LoadingSpinner />
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto p-6 my-16 bg-base-200">
        <h2 className="text-4xl font-bold text-primary text-center mb-5">
          Search Blood Donors
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-100 border border-primary p-10 rounded-xl"
        >
          <div>
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

          <div>
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

          <div>
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

          <div className="md:col-span-3">
            <button className="btn btn-primary w-full mt-2">
              Search Donors
            </button>
          </div>
        </form>

        {/* Results Section */}
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

          {/* Table View with Pagination */}
          {currentData.length > 0 && (
            <>
              <div className="overflow-x-auto border border-secondary rounded-md mt-4">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>#</th>
                      <th>Name</th>
                      <th>Blood Group</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map((donor, index) => (
                      <tr key={donor._id}>
                        <td>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="font-semibold">{donor.name}</td>
                        <td className="text-primary font-bold">
                          {donor.bloodGroup}
                        </td>
                        <td>
                          {donor.upazila}, {donor.district}
                        </td>
                        <td className="capitalize">{donor.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ⭐ Pagination Buttons */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`btn btn-sm ${
                        currentPage === pageNum
                          ? "btn-primary"
                          : "btn-ghost"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Search;
