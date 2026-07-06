import jwt from "jsonwebtoken";

export const protect = (req,res,next)=>{

 const token = req.cookies.token;

 if(!token){
   return res.status(401).json({
     success:false,
     message:"Please login to continue"
   })
 }

 try{

   const decoded = jwt.verify(
     token,
     process.env.JWT_SECRET
   );

   req.user = decoded;

   next();

 }catch(error){

   return res.status(401).json({
     success:false,
     message:"Session expired, please login again"
   })

 }
};

export const adminOnly = async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Admin Access Only",
      });

    }

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};