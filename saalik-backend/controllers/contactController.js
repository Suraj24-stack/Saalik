const ContactSubmission = require('../models/contactSubmission');

exports.getAll = async (req, res) => {
  try {
    const data = await ContactSubmission.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('Contact getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ContactSubmission.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Contact getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await ContactSubmission.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Contact updateStatus error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};