'use client'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth()


  if (currentUser) {
    router.push('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        {currentUser && <Header/>}
        {!currentUser && <div className="flex w-full space-between flex-col md:flex-row">
          <Hero/> 
          <Login/>
      </div>}
    </main>
  );
}
