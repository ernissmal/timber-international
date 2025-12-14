import Link from 'next/link'

interface HeroProps {
  heading: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  size?: 'default' | 'small'
}

export default function Hero({
  heading,
  subheading,
  ctaText,
  ctaLink,
  backgroundImage,
  size = 'default',
}: HeroProps) {
  const height = size === 'small' ? 'h-[50vh]' : 'h-[90vh]'

  return (
    <section
      className={`${height} relative flex items-center justify-center overflow-hidden`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-moooi-cream via-moooi-sand to-moooi-gold opacity-30" />
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
          {heading}
        </h1>

        {subheading && (
          <p className="text-xl md:text-2xl text-moooi-slate mb-8 animate-slide-up">
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
