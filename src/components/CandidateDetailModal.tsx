import React from 'react'
import { Mail, CalendarDays, Layers, UserRound } from 'lucide-react'

import ModalShell from '@/components/ModalShell'
import { Badge } from '@/components/ui/badge'

export type Candidate = {
  id: string
  name: string
  email: string
  date: string
  stack: string[]
  seniority: string
}

type CandidateDetailModalProps = {
  candidate: Candidate
  trigger: React.ReactNode
}

function CandidateDetailModal({ candidate, trigger }: CandidateDetailModalProps) {
  return (
    <ModalShell trigger={trigger} title='Perfil del candidato' subtitle={candidate.seniority}>
      <div className='flex justify-center pb-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary'>
          <UserRound className='size-6' aria-hidden />
        </div>
      </div>

      <div className='mt-4 space-y-4 rounded-lg bg-orange-50/70 p-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs uppercase tracking-wide text-slate-500'>Nombre</span>
          <span className='text-sm font-semibold text-slate-900'>{candidate.name}</span>
        </div>

        <div className='flex items-start gap-3'>
          <Mail className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-slate-500'>Email</span>
            <span className='text-sm text-slate-800'>{candidate.email}</span>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <CalendarDays className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-slate-500'>Fecha de ingreso</span>
            <span className='text-sm text-slate-800'>{candidate.date}</span>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Layers className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col gap-2'>
            <div className='text-xs uppercase tracking-wide text-slate-500'>Stack</div>
            <div className='flex flex-wrap gap-2'>
              {candidate.stack.map((tech) => (
                <Badge
                  key={`${candidate.id}-${tech}`}
                  variant='secondary'
                  className='bg-white text-slate-800'
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

export default CandidateDetailModal
