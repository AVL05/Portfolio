'use client'

import * as React from 'react'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Home,
  Briefcase,
  Code,
  Image as ImageIcon,
  Mail,
  Languages,
  Search,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from 'next-themes'

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-50 p-3 bg-secondary/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300 group"
        title="Command Palette (Ctrl+K)"
      >
        <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="sr-only">Open Command Palette</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={language === 'es' ? 'Escribe un comando o busca...' : 'Type a command or search...'} />
        <CommandList className="max-h-[300px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={language === 'es' ? 'Navegación' : 'Navigation'}>
            <CommandItem onSelect={() => scrollTo('hero')}>
              <Home className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo('about')}>
              <User className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Sobre mí' : 'About'}</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo('skills')}>
              <Code className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Habilidades' : 'Skills'}</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo('projects')}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Proyectos' : 'Projects'}</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo('photography')}>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Fotografía' : 'Photography'}</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo('contact')}>
              <Mail className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={language === 'es' ? 'Configuración' : 'Settings'}>
            <CommandItem onSelect={() => setLanguage(language === 'es' ? 'en' : 'es')}>
              <Languages className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme('light')}>
              <Smile className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Tema Claro' : 'Light Theme'}</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme('dark')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{language === 'es' ? 'Tema Oscuro' : 'Dark Theme'}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
