import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Show, Switch, Case, Default, Repeat, Loadable } from 'meemaw'
import { MessageBubble, SafetyBanner, ReportModal, Button, Chip } from '@shared/ui'
import { SkeletonRow } from '@shared/ui'
import { ChevronLeft, Flag } from '@shared/ui/icons'
import { ROUTES } from '@shared/constants/routes'
import { useAuth } from '@features/auth/providers/use-auth'
import { useConnection } from '../api/use-connections'
import { useMessages, useSendMessage } from '../api/use-messages'
import { useSocket } from '../api/use-socket'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'

function formatMsgTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function SkeletonMessages() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <SkeletonRow name1Width="50%" name2Width="30%" />
      <SkeletonRow name1Width="40%" name2Width="55%" />
      <SkeletonRow name1Width="60%" name2Width="25%" />
    </div>
  )
}

export function ConversationScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, token } = useAuth()

  const [reportOpen, setReportOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const connectionQuery = useConnection(id ?? '')
  const messagesQuery = useMessages(id ?? '')
  const sendMessage = useSendMessage()

  const { sendViaSocket } = useSocket({
    connectionId: id ?? '',
    token,
    enabled: !!user && !!id,
  })

  const connection = connectionQuery.data
  const messages = messagesQuery.data?.data ?? []
  const isClosed = connection?.status === 'closed'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  function handleSend() {
    const body = messageText.trim()
    if (!body || !id) return
    setMessageText('')
    sendViaSocket(body)
    sendMessage.mutate({ connectionId: id, body })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function handleReport() {
    if (!id || !connection) return
    try {
      await apiClient.post(Endpoints.REPORTS, {
        connectionId: id,
        reason: 'Reported via conversation',
      })
    } finally {
      setReportOpen(false)
      navigate(ROUTES.CONVERSATIONS)
    }
  }

  const otherPartyLabel = connection
    ? user.id === connection.studentId ? `Tutor ${connection.tutorId}` : 'Student'
    : '…'

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <div className="bg-paper border-b border-hair sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Button variant="quiet" size="sm" onClick={() => navigate(ROUTES.CONVERSATIONS)} className="flex items-center gap-1.5 -ml-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="w-px h-4 bg-hair" />
          <span className="font-sans font-medium text-[14px] text-ink flex-1 truncate">{otherPartyLabel}</span>
          <Show when={!!connection}>
            <Switch>
              <Case when={isClosed}>
                <Chip variant="warn">Closed</Chip>
              </Case>
              <Default>
                <Chip variant="sage">Open</Chip>
              </Default>
            </Switch>
          </Show>
          <Show when={!isClosed && user.role === 'student'}>
            <Button variant="quiet" size="sm" onClick={() => setReportOpen(true)} className="text-ink-3 hover:text-crit">
              <Flag className="w-4 h-4" />
            </Button>
          </Show>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 sm:px-6 py-4">
        <Loadable loading={messagesQuery.isLoading} loadingComponent={<SkeletonMessages />}>
          <SafetyBanner />
          <Switch>
            <Case when={messages.length === 0}>
              <p className="font-sans text-[13px] text-ink-4 text-center py-8">No messages yet. Say hello!</p>
            </Case>
            <Default>
              <div className="flex flex-col">
                <Repeat each={[...messages].reverse()}>
                  {(msg) => (
                    <MessageBubble
                      key={msg.id}
                      direction={msg.senderId === user.id ? 'out' : 'in'}
                      meta={formatMsgTime(msg.createdAt)}
                    >
                      {msg.body}
                    </MessageBubble>
                  )}
                </Repeat>
                <div ref={bottomRef} />
              </div>
            </Default>
          </Switch>
        </Loadable>
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 bg-paper border-t border-hair max-w-2xl mx-auto w-full px-4 sm:px-6 py-3">
        <Switch>
          <Case when={isClosed}>
            <p className="font-sans text-[13px] text-ink-4 text-center py-2">This conversation is closed.</p>
          </Case>
          <Default>
            <div className="flex gap-2 items-end">
              <textarea
                rows={2}
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                className="flex-1 resize-none bg-sheet border border-hair rounded-[12px] px-4 py-3 font-sans text-[14px] text-ink placeholder:text-ink-4 outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(59,183,94,0.18)] transition-[border-color,box-shadow] duration-quick"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSend}
                disabled={!messageText.trim() || sendMessage.isPending}
              >
                Send
              </Button>
            </div>
          </Default>
        </Switch>
      </div>

      {/* Report modal */}
      <Show when={reportOpen}>
        <ReportModal
          tutorName={otherPartyLabel}
          onCancel={() => setReportOpen(false)}
          onReport={() => void handleReport()}
        />
      </Show>
    </div>
  )
}
