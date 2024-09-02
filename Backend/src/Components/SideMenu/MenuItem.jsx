import { NavLink, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';

export default function MenuItem() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };


    return (
        <div className="mx-4 my-4">
            <div className="flex items-center mb-10">
                <img src={'/Assets/Img/BC.png'} alt="" className="w-[45px] mr-2 rounded-md" />
                <div className="text-sm">
                    <p className="font-bold">Bikers Clan</p>
                    <p>Make Bikers Happy</p>
                </div>
            </div>
            <nav>
                <NavLink to={'/'} className="flex items-center my-2 px-2 py-2  hover:bg-[#A0A5B9] hover:rounded-md"><DashboardOutlinedIcon /><p className="ml-2">Dashboard</p></NavLink>
                <NavLink to={'/sales'} className="flex items-center my-2 px-2 py-2  hover:bg-[#A0A5B9] hover:rounded-md"><PointOfSaleOutlinedIcon /><p className="ml-2">Sale</p></NavLink>
                <NavLink to={'/orders'} className="flex items-center my-2 px-2 py-2  hover:bg-[#A0A5B9] hover:rounded-md"><PointOfSaleOutlinedIcon /><p className="ml-2">Online Order</p></NavLink>
                <NavLink to={'/purchases'} className="flex items-center my-2 px-2 py-2  hover:bg-[#A0A5B9] hover:rounded-md"><InventoryOutlinedIcon /><p className="ml-2">Purchase</p></NavLink>
                <NavLink
                    to="/products"
                    className={`flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md ${isActive('/products') || isActive('/product_categories') ? 'bg-[#4C5165] text-[#e5e7eb] rounded-md shadow-xl' : ''}`}
                >
                    <Inventory2OutlinedIcon />
                    <p className="ml-2">Product</p>
                </NavLink>
                <NavLink to={'/customers'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><PeopleAltOutlinedIcon /><p className="ml-2">Customer</p></NavLink>
                <NavLink to={'/suppliers'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><Diversity2OutlinedIcon /><p className="ml-2">Supplier</p></NavLink>
                <NavLink
                    to="/expenses"
                    className={`flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md ${isActive('/expenses') || isActive('/expense_categories') ? 'bg-[#4C5165] text-[#e5e7eb] rounded-md shadow-xl' : ''}`}
                >
                    <RequestQuoteOutlinedIcon />
                    <p className="ml-2">Expense</p>
                </NavLink>
                <NavLink to={'/reports'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><AssessmentOutlinedIcon /><p className="ml-2">Report</p></NavLink>
                <NavLink to={'/users'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><PersonOutlineIcon /><p className="ml-2">User</p></NavLink>
            </nav>

        </div>
    )
}
