const validateLocationDetails = (request, response, next) => {
  try {
    const locationDetails = request.body;
    const errors = {};
    if (!locationDetails.name) {
      errors.name = 'Location name field can not be empty';
    }

    if (locationDetails.name && !locationDetails.name.trim()) {
      errors.name = 'Contact name field can not be empty';
    }

    if (!locationDetails.female) {
      errors.female = 'Female field can not be empty';
    }

    if (locationDetails.female && !locationDetails.female.trim()) {
      errors.female = 'Female field can not be empty';
    }

    if (!locationDetails.male) {
      errors.male = 'Male field can not be empty';
    }

    if (locationDetails.male && !locationDetails.male.trim()) {
      errors.male = 'Male field can not be empty';
    }


    if (!Object.keys(errors).length) {
      next();
    } else {
      response.status(422).json({
        success: false,
        errors
      });
    }
  } catch(error) {
    response.status(500).json({
      success: false,
      message: 'Server error, please try again!',
      error
    });
  }
};

export {
  validateLocationDetails
};
