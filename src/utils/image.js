const getImageUrl = (filename, req) => {
  return `${req.protocol}://${req.get('host')}/images/${filename || 'no-image.svg'}`
}

module.exports = {
  getImageUrl
}
