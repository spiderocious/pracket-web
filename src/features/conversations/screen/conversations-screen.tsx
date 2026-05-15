import { useNavigate, Navigate } from 'react-router-dom'
import { Repeat, Switch, Case, Default, Loadable } from 'meemaw'
import { ConversationItem } from '@shared/ui'
import { EmptyState, SkeletonRow } from '@shared/ui'
import { MessageCircle } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useConnections } from '../api/use-connections'
import type { Connection } from '@shared/types'

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return date.toLocaleDateString('en-GB', { weekday: 'short' })
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function connectionLabel(conn: Connection, userId: string): string {
  if (conn.studentId === userId) return `Tutor ${conn.tutorId}`
  return `Student`
}

function SkeletonList() {
  return (
    <div className="grid gap-1">
      <SkeletonRow name1Width="30%" name2Width="55%" />
      <SkeletonRow name1Width="40%" name2Width="50%" />
      <SkeletonRow name1Width="25%" name2Width="60%" />
    </div>
  )
}

export function ConversationsScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const connectionsQuery = useConnections()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  const connections = connectionsQuery.data ?? []

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="py-8 border-b border-hair mb-2">
          <h1 className="font-serif font-medium text-[28px] tracking-display text-ink">
            Conversations
          </h1>
          <p className="font-sans text-[14px] text-ink-3 mt-1">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <Loadable loading={connectionsQuery.isLoading} loadingComponent={<SkeletonList />}>
          <Switch>
            <Case when={connections.length === 0}>
              <EmptyState
                title="No conversations yet"
                description="Connect with a tutor to start a conversation."
                icon={<MessageCircle className="w-16 h-16" />}
              />
            </Case>
            <Default>
              <div className="py-2">
                <Repeat each={connections}>
                  {(conn) => (
                    <div key={conn.id} onClick={() => navigate(ROUTES.CONVERSATION.replace(':id', conn.id))} className="cursor-pointer">
                      <ConversationItem
                        name={connectionLabel(conn, user.id)}
                        preview={conn.status === 'closed' ? 'Conversation closed' : 'Tap to open conversation'}
                        time={formatTime(conn.openedAt ?? conn.createdAt)}
                      />
                    </div>
                  )}
                </Repeat>
              </div>
            </Default>
          </Switch>
        </Loadable>
      </div>
    </div>
  )
}
