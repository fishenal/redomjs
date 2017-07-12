// a javascript labrary
// real time repeat dom for certain js object
// yu_dong_han@hotmail.com
// 2017.7
(function () {
    // traverse certain node
    function domCom (oParent, oCallback) {
      if (oParent.hasChildNodes()) {
        for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
          domCom(oNode, oCallback)
        }
      }
      oCallback.call(oParent)
    }

   
    // reElement Class , store data and node, triggler this render
    function reElement () {}
    reElement.prototype.render = function () {
        var parent = this.node.parentNode
        this.frag = document.createDocumentFragment()
        for (key in this.data) {
            var element = this.queryScope(this.node, key)
            this.frag.appendChild(element)
        }
        parent.removeChild(this.node)
        parent.appendChild(this.frag)
    }

    // replace certain node variable to real data
    reElement.prototype.queryScope = function (node, key) {
        var dupNode = node.cloneNode(true)
        var thisReEle = this
        domCom (dupNode, function () {
            if (this.nodeType === 1) { // element
                for (key in this.attributes) {
                    if (typeof this.attributes[key].nodeValue === 'string' 
                        && this.attributes[key].nodeValue.match(/\{\{\s*([\w\#]+)\s*\}\}/)) {
                        var newNodeValue = thisReEle.replacement(this.attributes[key].nodeValue, key)
                        this.setAttribute(this.attributes[key].nodeName, newNodeValue)
                    }
                }
            }
            if (this.nodeType === 3) { // text
                if (!/^\s+$/.test(this.nodeValue)) {
                    var newNodeValue = thisReEle.replacement(this.nodeValue, key)
                    this.nodeValue = newNodeValue
                }
            }
        })
        return dupNode
    }
    // replace certain node variable to real data
    reElement.prototype.replacement = function (nodeValue, key) {
        var thisReEle = this
        return nodeValue.replace(/\{\{\s*([\w\#]+)\s*\}\}/g, function(match, p1){
            if (p1 === '#') {
                return thisReEle.data[key]
            }
            return thisReEle.data[key][p1]
        })
    }


    // Redom Class, main Class for export, init process
    window.ReDom = function (conf) {
        this.data = conf.data
        this.queryRe()
    }
    ReDom.prototype.queryRe = function () {
        var body = document.querySelector('body')
        var redoms = []
        var redomThis = this
        domCom (body, function () {
            if (this.nodeType === 1) { // element
               
                if (this.attributes['re']) {
                    var ele = new reElement()
                    ele.data = redomThis.data[this.attributes['re'].value]
                    ele.node = this
                    redoms.push(ele)
                }
            }
        })
        console.log(redoms)
        for (key in redoms) {
            redoms[key].render()
        }
    }
})()
