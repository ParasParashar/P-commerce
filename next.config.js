/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com'
            },
            {
                protocol:'https',
                hostname: 'res.cloudinary.com',

            }
        ]

    }
}

module.exports = nextConfig
