import type { AvatarTone } from '../types/models'

const TONES: AvatarTone[] = ['default', 'sage', 'sand', 'clay', 'bone']

export function avatarToneFromId(id: string): AvatarTone {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return TONES[hash % TONES.length] as AvatarTone
}
