import Link from "next/link";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

export default function Product() {

    const title = 'H4 Ultra Headlight Led Bulb H4 Ultra Headlight Led Bulb H4 Ultra Headlight Led Bulb H4 Ultra Headlight Led Bulb H4 Ultra Headlight Led Bulb';

    const titleLimit = title.length > 50 ? title.substring(0, 50) + '...' : title;

    return (
        <div className="bg-white my-6 mx-2 shadow-xl hover:shadow-2xl text-xs rounded-md">
            <Link href={'/'} className='cursor-pointer'>
                <div className="h-[15rem]">
                    <img className="h-[15rem] w-full bg-cover rounded-md" src={'https://nagarauto.com/wp-content/uploads/2021/08/LED-Bulb-H4-e1630419432845.jpeg'} alt="Bikers Clan" />
                </div>
                <div className=" bg-white flex items-center h-[3rem] border-b">
                    <h4 className='text-black text-center text-ellipsis'>{titleLimit}</h4>
                </div>
            </Link>

            <div className="h-[2rem] flex">
                <p className='w-[70%] md:w-[60%] md:px-1 flex items-center justify-center font-bold'> <del className='text-slate-500'>233/- </del> 232/-</p>

                <button className='w-[30%] md:w-[40%] bg-black hover:bg-slate-700 [&>*:nth-child(n)]:text-xl text-center rounded-md'><ShoppingBasketOutlinedIcon className='text-white' /></button>
            </div>
        </div>
    )
}
