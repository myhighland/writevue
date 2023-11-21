
//策略模式
import { patchClass } from "./modules/class"
import { patchStyle } from "./modules/style"
import { patchAttr } from "./modules/attrs"
import { patchEvent } from "./modules/event"
export const patchProps = (el,key,preValue,nextValue)=>{
    switch (key) {
        case 'class':
            patchClass(el,nextValue)
            break
        case 'style':
            patchStyle(el,preValue,nextValue)
            break
        default:
            if(/^on/.test(key)) {
                //如果是on打头的事件
                patchEvent(el,key,nextValue)
            } else {
                patchAttr(el,key,nextValue)
            }
            break
    }
}