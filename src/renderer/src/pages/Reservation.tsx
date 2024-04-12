/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import Button from '@renderer/components/Button'
import { Edit, Printer, Save, Sheet, Trash, X } from 'lucide-react'
import Modal from 'react-modal'
import Nav from '@renderer/components/Nav'
import { useAuth } from '@renderer/context/AuthProvider'
import { useReactToPrint } from 'react-to-print'
import './style.css'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

interface ReservationData {
  id: string
  total: number
  paidAmount: string // Add paidAmount attribute
  reminderAmount: string // Add reminderAmount attribute
  studentName: string
  college: string
  department: string
  uniform: string
  studentTicket: string
  companions: string
  companionsTicket: string
  eventType: string
}

interface EventData {
  eventType: string
  collegeName: string
  departmentName: string
  studentTicketPrice: string
  companionTicketPrice: string
}

function Reservation(): JSX.Element {
  const { user } = useAuth()
  const [data, setData] = useState<ReservationData[]>(() => {
    const savedData = localStorage.getItem('reservationData')
    return savedData ? JSON.parse(savedData) : []
  })
  const [reservationData, setReservationData] = useState<ReservationData>({
    id: '',
    paidAmount: '',
    reminderAmount: '',
    studentName: '',
    college: '',
    department: '',
    uniform: '',
    studentTicket: '',
    companions: '',
    companionsTicket: '',
    eventType: '',
    total: 0
  })
  const [collegeData, setCollegeData] = useState<string[][]>([])
  const [departmentData, setDepartmentData] = useState<string[]>([])
  const [eventData, seteventData] = useState<EventData[]>([])
  const [costumeData, setcostumeData] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const invoiceRef = useRef(null)
  const [paidAmount, setPaidAmount] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleRowClick = (reservation: ReservationData, reservationId: string) => {
    // Calculate the total
    const total = calculateTotal(reservation)
    // Calculate the reminder amount
    const reminderAmount = total - parseFloat(reservation.paidAmount)
    // Create a new object with the total, paidAmount, reminderAmount, and reservation ID included
    const reservationWithTotalAndId: ReservationData & {
      total: number
      id: string
      paidAmount: string
      reminderAmount: string
    } = {
      ...reservation,
      total,
      id: reservationId,
      paidAmount: reservation.paidAmount,
      reminderAmount: reminderAmount.toString() // Convert reminderAmount to string
    }
    // Set the selectedReservation with the total, paidAmount, reminderAmount, and ID
    setSelectedReservation(reservationWithTotalAndId)
    // Open the invoice modal
    setIsInvoiceModalOpen(true)
  }

  // Function to close the invoice modal
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false)
  }
  const handlePrintInvoice = useReactToPrint({
    content: () => invoiceRef.current
    // Set the invoice modal component to be printed
  })
  const customModalStyles = {
    content: {
      width: '500px',
      margin: 'auto',
      overflow: 'auto',
      padding: 0,
      borderRadius: '24px',
      bottom: 'auto',
      minHeight: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const openModal = () => {
    setIsModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSave = () => {
    if (
      !reservationData.studentName ||
      !reservationData.college ||
      !reservationData.department ||
      !reservationData.eventType ||
      !reservationData.studentTicket ||
      !reservationData.companions ||
      !reservationData.companionsTicket ||
      !paidAmount // Check if paidAmount is provided
    ) {
      toast.error('يرجى ادخال جميع الحقول المطلوبة والمبلغ المدفوع')
      return
    }
    // Combine reservation data with paid amount
    const reservationWithPaidAmount = { ...reservationData, paidAmount }
    // Save reservation data to local storage
    const newData = [...data, reservationWithPaidAmount]
    setData(newData)
    localStorage.setItem('reservationData', JSON.stringify(newData))
    closeModal()
    // Reset reservation data
    setReservationData({
      id: '',
      paidAmount: '',
      reminderAmount: '',
      studentName: '',
      college: '',
      department: '',
      uniform: '',
      studentTicket: '',
      companions: '',
      companionsTicket: '',
      eventType: '',
      total: 0
    })
    // Reset paid amount
    setPaidAmount('')
    toast.success('تم اضافه الحجز بنجاح')
  }

  useEffect(() => {
    const savedData = localStorage.getItem('universityData')
    if (savedData) {
      setCollegeData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    const savedData = localStorage.getItem('departmentData')
    if (savedData) {
      setDepartmentData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    const savedData = localStorage.getItem('costumesData')
    if (savedData) {
      setcostumeData(JSON.parse(savedData))
    }
  }, [])
  useEffect(() => {
    const savedData = localStorage.getItem('eventData')
    if (savedData) {
      seteventData(JSON.parse(savedData))
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleCollegeChange = (collegeName: string, departmentName: string, eventType: string) => {
    const selectedEvent = eventData.find(
      (event) =>
        event.collegeName === collegeName &&
        event.departmentName === departmentName &&
        event.eventType === eventType
    )
    if (selectedEvent) {
      setReservationData({
        ...reservationData,
        college: selectedEvent.collegeName,
        department: selectedEvent.departmentName,
        eventType: selectedEvent.eventType,
        studentTicket: selectedEvent.studentTicketPrice,
        companionsTicket: selectedEvent.companionTicketPrice
      })
    }
  }
  const resetReservationData = (): void => {
    setReservationData({
      id: '',
      paidAmount: '',
      reminderAmount: '',
      studentName: '',
      college: '',
      department: '',
      uniform: '',
      studentTicket: '',
      companions: '',
      companionsTicket: '',
      eventType: '',
      total: 0
    })
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleEdit = (index: number) => {
    if (editingIndex === index) {
      setEditingIndex(-1) // Close editing mode if the edit button is clicked again
    } else {
      setEditingIndex(index) // Open editing mode for the clicked row
    }
  }

  // Define the handleInputChange function to update the reservation data when input fields change
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleRowSubmit = (index) => {
    // Create a copy of the data array to avoid mutating state directly
    const updatedData = [...data]
    // Update the reservation at the specified index with the edited data
    updatedData[index] = {
      ...updatedData[index],
      // Assuming 'paidAmount' is the field being edited
      // You might need to adjust this based on your actual field names
      paidAmount: updatedData[index].paidAmount
    }

    // Update the state with the modified data
    setData(updatedData)
    // Exit editing mode for this row by resetting editingIndex
    setEditingIndex(-1)
    // Optionally, you can save the changes to local storage or perform any other necessary actions
    localStorage.setItem('reservationData', JSON.stringify(updatedData))
    // Optionally, show a success message to indicate that the changes were saved
    toast.success('تم حفظ التعديلات بنجاح')
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleInputChange = (index, field, value) => {
    // Create a copy of the data array to avoid mutating state directly
    const updatedData = [...data]
    // Update the value of the specified field for the reservation at the given index
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    }
    // Update the state with the modified data
    setData(updatedData)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const exportToExcel = () => {
    // Define the data array for the Excel file
    const excelData = [
      // Add header row
      [
        'ID',
        'Paid Amount',
        'Reminder Amount',
        'Event Type',
        'Companions Ticket',
        'Companions',
        'Student Ticket',
        'Uniform',
        'Department',
        'College',
        'Student Name'
      ],
      // Add data rows
      ...data.map((reservation, index) => [
        index + 1,
        reservation.paidAmount,
        parseFloat(reservation.paidAmount) < calculateTotal(reservation)
          ? calculateTotal(reservation) - parseFloat(reservation.paidAmount)
          : 0,
        reservation.eventType,
        reservation.companionsTicket,
        reservation.companions,
        reservation.studentTicket,
        reservation.uniform,
        reservation.department,
        reservation.college,
        reservation.studentName
      ])
    ]

    // Create a new workbook
    const workbook = XLSX.utils.book_new()
    // Convert the data array to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservations')
    // Generate a binary string from the workbook
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })
    // Convert the binary string to a Blob
    const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' })
    // Create a temporary anchor element
    const anchor = document.createElement('a')
    // Set the anchor's href attribute to the Blob URL
    anchor.href = window.URL.createObjectURL(blob)
    // Set the anchor's download attribute to specify the filename
    anchor.download = 'reservations.xlsx'
    // Programmatically click the anchor to trigger the download
    anchor.click()
  }

  // Utility function to convert string to ArrayBuffer
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  return (
    <div>
      <Nav />
      <div className="flex items-center mx-24 justify-between">
        <h1 className="text-lg">
          <span className="text-lg font-bold">{user?.username}</span>👋 مرحبا
        </h1>
        <h1 className="py-10 pl-5 text-4xl font-semibold">اداره الحجوزات</h1>
      </div>

      <div className="border mx-24 mt-6 ">
        <div className="flex mb-2 border bg-gray-100 items-center p-4 justify-between">
          <button
            className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            onClick={openModal}
          >
            اضف حجز جديد
          </button>
          <button
            className="flex items-center gap-2 rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring active:text-white"
            onClick={exportToExcel}
          >
            Export to Excel <Sheet />
          </button>

          <h1 className="text-right text-xl pr-8 font-semibold ">حجوزات</h1>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    المبلغ المتبقي
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    المبلغ المدفوع
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">اجمالي</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    نوع الحدث
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    تيكيت المرافق
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    عدد المرافقين
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    تيكيت الطالب
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">الزي</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">القسم</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">الكليه</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    اسم الطالب
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((reservation, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center gap-4  text-gray-700">
                      {/* Render submit button instead of edit button when in editing mode */}
                      {editingIndex === index ? (
                        <button
                          onClick={() => {
                            // Submit changes when the submit button is clicked
                            handleRowSubmit(index)
                          }}
                        >
                          <Save />
                        </button>
                      ) : (
                        // Render buttons for delete and print when not in editing mode
                        <>
                          <button
                            onClick={() => {
                              const updatedData = data.filter((_, rowIndex) => rowIndex !== index)
                              setData(updatedData)
                              localStorage.setItem('reservationData', JSON.stringify(updatedData))
                              toast.success('تم حذف الحجز بنجاح')
                            }}
                          >
                            <Trash color="red" />
                          </button>
                          <button
                            onClick={() => handleRowClick(reservation, (index + 1).toString())}
                          >
                            <Printer />
                          </button>
                          <button onClick={() => handleEdit(index)}>
                            <Edit />
                          </button>
                        </>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {parseFloat(reservation.paidAmount) < calculateTotal(reservation)
                        ? calculateTotal(reservation) - parseFloat(reservation.paidAmount)
                        : 0}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {editingIndex === index ? (
                        <input
                          className="border border-gray-300 rounded-md p-1 w-full"
                          type="text"
                          value={reservation.paidAmount}
                          onChange={(e) => handleInputChange(index, 'paidAmount', e.target.value)}
                        />
                      ) : (
                        reservation.paidAmount
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {calculateTotal(reservation)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.eventType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.companionsTicket}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.companions}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.studentTicket}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.uniform}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.department}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.college}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {reservation.studentName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                      {index + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          style={customModalStyles}
          isOpen={isModalOpen}
          onRequestClose={() => {
            closeModal()
            resetReservationData() // Reset reservation data when closing the modal
          }}
          shouldCloseOnOverlayClick={false}
        >
          <div className="">
            <div className="bg-gray-100 p-6 flex justify-between">
              <button onClick={closeModal}>
                <X />
              </button>
              <h1 className="text-lg font-bold">اضف حجز جديد</h1>
            </div>
            <div className="px-4">
              {/* Input fields for reservation data */}
              <div className="py-4">
                <label
                  className="block text-right text-sm font-medium text-gray-700"
                  htmlFor="studentName"
                >
                  اسم الطالب
                </label>
                <input
                  className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                  type="text"
                  id="studentName"
                  placeholder="ادخل اسم الطالب"
                  value={reservationData.studentName}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, studentName: e.target.value })
                  }
                />
                <select
                  className="my-1 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                  id="college"
                  value={reservationData.college}
                  onChange={(e) => {
                    const selectedCollege = e.target.value
                    setReservationData({ ...reservationData, college: selectedCollege })
                    handleCollegeChange(
                      selectedCollege,
                      reservationData.department,
                      reservationData.eventType
                    )
                  }}
                >
                  <option value="">اختر الكلية</option>
                  {collegeData.map((college, index) => (
                    <option key={index} value={college[0]}>
                      {college[0]}
                    </option>
                  ))}
                </select>
                <select
                  className="my-2 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                  id="department"
                  value={reservationData.department}
                  onChange={(e) => {
                    const selectedDepartment = e.target.value
                    setReservationData({ ...reservationData, department: selectedDepartment })
                    handleCollegeChange(
                      reservationData.college,
                      selectedDepartment,
                      reservationData.eventType
                    )
                  }}
                >
                  <option value="">اختر القسم</option>
                  {departmentData.map((department, index) => (
                    <option key={index} value={department[0]}>
                      {department[0]}
                    </option>
                  ))}
                </select>
                <select
                  className="my-2 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                  id="event"
                  value={reservationData.eventType}
                  onChange={(e) => {
                    const selectedEvent = e.target.value
                    setReservationData({ ...reservationData, eventType: selectedEvent })
                    handleCollegeChange(
                      reservationData.college,
                      reservationData.department,
                      selectedEvent
                    )
                  }}
                >
                  <option value="">اختر الحفل</option>
                  {eventData
                    .filter(
                      (event) =>
                        event.collegeName === reservationData.college &&
                        event.departmentName === reservationData.department
                    )
                    .map((event, index) => (
                      <option key={index} value={event.eventType}>
                        {event.eventType}
                      </option>
                    ))}
                </select>
                <select
                  className="my-2 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                  id="uniform"
                  value={reservationData.uniform}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, uniform: e.target.value })
                  }
                >
                  <option value="">اختر الزي</option>
                  {costumeData.map((uniform, index) => (
                    <option key={index} value={uniform[0]}>
                      {uniform[0]}
                    </option>
                  ))}
                </select>
                <label
                  className="block text-right text-sm font-medium text-gray-700"
                  htmlFor="studentTicket"
                >
                  تيكيت الطالب
                </label>
                <input
                  className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                  type="text"
                  id="studentTicket"
                  placeholder="ادخل تيكيت الطالب"
                  value={reservationData.studentTicket}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, studentTicket: e.target.value })
                  }
                />
                <label
                  className="block text-right text-sm font-medium text-gray-700"
                  htmlFor="companions"
                >
                  عدد المرافقين
                </label>
                <input
                  className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                  type="number"
                  id="companions"
                  placeholder="ادخل عدد المرافقين"
                  value={reservationData.companions}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, companions: e.target.value })
                  }
                />
                <label
                  className="block text-right text-sm font-medium text-gray-700"
                  htmlFor="companionsTicket"
                >
                  تيكيت المرافق
                </label>
                <input
                  className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                  type="text"
                  id="companionsTicket"
                  placeholder="ادخل تيكيت المرافق"
                  value={reservationData.companionsTicket}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, companionsTicket: e.target.value })
                  }
                />
                <label
                  className="block text-right text-sm font-medium text-gray-700"
                  htmlFor="paidAmount"
                >
                  المبلغ المدفوع
                </label>
                <input
                  className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                  type="text"
                  id="paidAmount"
                  placeholder="ادخل المبلغ المدفوع"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </div>

              <div className="w-24 pb-3">
                <Button text="حفظ" icon={<Save />} onClick={handleSave} />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={isInvoiceModalOpen}
          onRequestClose={closeInvoiceModal}
          contentLabel="Invoice Modal"
        >
          {selectedReservation && (
            <div ref={invoiceRef} className="text-right flex flex-col justify-center items-center">
              <h1 className="py-2 text-2xl font-bold">ايصال {selectedReservation.eventType}</h1>
              <span>**************************************</span>
              <span>**************************************</span>
              <table className="border-collapse border border-gray-400 w-[30%]">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">القيمة</th>
                    <th className="border border-gray-400 p-2">العنصر</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2">
                      {selectedReservation.studentName}
                    </td>
                    <td className="border border-gray-400 p-2">اسم الطالب</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.college}</td>
                    <td className="border border-gray-400 p-2">الكلية</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.department}</td>
                    <td className="border border-gray-400 p-2">القسم</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.uniform}</td>
                    <td className="border border-gray-400 p-2">الزي</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">
                      {selectedReservation.studentTicket}
                    </td>
                    <td className="border border-gray-400 p-2">تيكيت الطالب</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.companions}</td>
                    <td className="border border-gray-400 p-2">عدد المرافقين</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">
                      {selectedReservation.companionsTicket}
                    </td>
                    <td className="border border-gray-400 p-2">تيكيت المرافق</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.eventType}</td>
                    <td className="border border-gray-400 p-2">اسم الحدث</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.total}</td>
                    <td className="border border-gray-400 p-2">اجمالي</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">{selectedReservation.paidAmount}</td>
                    <td className="border border-gray-400 p-2">المبلغ المدفوع</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">
                      {selectedReservation.reminderAmount}
                    </td>
                    <td className="border border-gray-400 p-2">المبلغ المتبقي</td>
                  </tr>
                </tbody>
              </table>
              <span>**************************************</span>
              <div className="text-2xl font-bold py-2">رقم حجز {selectedReservation.id}</div>
              <span>**************************************</span>
              {/* "Print" button */}
              <div className="text-center mt-4">
                <Button text="Print" icon={<Printer />} onClick={handlePrintInvoice} />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

function calculateTotal(reservation: ReservationData): number {
  const studentTicketCost = parseFloat(reservation.studentTicket) || 0
  const companions = parseInt(reservation.companions) || 0
  const companionsTicketCost = parseFloat(reservation.companionsTicket) || 0
  return studentTicketCost + companions * companionsTicketCost || 0
}

export default Reservation
