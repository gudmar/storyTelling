class SettingsModal{

    // DESCRIPTOR
    // [
    //     {
    //         groupName: string,
    //         listOfSwitches: [
    //             {
    //                 type: string,
    //                 label: string,
    //                 handler: 'function',
    //                 defaultValue: 'string'
    //             }
    //         ]
    //     }
    // ]
    // [
    //     {
    //         groupName: "Extentions",
    //         listOfSwitches: [
    //             {
    //                 type: string,
    //                 label: string,
    //                 handler: 'function',
    //                 defaultValue: 'string'
            //         options: 'in case of radio'
    //             }
    //         ]
    //     }
    // ]



    constructor(descriptor, onClose, placeholderSelector){
        this.handlersMap = []
        this.contentElement = this._prepareContentElement(descriptor)
        this.parentModal = new ModalGeneral(this.contentElement,'settingsModal', 'body', onClose)
        this.id = this._getRandomId();
        
        let settingsElement = this._stringToElement(this.contentElement)
        try{
            document.querySelector(placeholderSelector).appendChild(settingsElement)
        } catch(e) {
            NiceLogger.logError(`${this.constructor.name}: probably placeholderSelector is not valid`)
        }
        this.onClose = onClose;
        this._applyEvents();
    }

    _getRandomId(){
        return Math.random().toString(36).split(2,9);
    }

    _singleObjectHasAllKeys(obj, mandatoryKeys){
        let nrOfMandatoryKeys = mandatoryKeys.length;
        let objKeys = Object.keys(obj)
        let nrOfKeys = 0;
        for(let key of mandatoryKeys){
            if (!objKeys.includes(key)) {return false}
        }
        return true;
    }

    _isDescriptorValid(descriptor) {
        let singleObjectHasAllKeys = function(obj) {
            let mandatoryKeys = ['groupName', 'listOfSwitches'];
            return this._singleObjectHasAllKeys(obj, mandatoryKeys)
        }
        let allObjectsHaveAllKeys = function(){
            return descriptor.reduce((acc, element) => {
                if (acc == false) {return false} 
                else {return singleObjectHasAllKeys(element)}
            })
        }
        let conditions = [
            (descriptor == undefined || descriptor == null),
            !Array.isArray(descriptor),
            descriptor.length == 0,
            !allObjectsHaveAllKeys()
        ]
        for (let condition of conditions) {
            if (!condition) {return false}
        }
        return true
    }

    _isSwitchDescriptorValid(switchDescriptor){
        let mandatoryKeys = ['type', 'label', 'handler', 'defaultValue']
        return this._singleObjectHasAllKeys(switchDescriptor, mandatoryKeys)
    }

    _stringToElement(str){
        let template = document.createElement('template');
        template.innerHTML = str;
        return template.content.cloneNode(true)
    }

    _prepareSingleInput(descriptor, id) {
        if (!this._isSwitchDescriptorValid(descriptor)){
            throw new TypeError(`${this.constructor.name}: switch descriptor is not valid. Should have keys {type: string, label: string, handler: function, defaultValue: string'`)
        } else {
            switch(descriptor.type){
                case 'checkbox':
                    return `<slide-box id=${id} data-is-on='${descriptor.defaultValue}' data-label='${descriptor.label}'></slide-box>`
                case 'radioButtonGroup':
                    return `<multi-switch id = ${id} data-label='${descriptor.label}' data-position='${descriptor.defaultValue}' data-label-set='${descriptor.options}'></multi-switch>`
                default:
                    throw new TypeError(`${this.constructor.name}: Not supported input type`)
            }
        }
    }

    

    _mapIdToHandler(inputId, inputHandler) {
        this.handlersMap.push(
            {
                id: inputId,
                handler: inputHandler
            }
        )
    }

    _applyEvents(){
        for (let element of this.handlersMap) {
            document.getElementById(element.id).addEventListener('click', element.handler)
        }
    }

    _arrayToString(arr){
        return arr.reduce((acc, item) => {
            return acc + item + '';
        })
    }

    _prepareGroupOfInputs(title, listOfSwitches) {
        let switches = function() {
            return listOfSwitches.map((item, index) => {
                let newId = this.id + this._getRandomId() + '_' + index
                this._mapIdToHandler(newId, item.handler)
                return `${this._prepareSingleInput(item, newId)}`
            })
        }.bind(this)
        return `<div class = "list-of-settings">
                    <div class = "list-of-settings-title">${title}</div>
                    ${this._arrayToString(switches())}
                </div>`
    }

    _prepareContentElement(descriptor) {
        let output = ''
        let settingMenus = function() {
            return descriptor.map((item, index) => {
                return this._prepareGroupOfInputs(item.groupName, item.listOfSwitches)
            })
        }.bind(this)
        if (!this._isDescriptorValid){
            throw new TypeError(`${this.constructor.name}: descriptor is not valid. Should be array of objects {groupName, listOfSwitches}`)
        }
        return `
        <div class="settings-wrapper center">
            ${this._arrayToString(settingMenus())}
        </div>
        `
    }

}