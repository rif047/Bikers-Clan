import Link from "next/link";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const FreeShipping = () => {
    return (
        <div className="container mx-auto h-[80vh]">
            <title>Free Shipping</title>
            <div className="p-8 md:p-20 text-justify">
                <h1 className="text-2xl font-bold mb-4">Free Shipping</h1>
                <p className="text-gray-600 mb-4">
                    At Bikers Clan, we're delighted to offer you the convenience of free shipping on your orders when you meet the following criteria:
                </p>

                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li><strong>Minimum Order Amount:</strong> To qualify for free shipping, your total order amount must be 1999 TK or more.</li>
                    <li><strong>Minimum Item Quantity:</strong> You must add a minimum of 3 items to your order to be eligible for free shipping.</li>
                </ul>

                <p className="text-gray-600 mb-4">
                    When your order meets these criteria, the free shipping option will be available during the checkout process, making it even more rewarding to shop with us. Enjoy the freedom of having your order delivered to your doorstep with no additional shipping charges.
                </p>

                <p className="text-gray-600">
                    If you have any questions or need further clarification on our free shipping policy, please don't hesitate to <a href="#contact">contact us</a>. We're here to make your shopping experience as enjoyable and convenient as possible.
                </p>

                <Link href={'/products'} className="mt-10 mb-2 md:mr-3 inline-block rounded px-12 pt-4 pb-3.5 text-sm uppercase font-bold shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-xl transition-all">Shop Now <ArrowForwardRoundedIcon />
                </Link>
            </div>
        </div>
    );
};

export default FreeShipping;
