import { throttle } from "lodash";
import { ref, provide, inject, InjectionKey } from "vue";

export interface LayoutItem {
    id: string;
    ref: HTMLElement;
    width: number;
    height: number;
    type: "toolbar" | "drawer" | "content";
    isVisible: () => boolean;
    offsetType: "left" | "right" | "top" | "bottom" | "none";
}

const layoutKey: InjectionKey<ReturnType<typeof provideLayout>> =
    Symbol("layout");

export function provideLayout() {
    const items = ref<LayoutItem[]>([]);

    provide(layoutKey, {
        items,
    });

    return {
        items,
    };
}

export function useLayout() {
    return inject(layoutKey, {
        items: ref([]),
    });
}

export function useLayoutItem(item: LayoutItem) {
    const { items } = useLayout();

    useResize(item.ref, (width, heigh) => {
        const search = items.value.find((i) => i.id === item.id);

        if (!search) return;

        search.width = width;
        search.height = heigh;
    });

    items.value.push(item);

    return { item };
}

export function useResize(
    el: HTMLElement,
    cb: (width: number, height: number) => void
) {
    const resize = throttle(() => cb(el.offsetWidth, el.offsetHeight), 100);

    window.addEventListener("resize", resize);
    el.addEventListener("resize", resize);

    return new ResizeObserver(resize).observe(el);
}
