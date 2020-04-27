const defaultConfig = {
    mode: 'gfm',
    width: "100%",
    height: 515,
    path: "editor.md/lib/",
    theme: "",  //dark
    previewTheme: "",   //dark
    // fontSize: "20px",
    editorTheme: "3024-day", //monokai tomorrow-night-eighties 3024-day mdn-like
    markdown : '',   //动态设置的markdown文本
    autoLoadModules: false,
    codeFold: true,
    //syncScrolling : false,
    saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
    searchReplace: true,
    watch : true,                // 关闭实时预览
    htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
    //toolbar  : false,             //关闭工具栏
    //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
    emoji: true,
    taskList: true,
    tocm: true,         // Using [TOCM]
    toc: true,
    tocContainer: '#table-of-content',
    tex: true,                   // 开启科学公式TeX语言支持，默认关闭
    flowChart: true,             // 开启流程图支持，默认关闭
    sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
    //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
    //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
    //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
    dialogMaskOpacity : 0.6,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
    dialogMaskBgColor : "#000000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    imageUploadURL: "http://localhost/file/insert-image",
    crossDomainUpload: true,
    uploadCallbackURL : "http://localhost:8080/callback.html",
    placeholder: '请在此详细描述你的问题',
    onload: function () {
        //console.log('onload', this);
        //this.fullscreen();
        //this.unwatch();
        //this.watch().fullscreen();
        //this.setMarkdown("#PHP");
        //this.width("100%");
        //this.height(480);
        //this.resize("100%", 640);
    },
    toolbarIcons: function () {
        return ['undo', 'redo', '|', 'bold', 'del', 'italic', 'quote', 'ucwords',
            'uppercase', 'lowercase', 'h1', 'h2', 'h3', '|', 'list-ul', 'list-ol', 'hr',
            'link', 'image', 'code', 'code-block', 'table','emoji', 'html-entities',
            'pagebreak', '|', 'watch', 'fullscreen', 'clear', 'search'];
    }
};
export {
    defaultConfig,
};
