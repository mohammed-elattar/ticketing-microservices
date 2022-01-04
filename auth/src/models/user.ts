import mongoose from 'mongoose';
import { password } from '../services/password';

interface UserAttrs {
    email: string;
    password: string;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): any;
}

const { Schema } = mongoose;

  const userSchema = new Schema({
    email:  {type: String,required: true},
    password:  {type: String,required: true},
  });

  userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}
  
  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashed = await password.toHash(this.get('password'));
        this.set('password', hashed);  
    }

    next();
  });
  
  const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

  export { User };