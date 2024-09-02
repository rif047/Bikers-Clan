import React from 'react';

const ReturnAndRefund = () => {
    return (
        <div className="container mx-auto">
            <title>Return & Refund</title>
            <div className="p-8 md:p-20 text-justify">
                <h1 className="text-2xl font-bold mb-4">Return & Refund Policy</h1>
                <p className="text-gray-600 mb-4">
                    At Bikers Clan, we want to ensure your complete satisfaction with every purchase. Please read our Return & Refund Policy carefully to understand how we handle returns and refunds.
                </p>

                <h2 className="text-xl font-semibold mb-2">Easy Returns</h2>
                <p className="text-gray-600 mb-4">
                    Returning a product is easy at Bikers Clan. However, to facilitate a smooth return process, please follow these steps:
                </p>

                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>When receiving your order, please ensure you have an unboxing video taken in front of the courier. This will help us address any issues more effectively.</li>
                    <li>Return the product instantly if you encounter any problems.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">Refund Process</h2>
                <p className="text-gray-600 mb-4">
                    After we receive the returned product, our team will conduct a Quality Control (QC) check. We will then process your refund, typically within 3 working days. However, in some cases, it may take up to 7 days, depending on courier issues.
                </p>

                <h2 className="text-xl font-semibold mb-2">Shipping Charges</h2>
                <p className="text-gray-600 mb-4">
                    Please note that the shipping charges are non-refundable. Customers are responsible for the cost of shipping the product back to us.
                </p>

                <h2 className="text-xl font-semibold mb-2">Condition of the Product</h2>
                <p className="text-gray-600 mb-4">
                    Please return the product in its original condition. Any damage caused by the customer may affect the refund amount.
                </p>

                <p className="text-gray-600">
                    If you have any questions or need further assistance with a return or refund, don't hesitate to <a href="#contact">contact us</a>. We're here to ensure your shopping experience is hassle-free and satisfying.
                </p>
            </div>
        </div>
    );
};

export default ReturnAndRefund;
