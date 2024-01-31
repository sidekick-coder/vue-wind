import type { Directive } from "vue"

export const vVisible: Directive = {
    created(el, { value }) {
        if (!value) {
            el.style.visibility = 'hidden'
        }
    },
    getSSRProps({ value }) {
      return {
        style: {
          visibility: value ? '' : 'hidden'
        }
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue) {
        return
      }
  
      if (value) {
        transition?.beforeEnter(el)
        
        el.style.visibility = ''
        
        transition?.enter(el)
      }

      if (!value) {
          transition?.leave(el, () => {
            el.style.visibility = 'hidden'
          })
      }
    }
}