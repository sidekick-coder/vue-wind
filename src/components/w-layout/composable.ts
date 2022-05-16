import { throttle } from "lodash";
import { ref, provide, inject, InjectionKey } from "vue";

export interface LayoutItem {
    id: string;
    ref: HTMLElement;
    width: number;
    height: number;
    type: "toolbar" | "drawer" | "content";
    onUpdate?: (items: LayoutItem[]) => void;
}

const layoutKey: InjectionKey<ReturnType<typeof provideLayout>> =
    Symbol("layout");

export function provideLayout() {
    const items = ref<LayoutItem[]>([]);

    const update = (ignoreId?: string) => {
        items.value
            .filter((i) => i.id !== ignoreId)
            .forEach((item) => item.onUpdate?.(items.value));
    };

    provide(layoutKey, {
        items,
        update,
    });

    return {
        items,
        update,
    };
}

export function useLayout() {
    return inject(layoutKey, {
        items: ref([]),
        update: () => {},
    });
}

export function useLayoutItem(
    id: string,
    el: HTMLElement,
    type: LayoutItem["type"],
    onUpdate?: LayoutItem["onUpdate"]
) {
    const { items, update } = useLayout();

    const item = {
        id,
        ref: el,
        width: el.clientWidth,
        height: el.clientHeight,
        type,
        onUpdate,
    };

    useResize(el, (width, heigh) => {
        update(item.id);

        const search = items.value.find((i) => i.id === item.id);

        if (!search) return;

        search.width = width;
        search.height = heigh;
    });

    items.value.push(item);

    return { item, update };
}

export function useResize(
    el: HTMLElement,
    cb: (width: number, height: number) => void
) {
    const resize = throttle(() => cb(el.offsetWidth, el.offsetHeight), 100);

    el.addEventListener("resize", resize);
    window.addEventListener("resize", resize);

    return new ResizeObserver(resize).observe(el);
}
