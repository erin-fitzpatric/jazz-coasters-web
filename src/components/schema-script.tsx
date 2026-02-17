import { SITE_URL } from '@/src/lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicGroup',
      '@id': `${SITE_URL}/#musicgroup`,
      name: 'The Jazz Coasters',
      url: SITE_URL,
      genre: ['Swing', 'New Orleans Jazz', 'Hot Jazz', 'Dixieland'],
      sameAs: ['https://www.instagram.com/thejazzcoasters/']
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'The Jazz Coasters',
      url: SITE_URL,
      email: 'thejazzcoasters@gmail.com'
    }
  ]
};

export function SchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
