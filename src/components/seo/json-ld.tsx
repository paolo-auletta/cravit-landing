import type { Thing, WithContext, WebSite, Organization, SoftwareApplication, Article, BreadcrumbList } from "schema-dts"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000"

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebsiteJsonLd() {
  const data: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cravit",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?q={search_term_string}`,
    },
  }

  return <JsonLd data={data} />
}

export function OrganizationJsonLd() {
  const data: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cravit",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description:
      "Cravit helps you discover, rate, and explore restaurants effortlessly with our curated food journaling app.",
    sameAs: [
      // Add your social media URLs here
      // "https://twitter.com/cravitapp",
      // "https://instagram.com/cravitapp",
    ],
  }

  return <JsonLd data={data} />
}

export function SoftwareAppJsonLd() {
  const data: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cravit",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
  }

  return <JsonLd data={data} />
}

interface ArticleJsonLdProps {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  authorName: string
  image?: string
  url: string
  tags?: string[]
}

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  image,
  url,
  tags,
}: ArticleJsonLdProps) {
  const data: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? `${siteUrl}${image}` : `${siteUrl}/icon.png`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Cravit",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${url}`,
    },
    keywords: tags?.join(", "),
  }

  return <JsonLd data={data} />
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }

  return <JsonLd data={data} />
}
