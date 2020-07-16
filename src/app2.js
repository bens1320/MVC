import "./app2.css"
import Vue from 'vue/dist/vue.esm.js'

// 其他: c
const init = (el) => {
    new Vue({
        el: el,
        data: {
            index: parseInt(localStorage.getItem("index")) || 0
        },
        template: `
          <section id="app2">
            <ol class="tab-bar">
                <li :class="index === 0 ? 'selected' : ''" @click="index=0" data-index="0">1111</li>
                <li :class="index === 1 ? 'selected' : ''" @click="index=1" data-index="1"><span>2222</span></li>
            </ol>
            <ol class="tab-content">
                <li :class="index === 0 ? 'active' : ''">内容1</li>
                <li :class="index === 1 ? 'active' : ''">内容2</li>
            </ol>
        </section>
        `,
        watch: {
            index(){
                localStorage.setItem("index", this.index)
            }
        }
    })
}
export default init