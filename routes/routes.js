const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");

const router = require("express").Router();

router.get("/home", (req, res) => {
  res.status(200).send("API running");
});

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/logout", verifyToken, logoutUser);

module.exports = router;
