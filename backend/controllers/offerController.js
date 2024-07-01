const express = require("express")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getAllOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany()
    res.json(offers)
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching offers" })
  }
}

const getOfferByCode = async (req, res) => {
  const { offerCode } = req.params
  const offer = await prisma.offer.findUnique({
    where: { code: offerCode },
  })

  if (!offer) {
    return res.status(404).json({ error: "Offer not found" })
  }

  res.json(offer)
}

const createOrder = async (req, res) => {
  const { offerCode } = req.params
  const {
    customerName,
    customerEmail,
    customerPhone,
    address,
    paymentMethod,
    cpf,
  } = req.body

  if (cpf === "000.000.000-00") {
    return res.status(400).json({ error: "Invalid CPF" })
  }

  const order = await prisma.order.create({
    data: {
      offerCode,
      customerName,
      customerEmail,
      customerPhone,
      address,
      paymentMethod,
      cpf,
    },
  })

  res.json(order)
}

module.exports = {
  getAllOffers,
  getOfferByCode,
  createOrder,
}
