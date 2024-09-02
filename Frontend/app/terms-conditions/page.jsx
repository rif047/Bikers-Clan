import Link from "next/link";


const TermsAndConditions = () => {
    return (
        <div className="container mx-auto">
            <title>Terms & Conditions</title>
            <div className="p-8 md:p-20 text-justify">
                <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-gray-600 mb-4">
                    By using Bikers Clan's services, you agree to abide by these terms and conditions.
                </p>

                <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                    All intellectual property, including trademarks, logos, and content, belongs to Bikers Clan. You are not authorized to use or reproduce them without our permission.
                </p>

                <h2 className="text-xl font-semibold mb-2">Products and Services</h2>
                <p className="text-gray-600 mb-4">
                    Bikers Clan offers a range of products and services. Product descriptions, prices, and availability are subject to change without notice.
                </p>

                <h2 className="text-xl font-semibold mb-2">Ordering and Payment</h2>
                <p className="text-gray-600 mb-4">
                    When placing an order, you agree to provide accurate and complete information. Payments are processed securely. We accept various payment methods.
                </p>

                <h2 className="text-xl font-semibold mb-2">Shipping and Delivery</h2>
                <p className="text-gray-600 mb-4">
                    Bikers Clan will make reasonable efforts to ensure the timely delivery of products. However, delivery times may vary. Shipping costs and estimated delivery times are provided at checkout.
                </p>

                <h2 className="text-xl font-semibold mb-2">Returns and Refunds</h2>
                <p className="text-gray-600 mb-4">
                    Our return and refund policy is outlined separately. Please review it for details regarding returns and refund eligibility.
                </p>

                <h2 className="text-xl font-semibold mb-2">User Accounts</h2>
                <p className="text-gray-600 mb-4">
                    When creating a user account, you are responsible for maintaining the confidentiality of your account information. Inform us immediately of any unauthorized access.
                </p>

                <h2 className="text-xl font-semibold mb-2">User Conduct</h2>
                <p className="text-gray-600 mb-4">
                    Users are expected to engage respectfully and responsibly when using Bikers Clan's services. Inappropriate behavior, including harassment or unlawful activities, will not be tolerated.
                </p>

                <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                    Bikers Clan is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
                </p>

                <h2 className="text-xl font-semibold mb-2">Termination of Accounts</h2>
                <p className="text-gray-600 mb-4">
                    Bikers Clan reserves the right to terminate user accounts for violation of these terms or any applicable laws.
                </p>

                <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                    Bikers Clan may update these terms and conditions from time to time. Users will be notified of any changes.
                </p>

                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                    For questions or concerns regarding these terms and conditions, you may contact us at <Link className="font-bold" href={'mailto:bikersclan.bd@gmail.com'}>bikersclan.bd@gmail.com</Link> or call us <Link className="font-bold" href={'tel:+8801686869727'}>+8801 68 68 69 727</Link>.
                </p>

            </div>
        </div>
    );
};

export default TermsAndConditions;
