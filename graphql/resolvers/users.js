import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
dotenv.config();

import User from "../../models/User";
import validateRegisterInput from "../../utils/validators/validateRegisterInput";
import validateLoginInput from "../../utils/validators/validateLoginInput";

const getToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

const userResolvers = {
  Mutation: {
    async loginUser(parent, { userName, password }, context, info) {
      const { errors, valid } = validateLoginInput(userName, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const isMatched = bcryptjs.compare(password, user.password);
      if (!isMatched) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = getToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      parent,
      { registerInput: { userName, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        userName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure user doesnt alread exist
      const user = await User.findOne({ userName });
      if (user) {
        throw new UserInputError("Username is already exist", {
          error: {
            userName: "This userName is already exist",
          },
        });
      }

      // hash password and create an user token
      password: await bcryptjs.hash(password, 12);

      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = getToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};

export default userResolvers;
