const IsLogin = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "لطفا ابتدا وارد حساب کاربری خود شوید"
    });
  }
  if (!req.role) {
    req.role = "user";
  }
  next();
};

export default IsLogin;
