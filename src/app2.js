import "./app2.css"
import $ from "jquery"

//#app2 .tab-bar缩小范围为#app2的.tab-bar
const $tabBar = $("#app2 .tab-bar")
const $tabContent = $("#app2 .tab-content")

$tabBar.on("click", "li", e => {
    const $li = $(e.currentTarget)
    $li
        .addClass("selected")
        .siblings()
        .removeClass("selected")
    //操控父元素来控制子元素
    const index = $li.index()
    $tabContent
        .children()
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active")
})

//初始click效果, 通过js来实现
$tabBar.children().eq(0).trigger("click")