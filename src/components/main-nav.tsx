"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../app/lib/utils";
import { HopIcon as Hockey } from "lucide-react";

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/upload",
      label: "Upload",
      active: pathname === "/upload",
    },
    {
      href: "/analytics",
      label: "Analytics",
      active: pathname === "/analytics",
    },
  ]

  return (
    <div className="flex items-center space-x-4 lg:space-x-6 w-full">
      <Link href="/" className="flex items-center space-x-2">
        <Hockey className="h-6 w-6" />
        <span className="font-bold">PuckYeah</span>
      </Link>
      <nav className="flex items-center space-x-6 ml-10">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
