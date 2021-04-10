
class Cube {
    constructor(props){
        if (props) {
            if (props.onClick) { this.onClick = onClick}            
            if (propr.id) {this.id = id}
            if (prop.symb) (this.symb = this.symb)
        }
        this.cube = this._makeElement()
        
    }

    _getTemplate() {
        let temp = `
            <div class="center cube">
                ${this.symb?this.symb:''}
            </div>
        `
        return temp
    }
    setContent(symb){
        this.cube.innerHTML = symb;
        this.cube.setAttribute('id', '5')
    }
    _makeElement() {
        // let template = document.createElement('template');
        // template.innerHTML = this._getTemplate();
        // let cube = template.content.cloneNode(true);

        let cube = document.createElement('div');
        cube.classList.add('center');
        cube.classList.add('cube');
        cube.innerHTML = this.symb?this.symb:'';
        
        if (this.onClick) {cube.setAttribute('onClick', this.onClick); cube.classList.add('hoverable')}
        if (this.id) {cube.setAttribute('id', this.id)}
        return cube
    }

    getCube() {
        return this.cube;
    }
    getSymbol() {
        return this.cube.innerHTML
    }
}

