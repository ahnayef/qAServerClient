import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-12">
      <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
      <div className="mt-2">
        <Link href="#" className="hover:text-yellow-400 mx-2">Facebook</Link>
        <Link href="#" className="hover:text-yellow-400 mx-2">Twitter</Link>
        <Link href="#" className="hover:text-yellow-400 mx-2">LinkedIn</Link>
      </div>
    </footer>
  );
};

export default Footer;
