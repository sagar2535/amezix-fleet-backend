import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import DeliveryRegistration from "./DeliveryRegistration.js";

const DutyTime = sequelize.define(
  "DutyTime",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    delivery_registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DeliveryRegistration,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true, // Will be null until the duty ends
    },
    duty_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true, // Calculated once the duty ends
      comment: "Duration in minutes",
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "inactive"),
      allowNull: false,
      defaultValue: "inactive",
    },
  },
  {
    tableName: "duty_times",
    timestamps: true, // For createdAt and updatedAt
  }
);

DeliveryRegistration.hasMany(DutyTime, {
  foreignKey: "delivery_registration_id",
});
DutyTime.belongsTo(DeliveryRegistration, {
  foreignKey: "delivery_registration_id",
});
export default DutyTime;
