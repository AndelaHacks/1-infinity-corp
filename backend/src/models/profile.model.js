import mongoose from "mongoose";

const { Schema } = mongoose;

let Profile = null;

try {
  const ProfileSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    handle: {
      type: String,
      required: true,
      max: 40
    },
    accountname: {
      type: String,
      max: 12
    },
    privateKey: String,
    location: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  Profile = mongoose.model("profile", ProfileSchema);
} catch (e) {
  Profile = mongoose.model("Profile");
}

export default Profile;
