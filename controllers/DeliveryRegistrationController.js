import DeliveryRegistration from "../models/DeliveryRegistration.js"; // Adjust the path as needed
import { uploadImageToCloudinary } from "../utils/Cloudinary.js";

export const createDeliveryRegistration = async (req, res) => {
  try {
    const {
      name,
      phone_number,
      city,
      selfie_image,
      aadhar_front_image,
      aadhar_back_image,
      pan_front_image,
      pan_back_image,
      driving_licence_front_image,
      driving_licence_back_image,
      bank_name,
      bank_account_number,
      bank_account_holder_name,
      full_address,
      city_village,
      district,
      country,
      pincode,
      work_area,
    } = req.body;

    // Upload images to Cloudinary
    const selfieImageUrl = await uploadImageToCloudinary(selfie_image);
    const aadharFrontImageUrl = await uploadImageToCloudinary(
      aadhar_front_image
    );
    const aadharBackImageUrl = await uploadImageToCloudinary(aadhar_back_image);
    const panFrontImageUrl = await uploadImageToCloudinary(pan_front_image);
    const panBackImageUrl = await uploadImageToCloudinary(pan_back_image);
    const drivingLicenceFrontImageUrl = await uploadImageToCloudinary(
      driving_licence_front_image
    );
    const drivingLicenceBackImageUrl = await uploadImageToCloudinary(
      driving_licence_back_image
    );

    // Save the data to the database
    const newRegistration = await DeliveryRegistration.create({
      name,
      phone_number,
      city,
      selfie_image: selfieImageUrl,
      aadhar_front_image: aadharFrontImageUrl,
      aadhar_back_image: aadharBackImageUrl,
      pan_front_image: panFrontImageUrl,
      pan_back_image: panBackImageUrl,
      driving_licence_front_image: drivingLicenceFrontImageUrl,
      driving_licence_back_image: drivingLicenceBackImageUrl,
      bank_name,
      bank_account_number,
      bank_account_holder_name,
      full_address,
      city_village,
      district,
      country,
      pincode,
      work_area,
    });

    res.status(201).json({
      message: "Registration successful",
      data: newRegistration,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
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
