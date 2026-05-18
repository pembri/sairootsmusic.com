(function() {
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://sairootsmusic.com/donate#webpage",
                "url": "https://sairootsmusic.com/donate",
                "name": "Support Project | SAI Roots",
                "description": "Halaman dukungan resmi untuk ekosistem musik independen SAI Roots. Berikan apresiasi terbaikmu melalui QRIS atau transfer Bank BRI.",
                "inLanguage": "id-ID",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://sairootsmusic.com/#website",
                    "url": "https://sairootsmusic.com/",
                    "name": "SAI Roots Music",
                    "publisher": {
                        "@type": "Person",
                        "name": "Ahmad Supembri",
                        "alternateName": "Pembri"
                    }
                }
            },
            {
                "@type": "DonateAction",
                "agent": {
                    "@type": "Organization",
                    "name": "Audience & Supporters"
                },
                "recipient": {
                    "@type": "MusicProject",
                    "name": "SAI Roots",
                    "url": "https://sairootsmusic.com/",
                    "genre": ["Roots Reggae", "Reggae Rap"],
                    "creator": {
                        "@type": "Person",
                        "name": "Ahmad Supembri",
                        "alternateName": "Pembri",
                        "jobTitle": ["Songwriter", "Composer", "Music Producer"]
                    }
                },
                "actionStatus": "https://schema.org/PotentialActionStatus",
                "description": "Dukung terus project musik independen SAI Roots agar tetap konsisten berkarya dan berkembang lebih besar lagi ke depannya."
            }
        ]
    };

    // Ambil element script loader di HTML
    const scriptLoader = document.getElementById("sairoots-schema-loader");
    if (scriptLoader) {
        // Buat tag script baru khusus JSON-LD
        const jsonLdScript = document.createElement("script");
        jsonLdScript.type = "application/ld+json";
        jsonLdScript.text = JSON.stringify(schemaData);
        
        // Sisipkan tepat setelah script loader agar rapi
        scriptLoader.parentNode.insertBefore(jsonLdScript, scriptLoader.nextSibling);
    }
})();
