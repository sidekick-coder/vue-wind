// .storybook/preview.js

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "fullscreen",
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
