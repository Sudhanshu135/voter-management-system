"use client"
import { X } from "lucide-react"

const VoterModal = ({ voter, onClose }) => {
  const fields = [
    { label: "Voter ID", key: "voterId" },
    { label: "Full Name", key: "fullName" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Relative Name", key: "relativeName" },
    { label: "House No.", key: "houseNo" },
    { label: "Address Line 1", key: "addressLine1" },
    { label: "Address Line 2", key: "addressLine2" },
    { label: "Gender", key: "gender" },
    { label: "Age", key: "age" },
    { label: "Mobile Number", key: "mobileNumber" },
    { label: "Caste", key: "caste" },
    { label: "Section Details", key: "sectionDetails" },
    { label: "Yadi Number", key: "yadiNumber" },
    { label: "Assembly Constituency Number", key: "assemblyConstituencyNumber" },
    { label: "Assembly Constituency Name", key: "assemblyConstituencyName" },
    { label: "Assembly Reservation Status", key: "assemblyReservationStatus" },
    { label: "Lok Sabha Constituency Number", key: "lokSabhaConstituencyNumber" },
    { label: "Lok Sabha Constituency Name", key: "lokSabhaConstituencyName" },
    { label: "Lok Sabha Reservation Status", key: "lokSabhaReservationStatus" },
    { label: "Hometown", key: "hometown" },
    { label: "Police Station", key: "policeStation" },
    { label: "Taluka", key: "taluka" },
    { label: "District", key: "district" },
    { label: "Pin Code", key: "pinCode" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Voter Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {voter[field.key] || "-"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoterModal
