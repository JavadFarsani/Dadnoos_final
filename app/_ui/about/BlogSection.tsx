import Link from 'next/link'

import type { BlogPostPreview } from '@/lib/blog/posts'
import BlogCards from '@/app/_ui/blog/BlogCards'

interface BlogSectionProps {
  posts: BlogPostPreview[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const latest = posts.slice(0, 3)

  return (
    <section id="blog" className="mx-auto my-20 space-y-6 md:mt-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className='space-y-2 ps-1'>
          <h2 className="text-2xl md:text-4xl font-black">وبلاگ دادنوس</h2>
          <p className="text-sm text-neutral-500">آخرین نوشته‌های تیم حقوقی</p>
        </div>
        <Link
          href="/blog"
          className="rounded-3xl border border-neutral-300/70 px-4 py-2 text-sm text-neutral-700 
             hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
        >
          <span className="block sm:hidden">مشاهده همه</span>
          <span className="hidden sm:block">مشاهده همه مقالات</span>
        </Link>
      </div>

      <BlogCards posts={latest} />
    </section>
  )
}