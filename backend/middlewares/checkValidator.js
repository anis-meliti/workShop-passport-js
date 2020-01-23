const { check, validationResult } = require('express-validator');

exports.validationRule = () => [
  check('login', 'this field is required').notEmpty(),
  check('password', 'this field is required').notEmpty(),
  check('password', 'min length is 6 char').isLength({ min: 6 })
];
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors) return res.status(400).json({ msg: errors.array() });
  return next();
};
