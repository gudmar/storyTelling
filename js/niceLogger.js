class NiceLogger{
    static logInfo(message){
        console.log('%c' + message, "background-color: blue; color: white; font-weight: bold; padding: 5px; border-radius: 4px;")
    }
    static logError(message){
        console.log('%c' + message, "background-color: red; color: white; font-weight: bold; padding: 5px; border-radius: 4px;")
    }
    static logWarn(message) {
        console.log('%c' + message, "background-color: orange; color: black; font-weight: bold; padding: 5px; border-radius: 4px;")
    }
    static logOk(message) {
        console.log('%c' + message, "background-color: green; color: white; font-weight: bold; padding: 5px; border-radius: 4px;")
    }

    static logBlack(message) {
        console.log('%c' + message, "background-color: black; color: white; font-weight: bold; padding: 5px; border-radius: 4px;")
    }
    static logBlank(message) {
        console.log('%c' + message, "background-color: white; color: gray; font-weight: bold; padding: 5px; border-radius: 4px;")
    }

    
}