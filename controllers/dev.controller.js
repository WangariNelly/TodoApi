exports.devTest = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Server is running',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server is down',
    });
  }
};
