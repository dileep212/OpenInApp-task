// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   // Add async keyword here
//   // Check if authorization header is present
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   // Extract token from authorization header
//   const token = authHeader.split(" ")[1];

//   try {
//     // Verify JWT token
//     const decodedToken = jwt.verify(token, "your_secret_key_here");

//     // Check if user exists
//     const user = await User.findById(decodedToken.userId);
//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Attach user object to request
//     req.user = user;

//     // Proceed to next middleware
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     // Handle invalid token or token expiration
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// module.exports = authMiddleware;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      "jjdsffffffffffffffieo xzclaapoidpjjnajnjJDDJEUF"
    );
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user object and permissions to request
    req.user = user;
    req.permissions = user.permissions; // Assuming permissions are stored in user object

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
