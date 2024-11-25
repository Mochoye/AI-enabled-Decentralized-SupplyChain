import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // 0----- STEPS -----0

  // 1. get user details from Frontend
  // 2. validation - not empty
  // 3. check if user already exists
  // 4. check for images, check for avatar
  // 5. uload to cloudinary, avatar uploaded?
  // 6. create user object - db entry
  // 7. remove password and referesh token field from resposne
  // 8. check for user creation
  // 9. return response

  //1
  const { username, fullName, email, password } = req.body;

  //2
  // if (fullName === "") {
  //   throw new apiError(400, "fullname is required");
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, " ALL FIELDS ARE REQUIRED ");
  }

  //3
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new apiError(
      409,
      "Account with this username or email already exists"
    );
  }

  //4

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // if (!avatarLocalPath) {
  //   throw new apiError(400, "Avatar file is required");
  // }
  // //5
  // const avatar = await cloudinaryUpload(avatarLocalPath);

  // if (!avatar) {
  //   throw new apiError(400, "Avatar file is required");
  // }

  // console.log(req.files);

  //6
  const user = await User.create({
    fullName,
    // avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
    access
  });

  //7
  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //8
  if (!newUser) {
    throw new apiError(500, "Something went wrong");
  }

  //9
  return res
    .status(201)
    .json(new apiResponse(200, newUser, "User registered successfully"));
});

export { registerUser };
