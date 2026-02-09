const responseHandler = require("../services/responseHandaler");
const { verifyToken } = require("../services/utils");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies["X-Acc_Tkn"] || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return responseHandler.error(res, "Unauthorized access", 401);
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return responseHandler.error(res, "Unauthorized access", 401);
        }
        req.user = decoded;
        next();
    } catch (error) {
        return responseHandler.error(res, "Unauthorized access", 401);
    }
};

module.exports = authMiddleware;