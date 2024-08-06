import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ message: "username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        message: "Incorrect Username or password",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: "Username or Password is Incorrect",
        status: false,
      });
    }
   delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const setAvatar=async(req,res,next)=>{
    try{
        const userId=req.params.id;
        const avatarImage=req.body.image;
        const userData=await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({isSet:userData.isAvatarImageSet,image:userData.image})
    }
    catch(err){
        next(err);
    }
}
