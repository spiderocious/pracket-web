import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui'
import { Avatar } from '@shared/ui'
import { ChevronLeft } from '@shared/ui/icons'
import { avatarToneFromId } from '@shared/helpers'

interface ProfileHeaderProps {
  id: string
  displayName: string
}

export function ProfileHeader({ id, displayName }: Readonly<ProfileHeaderProps>) {
  const navigate = useNavigate()

  return (
    <div className="bg-paper border-b border-hair sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        <Button variant="quiet" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-1.5 -ml-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="w-px h-4 bg-hair" />
        <Avatar tone={avatarToneFromId(id)} size="sm" />
        <span className="font-sans font-medium text-[14px] text-ink truncate">{displayName}</span>
      </div>
    </div>
  )
}
