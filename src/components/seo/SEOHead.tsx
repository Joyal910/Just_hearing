import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  noIndex?: boolean
  structuredData?: object
}

export function SEOHead({
  title = "Just Hearing Clinic - Best Audiologist & Hearing Aids in Kottayam, Kerala",
  description = "Leading hearing care clinic in Kottayam, Kerala. Expert audiologists, advanced hearing aids, free hearing tests. Serving Puthupally, Changanassery & surrounding areas since 2008.",
  keywords = "hearing aids Kottayam, audiologist Kerala, hearing test Puthupally, speech therapy Kottayam, hearing clinic Kerala",
  canonicalUrl = "https://justhearingclinic.com",
  ogImage = "https://justhearingclinic.com/og-image.jpg",
  noIndex = false,
  structuredData
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}