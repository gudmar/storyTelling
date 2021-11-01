class CubeSet{
    constructor(arrayOfSymbols, nrOfCubes, cubePlaceholder){
        // try{
            this.nrOfCubes = 0;
            this.arrayOfSymbols = this._setInternalProps(arrayOfSymbols, "Array of all symbols that could be displayed in cubes not passed")
            this.nrOfCubes = this._setInternalProps(parseInt(nrOfCubes), "Nr of cubes not passed")
            this.cubePlaceholder = this._setInternalProps(cubePlaceholder, "Placeholder for cubes not passed")
            this.drawingIterator = new DrawingIterator(this.arrayOfSymbols);

            this.currentArray = [];
            this.cubeCreator = Cube;

            this.setOfCubes = this._makeCubes();
            this._placeCubes();
            this.replaceAllCubeSymbols();
            this._createOnclickSymbolSwapForEachCube();

    }



    replaceAllCubeSymbols() {
        for (let cube of this.setOfCubes) {
            this._replaceCubeSymbol(cube)
        }
    }



    removeAllCubes(){
        for (let cube of this.setOfCubes) {
            cube.getCube().parentNode.removeChild(cube.getCube())
        }
    }



    _setInternalProps(propPassedToConstructor, errorMessage) {
        if (propPassedToConstructor != undefined) {
            return propPassedToConstructor
        } else {
            throw new TypeError(`${this.constructor.name}: ${errorMessage}`)
        }
    }



    _makeCubes(){
        let cubes = [];
        for(let i = 0; i<this.nrOfCubes; i++) {
            let cube = new this.cubeCreator()
            cubes.push(cube)
        }
        return cubes
    }



    _placeCubes(){
        for(let cube of this.setOfCubes) {
            this.cubePlaceholder.appendChild(cube.getCube())
        }
    }



    _createOnclickSymbolSwapForEachCube() {
        for (let cube of this.setOfCubes) {
            let cb = this._replaceCubeSymbol.bind(this, cube)
            cube.getCube().addEventListener('click', cb)
        }
    }

    _getSymbolsToRemove(){
        let arr = [];
        for (let item of this.setOfCubes){
            arr.push(item.getSymbol())
        }
        return arr
    }


    _replaceCubeSymbol(cube) {
        try{
            cube.setContent(this.drawingIterator.drawSymbols(1, this._getSymbolsToRemove()));
        } catch(e) {
            console.log(e)
            NiceLogger.logInfo(`${this.constructor.name}: symbols cannot be injected into cubes. Looks like no array of symbols passed.`)
        }
    }

}



class DrawingIterator {
    constructor(arrayOfSymbols){
        // try{
            this.arrayOfSymbols = this._setInternalProps(arrayOfSymbols, "Array of symbols not passed. Cannot continue")
            this.runtimeArrayOfSymbols = this.arrayOfSymbols.slice(0, this.arrayOfSymbols.length)
            this.symbolsToRemove = [];
            this.drawingIteratorInstance = this._drawingIterator();
        // } catch (error) {

        // }
    }


    _setInternalProps(propPassedToConstructor, errorMessage) {
        if (propPassedToConstructor != undefined) {
            return propPassedToConstructor
        } else {
            throw new TypeError(`${this.constructor.name}: ${errorMessage}`)
        }
    }


    _randomIndex(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    printSymbolsToRemove(){
        for (let i of this.symbolsToRemove) {
        }
    }

    _getNewSymbolArray(){
        let arr = [...this.arrayOfSymbols]
        let removed = []
        this.printSymbolsToRemove();
        return arr
    }


    areHTMLSymbolsEqual(a, b){
        let elementA = document.createElement('div')
        let elementB = document.createElement('div')
        elementA.innerHTML = a;
        elementB.innerHTML = b;
        if (elementA.innerHTML == elementB.innerHTML) {
            return true
        } else {
            return false
        }
    }

    _doesArrayContain(arrayToCheck, element) {
        for(let item of arrayToCheck) {
            if (this.areHTMLSymbolsEqual(element, item)) {
                return true
            }
        }
        return false
    }

    _getUniqueSymbol(symbolsAlreadyTaken) {
        let nextSymbol = this.drawingIteratorInstance.next().value;
        if (symbolsAlreadyTaken.length >= this.arrayOfSymbols.length) {
            throw new ReferenceError(`${this.constructor.name}: symbolsAlreadyTeaken.length >= arrayOfSymbols.lenght. No possibility to draw a unique symbol`)
        } else if(this._doesArrayContain(symbolsAlreadyTaken, nextSymbol)) {
            return this._getUniqueSymbol(symbolsAlreadyTaken)
        } else {
            return nextSymbol
        }

    }

    _drawingIterator() {
        this.runtimeArrayOfSymbols = this._getNewSymbolArray()
        return {
            next: function (){
                if (this.runtimeArrayOfSymbols.length == 0) {
                    this.runtimeArrayOfSymbols = this._getNewSymbolArray()
                }
                let rand = this._randomIndex(this.runtimeArrayOfSymbols.length);
                let randElement = this.runtimeArrayOfSymbols[rand];
                this.runtimeArrayOfSymbols.splice(rand, 1);
                return {
                    value: randElement,
                    done: this.runtimeArrayOfSymbols.length>0?false:true
                }
            }.bind(this)
        }    
    }


    drawSymbols(x, symbolsToRemove){
        this.printSymbolsToRemove();
        let randomSymbols = []
        for (let i = 0; i<x; i++) {
            randomSymbols.push(this._getUniqueSymbol(symbolsToRemove))
        }
        return randomSymbols;
    }
}

    