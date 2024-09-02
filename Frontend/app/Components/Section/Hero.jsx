'use client'

import Link from "next/link";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Lottie from "lottie-react";
import motorcycle from "../../Assets/Animation/motorcycle.json";

export default function Hero() {
    return (
        <section className="px-6 py-12 text-center md:px-12 lg:text-left bg-gradient-to-t from-slate-700 text-[#2D3238] mt-5">
            <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
                <div className="grid items-center lg:grid-cols-2">

                    <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0 h-[380px]">
                        <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 lg:-mr-14 backdrop-blur-[30px]">
                            <h1 className="mt-2 mb-4 text-3xl tracking-widest xl:text-4xl font-extrabold">
                                <span className="waviy1 mr-3">
                                    <span>B</span>
                                    <span>I</span>
                                    <span>K</span>
                                    <span>E</span>
                                    <span>R</span>
                                    <span>S</span>
                                </span>

                                <span className="waviy2 text-[#d19a2b]">
                                    <span>C</span>
                                    <span>L</span>
                                    <span>A</span>
                                    <span>N</span>
                                </span>
                            </h1>
                            <p className='mb-12'>
                                Your Path to Riding Excellence. Saddle Up with Premium Motorcycle Gear.
                            </p>

                            <Link href={'/products'} className="mb-2 md:mr-3 inline-block rounded px-12 pt-4 pb-3.5 text-sm uppercase font-bold shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-xl transition-all">Products <ArrowForwardRoundedIcon />
                            </Link>

                            <Link href={'/99-products'} className="mb-2 inline-block rounded px-12 pt-4 pb-3.5 text-sm font-bold uppercase shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-xl transition-all">99 TK Products <ArrowForwardRoundedIcon /></Link>
                        </div>
                    </div>

                    <div className="md:mb-12 lg:mb-0 md:w-96 md:ml-10 h-[380px]">
                        <Lottie animationData={motorcycle} />
                    </div>
                </div>
            </div>
        </section>
    )
}
