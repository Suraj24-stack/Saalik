const Story = require('../models/story');

// Helper function to generate URL-friendly slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
};

// Helper function to ensure unique slug
const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const whereClause = { slug };
    if (excludeId) {
      whereClause.id = { [require('sequelize').Op.ne]: excludeId };
    }
    
    const existingStory = await Story.findOne({ where: whereClause });
    
    if (!existingStory) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

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
    console.log('Request body:', req.body);
    console.log('Request body type:', typeof req.body);
    
    const { title, featured_image, ...otherData } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required' 
      });
    }

    // Generate slug from title if not provided
    let slug = req.body.slug || generateSlug(title);
    
    // Ensure slug is unique
    slug = await ensureUniqueSlug(slug);

    // Prepare story data
    const storyData = {
      title,
      slug,
      ...otherData
    };

    // Only add featured_image if it's a valid string (URL)
    if (featured_image && typeof featured_image === 'string' && featured_image.trim() !== '') {
      storyData.featured_image = featured_image;
    }

    console.log('Story data to create:', storyData);

    // Create story
    const newStory = await Story.create(storyData);

    res.status(201).json({ 
      success: true, 
      data: newStory,
      message: 'Story created successfully'
    });
  } catch (err) {
    console.error('Story create error:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to create story'
    });
  }
};

exports.update = async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const { title, featured_image, ...otherData } = req.body;
    const updateData = { ...otherData };

    // If title is being updated, regenerate slug
    if (title && title !== story.title) {
      updateData.title = title;
      let newSlug = req.body.slug || generateSlug(title);
      updateData.slug = await ensureUniqueSlug(newSlug, req.params.id);
    }

    // Only update featured_image if it's a valid string
    if (featured_image && typeof featured_image === 'string' && featured_image.trim() !== '') {
      updateData.featured_image = featured_image;
    }

    await story.update(updateData);
    
    res.json({ 
      success: true, 
      data: story,
      message: 'Story updated successfully'
    });
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
    res.json({ 
      success: true, 
      message: 'Story deleted successfully' 
    });
  } catch (err) {
    console.error('Story delete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};