import fs from 'fs'
import { resolve } from 'path'
import { logger } from '@poppinss/cliui'
import { useConfig } from './config'

export async function mountComponents(){

    const config = await useConfig()

    const outputPathExists = fs.existsSync(config.components.directory)

    if (!outputPathExists) {
        fs.mkdirSync(config.components.directory)
    }

    const files = await fs.promises.readdir(config.root.vueComponents)    

    for await (const file of files) {
        const action = logger.action('create')

        const source = resolve(config.root.vueComponents, file)
        const target = resolve(config.components.directory, file)

        const exists = fs.existsSync(target)

        if (exists) {
            action.skipped(`${target} (already exists)`)
            continue
        }

        await fs.promises
            .copyFile(source, target)
            .then(() => action.succeeded(`${target}`))
            .catch((e) => action.failed(`${target}`, e.message))

    }
}