/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // The file on disk stays resume.pdf (the address every button points
        // to); this is the name it gets when someone saves it.
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Vladyslav-Holoborodko-CV.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
