import { useEffect, useState } from 'react'
import { LoadedContext, prefersReducedMotion, usePointerBlobs, useScrollEffects } from './hooks/motion'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Story from './components/Story'
import Reels from './components/Reels'
import Shop from './components/Shop'
import Specialists from './components/Specialists'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Contact from './components/Contact'
import { Footer, WhatsAppFab } from './components/Footer'

// Toggle the intro curtain and the custom cursor here.
const SHOW_LOADER = true
const CUSTOM_CURSOR = true

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { scrolled, progress } = useScrollEffects()
  usePointerBlobs()

  useEffect(() => {
    const wait = SHOW_LOADER && !prefersReducedMotion() ? 1900 : 80
    const t = setTimeout(() => setLoaded(true), wait)
    return () => clearTimeout(t)
  }, [])

  return (
    <LoadedContext.Provider value={loaded}>
      <div
        className="fixed top-0 left-0 z-90 h-[3px] bg-cocoa transition-[width] duration-150 ease-linear"
        style={{ width: `${(progress * 100).toFixed(2)}%` }}
      />
      {CUSTOM_CURSOR && <CustomCursor />}
      {SHOW_LOADER && <Loader loaded={loaded} />}
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Story />
        <Reels />
        <Shop />
        <Specialists />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </LoadedContext.Provider>
  )
}
