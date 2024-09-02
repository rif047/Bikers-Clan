import Hero from './Components/Section/Hero';
import Facility from './Components/Section/Facility';
import Product from './Components/Section/Product';

export default function Home() {
  return (
    <main>
      <Hero />

      <Facility />

      <section className='bg-gray-200 py-5'>
        <div className='container mx-auto'>
          <h1 className="mt-10 mb-4 text-3xl tracking-wide xl:text-4xl font-extrabold text-center">
            <span className="waviy1 mr-3 text-gray-800">
              <span>F</span>
              <span>E</span>
              <span>A</span>
              <span>T</span>
              <span>U</span>
              <span>R</span>
              <span>E</span>
            </span>
            <span className="waviy2 text-[#d19a2b]">
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>D</span>
              <span>U</span>
              <span>C</span>
              <span>T</span>
              <span>S</span>
            </span>
          </h1>
          <h1 className='text-center font-extrabold text-xl my-20'>
            Product List Coming Soon ............
          </h1>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
            <Product />
            <Product />
          </div>
        </div>
      </section>
    </main>
  )
}
