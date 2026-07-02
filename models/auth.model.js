import users from "../db/users.js";
import bcrypt from "bcrypt";

export class AuthModel {
  static register = async ({ data }) => {
    const userCreated = await users.create(data);
    return userCreated;
  };

  static login = async ({ data }) => {
    const userFinded = await users.findOne({ email: data.email });

    if (!userFinded) return null;

    return userFinded;
  };
}
