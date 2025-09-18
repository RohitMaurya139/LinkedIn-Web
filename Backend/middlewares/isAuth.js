import jwt from "jsonwebtoken";


const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No Token Found" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify.id || verify._id; // or verify._id if that's how you signed token
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

export default isAuth;