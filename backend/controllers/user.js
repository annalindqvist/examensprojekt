import UserModel from "../models/user.js";

async function getSignIn(req, res) {
    let query = null;
    try {
        query = new URLSearchParams({type: "success", message: "Successfully logged out!"});
        req.session.destroy();
        
    } catch (err) {
        console.log(err)
        query = new URLSearchParams({type: "error", message: "Something went wrong"});
    } finally {
        const qStr = query.toString();
        res.redirect(`/?${qStr}`);
        
    }
}


async function addUser(req, res) {
    
    try {
        const {
            firstname,
            lastname,
            password
        } = req.body;

        // console.log(req.body);
        // console.log(firstname);

         // create user document instance locally
         const user = new UserModel({
            firstname,
            lastname,
            password
        })
        // save to database
        await user.save()
        
    } catch (err) {
        console.log(err)
       
    } 
    finally {
        res.redirect("/");
    }
}

export default { getSignIn, addUser };