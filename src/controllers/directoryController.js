const { Directory, DirectoryRating } = require('../models');
const { Op } = require('sequelize');
const response = require('../utils/response');

const directoryController = {
  // Get all directories with their ratings
  getAllDirectories: async (req, res) => {
    try {
      console.log('Attempting to fetch all directories...');
      const directories = await Directory.findAll({
        include: [{
          model: DirectoryRating,
          required: false,
          as: 'rating'
        }]
      });
      console.log('Directories fetched successfully:', directories);
      return response(res, 200, 'Directories retrieved successfully', directories);
    } catch (error) {
      console.error('Detailed error in getAllDirectories:', error);
      return response(res, 500, 'Error fetching directories', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Get a single directory by ID with its rating
  getDirectoryById: async (req, res) => {
    try {
      console.log('Attempting to fetch directory with ID:', req.params.id);
      const directory = await Directory.findByPk(req.params.id, {
        include: [{
          model: DirectoryRating,
          required: false,
          as: 'rating'
        }]
      });

      if (!directory) {
        console.log('Directory not found with ID:', req.params.id);
        return response(res, 404, 'Directory not found');
      }

      console.log('Directory fetched successfully:', directory);
      return response(res, 200, 'Directory retrieved successfully', directory);
    } catch (error) {
      console.error('Detailed error in getDirectoryById:', error);
      return response(res, 500, 'Error fetching directory', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Search directories by name or address
  searchDirectories: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return response(res, 400, 'Search query is required');
      }

      console.log('Search query:', query);
      
      // First, let's get all directories to see what we're working with
      const allDirectories = await Directory.findAll();
      console.log('All directories in database:', allDirectories.map(d => d.name));

      const searchQuery = {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${query}%`
              }
            },
            {
              address: {
                [Op.like]: `%${query}%`
              }
            }
          ]
        },
        include: [{
          model: DirectoryRating,
          required: false,
          as: 'rating'
        }],
        order: [
          ['name', 'ASC']
        ]
      };

      console.log('Search query:', JSON.stringify(searchQuery, null, 2));
      
      const directories = await Directory.findAll(searchQuery);
      
      console.log('Raw search results:', directories.map(d => d.name));
      
      return response(res, 200, 'Search completed successfully', {
        query,
        total: directories.length,
        results: directories
      });
    } catch (error) {
      console.error('Detailed error in searchDirectories:', error);
      return response(res, 500, 'Error searching directories', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Create a new directory
  createDirectory: async (req, res) => {
    try {
      const { name, address, overall_rating, opening_hours, description, main_image_url } = req.body;
      if (!name || !address) {
        return response(res, 400, 'Name and address are required');
      }
      const newDirectory = await Directory.create({
        name,
        address,
        overall_rating,
        opening_hours,
        description,
        main_image_url
      });
      return response(res, 201, 'Directory created successfully', newDirectory);
    } catch (error) {
      console.error('Detailed error in createDirectory:', error);
      return response(res, 500, 'Error creating directory', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Update an existing directory
  updateDirectory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, overall_rating, opening_hours, description, main_image_url } = req.body;
      const directory = await Directory.findByPk(id);
      if (!directory) {
        return response(res, 404, 'Directory not found');
      }
      await directory.update({
        name,
        address,
        overall_rating,
        opening_hours,
        description,
        main_image_url
      });
      return response(res, 200, 'Directory updated successfully', directory);
    } catch (error) {
      console.error('Detailed error in updateDirectory:', error);
      return response(res, 500, 'Error updating directory', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Delete a directory
  deleteDirectory: async (req, res) => {
    try {
      const { id } = req.params;
      const directory = await Directory.findByPk(id);
      if (!directory) {
        return response(res, 404, 'Directory not found');
      }
      await directory.destroy();
      return response(res, 200, 'Directory deleted successfully');
    } catch (error) {
      console.error('Detailed error in deleteDirectory:', error);
      return response(res, 500, 'Error deleting directory', {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
};

module.exports = directoryController; 