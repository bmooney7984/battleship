const main = require("./main.js")

describe("ship attributes initialized", () => {
  test("ship type set", () => {
    const boat = main.shipFactory("patrol boat")
    expect(boat.type).toBe("patrol boat")
  })

  test("ship size set", () => {
    const boat = main.shipFactory("patrol boat")
    expect(boat.size).toBe(2)
  })

  test("ship timesHit set", () => {
    const boat = main.shipFactory("patrol boat")
    expect(boat.timesHit).toBe(0)
  })
})

describe("ship methods", () => {
  test("hit increments timesHit", () => {
    const boat = main.shipFactory("patrol boat")
    expect(boat.timesHit).toBe(0)
    boat.hit()
    expect(boat.timesHit).toBe(1)
    boat.hit()
    expect(boat.timesHit).toBe(2)
  })

  test("isSunk returns false before hits equal length", () => {
    const sub = main.shipFactory("submarine")
    expect(sub.isSunk()).toBe(false)
    sub.hit()
    expect(sub.isSunk()).toBe(false)
  })

  test("isSunk returns true when hits equal length", () => {
    const sub = main.shipFactory("submarine")
    sub.hit()
    sub.hit()
    sub.hit()
    expect(sub.isSunk()).toBe(true)
  })
})

describe("board attributes initialized", () => {
  test("squaresShot set to empty array", () => {
    const board = main.boardFactory({})
    expect(board.squaresShot).toStrictEqual([])
  })

  test("shipLocations set to empty object", () => {
    const board = main.boardFactory({})
    expect(board.shipLocations).toStrictEqual({})
  })
})

describe("board methods", () => {
  test("placeShip places horizontal ship", () => {
    const board = main.boardFactory({})
    board.placeShip("cruiser", "C3", "horizontal")
    expect(board.shipLocations).toStrictEqual({cruiser: ["C3", "C4", "C5"]})
  })

  test("placeShip places vertical ship", () => {
    const board = main.boardFactory({})
    board.placeShip("cruiser", "B5", "vertical")
    expect(board.shipLocations).toStrictEqual({cruiser: ["B5", "C5", "D5"]})
  })

  test("placeShip throws error when ship runs off board horizontally", () => {
    const board = main.boardFactory({})
    expect(() => board.placeShip("cruiser", "A10", "horizontal")).toThrow("Ship doesn't fit in chosen location")
  })

  test("placeShip throws error when ship runs off board vertically", () => {
    const board = main.boardFactory({})
    expect(() => board.placeShip("cruiser", "J1", "vertical")).toThrow("Ship doesn't fit in chosen location")
  })

  test("placeShip throws error when two ships placed in same square", () => {
    const board = main.boardFactory({})
    board.placeShip("cruiser", "D2", "horizontal")
    expect(() => board.placeShip("patrol boat", "C4", "vertical")).toThrow("Two ships cannot occupy the same square")
  })

  test("receiveShot records shot", () => {
    const board = main.boardFactory({})
    board.receiveShot("B5")
    expect(board.squaresShot).toStrictEqual(["B5"])
  })

  test("receiveShot sends message to hit ship", () => {
    const mockHit = jest.fn()
    const mockPlayer = {ships: [{type: "patrol boat", hit: mockHit}]}
    const board = main.boardFactory(mockPlayer)
    board.shipLocations = {"patrol boat": ["C5", "C6"]}

    board.receiveShot("C6")
    expect(mockHit).toHaveBeenCalled()
  })
})
