import jwt from "jsonwebtoken";

export const exportValidation = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req?.headers?.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req?.headers?.cookie) {
      const match = req.headers.cookie.match(/(?:^|;\s*)(?:token|Token)=([^;]+)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });
      req.userId = decoded.id;
      req.role = decoded.role || "user";
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
