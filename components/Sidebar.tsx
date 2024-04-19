"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";

import SidebarLink from "@/components/SidebarLink";
import Library from "@/components/Library";
import usePlayer from "@/hooks/usePlayer";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const { activeId } = usePlayer();
  const routes = useMemo(() => {
    return [
      {
        label: "홈",
        path: "/",
        Icon: GoHomeFill,
        active: pathname === "/",
      },
      {
        label: "검색하기",
        path: "/search",
        Icon: IoSearch,
        active: pathname === "/search",
      },
    ];
  }, [pathname]);

  return (
    <div
      className={twMerge(
        "flex gap-2 p-2",
        activeId ? "h-[calc(100%-80px)]" : "h-full"
      )}
    >
      <div className="flex flex-col gap-2 h-full min-w-[420px]">
        <div className="flex flex-col gap-5 p-5 rounded-md bg-neutral-900">
          <div className="flex items-center gap-[2px]">
            <FaSpotify size={24} />
            <span className="text-sm font-semibold">Spotify</span>
          </div>
          {routes.map((route) => (
            <SidebarLink key={route.label} {...route} />
          ))}
        </div>
        <div className="h-full rounded-md bg-neutral-900">
          <Library />
        </div>
      </div>
      <div className="flex-1 rounded-md bg-neutral-900 overflow-scroll">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
