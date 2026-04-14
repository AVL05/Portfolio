'use client'

import * as React from 'react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-mono text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-card hover:bg-muted border border-border transition-all hover:border-primary/50"
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
    >
      <span className={language === 'es' ? 'text-primary' : 'text-foreground/40'}>ES</span>
      <span className="mx-1 text-foreground/20">/</span>
      <span className={language === 'en' ? 'text-primary' : 'text-foreground/40'}>EN</span>
    </Button>
  )
}
