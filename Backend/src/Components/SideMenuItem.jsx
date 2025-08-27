import { NavLink } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

export default function SideMenuItem() {
    function Menu_Item(url, icon, name) {
        return (
            <NavLink to={url} className="flex items-center my-1 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md">
                {icon}
                <p className="ml-2">{name}</p>
            </NavLink>
        )
    }
    return (
        <div className="mx-2 my-4">
            <div className="flex items-center mb-10">
                <img src={'/Assets/Img/bc.png'} alt="" className="w-[50px] mr-2 rounded-md" />
                <div className="text-sm">
                    <p className="font-bold">Bikers Clan</p>
                    <p>Make Bikers Happy</p>
                </div>
            </div>
            <nav>
                {Menu_Item('/', <DashboardOutlinedIcon />, 'Dashboard')}
                {Menu_Item('/sales', <ReceiptIcon />, 'Sale')}
                {Menu_Item('/purchases', <InventoryIcon />, 'Purchase')}
                {Menu_Item('/products', <BorderAllIcon />, 'Product')}
                {Menu_Item('/customers', <PeopleOutlineIcon />, 'Customer')}
                {Menu_Item('/suppliers', <GroupOutlinedIcon />, 'Supplier')}
                {Menu_Item('/expenses', <LocalAtmIcon />, 'Expense')}
                {Menu_Item('/reports', <ReportGmailerrorredOutlinedIcon />, 'Report')}
                {Menu_Item('/users', <PersonOutlineIcon />, 'User')}
            </nav>

        </div>
    )
}
