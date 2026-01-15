import { Award, CalendarDays, Layers, UserRound } from 'lucide-react'
import type React from 'react'

import ModalShell from '@/components/ModalShell'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { Candidate } from '../../model'

type CandidateDetailModalProps = {
  candidate: Candidate
  trigger: React.ReactNode
}

export function CandidateDetailModal({ candidate, trigger }: CandidateDetailModalProps) {
  const firstSkill = candidate.skills[0]

  return (
    <ModalShell
      trigger={trigger}
      title='Perfil del candidato'
      subtitle={firstSkill ? `${firstSkill.language} (${firstSkill.level})` : 'Sin skills cargadas'}
    >
      <div className='flex justify-center pb-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary'>
          <UserRound className='size-6' aria-hidden />
        </div>
      </div>

      <div className='mt-4 space-y-4 rounded-lg bg-card border border-border p-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs uppercase tracking-wide text-muted-foreground'>Usuario</span>
          <span className='text-sm font-semibold text-foreground'>{candidate.username}</span>
        </div>

        <div className='flex items-start gap-3'>
          <CalendarDays className='mt-0.5 size-4 text-muted-foreground' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-muted-foreground'>
              Fecha de ingreso
            </span>
            <span className='text-sm text-foreground'>{formatDate(candidate.joined_at)}</span>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Layers className='mt-0.5 size-4 text-muted-foreground' aria-hidden />
          <div className='flex flex-col gap-2'>
            <div className='text-xs uppercase tracking-wide text-muted-foreground'>Skills</div>
            <div className='flex flex-wrap gap-2'>
              {candidate.skills.map((skill) => (
                <Badge
                  key={`${candidate.username}-${skill.language}-${skill.level}`}
                  variant='secondary'
                  className='bg-accent text-foreground'
                >
                  {skill.language} ({skill.level})
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Award className='mt-0.5 size-4 text-muted-foreground' aria-hidden />
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-muted-foreground'>Score</span>
            <span className='text-sm text-foreground'>{candidate.score}</span>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
