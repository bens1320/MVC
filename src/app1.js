import "./app1.css"
import $ from "jquery"
import Model from "../base/Model";
import View from "../base/View";

// 数据相关: m
const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem("n")) || 100,
    },
    update(data){
        //把data所有属性赋值给m.data
        Object.assign(m.data, data)
        //eventBus.trigger不能用空格
        m.trigger("m:updated")
        localStorage.setItem("n", m.data.n)
    }
})



// 其他: c
const init = (el) => {
    new View({
        el: el,
        data: m.data,
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
        render(data){
            const n = data.n
            if (this.el.children().length !== 0) {
                this.el.empty()
            }
            $(this.html.replace("{{n}}", n))
                .appendTo($(this.el))
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
        }
    })
}



export default init






