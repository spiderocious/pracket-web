import { useNavigate } from 'react-router-dom'
import { SiteHeader, Button } from '@shared/ui'
import { ChevronLeft } from '@shared/ui/icons'
import { avatarToneFromId } from '@shared/helpers'

const AVATAR_BG: Record<string, string> = {
  default: 'linear-gradient(135deg, #D9C9A9, #B59F76)',
  sage: 'linear-gradient(135deg, #BFD5C5, #8FB39C)',
  sand: 'linear-gradient(135deg, #E8DEC4, #C8B990)',
  clay: 'linear-gradient(135deg, #D9BFB2, #B8907C)',
  bone: 'linear-gradient(135deg, #E5E0D4, #C8C0B0)',
}

interface ProfileHeaderProps {
  id: string
  displayName: string
}

export function ProfileHeader({ id, displayName }: Readonly<ProfileHeaderProps>) {
  const navigate = useNavigate()
  const tone = avatarToneFromId(id)
  const bg = AVATAR_BG[tone] ?? AVATAR_BG['default']

  return (
    <div>
      <SiteHeader />
      <div className="border-b border-hair bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-2.5">
          <Button variant="quiet" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-1.5 -ml-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="w-px h-4 bg-hair" />
          <div
            className="rounded-full shrink-0"
            style={{ width: 22, height: 22, background: bg, border: '1px solid rgba(0,0,0,0.08)' }}
          />
          <span className="font-sans text-[13px] font-medium text-ink truncate">{displayName}</span>
        </div>
      </div>
    </div>
  )
}
