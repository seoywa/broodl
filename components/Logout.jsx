'use client';

import React from 'react'
import Link from 'next/link';
import Button from './Button'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();
  console.log(pathname);
  if (!currentUser) {
    return null
  }

  if (pathname === '/') {
    return (
      <Link href='/'>
        <Button text='Go to Dashboard' />
      </Link>
    )
  }

  return (
    <div>
      <Button text="Logout" clickHander={logout}/>
    </div>
  )
}
