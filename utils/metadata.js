export function generateMetadata(
  title = "GitHub 배지 생성기",
  description = "GitHub README에 사용할 수 있는 배지를 만들어보세요!",
  currentUrl = "https://badge.jihun.io/"
) {
  return {
    metadataBase: new URL("https://badge.jihun.io"),
    title: title,
    description: description,
    icons: {
      icon: [
        { url: "/metadata/favicon.ico" },
        {
          url: "/metadata/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/metadata/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/metadata/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/metadata/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-114x114.png",
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "icon",
          url: "/metadata/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    manifest: "/metadata/manifest.json",
    openGraph: {
      type: "website",
      url: "https://badge.jihun.io/",
      title: "README 배지 생성기",
      description: description,
    },
    twitter: {
      card: "summary_large_image",
      title: "README 배지 생성기",
      description: description,
    },
    other: {
      "msapplication-TileImage": "/metadata/ms-icon-144x144.png",
    },
  };
}
