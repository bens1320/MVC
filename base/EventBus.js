import $ from "jquery"

class EventBus{
    constructor() {
        this._eventBus = $(window)
    }
    // 监听函数
    on(eventName, fn) {
        return this._eventBus.on(eventName, fn)
    }

    // 触发函数
    trigger(eventName, data){
        return this._eventBus.trigger(eventName, data)
    }

    //取消监听
    off(eventName, fn) {
        return this._eventBus.off(eventName, fn)
    }
}

export default EventBus