import { isArray, isIntegerKey } from "@vue3/shared"
import { TriggerOpType } from "./operations"
// 收集依赖 
export function effect(fn, options: any = {}) {
    const effect = createReactEffect(fn, options)
    if (!options.lazy) {
        effect() //默认执行
    }
    return effect
}

let uid = 0
let activeEffect  //保存当前的effect
const effectStack = [] //effect中嵌套effect时  需要使用栈嵌套

//get方法最终执行方法
function createReactEffect(fn, options) {
    const effect = function reactiveEffect() {
        // activeEffect = this || effect
        // fn() //执行用户方法
        if (!effectStack.includes(effect)) { //保证effect没有在栈中
            try {
                effectStack.push(effect) //执行方法入栈
                activeEffect = effect
                return fn()
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
    effect.id = uid++;
    effect._isEffect = true; //用于标记是否是响应式
    effect.raw = fn; //保存用户方法
    effect.options = options; //保存用户属性
    return effect
}



//收集effect 在获取数据的时候 触发get 
let targetMap = new WeakMap()
export function Track(target, type, key) {
    //对应的属性
    // console.log(target, type, key)
    if (activeEffect === undefined) { //没有在effect中使用
        return
    }
    //获取effect {target:值（map）} 以下流程为没有effect时 添加相关effect关联
    let depMap = targetMap.get(target)
    if (!depMap) {
        targetMap.set(target, (depMap = new Map())) //首次使用没有值 添加
    }
    let dep = depMap.get(key)
    if (!dep) {
        depMap.set(key, (dep = new Set()))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }

}

export function trigger(target, type, key?, newValue?, oldValue?) {
    // console.log(target, type, key, newValue, oldValue)
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        return
    }
    let effectSet = new Set()
    const add = (effectAdd)=>{
        if(effectAdd) { 
            effectAdd.forEach(effect => {
                effectSet.add(effect)
            });
        }
    }
    add(depsMap.get(key))
    if(key === 'length' && isArray(target)) {
        depsMap.forEach((dep,key)=>{
            if(key === 'length' || key >= newValue ) {
                add(dep)
            }
        })
    } else {
        if(key != undefined) {
            //对象处理
            add(depsMap.get(key))
        } 
        switch(type) {
            case TriggerOpType.ADD:
                if(isArray(target) && isIntegerKey(key)) {
                    add(depsMap.get('length'))
                }
                break
            // case TriggerOpType.SET:

         }
    }
    effectSet.forEach((effect:any)=>{
        if(effect.options.sch) {
            effect.options.sch() //computed dirty=true
        } else  {
            effect()
        }
    })
}