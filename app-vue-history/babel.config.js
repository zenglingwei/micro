module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                libraryName: 'dm-ui',
                libraryDirectory: 'lib'
            }
        ]
    ]
}
