export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    throw new Error("No data to export")
  }

  // Define CSV headers in the desired order
  const headers = [
    "Sr. No.",
    "Voter ID",
    "Full Name",
    "First Name",
    "Last Name",
    "Husband/Father/Mother Name",
    "House No.",
    "Address Line 1",
    "Address Line 2",
    "Gender",
    "Age",
    "Mobile Number",
    "Caste",
    "Section Details",
    "Yadi Number",
    "Assembly Constituency Number",
    "Assembly Constituency Name",
    "Assembly Reservation Status",
    "Lok Sabha Constituency Number",
    "Lok Sabha Constituency Name",
    "Lok Sabha Reservation Status",
    "Hometown",
    "Police Station",
    "Taluka",
    "District",
    "Pin Code",
  ]

  // Field mapping from voter model to CSV headers
  const fieldMapping = {
    "Sr. No.": null, // Will be generated
    "Voter ID": "voterId",
    "Full Name": "fullName",
    "First Name": "firstName",
    "Last Name": "lastName",
    "Husband/Father/Mother Name": "relativeName",
    "House No.": "houseNo",
    "Address Line 1": "addressLine1",
    "Address Line 2": "addressLine2",
    Gender: "gender",
    Age: "age",
    "Mobile Number": "mobileNumber",
    Caste: "caste",
    "Section Details": "sectionDetails",
    "Yadi Number": "yadiNumber",
    "Assembly Constituency Number": "assemblyConstituencyNumber",
    "Assembly Constituency Name": "assemblyConstituencyName",
    "Assembly Reservation Status": "assemblyReservationStatus",
    "Lok Sabha Constituency Number": "lokSabhaConstituencyNumber",
    "Lok Sabha Constituency Name": "lokSabhaConstituencyName",
    "Lok Sabha Reservation Status": "lokSabhaReservationStatus",
    Hometown: "hometown",
    "Police Station": "policeStation",
    Taluka: "taluka",
    District: "district",
    "Pin Code": "pinCode",
  }

  // Create CSV content
  let csvContent = headers.join(",") + "\n"

  data.forEach((voter, index) => {
    const row = headers.map((header) => {
      if (header === "Sr. No.") {
        return index + 1
      }

      const fieldName = fieldMapping[header]
      const value = fieldName ? voter[fieldName] : ""

      // Escape commas and quotes in values
      if (value && typeof value === "string" && (value.includes(",") || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }

      return value || ""
    })

    csvContent += row.join(",") + "\n"
  })

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
