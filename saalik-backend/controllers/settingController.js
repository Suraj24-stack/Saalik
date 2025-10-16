const Setting = require('../models/setting');

exports.getAll = async (req, res) => {
  try {
    const data = await Setting.findAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Setting getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getByKey = async (req, res) => {
  try {
    const item = await Setting.findOne({ 
      where: { setting_key: req.params.key } 
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Setting getByKey error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Setting.findOne({ 
      where: { setting_key: req.params.key } 
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }
    await item.update({ setting_value: req.body.setting_value });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Setting update error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};