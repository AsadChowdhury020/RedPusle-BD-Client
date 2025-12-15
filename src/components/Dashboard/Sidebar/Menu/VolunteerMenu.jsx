import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import { IoHome } from "react-icons/io5";
import MenuItem from './MenuItem'
import { TfiList } from 'react-icons/tfi';
const VolunteerMenu = () => {
  return (
    <>
      <MenuItem icon={IoHome } label='Home' address='volunteer-home' />
       <MenuItem icon={TfiList } label='All Blood Donation Requests' address='all-blood-donation-requests' />
    </>
  )
}

export default VolunteerMenu;
