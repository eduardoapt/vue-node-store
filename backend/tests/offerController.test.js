const request = require("supertest")
const app = require("../app")
const { PrismaClient } = require("@prisma/client")
const { seedOffers } = require("../seeds/offers")
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.order.deleteMany({})
  await prisma.offer.deleteMany({})
  await seedOffers()
}, 15000)

afterAll(async () => {
  await prisma.order.deleteMany({})
  await prisma.offer.deleteMany({})
  await seedOffers()
  await prisma.$disconnect()
})

describe("GET /offers", () => {
  it("should return all offers", async () => {
    const response = await request(app).get("/offers")

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(20)
  })
})

describe("GET /offers/:offerCode", () => {
  it("should return the specific offer", async () => {
    const response = await request(app).get("/offers/offer-1")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("code", "offer-1")
    expect(response.body).toHaveProperty("name", "Star Cruiser")
    expect(response.body).toHaveProperty("price", 29.99)
    expect(response.body).toHaveProperty("items")
    expect(response.body).toHaveProperty("paymentMethods", "Card,Pix")
    expect(response.body).toHaveProperty(
      "images",
      "https://via.placeholder.com/150/0000FF/808080?text=Star+Cruiser"
    )
  })

  it("should return 404 for non-existent offer", async () => {
    const response = await request(app).get("/offers/non-existent-offer")

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("error", "Offer not found")
  })
})

describe("POST /offers/:offerCode/create_order", () => {
  it("should create a new order with valid CPF", async () => {
    const response = await request(app)
      .post("/offers/offer-1/create_order")
      .send({
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "1234567890",
        address: "123 Space St, Mars",
        paymentMethod: "Card",
        cpf: "123.456.789-00",
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
  })

  it("should return an error for invalid CPF", async () => {
    const response = await request(app)
      .post("/offers/offer-1/create_order")
      .send({
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "1234567890",
        address: "123 Space St, Mars",
        paymentMethod: "Card",
        cpf: "000.000.000-00",
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error", "Invalid CPF")
  })
})
