import Product from '../Components/Section/Product'

export default function Products() {
    return (
        <div>
            <title>Products</title>
            <div className="container mx-auto">
                <h1 className="mt-10 mb-4 text-3xl tracking-wide xl:text-4xl font-extrabold text-center">
                    <span className="waviy1 mr-3 text-gray-800">
                        <span>2</span>
                        <span>-</span>
                        <span>W</span>
                        <span>H</span>
                        <span>E</span>
                        <span>E</span>
                        <span>L</span>
                    </span>
                    <span className="waviy2 text-[#d19a2b]">
                        <span>T</span>
                        <span>R</span>
                        <span>E</span>
                        <span>A</span>
                        <span>S</span>
                        <span>U</span>
                        <span>R</span>
                        <span>E</span>
                    </span>
                </h1>
                <h1 className='text-center font-extrabold text-xl my-20'>
                    Product List Coming Soon ............
                </h1>

                {/* <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                    <Product />
                    <Product />
                </div> */}


            </div>
        </div>
    )
}
