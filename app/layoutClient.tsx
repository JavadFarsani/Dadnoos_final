'use client'

import { useState, ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"

import SplashScreen from "@/app/_ui/splashScreen"
import InstallPopup from "@/app/_ui/InstallPopup"
import TermsPopup from "@/app/_ui/termsPopup"

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()

  const [showSplash, setShowSplash] = useState(true)
  const [showTerms, setShowTerms] = useState(false)
  const [showInstall, setShowInstall] = useState(false)

  const [checkedPWA, setCheckedPWA] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const isPWA =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone

    setCheckedPWA(true)

    const meta = document.querySelector('meta[name="viewport"]')
    if (!meta) return

    meta.setAttribute(
      'content',
      `width=device-width, initial-scale=1, viewport-fit=${isPWA ? 'cover' : 'auto'}`
    )
  }, [])

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }

    setVh()
    window.addEventListener('resize', setVh)

    return () => window.removeEventListener('resize', setVh)
  }, [])

  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted')
    setShowTerms(!accepted)
  }, [pathname])

  useEffect(() => {
    const isInstalled =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone

    if (isInstalled) return

    const skipped = localStorage.getItem('installSkipped')
    if (skipped) return

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true')
    setShowTerms(false)

    if (deferredPrompt) {
      setTimeout(() => {
        setShowInstall(true)
      }, 400)
    }
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setShowInstall(false)

    if (result.outcome === 'dismissed') {
      localStorage.setItem('installSkipped', 'true')
    }
  }

  const handleSkipInstall = () => {
    localStorage.setItem('installSkipped', 'true')
    setShowInstall(false)
  }

  if (!checkedPWA) return null

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <>
      <TermsPopup
        visible={showTerms}
        onAccept={handleAcceptTerms}
      />

      <InstallPopup
        visible={showInstall}
        onInstall={handleInstall}
        onSkip={handleSkipInstall}
      />

      {children}
    </>
  )
}
