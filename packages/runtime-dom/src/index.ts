// runtime-dom dom操作   1.节点 2.节点属性
// 创建两个文件

import { extend, isString } from "@vue3/shared";
import { nodeOps } from "./nodeOps";
import { patchProps } from "./patchProps";
import { createRender } from "@vue3/runtime-core";

// vue3 dom 全部操作

const renderOptionDom = extend({patchProps},nodeOps)
export { renderOptionDom }
export const createApp = (rootComponent,rootProps) =>{
    let app = createRender(renderOptionDom).createApp(rootComponent,rootProps)
    let {mount} = app
    app.mount = (container) => {
        //清空容器中的内容
        if(isString(container)) {
            container = nodeOps.querySelector(container)
        }
        container.innerHTML = ''
        //将组件渲染的dom元素进行挂载
        mount(container)
    }
    return app
}


