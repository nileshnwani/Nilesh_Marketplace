import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  // Generating a JWT token for the authenticated user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h'
  });

  // Setting the JWT as an HTTP-only cookie for enhanced security
res.cookie('jwt', token, {
  httpOnly: true,              // Prevents JavaScript access to the cookie
  secure: true,                // Ensures it's only sent over HTTPS
  sameSite: 'strict',          // Blocks cross-site cookie usage (strong security)
  maxAge: req.body.remember 
         ? 365 * 24 * 60 * 60 * 1000  // 1 year in ms
         : 24 * 60 * 60 * 1000        // 1 day in ms
});

