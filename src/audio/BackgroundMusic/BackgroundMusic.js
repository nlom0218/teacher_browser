import anewbeginning from "./anewbeginning.mp3"
import happiness from "./happiness.mp3"
import instinct from "./instinct.mp3"
import littleidea from "./littleidea.mp3"
import sunny from "./sunny.mp3"
import theelevatorbossanova from "./theelevatorbossanova.mp3"
import thejazzpiano from "./thejazzpiano.mp3"
import ukulele from "./ukulele.mp3"

export const backgroundMusicArr = [
  { name: "A new beginning", audio: anewbeginning },
  { name: "Happiness", audio: happiness },
  { name: "Instinct", audio: instinct },
  { name: "Little idea", audio: littleidea },
  { name: "Sunny", audio: sunny },
  { name: "The elevator bossanova", audio: theelevatorbossanova },
  { name: "The jazz piano", audio: thejazzpiano },
  { name: "Ukulele", audio: ukulele },
]

export const playMusicFn = (music, setPlayMusic) => {
  music.play()
  setPlayMusic(true)
}

export const stopMusicFn = (music, setPlayMusic) => {
  music.pause()
  music.currentTime = 0
  setPlayMusic(false)
}