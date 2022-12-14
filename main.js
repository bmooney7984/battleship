function shipFactory(type) {
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

exports.shipFactory = shipFactory
