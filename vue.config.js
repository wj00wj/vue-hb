const path = require('path')
const resolve = function(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    publicPath:
        process.env.NODE_ENV === 'production' ? '/vue-hb' : '/',
        outputDir:'dist',
        assetsDir:'static',
        lintOnSave:true,
        productionSourceMap:false,
        chainWebpack:config => {
            config.resolve.alias
                .set('@',resolve('src'))
                .set('views',resolve('src/views'))
            config.optimization.runtimeChunk('single')
        },
        devServer:{
            host:'localhost',
            port:'8080',
            hot:true,
            open:true,
            overlay:{
                warning:false,
                error:true
            },
            proxy:{
                [process.env.VUE_APP_BASE_API]:{
                    target:process.env.VUE_APP_BASE_API,
                    changeOrigin:true,
                    secure:false,
                    pathRewrite:{
                        ['^'+process.env.VUE_APP_BASE_API]:''
                    }
                }
            }
        }
}