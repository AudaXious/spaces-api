import jwt from "jsonwebtoken";

export const generateToken = async (payload)=>{
    return jwt.sign(
        payload,
        process.env.CLIENT_JWT_SECRET,
    )
};

export const verifyAuthToken = async (token) => {
    const isValid = jwt.verify(token, process.env.CLIENT_JWT_SECRET);
    return isValid;
  };
  