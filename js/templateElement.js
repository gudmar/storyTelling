class ElementTemplate{
    constructor(content, id, placeholder){
        this.content = content
        this.id = this._exists(id)?id:this._generateRandomId();
        if (this._exists(document.querySelector(placeholder))){
            this.placeholder = placeholder;
            this._placeElement()
        } else {
            throw new ReferenceError(`${this.constructor.name}: there is no ${placeholder} in DOM. Cannot place element`)
        }
    }

    _generateRandomId(){
        return Math.random().toString(36).slice(2,9);
    }


    _makeElement(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        let clone = template.content.cloneNode(true)
        this.elementHandle = clone;
        return clone
    }

    removeMe() {
        try{
            document.querySelector(document.getElementById(this.id))
        } catch(e) {
            console.log(`Cannot remove ${this.id} from DOM`)
        } 
        delete this
    }

    _exists(expression) {
        if (expression != undefined && expression != null) {
            return true
        } else {
            return false
        }
    }

    _getTemplate(){
        return `
            <div ${this.id} style="position: absolute; width: 100vw; height: 100vh; background-color: black; color: red; display: flex; align-items: center; justify-content: center">
                This should be overwritten
            </div>
        `
    }

    _placeElement(){
        document.querySelector(this.placeholder).appendChild(this._makeElement(this._getTemplate()))
    }

    getElement() {
        return document.getElementById(this.id)
    }
}