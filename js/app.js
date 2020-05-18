;(function() {
     let deb = document.querySelector(`.logo-txt`).addEventListener(`click`, debug)
     let x = document.querySelector(`.usr-el-c`)
     let y = document.querySelector(`.ai-el-c`)
     let winnerTxt = document.querySelector(`.loss-sec`)
     let hiddenBlock = document.querySelector(`.win-container-hid`)
     let retryBtn = document.querySelector(`.retry`)
     retryBtn.addEventListener(`click`, retry)
     function debug() {
          debugger
     }

     class Player {
          consturctor(weapon) {
               this.weapon = weapon
               this.turn = turn
          }
          move() {

          }
     }

     class Controller {
          random() {
               return Math.random()
          }
          ai() {
               let k = Math.floor(this.random() * 8)
               return k
          }
          turn() {
               if (this.random() > 0.5) {
                    x.classList.add(`active`)
                    user.turn = true
                    ai.turn = false
               } else {
                    y.classList.add(`active`)
                    user.turn = false
                    ai.turn = true
               }
          }
          weapon() {
               if (this.random() > 0.5) {
                    user.weapon = circle
                    ai.weapon = cross
               } else {
                    user.weapon = cross
                    ai.weapon = circle
               }
          }
          switcher() {
               if (user.turn) {
                    user.turn = false
                    ai.turn = true
                    y.classList.add(`active`)
                    x.classList.remove(`active`)
               } else  if (ai.turn) {
                    user.turn = true
                    ai.turn = false
                    x.classList.add(`active`)
                    y.classList.remove(`active`)
               }
          }
          render() {
               if (user.weapon === `circle`) {
                    x.textContent = `PLAYER 1: O`
                    y.textContent = `PLAYER 2: X`
               } else {
                    x.textContent = `PLAYER 1: X`
                    y.textContent = `PLAYER 2: O`
               }
          }
     }

     class Verifier {
          indexes() {
               crosses = gameBoard.multiIndexOf(`cross`)
               circles = gameBoard.multiIndexOf(`circle`)
          }
          checker = (arr, target) => target.every(v => arr.includes(v))
          winner(el) {
               if  (el.length > 4){
                    return
               } else if  (el.length > 2) {
                    for  (let i = 0; i < winCombos.length; i++){
                         if (this.checker(el, winCombos[i]) === true){
                         winner = `Player 1` 
                         renderWinner()
                         break
                         }
                    }
               }
          }
     }

     let gameBoard = []
     let winCombos = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [6, 4, 2]
     ]

     let winner
     let init = new Controller
     let check = new Verifier
     let aiC = new Verifier
     let crosses
     let circles
     let compareArr = []
     let gameElem = document.querySelectorAll(`.game-element`)
     let filled = 0
     const circle = `circle`
     const cross = `cross`
     let user = new Player
     let ai = new Player
     init.ai()
     init.turn()
     init.weapon()
     init.render()
     renderTurn()
     log()


     aiC.winner = function(el) {
               if  (el.length > 4){
                    alert("It's a tie")
               } else if  (el.length > 2) {
                    console.log(`length is more than 2, start checking`)
                    for  (let i = 0; i < winCombos.length; i++){
                         console.log(winCombos[i])
                         if (this.checker(el, winCombos[i]) === true){
                         console.log(`AI won`)
                         winner = `Player 2`
                         renderWinner()
                         break
                         }
                    }
               }
     }

     function renderWinner() {
          if (typeof winner !== `undefined`) {
               hiddenBlock.style.display = `block`
               winnerTxt.textContent = winner
          }
     }



     function retry() {
          winner = undefined
          x.classList.remove(`active`)
          y.classList.remove(`active`)
          init.ai()
          init.turn()
          init.weapon()
          init.render()
          filled = 0
          gameElem.forEach(elem => {
               elem.classList.remove(`circle`)
               elem.classList.remove(`cross`)
               elem.classList.remove(`user-el`)
               elem.classList.remove(`ai-el`)
          })
          gameBoard = []
          crosses = []
          circles = []
          hiddenBlock.style.display = `none`
     }

     gameElem.forEach(elem => {
          elem.addEventListener(`click`, (e) => {
                    if (user.turn && filled < 9 && typeof gameBoard[e.target.id] === `undefined`) {
                         user.move(elem, e)
                    }
                    else if (ai.turn && filled < 9 && typeof gameBoard[e.target.id] === `undefined`) {
                         ai.move(elem, e)
               }     
          })
     })

     user.move = function(elem, e) {
          gameBoard[e.target.id] = user.weapon
          check.indexes()
          setImg(elem, user.weapon)
          ;(function() {
               elem.classList.add(`user-el`)
          })();
          if (user.weapon === `circle`) {
               el = circles
          } else {
               el = crosses
          }
          round(el)
          check.winner(el)
     }

     ai.move = function(elem, e) {
          gameBoard[e.target.id] = ai.weapon
          check.indexes()
          if (ai.weapon === `circle`) {
               oel = circles
          } else {
               oel = crosses
          }
          round()
          setImg(elem, ai.weapon)
          ;(function() {
               elem.classList.add(`ai-el`)
          })();
          aiC.winner(oel)
     }

     function round() {
          filled +=1
          init.switcher()
     }

     function setImg(elem, weapon) {
               elem.classList.add(`${weapon}`)
     }

     function log() {
          console.log(`User: ${user.weapon}, AI: ${ai.weapon}`)
     }

     function renderTurn() {
          if (user.turn) {
               x.classList.add(`active`)
               y.classList.remove(`active`)
          } else {
               x.classList.remove(`active`)
               y.classList.add(`active`)
          }
     }
     Array.prototype.multiIndexOf = function (el) { 
          let idxs = [];
          for (let i = this.length - 1; i >= 0; i--) {
          if (this[i] === el) {
               idxs.unshift(i);
          }
          }
          return idxs;
     };
})();  
