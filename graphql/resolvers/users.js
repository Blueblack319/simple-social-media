import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
dotenv.config();

import User from "../../models/User";

const userResolvers = {
  Mutation: {
    async register(
      parent,
      { registerInput: { userName, email, password, confirmPassword } },
      context,
      info
    ) {
      //TODO: Validate user data
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          userName: res.userName,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};

export default userResolvers;
