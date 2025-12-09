import { FaUserCog, FaUsers } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUsers } label='All Users' address='all-users' />
      {/* <MenuItem icon={FaUsers } label='Create Donor Request' address='create-donation-request' /> */}
    </>
  )
}

export default AdminMenu
