import "./app2.css"
import $ from "jquery"
import Model from "../base/Model";
import View from "../base/View";
import EventBus from "../base/EventBus";

const eventBus = new EventBus()

const localKey = "app2.index"
// 数据相关: m
const m = new Model({
    //初始化数据
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    update(data){
        //把data所有属性赋值给m.data
        Object.assign(m.data, data)
        //eventBus.trigger不能用空格
        eventBus.trigger("m:updated")
        localStorage.setItem(localKey, m.data.index)
    },
})

// 其他: c
const init = (el) => {
    new View({
        el: el,
        data: m.data,
        eventBus: eventBus,
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
        render(data){
            const index = data.index
            if (this.el.children().length !== 0) {
                this.el.empty()
            }
            $(this.html(index )).appendTo($(this.el))
        },
        events: {
            "click .tab-bar li": "x",
        },
        x(e){
            const index = parseInt(e.currentTarget.dataset.index )
            m.update({index: index})
        },

    })
}
export default init