// importing the User model in
import User from "../models/User.js";

/* READ */// Retrieve a user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Get a user's friends by their ID
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // For each friend ID in the user's friends array, fetch friend details.
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// Update a user's friend list by adding or removing friends.
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    // Determine whether the person is already on the user's friend list.
    if (user.friends.includes(friendId)) {
      // Remove the friend from the friend list of both the user and the friend.
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {// Both the user's and the friend's friend lists will now include the friend.
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    // Get the user's most recent friend information.
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update a user's profile on social media
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { twitter, linkedIn, instagram } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { twitter, linkedIn, instagram },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};











