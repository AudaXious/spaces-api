export const err404NotFound = (req, res) => {
    return res.status(404).json({
      error: { 
          code: 404, 
          message: "Endpoint cannot be found!" 
      },
    });
  };