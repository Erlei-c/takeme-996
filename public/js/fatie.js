$(function(){
    $("input#postmessage").focus(function(){
    
        var E = window.wangEditor
        var editor = new E('#editor')
        // const editor = new E('#editor') // 取消自动聚焦 focuseditor.config.focus = false editor.create()
        editor.config.height = 200
        editor.config.zIndex = 500
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.create();
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