const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {
    getUserById,
    getUserByEmail
} = require('./database');


function initPassport(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {
                message: 'No user with that email!'
            })
        }
        try{
            if( await bcrypt.compare(password,user.password)){
                console.log(user)
                //tutaj mamy obecnie zalogowanego usera
                return done(null,user)
            }else{
                return done(null,false,{
                    message:'Password inncorect!'
                })
            }
        }catch(error){
            return done(error)
        }
    }
    passport.use(new localStrategy({
        usernameField:'email'
    },authenticateUser))
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id))
    })
}
module.exports = {initPassport}