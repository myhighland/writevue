// 收集依赖 
export function effect(fn,options:any={}) {
    const effect = createReactEffect(fn,options)
    if(!options.lazy) {
        effect() //默认执行
    }
    return effect
}

let uid = 0
let activeEffect  //保存当前的effect
const effectStack = [] //effect中嵌套effect时  需要使用栈嵌套

function createReactEffect(fn,options) {
    const effect = function reactiveEffect() {
        // activeEffect = effect
        // fn() //执行用户方法
        if(!effectStack.includes(effect)) { //保证effect没有在栈中
            try {
                effectStack.push(effect) //执行方法入栈
                activeEffect = effect
                fn()
            } catch (error) {
                
            } finally {
                //执行完毕
                effectStack.pop() //执行完成后 出栈
                const n = effectStack.length
                activeEffect = n > 0 ? effectStack[n - 1] : undefined //当前执行effect 指向栈顶
            }
        }
    }
    /**
     * 定义effect 属性
     */
    effect.id = uid ++;
    effect._isEffect = true; //用于标记是否是响应式
    effect.raw = fn; //保存用户方法
    effect.options = options; //保存用户属性
    return  effect
}



//手机effect 在获取数据的时候 触发get 
export function Track(target, type, key) { 
    //对应的属性
    console.log(target,type,key)


}