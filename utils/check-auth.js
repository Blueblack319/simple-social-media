import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new AuthenticationError(
      "Authentication token must be 'Bearer [token]'"
    );
  }
  throw new AuthenticationError("Authorization header must be provided");
};

export default checkAuth;
