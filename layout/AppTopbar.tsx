/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { classNames } from 'primereact/utils'
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import { AppTopbarRef } from '../types/types'
import { LayoutContext } from './context/layoutcontext'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useRouter } from 'next/navigation'
import supabase from 'utils/supabase-init'
const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
  const menubuttonRef = useRef(null)
  const topbarmenuRef = useRef(null)
  const topbarmenubuttonRef = useRef(null)
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const router = useRouter()
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }))
  const handleSignout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    return
  }

  const confirmationDialogFooter = (
    <>
      <Button type='button' label='No' icon='pi pi-times' onClick={() => setDisplayConfirmation(false)} text />
      <Button
        type='button'
        label='Yes'
        icon='pi pi-check'
        onClick={() => {
          //   console.log('Button clicked')
          setDisplayConfirmation(false)
          handleSignout()
        }}
        text
        autoFocus
      />
    </>
  )
  return (
    <div className='layout-topbar'>
      <Link href='/' className='layout-topbar-logo'>
        <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width='47.22px' height={'35px'} alt='logo' />
        <span>ABC Solutions IoT</span>
      </Link>

      <button ref={menubuttonRef} type='button' className='p-link layout-menu-button layout-topbar-button' onClick={onMenuToggle}>
        <i className='pi pi-bars' />
      </button>

      <button ref={topbarmenubuttonRef} type='button' className='p-link layout-topbar-menu-button layout-topbar-button' onClick={showProfileSidebar}>
        <i className='pi pi-ellipsis-v' />
      </button>

      <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
        <button type='button' className='p-link layout-topbar-button'>
          <i className='pi pi-calendar'></i>
          <span>Calendar</span>
        </button>
        <button type='button' className='p-link layout-topbar-button'>
          <i className='pi pi-user'></i>
          <span>Profile</span>
        </button>
        <div>
          {/* <button type='button' className='p-link layout-topbar-button' onClick={() => setDisplayConfirmation(true)}>
            <i className='pi pi-sign-out'></i>
            <span>Sign out</span> */}
          <Button type='button' className='p-link layout-topbar-button' icon='pi pi-sign-out' onClick={() => setDisplayConfirmation(true)} style={{ background: 'none' }} />
          <Dialog header='Confirmation' visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
            <div className='flex align-items-center justify-content-center'>
              <i className='pi pi-exclamation-triangle mr-3' style={{ fontSize: '2rem' }} />
              <span>Are you sure you want to sign out?</span>
            </div>
          </Dialog>
          {/* </button> */}
        </div>
      </div>
    </div>
  )
})

AppTopbar.displayName = 'AppTopbar'

export default AppTopbar
