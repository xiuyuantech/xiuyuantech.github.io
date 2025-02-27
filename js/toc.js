var toc = document.getElementById('toc')

if (toc != null) {
	window.addEventListener("scroll", scrollcatelogHandler);
	var tocPosition = toc.offsetTop;
	var height_header = $("#signature").height();
	function scrollcatelogHandler(e) {
		 var event = e || window.event,
		     target = event.target || event.srcElement;
		 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 if (scrollTop >  tocPosition -60) {
		     toc.classList.add("toc-fixed");
		 } else {
		     toc.classList.remove("toc-fixed");
		 }
	}
	window.addEventListener("load", tocNavLinkHandler);
    function tocNavLinkHandler(e) {
        var elementA = toc.getElementsByTagName("a");
        var length = elementA.length;
        console.log('toc-nav:a:size= '+length);
        var i,childrenA,hrefV,childSpan,spanV,strHref,strSpan,hrefReset,splitStrs,realink;
        for(i=0; i<length; i++){
            childrenA = elementA[i]
            if(!CheckIsNotNull(childrenA)){
               continue
            }
            childSpan = childrenA.getElementsByTagName("span");
            if(1>childSpan.length){
                continue
            }
            hrefV = childrenA.getAttribute("href");
            console.log('ol:a:href:'+hrefV);
            spanV = childSpan[1].childNodes[0].nodeValue;
            console.log('ol:a:href:span:'+spanV);
            //JSON.stringify
            strHref = String(hrefV);
            strSpan = String(spanV);
            if(-1!=strSpan.indexOf("、")){
              strSpan = strSpan.replace("、","-")
            }
            realink = document.getElementById(strSpan.toLowerCase())
            if(null!=realink){
                realink = realink.parentElement
                if(null!=realink){
                  realink = realink.id
                }
            }
            console.log('ol:a:href:span:realink:'+realink);
            if(-1==strHref.indexOf(strSpan)){
               splitStrs = strSpan.split(" ")[0]
               console.log('ol:a:href:span:split:'+splitStrs);
               if(isEnglishStr(splitStrs)){
                splitStrs = splitStrs.toLowerCase()
               }else if(null!=realink){
                splitStrs = realink
               }
               hrefReset = "#"+splitStrs
               childrenA.setAttribute("href",hrefReset)
            }
        }
    }
    function CheckIsNotNull(value) {
            //正则表达式用于判斷字符串是否全部由空格或换行符组成
            var reg = /^\s*$/
            //返回值为true表示不是空字符串
           return (value != null && value != undefined);
    }

    function isEnglishStr(string){
           if(string.length < 1){
               return false;
           }
           for(var i=0;i<string.length;i++){
               var code = string.charCodeAt(i);
               if(code < 48 || code > 57 && code < 65 || code > 90 && code < 97 || code > 122){
                  return false;
               }
           }
           return true;
    }
}

