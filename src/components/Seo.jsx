import { Helmet } from 'react-helmet-async'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  canonicalUrl,
  pageTitle,
} from '../seo'

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
}) {
  const fullTitle = pageTitle(title)
  const url = canonicalUrl(path)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Information Technology portfolio`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
