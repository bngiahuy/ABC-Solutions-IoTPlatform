/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import supabase from 'utils/supabase-init'
async function supabaseSignUp(_email: string, _password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: _email,
    password: _password
  })
  if (error) throw error
  return data
}
const SignUpPage = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [errMess, setErrMess] = useState('')
  const [checked, setChecked] = useState(false)
  const { layoutConfig } = useContext(LayoutContext)
  const handleSignUp = () => {
    try {
      const x = supabaseSignUp(email, password)
      router.push('/auth/login')
    } catch (err) {
      setErrMess("Try again! Something's wrong.")
    }
    return
  }
  const router = useRouter()
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' })

  return (
    <div className={containerClassName}>
      <div className='flex flex-column align-items-center justify-content-center'>
        <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt='Sakai logo' className='mb-5 w-6rem flex-shrink-0' />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div className='w-full surface-card py-6 px-5 sm:px-8' style={{ borderRadius: '53px' }}>
            <div className='flex float-start'>
              <Button label='Sign In' text onClick={() => router.push('/auth/login')} />
            </div>
            <div className='text-center mb-5'>
              <img src='/demo/images/login/avatar.png' alt='Image' height='50' className='mb-3' />
              <div className='text-900 text-3xl font-medium mb-3'>Welcome, Isabel!</div>
              <span className='text-600 font-medium'>Sign up to continue</span>
            </div>

            <div>
              <label htmlFor='email1' className='block text-900 text-xl font-medium mb-2'>
                Email
              </label>
              <InputText
                id='email1'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setErrMess('')
                }}
                type='text'
                placeholder='Email address'
                className='w-full md:w-30rem mb-5'
                style={{ padding: '1rem' }}
              />

              <label htmlFor='password1' className='block text-900 font-medium text-xl mb-2'>
                Password
              </label>
              <Password inputId='password1' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' toggleMask className={`w-full ${errMess ? 'mb-3' : 'mb-5'}`} inputClassName='w-full p-3 md:w-30rem'></Password>
              {errMess && <div style={{ color: 'red', marginBottom: '1rem' }}>{errMess}</div>}
              <div className='flex align-items-center justify-content-between mb-5 gap-5'>
                <div className='flex align-items-center'>
                  <Checkbox inputId='rememberme1' checked={checked} onChange={e => setChecked(e.checked ?? false)} className='mr-2'></Checkbox>
                  <label htmlFor='rememberme1'>Remember me</label>
                </div>
                <a className='font-medium no-underline ml-2 text-right cursor-pointer' style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </a>
              </div>
              <Button label='Sign Up' className='w-full p-3 text-xl' onClick={() => handleSignUp()}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
