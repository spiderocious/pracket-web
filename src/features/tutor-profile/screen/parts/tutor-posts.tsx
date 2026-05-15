import { useQuery } from '@tanstack/react-query'
import { Repeat, Switch, Case, Default } from 'meemaw'
import { apiClient } from '@shared/api'
import { Endpoints } from '@shared/constants/endpoints'
import type { Post } from '@shared/types'

interface TutorPostsProps {
  tutorId: string
}

interface PostCardProps {
  post: Post
}

function PostCard({ post }: Readonly<PostCardProps>) {
  const date = new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="bg-sheet rounded-[16px] border border-hair p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-2">{date}</p>
      <h3 className="font-serif font-medium text-[17px] tracking-display text-ink mb-2 leading-snug">{post.title}</h3>
      <p className="font-sans text-[13.5px] text-ink-2 leading-relaxed line-clamp-4">{post.body}</p>
    </article>
  )
}

export function TutorPosts({ tutorId }: Readonly<TutorPostsProps>) {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts', tutorId],
    queryFn: () => apiClient.get<Post[]>(`${Endpoints.POSTS}?tutorId=${tutorId}`),
  })

  const hasPosts = posts.length > 0

  return (
    <Switch>
      <Case when={hasPosts}>
        <section className="mt-8">
          <h2 className="font-mono text-[10.5px] uppercase tracking-overline text-ink-4 mb-4">Sunday Notes</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Repeat each={posts}>
              {(post) => <PostCard key={post.id} post={post} />}
            </Repeat>
          </div>
        </section>
      </Case>
      <Default>{null}</Default>
    </Switch>
  )
}
