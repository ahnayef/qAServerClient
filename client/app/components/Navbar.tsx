import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 shadow bg-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Quiz App
      </Link>
      <div className="space-x-4">
        <Link href="/(auth)/login" className="text-gray-700 hover:text-blue-500">Login</Link>
        <Link href="/(auth)/register" className="text-gray-700 hover:text-blue-500">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
