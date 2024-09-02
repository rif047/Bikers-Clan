import Email from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Facebook from '@mui/icons-material/Facebook';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import Link from "next/link";
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='bg-slate-800 text-neutral-400'>
            <section className='text-sm'>
                <div className='container mx-auto justify-between grid grid-cols-1 md:grid-cols-5 [&>*]:p-6 items-center'>
                    <div className='md:col-span-2'>
                        <h1 className="text-3xl mb-3 font-extrabold tracking-widest">BIKERS <span className="text-[#d19a2b]">CLAN</span></h1>
                        <p className='mb-10 text-md'>We're your gateway to riding excellence. Browse our collection of premium motorcycle gear, and start your ride with confidence and style.</p>

                        <span className='text-slate-200 text-xs'>Copyright © {currentYear} <span className='text-[#d19a2b] font-bold'>Bikers Clan</span> | Design &amp; Developed By <a className='text-[#d19a2b] font-bold' href="https://fivosoft.com/" target="_blank" rel="noopener"> FivoSoft Technology</a></span>
                    </div>

                    <div className="col-span-1">
                        <div className="mb-5">
                            <h3 className="text-2xl font-bold mb-1">Call Us <RemoveIcon /></h3>
                            <Link href={'tel:+8801686869727'}>+8801 68 68 69 727</Link>
                        </div>

                        <div className="mb-5">
                            <h3 className="text-2xl font-bold mb-1">Email Us <RemoveIcon /></h3>
                            <Link href={'mailto:bikersclan.bd@gmail.com'}>bikersclan.bd@gmail.com</Link>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-2">Social Links <RemoveIcon /></h3>
                            <div className='[&>*]:mr-3 flex items-center'>
                                <Link href={'/'}><PhoneAndroidOutlinedIcon /></Link>
                                <Link href={'/'}><Email /></Link>
                                <Link href={'/'}><Facebook /></Link>
                                <Link href={'/'}><SubscriptionsOutlinedIcon /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="list-none [&>*]:mb-2 [&>*]:p-1">
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/account'}>My Account</Link></li>
                        <li><Link href={'/track-order'}>Track Order</Link></li>
                        <li><Link href={'/helpline'}>Customer Care</Link></li>
                    </div>
                    <div className="list-none [&>*]:mb-2 [&>*]:p-1 [&>*>*>svg]:text-sm">
                        <li><Link href={'/ride-coins'}>RideCoins <CurrencyExchangeIcon /></Link></li>
                        <li><Link href={'/free-shipping'}>Free Shipping</Link></li>
                        <li><Link href={'/return-refund'}>Return & Refund</Link></li>
                        <li><Link href={'/privacy-policy'}>Privacy Policy</Link></li>
                        <li><Link href={'/terms-conditions'}>Terms & Conditions</Link></li>
                    </div>
                </div>
            </section>
        </footer>
    )
}
