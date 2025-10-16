const Partner = require('../models/partner');

exports.getAll = async (req, res) => {
  try {
    const partners = await Partner.findAll({
      order: [['display_order', 'ASC']]
    });
    res.json({ success: true, data: partners });
  } catch (err) {
    console.error('Partner getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.json({ success: true, data: partner });
  } catch (err) {
    console.error('Partner getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newPartner = await Partner.create(req.body);
    res.status(201).json({ success: true, data: newPartner });
  } catch (err) {
    console.error('Partner create error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    await partner.update(req.body);
    res.json({ success: true, data: partner });
  } catch (err) {
    console.error('Partner update error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    await partner.destroy();
    res.json({ success: true, message: 'Partner deleted successfully' });
  } catch (err) {
    console.error('Partner delete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};