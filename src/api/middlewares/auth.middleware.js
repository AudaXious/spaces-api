import { verifyAuthToken } from "../services/security/token.service.js";
import { ErrTokenIsRequired,getErrorMessage } from "../../errors/index.js";




const _getAuthHeader = (req)=>{
  const authHeader = req.get("Authorization");
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") throw ErrTokenIsRequired;
  return authHeader.split(" ")[1];
}

export const authorizeUser = async(req, res, next)=>{
    try{
        const token = _getAuthHeader(req);
        const decodedToken = await verifyAuthToken(token);
    
    req.user = {
      _id: decodedToken._id,
      uuid: decodedToken.uuid,
      isVerified: decodedToken.isVerified,
      twitterUsername : decodedToken.twitterUsername,
    };

    next();
  } catch (error) {
    const err = getErrorMessage(error);
    console.log(err.message);
    res.status(err.code).json({
      success : false,
      error: err.message,
    });
  }
}