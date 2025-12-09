import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
import { FaUsers } from 'react-icons/fa'
import { IoIosCreate } from 'react-icons/io'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
      <MenuItem icon={IoIosCreate } label='Create Donation Request' address='create-donation-request' />
      <MenuItem icon={IoIosCreate } label='My Donation Requests' address='my-donation-requests' />
    </>
  )
}

export default CustomerMenu
