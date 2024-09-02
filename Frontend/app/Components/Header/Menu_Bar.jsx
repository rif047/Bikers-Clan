"use client"

import { useState, useEffect } from "react";
import Menu_Items from "./Menu_Items";
import Link from "next/link";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function Menu_Bar() {
    const [showHide, setShowHide] = useState(false);

    const hideMenu = () => { setShowHide(false) };

    const toggleMenu = () => { setShowHide(!showHide) };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (showHide && !e.target.closest(".menu-bar")) {
                hideMenu();
            }
        };

        showHide ? document.addEventListener("mousedown", handleOutsideClick) : document.removeEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showHide]);

    return (
        <div className="container mx-auto relative menu-bar">
            <div
                className={`${showHide ? 'opacity-100' : 'opacity-0'} transform absolute right-0 top-[58px] w-[200px] z-10 [&>nav]:flex [&>nav]:flex-col h-screen px-6 pt-6 bg-gray-500 transition-opacity ease-in-out [&>nav>a]:hover:py-2 [&>nav>a]:mr-0 [&>nav>a]:mb-3 [&>nav>a]:text-center shadow-[rgba(0,0,20,0.1)_-20px_0px_20px_1px]`}
            >
                <Menu_Items hideMenu={hideMenu} />
            </div>

            <div className="flex grid-cols-3 justify-between items-center h-[58px]">
                <div className="">
                    <Link href={'/'}><img src="/Assets/Images/Bikers-Clan.png" alt="Bikers Clan" className="h-[50px] pr-3" /></Link>
                </div>

                <div className="[&>nav]:flex hidden md:block">
                    <Menu_Items hideMenu={hideMenu} />
                </div>

                <div className="flex [&>*]:cursor-pointer [&>*]:h-[58px] [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:transition-all">
                    <div className="[&>*]:h-[58px] [&>*]:transition-all">
                        <input className="focus:outline-none w-[130px] md:w-[220px] bg-gray-100 rounded-l-sm p-1 text-xs" />
                        <button className="bg-gray-400 hover:text-gray-200 w-[50px]"><SearchTwoToneIcon /></button>
                    </div>
                    {/* <div className="bg-gray-500 hover:text-gray-300 w-[50px]"><ShoppingBasketOutlinedIcon /> <span className="text-[10px] font-bold ml-[2px]"> { } </span></div> */}
                    <div className="bg-gray-700 md:!hidden text-gray-400 w-[50px] hover:text-gray-200" onClick={toggleMenu}><MenuOutlinedIcon /></div>
                </div>
            </div>
        </div>
    );
}
