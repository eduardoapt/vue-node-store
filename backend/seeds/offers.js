const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seedOffers() {
  //will reset the DB
  await prisma.offer.deleteMany()
  await prisma.order.deleteMany()
  const offers = [
    {
      code: "offer-1",
      name: "Star Cruiser",
      price: 29.99,
      items:
        '["Star Cruiser","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Pix",
      images: "https://via.placeholder.com/150/0000FF/808080?text=Star+Cruiser",
    },
    {
      code: "offer-2",
      name: "Galaxy Explorer",
      price: 49.99,
      items:
        '["Galaxy Explorer","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FF0000/FFFFFF?text=Galaxy+Explorer",
    },
    {
      code: "offer-3",
      name: "Lunar Rover",
      price: 34.99,
      items:
        '["Lunar Rover","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images: "https://via.placeholder.com/150/00FF00/000000?text=Lunar+Rover",
    },
    {
      code: "offer-4",
      name: "Space Shuttle",
      price: 59.99,
      items:
        '["Space Shuttle","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FFFF00/000000?text=Space+Shuttle",
    },
    {
      code: "offer-5",
      name: "Alien Invasion Set",
      price: 19.99,
      items:
        '["Alien Invasion Set","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FF00FF/FFFF00?text=Alien+Invasion+Set",
    },
    {
      code: "offer-6",
      name: "Rocket Launcher",
      price: 39.99,
      items:
        '["Rocket Launcher","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Pix",
      images:
        "https://via.placeholder.com/150/00FFFF/000000?text=Rocket+Launcher",
    },
    {
      code: "offer-7",
      name: "Mars Rover",
      price: 44.99,
      items:
        '["Mars Rover","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images: "https://via.placeholder.com/150/FFA500/FF4500?text=Mars+Rover",
    },
    {
      code: "offer-8",
      name: "Space Probe",
      price: 24.99,
      items:
        '["Space Probe","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images: "https://via.placeholder.com/150/008000/FFFFFF?text=Space+Probe",
    },
    {
      code: "offer-9",
      name: "Astronaut Action Figure",
      price: 14.99,
      items:
        '["Astronaut Action Figure","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/800080/FFFFFF?text=Astronaut+Figure",
    },
    {
      code: "offer-10",
      name: "Space Station",
      price: 99.99,
      items:
        '["Space Station","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FFC0CB/800080?text=Space+Station",
    },
    {
      code: "offer-11",
      name: "Nebula Drone",
      price: 49.99,
      items:
        '["Nebula Drone","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Pix",
      images: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Nebula+Drone",
    },
    {
      code: "offer-12",
      name: "Comet Launcher",
      price: 34.99,
      items:
        '["Comet Launcher","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FF0000/000000?text=Comet+Launcher",
    },
    {
      code: "offer-13",
      name: "Meteor Blaster",
      price: 24.99,
      items:
        '["Meteor Blaster","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/00FF00/008000?text=Meteor+Blaster",
    },
    {
      code: "offer-14",
      name: "Asteroid Base",
      price: 69.99,
      items:
        '["Asteroid Base","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FFFF00/008000?text=Asteroid+Base",
    },
    {
      code: "offer-15",
      name: "Stellar Satellite",
      price: 39.99,
      items:
        '["Stellar Satellite","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FF00FF/000000?text=Stellar+Satellite",
    },
    {
      code: "offer-16",
      name: "Cosmic Cruiser",
      price: 29.99,
      items:
        '["Cosmic Cruiser","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Pix",
      images:
        "https://via.placeholder.com/150/00FFFF/FFFFFF?text=Cosmic+Cruiser",
    },
    {
      code: "offer-17",
      name: "Galaxy Guardian",
      price: 59.99,
      items:
        '["Galaxy Guardian","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FFA500/FFFFFF?text=Galaxy+Guardian",
    },
    {
      code: "offer-18",
      name: "Star Fighter",
      price: 45.99,
      items:
        '["Star Fighter","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images: "https://via.placeholder.com/150/008000/0000FF?text=Star+Fighter",
    },
    {
      code: "offer-19",
      name: "Planetary Patrol",
      price: 55.99,
      items:
        '["Planetary Patrol","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/800080/FFFF00?text=Planetary+Patrol",
    },
    {
      code: "offer-20",
      name: "Orbit Defender",
      price: 49.99,
      items:
        '["Orbit Defender","Miniatura do Herói","Poster Colecionável","Item Surpresa!"]',
      paymentMethods: "Card,Boleto,Pix",
      images:
        "https://via.placeholder.com/150/FFC0CB/000000?text=Orbit+Defender",
    },
  ]

  for (const offer of offers) {
    await prisma.offer.create({ data: offer })
  }
}

seedOffers()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

module.exports = {
  seedOffers,
}
