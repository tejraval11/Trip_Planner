"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4 ">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">AI Travel Planner</h1>
      </div>

      {/* Nav */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-lg hover:scale-105 hover:text-primary transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Get Started */}
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <Link href="/create-new-trip">
          <Button>Create New Trip</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
