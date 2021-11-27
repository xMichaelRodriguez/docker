const {Schema,model} =require('mongoose')
const userSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "First name is required"],
  },
  codigo: {
    type: String,
    required: [true, "Last name is required"],
  }
});
module.exports=model('user',userSchema)