"use client"
import Link from "next/link"
import {useState} from "react"
import {MenuIcon} from "lucide-react"
import {Poppins} from "next/font/google"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
const poppins = Poppins({
     subsets: ["latin"],
     weight:["700"]
     });
interface NavbarItemProps{
    href:string;
    children:React.ReactNode;
    isActive?:boolean;
}
const NavbarItem=({
    href,
    children,
    isActive}:NavbarItemProps)=>{
    return(
        <Button 
        asChild
        variant="outline"
        className={cn(
            "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
        )}> 
        <Link href={href}>
                {children}
        </Link>
        </Button>
    )
}
const navbarItems=[
    {href:"/",children:"Home"},
    {href:"/about",children:"About"},
    {href:"/features",children:"Features"},
    {href:"/pricing",children:"Pricing"},
    {href:"/contact",children:"Contact"},
]
export const Navbar=()=>{
    const pathname=usePathname();
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
    return (
        <div>
            <nav className="h-20 flex border-b justify-between font-medium bg-white">
                <Link href="/" className="pl-6 flex items-center">
                    <span className={cn("text-5xl font-semibold",poppins.className)}>
                        funroad
                    </span>
                </Link>
                <NavbarSidebar 
                items={navbarItems}
                open={isSidebarOpen} 
                onOpenChange={setIsSidebarOpen} />

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item)=>(
                    <NavbarItem 
                    key={item.href}
                    href={item.href}
                    isActive={pathname===item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
            </div>
            <div className="hidden lg:flex h-full">
                <Button 
                asChild
                variant="secondary" 
                className="border-l border-t-0 border-b-0 border-r-0 rounded-none bg-white hover:bg-pink-400 transition-colors text-lg h-full">
                    <Link href="/login">
                        Log in
                    </Link>
                </Button>
                <Button
                asChild
                className="border-l border-t-0 border-b-0 border-r-0 rounded-none bg-black text-white hover:bg-pink-400 
                hover:text-black transition-colors text-lg h-full">
                    <Link href="/signup">
                        Start selling
                    </Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Button 
                variant="ghost"
                className="size-12 border-transparent bg-white"
                onClick={()=>setIsSidebarOpen(true)}
                >
                    <MenuIcon/>
                </Button>
            </div>
            </nav>
        </div>
    )
}