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
      validate: {
        notNull: { msg: "Please enter a name" },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter a valid phone number" },
        isNumeric: { msg: "Phone number must contain only numbers" }, // Ensure phone number is numeric
        len: {
          args: [10, 15],
          msg: "Phone number should be between 10 and 15 characters",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter a valid city name" },
      },
    },
    aadhar_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please upload a valid Aadhar Card front image!" },
      },
    },
    aadhar_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please upload a valid Aadhar Card back image!" },
      },
    },
    pan_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please upload a valid Pan Card front image!" },
      },
    },
    pan_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please upload a valid Pan Card back image!" },
      },
    },
    driving_licence_front_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please upload a valid Driving Licence Card front image!",
        },
      },
    },
    driving_licence_back_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please upload a valid Driving Licence Card back image!",
        },
      },
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a valid Bank Name!",
        },
      },
    },
    bank_account_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a valid Bank Account Number!",
        },
        isNumeric: { msg: "Bank Account Number must contain only numbers" }, // Ensure bank account number is numeric
      },
    },
    bank_account_holder_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter an Account Holder's Name!",
        },
      },
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
      validate: {
        notNull: { msg: "Please enter a valid pincode" },
        isNumeric: { msg: "Pincode must contain only numbers" }, // Ensure pincode is numeric
        len: {
          args: [5, 10],
          msg: "Pincode should be between 5 and 10 characters",
        },
      },
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
