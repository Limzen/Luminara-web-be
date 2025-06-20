const { Guide } = require('../models');
const { Op } = require('sequelize');
const response = require('../utils/response');

const guideController = {
  // Get all guides
  getAllGuides: async (req, res) => {
    try {
      const guides = await Guide.findAll({
        attributes: { exclude: ['full_desc'] }
      });
      return response(res, 200, 'Guides retrieved successfully', guides);
    } catch (error) {
      return response(res, 500, 'Error fetching guides', { error: error.message });
    }
  },

  // Get guide by ID
  getGuideById: async (req, res) => {
    try {
      const guide = await Guide.findByPk(req.params.id);
      if (!guide) return response(res, 404, 'Guide not found');
      return response(res, 200, 'Guide retrieved successfully', guide);
    } catch (error) {
      return response(res, 500, 'Error fetching guide', { error: error.message });
    }
  },

  // Search guides by name or short_desc
  searchGuides: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) return response(res, 400, 'Search query is required');
      const guides = await Guide.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { short_desc: { [Op.iLike]: `%${query}%` } }
          ]
        },
        order: [['name', 'ASC']]
      });
      return response(res, 200, 'Search completed successfully', { query, total: guides.length, results: guides });
    } catch (error) {
      return response(res, 500, 'Error searching guides', { error: error.message });
    }
  },

  // Create a new guide
  createGuide: async (req, res) => {
    try {
      const { name, short_desc, full_desc, image_url } = req.body;
      if (!name || !short_desc || !full_desc) return response(res, 400, 'Name, short_desc, and full_desc are required');
      const newGuide = await Guide.create({ name, short_desc, full_desc, image_url });
      return response(res, 201, 'Guide created successfully', newGuide);
    } catch (error) {
      return response(res, 500, 'Error creating guide', { error: error.message });
    }
  },

  // Update a guide
  updateGuide: async (req, res) => {
    try {
      const { id } = req.params;
      const guide = await Guide.findByPk(id);
      if (!guide) return response(res, 404, 'Guide not found');

      // Only update fields that are present in the request body
      const fieldsToUpdate = {};
      ['name', 'short_desc', 'full_desc', 'image_url'].forEach(field => {
        if (req.body[field] !== undefined) fieldsToUpdate[field] = req.body[field];
      });

      console.log('Updating guide:', id, fieldsToUpdate);
      await guide.update(fieldsToUpdate);
      await guide.reload();
      console.log('Updated guide:', guide.toJSON());
      return response(res, 200, 'Guide updated successfully', guide);
    } catch (error) {
      return response(res, 500, 'Error updating guide', { error: error.message });
    }
  },

  // Delete a guide
  deleteGuide: async (req, res) => {
    try {
      const { id } = req.params;
      const guide = await Guide.findByPk(id);
      if (!guide) return response(res, 404, 'Guide not found');
      await guide.destroy();
      return response(res, 200, 'Guide deleted successfully');
    } catch (error) {
      return response(res, 500, 'Error deleting guide', { error: error.message });
    }
  }
};

module.exports = guideController; 