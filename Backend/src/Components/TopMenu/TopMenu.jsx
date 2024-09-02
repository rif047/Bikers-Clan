import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ListIcon from '@mui/icons-material/List';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SideMenu from '../SideMenu/SideMenu';

export default function TopMenu() {
    const [loggedIn, setLoggedIn] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        window.location.href = "/";
    };

    let [showMenu, setShowMenu] = useState(false);
    let [showlogout, setLogoutMenu] = useState(false);

    const location = useLocation();
    let currentPathname = location.pathname;

    const filteredPathname = currentPathname.replace(/\//g, '-').replace(/%20/g, ' ').replace(/^[-]+/, '');
    const pageTitle = filteredPathname === '' ? 'Dashboard' : filteredPathname;

    useEffect(() => {
        setShowMenu(false);
    }, [location]);

    return (
        <header className="md:h-[60px] topMenu">
            <div className='container mx-auto px-2'>
                <div className='flex items-center justify-between h-[60px]'>
                    <h1 className="tracking-[.3em] font-bold text-sm md:text-lg uppercase">
                        {pageTitle}
                    </h1>
                    <div className='flex'>
                        <div className={showlogout ? 'flex [&>*]:mr-4 [&>*]:px-2 [&>*]:py-1 [&>*]:bg-[#4C5165] [&>*]:text-[#e5e7eb] [&>*]:rounded-md animate-fade-left' : 'hidden'}>
                            <NavLink to={'/users'}><Person3OutlinedIcon /> Users</NavLink>
                            <button onClick={handleLogout}><LogoutOutlinedIcon /> Logout</button>
                        </div>

                        <div className="cursor-pointer hidden md:block py-1 [&>svg]:text-[25px] ml-3" onClick={() => { setLogoutMenu(!showlogout) }}><PersonRoundedIcon /></div>
                        <div className="cursor-pointer ml-7 block md:hidden p-2" onClick={() => { setShowMenu(!showMenu) }}><ListIcon /></div>
                    </div>
                </div>

            </div>

            <div className={showMenu ? 'md:hidden animate-fade-left' : 'hidden'}>
                <SideMenu />
                <div className='flex justify-between [&>*]:mx-5 [&>*]:my-4 [&>*]:px-2 [&>*]:py-1 [&>*]:bg-[#4C5165] [&>*]:text-[#e5e7eb] [&>*]:rounded-md'>
                    <button className='!bg-green-900'><Person3OutlinedIcon /> </button>
                    <button className='!bg-red-900'><LogoutOutlinedIcon /> </button>
                </div>
            </div>
        </header>
    )
}
