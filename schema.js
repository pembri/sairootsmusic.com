// Data Schema Universal untuk SAI Roots
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Skema Website (Ini yang memperbaiki nama "SAI Roots Music" di Google)
      "@type": "WebSite",
      "@id": "https://sairootsmusic.com/#website",
      "url": "https://sairootsmusic.com/",
      "name": "SAI Roots Music",
      "alternateName": "SAI Roots",
      "publisher": {
        "@id": "https://sairootsmusic.com/#organization"
      }
    },
    {
      // Skema Entitas Proyek Musik
      "@type": "MusicGroup",
      "@id": "https://sairootsmusic.com/#organization",
      "name": "SAI Roots",
      "description": "SAI Roots adalah proyek musik independen beraliran Reggae, Rap, dan Ska asal Indonesia, diciptakan dan dikelola secara eksklusif oleh Ahmad Supembri.",
      "url": "https://sairootsmusic.com/",
      "image": "https://sairootsmusic.com/asset_gambar/sairoots.jpg",
      "founder": {
        "@type": "Person",
        "name": "Ahmad Supembri"
      },
      "sameAs": [
        // Streaming
        "https://www.youtube.com/@sairoots",
        "https://youtube.com/channel/UCnjRvftn7QD2kDqLHszImsA",
        "https://music.youtube.com/channel/UC2EfMkjDMG9LTWfc1llL4AQ",
        "https://music.youtube.com/channel/UCnjRvftn7QD2kDqLHszImsA",
        "https://open.spotify.com/artist/0xOPCtZvhXVd9RTbU1aYTr",
        "https://music.apple.com/id/artist/sai-roots/1892187423",
        "https://link.deezer.com/s/3366qh6efN8QoSqSPCEsB",
        "https://m.soundcloud.com/sairoots",
        "https://music.amazon.com/artists/B0GTFWNC32/sai-roots",
        // Social Media
        "https://instagram.com/ahmadsupembri",
        "https://facebook.com/ahmadsupembri",
        "https://tiktok.com/@ahmadsupembri"
      ]
    }
  ]
};

// Logika untuk menyuntikkan JSON-LD ke dalam tag <head>
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
