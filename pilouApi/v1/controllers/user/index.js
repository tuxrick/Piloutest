const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User functions
const user_functions = require('./user_functions');

//Utils
const requests = require('../../utils/requests');

module.exports = {
	    
    register: async (req, res) => {

        let user_password = req.body.password;

        const schemaRegister = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            last_name: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(4).max(255).required().email(),
            password: Joi.string().min(6).max(1024).required()
        })

        // validate user
        const { error } = schemaRegister.validate({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        
        if (error) {
            return requests.error_response(req, res, error, error.details[0].message );
        }
        try {

            const isEmailExist = await user_functions.getUserByEmail(req.body.email);
            if (isEmailExist) {
                return requests.error_response(req, res, "", "Email already exists" );
            }

            // hash password
            const password = await user_functions.generateHashPassword(user_password);
            let code = await user_functions.generateCode();

            const user = await user_functions.createUser({
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                emergency_contact_name: req.body.emergency_contact_name,
                emergency_contact_phone: req.body.emergency_contact_phone,
                blood_type: req.body.blood_type,
                role: "user",
                code: code,
                expire_code: Date.now()
            });

            const token = await user_functions.generateUserToken(user);

            return requests.success_response(req, res, 
                {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    token: token
                }, 
                "Successful request");

        } catch (error) {
            return requests.error_response(req, res, "", "Error creating user" );
        }
    },

    login: async (req, res) => {

        let user_info = {
            email : req.body.email,
            password : req.body.password
        }

        const schemaLogin = Joi.object({
            email: Joi.string().min(6).max(255).required().email(),
            password: Joi.string().min(6).max(1024).required()
        })
        
        const { error } = schemaLogin.validate(user_info);
        
        if (error) {
            return requests.error_response(req, res, "", "Email already exists" );
        }
        
        try{
            const user = await user_functions.getUserByEmail(user_info.email);

            if (!user) {
                return requests.error_response(req, res, "", "User not found" );
            }   

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return requests.error_response(req, res, "", "Invalid password" );
            }

            //Generate new token
            const token = await user_functions.generateUserToken(user);
            
            return requests.success_response(req, res, 
                {
                    _id: user._id,
                    email:user.email,
                    name: user.name,
                    token: token
                }, 
                "Successful request");
        }catch{
            return requests.error_response(req, res, "", "Error logging in user" );
        }
        
    },

    list_users: async (req, res) => {
        try{
            const users = await user_functions.listUsers();
            return requests.success_response(req, res, users, "Successful request");
        }catch{
            return requests.error_response(req, res, "", "Error getting data" );
        }
    },

    get_user_data: async (req, res) => {

        let user_id = req.params.user_id;
        console.log(user_id);

        let user_data = {}; 

        const user = await user_functions.getUserById(user_id);
        if(user){

            user_data = {
                id:user._id,
                name:user.name,
                last_name: user.last_name,
                email:user.email,
                emergency_contact_name:user.emergency_contact_name,
                emergency_contact_phone:user.emergency_contact_phone,
                blood_type:user.blood_type,
                role:user.role
            };

            return requests.success_response(req, res, user_data, "Successful request");
        }else{
            return requests.error_response(req, res, "", "Error getting user data" );
        }
    },

/*
    request_code: async (req, res) => {
        
        let user_email = req.body.email;

        const schemaRegister = Joi.object({
            email: Joi.string().min(4).max(255).required().email(),
        })
        // validate user
        const { error } = schemaRegister.validate({
            email: user_email,
        });

        if (error) {
            return requests.error_response(req, res, error, error.details[0].message );
        }

        try {
            
            const user_data = await user_functions.getUserByEmail(user_email);

            if (!user_data) {
                return requests.error_response(req, res, "", "User not found" );
            }  

            user_data.code = await user_functions.generateCode();
            user_data.expire_code = Date.now() + 3600000; // 1 hour

            const updated_user = await user_functions.updateUser(user_data);

            const sent_email = await mail.send_code_email(updated_user.email, updated_user.code);
            
            return requests.success_response(req, res, {code: updated_user.code,}, "Successful request");

        } catch (error) {
            return requests.error_response(req, res, "", "Error trying to get user information" );
        }
    },

    confirm_code: async (req, res) => {
            
        let user_info = {
            email : req.body.email,
            code : req.body.code
        };

        const schemaRegister = Joi.object({
            code: Joi.string().min(4).max(255).required(),
            email: Joi.string().min(4).max(255).required().email(),
        })
        // validate user
        const { error } = schemaRegister.validate(user_info);

        if (error) {
            return requests.error_response(req, res, error, error.details[0].message );
        }

        try {
            
            const user_data = await user_functions.getUserByEmail(user_info.email);

            if (!user_data) {
                return requests.error_response(req, res, "", "User not found" );
            }  
                            
            if (user_data.code != user_info.code) {
                return requests.error_response(req, res, "", "Invalid code" );
            }

            let expired_date = new Date(user_data.expire_code);

            if (expired_date.getTime() < Date.now()) {
                return requests.error_response(req, res, "", "Code expired" );
            }  

            user_data.confirm = true;

            const updated_user = await user_functions.updateUser(user_data);

            const token = await user_functions.generateUserToken(user_data);

            return requests.success_response(req, res, {token:token}, "Successful request");

        } catch (error) {
            return requests.error_response(req, res, "", "Error trying to get user information" );
        }
    },

    reset_password: async (req, res) => {
            
            let user_info = jwt.verify(req.body.token, process.env.TOKEN_SECRET, {expiresIn: '90d',});
            let password = req.body.password;

            const schemaRegister = Joi.object({
                password: Joi.string().min(6).max(255).required(),
            });
            // validate user
            const { error } = schemaRegister.validate({password: password});
    
            if (error) {
                return requests.error_response(req, res, error, error.details[0].message );
            }
    
            try {
                
                const user_data = await user_functions.getUserByEmail(user_info.email);
    
                if (!user_data) {
                    return requests.error_response(req, res, "", "User not found" );
                }  

                //Expire actual token
                const addExpiredToken = await user_functions.addExpiredToken(user_info._id, user_data.token);                

                const pass = await user_functions.generateHashPassword(password);

                user_data.password = pass;
    
                const updated_user = await user_functions.updateUser(user_data);
                
                return requests.success_response(req, res, {}, "Successful request");
    
            } catch (error) {
                return requests.error_response(req, res, "", "Error trying to get user information" );
            }
    },
*/
}