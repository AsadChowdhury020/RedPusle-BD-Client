import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import { IoHome } from "react-icons/io5";
import MenuItem from './MenuItem'
import { TfiList } from 'react-icons/tfi';
const VolunteerMenu = () => {
  return (
    <>
      {/* <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Plant'
        address='add-plant'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      /> */}
      <MenuItem icon={IoHome } label='Volunteer Home' address='volunteer-home' />
       <MenuItem icon={TfiList } label='All Blood Donation Requests' address='all-blood-donation-requests' />
    </>
  )
}

export default VolunteerMenu;
