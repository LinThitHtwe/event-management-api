const Organizer = require("../models/organizer");

const createOrganizer = async (organizerData) => {
  try {
    const organizer = new Organizer(organizerData);
    await organizer.save();
    return organizer;
  } catch (error) {
    throw error;
  }
}

const getOrganizers = async () => {
  try {
    const organizers = await Organizer.find();
    return organizers;
  } catch (error) {
    throw error;
  }
};

const getOrganizerById = async (organizerId) => {
  try {
    const organizer = await Organizer.findById(organizerId);
    if (!organizer) {
      throw "Organizer not found";
    }
    return organizer;
  } catch (error) {
    throw error;
  }
};

const updateOrganizer = async (organizerId, organizerData) => {
  const updates = Object.keys(organizerData);
  const allowedUpdates = [
    "name",
    "companyName",
    "contact",
    "bio",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw { error: "Invalid updates!" };
  }

  try {
    const organizer = await Organizer.findByIdAndUpdate(
      organizerId,
      organizerData,
      { new: true, runValidators: true }
    );

    if (!organizer) {
      throw "Organizer not found";
    }

    return organizer;
  } catch (error) {
    throw error;
  }
};

const manageOrganizerLevel = async (organizerId, accountLevel) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(
      organizerId,
      { $set: { accountLevel: accountLevel } },
      { new: true, runValidators: true }
    );

    if (!organizer) {
      throw "Organizer not found";
    }

    return organizer;
  } catch (error) {
    throw error;
  }
};

const manageOrganizerStatus = async (organizerId, accountStatus) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(
      organizerId,
      { $set: { accountStatus: accountStatus } },
      { new: true, runValidators: true }
    );

    if (!organizer) {
      throw "Organizer not found";
    }

    return organizer;
  } catch (error) {
    throw error;
  }
};

const changePhoneNumber = async (organizerId, phoneNo) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(
      organizerId,
      { $set: { phone: phoneNo } },
      { new: true, runValidators: true }
    );
    if (!organizer) {
      throw "Organizer not found";
    }
    return organizer;
    } catch (error) {
      throw error;
    }
};

const changeEmail = async (organizerId, email) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(
      organizerId,
      { $set: { email: email } },
      { new: true, runValidators: true }
    );
    if (!organizer) {
      throw "Organizer not found";
    }
    return organizer;
    } catch (error) {
      throw error;
    }
};

module.exports = {
  createOrganizer,
  getOrganizers,
  getOrganizerById,
  updateOrganizer,
  manageOrganizerLevel,
  manageOrganizerStatus,
  changePhoneNumber,
  changeEmail,
};