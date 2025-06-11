"use client"

import { useState, useRef } from "react"
// import { useDispatch } from "react-redux"
import { Download, Upload, FileText, AlertCircle } from "lucide-react"
import { setVoters } from "../store/slices/votersSlice"
import { parseCSV } from "../utils/csvParser"
import { exportToCSV } from "../utils/csvExporter"
import { useDispatch, useSelector } from "react-redux"



const Dashboard = () => {
  const dispatch = useDispatch()
 const { filteredVoters, currentPage, itemsPerPage, searchTerm, filters, selectedVoter } = useSelector(
    (state) => state.voters,
  )


  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [importError, setImportError] = useState("")

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setImportError("Please select a CSV file")
      return
    }

    setSelectedFile(file)
    setImportError("")
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setImportError("Please select a file first")
      return
    }

    setImporting(true)
    setImportError("")

    try {
      const text = await selectedFile.text()
      const parsedData = parseCSV(text)

      if (parsedData.length === 0) {
        throw new Error("No valid data found in CSV file")
      }

      dispatch(setVoters(parsedData))

      console.log("Sending parsed data to backend:", parsedData)

      alert(`Successfully imported ${parsedData.length} voters!`)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      setImportError(error.message)
    } finally {
      setImporting(false)
    }
  }

  const handleExport = async () => {
    setExporting(true)

    try {
      const mockVoterData = [
        {
          voterId: "V001",
          fullName: "John Doe",
          firstName: "John",
          lastName: "Doe",
          relativeName: "Robert Doe",
          houseNo: "123",
          addressLine1: "Main Street",
          addressLine2: "Downtown",
          gender: "Male",
          age: 35,
          mobileNumber: "9876543210",
          caste: "General",
          sectionDetails: "Section A",
          yadiNumber: "Y001",
          assemblyConstituencyNumber: 101,
          assemblyConstituencyName: "Central Assembly",
          assemblyReservationStatus: "General",
          lokSabhaConstituencyNumber: 1,
          lokSabhaConstituencyName: "Central Lok Sabha",
          lokSabhaReservationStatus: "General",
          hometown: "Mumbai",
          policeStation: "Central Police Station",
          taluka: "Mumbai",
          district: "Mumbai",
          pinCode: "400001",
        },
      ]

      exportToCSV(filteredVoters, "voters_export.csv")
      alert("Voters data exported successfully!")
    } catch (error) {
      alert("Error exporting data: " + error.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage voter data with bulk import and export features</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Download className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Bulk Export</h2>
          </div>
          <p className="text-gray-600 mb-6">Export all voter data to a CSV file for backup or analysis.</p>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Voters (CSV)
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Bulk Import</h2>
          </div>
          <p className="text-gray-600 mb-6">Import voter data from a CSV file to add multiple records at once.</p>

          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your CSV file here, or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">Only CSV files are accepted</p>
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileInputChange} className="hidden" />
          </div>

          {selectedFile && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Selected file:</strong> {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          {importError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
              <p className="text-sm text-red-600">{importError}</p>
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!selectedFile || importing}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {importing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Importing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import Voters
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">CSV Format Instructions</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>Your CSV file should include the following columns:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Voter ID (required)</li>
            <li>Full Name (required)</li>
            <li>Gender (required: Male/Female/Other)</li>
            <li>Age, Mobile Number, Address details</li>
            <li>Caste, Assembly/Lok Sabha constituency details</li>
            <li>Location details (Hometown, District, etc.)</li>
          </ul>
          <p className="mt-3">
            <strong>Note:</strong> The Sr. No. column will be ignored during import.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
