"use client";
import { useEffect, useState } from "react";

import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const loggedIn = isAuthenticated();
        if (!loggedIn) {
            router.push("/login");
        }
    }, []);


    return (
        <main>
            {children}
        </main>
    );
}
