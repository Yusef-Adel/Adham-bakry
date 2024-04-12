/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import Button from '@renderer/components/Button'
import { Save, Trash, X } from 'lucide-react'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
function University(): JSX.Element {
  const columns = ['الكليه', 'ID']
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('universityData')
    return savedData ? JSON.parse(savedData) : []
  })
  const [newFacultyName, setNewFacultyName] = useState('')
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
    localStorage.setItem('universityData', JSON.stringify(data))
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
    if (newFacultyName.trim() !== '') {
      const newFaculty = [newFacultyName, data.length + 1] // Assuming 'Faculty' for now
      setData([...data, newFaculty])
    }
    closeModal()
    setNewFacultyName('')
    toast.success('تم اضافه الكلية بنجاح')
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleDelete = (rowIndex: number) => {
    const filteredData = data.filter((_, index) => index !== rowIndex)
    setData(filteredData)
    localStorage.setItem('universityData', JSON.stringify(filteredData))
    toast.success('تم حذف الكلية بنجاح')
  }

  return (
    <div className="border mx-24 mt-6">
      <div className="flex mb-2 border bg-gray-100 items-center p-4 justify-between">
        <button
          className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          onClick={openModal}
        >
          اضف كليه جديد
        </button>
        <h1 className="text-right text-xl pr-8 font-semibold ">الكليات</h1>
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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="whitespace-nowrap px-4 py-2 flex justify-center gap-4  text-gray-700">
                    <button onClick={() => handleDelete(rowIndex)}>
                      <Trash color="red" />
                    </button>
                  </td>
                  {row.map((cellData, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="whitespace-nowrap px-4 py-2 text-center text-gray-700"
                    >
                      {cellData}
                    </td>
                  ))}
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
                htmlFor="username"
              >
                اسم كليه
              </label>
              <input
                className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                type="text"
                id="username"
                placeholder="ادخل اسم القسم"
                value={newFacultyName}
                onChange={(e) => setNewFacultyName(e.target.value)}
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

export default University
