$(function () {
    $("input#postmessage").focus(function () {

        var E = window.wangEditor
        var editor = new E('#editor')
        // const editor = new E('#editor') // 取消自动聚焦 focuseditor.config.focus = false editor.create()
        editor.config.height = 200
        editor.config.zIndex = 500
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.create();
        document.getElementById('btn1').addEventListener('click', function () {
            // 读取 html
            alert(editor.txt.html())
        }, false)

        document.getElementById('btn2').addEventListener('click', function () {
            // 读取 text
            alert(editor.txt.text())
        }, false)
    });

    // $("input").blur(function(){
    //     var E = window.wangEditor
    //     var editor = new E('#editor')
    //     //const editor = new E('#editor') // 取消自动聚焦 focuseditor.config.focus = false editor.create()
    //     editor.config.height = 200
    //     editor.config.zIndex = 500
    //     // 或者 var editor = new E( document.getElementById('editor') )
    //     editor.create();
    // });
})