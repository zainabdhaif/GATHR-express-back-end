const isAdmin = (req, res, next) => {
    try{
        const token = req.headers.authorization.split('')[1];
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        const type = tokenPayload.type;
        if (type === 'admin')
        next ()
    }catch (err) {
        res.status(401).json({ message: 'Invalid access' });
      }
}

module.exports = isAdmin;