import DeliveryRegistration from "../models/DeliveryRegistration.js"; // Adjust the path as needed

// Create a new delivery registration
export const createDeliveryRegistration = async (req, res) => {
  try {
    const newRegistration = await DeliveryRegistration.create({
      ...req.body,
    });
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all delivery registrations
export const getAllDeliveryRegistrations = async (req, res) => {
  try {
    const registrations = await DeliveryRegistration.findAll();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific delivery registration by ID
export const getDeliveryRegistrationById = async (req, res) => {
  try {
    const registration = await DeliveryRegistration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a delivery registration by ID
export const updateDeliveryRegistration = async (req, res) => {
  try {
    const registration = await DeliveryRegistration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    await registration.update(req.body);
    res.status(200).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a delivery registration by ID
export const deleteDeliveryRegistration = async (req, res) => {
  try {
    const registration = await DeliveryRegistration.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    await registration.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
