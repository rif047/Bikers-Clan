import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto">
            <title>Privacy Policy</title>
            <div className="p-8 md:p-20 text-justify">
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-4">
                    This Privacy Policy outlines how Bikers Clan collects, uses, and protects your personal information when you use our services.
                </p>

                <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                    We may collect personal information, including but not limited to your name, email address, shipping address, and payment information, when you use our services.
                </p>

                <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                    We may use your information to process orders, provide customer support, personalize your experience, and send promotional materials.
                </p>

                <h2 className="text-xl font-semibold mb-2">Data Security</h2>
                <p className="text-gray-600 mb-4">
                    We take measures to protect your personal information, but we cannot guarantee absolute security. Please use strong passwords and secure your account.
                </p>

                <h2 className="text-xl font-semibold mb-2">Cookies</h2>
                <p className="text-gray-600 mb-4">
                    We use cookies to improve your experience and collect information about how you use our services.
                </p>

                <h2 className="text-xl font-semibold mb-2">Third-Party Links</h2>
                <p className="text-gray-600 mb-4">
                    Our services may contain links to third-party websites. We are not responsible for the privacy practices of those websites.
                </p>

                <h2 className="text-xl font-semibold mb-2">Changes to Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                    We may update our Privacy Policy. You will be notified of any changes.
                </p>

                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                    For questions or concerns regarding these terms and conditions, you may contact us at <Link className="font-bold" href={'mailto:bikersclan.bd@gmail.com'}>bikersclan.bd@gmail.com</Link> or call us <Link className="font-bold" href={'tel:+8801686869727'}>+8801 68 68 69 727</Link>.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
