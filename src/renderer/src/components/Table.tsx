/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import Modal from 'react-modal'
import { Save,  X } from 'lucide-react'
import Button from './Button'

interface TableProps {
  title: string
  buttonTitle: string
  Modaltitle: string
  modalInputLabel: string
  modalInputPlaceHolder: string
  modalSelectLabel: string
  modalSelectPlaceholder: string
  disableSelect?: boolean // Optional prop to disable select
  additionalInput1?: boolean // Optional additional input 1
  additionalInput2?: boolean // Optional additional input 2
  additionalInput3?: boolean // Optional additional input 3
  additionalInput4?: boolean // Optional additional input 4
  additionalInput5?: boolean // Optional additional input 5
  additionalInput6?: boolean // Optional additional input 5
  additionalInput7?: boolean // Optional additional input 5
  additionalInput8?: boolean // Optional additional input 5
  additionalInputLabel1?: string // Optional additional input 1
  additionalInputLabel2?: string // Optional additional input 2
  additionalInputLabel3?: string // Optional additional input 3
  additionalInputLabel4?: string // Optional additional input 4
  additionalInputLabel5?: string // Optional additional input 5
  additionalInputLabel6?: string // Optional additional input 5
  additionalInputLabel7?: string // Optional additional input 5
  additionalInputLabel8?: string // Optional additional input 5
  additionalInputPlaceholder1?: string // Optional additional input 1
  additionalInputPlaceholder2?: string // Optional additional input 2
  additionalInputPlaceholder3?: string // Optional additional input 3
  additionalInputPlaceholder4?: string // Optional additional input 4
  additionalInputPlaceholder5?: string // Optional additional input 5
  additionalInputPlaceholder6?: string // Optional additional input 5
  additionalInputPlaceholder7?: string // Optional additional input 5
  additionalInputPlaceholder8?: string
  columns: string[] // Array of column names (strings)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[][] // Optional additional input 5
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  title,
  buttonTitle,
  modalSelectPlaceholder,
  modalSelectLabel,
  Modaltitle,
  modalInputLabel,
  modalInputPlaceHolder,
  disableSelect = false,
  additionalInput1, // Default value for disableSelect
  additionalInput2, // Default value for disableSelect
  additionalInput3, // Default value for disableSelect
  additionalInput4, // Default value for disableSelect
  additionalInput5,
  additionalInput6,
  additionalInput7,
  additionalInput8,
  additionalInputLabel1, // Default value for disableSelect
  additionalInputLabel2, // Default value for disableSelect
  additionalInputLabel3, // Default value for disableSelect
  additionalInputLabel4, // Default value for disableSelect
  additionalInputLabel5,
  additionalInputLabel6,
  additionalInputLabel7,
  additionalInputLabel8,
  additionalInputPlaceholder1, // Default value for disableSelect
  additionalInputPlaceholder2, // Default value for disableSelect
  additionalInputPlaceholder3, // Default value for disableSelect
  additionalInputPlaceholder4, // Default value for disableSelect
  additionalInputPlaceholder5, // Default value for disableSelect
  additionalInputPlaceholder6, // Default value for disableSelect
  additionalInputPlaceholder7, // Default value for disableSelect
  additionalInputPlaceholder8 // Default value for disableSelect
  // Default value for disableSelect
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const openModal = () => {
    setIsModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const customModalStyles = {
    content: {
      width: '500px', // Set the desired width here
      margin: 'auto', // Center the modal horizontally
      overflow: 'auto',
      padding: 0, // Remove padding
      borderRadius: '24px', // Allow scrolling if the content exceeds the modal size
      bottom: 'auto',
      minHeight: '20px', // Set a minimum height to avoid collapse
      top: '50%',
      left: '50%',
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <div className="border">
      <div className="flex mb-2 border bg-gray-100 items-center p-4 justify-between">
        <button
          className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          onClick={openModal}
        >
          {buttonTitle}
        </button>
        <h1 className="text-right text-xl pr-8 font-semibold ">{title}</h1>
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
                    {/* Add your custom icons or content for the first cell in each row */}
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
            <h1 className="text-lg font-bold">{Modaltitle}</h1>
          </div>
          <div className="px-4">
            <div className="py-4">
              <label
                className="block text-right text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                {modalInputLabel}
              </label>
              <input
                className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                type="text"
                id="username"
                placeholder={modalInputPlaceHolder}
              />
              {additionalInput1 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel1}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder1}
                  />
                </div>
              )}
              {additionalInput2 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel2}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder2}
                  />
                </div>
              )}
              {additionalInput3 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel3}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder3}
                  />
                </div>
              )}
              {additionalInput4 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel4}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder4}
                  />
                </div>
              )}
              {additionalInput5 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel5}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder5}
                  />
                </div>
              )}
              {additionalInput6 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel6}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder6}
                  />
                </div>
              )}
              {additionalInput7 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel7}
                  </label>
                  <input
                    className="mt-1 text-right p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder7}
                  />
                </div>
              )}
              {additionalInput8 && (
                <div className="py-4">
                  <label
                    className="block text-right text-sm font-medium text-gray-700"
                    htmlFor="additionalInput1"
                  >
                    {additionalInputLabel8}
                  </label>
                  <input
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    type="text"
                    id="additionalInput1"
                    placeholder={additionalInputPlaceholder8}
                  />
                </div>
              )}
            </div>
            {!disableSelect && ( // Conditionally render the select field based on disableSelect prop
              <div className="py-4">
                <label
                  htmlFor="HeadlineAct"
                  className="block text-right text-sm font-medium text-gray-900"
                >
                  {' '}
                  {modalSelectLabel}{' '}
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="mt-1.5 font-bold text-right w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">{modalSelectPlaceholder}</option>
                  <option value="JM">John Mayer</option>
                  <option value="SRV">Stevie Ray Vaughn</option>
                  <option value="JH">Jimi Hendrix</option>
                  <option value="BBK">B.B King</option>
                  <option value="AK">Albert King</option>
                  <option value="BG">Buddy Guy</option>
                  <option value="EC">Eric Clapton</option>
                </select>
              </div>
            )}
            <div className="w-24 pb-3">
              <Button text="حفظ" icon={<Save />} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Table
