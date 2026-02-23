import FeaturedArticle from "./FeaturedArticle"

type HomeBlogProps = {
  posts: any[]
}

export default function HomeBlog({ posts }: HomeBlogProps) {
  return <FeaturedArticle posts={posts} />
}