import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
      //TODO: Make sure user doesnt alread exist
      //TODO: hash password and create an user token
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
