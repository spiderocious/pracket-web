import { ConnectModal } from '@shared/ui'
import { useConnect } from '../../api/use-connect'
import type { TutorProfile } from '@shared/types'

interface ConnectModalWrapperProps {
  tutor: TutorProfile
  onClose: () => void
  onSuccess: () => void
}

export function ConnectModalWrapper({ tutor, onClose, onSuccess }: Readonly<ConnectModalWrapperProps>) {
  const connect = useConnect()

  function handleConnect() {
    connect.mutate({ tutorId: tutor.id }, { onSuccess })
  }

  const name = (tutor.displayName ?? '').split(' ')[0] || 'this tutor'

  return (
    <ConnectModal
      tutorName={name}
      subject={tutor.subjects?.[0] ?? 'Tutoring'}
      connectFee={tutor.connectionFee ?? 500}
      sessionRate={tutor.rate ?? 0}
      onCancel={onClose}
      onConnect={handleConnect}
    />
  )
}
