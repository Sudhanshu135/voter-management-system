export const parseCSV = (csvText) => {
  const lines = csvText.trim().split("\n")
  if (lines.length < 2) {
    throw new Error("CSV file must contain at least a header row and one data row")
  }

  const headers = lines[0].split(",").map((header) => header.trim().replace(/"/g, ""))
  const data = []

  // CSV header mapping to voter model
  const headerMapping = {
    "Sr. No.": null, // Ignore this column
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

  // Create mapping array for efficient processing
  const columnMapping = headers.map((header) => headerMapping[header] || null)

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(",").map((value) => value.trim().replace(/"/g, ""))
    const voter = {}

    columnMapping.forEach((fieldName, index) => {
      if (fieldName && values[index] !== undefined) {
        let value = values[index]

        // Convert numeric fields
        if (["age", "assemblyConstituencyNumber", "lokSabhaConstituencyNumber"].includes(fieldName)) {
          value = value ? Number.parseInt(value, 10) : null
        }

        // Only set non-empty values
        if (value && value !== "") {
          voter[fieldName] = value
        }
      }
    })

    // Validate required fields
    if (voter.voterId && voter.fullName && voter.gender) {
      data.push(voter)
    }
  }

  if (data.length === 0) {
    throw new Error("No valid voter records found in CSV file")
  }

  return data
}
