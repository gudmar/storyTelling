

// https://www.w3schools.com/charsets/ref_emoji.asp

class Symbols{
    static _object2Array(obj){
        return Object.values(obj);
    }
    static getSymbolsByDN(dn) {
        switch (dn) {
            case 'general':
                return Symbols.general();
            case 'activities':
                return Symbols.activities();
            case 'journeys':
                return Symbols.journeys();
            default:
                throw TypeError(`${this.constructor.name}: no distinguised name: ${dn}`)
        }
    }

    static getSupportedSymbolArrayNames(){
        return ['general', 'activities', 'journeys']
    }

    static general() {
        let symbols = {
            umbrela: '&#9730;',
            star: '&#9733;',
            phone: '&#9742;',
            radioactive: '&#9762;',
            sad: '&#9785;',
            happy: '&#9786;',
            music: '&#9835;',
            whealchair: '&#9855;',
            die: '&#127922;',
            mountain: '&#9968;',
            fuel: '&#9981;',
            plane: '&#9992;',
            letter: '&#9993;',
            pencil: '&#9998;',
            question: '&#10067;',
            time: '&#8987;',
            city: '&#127747;',
            earth: '&#127757;',
            moon: '&#127769;',
            fallingStar: '&#127776;',
            tempest: '&#127785;',
            meal: '&#127860;'

        }
        return Symbols._object2Array(symbols);
    }
    static journeys() {
        let symbols = {
            anchor: '&#9875;',
            justice: '&#9878;',
            boat: '&#9972;',
            tent: '&#9978;',
            cactus: '&#127797;',
            beach: '&#127958;'

        }
        return Symbols._object2Array(symbols);
        }
    static activities() {
        let symbols = {
            ball: '&#9917;',
            ski: '&#9975;',
            iceSkate: '&#9976;',
            sprint: '&#127939;',
            horse: '&#127943;',
            meta: '&#127937;',
            motor: '&#127949;',
            golf: '&#127953;',
            tenis: '&#127955;'
        }
        return Symbols._object2Array(symbols);
    }
    static other() {
        symbols = {
            atom: '&#9883;',
            church: '&#9962;',
            hotDog: '&#127789;',
            flower: '&#127799;',
            mushroom: '&#127812;',
            pizza: '&#127829;',
            movie: '&#127916;',
            painting: '&#127912;',
            hat: '&#127913;',
            circus: '&#127914;',
            commet: '&#9732;',
            snowman: '&#9731;',
            coffee: '&#9749;',
            skull: '&#9760;',
            sierpIMlot: '&#9773;'
        }
    }
}