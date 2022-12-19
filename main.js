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

function boardFactory(player) {
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
        const hitShip = player.ships.find(function(ship) {
          return ship.type == shipType
        })
        hitShip.hit()
      }
    }
  }

  return { squaresShot, shipLocations, placeShip, receiveShot }
}

exports.shipFactory = shipFactory
exports.boardFactory = boardFactory
