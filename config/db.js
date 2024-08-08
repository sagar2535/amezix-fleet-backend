import { Sequelize } from "sequelize";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
config();

const sequelize = new Sequelize(process.env.DATABASE, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true,
    native: true,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection has been established in "${sequelize.getDatabaseName()}" DB successfully.`
    );

    await sequelize.sync({ alter: true });
    console.log("All (Postgres) models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sequelize, bcrypt };
