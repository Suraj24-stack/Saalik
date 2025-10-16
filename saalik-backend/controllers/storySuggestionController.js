const StorySuggestion = require('../models/storySuggestion');

exports.getAll = async (req, res) => {
  try {
    const data = await StorySuggestion.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('StorySuggestion getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await StorySuggestion.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('StorySuggestion getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await StorySuggestion.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }
    await item.update({ 
      status: req.body.status, 
      admin_notes: req.body.admin_notes 
    });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('StorySuggestion updateStatus error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};