var character

export const width = 160
export const height = 40

export default function Game({addSprite, renderGame}) {
    character = addSprite(0,20,1,1,"#")
    renderGame()
    return function({renderGame}) {
        character.x++;
        character.y = Math.floor(20+Math.sin(character.x) * 19)
        if(character.x >=width) {
            character.x = 0
        }
        renderGame()
    }
}