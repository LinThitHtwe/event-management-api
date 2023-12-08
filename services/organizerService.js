const Organizer = require("../models/organizer");

const create_organizer = async (organizerData) => {
  try {
    const organizer = new Organizer(organizerData);
    await organizer.save();
    return organizer;
  } catch (error) {
    throw error;
  }
};

const get_organizers = async (
  page,
  pageSize,
  name,
  accountStatus = "active",
  sortBy = "accountLevel"
) => {
  try {
    let criteria = {};

    criteria = addConditionToCriteria(
      criteria,
      "name",
      name ? { $regex: new RegExp(`.*${name}.*`, "i") } : null
    );
    criteria = addConditionToCriteria(
      criteria,
      "accountStatus",
      accountStatus ? accountStatus : null
    );

    const isCriteriaEmpty = Object.values(criteria).every(
      (value) => value === ""
    );

    let query = {};

    if (!isCriteriaEmpty) {
      query = {
        $and: [criteria],
      };
    }

    let result = {
      content: await Organizer.find(query)
        .sort(sortBy === "blueMark" ? { accountLevel: 1 } : { createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(pageSize),
      total: await Organizer.countDocuments(query),
    };
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
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
  const allowedUpdates = ["name", "companyName", "contact", "bio"];
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

// const filterOrganizer = (query) => {
//   const { page, pageSize, name, accountLevel, accountStatus } = query;
//   try {
//     let criteria = {};

//     criteria = addConditionToCriteria(
//       criteria,
//       "name",
//       name
//     )

//     criteria = addConditionToCriteria(
//       criteria,
//       "accountLevel",
//       accountLevel
//     )

//     criteria = addConditionToCriteria(
//       criteria,
//       "accountStatus",
//       accountStatus
//     )

//     const isCriteriaEmpty = Object.values(criteria).every(
//       (value) => value === ""
//     );

//     let query = {};

//     if (!isCriteriaEmpty) {
//       query = {
//         $and: [criteria],
//       };
//     }

//     const result = Organizer.find(query)
//       .skip((page-1) * pageSize)
//       .sort({accountLevel: -1})
//       .limit(pageSize);

//     return result;

//   } catch (error) {
//     return error;
//   }
// }

const addConditionToCriteria = (criteria, key, value) => {
  if (value) {
    return { ...criteria, [key]: value };
  }
  return criteria;
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
  // filterOrganizer,
};
