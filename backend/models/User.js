const mongoose=require('mongoose')
const {Schema}= mongoose;
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const UserSchema = new Schema({
    Fullname:{
        type: String,
        required: true,
        
    },

    Username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },

    phonenumber:{
        type: Number,
        required: true,
        unique: true
    
    },
    
    password:{
        type: String,
        required: true,
        
    },
    cpassword:{
        type: String,
        required: true,
        
    },
    date:{
        type: Date,
        default: Date.now
    },
    tokens:[
        {
            token:{
                type: String,
                required: true

            }

        }
    ]
});



//Password Hashing
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,10)
        this.cpassword= await bcrypt.hash(this.cpassword,10)

    }
    next();
})

UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = await jwt.sign({_id:this._id},"#1@34567!!@");
        this.tokens= this.tokens.concat({token:token})
        await this.save();
        return token;

    }catch(err){
        console.log(err);

    }
}








const User = mongoose.model('user',UserSchema);
User.createIndexes();


module.exports= User;