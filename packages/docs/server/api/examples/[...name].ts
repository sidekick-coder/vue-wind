import fs from 'fs';
import path from 'path';
import { getHighlighter } from 'shiki-es';

export default defineEventHandler(async (event) => {
  
    const filename = path.resolve('examples', event.context.params.name + '.vue');

    const exists = await fs.promises.stat(filename).then(() => true).catch(() => false);

    if (!exists) return ''

    const content = await fs.promises.readFile(filename, 'utf8');

    const highlighter = await getHighlighter({ theme: 'dracula'  })

    const highlighted = highlighter.codeToHtml(content, {
        lang: 'vue',
        theme: 'dracula',
    });

    return highlighted.replace('class="shiki" style="background-color: #282A36"', '');
})