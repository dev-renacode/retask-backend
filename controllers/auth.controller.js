import { AuthModel } from "../models/auth.model.js";
import { validateRegister, validateLogin } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";

export class AuthController {
  static register = async (req, res) => {
    try {
      const { data, error } = validateRegister(req.body);

      if (error)
        return res.status(400).json({ message: JSON.parse(error.message) });

      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

      const userToSave = {
        ...data,
        password: hashedPassword,
      };

      const userCreated = await AuthModel.register({ data: userToSave });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: userCreated._id,
          username: userCreated.username,
          email: userCreated.email,
        },
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static login = async (req, res) => {
    try {
      const { data, error } = validateLogin(req.body);

      if (error)
        return res.status(400).json({ message: JSON.parse(error.message) });

      const user = await AuthModel.login({ data });

      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
