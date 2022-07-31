module.exports = {
    name: '@crikey/json-mono',
    out: 'build/docs',
    entryPointStrategy: 'packages',
    entryPoints: [
        'packages/*',
    ],
    readme: 'README.TYPEDOC.md',
    pluginPages: {

    },
    pluginMonorepoReadmes: {
        readme: ['README.TYPEDOC.md', 'README.md']
    }
}
