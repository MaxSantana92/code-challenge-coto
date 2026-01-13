import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ModalShellProps = {
  title?: string
  subtitle?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
  contentClassName?: string
  children: React.ReactNode
}

function ModalShell({
  title,
  subtitle,
  trigger,
  open,
  onOpenChange,
  showCloseButton = true,
  contentClassName,
  children,
}: ModalShellProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          'max-w-md border border-slate-200 px-6 pb-6 pt-8 shadow-xl sm:px-8',
          contentClassName
        )}
      >
        {(title || subtitle) && (
          <DialogHeader className='text-center'>
            {title ? (
              <DialogTitle className='text-lg font-semibold text-slate-900'>{title}</DialogTitle>
            ) : null}
            {subtitle ? (
              <DialogDescription className='text-sm text-slate-600'>{subtitle}</DialogDescription>
            ) : null}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalShell
