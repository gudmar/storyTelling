class CubeManager{
    constructor(props){
        // this.state = {
        //     chosenSymbolArrays: [1, 2],
        //     nrOfCubes: 6
        // }
        console.warn('Some issue when to few cubes to create a plot, see how looks like in devtool phone simulator')
        this.state = this._getInitialState({
            chosenSymbolArrays: [0],
            nrOfCubes: 6
        })

        if (props) {
            if (props.nrOfCubes) {this.state.nrOfCubes = parseInt(props.nrOfCubes)}
            if (props.arrOfCat) {this.arrOfCat = props.arrOfCat}
            if (props.placeholder) {this.placeholder = props.placeholder}
        }


        this.symbolDB = Symbols;
        this.supportedSymbolArrayNames = this.symbolDB.getSupportedSymbolArrayNames()
        this.supportedNrOfCubes = [3, 6, 9, 12];
        // this.nrOfCubes = this.nrOfCubes?this.nrOfCubes:this.state.nrOfCubes;
        this.arrOfCat = this._arrOfCategories()
        this.placeholder = this.placeholder?this.placeholder:document.querySelector('body')


        this.arrayOfSymbols = this.setOfSymbols();

        this.cubeCreator = CubeSet;
        this.createSetOfCubes();

        new StoryCubesMenu('.root', {
            drawAllElements: this.recreateSetOfCubes.bind(this),
            openAboutHandler: this.createAboutModal.bind(this),
            openRulesHandler: this.createRulesMenu.bind(this),
            openSettingsHandler: this.createSettingsModal.bind(this)
        })
    }

    // _setStateIncludingLocalStorage(defaultState){
    //     [_symbolArray, _nrOfCubes] = defaultState;
    //     let localStorageSymbols = localStorage.getItem('chosenSymbolArrays')
    //     let localStorageNrOfCubes = localStorage.getItem('nrOfCubes')
    //     if (localStorageSymbols == null) {
    //         this.state.chosenSymbolArrays = defaultState.chosenSymbolArrays
    //     } else {
    //         this.state.chosenSymbolArrays = this.arrOfString2ArrOfNum(localStorageSymbols);
    //     }
    //     if (localStorageNrOfCubes == null) {
    //         this.state.nrOfCubes = defaultState.localStorageNrOfCubes
    //     } else {
    //         this.state.chosenSymbolArrays = defaultState.nrOfCubes
    //     }
    //     console.log(this.state)
    // }

    arrOfString2ArrOfNum(arr){
        arr.forEach((element)=>{return parseInt(element)});
        return arr;
    }

    _mapIndexesToSymbolArrayNames(arrayOfIndexes) {
        let mapFunction = function(current, index, arr) {
            return this.supportedSymbolArrayNames[parseInt(current)]
        }.bind(this)
        let output = arrayOfIndexes.map(mapFunction)
        return output
    }

    _arrOfCategories() {
        return this._mapIndexesToSymbolArrayNames(this.state.chosenSymbolArrays);
        // return this.arrOfCat?this.arrOfCat:this._mapIndexesToSymbolArrayNames(this.state.chosenSymbolArrays);
    }



    createSetOfCubes() {
        this.setOfCubes = new this.cubeCreator(this.setOfSymbols(), this.state.nrOfCubes, this.placeholder)
    }

    removeSetOfCubes() {
        
        this.setOfCubes.removeAllCubes();
    }

    recreateSetOfCubes() {
        try{
            this.removeSetOfCubes();
            delete this.setOfCubes;
        } catch (e){            
            NiceLogger.logError(this.constructor.name + ': Cubes cannot be removed from container');
        }
        try{
            this.createSetOfCubes()
        } catch (e) {
            NiceLogger.logError(`${this.constructor.name}: cubes cannot be created. Contact developer.`)
        }
    }

    createAboutModal() {
        // let content = [];
        // for(let i = 0; i < 1000; i++){
        //     content.push(`Lorem ipsum ${i}`)
        // }
        // new ModalGeneral(`<ul>${content.reduce((ac, element) => {return ac + '' + `<li>${element}</li>`})}</ul>`);
        new AboutModal();
    }
    onClose() {
        this.recreateSetOfCubes()
    }

    createSettingsModal() {
        let settingsManager = new SettingsManager(this.supportedSymbolArrayNames, this.supportedNrOfCubes, this.state)
        let sectionsOfSettingsMenu = [
            this._settingsExtentionsGroup(settingsManager.topicSymbolGroupHandler.bind(settingsManager)), 
            this._settingsNrOfCubesGroup(settingsManager.nrOfCubesChangeHandler.bind(settingsManager))
        ]
        new SettingsModal(sectionsOfSettingsMenu, this._mergeState.bind(this, settingsManager.onClose()), )
    }

    createRulesMenu() {
        let rulesMenu = new RulesModal(); // empty, works, there is some default value, error soudl not appear
    }

    _mergeState(newState){
        let areArraysEqual = function(arr1, arr2) {
            let nrOfEqualElements = 0;
            let len1 = arr1.length;
            if (len1 != arr2.length) {
                return false;
            } else {
                arr2.forEach((element, index) => {
                    if (arr1.includes(element)) {
                        nrOfEqualElements = nrOfEqualElements + 1;
                    }
                })
                if (arr1.length == nrOfEqualElements) return true;
                return false;
                // if (arr1.length != nrOfEqualElements) return false;
            }
            // if (nrOfEqualElements == len1) {return true} else {
            //     console.log(arr1)
            //     console.log(arr2)
            //     console.error('Arrays above are nuequarl. There is "0" and 0, so stinr and number')
            //     throw new Error(`${this.constructor.name}: there is something really wrong in _mergeState.areArraysEqual, because this error should be unreachable code`)
            // }
        }.bind(this)
        let areElementsEqualShalow = function(el1, el2) {
            if (Array.isArray(el1)) {
                return areArraysEqual(el1, el2)
            } else {
                return el1 == el2 ? true : false;
            }
        }.bind(this)
        let nrOfChangedKeys = 0;
        for (let key in this.state) {
            if (!areElementsEqualShalow(this.state[key], newState[key])){
                this.state[key] = newState[key]
                localStorage.setItem(key, newState[key])    
                nrOfChangedKeys++;
            }
        }
        if (nrOfChangedKeys > 0) this.recreateSetOfCubes()
    }

    _getInitialState(defaultState) {
        let isConversionToArrayNeeded = function(key) {
            let keysForConverion = ['chosenSymbolArrays']
            return (keysForConverion.includes(key)) ? true : false;
        }
        let convertStrToArrayOfStringsIfNeeded = function(key, value) {
            return isConversionToArrayNeeded(key) ? value.split(',') : value;
        }
        let arrayOfStrings2ArrayOfNums = function(arr){
            let arrCp = [];
            arr.forEach((element)=>{ arrCp.push(parseInt(element))})
            return arrCp;
        }
        let newState = {};
        for (let key in defaultState) {
            let newEntry = '';
            let fromLocalStorage = localStorage.getItem(key)
            if (fromLocalStorage == null || fromLocalStorage == undefined) {
                newState[key] = defaultState[key]
            } else {
                let value = convertStrToArrayOfStringsIfNeeded(key, localStorage.getItem(key));
                if (Array.isArray(value)){
                    newState[key] = arrayOfStrings2ArrayOfNums(value);
                } else{
                    newState[key] = parseInt(value)
                }
            }
        }
        return newState;
    }

    setOfSymbols() {
        let arr = [];
        for (let cat of this._arrOfCategories()) {
            arr = [...arr, ...this.symbolDB.getSymbolsByDN(cat)]
        }
        console.log(arr);
        return arr;
    }

    _settingsNrOfCubesGroup(changeHandler){
        let supportedNrOfCubesAsString = function(){        
            return this.supportedNrOfCubes.join(',')
        }.bind(this)
        return {
            groupName: 'Number of cubes',
            listOfSwitches: [{
                type: 'radioButtonGroup',
                label: '',
                handler: changeHandler.bind(this),
                defaultValue: this.state.nrOfCubes,
                options: supportedNrOfCubesAsString()
            }]
        }
    }

    _settingsExtentionsGroup(extentionsCHangeHandler){
        let providedExtentions = this.supportedSymbolArrayNames;
        let chosenSymbolArrays = this._mapIndexesToSymbolArrayNames(this.state.chosenSymbolArrays)
        let changeHandler = extentionsCHangeHandler
        let listOfSwitches = [];
        for (let extention of providedExtentions) {
            let newExtention = {};
            newExtention = {
                type: 'checkbox',
                label: extention,
                handler: changeHandler.bind(this),
                defaultValue: chosenSymbolArrays.includes(extention)?true:false
            }
            listOfSwitches.push(newExtention)
        }
        return {
            groupName: 'Extentions',
            listOfSwitches: listOfSwitches
        }
    }
}

class SettingsManager {
    constructor(supprotedNames, supportedNumbersOfCubes, currentState){
        this.supportedNames = [...supprotedNames]
        this.supportedNumbersOfCubes = [...supportedNumbersOfCubes]
        this.stateCopy = this._copyObject(currentState)
    }

    _copyObject(obj) {return JSON.parse(JSON.stringify(obj))}

    _getLabel(e) {return  e.target.dataset.label}

    _mapIndexesToSymbolArrayNames(arrayOfIndexes) {
        let mapFunction = function(current, index, arr) {
            return this.supportedNames[parseInt(current)]
        }.bind(this)
        let output = arrayOfIndexes.map(mapFunction)
        return output
    }

    _isLabelSupported(label) {
        return this.supportedNames.includes(label)?true:false
    }

    _mapTopicToIndex(label){
        return this.supportedNames.indexOf(label)
    }

    isLabelInLocalState(label) {
        let output = this._mapIndexesToSymbolArrayNames(this.stateCopy.chosenSymbolArrays).includes(label)?true:false;
        return this._mapIndexesToSymbolArrayNames(this.stateCopy.chosenSymbolArrays).includes(label)?true:false
    }
    removeLabelFromLocalState = function(label){
        let mappedTopicToIndex = this._mapTopicToIndex(label)
        this.stateCopy.chosenSymbolArrays.splice(this.stateCopy.chosenSymbolArrays.indexOf(this._mapTopicToIndex(label)), 1)
    }
    addLabelToLocalState(label) {
        let labelIndex = this.supportedNames.indexOf(label);
        this.stateCopy.chosenSymbolArrays.push(labelIndex);
    }

    topicSymbolGroupHandler(e){
        let label = e.target.dataset.label
        if (label != undefined) {
            if (this._isLabelSupported(label)){
                if (this.isLabelInLocalState(label)) {
                    this.removeLabelFromLocalState(label)
                } else {
                    this.addLabelToLocalState(label)
                }
            }
        }
    }

    nrOfCubesChangeHandler(e){
        try{
            let newNrOfCubes = parseInt(e.target.dataset.position);
            if (newNrOfCubes == NaN) throw new TypeError(`${this.constructor.name}: label passed from multiswitch parses to NaN: ${e.target.dataset.position}`)
            if (this.supportedNumbersOfCubes.includes(newNrOfCubes)) {
                this.stateCopy.nrOfCubes = newNrOfCubes
            } else {
                throw new TypeError(`${this.constructor.name}: nr of cubes in multiswitch is corrupted. There is no ${newNrOfCubes} value supported.`)
            }
        } catch(err) {
            NiceLogger.logError(err)
        }
    }

    onClose() {
        return this.stateCopy
    }


}
let manager = {}

window.addEventListener('DOMContentLoaded', (event) => {
    let manager = new CubeManager({
        placeholder: document.querySelector('.wrapper')
    })
});