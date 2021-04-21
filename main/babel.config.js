module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    // presets: [['@babel/preset-es2015', { modules: false }]],
    plugins: [
        // element官方教程
        // [
        //     'component',
        //     {
        //         libraryName: 'element-ui',
        //         styleLibraryName: 'theme-chalk'
        //     }
        // ]
        [
            'component',
            {
                libraryName: 'dm-ui',
                libraryDirectory: 'lib'
            }
        ]
    ]
}
