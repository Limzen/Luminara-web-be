const { Itinerary } = require('../models');
const response = require('../utils/response');

const itineraryController = {
    // Mendapatkan semua itinerary (untuk admin atau fitur publik)
    getAllItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.findAll({ order: [['created_at', 'DESC']] });
            return response(res, 200, 'Itineraries retrieved successfully', itineraries);
        } catch (error) {
            console.error(error);
            return response(res, 500, 'Error fetching itineraries', { error: error.message });
        }
    },

    // Mendapatkan itinerary berdasarkan ID
    getItineraryById: async (req, res) => {
        try {
            const itinerary = await Itinerary.findByPk(req.params.id);
            if (!itinerary) {
                return response(res, 404, 'Itinerary not found');
            }
            return response(res, 200, 'Itinerary retrieved successfully', itinerary);
        } catch (error) {
            console.error(error);
            return response(res, 500, 'Error fetching itinerary', { error: error.message });
        }
    },

    // Membuat itinerary baru
    createItinerary: async (req, res) => {
        try {
            // Di aplikasi nyata, user_id akan diambil dari data autentikasi (req.user.id)
            const { user_id, name, destinations, description, image_url, start_date, end_date } = req.body;

            if (!user_id || !name) {
                return response(res, 400, 'User ID and itinerary name are required');
            }

            const newItinerary = await Itinerary.create({
                user_id,
                name,
                destinations,
                description,
                image_url,
                start_date,
                end_date
            });
            return response(res, 201, 'Itinerary created successfully', newItinerary);
        } catch (error) {
            console.error(error);
            return response(res, 500, 'Error creating itinerary', { error: error.message });
        }
    },

    // Mengupdate itinerary
    updateItinerary: async (req, res) => {
        try {
            const { id } = req.params;
            const itinerary = await Itinerary.findByPk(id);

            if (!itinerary) {
                return response(res, 404, 'Itinerary not found');
            }

            // Di aplikasi nyata, tambahkan cek otorisasi: if (itinerary.user_id !== req.user.id) ...

            await itinerary.update(req.body);
            return response(res, 200, 'Itinerary updated successfully', itinerary);
        } catch (error) {
            console.error(error);
            return response(res, 500, 'Error updating itinerary', { error: error.message });
        }
    },

    // Menghapus itinerary
    deleteItinerary: async (req, res) => {
        try {
            const { id } = req.params;
            const itinerary = await Itinerary.findByPk(id);

            if (!itinerary) {
                return response(res, 404, 'Itinerary not found');
            }

            // Di aplikasi nyata, tambahkan cek otorisasi

            await itinerary.destroy();
            return response(res, 200, 'Itinerary deleted successfully');
        } catch (error) {
            console.error(error);
            return response(res, 500, 'Error deleting itinerary', { error: error.message });
        }
    }
};

module.exports = itineraryController;