"use client";

import React from "react";
import { LogOut, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutButton from "./logout-button";
import { useCurrentUser } from "../hooks/use-current-user";

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("relative rounded-full")}>
          <Avatar>
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-red-500">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4">
        <DropdownMenuItem>
          <span>{user?.email || "User"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="h-4 w-4" />
            LogOut
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
