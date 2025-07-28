
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;
        if(!user || user.role !== requiredRole){
            return res.status(403).json({meesage: 'access Denied : insufficient permission'})
        }
        next();
    }
}

module.exports = authorizeRole;