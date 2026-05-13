// Data Schema Universal untuk SAI Roots (Versi Anti-Bentrok + Wikidata Enhanced)
(function() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://sairootsmusic.com/#website",
        "url": "https://sairootsmusic.com/",
        "name": "SAI Roots Music",
        "alternateName": ["SAI Roots", "Sai Roots"],
        "description": "Official website of SAI Roots - Indonesian independent Reggae, Rap & Ska music project.",
        "publisher": {
          "@id": "https://sairootsmusic.com/#organization"
        }
      },
      {
        "@type": "MusicGroup",
        "@id": "https://sairootsmusic.com/#organization",
        "name": "SAI Roots",
        "alternateName": "SAI Roots Music",
        "description": "SAI Roots adalah proyek musik independen beraliran Reggae, Rap, dan Ska asal Indonesia, diciptakan dan dikelola secara eksklusif oleh Ahmad Supembri.",
        "url": "https://sairootsmusic.com/",
        "image": [
          "https://upload.wikimedia.org/wikipedia/commons/0/03/SAI_Roots.jpg",
        ],
        "genre": ["Reggae", "Roots Reggae", "Rap", "Ska", "Hip Hop"],
        "countryOfOrigin": {
          "@type": "Country",
          "name": "Indonesia"
        },
        "founder": {
          "@id": "https://sairootsmusic.com/#founder"
        },
        "member": {
          "@id": "https://sairootsmusic.com/#founder"
        },
        "recordLabel": {
          "@id": "https://sairootsmusic.com/#recordLabel"
        },
        "sameAs": [
          "https://www.wikidata.org/wiki/Q139783618",
          "https://musicbrainz.org/artist/acd09c55-df9b-4628-9605-446b3cf6554a",
          "https://www.youtube.com/@sairoots",
          "https://open.spotify.com/artist/0xOPCtZvhXVd9RTbU1aYTr",
          "https://music.apple.com/id/artist/sai-roots/1892187423",
          "https://www.deezer.com/artist/384508281",
          "https://youtube.com/channel/UCnjRvftn7QD2kDqLHszImsA",
          "https://m.soundcloud.com/sairoots",
          "https://music.amazon.com/artists/B0GTFWNC32/sai-roots",
          "https://youtube.com/channel/UCnjRvftn7QD2kDqLHszImsA"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://sairootsmusic.com/#founder",
        "name": "Ahmad Supembri",
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Ahmad_Supembri.jpg",
        "description": "Indonesian musician, composer, lyricist, and record producer.",
        "url": "https://sairootsmusic.com/",
        "nationality": {
          "@type": "Country",
          "name": "Indonesia"
        },
        "occupation": ["Musician", "Composer", "Lyricist", "Record Producer"],
        "sameAs": [
          "https://www.wikidata.org/wiki/Q139784101",
          "https://instagram.com/ahmadsupembri",
          "https://facebook.com/ahmadsupembri",
          "https://tiktok.com/@ahmadsupembri"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://sairootsmusic.com/#recordLabel",
        "name": "SAI Roots Music",
        "description": "Indonesian independent record label owned by Ahmad Supembri.",
        "url": "https://sairootsmusic.com/",
        "founder": {
          "@id": "https://sairootsmusic.com/#founder"
        },
        "sameAs": ["https://www.wikidata.org/wiki/Q139784313"]
      }
    ]
  };

  // Suntik JSON-LD
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);
})();
