"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, Filter, Plus, Eye, Edit, Trash2, Printer, ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  setSearchTerm,
  setFilters,
  setCurrentPage,
  applyFilters,
  setSelectedVoter,
  addVoter,
  updateVoter,
  deleteVoter,
} from "../store/slices/votersSlice"
import VoterModal from "../components/VoterModal"
import VoterForm from "../components/VoterForm"

const Voters = () => {
  const dispatch = useDispatch()
  const { filteredVoters, currentPage, itemsPerPage, searchTerm, filters, selectedVoter } = useSelector(
    (state) => state.voters,
  )

  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Calculate pagination
  const totalPages = Math.ceil(filteredVoters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVoters = filteredVoters.slice(startIndex, endIndex)

  useEffect(() => {
    dispatch(applyFilters())
  }, [searchTerm, filters, dispatch])

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }))
  }

  const clearFilters = () => {
    dispatch(
      setFilters({
        gender: "",
        age: "",
        caste: "",
        district: "",
        taluka: "",
      }),
    )
  }

  const handleView = (voter) => {
    dispatch(setSelectedVoter(voter))
    setShowViewModal(true)
  }

  const handleEdit = (voter) => {
    dispatch(setSelectedVoter(voter))
    setShowEditModal(true)
  }

  const handleDelete = (voterId) => {
    if (window.confirm("Are you sure you want to delete this voter?")) {
      dispatch(deleteVoter(voterId))
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleAddVoter = (voterData) => {
    dispatch(
      addVoter(voterData),
    )
    setShowAddModal(false)
  }

  const handleUpdateVoter = (voterData) => {
    dispatch(updateVoter(voterData))
    setShowEditModal(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Voters</h1>
            <p className="text-gray-600">Manage voter records and information</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Voter
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or voter ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={filters.age}
                    onChange={(e) => handleFilterChange("age", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                  <input
                    type="text"
                    placeholder="Enter caste"
                    value={filters.caste}
                    onChange={(e) => handleFilterChange("caste", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    placeholder="Enter district"
                    value={filters.district}
                    onChange={(e) => handleFilterChange("district", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taluka</label>
                  <input
                    type="text"
                    placeholder="Enter taluka"
                    value={filters.taluka}
                    onChange={(e) => handleFilterChange("taluka", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredVoters.length)} of {filteredVoters.length} voters
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voter ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address Line 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  House No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVoters.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No voters found. Try adjusting your search or filters.
                  </td>
                </tr>
              ) : (
                currentVoters.map((voter) => (
                  <tr key={voter.voterId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voter.voterId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.age || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.mobileNumber || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.addressLine1 || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.houseNo || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(voter)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(voter)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(voter.voterId)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {showViewModal && selectedVoter && <VoterModal voter={selectedVoter} onClose={() => setShowViewModal(false)} />}

      {showEditModal && selectedVoter && (
        <VoterForm
          voter={selectedVoter}
          onSubmit={handleUpdateVoter}
          onClose={() => setShowEditModal(false)}
          title="Edit Voter"
        />
      )}

      {showAddModal && (
        <VoterForm onSubmit={handleAddVoter} onClose={() => setShowAddModal(false)} title="Add New Voter" />
      )}
    </div>
  )
}

export default Voters
