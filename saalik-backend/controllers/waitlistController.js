const Waitlist = require('../models/waitlist');

exports.getAll = async (req, res) => {
  try {
    const data = await Waitlist.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('Waitlist getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Waitlist.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Waitlist entry not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Waitlist getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD THIS NEW FUNCTION
exports.create = async (req, res) => {
  try {
    const { name, email, phone, travel_date, destination, message } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    // Create new waitlist entry with default status 'pending'
    const newEntry = await Waitlist.create({
      name,
      email,
      phone,
      travel_date,
      destination,
      message,
      status: 'pending', // Default status
    });

    res.status(201).json({ 
      success: true, 
      data: newEntry,
      message: 'Waitlist entry created successfully'
    });
  } catch (err) {
    console.error('Waitlist create error:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to create waitlist entry'
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await Waitlist.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Waitlist entry not found' });
    }
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Waitlist updateStatus error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};