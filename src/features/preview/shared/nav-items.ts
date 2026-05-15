export type NavGroup = 'Foundation' | 'Primitives' | 'Data & State' | 'Conversation' | 'Overlays & Feedback'

export interface NavItem {
  readonly label: string
  readonly id: string
  readonly group: NavGroup
}

export const NAV_ITEMS: readonly NavItem[] = [
  // Foundation
  { label: 'Palette', id: 'palette', group: 'Foundation' },
  { label: 'Typography', id: 'type', group: 'Foundation' },
  { label: 'Geometry', id: 'geometry', group: 'Foundation' },
  { label: 'Motion', id: 'motion', group: 'Foundation' },
  { label: 'Icons', id: 'icons', group: 'Foundation' },

  // Primitives
  { label: 'Buttons', id: 'buttons', group: 'Primitives' },
  { label: 'Inputs', id: 'inputs', group: 'Primitives' },
  { label: 'Selection', id: 'selection', group: 'Primitives' },
  { label: 'Tutor Inputs', id: 'tutor-inputs', group: 'Primitives' },

  // Data & State
  { label: 'List Row', id: 'list-row', group: 'Data & State' },
  { label: 'Profile Card', id: 'profile-card', group: 'Data & State' },
  { label: 'Credentials', id: 'credentials', group: 'Data & State' },
  { label: 'Price', id: 'price', group: 'Data & State' },
  { label: 'Avatars & Chips', id: 'avatars-chips', group: 'Data & State' },
  { label: 'Empty & Loading', id: 'empty-loading', group: 'Data & State' },
  { label: 'Stats Strip', id: 'stats-strip', group: 'Data & State' },

  // Conversation
  { label: 'Message Bubble', id: 'message-bubble', group: 'Conversation' },
  { label: 'Conversation', id: 'conversation', group: 'Conversation' },

  // Overlays & Feedback
  { label: 'Modal', id: 'modal', group: 'Overlays & Feedback' },
  { label: 'Report Modal', id: 'report-modal', group: 'Overlays & Feedback' },
  { label: 'Drawer Service', id: 'drawer', group: 'Overlays & Feedback' },
  { label: 'Banners', id: 'banners', group: 'Overlays & Feedback' },
]

export const NAV_GROUPS: readonly NavGroup[] = [
  'Foundation',
  'Primitives',
  'Data & State',
  'Conversation',
  'Overlays & Feedback',
]
