"use client";
import { useEffect, useState } from "react";

import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = isAuthenticated();
        setIsLoggedIn(loggedIn);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, router]);


    return (
        <main>
            {children}
        </main>
    );
}
