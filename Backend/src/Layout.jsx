import TopHeader from "./Components/TopHeader.jsx";
import SideMenu from "./Components/SideMenu";
import Footer from "./Components/Footer";



function Layout({ children }) {
    return (
        <main className="w-full flex">
            <aside className="hidden md:block">
                <SideMenu />
            </aside>



            <aside className="w-full">
                <header>
                    <TopHeader />
                </header>

                <section className="bg-[#F6F7FB] h-[calc(100vh-92px)] overflow-auto">
                    <div className="container mx-auto my-5 shadow-md bg-white">
                        <main> {children} </main>
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>

            </aside>
        </main>
    );
}

export default Layout;