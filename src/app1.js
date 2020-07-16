import "./app1.css"
import Vue from 'vue/dist/vue.esm.js'

// 其他: c
const init = (el) => {
    new Vue({
        el: el,
        data:{
            n: parseFloat(localStorage.getItem("n")) || 100
        },
        methods: {
            add(){
                this.n += 1
            },

            sub(){
                this.n -= 1
            },

            multi(){
                this.n *= 2
            },

            div(){
                this.n /= 2
            },
        },
        watch: {
            // n: function(){
            //     localStorage.setItem("n", this.n)
            // }
            n(){
                localStorage.setItem("n", this.n)
            }
        },
        template:`
            <!-- vue 会吧当前div替换之前的 -->
            <section id="app1">
                <div class="output">
                    <span id="number">{{n}}</span>
                </div>
                <div class="actions">
                    <button @click="add">+1</button>
                    <button @click="sub">-1</button>
                    <button @click="multi">*2</button>
                    <button @click="div">/2</button>
                </div>
            </section> 
        `
    })
}



export default init






