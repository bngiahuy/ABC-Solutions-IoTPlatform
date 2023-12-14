'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from 'utils/supabase-init'
import { NextResponse } from 'next/server'

const SignOutPage = async () => {
  const router = useRouter()
  await supabase.auth.signOut()
  return router.push('auth/login')
}

export default SignOutPage
