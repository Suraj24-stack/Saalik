const Initiative = require('../models/initiative');

exports.getAll = async (req, res) => {
  try {
    const data = await Initiative.findAll({
      order: [['display_order', 'ASC']]
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('Initiative getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Initiative.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Initiative getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = await Initiative.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    console.error('Initiative create error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Initiative.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Initiative update error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Initiative.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }
    await item.destroy();
    res.json({ success: true, message: 'Initiative deleted successfully' });
  } catch (err) {
    console.error('Initiative delete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};