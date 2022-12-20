const shipList = (function() {
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

  return {typeToSize}
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
  }

  return { squaresShot, shipLocations, placeShip, receiveShot }
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

exports.shipFactory = shipFactory
exports.boardFactory = boardFactory
exports.playerFactory = playerFactory
