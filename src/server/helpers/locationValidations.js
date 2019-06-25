const validateLocationDetails = (request, response, next) => {
  try {
    const { name, female, male } = request.body;
    const errors = {};
    if (!name) {
      errors.name = 'Location name field can not be empty';
    }

    if (name && !name.trim()) {
      errors.name = 'Contact name field can not be empty';
    }

    if (!female) {
      errors.female = 'Female field can not be empty';
    }

    if (female && !female.trim()) {
      errors.female = 'Female field can not be empty';
    }

    if (female && !Number.isInteger(parseInt(female, 10))) {
      errors.female = 'Female field value should be a number';
    }

    if (!male) {
      errors.male = 'Male field can not be empty';
    }

    if (male && !male.trim()) {
      errors.male = 'Male field can not be empty';
    }

    if (male && !Number.isInteger(parseInt(male, 10))) {
      errors.male = 'Male field value should be a number';
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

const validateLocationUpdateDetails = (request, response, next) => {
  try {
    const { name, female, male } = request.body;
    const errors = {};

    if (name && !name.trim()) {
      errors.name = 'Name field can not be empty';
    }

    if (female && !female.trim()) {
      errors.female = 'Female field can not be empty';
    }

    if (female && !Number.isInteger(parseInt(female, 10))) {
      errors.female = 'Female field value should be a number';
    }

    if (male && !male.trim()) {
      errors.male = 'Male field can not be empty';
    }

    if (male && !Number.isInteger(parseInt(male, 10))) {
      errors.male = 'Male field value should be a number';
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
  validateLocationDetails,
  validateLocationUpdateDetails
};
