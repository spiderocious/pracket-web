import { useEffect, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import type { Message } from '@shared/types'

const SOCKET_URL = (import.meta.env['VITE_SOCKET_URL'] as string | undefined) ?? 'http://localhost:8086'

interface UseSocketOptions {
  connectionId: string
  token: string | null
  enabled: boolean
}

export function useSocket({ connectionId, token, enabled }: UseSocketOptions) {
  const qc = useQueryClient()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!enabled || !token || !connectionId) return

    const socket = io(SOCKET_URL, { auth: { token } })
    socketRef.current = socket

    socket.emit('join_connection', connectionId)

    socket.on('new_message', ({ data }: { data: Message }) => {
      qc.setQueryData<{ data: Message[]; meta: unknown }>(['messages', connectionId], old => {
        if (!old) return old
        const alreadyExists = old.data.some(m => m.id === data.id)
        if (alreadyExists) return old
        return { ...old, data: [data, ...old.data] }
      })
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [connectionId, token, enabled, qc])

  function sendViaSocket(body: string) {
    socketRef.current?.emit('send_message', { connectionId, body })
  }

  return { sendViaSocket }
}
