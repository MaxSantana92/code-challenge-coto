import { Eye, Mail } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import ContactModal from '@/modules/messages/view/ContactModal'
import type { Candidate } from '../../model'
import { CandidateDetailModal } from './CandidateDetailModal'

type CandidateRowProps = {
  candidate: Candidate
}

export function CandidateRow({ candidate }: CandidateRowProps) {
  const visibleSkills = candidate.skills.slice(0, 3)
  const remaining = candidate.skills.length - visibleSkills.length

  return (
    <TableRow className='hover:bg-muted/60'>
      <TableCell className='pl-6'>
        <div className='flex items-center gap-3'>
          <Avatar className='h-11 w-11'>
            <AvatarFallback>{candidate.username.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{candidate.username}</span>
            <span className='text-xs text-muted-foreground'>
              Miembro desde {formatDate(candidate.joined_at)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-muted-foreground'>{formatDate(candidate.joined_at)}</TableCell>
      <TableCell>
        <div className='flex flex-wrap items-center gap-2'>
          {visibleSkills.map((skill) => (
            <Badge
              key={`${candidate.username}-${skill.language}-${skill.level}`}
              variant='secondary'
              className='bg-accent text-foreground'
            >
              {skill.language} ({skill.level})
            </Badge>
          ))}
          {remaining > 0 && (
            <Badge variant='outline' className='border-primary/40 text-primary'>
              +{remaining}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant='outline' className='border-primary/40 text-primary'>
          {candidate.score}
        </Badge>
      </TableCell>
      <TableCell className='pr-6'>
        <div className='flex justify-end gap-2'>
          <CandidateDetailModal
            candidate={candidate}
            trigger={
              <Button
                variant='outline'
                size='icon'
                className='border-border text-foreground hover:border-primary hover:text-primary'
                title='Ver detalles'
                aria-label='Ver detalles'
              >
                <Eye className='size-4' />
              </Button>
            }
          />
          <ContactModal
            trigger={
              <Button
                size='icon'
                className='bg-primary text-primary-foreground hover:bg-primary/90'
                title='Contactar'
                aria-label='Contactar'
              >
                <Mail className='size-4' />
              </Button>
            }
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
