const Initiative = require('../models/initiative');
const { deleteFile, getFileUrl } = require('../middleware/upload');
const path = require('path');

// Get all initiatives
exports.getAll = async (req, res) => {
  try {
    const data = await Initiative.findAll({
      where: { is_active: true },
      order: [['display_order', 'ASC']]
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error('Initiative getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get initiative by ID
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

// Create new initiative
exports.create = async (req, res) => {
  try {
    console.log('=== CREATE INITIATIVE ===');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Validation
    if (!req.body.name || !req.body.name.trim()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }

    // Build initiative data
    const initiativeData = {
      name: req.body.name.trim(),
      description: req.body.description ? req.body.description.trim() : null,
      website: req.body.website ? req.body.website.trim() : null,
      display_order: req.body.display_order ? parseInt(req.body.display_order) : 0,
      is_active: req.body.is_active === 'true' || req.body.is_active === true,
    };

    // Add logo URL if file was uploaded
    if (req.file) {
      // Store full URL using the helper function
      initiativeData.logo_url = getFileUrl(req, req.file.filename, 'initiatives');
    }

    console.log('Creating initiative with data:', initiativeData);

    const newItem = await Initiative.create(initiativeData);
    
    console.log('Initiative created successfully:', newItem.id);
    
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    console.error('Initiative create error:', err);
    
    // Delete uploaded file if database creation fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update initiative
exports.update = async (req, res) => {
  try {
    console.log('=== UPDATE INITIATIVE ===');
    console.log('ID:', req.params.id);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const item = await Initiative.findByPk(req.params.id);
    if (!item) {
      // Delete uploaded file if initiative not found
      if (req.file) {
        deleteFile(req.file.path);
      }
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }

    // Build update data
    const updateData = {};
    
    if (req.body.name !== undefined) {
      updateData.name = req.body.name.trim();
    }
    
    if (req.body.description !== undefined) {
      updateData.description = req.body.description.trim();
    }
    
    if (req.body.website !== undefined) {
      updateData.website = req.body.website ? req.body.website.trim() : null;
    }
    
    if (req.body.display_order !== undefined) {
      updateData.display_order = parseInt(req.body.display_order);
    }
    
    if (req.body.is_active !== undefined) {
      updateData.is_active = req.body.is_active === 'true' || req.body.is_active === true;
    }

    // Handle logo update
    if (req.file) {
      // Delete old logo file if exists
      if (item.logo_url) {
        // Extract filename from URL
        const oldFilename = item.logo_url.split('/').pop();
        const uploadDir = process.env.FILE_UPLOAD_PATH || './public/uploads';
        const oldFilePath = path.join(uploadDir, 'initiatives', oldFilename);
        deleteFile(oldFilePath);
      }
      
      // Set new logo URL
      updateData.logo_url = getFileUrl(req, req.file.filename, 'initiatives');
    }

    console.log('Updating initiative with data:', updateData);

    await item.update(updateData);
    
    console.log('Initiative updated successfully');
    
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Initiative update error:', err);
    
    // Delete uploaded file if update fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete initiative
exports.delete = async (req, res) => {
  try {
    console.log('=== DELETE INITIATIVE ===');
    console.log('ID:', req.params.id);

    const item = await Initiative.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }

    // Delete associated logo file if exists
    if (item.logo_url) {
      // Extract filename from URL
      const filename = item.logo_url.split('/').pop();
      const uploadDir = process.env.FILE_UPLOAD_PATH || './public/uploads';
      const filePath = path.join(uploadDir, 'initiatives', filename);
      deleteFile(filePath);
      console.log('Deleted logo file:', filename);
    }

    await item.destroy();
    
    console.log('Initiative deleted successfully');
    
    res.json({ success: true, message: 'Initiative deleted successfully' });
  } catch (err) {
    console.error('Initiative delete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};