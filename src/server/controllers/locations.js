import { Location } from '../models';

const createLocation = async (request, response) => {
  try {
    const { name, female, male, parentLocationId } = request.body;

    if (parentLocationId) {
      const location = await Location.findByPk(parentLocationId);

      if (location === null) {
        return response.status(404).json({
          success: false,
          message: 'Parent location id not found',
        });
      }
    }

    const location = await Location.create({
      name, female, male, parentLocationId: parentLocationId ? parentLocationId : null
    });
    
    return response.status(201).json({
      location,
      success: true,
      message: 'Location created successfully',
    });
  } catch(error) {
    response.status(500).json({
      success: false,
      error
    });
  }
}

const getAllLocations = async (_, response) => {
  try {
    const locations = await Location.findAll({
      include: [
        {
          model: Location,
          as: 'nestedLocations',
        }
      ],
    });

    if (locations.length) {
      return response.status(200).json({
        locations,
        success: true,
        message: 'Locations retrieved successfully',
      });
    } else {
      return response.status(200).json({
        success: true,
        locations,
        message: 'No location found'
      })
    }
  } catch(error) {
    response.status(500).json({
      success: false,
      error
    });
  }
}

const updateLocation = async (request, response) => {
  try {
    const { locationId } = request.params;
    const { name, female, male } = request.body;

    if (locationId) {
      const location = await Location.findByPk(locationId);

      if (location === null) {
        return response.status(404).json({
          success: false,
          message: 'Location not found',
        });
      } else {
        const updatedLocationDetails = {
          name: name ? name : location.name,
          female: female ? female : location.female,
          male: male ? male : location.male
        };

        const updatedLocation = await Location.update(updatedLocationDetails, {
          where: {
            id: locationId
          },
          returning: true
        });

        return response.status(200).json({
          updatedLocation: updatedLocation[1][0],
          success: true,
          message: 'Location updated successfully',
        });
      }
    }
  } catch(error) {
    response.status(500).json({
      success: false,
      error
    });
  }
}

export {
  createLocation,
  getAllLocations,
  updateLocation
}
