import { describe, it } from "vitest";
import { render } from "@testing-library/vue";

import WCard from "./w-card.vue";

describe("w-card", () => {
    it("should render the content", () => {
        const wrapper = render(WCard, {
            slots: {
                default: "<div>Hello World</div>",
            },
        });

        wrapper.getByText("Hello World");
    });
});
