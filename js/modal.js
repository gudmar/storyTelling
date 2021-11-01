class ModalGeneral{
    constructor(content, id, placeholder='body', onClose = ()=>{}){
        this._throwNoContentExceptionIfContentNotValid(content)
        this.id = Math.random().toString(36).split(2, 9)
        this.contentAsString = typeof(content) == "string"?content:'';
        this.createModal(placeholder)
        if (typeof(content)=='object') {this.addContentIfObject(content)}
        this.addCloseEvent(onClose)
    }

    _getTemplate(){
        return `
            <div id=${this.id} class = "modal-cover center">
                <div class = "modal-body column">
                    
                        <div class = "modal-title-bar">
                            <div class="quick-button modal-shut-button center">&times;</div>
                        </div>
                        <div class = "modal-content">
                            ${this.contentAsString}
                        </div>
                    
                </div>
            </div>
        `
    }

    _isContentValid(content){
        let isValid = true;
        isValid = (content == undefined || content == null)?false:true;
        if (!isValid) {return false}
        isValid = (typeof(content) == 'string' || typeof(content) == 'objct')?true:false;
        return isValid;
    }

    _throwNoContentExceptionIfContentNotValid(content){
        if (this._isContentValid(content) == false) {
            throw new TypeError(`${this.constructor.name}: Content is not valid`)
        }
    }

    _removeModal(onClose) {
        try{
            let thisElement = document.getElementById(this.id);
            thisElement.parentNode.removeChild(thisElement)
            onClose();
        } catch(e) {
            console.log(e);
            throw new Error(`${this.constructor.name} cannot remove modal ${this.id} from DOM ${e}`)
        }
        delete this
    }

    _returnPlaceholderElementIfExists(placeholder){
        let placeholderAsElement = document.querySelector(placeholder);
        if (placeholderAsElement != null || placeholderAsElement != undefined) {
            return placeholderAsElement
        } else {
            throw new ReferenceError(`${this.constructor.name}: element with selector ${placeholder} does not exist`)
        }
    }

    createModal(placeholder){
        let template = document.createElement('template');
        let destination = this._returnPlaceholderElementIfExists(placeholder)
        template.innerHTML = this._getTemplate();
        destination.appendChild(template.content.cloneNode(true))
    }

    addContentIfObject(contentAsObject){
        document.getElementById(this.id).document.querySelector('.modal-content').appendChild(contentAsObject)
    }

    addCloseEvent(onClose) {
        let button = document.getElementById(this.id).querySelector('.modal-shut-button');
        
        button.addEventListener('click', this._removeModal.bind(this, onClose))
    }
}


