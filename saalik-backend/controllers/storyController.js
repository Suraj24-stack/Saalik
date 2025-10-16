const Story = require('../models/story');

exports.getAll = async (req, res) => {
  try {
    const stories = await Story.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: stories });
  } catch (err) {
    console.error('Story getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, data: story });
  } catch (err) {
    console.error('Story getById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).json({ success: true, data: newStory });
  } catch (err) {
    console.error('Story create error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    await story.update(req.body);
    res.json({ success: true, data: story });
  } catch (err) {
    console.error('Story update error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    await story.destroy();
    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Story delete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};