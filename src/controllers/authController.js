import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    // check if user exist
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("FULL PRISMA ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);
    console.error("META:", error.meta);

    next(error);
  }
};

export { registerUser };
