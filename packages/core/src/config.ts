
import { resolve, dirname } from 'path'
import fs from 'fs'

const basePath = process.cwd()


const modulePath = dirname(dirname(require.resolve('@vue-wind/components')))
const componentPath = resolve(modulePath, 'vue')


export async function useConfig(){
    const config = {
        root: {
            cwd: '',
            vueComponents: '',
        },
        components: {
            directory: resolve(basePath, 'components'),
        }
    }

    config.root.cwd = basePath
    config.root.vueComponents = componentPath
    
    const userConfigPath = resolve(basePath, 'vue-wind.config.js')

    const exists = fs.existsSync(userConfigPath)

    if (!exists) return config

    const configModule = await import(userConfigPath)

    if (configModule.default) {
        config.components = configModule.default.components
    }

    return config
}