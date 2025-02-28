import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 shadow bg-[var(--background)] flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-[var(--primary)]">
        Quiz App
      </Link>
      <div className="space-x-4">
        <Link href="/(auth)/login" className="text-[var(--foreground)] hover:text-[var(--primary-hover)]">Login</Link>
        <Link href="/(auth)/register" className="text-[var(--foreground)] hover:text-[var(--primary-hover)]">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;