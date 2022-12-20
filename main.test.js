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

  test("receiveShot returns name of hit ship", () => {
    const board = main.boardFactory()
    board.shipLocations = {"patrol boat": ["C5", "C6"]}
    expect(board.receiveShot("C6")).toStrictEqual("patrol boat")
  })
})


describe("player attributes", () => {
  test("human set to Boolean value passed in", () => {
    const player = main.playerFactory(true, [], {})
    expect(player.human).toBe(true)
  })

  test("ships set to array passed in", () => {
    const mockShipOne = {mock: "one"}
    const mockShipTwo = {mock: "two"}
    const player = main.playerFactory(true, [mockShipOne, mockShipTwo], {})

    expect(player.ships).toStrictEqual([mockShipOne, mockShipTwo])
  })

  test("board set to object passed in", () => {
    const mockBoard = {mock: "mock"}
    const player = main.playerFactory(true, [], mockBoard)

    expect(player.board).toStrictEqual(mockBoard)
  })
})

describe("player methods", () => {
  test("listValidShots filters out squares already shot", () => {
    const mockBoard = {squaresShot: ["A1", "B2", "C3", "D5", "E4"]}
    const player = main.playerFactory(true, [], {})
    expect(player.listValidShots(mockBoard)).toStrictEqual(["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
                                                               "B1", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
                                                               "C1", "C2", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
                                                               "D1", "D2", "D3", "D4", "D6", "D7", "D8", "D9", "D10",
                                                               "E1", "E2", "E3", "E5", "E6", "E7", "E8", "E9", "E10",
                                                               "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
                                                               "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
                                                               "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
                                                               "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
                                                               "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"])
  })

  test("computerShoot returns valid shot", () => {
    const mockBoard = {squaresShot: ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
                                     "B1", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
                                     "C1", "C2", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
                                     "D1", "D2", "D3", "D4", "D6", "D7", "D8", "D9", "D10",
                                     "E1", "E2", "E3", "E5", "E6", "E7", "E8", "E9", "E10",
                                     "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
                                     "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
                                     "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
                                     "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
                                     "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]}
    const player = main.playerFactory(false, [], {})
    expect(["A1", "B2", "C3", "D5", "E4"]).toContain(player.computerShoot(mockBoard))
  })

  test("noShipsLeft returns true when all ships have been sunk", () => {
    const mockIsSunk = jest.fn()
    mockIsSunk.mockReturnValue(true)
    const mockShips = [{isSunk: mockIsSunk}, {isSunk: mockIsSunk}, {isSunk: mockIsSunk}, {isSunk: mockIsSunk}, {isSunk: mockIsSunk}]
    const player = main.playerFactory(true, mockShips, {})

    expect(player.noShipsLeft()).toBe(true)
  })

  test("noShipsLeft returns false when not all ships have been sunk", () => {
    const mockSunk = jest.fn()
    const mockNotSunk = jest.fn()
    mockSunk.mockReturnValue(true)
    mockNotSunk.mockReturnValue(false)
    const mockShips = [{isSunk: mockNotSunk}, {isSunk: mockSunk}, {isSunk: mockSunk}, {isSunk: mockSunk}, {isSunk: mockSunk}]
    const player = main.playerFactory(true, mockShips, {})

    expect(player.noShipsLeft()).toBe(false)
  })

  test("takeHit sends message to hit ship", () => {
    const mockHit = jest.fn()
    const mockShips = [{type: "patrol boat", hit: mockHit}]
    const player = main.playerFactory(true, mockShips, {})

    player.takeHit("patrol boat")
    expect(mockHit).toHaveBeenCalled()
  })
})
