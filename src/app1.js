import "./app1.css"
import $ from "jquery"
import Model from "../base/Model";

const eventBus = $(window)
// 数据相关: m
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem("n")) || 100,
    },
    update(data){
        //把data所有属性赋值给m.data
        Object.assign(m.data, data)
        //eventBus.trigger不能用空格
        eventBus.trigger("m:updated")
        localStorage.setItem("n", m.data.n)
    }
})



// 其他: c
const view = {
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
        view.el = $(container)
        // view = render(data)
        view.render(m.data.n)
        view.autoBindEvents()
        eventBus.on("m:updated", () => {
            view.render(m.data.n)
        })
    },
    render(n){
        if (view.el.children().length !== 0) {
            view.el.empty()
        }
        $(view.html.replace("{{n}}", n))
            .appendTo($(view.el))
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
        for (let key in view.events) {
            const value = view[view.events[key]]
            const spaceIndex = key.indexOf(" ")
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            view.el.on(part1, part2, value)
        }
    }
}

export default view






