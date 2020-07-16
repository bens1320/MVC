import EventBus from "./EventBus";

class Model extends EventBus{
    constructor(options) {
        //继承类, 需要调用父类初始化
        super()
        const keys = ['data', 'create', 'delete', 'update', 'get']
        keys.forEach((key) => {
            if(key in options){
                this[key] = options[key]
            }
        })
    }
    create(){
        console && console.error && console.error("你还没有实现, create")
    }
    delete(){
        console && console.error && console.error("你还没有实现, delete")
    }
    update(){
        console && console.error && console.error("你还没有实现, update")
    }
    get(){
        console && console.error && console.error("你还没有实现, get")
    }
}
export default Model