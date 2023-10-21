/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
    images:{
        domains:[
            'res.cloudinary.com',
            'img.clerk.com'
        ]
    },
    experimental:{
        serverActions:true,
        serverComponentsExternalPackages: ["prisma"],
    }
}

module.exports = nextConfig
