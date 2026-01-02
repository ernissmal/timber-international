import Link from 'next/link'

interface HeroProps {
  heading: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  backgroundVideo?: string
  videoPoster?: string
  backgroundType?: 'image' | 'video'
  size?: 'default' | 'small'
}

export default function Hero({
  heading,
  subheading,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundVideo,
  videoPoster,
  backgroundType = 'image',
  size = 'default',
}: HeroProps) {
  const height = size === 'small' ? 'h-[50vh]' : 'h-[90vh]'
  const hasVideo = backgroundType === 'video' && backgroundVideo
  const hasImage = backgroundImage && !hasVideo

  return (
    <section
      className={`${height} relative flex items-center justify-center overflow-hidden`}
      style={hasImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* Video Background */}
      {hasVideo && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}

      {/* Fallback gradient when no media */}
      {!hasVideo && !hasImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-moooi-cream via-moooi-sand to-moooi-gold opacity-30" />
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className={`text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in ${hasVideo ? 'text-white drop-shadow-lg' : ''}`}>
          {heading}
        </h1>

        {subheading && (
          <p className={`text-xl md:text-2xl mb-8 animate-slide-up ${hasVideo ? 'text-white/90 drop-shadow-md' : 'text-moooi-slate'}`}>
            {subheading}
          </p>
        )}

        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="inline-block bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
