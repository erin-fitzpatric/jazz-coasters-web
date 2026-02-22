import { SITE_URL } from '@/src/lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicGroup',
      '@id': `${SITE_URL}/#musicgroup`,
      name: 'The Jazz Coasters',
      url: SITE_URL,
      description:
        'Cincinnati swing dance band performing vintage jazz for weddings, festivals, private events, and dance socials.',
      image: `${SITE_URL}/images/the-jazz-coasters-logo-gold-straight.jpg`,
      genre: ['Swing', 'New Orleans Jazz', 'Hot Jazz', 'Dixieland'],
      sameAs: [
        'https://www.instagram.com/thejazzcoasters/',
        'https://www.facebook.com/jazzcoasters/',
        'https://www.youtube.com/@thejazzcoasters'
      ],
      areaServed: ['Cincinnati', 'Northern Kentucky', 'Dayton']
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'The Jazz Coasters',
      url: SITE_URL,
      logo: `${SITE_URL}/images/the-jazz-coasters-logo-gold-straight.jpg`,
      email: 'thejazzcoasters@gmail.com',
      sameAs: [
        'https://www.instagram.com/thejazzcoasters/',
        'https://www.facebook.com/jazzcoasters/',
        'https://www.youtube.com/@thejazzcoasters'
      ]
    }
  ]
};

export function SchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
