import { TwitterService } from "../services/app/twitter.service.js";
import { getErrorMessage } from "../../errors/index.js";

export const linkAccount = async (req, res) => {
    try {
      const {_id} = req.user;
      const user = await TwitterService.linkAccountService(_id);
      res.status(200).json({
        success: true,
        message: "Credentials Fetched",
        user,
      });
      return;
    } catch (error) {
      console.log(error);
      const result = getErrorMessage(error);
      return res.status(result.code).json({
        success: false,
        error: result,
      });
    }
  };
  
  
  export const verifySocialLink = async (req, res) => {
    try {
      const {url} = req.body
      const data = await TwitterService.verifySocialLinkService(url);
      res.status(200).json({
        success: true,
        message: "Credentials Verified",
        data,
      });
      return;
    } catch (error) {
      console.log(error);
      const result = getErrorMessage(error);
      return res.status(result.code).json({
        success: false,
        error: result,
      });
    }
  };