import Top_Menu from './Top_Menu';
import Menu_Bar from './Menu_Bar';

export default function Header() {
    return (
        <header className='w-full'>
            <section className='bg-black w-full'><Top_Menu /></section>
            <section className='bg-[#dfe1e3] w-full shadow-xl'><Menu_Bar /></section>
        </header>
    )
}
