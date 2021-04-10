class CubeLogo extends AbstractElement{
    constructor(){
        super()
    }
    _onInnerHTMLChange(){
        let logoAnchor = this.shadowRoot.querySelector('.cube-logo-content');
        logoAnchor.innerHTML = this._createLogoFromInnerText()
    }
    _getTemplate(){
        return `
            <style>
                .cube-logo-content{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                .cube-logo-word{
                    display: flex;
                    flex-direction: row;       
                    margin-right: 2rem;  
                    margin-bottom: 2rem;                               
                }
                .cube-logo-symbol{
                    font-family: Arial;
                    border-radius: 5px;
                    width: 2rem;
                    height: 2rem;
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: black;
                    position: relative;
                    padding: 0.2rem;
                    margin: 0.2rem;
                }
                .center{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    align-content: center;
                }
                media(max-height: 600px){
                    .cube-logo-content{
                        display: none;
                    }
                }
                
            </style>
            <div class="cube-logo-content center">
                ${this._createLogoFromInnerText()}
            </div>
        `
    }
    _arrayInfiniteIterator(arr){
        let internalArray = arr
        let i = 0;
        return {
            next: function(){
                i++;
                if (i > internalArray.length - 1) {i = 0}
                return {
                    value: internalArray[i],
                    done: false
                }
            }
        }
    }
    _angleGenerator(){
        return this._arrayInfiniteIterator(['-10deg', '10deg', '-15deg', '20deg', '10deg', '0deg', '7deg'])
    }
    _backgroundColorGenerator(){
        return this._arrayInfiniteIterator(['rgb(250, 100, 100)', 'rgb(100, 250, 100)', 'rgb(200, 200, 100)', 'rgb(100, 100, 220)'])
    }
    _singleCubeStylingGenerator(){
        let angleGen = this._angleGenerator();
        let colorGen = this._backgroundColorGenerator();
        return {
            next: function() { return `background-color: ${colorGen.next().value}; transform: rotateZ(${angleGen.next().value})`}
        }
    }
    _getSingleCube(symbol){
        this.symbolStyleGenerator = this.symbolStyleGenerator == undefined?this._singleCubeStylingGenerator():this.symbolStyleGenerator;
        return `
            <span class = "cube-logo-symbol center" style="${this.symbolStyleGenerator.next()}">
                ${symbol}
            </span>
        `.trim();
    }
    _makeAllWords(text) {
        let wordsArray = text.split(' ')
        let output = ``;
        let getSingleWord = function(word){
            return `
            <span class="cube-logo-word">
                ${this._makeSingleWord(word)}
            </span>
            `
        }.bind(this)
        console.log(wordsArray)
        for (let word of wordsArray){
            output = output + getSingleWord(word)
        }
        return output;
    }
    _makeSingleWord(captionAsString){
        let output = ''
        for(let letter of captionAsString){
            output = output + this._getSingleCube(letter)
        }
        return output;
    }

    _createLogoFromInnerText(){
        return this._makeAllWords(this.innerHTML)
    }


}

customElements.define('cube-logo', CubeLogo)