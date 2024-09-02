'use client'

import Link from 'next/link'
import Call from '@mui/icons-material/CallOutlined';
import Email from '@mui/icons-material/EmailOutlined';
import { useState } from 'react';

export default function HeaderTop() {
    let [loggedIn, setLoggedIn] = useState(false)
    return (
        <div className='container mx-auto flex justify-between items-center text-gray-300 text-xs md:text-sm py-[5px]'>
            <ul className='md:flex hidden'>
                <li className='mr-4 hover:underline'><Link href='tel:+8801 68 68 69 727'><Call /> +8801 68 68 69 727</Link></li>
                <li className='hover:underline'><Link href='mailto:bikersclan.bd@gmail.com'><Email /> bikersclan.bd@gmail.com</Link></li>
            </ul>

            <ul className='flex items-center mx-auto md:mx-0 [&>*]:ml-4 '>
                <li className='hover:underline'><Link href="#">Helpline</Link></li>
                <li className='hover:underline'><Link href="#">Track Order</Link></li>
                <li className='hover:underline'><Link href="#">{loggedIn ? 'Account' : 'Signup / Login'} </Link></li>
            </ul>
        </div>
    )
}
