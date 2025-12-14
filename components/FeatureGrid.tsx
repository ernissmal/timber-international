import Link from 'next/link'

interface Feature {
  title: string
  description: string
  href?: string
  image?: string
}

interface FeatureGridProps {
  features: Feature[]
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          {feature.image && (
            <div className="aspect-video bg-moooi-sand mb-6 rounded-lg overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}

          <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-moooi-gold transition-colors">
            {feature.title}
          </h3>

          <p className="text-moooi-slate mb-6">
            {feature.description}
          </p>

          {feature.href && (
            <Link
              href={feature.href}
              className="inline-flex items-center text-moooi-charcoal font-medium group-hover:text-moooi-gold transition-colors"
            >
              Learn more
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
