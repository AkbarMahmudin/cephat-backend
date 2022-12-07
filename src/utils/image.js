const getImageUrl = (filename, req) => {
  return filename ? `${req.protocol}://${req.get('host')}/images/${filename}` : null
}

module.exports = {
  getImageUrl
}
