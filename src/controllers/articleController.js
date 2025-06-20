const { Article } = require('../models');
const { Op } = require('sequelize');
const response = require('../utils/response');

const articleController = {
  // Get all articles
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.findAll({
        attributes: { exclude: ['full_desc'] }
      });
      return response(res, 200, 'Articles retrieved successfully', articles);
    } catch (error) {
      return response(res, 500, 'Error fetching articles', { error: error.message });
    }
  },

  // Get article by ID
  getArticleById: async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) return response(res, 404, 'Article not found');
      return response(res, 200, 'Article retrieved successfully', article);
    } catch (error) {
      return response(res, 500, 'Error fetching article', { error: error.message });
    }
  },

  // Search articles by name or short_desc
  searchArticles: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) return response(res, 400, 'Search query is required');
      const articles = await Article.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { short_desc: { [Op.iLike]: `%${query}%` } }
          ]
        },
        order: [['name', 'ASC']]
      });
      return response(res, 200, 'Search completed successfully', { query, total: articles.length, results: articles });
    } catch (error) {
      return response(res, 500, 'Error searching articles', { error: error.message });
    }
  },

  // Create a new article
  createArticle: async (req, res) => {
    try {
      const { name, short_desc, full_desc, image_url } = req.body;
      if (!name || !short_desc || !full_desc) return response(res, 400, 'Name, short_desc, and full_desc are required');
      const newArticle = await Article.create({ name, short_desc, full_desc, image_url });
      return response(res, 201, 'Article created successfully', newArticle);
    } catch (error) {
      return response(res, 500, 'Error creating article', { error: error.message });
    }
  },

  // Update an article
  updateArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, short_desc, full_desc, image_url } = req.body;
      const article = await Article.findByPk(id);
      if (!article) return response(res, 404, 'Article not found');
      await article.update({ name, short_desc, full_desc, image_url });
      return response(res, 200, 'Article updated successfully', article);
    } catch (error) {
      return response(res, 500, 'Error updating article', { error: error.message });
    }
  },

  // Delete an article
  deleteArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);
      if (!article) return response(res, 404, 'Article not found');
      await article.destroy();
      return response(res, 200, 'Article deleted successfully');
    } catch (error) {
      return response(res, 500, 'Error deleting article', { error: error.message });
    }
  }
};

module.exports = articleController; 