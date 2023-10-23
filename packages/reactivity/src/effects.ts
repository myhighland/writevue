export function effect(fn,options:any={}) {
    const effect = createReactEffect(fn,options)
    if(!options.lazy) {
        effect() //默认执行
    }
    return effect
}

function createReactEffect(fn,options) {
    const effect = function reactiveEffect() {
        fn()
    }
    return  effect
}