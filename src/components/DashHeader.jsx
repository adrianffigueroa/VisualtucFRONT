//import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { Menu } from 'lucide-react'

const DashHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <Logo />
        <nav className='hidden md:flex space-x-4'>
          <NavLinks />
        </nav>
        <div className='md:hidden'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button>
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent side='right'>
              <div className='p-4'>
                <Logo />
                <nav className='flex flex-col space-y-4'>
                  <NavLinks />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default DashHeader
