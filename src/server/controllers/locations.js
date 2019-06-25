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

export {
  createLocation,
  getAllLocations
}
