//事件处理
//div @click= 'fn'

export const patchEvent = (el,key,value) => {
   // 对函数进行缓存
   const invokers = el._vei || (el._vei = {})
   const exist = invokers[key]
   if(exist && value) {
        exist.value = value
   } else {
    //获取事件名称 1 新的有该事件 2.新的没有该事件
     const eventName = key.slice(2).toLowerCase() //获取事件名称
     if(value) {
        let invoker = invokers[eventName] = createInvoker(value)
        el.addEventListener(eventName,invoker)
     } else {
        el.removeEventListener(eventName)
        invokers[eventName] = null
     }
   }
}

function createInvoker(value) {
    const invoker = e =>{
        invoker.value(e)
    }
    invoker.value = value
    return invoker
}

