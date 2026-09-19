export default async function sitemap() {
  const baseUrl = "https://semestaesports.id";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tournaments`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // TODO: Jika nanti ingin menambahkan data dinamis dari API/Database (misal: list blog), 
  // Anda bisa fetch di sini, lalu gabungkan menggunakan [...staticPages, ...dynamicPages]

  // Kembalikan array staticPages
  return staticPages;
}