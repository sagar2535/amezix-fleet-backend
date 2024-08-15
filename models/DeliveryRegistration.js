import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DeliveryRegistration = sequelize.define(
  "delivery_registration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    selfie_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadhar_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadhar_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pan_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pan_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driving_licence_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driving_licence_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_account_holder_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    full_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_village: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    work_area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    createdAt: "created_at", // Map the Sequelize field to your custom field name
    updatedAt: false,
  }
);

export default DeliveryRegistration;
