const {userModal} = require('../Models/index');

exports.getAllUsers = async (req,res) =>{
    const users = await userModal.find();
    console.log(req.query.name);
    if(!users)
      return res.status(404).send("No user found");
    
      return res.status(200).json({
        "Status":true,
        "Data":users
      })
}
exports.getUserByName = async (req,res) =>{
    const {name} = req.params;

    const user = await userModal.findOne({name: name});
    if(!user)
       return res.stats(404).send(`No user found with name ${name}`);
    
    return res.status(200).json({
        "Status":true,
        "Data" : user
    })
}
exports.addUser = async (req,res) =>{
    const { user } = req.body;
    if(!user)
      return res.status(404).send("No data entered");
    
    await userModal.create(user);

    const allUser = await userModal.find();

    res.status(200).json({
        "Status": true,
        "Data": allUser
    })
}
exports.updateUser = async (req,res) =>{
    const { id } = req.params;
    const {data} = req.body;

    const updatedUsers = await userModal.findOneAndUpdate(
        {
            _id: id
        },
        data,
        {
            new : true
        }
    );
    res.status(200).json({
        "message":"User Updated",
        "Data" : updatedUsers
    })
}
exports.deleteUser = async (req,res) =>{
    const {id} = req.params;

    
    const delUser = await userModal.deleteOne({_id:id});
    if(!delUser)
    return res.status(404).send("User to be deleted not found");
    
    return res.status(200).send("User Deleted");
}
exports.subscriptionDetails = async (req,res) =>{
    const { id } = req.params;


    const user = await userModal.findById(id);

    if(!user) 
      return res.status(404).send("User not found");

    const getInDays = (data = "") =>{
        let date;
        if(data === "")
           date = new Date();
        else
            date = new Date(data);
        
       let  days = Math.floor(date/ (1000 * 60 * 60 *  24));
        
        return days;
    }
    const subscriptionDays = (date) =>{
        if(user.subscriptionType === "Basic")
            date += 90;
        else if(user.subscriptionType === "Standard")
            date += 180;
        else if(user.subscriptionType === "Premium")
             date += 365;
        
        return date;        
    }
    const returnDateInDays = getInDays(user.returnDate);
    const currentDateInDays = getInDays();
    const subscriptionDate = getInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionDays(subscriptionDate);

    const subscriptionExpired = subscriptionExpiration < currentDateInDays;

    const DaysLeftforSubscription =  subscriptionExpiration <= currentDateInDays ? 0 : subscriptionExpiration - currentDateInDays;
    const fine = returnDateInDays <= currentDateInDays ? 
                    subscriptionExpiration < currentDateInDays?
                    200:100:0;
    const userdata = {
        ...user,
        "subscriptionExpires":subscriptionExpired,
        "daysLeft" : DaysLeftforSubscription,
        "Fine" : fine 
    }
    res.status(200).json({
        "status" : "Fine Calculated",
        "Data" : userdata
    })
    console.log(DaysLeft);
}