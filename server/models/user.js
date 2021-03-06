import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt-nodejs';

// Basic user model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});


// On save hook, encrypt password
// Before saving a model, runs the salt/hash functions to encrypt password
userSchema.pre("save", function(next) {
    const user = this;
    console.log(user);

    // Generate salt for 10 rounds
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // Has salted password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // Set user password == hashed salt
            user.password = hash;

            // Model gets saved
            next();
        });
    });
});

// Helper method implemented within routes
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

const ModelClass = mongoose.model("user", userSchema);

export default ModelClass;