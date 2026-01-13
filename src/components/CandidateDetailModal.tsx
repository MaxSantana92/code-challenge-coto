import React from 'react'
import { CalendarDays, Layers, UserRound, Award } from 'lucide-react'

import ModalShell from '@/components/ModalShell'
import { Badge } from '@/components/ui/badge'
import type { Candidate } from '@/modules/dashboard/model'

type CandidateDetailModalProps = {
  candidate: Candidate
  trigger: React.ReactNode
}

function CandidateDetailModal({ candidate, trigger }: CandidateDetailModalProps) {
  const firstSkill = candidate.skills[0]
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(value))

  return (
    <ModalShell
      trigger={trigger}
      title='Perfil del candidato'
      subtitle={firstSkill ? `${firstSkill.language} (${firstSkill.level})` : 'Sin skills cargadas'}
    >
      <div className='flex justify-center pb-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary'>
          <UserRound className='size-6' aria-hidden />
        </div>
      </div>

      <div className='mt-4 space-y-4 rounded-lg bg-orange-50/70 p-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs uppercase tracking-wide text-slate-500'>Usuario</span>
          <span className='text-sm font-semibold text-slate-900'>{candidate.username}</span>
        </div>

        <div className='flex items-start gap-3'>
          <CalendarDays className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-slate-500'>Fecha de ingreso</span>
            <span className='text-sm text-slate-800'>{formatDate(candidate.joined_at)}</span>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Layers className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col gap-2'>
            <div className='text-xs uppercase tracking-wide text-slate-500'>Skills</div>
            <div className='flex flex-wrap gap-2'>
              {candidate.skills.map((skill) => (
                <Badge
                  key={`${candidate.username}-${skill.language}-${skill.level}`}
                  variant='secondary'
                  className='bg-white text-slate-800'
                >
                  {skill.language} ({skill.level})
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Award className='mt-0.5 size-4 text-slate-500' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-slate-500'>Score</span>
            <span className='text-sm text-slate-800'>{candidate.score}</span>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

export default CandidateDetailModal
