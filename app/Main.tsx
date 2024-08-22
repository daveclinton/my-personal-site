/* eslint-disable prettier/prettier */
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hey Legend 😊, I'm David Clinton
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            All things here are Software Engineering related! You can subscribe to receive an
            article straight into your inbox every Sunday! on my
            <Link href="https://daveclintonn.substack.com/" className="text-primary-500">
              {` Substack. `}
            </Link>
            You can also check out my
            <Link href="/projects" className="text-primary-500">
              {` Projects `}
            </Link>{' '}
            Here
            <br />
            <br />
            A little about myself: My name is David Clinton, and I am a Software Engineer with a
            strong Mathematics background. I studied B.S in Education Science and took a major in
            Mathematics from Kenyatta University, where I began learning how to write code in my
            junior year.
            <br />
            <br />
            My first role was majorly writing technical articles on Machine Learning and Deep
            Learning projects at Paperspace (was recently acquired by Digital Ocean). Later, I
            transitioned to being a Frontend and Mobile Engineer and worked full-time at
            Untapped-Global.
            <br />
            <br />
            If you are starting out in programming or already one, or looking to advance from junior
            to senior, this newsletter is tailored just for you. Besides updates on programming,
            I’ll be sharing insights on how to land your first programming role, get a dream job (I
            am also looking for mine), transition into tech, master communication skills, and much
            more.
            <br />
            <br />
            My posts are a collaborative space, so feel free to reply if: 🧰 There’s a topic you’re
            curious about and would love to read about on my blog. 🪜 You know about good resources
            that could benefit fellow aspiring Software Engineers. 😁 You just want to say hello. :)
            <br />
            <br />I will always be happy to share more with you. Check out my about here; :)
            <Link href="/about" className="text-primary-500">
              {` About `}
            </Link>
            section.
          </p>
        </div>
        {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul> */}
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
