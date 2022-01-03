import mongoose from 'mongoose';

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
  const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

  export { User };