module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views'
            }
        }
    },
    //publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    publicPath: '/',
    outputDir: "dist"
}
