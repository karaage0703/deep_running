#!

const os = require("os")
const fs = require("fs")
const path = require("path")

const timerPromises = require('timers/promises');
const { mainModule } = require("process");



class CharaSprite{
    Escape = "\033"
    
    /**
     * 
     * @param {string} source 
     */
    constructor(source){
        this.buffer = source.split(os.EOL)
        this.width = Array.from(this.buffer[0]).length
        this.height = this.buffer.length
        this.source = source;
    }

    draw(depth=0){
        if(depth<=0){
            console.log(this.source)
            return
        }

        let buffer = []
        if(depth>0){
            for(var i=0;i<depth;++i){
                buffer.push(`${this.Escape}[2K`)
            }
        }
        buffer.push(...this.buffer.slice(0,this.height-depth))
        const image = buffer.join(os.EOL)
        console.log(image)
    }

    wipe(){
        console.log(`${this.Escape}[${this.height+1}A`)
    }

    cancelWipe(){
        console.log(`${this.Escape}[${this.height+1}B`)
    }
}

function loadString(...paths){
    return fs.readFileSync(path.join(...paths)).toString();
}

function loadImage(...paths){
    return new CharaSprite(loadString(...paths))
}

const stand000 = loadImage("sources","stand000")
const spin000 = loadImage("sources","spin000")
const spin001 = loadImage("sources","spin001")
const spin002 = loadImage("sources","spin002")
const spin003 = loadImage("sources","spin003")
const spin004 = loadImage("sources","spin004")

const spins = [
    spin000,
    spin001,
    spin002,
    spin003,
    spin004,
]

let finalAnime = stand000

const wait = 66

async function main(){
    stand000.draw();
    await timerPromises.setTimeout(wait)
    stand000.wipe()

    for(var i=0;i<17;++i){
        for(var j=0;j<spins.length;++j){
            const spin = spins[j]
            spin.draw(i)
            await timerPromises.setTimeout(wait)
            spin.wipe()
        }
    }
}

main().then(e=>{ 
    finalAnime.cancelWipe()
    process.exit(0) })