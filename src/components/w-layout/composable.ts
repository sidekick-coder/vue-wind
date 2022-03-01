import { ref, provide, inject, InjectionKey, Ref } from "vue";

type LayoutRef = Ref<HTMLElement | null>;

const toolbarKey: InjectionKey<LayoutRef> = Symbol("layout:toolbar");
const drawerKey: InjectionKey<LayoutRef> = Symbol("layout:drawer");
const contentKey: InjectionKey<LayoutRef> = Symbol("layout:content");

export function provideLayout() {
    const toolbarRef: LayoutRef = ref(null);
    const drawerRef: LayoutRef = ref(null);
    const contentRef: LayoutRef = ref(null);

    provide(toolbarKey, toolbarRef);
    provide(drawerKey, drawerRef);
    provide(contentKey, contentRef);

    return {
        toolbarRef,
        drawerRef,
        contentRef,
    };
}

export function useLayout() {
    return {
        toolbarRef: inject(toolbarKey, ref(null)),
        drawerRef: inject(drawerKey, ref(null)),
        contentRef: inject(contentKey, ref(null)),
    };
}
