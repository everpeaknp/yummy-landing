import { blogData } from "@/lib/blog-data";
import { Metadata } from "next";
import { BlogPostClient } from "@/components/sections/BlogPostClient";
import { Navbar, Footer } from "@/components/layout"; 

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData[slug];
  
  if (!post) {
    return {
      title: "Post Not Found | Yummy POS",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const post = blogData[slug];

   if (!post) {
      return (
       <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
          <h1 className="text-2xl font-bold">Post Not Found</h1>
        </main>
        <Footer />
      </>
      )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "description": post.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "Yummy POS",
      "url": "https://yummypos.com"
    }
  };

  return <BlogPostClient post={post} jsonLd={jsonLd} />;
}
