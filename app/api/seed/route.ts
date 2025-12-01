import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
      where: { username: adminUsername },
      update: {},
      create: {
        username: adminUsername,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const defaultSkills = [
      { name: "Laravel", level: 95, category: "backend", icon: "laravel", order: 1 },
      { name: "Flutter", level: 90, category: "mobile", icon: "flutter", order: 2 },
      { name: "JavaScript", level: 88, category: "frontend", icon: "js", order: 3 },
      { name: "TypeScript", level: 85, category: "frontend", icon: "ts", order: 4 },
      { name: "PHP", level: 92, category: "backend", icon: "php", order: 5 },
      { name: "Next.js", level: 87, category: "frontend", icon: "next", order: 6 },
    ];

    for (const skill of defaultSkills) {
      await prisma.skill.upsert({
        where: { name: skill.name },
        update: skill,
        create: skill,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      admin: admin.username,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

