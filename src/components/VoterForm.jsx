"use client"

import { useState } from "react"
import { X } from "lucide-react"

const VoterForm = ({ voter, onSubmit, onClose, title }) => {
  const [formData, setFormData] = useState({
    voterId: voter?.voterId || "",
    fullName: voter?.fullName || "",
    firstName: voter?.firstName || "",
    lastName: voter?.lastName || "",
    relativeName: voter?.relativeName || "",
    houseNo: voter?.houseNo || "",
    addressLine1: voter?.addressLine1 || "",
    addressLine2: voter?.addressLine2 || "",
    gender: voter?.gender || "",
    age: voter?.age || "",
    mobileNumber: voter?.mobileNumber || "",
    caste: voter?.caste || "",
    sectionDetails: voter?.sectionDetails || "",
    yadiNumber: voter?.yadiNumber || "",
    assemblyConstituencyNumber: voter?.assemblyConstituencyNumber || "",
    assemblyConstituencyName: voter?.assemblyConstituencyName || "",
    assemblyReservationStatus: voter?.assemblyReservationStatus || "",
    lokSabhaConstituencyNumber: voter?.lokSabhaConstituencyNumber || "",
    lokSabhaConstituencyName: voter?.lokSabhaConstituencyName || "",
    lokSabhaReservationStatus: voter?.lokSabhaReservationStatus || "",
    hometown: voter?.hometown || "",
    policeStation: voter?.policeStation || "",
    taluka: voter?.taluka || "",
    district: voter?.district || "",
    pinCode: voter?.pinCode || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.voterId) {
      newErrors.voterId = "Voter ID is required"
    }

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit(formData)
  }

  const formFields = [
    { label: "Voter ID", key: "voterId", type: "text", required: true, disabled: !!voter },
    { label: "Full Name", key: "fullName", type: "text", required: true },
    { label: "First Name", key: "firstName", type: "text" },
    { label: "Last Name", key: "lastName", type: "text" },
    { label: "Relative Name", key: "relativeName", type: "text" },
    { label: "House No.", key: "houseNo", type: "text" },
    { label: "Address Line 1", key: "addressLine1", type: "text" },
    { label: "Address Line 2", key: "addressLine2", type: "text" },
    { label: "Gender", key: "gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
    { label: "Age", key: "age", type: "number" },
    { label: "Mobile Number", key: "mobileNumber", type: "tel" },
    { label: "Caste", key: "caste", type: "text" },
    { label: "Section Details", key: "sectionDetails", type: "text" },
    { label: "Yadi Number", key: "yadiNumber", type: "text" },
    { label: "Assembly Constituency Number", key: "assemblyConstituencyNumber", type: "number" },
    { label: "Assembly Constituency Name", key: "assemblyConstituencyName", type: "text" },
    { label: "Assembly Reservation Status", key: "assemblyReservationStatus", type: "text" },
    { label: "Lok Sabha Constituency Number", key: "lokSabhaConstituencyNumber", type: "number" },
    { label: "Lok Sabha Constituency Name", key: "lokSabhaConstituencyName", type: "text" },
    { label: "Lok Sabha Reservation Status", key: "lokSabhaReservationStatus", type: "text" },
    { label: "Hometown", key: "hometown", type: "text" },
    { label: "Police Station", key: "policeStation", type: "text" },
    { label: "Taluka", key: "taluka", type: "text" },
    { label: "District", key: "district", type: "text" },
    { label: "Pin Code", key: "pinCode", type: "text" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    disabled={field.disabled}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors[field.key] ? "border-red-300" : "border-gray-300"}
                      ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                    `}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    disabled={field.disabled}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      ${errors[field.key] ? "border-red-300" : "border-gray-300"}
                      ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}
                    `}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
                {errors[field.key] && <p className="mt-1 text-sm text-red-600">{errors[field.key]}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {voter ? "Update Voter" : "Add Voter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VoterForm
