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
