import "./app1.css"
import $ from "jquery"

const eventBus = $(window)
// 数据相关: m
const m = {
    //初始化数据
    data: {
        n: parseInt(localStorage.getItem("n")) || 100
    },
    create(){},
    delete(){},
    update(data){
        //把data所有属性赋值给m.data
        Object.assign(m.data, data)
        //eventBus.trigger不能用空格
        eventBus.trigger("m:updated")
        localStorage.setItem("n", m.data.n)
    },
    get(){}
}

// 视图相关:v
const v = {
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="subtract">-1</button>
            <button id="multiply">*2</button>
            <button id="divide">/2</button>
        </div>
    </div>
    `,
    init(container){
        v.el = $(container)
    },
    render(n){
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html.replace("{{n}}", n))
            .appendTo($(v.el))
    },
}

// 其他: c
const c = {
    init(container){
        v.init(container)
        // view = render(data)
        v.render(m.data.n)
        c.autoBindEvents()
        eventBus.on("m:updated", () => {
            v.render(m.data.n)
        })
    },
    events: {
        "click #add1": "add",
        "click #subtract": "sub",
        "click #multiply": "multi",
        "click #divide": "div"
    },
    add(){
        m.update({n: m.data.n + 1})
    },

    sub(){
        m.update({n: m.data.n - 1})
    },

    multi(){
        m.update({n: m.data.n * 2})
    },

    div(){
        m.update({n: m.data.n / 2})
    },

    autoBindEvents(){
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, value)
        }
    }
}

export default c






