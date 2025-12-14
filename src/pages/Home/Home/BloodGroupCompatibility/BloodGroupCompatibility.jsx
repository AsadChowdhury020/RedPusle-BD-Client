import React from "react";
import Container from "../../../../components/Shared/Container";

const bloodCompatibilityData = [
  {
    group: "O−",
    donateTo: "All blood groups",
    receiveFrom: "O− only",
  },
  {
    group: "O+",
    donateTo: "O+, A+, B+, AB+",
    receiveFrom: "O−, O+",
  },
  {
    group: "A−",
    donateTo: "A−, A+, AB−, AB+",
    receiveFrom: "O−, A−",
  },
  {
    group: "A+",
    donateTo: "A+, AB+",
    receiveFrom: "O−, O+, A−, A+",
  },
  {
    group: "B−",
    donateTo: "B−, B+, AB−, AB+",
    receiveFrom: "O−, B−",
  },
  {
    group: "B+",
    donateTo: "B+, AB+",
    receiveFrom: "O−, O+, B−, B+",
  },
  {
    group: "AB−",
    donateTo: "AB−, AB+",
    receiveFrom: "O−, A−, B−, AB−",
  },
  {
    group: "AB+",
    donateTo: "AB+ only",
    receiveFrom: "All blood groups",
  },
];

const BloodGroupCompatibility = () => {
  return (
    <Container>
      <section className="py-16 bg-base-200">
        <div className="mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-4xl font-bold text-primary">
              Blood Group Compatibility
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Understanding blood group compatibility is essential before
              donating or receiving blood.
            </p>
          </div>

          {/* Compatibility Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full bg-base-100 shadow-lg rounded-xl">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-center">Blood Group</th>
                  <th className="text-center">Can Donate To</th>
                  <th className="text-center">Can Receive From</th>
                </tr>
              </thead>
              <tbody>
                {bloodCompatibilityData.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="font-bold text-primary text-lg">
                      {item.group}
                    </td>
                    <td>{item.donateTo}</td>
                    <td>{item.receiveFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <p className="mt-5 text-sm text-center text-gray-500">
            ⚠️ Always consult a medical professional before blood donation in
            emergency situations.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default BloodGroupCompatibility;
