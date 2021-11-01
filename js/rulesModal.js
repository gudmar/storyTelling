class RulesModal{

    constructor(placeholderSelector){
        this.contentElement = this._prepareContentElement()
        this.parentModal = new ModalGeneral(this.contentElement,'settingsModal', 'body', ()=>{})
        this.id = this._getRandomId();
        
        let settingsElement = this._stringToElement(this.contentElement)
        try{
            document.querySelector(placeholderSelector).appendChild(settingsElement)
        } catch(e) {
            console.log(e)
            NiceLogger.logError(`${this.constructor.name}: probably placeholderSelector is not valid`)
        }

    }

    _getRandomId(){
        return Math.random().toString(36).split(2,9);
    }


    _stringToElement(str){
        let template = document.createElement('template');
        template.innerHTML = str;
        return template.content.cloneNode(true)
    }

    


    _prepareContentElement() {
        let output = `

         <div class = 'row'>
            <div class = "center tale-structure column">
                <span class = "center color color-none label">Story, not question answer</span>
                <div class = "center color-black tale-structure-content tale-structure-begin">Opener</div>
                <div class = "center tale-structure-content tale-structure-body">Body</div>
                <div class = "center color-black tale-structure-content tale-structure-ending">Conclusion</div>
            </div>

            <div class = "color-section-content column">
                <div class = ' row center entry'>
                    <div class = 'color color-none center'>
                        &le;30s
                    </div>
                    <span>Preparation</span>
                 </div>
                <div class = 'row center entry'>
                    <div class = 'color color-green center'>
                       &ge;1min
                    </div>
                    <span>Free to stop</span>
                 </div>
                <div class = 'row center entry'>
                    <div class = 'color color-yellow center'>
                        &ge;1:30min
                    </div>
                    <span>Conclude</span>
                 </div>
                <div class = 'row center entry'>
                    <div class = 'color color-red center'>
                        &ge;2min
                    </div>
                    <span>Best time to end!</span>
                 </div>
                <div class = 'row center entry'>
                    <div class = 'color color-black center'>
                        &ge;2:30min
                    </div>
                    <span class = "skull">&#9760;</span>
                 </div>

            </div>
        </div>

        `

        return output;
    }

}