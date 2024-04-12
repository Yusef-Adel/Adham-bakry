/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import Button from '@renderer/components/Button'
import { Save, Trash, X } from 'lucide-react'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
interface EventData {
  eventType: string
  collegeName: string
  departmentName: string
  studentTicketPrice: string
  companionTicketPrice: string
}
function Event(): JSX.Element {
  const columns = ['سعر تيكيت المرافق', 'سعر تيكيت الطالب', 'نوع الحدث', 'القسم', 'الكليه', 'ID']
  const [data, setData] = useState<EventData[]>(() => {
    const savedData = localStorage.getItem('eventData')
    return savedData ? JSON.parse(savedData) : []
  })
  const [newEventData, setNewEventData] = useState<EventData>({
    eventType: '',
    collegeName: '',
    departmentName: '',
    studentTicketPrice: '',
    companionTicketPrice: ''
  })
  const [collegeData, setCollegeData] = useState<string[][]>([])
  const [departmentData, setDepartmentData] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  useEffect(() => {
    const savedCollegeData = localStorage.getItem('universityData')
    if (savedCollegeData) {
      setCollegeData(JSON.parse(savedCollegeData))
    }

    const savedDepartmentData = localStorage.getItem('departmentData')
    if (savedDepartmentData) {
      setDepartmentData(JSON.parse(savedDepartmentData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('eventData', JSON.stringify(data))
  }, [data])

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
    if (newEventData.eventType.trim() !== '') {
      const newEvent = [...data, newEventData]
      setData(newEvent)
    }
    closeModal()
    setNewEventData({
      eventType: '',
      collegeName: '',
      departmentName: '',
      studentTicketPrice: '',
      companionTicketPrice: ''
    })
    toast.success("تم اضافه الحفل بنجاح")
  }

  return (
    <div className="border mx-24 mt-6">
      <div className="flex mb-2 border bg-gray-100 items-center p-4 justify-between">
        <button
          className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          onClick={openModal}
        >
          اضف حفله جديد
        </button>
        <h1 className="text-right text-xl pr-8 font-semibold ">الحفلات</h1>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                {columns.map((column, index) => (
                  <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((reservation, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 flex justify-center gap-4  text-gray-700">
                    <button
                      onClick={() => {
                        const updatedData = data.filter((_, rowIndex) => rowIndex !== index)
                        setData(updatedData)
                        localStorage.setItem('reservationData', JSON.stringify(updatedData))
                        toast.success("تم حذف الحفل بنجاح")
                      }}
                    >
                      <Trash color="red" />
                    </button>
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                    {reservation.companionTicketPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                    {reservation.studentTicketPrice}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                    {reservation.eventType}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                    {reservation.departmentName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                    {reservation.collegeName}
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
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="">
          <div className="bg-gray-100 p-6 flex justify-between">
            <button onClick={closeModal}>
              <X />
            </button>
            <h1 className="text-lg font-bold">اضف كليه جديده</h1>
          </div>
          <div className="px-4">
            <div className="py-4">
              <label
                className="block text-right text-sm font-medium text-gray-700"
                htmlFor="eventType"
              >
                نوع الحدث
              </label>
              <input
                className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                type="text"
                id="eventType"
                placeholder="ادخل نوع الحدث"
                value={newEventData.eventType}
                onChange={(e) => setNewEventData({ ...newEventData, eventType: e.target.value })}
              />
              <select
                className="my-1 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                id="collegeName"
                value={newEventData.collegeName}
                onChange={(e) => setNewEventData({ ...newEventData, collegeName: e.target.value })}
              >
                <option value="">اختر الكلية</option>
                {collegeData.map((college, index) => (
                  <option key={index} value={college[0]}>
                    {college[0]}
                  </option>
                ))}
              </select>
              <select
                className="my-1 py-2 font-bold text-right w-full rounded-lg border-gray-500 text-gray-700 sm:text-sm"
                id="departmentName"
                value={newEventData.departmentName}
                onChange={(e) =>
                  setNewEventData({ ...newEventData, departmentName: e.target.value })
                }
              >
                <option value="">اختر القسم</option>
                {departmentData.map((department, index) => (
                  <option key={index} value={department[0]}>
                    {department[0]}
                  </option>
                ))}
              </select>
              <label
                className="block text-right text-sm font-medium text-gray-700"
                htmlFor="studentTicketPrice"
              >
                سعر تيكيت الطالب
              </label>
              <input
                className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                type="number"
                id="studentTicketPrice"
                placeholder="ادخل سعر تيكيت الطالب"
                value={newEventData.studentTicketPrice}
                onChange={(e) =>
                  setNewEventData({ ...newEventData, studentTicketPrice: e.target.value })
                }
              />
              <label
                className="block text-right text-sm font-medium text-gray-700"
                htmlFor="companionTicketPrice"
              >
                سعر تيكيت المرافق
              </label>
              <input
                className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                type="number"
                id="companionTicketPrice"
                placeholder="ادخل سعر تيكيت المرافق"
                value={newEventData.companionTicketPrice}
                onChange={(e) =>
                  setNewEventData({ ...newEventData, companionTicketPrice: e.target.value })
                }
              />
            </div>

            <div className="w-24 pb-3">
              <Button text="حفظ" icon={<Save />} onClick={handleSave} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Event
