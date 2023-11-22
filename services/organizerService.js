const Organizer = require("../models/organizer");

const create_organizer = async (organizerData) => {
  try {
    const organizer = new Organizer(organizerData);
    await organizer.save();
    return organizer;
  } catch (error) {
    throw error;
  }
}

const get_organizers = async () => {
  try {
    const organizers = await Organizer.find();
    return organizers;
  } catch (error) {
    throw error;
  }
};

const get_organizer_by_id = async (organizerId) => {
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

const update_organizer = async (organizerId, organizerData) => {
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

const manage_organizer_level = async (organizerId, accountLevel) => {
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

const manage_organizer_status = async (organizerId, accountStatus) => {
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

const change_phone = async (organizerId, phoneNo) => {
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

const change_email = async (organizerId, email) => {
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
  create_organizer,
  get_organizers,
  get_organizer_by_id,
  update_organizer,
  manage_organizer_level,
  manage_organizer_status,
  change_phone,
  change_email,
};