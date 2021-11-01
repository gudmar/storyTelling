class AbstractElement extends HTMLElement{
    constructor(){
        super();
        this._setShadowInnerHTML();
        const observer = new MutationObserver(this._onInnerHTMLChange.bind(this))
        observer.observe(this, 
            {
                subtree: false,
                childList: true
            }
        )
    }
    static get observedAttributes() {
        return ['data-height', 'data-width', 'data-max-height']
    }
    _onInnerHTMLChange(){
        
    }
    _swapInnerHtmlContent(htmlString, destinationElement){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        destinationElement.innerText = '';
        destinationElement.appendChild(template.content.cloneNode(true));
    }
    _setShadowInnerHTML() {
        let template = document.createElement('template');
        let sh = this.attachShadow({mode: 'open'});
        template.innerHTML = this._getTemplate();
        sh.appendChild(template.content.cloneNode(true));
    }
    _changeElementClassName(classNameToDelete, classNameToAdd, element) {
        element.classList.remove(classNameToDelete)
        element.classList.add(classNameToAdd)
    }
    _isNotNullOrUndefined(value){
        return (value == null || value == undefined)?false:true;
    }
    _setAttribute(valueFromConstructor, propsName, defaultValue){
        let valueFromProps = this.getAttribute(propsName);
        if (this._isNotNullOrUndefined(valueFromProps)){

            return valueFromProps
        } else if (this._isNotNullOrUndefined(valueFromConstructor)) {
            return valueFromConstructor
        } else {
            return defaultValue
        }
        if (this._isNotNullOrUndefined(relatedState)) {
            NiceLogger.logInfo(`${this.constructor.name}: ${relatedState} is not defined`)
        }
    }
}