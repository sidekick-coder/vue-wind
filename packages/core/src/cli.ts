#!/usr/bin/env node

import { Command } from 'commander'
import { mountComponents } from './mount-components'

const program = new Command()

program.command('generate:components').description('Generate vue component files').action(mountComponents)

program.parse(process.argv)