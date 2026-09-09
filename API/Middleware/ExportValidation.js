import jwt from "jsonwebtoken";

export const exportValidation = (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.role = decoded.role;
    } else {
      req.userId = null;
      req.role = null;
    }
  } catch (error) {
    req.userId = null;
    req.role = null;
  }
  next();
};
