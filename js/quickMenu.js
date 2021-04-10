

class QuickMenuButton extends ElementTemplate {
    constructor(symbol, id, placeholder){
        // symbol is content in parent class
        super(symbol, id, placeholder)
        this.symbol = symbol;
    }

    _getTemplate(){
        return `
            <div id=${this.id} class="center quick-button">
                ${this.content}
            </div>
        `
    }
}


class QuickMenu extends ElementTemplate {
    constructor(buttonDescriptors, id, placeholder) {
        super('', id, placeholder);
        if (this._exists(buttonDescriptors))
        {
            this.buttonDescriptors = buttonDescriptors
            this.menuContent = document.querySelector(".quick-menu")
            this.menuContentSelector = '.quick-menu'
            this._createAllButtons();
        } else {
            throw new ReferenceError(`${this.constructor.name} empty button desctiptors`)
        }
        
    }

    _getTemplate() {
        return `
            <div id = ${this.id} class = "quick-menu center">
            </div>
        `
    }
    _createSingleButton(symbol, id, onClick) {
        let button = new QuickMenuButton(symbol, id, this.menuContentSelector)
        button.getElement().addEventListener('click', onClick)
    }

    _createAllButtons(){
        for (let button of this.buttonDescriptors){
            let {symbol, id, onClick} = button;
            this._createSingleButton(symbol, id, onClick)
        }
    }
}

class StoryCubesMenu{
    constructor(placeholder, handlers){
        this.placeholder = placeholder;
        this._extractHandlers(handlers);
        new QuickMenu(this._getButtonDescriptors(), 'storyCubeMenuId', this.placeholder)
        
    }
    doNothing(){
        console.log(e.target)
    }
    _extractHandlers(handlers){
        // if (!this._exists(handlers)) handlers = {}
        let {drawAllElements, openSettingsHandler, openAboutHandler, openRulesHandler} = handlers;
        this.redrawAllHandler = drawAllElements;
        this.openAboutHandler = openAboutHandler;
        this.openRulesHandler = openRulesHandler;
        this.openSettingsHandler = openSettingsHandler;
    }
    _getButtonDescriptors() {
        return [
            {
                name: 'drawAllElements',
                symbol: '&#8635;',
                onClick: this.redrawAllHandler,
                id: 'drawAllElementsButtonId'
            },
            {
                name: 'settingsMenu',
                symbol: '&#9776;',
                onClick: this.openSettingsHandler,
                id: 'openSettingsMenu'
            },
            {
                name: 'rulesMenu',
                symbol: '&#9757;',
                onClick: this.openRulesHandler,
                id: 'openRulesMenu'
            },
            {
                name: 'About',
                symbol: '@',
                onClick: this.openAboutHandler,
                id: 'openAboutMenu'
            }

        ]
    }
}