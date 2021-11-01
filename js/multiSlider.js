

class MultipositionalSlider extends AbstractElement{
    constructor(label, labelSet, initialPosition) {
        super()
        this.label = this._setAttribute(label, 'data-label', 'slider');
        this.position = this._setAttribute(initialPosition, 'data-position', false);
        this.labelSet = this._setAttribute(labelSet, 'data-label-set', ['1', '2', '3', '4' ,'5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']);
        this.SINGLE_SECTION_HEIGHT = 50;
        this.PLACEHOLDER_SIZE = 25;
    }

    static get observedAttributes() {
        return ['data-position', 'data-label', 'data-label-set']
    }

    _getLabel() {
        return this.label==undefined?'slider':this.label
    }
    _getPosition(){
        return this.position==undefined?`${this._getLabelSet()[0]}`:this.position
    }
    _attribute2Array(listOfStirngs){
        return listOfStirngs.split(',')
    }
    _getLabelSet() {
        if (this.getAttribute('data-label-set') != undefined) {
            this.labelSet = this._attribute2Array(this.getAttribute('data-label-set'))
        }
        return this.labelSet==undefined?['1', '2', '3', '4' ,'5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']:this.labelSet
    }

    _get_SINGLE_SECTION_HEIGHT(){
        return this.SINGLE_SECTION_HEIGHT==undefined?50:this.SINGLE_SECTION_HEIGHT
    }
    _get_PLECEHOLDER_SIZE(){
        return this.PLACEHOLDER_SIZE==undefined?25:this.PLACEHOLDER_SIZE;
    }


    _getMutlisilderHeight(){
        return this._getLabelSet().length * this._get_SINGLE_SECTION_HEIGHT() + 'px'
    }

    _restartWidget(){
        this.shadowRoot.innerHTML = '';
        let template = document.createElement('template')
        template.innerHTML = this._getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
    }

    _getTemplate(){
        return `
            <style>
                *{
                    box-sizing: border-box;
                    --slider-width: 20px;
                    --slider-height: ${this._getMutlisilderHeight()};
                }
                :host{
                    position: relative;
                }
                .center{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    align-content: center;
                }
                .slider-movable{
                    position: absolute;
                    transition: 0.25s;
                    width: calc( ${this._get_PLECEHOLDER_SIZE()}px + 0px);
                    height: calc( ${this._get_PLECEHOLDER_SIZE()}px + 0px); 
                    border-radius: 50%;
                    border: none;
                    padding: 0;
                    background-color: var(--color-on);
                    color:white;
                    z-index: 10;
                    top: -0%;
                    left: -2px;
                    box-shadow: inset 0 0 5px #321;
                }
                .slider-movable:hover{
                    cursor: default!important;
                    background-color: var(--color-on)!important;
                }
                ${this._getCSSDefinitionsForEachPositionClass()}
                ${this._getSetOfPositionHoverCSSDefinitions()}
                ${this._getCSSForPositionClassesOfMovableSlider()}
                .slider-movable{
                    position: absolute;
                }
                .position-placeholder{
                    left: -12%;
                    border-radius: 50%;
                    border: gray solid thin;
                    background-color: var(--background-gray);
                    width: ${this._get_PLECEHOLDER_SIZE()}px;
                    height: ${this._get_PLECEHOLDER_SIZE()}px;
                    box-shadow: inset 0 0 5px #777;
                    z-index: 5;
                }
                .position-placeholder-label{
                    position: relative;
                    left: 40px;
                }
                .slider-wrapper{
                    --slider-width: 50px;
                    --slider-height: 20px;
                    --slider-movable-size: ${this._get_PLECEHOLDER_SIZE()}px;
                    --background-gray: rgb(220, 220, 220);
                    --color-on: rgb(100, 180, 100);
                    --color-off: rgb(180, 100, 100);
                    --color-on-hover: rgb(10, 250, 10);
                    --color-off-hover: rgb(250, 10, 10);
                    --position-element-hover-bg: gray;
                    font-family: Arial;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: calc( 2.5 * var(--slider-width));
                    justify-content: space-between;
                }

                .slider-track{
                    position: relative;
                    width: var(--slider-width);
                    height: var(--slider-height);
                    border-radius: calc( var(--slider-width) / 2 );
                    // background-color: #124191;
                    transition: 0.25s;
                    box-shadow: inset 0 0 5px #222;
                }
                .slider-label{
                    margin-bottom: 1rem;
                    font-weight: bold;
                }

            </style>
            <div>
            <div class = 'slider-wrapper center'>
                <div class="slider-label">
                    ${this.label}
                </div>

                <div class = "slider-track">
                    <div class = "slider-movable ${this._getPositionClassName(this._getPosition())} center">
                    ✔
                    </div>
                    ${this._getAllPlaceholderElements()}
                </div>
            </div>
            </div>
        `
    }
    
    
    _getPositionClassName(positionLabel) {
        return 'position-place--' + positionLabel
    }



    _getCSSDefinitionsForEachPositionClass(){
        let output = '';
        let allDefinitions = this._getSetOfPositionClasses_placeholder();
        for (let item in allDefinitions) {
            output = output + `
                .${item}${allDefinitions[item]}
            `
        }
        return output;
    }

    _getCSSForPositionClassesOfMovableSlider(){
        let output = '';
        let allDefinitions = this._getSetOfPositionClasses_movable();
        for (let item in allDefinitions) {
            output = output + `
                ${item}${allDefinitions[item]}
            `
        }
        return output;
    }


    _getSingleSliderPlaceholderElement(className){
        return `<div class = 'position-placeholder ${className}'>
                    <div class = "position-placeholder-label ${className}-label">
                        ${className.split('-')[3]}
                    </div>
                </div>`.trim()
    }
    _getAllPlaceholderElements() {
        let allDefinitions = this._getSetOfPositionClasses_placeholder();
        let allKeys = Object.keys(allDefinitions);
        let output = '';
        for (let key of allKeys) {
            output = output + this._getSingleSliderPlaceholderElement(key)
        }
        return output
    }

    _getSetOfPositionHoverCSSDefinitions(){
        let positionClasses = {...this._getSetOfPositionClasses_placeholder()}
        let output = '';
        for(let item in positionClasses){
            output = output + `
                .${item}:hover{
                    background-color: var(--position-element-hover-bg);
                    cursor: pointer
                }
                .${item}-label:hover .${item}{
                    background-color: var(--position-element-hover-bg);
                    cursor: pointer                    
                }
            `
        }
        return output
    }

    _getPlaceholderPosition(index){

        let sectionSize = this._get_SINGLE_SECTION_HEIGHT();
        let placeholderSize = this._get_PLECEHOLDER_SIZE() + 2;
        let nrOfSections = this._getLabelSet().length - 1;
        return 0*index + index * (sectionSize) + placeholderSize * (index / nrOfSections);

    }

    _getSetOfPositionClasses_placeholder() {
        let output = {};
        let createSingleClass = function(option, index, arr) {
            output[`${this._getPositionClassName(option)}`] = `{position: absolute; top: ${this._getPlaceholderPosition(index)}px;}`
        }.bind(this)
        this._getLabelSet().forEach(createSingleClass)
        return output;
    }

    _getSetOfPositionClasses_movable() {
        let output = {};
        let createSingleClass = function(option, index, arr) {
            output[`.slider-movable.${this._getPositionClassName(option)}`] = `{position: absolute; top: ${this._getPlaceholderPosition(index)}px;}`
        }.bind(this)
        this._getLabelSet().forEach(createSingleClass)
        return output;
    }



    _changeLabel(newLabel){
        this.shadowRoot.querySelector('.slider-label').innerHTML = newLabel;
    }



    _emitStateOnChangeEvent(){
        let e = new CustomEvent('stateOnChanged', {
            detail: {
                newPosition: this.position,
                name: this.label
            }
        })
        this.dispatchEvent(e)
    }
   
   
    _emitLabelChangedEvent(oldValue, newValue){
        let e = new CustomEvent('labelChanged', {
            detail: {
                newLabel: newValue,
                oldLabel: oldValue
            }
        })
        this.dispatchEvent(e)
    }





    _getClassWithRightLabelOutOfClassList(classList){
        for (let cl of classList){
            if (cl.startsWith(this._getPositionClassName(''))) {
                return cl
            }
        }
        throw new ReferenceError(`${this.constructor.name}: could not find right class`)    
    }

    _getRightLabelOutOfClassList(classList){
        let toParse = this._getClassWithRightLabelOutOfClassList(classList)
        try {
            console.log(typeof(toParse.split('-')[3]))
            return toParse.split('-')[3]
        } catch(e) {
            throw new ReferenceError(`${this.constructor.name}: could not find fight class`)
        }        
    }
    _changeMovablesClass(newLabel){
        let movable = this.shadowRoot.querySelector('.slider-movable')
        console.log(movable.classList)
        movable.classList.remove(this._getClassWithRightLabelOutOfClassList(movable.classList))
        movable.classList.add(this._getPositionClassName(newLabel))        
    }

    addEventListenersToLabelsAndPlaceholders(){
        let labels = this.shadowRoot.querySelectorAll('.position-placeholder-label')
        let placeholders = this.shadowRoot.querySelectorAll('.position-placeholder')
        
        // for (let label of labels) {
        //     label.addEventListener('click', (e) => {
        //         let targetLabel = this._getClassWithRightLabelOutOfClassList(e.target.classList)
        //         this._changeMovablesClass(targetLabel)
        //         this.setAttribute('data-position', this._getRightLabelOutOfClassListtargetLabel)
        //     })
        // }
        for (let placeholder of placeholders) {
            placeholder.addEventListener('click', (e) => {
                // let targetClass = this._getClassWithRightLabelOutOfClassList(e.target.classList)
                let targetLabel = this._getRightLabelOutOfClassList(e.target.classList)
                this._changeMovablesClass(targetLabel)
                this.setAttribute('data-position', targetLabel)
            })
        } 
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'data-position') {

        } else if (name == 'data-position') {
            // this._changeMovablesClass(newValue)
        } else if (name == 'data-label-set'){
            this.labelSet = newValue;
            this._restartWidget();
            this.addEventListenersToLabelsAndPlaceholders();
        } else if (name == 'data-label') {
            this._changeLabel(newValue)
        }
    }

    connectedCallback(){

        let setInitialLabel = function(){
            this._changeLabel(this.label)
        }.bind(this)
        let setInitialPosition = function(){
            
        }.bind(this)
        this.addEventListenersToLabelsAndPlaceholders();
        setInitialLabel();
        
        
    }




}
customElements.define('multi-switch', MultipositionalSlider)



