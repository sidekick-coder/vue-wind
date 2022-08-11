import { computed } from "vue"

export function useVModel<P extends object, K extends keyof P, Name extends string>(
    props: P,
    key: K,
    emit: (name: Name, ...args: any[]) => void,
  ) {

    return computed<P[K]>({
        get() {
          return props[key!]
        },
        set(value) {
          emit(`update:${key as string}` as Name, value)
        },
      })
  }