class AboutModal{
    constructor(){
        this.modal = new ModalGeneral(this._getContentAsString(), 'aboutModalId', 'body', ()=>{})
    }
    _getContentAsString(){
        return `
        <div class = "text-big">
            <p>
                My name is Marek Gudalewicz. I made this application as a training in web developement, and as a help to practice Table Topics before Toastmasters 
                meetings. Idea is to tell a story using as many randomly selected images as possible.
            </p>
            <p>
                There are some rules regarding story preparation and story last time. Of course it is difficult to invent a good story in 30s, so first attempts 
                might take longer.
            </p>
            <p>
                In menu one might find what extentions shell be used, and a number of dices. Numbers of cubes are predefined, so user might choose one third of cubes for
                opening, one third for plot, and one third for endint of the story.
            </p>
            </p>
                If menu is closed without any changed, dices will not be rolled again. In case of any change to application state, dices will be rolled again.
                Application state will be stored in <i>localStorage</i>, so number of cubes and extentions used can be remembered for a next game.</b>
            </p>
            <p>
                Images are selected randomly, but they will never repeat. Images are selected from one set, that is not realy divided into cubes or any subsets, 
                so in this game any combination of cubes can appear. This is different from traditional game, as in real cubes images on one dice will never appear next to 
                each other.
            </p>
            <p>Images may look different, depending of brawser used. Tested on Chrome and Opera.</p>
            <p>In near future more there will be more symbols and extentions added.</p>
        </div>
        `
        
    }
}