//Tools
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models 
const user = require('../../models/user');

module.exports = {
	    
    generateHashPassword: async (pass) =>{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(pass, salt);
        return password;
    },

    generateCode: async () =>{
        let code = Math.floor(100000 + Math.random() * 900000);
        return code;
    },    

    generateUserToken: async (user_data) => {
        const token = jwt.sign({
            _id: user_data._id,
            name: user_data.name,
            last_name: user_data.last_name,
            email: user_data.email,
            role: user_data.role
        }, process.env.TOKEN_SECRET);

        return token;
    },

    createUser: async (user_info) => {
        try{
            const user_data = new user(user_info);
            const saved_user = await user_data.save();
            return saved_user;
        }catch{
            return false;
        }
    },

    getUserById: async (user_id) => {
        const user_data = await user.findOne({_id:user_id});
        return user_data;
    },

    getUserByEmail: async (user_email) => {
        const user_data = await user.findOne({email:user_email});
        return user_data;
    },

    listUsers: async () => {
        const user_data = await user.find().select('_id name last_name email emergency_contact_name emergency_contact_phone blood_type');
        return user_data;
    },

    updateUser: async (user_info) => { 
        let updated_user = user.findOneAndUpdate({_id: user_info._id}, user_info, {new: true});
        return updated_user;
    }
}