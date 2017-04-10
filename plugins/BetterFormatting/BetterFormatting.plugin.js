//META{"name":"BetterFormatting"}*//

var BetterFormatting = function() {};

BetterFormatting.prototype.replaceList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}";
BetterFormatting.prototype.smallCapsList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ{|}";
BetterFormatting.prototype.superscriptList = " !\"#$%&'⁽⁾*⁺,⁻./⁰¹²³⁴⁵⁶⁷⁸⁹:;<⁼>?@ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ[\\]^_`ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ{|}";
BetterFormatting.prototype.upsideDownList = " ¡\"#$%⅋,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;>=<¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z]\\[^‾,ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz}|{";
BetterFormatting.prototype.fullwidthList = "　！\＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝";

BetterFormatting.prototype.toolbarString = "<div class='bf-toolbar'><div><b>Bold</b></div><div><i>Italic</i></div><div><u>Underline</u></div><div><s>Strikethrough</s></div><div style='font-family:monospace;'>Code</div><div>ˢᵘᵖᵉʳˢᶜʳᶦᵖᵗ</div><div>SᴍᴀʟʟCᴀᴘs</div><div>Ｆｕｌｌｗｉｄｔｈ</div><div>uʍopǝpᴉsd∩</div></div></div>";

BetterFormatting.prototype.wrappers = ["**", "*", "__", "~~", "`", "^", "%", "#", "&"];

BetterFormatting.prototype.format = function(e) {
    if (e.shiftKey || e.which != 13) return;
    $textarea = $(e.currentTarget);
    var text = $textarea.val();
    var bf = BdApi.getPlugin("Better Formatting");
    for (var i = 0; i < text.length; i++) {
        var len = text.length;
        switch (text[i]) {
            case "`":
                next = text.indexOf("`", i + 1);
                if (next != -1)
                    i = next;
                break;
            case "@":
                var match = /@.*#[0-9]*/.exec(text.substring(i))
                if(match && match.index == 0)
                    i += match[0].length - 1;
                break;
            case "^":
                // TODO: write a function for replacement
                if (text[i - 1] == "\\") {
                    text = text.substring(0, i - 1) + text.substring(i--);
                    break;
                }
                var next = text.indexOf("^", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})\\^([^]*)\\^([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = bf.replaceList.indexOf(letter);
                            return index != -1 ? bf.superscriptList[index] : letter;
                        })
                        return before + middle + after;
                    });
                    i = next - 2;
                }
                break;
            case "%":
                if (text[i - 1] == "\\") {
                    text = text.substring(0, i - 1) + text.substring(i--);
                    break;
                }
                var next = text.indexOf("%", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})%([^]*)%([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = bf.replaceList.indexOf(letter);
                            return index != -1 ? bf.smallCapsList[index] : letter;
                        })
                        return before + middle + after;
                    });
                    i = next - 2;
                }
                break;
            case "#":
                if (text[i - 1] == "\\") {
                    text = text.substring(0, i - 1) + text.substring(i--);
                    break;
                }
                var next = text.indexOf("#", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})#([^]*)#([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = bf.replaceList.indexOf(letter);
                            return index != -1 ? bf.fullwidthList[index] : letter;
                        })
                        return before + middle + after;
                    });
                    i = next - 2;
                }
                break;
            case "&":
                if (text[i - 1] == "\\") {
                    text = text.substring(0, i - 1) + text.substring(i--);
                    break;
                }
                var next = text.indexOf("&", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})&([^]*)&([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = bf.replaceList.indexOf(letter);
                            return index != -1 ? bf.upsideDownList[index] : letter;
                        })
                        return before + middle.split("").reverse().join("") + after;
                    });
                    i = next - 2;
                }
                break;
        }
    }
    $textarea.val(text);
};

BetterFormatting.prototype.wrapSelection = function(textarea, wrapper) {
    var text = textarea.value;
    var start = textarea.selectionStart;
    var len = text.substring(textarea.selectionStart, textarea.selectionEnd).length;

    text = wrapper + text.substring(textarea.selectionStart, textarea.selectionEnd) + wrapper;

    textarea.focus();

    setTimeout(() => {
        document.execCommand("insertText", false, text);
        textarea.selectionEnd = (textarea.selectionStart = start + wrapper.length) + len;
    }, 1);
}

BetterFormatting.prototype.showToolbar = function(e) {
    $textarea = $(e.currentTarget);
    $textarea.parent().siblings(".bf-toolbar").stop().slideDown();
}

BetterFormatting.prototype.hideToolbar = function(e) {
    $textarea = $(e.currentTarget);
    $textarea.parent().siblings(".bf-toolbar").stop().slideUp();
}

BetterFormatting.prototype.addToolbar = function($textarea) {
    var hoverInterval;
    $textarea
        .on("keypress.betterformatting", this.format)
        .on("focus.betterformatting", this.showToolbar)
        .on("blur.betterformatting", this.hideToolbar)
        .parent().after(this.toolbarString)
        .siblings(".bf-toolbar")
        .on("mousemove.betterformatting", (e) => {
            $this = $(e.currentTarget);
            var pos = e.pageX - $this.parent().offset().left;
            var diff = -$this.width();
            $this.children().each((index, elem) => {
                diff += $(elem).outerWidth();
            });
            $this.scrollLeft(pos / $this.width() * diff);
        })
        .on("mouseenter.betterformatting", () => {
            hoverInterval = setInterval(() => {
                $textarea.focus();
            }, 10);
        })
        .on("mouseleave.betterformatting", () => {
            clearInterval(hoverInterval);
        })
        .on("click.betterformatting", "div", (e) => {
            $button = $(e.currentTarget);
            this.wrapSelection($textarea[0], this.wrappers[$button.index()]);
        })
        .show();
};

// unused
BetterFormatting.prototype.load = function() {};
BetterFormatting.prototype.unload = function() {};
BetterFormatting.prototype.onMessage = function() {};
BetterFormatting.prototype.onSwitch = function() {};
// unused

BetterFormatting.prototype.start = function() {
    $(".channel-textarea textarea").each((index, elem) => {
        this.addToolbar($(elem));
    });
    BdApi.injectCSS("bf-style", `
.bf-toolbar {
    user-select: none;
    overflow: hidden;
    width: calc(100% - 30px);
    white-space: nowrap;
    font-size:85%;
    height:auto;
    display:flex;
    padding:0px 10px;
}
.bf-toolbar div {
    display: inline;
    padding: 7px 5px;
    transition: all .2s ease;
    cursor: pointer;
    display : inline-flex;
    align-items : center;
}
.bf-toolbar div:hover {
    background: rgba(102,102,102,.5);
}
`);
};

BetterFormatting.prototype.stop = function() {
    $(document).add("*").off("betterformatting");
    $(".bf-toolbar").remove();
    BdApi.clearCSS("bf-style");
};

BetterFormatting.prototype.observer = function(e) {
    if (!e.addedNodes.length) return;

    var $elem = $(e.addedNodes[0]);

    if ($elem.find(".channel-textarea").length || $elem.closest(".channel-textarea").length) {
        $textarea = $elem.find("textarea");
        this.addToolbar($textarea);
    }
};

BetterFormatting.prototype.getSettingsPanel = function() {
    return "";
};

BetterFormatting.prototype.getName = function() {
    return "Better Formatting";
};

BetterFormatting.prototype.getDescription = function() {
    return "Let's you format your messages with buttons and adds more formatting options";
};

BetterFormatting.prototype.getVersion = function() {
    return "0.2.1";
};

BetterFormatting.prototype.getAuthor = function() {
    return "Anxeal";
};
