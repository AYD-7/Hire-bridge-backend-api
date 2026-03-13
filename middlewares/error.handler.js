// Global error handler
export const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Handle JWT errors
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            status: "error",
            message: "Invalid token. Please log in again.",
          });
        }
    
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            status: "error",
            message: "Your token has expired. Please log in again.",
          });
        }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};