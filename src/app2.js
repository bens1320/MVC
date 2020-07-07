import "./app2.css"
import $ from "jquery"

const eventBus = $(window)

const localKey = "index"
// 数据相关: m
const m = {
    //初始化数据
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    create(){},
    delete(){},
    update(data){
        //把data所有属性赋值给m.data
        Object.assign(m.data, data)
        //eventBus.trigger不能用空格
        eventBus.trigger("m:updated")
        localStorage.setItem(localKey, m.data.index)
    },
    get(){}
}

// 视图相关:v
const v = {
    el: null,
    html:(index) => {
        return`
        <div>
            <ol class="tab-bar">
                <li class="${ index === 0 ? 'selected' : ''}" data-index="0">1111</li>
                <li class="${ index === 1 ? 'selected' : ''}" data-index="1"><span>2222</span></li>
            </ol>
            <ol class="tab-content">
                <li class="${ index === 0 ? 'active' : ''}">内容1</li>
                <li class="${ index === 1 ? 'active' : ''}">内容2</li>
            </ol>
        </div>
        `
    },
    init(container){
        v.el = $(container)
    },
    render(index){
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html(index )).appendTo($(v.el))
    },
}

// 其他: c
const c = {
    init(container){
        v.init(container)
        // view = render(data)
        v.render(m.data.index)
        c.autoBindEvents()
        eventBus.on("m:updated", () => {
            v.render(m.data.index)
        })
    },
    events: {
        "click .tab-bar li": "x",
    },
    x(e){
        const index = parseInt(e.currentTarget.dataset.index )
        m.update({index: index})
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