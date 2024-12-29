export const setLastVisit = (req, res, next) => {
  // 1. if cookie is set, then add a local variable with last visit time data.
  if (req.cookies.lastVisit) {
    //add variable to response which can be used in view to render that value
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  // when user send first request-if it is set or not update its last visit
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000, // milliseconds in 2 days
  });
  next();
};
