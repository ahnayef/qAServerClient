import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        // Check if user exists
        const [userRows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (userRows.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const user = userRows[0];

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || "your_secret_key", // Use a more secure key in production
            { expiresIn: "1h" }
        );

        return NextResponse.json({ message: "Login successful", token, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error logging in" }, { status: 500 });
    }
}
