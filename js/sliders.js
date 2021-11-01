

class Slider extends AbstractElement{
    constructor(initialStateOn, label) {
        super()
        this.stateOn = this._setAttribute(initialStateOn, 'data-is-on', false);
        this.label = this._setAttribute(label, 'data-label', 'slider')
        this.okSymbol = '&#10004;';
        this.nokSymbol = '&#10007;';
    }

    static get observedAttributes() {
        return ['data-is-on', 'data-label']
    }

    _getOnOffClassName(){
        return this.stateOn?'slider-on':'slider-off'
    }
    _getTemplate(){
        return `
            <style>
                *{
                    box-sizing: border-box;
                    --slider-width: 60px;
                    --slider-height: 20px;
                }
                :host{
                    display: inline-block;
                    width: calc( 2.5 * var(--slider-width));
                    position: relative;
                }
                .center{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    align-content: center;
                }
                .slider-wrapper{
                    --slider-width: 60px;
                    --slider-height: 20px;
                    --slider-movable-size: 25px;
                    --background-gray: rgb(220, 220, 220);
                    --color-on: rgb(100, 180, 100);
                    --color-off: rgb(180, 100, 100);
                    --color-on-hover: rgb(10, 250, 10);
                    --color-off-hover: rgb(250, 10, 10);
                    font-family: Arial;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    width: calc( 2.5 * var(--slider-width));
                    justify-content: space-between;
                }
                .slider-wrapper:hover{
                    transition: 0.25s;
                    cursor: pointer;
                }
                .slider-wrapper:hover>.slider-track.slider-on{
                    background-color: var(--color-on-hover);
                }
                .slider-wrapper:hover>.slider-track.slider-off{
                    background-color: var(--color-off-hover);
                }
                .slider-wrapper:hover .slider-on-off-label.slider-on{
                    background-color: var(--color-on-hover);
                    color: black;
                }
                .slider-wrapper:hover .slider-on-off-label.slider-off{
                    background-color: var(--color-off-hover);
                    color: black;
                }
                .slider-track{
                    position: relative;
                    width: var(--slider-width);
                    height: var(--slider-height);
                    border-radius: calc( var(--slider-height) / 2 );
                    background-color: #124191;
                    transition: 0.25s;
                    box-shadow: inset 0 0 5px #222;
                }
                .slider-track.slider-on{
                    background-color: var(--color-on);
                }
                .slider-track.slider-off{
                    background-color: var(--color-off);
                }
                .slider-movable{
                    position: absolute;
                    transition: 0.25s;
                    width: calc( var(--slider-movable-size) + 5px);
                    height: calc( var(--slider-movable-size) + 5px); 
                    border-radius: 50%;
                    background-color: var(--background-gray);
                    top: -25%;
                    box-shadow: inset 0 0 5px #777;
                }
                .slider-movable.slider-off{
                    position: absolute;
                    left:0;
                }
                .slider-movable.slider-on{
                    position: absolute;
                    left: calc( var(--slider-width) - var(--slider-movable-size));
                }
                .slider-on-off-label{
                    color: white;
                    position: relative;
                    width: var(--slider-movable-size);
                    height: var(--slider-movable-size);
                    border-radius: 50%;
                    font-size: 13px;
                    transition: 0.25s;
                    box-shadow: inset 0 0 5px #222;
                }
                .slider-on-off-label.slider-on{
                    background-color: var(--color-on);
                }
                .slider-on-off-label.slider-off{
                    background-color: var(--color-off);
                }

            </style>
            <div>
            <div class = 'slider-wrapper center'>
                <div class = "slider-track ${this._getOnOffClassName()}">
                    <div class = "slider-movable ${this._getOnOffClassName()} center">
                        <div class = "${this._getOnOffClassName()} slider-on-off-label center">
                            ${this.nokSymbol}
                        </div>
                    </div>
                </div>
                <div class="slider-label">
                    ${this.label}
                </div>
            </div>
            </div>
        `
    }

    _changeLabel(newLabel){
        this.shadowRoot.querySelector('.slider-label').innerHTML = newLabel;
    }
    // _changeIsOnAttribute(newValue){
    //     this.setAttribute('data-is-on', newValue)
    // }

    _changeViewToOn(){
        let changeClassToOn = function(element) { this._changeElementClassName('slider-off', 'slider-on', element)}.bind(this)
        changeClassToOn(this.shadowRoot.querySelector('.slider-track'))
        changeClassToOn(this.shadowRoot.querySelector('.slider-movable'))
        changeClassToOn(this.shadowRoot.querySelector('.slider-on-off-label'))
        this.shadowRoot.querySelector('.slider-on-off-label').innerHTML = this.okSymbol;
    }
    _changeViewToOff(){
        let changeClassToOff = function(element) { this._changeElementClassName('slider-on', 'slider-off', element)}.bind(this)
        changeClassToOff(this.shadowRoot.querySelector('.slider-track'))
        changeClassToOff(this.shadowRoot.querySelector('.slider-movable'))
        changeClassToOff(this.shadowRoot.querySelector('.slider-on-off-label'))
        this.shadowRoot.querySelector('.slider-on-off-label').innerHTML = this.nokSymbol;
    }
    _toggleIsOnView(){
        if (this.stateOn) {
            this._changeViewToOn();
        } else {
            this._changeViewToOff()
        }
    }
    _setIsOnState(val) {
        switch(val) {
            case 'true':
                this.stateOn = true;
                break;
            case 'false':
                this.stateOn = false;
                break;
            case undefined:
                this.stateOn = false;
                break;
            case null:
                this.stateOn = false;
                break;
            default:
                throw new TypeError(`${this.constructor.name}: ${val} is unsupported data-is-on attrubite value`)
        }
    }
    _emitStateOnChangeEvent(){
        let e = new CustomEvent('stateOnChanged', {
            detail: {
                newOnState: this.stateOn,
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

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'data-is-on') {
            // console.log(`${this.label} state changed to ${this.stateOn}`)
            this._setIsOnState(newValue);
            this._toggleIsOnView();
            this._emitStateOnChangeEvent();
        } else if (name == 'data-label') {
            this._changeLabel(newValue)
            this._emitLabelChangedEvent(oldValue, newValue)
        }
    }
    connectedCallback(){
        let toggleStateOnAttribute = function(){
            let nextValue = true;
            let currentValue = this.getAttribute('data-is-on');
            if (!this._isNotNullOrUndefined(currentValue)) {
                nextValue = true
            } else if (currentValue == 'false') {
                nextValue = true
            } else if (currentValue == 'true') {
                nextValue = false
            }
            this.setAttribute('data-is-on', nextValue);
        }.bind(this)
        let setInitialLabel = function(){
            this._changeLabel(this.label)
        }.bind(this)
        let setInitialIsOnState = function(){
            this.setAttribute('data-is-on', this.stateOn)
        }.bind(this)

        setInitialLabel();
        // setInitialIsOnState();
        this.shadowRoot.querySelector('.slider-wrapper').addEventListener('click', toggleStateOnAttribute);
    }




}
customElements.define('slide-box', Slider)



class RadioGroup extends HTMLElement{

}