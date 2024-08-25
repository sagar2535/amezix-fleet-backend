import { sequelize } from "../config/db.js";
import DeliveryRegistration from "../models/DeliveryRegistration.js";
import DutyTime from "../models/DutyTime.js";

export const startDutyTime = async (req, res) => {
  const { delivery_registration_id, start_time } = req.body;
  const transaction = sequelize.transaction();
  try {
    const deliveryPartner = await DeliveryRegistration.findByPk(
      delivery_registration_id
    );

    if (!deliveryPartner) {
      return res.status(404).json({ error: "Delivery partner not found" });
    }

    const newDutyTime = await DutyTime.create(
      {
        delivery_registration_id,
        start_time,
        status: "active",
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json(newDutyTime);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const endDutyTime = async (req, res) => {
  const { id } = req.params;
  const { end_time } = req.body;

  try {
    const dutyTime = await DutyTime.findByPk(id);

    if (!dutyTime) {
      return res.status(404).json({ error: "Duty time not found" });
    }

    if (dutyTime.status !== "active") {
      return res.status(400).json({ error: "Duty is not active" });
    }

    const duration = Math.floor(
      (new Date(end_time) - new Date(dutyTime.start_time)) / (1000 * 60)
    );

    dutyTime.end_time = end_time;
    dutyTime.duration = duration;
    dutyTime.status = "completed";

    await dutyTime.save();

    res.status(200).json(dutyTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDutyTime = async (req, res) => {
  const { delivery_registration_id } = req.params;

  const transaction = sequelize.transaction();

  try {
    const user = await DeliveryRegistration.findOne(
      {
        where: { id: delivery_registration_id },
        attributes: ["name", "phone_number"],
        raw: true,
      },
      {
        transaction,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "Delivery partner not found" });
    }

    const dutyTimes = await DutyTime.findAll(
      {
        where: { delivery_registration_id },
        order: [["duty_date", "DESC"]],
        raw: true,
      },
      {
        transaction,
      }
    );

    if (dutyTimes.length === 0) {
      return res
        .status(404)
        .json({ message: "No duty times found for this partner" });
    }

    await transaction.commit();
    res.status(200).json({
      status: "success",
      duty_summary: dutyTimes,
      user,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};
