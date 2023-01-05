const shipList = (function() {
  const list = ["patrol boat", "submarine", "cruiser", "battleship", "carrier"]

  function typeToSize(type) {
    let size

    switch (type) {
      case "patrol boat":
        size = 2
        break
      case "submarine":
        size = 3
        break
      case "cruiser":
        size = 3
        break
      case "battleship":
        size = 4
        break
      case "carrier":
        size = 5
        break
    }

    return size
  }

  return {list, typeToSize}
})()

function shipFactory(type) {
  let size = shipList.typeToSize(type)

  let timesHit = 0

  function isSunk() {
    if (this.timesHit == this.size) {
      return true
    } else {
      return false
    }
  }

  function hit() {
    this.timesHit = this.timesHit + 1
  }

  return { type, size, timesHit, isSunk, hit }
}

function boardFactory() {
  const squaresShot = []

  const shipLocations = {}

  function locate(shipType, startSquare, orientation) {
    const size = shipList.typeToSize(shipType)
    let squares = []

    if (orientation == "horizontal") {
      for (let i = 1; i <= size; i++) {  // for ith square taken up by ship, add coordinates of that square to the list
        const columnNum = Number(startSquare.slice(1)) + (i - 1)
        const columnString = columnNum.toString()
        squares.push(startSquare[0] + columnString)
      }
    } else if (orientation == "vertical") {
      for (let i = 1; i <= size; i++) {  // for ith square taken up by ship, add coordinates of that square to the list
        const rowNum = startSquare[0].charCodeAt(0) + (i - 1)
        const rowString = String.fromCharCode(rowNum)
        squares.push(rowString + startSquare.slice(1))
      }
    }

    return squares
  }

  function outOfBounds(squares) {
    return squares.some(function(square) {
      return square.slice(1) < 1 || square.slice(1) > 10 || !['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(square[0])
    })
  }

  function overlap(squares) {
    return squares.some((square) => {
      const occupiedSquares = Object.values(this.shipLocations).flat()
      return occupiedSquares.some(function(occupiedSquare) {
        return square == occupiedSquare
      })
    })
  }

  function placeShip(shipType, startSquare, orientation) {
    const squares = locate(shipType, startSquare, orientation)

    if (outOfBounds(squares)) {
      throw "Ship doesn't fit in chosen location"
    }

    if (overlap.call(this, squares)) {
      throw "Two ships cannot occupy the same square"
    }

    this.shipLocations[shipType] = squares
  }

  function receiveShot(square) {
    this.squaresShot.push(square)

    for (let shipType in this.shipLocations) {
      if (this.shipLocations[shipType].includes(square)) {
        return shipType
      }
    }

    return null
  }

  function validShipPlacement(shipType, startSquare, orientation) {
    const squares = locate(shipType, startSquare, orientation)

    if (outOfBounds(squares)) {
      return false
    }

    if (overlap.call(this, squares)) {
      return false
    }

    return true
  }

  function listValidStarts(shipType, orientation) {
    const fullBoard = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
                       "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
                       "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
                       "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
                       "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
                       "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
                       "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
                       "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
                       "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
                       "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]

    return fullBoard.filter((square) => {
      return validShipPlacement.call(this, shipType, square, orientation)
    })
  }

  return { squaresShot, shipLocations, placeShip, receiveShot, listValidStarts }
}

function playerFactory(human, ships, board) {
  function takeHit(shipType) {
    const hitShip = this.ships.find(function(ship) {
      return ship.type == shipType
    })
    hitShip.hit()
  }

  function listValidShots(board) {
    const fullBoard = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
                       "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
                       "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
                       "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
                       "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
                       "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
                       "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
                       "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
                       "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
                       "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]

    return fullBoard.filter(function(square) {
      return !board.squaresShot.includes(square)
    })
  }

  function computerShoot(board) {
    const validShots = listValidShots(board)
    const rand = Math.floor(Math.random() * validShots.length)

    return validShots[rand]
  }

  function noShipsLeft() {
    return ships.every(function(ship) {
      return ship.isSunk()
    })
  }

  return { human, ships, board, takeHit, listValidShots, computerShoot, noShipsLeft }
}

const gui = function() {
  const orientation = "horizontal"

  function toggleOrientation() {}
  function clearElement(element) {
    while (element.firstChild) {
      element.firstChild.remove()
    }
  }

  let userResolve
  function userResolvable() {
    return new Promise((resolve, reject) => {
      userResolve = resolve
    })
  }

  function stylingSelector(shipSize, orientation) {
    let result = ".clickable:hover"

    for (let i = 2; i <= shipSize; i++) {  // for ith square to be occupied by ship, add selector for that square
      let addOn = ".clickable:hover"

      for (let j = 1; j <= i - 1; j++) {  // selector for ith square has i - 1 steps to the right/down from the square hovered on
        if (orientation == "horizontal") {
          addOn = addOn + " + .cell"  // add one step right to selector for ith square
        } else if (orientation == "vertical") {
          addOn = addOn + " + .cell + .cell + .cell + .cell + .cell + .cell + .cell + .cell + .cell + .cell" // add one step down to selector for ith square
        }
      }
      result = result + ", " + addOn
    }

    return result
  }

  async function promptForLocation(shipType, player) {  // Strategy here: To await click, can await resolution of promise and have that promise resolved by the click event, as here: https://stackoverflow.com/questions/65915371/how-do-i-make-the-program-wait-for-a-button-click-to-go-to-the-next-loop-iterati
    const side = player.human ? "left" : "right"

     // 1. Get list of valid starting squares for ship
    let validStarts = player.board.listValidStarts(shipType, this.orientation)

    // 2. Add styling on hover
    let cellList = []
    document.querySelectorAll(`#${side} .cell`).forEach(function(cell) {
      if (validStarts.includes(cell.textContent)) {
        cellList.push(cell)
      }
    })

    cellList.forEach(function(cell) {
      cell.setAttribute("class", "cell clickable")
    })

    const styles = document.createElement("style")
    let selector = stylingSelector(shipList.typeToSize(shipType), this.orientation)
    styles.textContent = selector + " {background-color: hsl(50, 100%, 60%)}"
    document.body.append(styles)

    // 3. Attach event listeners to valid starting squares
    const receiveInput = (event) => {
      userResolve([event.target.textContent, this.orientation])
    }

    cellList.forEach((cell) => {
      cell.addEventListener("click", receiveInput)
    })

    // 4. Enable orientation switching
    const button = document.querySelector("button")

    button.addEventListener("click", () => {
      // Update orientation
      if (this.orientation == "horizontal") {
        this.orientation = "vertical"
      } else if (this.orientation == "vertical") {
        this.orientation = "horizontal"
      }
      // Reverse and rerun steps 1-3 using new orientation
      cellList.forEach(function(cell) {
        cell.setAttribute("class", "cell")
      })

      cellList.forEach(function(cell) {
        cell.removeEventListener("click", receiveInput)
      })

      validStarts = player.board.listValidStarts(shipType, this.orientation)

      cellList = []

      document.querySelectorAll(`#${side} .cell`).forEach(function(cell) {
        if (validStarts.includes(cell.textContent)) {
          cellList.push(cell)
        }
      })

      cellList.forEach(function(cell) {
        cell.setAttribute("class", "cell clickable")
      })

      selector = stylingSelector(shipList.typeToSize(shipType), this.orientation)
      styles.textContent = selector + " {background-color: hsl(50, 100%, 60%)}"

      cellList.forEach((cell) => {
        cell.addEventListener("click", receiveInput)
      })
    })

    const input = await userResolvable()

    // 5. Remove hover styling and event listeners after user clicks to provide input
    cellList.forEach(function(cell) {
      cell.setAttribute("class", "cell")
    })

    styles.remove()

    cellList.forEach(function(cell) { //
      cell.removeEventListener("click", receiveInput)
    })

    return input
  }

  function displayShip(player, shipType) {
    const side = player.human ? "left" : "right"

    const squares = player.board.shipLocations[shipType]

    let cellList = []

    document.querySelectorAll(`#${side} .cell`).forEach(function(cell) {
      if (squares.includes(cell.textContent)) {
        cellList.push(cell)
      }
    })

    cellList.forEach(function(cell) {
      cell.setAttribute("class", "cell occupied")
    })
  }

  async function promptForShot(player) {
    const opponent = (player == playerOne ? playerTwo : playerOne)

    function receiveInput(event) {
        userResolve(event.target.textContent)
    }

    let cellList = []

    if (player.human) {
      const validShots = player.listValidShots(opponent.board)

      document.querySelectorAll(`#right .cell`).forEach(function(cell) {
        if (validShots.includes(cell.textContent)) {
          cellList.push(cell)
        }
      })

      cellList.forEach(function(cell) {
        cell.addEventListener("click", receiveInput)
      })
    } else {
      const button = document.createElement("button")
      button.textContent = "Next"
      const bottom = document.querySelector("#bottom")
      bottom.append(button)

      button.addEventListener("click", function() {
        const shot = player.computerShoot(opponent.board)
        userResolve(shot)
      })
    }

    const input = await userResolvable()

    cellList.forEach(function(cell) {
      cell.removeEventListener("click", receiveInput)
    })

    return input
  }

  return { orientation, toggleOrientation, clearElement, promptForLocation, displayShip, promptForShot}
}()

const playerOne = playerFactory(true,
                                [shipFactory("patrol boat"),
                                 shipFactory("submarine"),
                                 shipFactory("cruiser"),
                                 shipFactory("battleship"),
                                 shipFactory("carrier")],
                                 boardFactory())
const playerTwo = playerFactory(false,
                               [shipFactory("patrol boat"),
                                shipFactory("submarine"),
                                shipFactory("cruiser"),
                                shipFactory("battleship"),
                                shipFactory("carrier")],
                                boardFactory())

async function placeShips() {  // Strategy here: To go through the list of ships placing each, can use await to stop execution inside a loop, as here: https://stackoverflow.com/questions/11488014/asynchronous-process-inside-a-javascript-for-loop
  for (const ship of shipList.list) {  // place human player's ships
    const instructions = document.createElement("h1")  // place instructions and orientation toggle
    instructions.textContent = `Place your ${ship}`
    const toggle = document.createElement("button")
    toggle.textContent = "Toggle horizontal/vertical"
    bottom.append(instructions)
    bottom.append(toggle)

    const input = await gui.promptForLocation(ship, playerOne)

    const startSquare = input[0]
    const orientation = input[1]
    playerOne.board.placeShip(ship, startSquare, orientation)
    gui.displayShip(playerOne, ship)

    gui.clearElement(bottom)
  }

  for (const ship of shipList.list) {  // place computer player's ships
    const randO = Math.floor((Math.random() * 2))
    let orientation
    if (randO == 0) {
      orientation = "horizontal"
    } else if (randO == 1) {
      orientation = "vertical"
    }

    const validStarts = playerTwo.board.listValidStarts(ship, orientation)
    const randS = Math.floor((Math.random() * validStarts.length))
    const startSquare = validStarts[randS]

    playerTwo.board.placeShip(ship, startSquare, orientation)
  }
}

async function makeShots() {
  currentPlayer = playerOne

  while ((!playerOne.noShipsLeft() && !playerTwo.noShipsLeft()) || playerOne.board.squaresShot.length != playerTwo.board.squaresShot.length) {
    const bottom = document.querySelector("#bottom")
    const prompt = document.createElement("h1")
    if (currentPlayer.human) {
      prompt.textContent = "Take your shot"
    } else {
      prompt.textContent = "Click 'next' to let computer shoot"
    }
    bottom.append(prompt)

    const shot = await gui.promptForShot(currentPlayer)

    gui.clearElement(bottom)

    const lastShotMessage = document.createElement("h1")

    let opponent
    let opponentSide
    if (currentPlayer == playerOne) {
      opponent = playerTwo
      opponentSide = "right"
    } else if (currentPlayer == playerTwo) {
      opponent = playerOne
      opponentSide = "left"
    }

    const cells = Array.from(document.querySelectorAll(`#${opponentSide} .cell`))
    const shotCell = cells.find(function(cell) {
      return cell.textContent == shot
    })

    const hitShipType = opponent.board.receiveShot(shot)

    if (hitShipType) {
      shotCell.setAttribute("style", "background-color: hsl(0, 100%, 40%)")

      const hitShip = opponent.ships.find(function(ship) {
        return ship.type == hitShipType
      })

      hitShip.hit()

      if (hitShip.isSunk()) {
        lastShotMessage.textContent = `Hit! The ${hitShipType} was sunk!`
      } else {
        lastShotMessage.textContent = "Hit!"
      }
    } else {
      shotCell.setAttribute("style", "background-color: hsl(240, 100%, 40%)")

      lastShotMessage.textContent = "Miss!"
    }

    bottom.append(lastShotMessage)

    currentPlayer = (currentPlayer == playerOne ? playerTwo : playerOne)
  }
}

placeShips().then(function(result) {
  makeShots().then(function(result) {
    const bottom = document.querySelector("#bottom")
    const victoryMessage = document.createElement("h1")

    if (playerOne.noShipsLeft() && playerTwo.noShipsLeft()) {
      victoryMessage.textContent = "It's a draw! All ships sunk."
    } else if (playerOne.noShipsLeft()) {
      victoryMessage.textContent = "Computer wins!"
    } else if (playerTwo.noShipsLeft()) {
      victoryMessage.textContent = "You win!"
    }

    bottom.append(victoryMessage)
  })
})

// Exports is used by for exporting to the test file. It's unnecessary in the browser. This snippet prevent exports from throwing a reference error in the browser
if (typeof exports == "undefined") {
  var exports = {}
}

exports.shipFactory = shipFactory
exports.boardFactory = boardFactory
exports.playerFactory = playerFactory
