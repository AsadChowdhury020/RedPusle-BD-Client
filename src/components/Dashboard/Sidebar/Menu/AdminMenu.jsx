import { FaUserCog, FaUsers } from 'react-icons/fa'
import { TfiList } from "react-icons/tfi";
import { IoHome } from "react-icons/io5";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      {/* <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' /> */}
      <MenuItem icon={IoHome } label='Admin Home' address='admin-home' />
      <MenuItem icon={FaUsers } label='All Users' address='all-users' />
      <MenuItem icon={TfiList } label='All Blood Donation Requests' address='all-blood-donation-requests' />
    </>
  )
}

export default AdminMenu
