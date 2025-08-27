import { NavLink } from "react-router-dom";
import SideMenuItem from "./SideMenuItem";


export default function SideMenu() {
    return (
        <div className="w-full md:w-[270px] md:h-screen overflow-scroll asideMenu">
            <div className="bg-[#4C5165] h-[60px] flex items-center pl-2">
                <NavLink to={'/'} className='noActive'><img className="w-[170px]" src={'/Assets/Img/logo.png'} alt="FivoSoft Technology" /></NavLink>
            </div>

            <SideMenuItem />

        </div>
    )
}
