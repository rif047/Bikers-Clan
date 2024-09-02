import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import Link from "next/link";

export default function Facility() {
    return (
        <section className='bg-slate-800'>
            <div className='block md:grid grid-cols-3 justify-between container mx-auto [&>*]:py-7 [&>*]:text-neutral-400 [&>div>div>h3]:font-bold [&>div>div>h3]:text-xl [&>div>div>p]:text-xs [&>div>svg]:text-[40px] [&>div>svg]:mr-3'>
                <div className='flex items-center justify-center'>
                    <CurrencyExchangeOutlinedIcon />
                    <div>
                        <h3> <Link href={'/ride-coins'}>RideCoins</Link></h3>
                        <p>Purchase more & earn more <span className='font-bold'> RideCoins!</span></p>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <LocalShippingOutlinedIcon />
                    <div>
                        <h3><Link href={'/free-shipping'}>Free Shipping</Link></h3>
                        <p>Purchase & Earn <span className='font-bold'> Free Shipping</span>  Reword</p>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <PaymentOutlinedIcon />
                    <div>
                        <h3><Link href={'/99-products'}>99 TK Product</Link></h3>
                        <p>Exclusive Products Under Price <span className='font-bold'> 99 TK</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
