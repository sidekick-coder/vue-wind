import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { dirname, resolve } from 'path'
import { mountComponents } from './mount-components';
import fs from 'fs';

import { logger } from '@poppinss/cliui';
import * as configModule from './config';

describe('mountComponents', () => {
    const config = {
        root: {
            cwd: '',
            vueComponents: '@vue-wind/components',
        },
        components: {
            directory: 'components',
        }
    }

    afterEach(() => {
        vi.resetAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(logger, 'action').mockImplementation(() => ({
            skipped: () => undefined,
            succeeded: () => undefined,
            failed: () => undefined,
        } as any))

        vi.spyOn(configModule, 'useConfig').mockImplementation(() => Promise.resolve(config))
    })

    function createFsMock(){

        const mkdirSync = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined)

        const promises = {
            readdir: vi.spyOn(fs.promises, 'readdir').mockImplementation(() => Promise.resolve([])),
            writeFile: vi.spyOn(fs.promises, 'writeFile').mockImplementation(() => Promise.resolve(undefined)),
            copyFile: vi.spyOn(fs.promises, 'copyFile').mockImplementation(() => Promise.resolve(undefined)),
        }

        return {
            mkdirSync,
            promises
        }
    }


    it('should create vue file for each component', async () => {
        const modulePath = dirname(dirname(require.resolve('@vue-wind/components')))
        const componentPath = resolve(modulePath, 'vue')

        const components = [
            'WButton.vue',
            'WInput.vue',
        ]

        const fsMock = createFsMock()

        fsMock.promises.readdir.mockResolvedValue(components as any)    

        await mountComponents()

        components.forEach(component => {
            expect(fsMock.promises.copyFile).toHaveBeenCalledWith(
                resolve(config.root.vueComponents, component),
                resolve(config.components.directory, component)
            )
        })
        
    })
})