//  *******USERS ROUTES*******   

const express = require("express")



const router = express.Router();

const {
    getAllUsers,
    getUserByName,
    addUser,
    updateUser,
    deleteUser,
    subscriptionDetails
} = require('../controllers/user-controller');

// For Getting all Users
router.get("/",getAllUsers)

// For Getting User with specific Id
router.get("/:name",getUserByName )

// For Adding new user
router.post("/",addUser);

//For updating  Users data
router.put("/:id",updateUser)

//For Deleting User with specific Id
router.delete("/:id",deleteUser);

// Checking for the Fine and subscription Expiration
router.get("/subscription-detail/:id", subscriptionDetails);

module.exports = router;