"use client";
import {
  Globe2Icon,
  Home,
  PlusSquareIcon,
  User2Icon,
  LogOutIcon,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alertDialogue";
import { AuthApi } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectUserProfile } from "@/store/selector";
import Avatar from "./shared/Avatar";
import { DEFAULT_PROFILE_PIC, WEBSITE_LOGO } from "@/constants/constants";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2Icon,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Globe2Icon,
  },
  {
    title: "Post",
    url: "/post",
    icon: PlusSquareIcon,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const user = useSelector(selectUserProfile);
  const { open } = useSidebar();

  const handleLogout = async () => {
    try {
      await AuthApi.logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.warning("Failed to logout, try again!");
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-white text-gray-800 h-full shadow-lg z-50"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl flex justify-center font-semibold py-6 px-6 border-b rounded-none">
            <Image
              className="w-30"
              width={100}
              height={100}
              src={WEBSITE_LOGO}
              alt="instagram"
            />{" "}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-gray-50">
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-4 px-6 py-3 rounded-md transition-all hover:shadow-sm"
                    >
                      <item.icon className="w-6 h-6 text-gray-500" />
                      <span className="text-md font-medium text-gray-800">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout Option */}
              <SidebarMenuItem className="hover:bg-red-50">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarMenuButton asChild>
                      <button className="flex items-center gap-4 px-6 py-3 rounded-md transition-all hover:shadow-sm hover:text-red-600 text-red-500">
                        <LogOutIcon className="w-6 h-6" />
                        <span className="text-md font-medium">Logout</span>
                      </button>
                    </SidebarMenuButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-light text-gray-700">
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="px-4 py-2 border border-gray-300 rounded-md">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={handleLogout}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-300 py-2">
        <SidebarMenu>
          <Link href={"/profile"} className="">
            <SidebarMenuItem className="flex items-center gap-4 hover:bg-gray-50 rounded-md transition-all">
              <SidebarMenuButton className="h-[60px]">
                {user.profilePicture !== "" ? (
                  <Avatar
                    src={user.profilePicture || DEFAULT_PROFILE_PIC}
                    alt={user.username}
                    size={`${open ? "h-12 w-12" : "h-6 w-6"}`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <User2 className="w-10 h-10 text-gray-500 rounded-full border border-gray-300" />
                )}

                <div className="flex flex-col ml-2">
                  <span className="text-sm font-medium text-gray-800">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-500">View Profile</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
