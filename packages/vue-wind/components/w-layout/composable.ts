import { throttle } from "../../composables/throttle";
import { ref, provide, inject, InjectionKey } from "vue";

const isClient = typeof window !== "undefined";

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

    items.value.push(item);

    useResize(item.ref, (width, heigh) => {
        const search = items.value.find((i) => i.id === item.id);

        if (!search) return;

        search.width = width;
        search.height = heigh;
    });

    
}

export function useResize(
    el: HTMLElement,
    cb: (width: number, height: number) => void
) {
    if (!isClient || !el) return;

    const resize = throttle(() => cb(el.offsetWidth, el.offsetHeight), 50);

    window.addEventListener("resize", resize);
    el.addEventListener("resize", resize);

    return new ResizeObserver(resize).observe(el);
}
