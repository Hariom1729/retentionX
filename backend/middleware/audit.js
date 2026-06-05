const AuditLog = require('../models/AuditLog');

module.exports = async function(req, res, next) {
  // We want to hook into the response finish event to record the audit log
  res.on('finish', async () => {
    try {
      if (req.user && req.user.organizationId) {
        // Exclude GET requests or define which actions to log
        if (req.method !== 'GET') {
          const log = new AuditLog({
            organizationId: req.user.organizationId,
            userId: req.user.id,
            action: `${req.method} ${req.originalUrl}`,
            resource: req.originalUrl.split('/')[2] || 'unknown',
            details: {
              body: req.body,
              query: req.query,
              params: req.params,
              statusCode: res.statusCode
            }
          });
          await log.save();
        }
      }
    } catch (err) {
      console.error('Audit Log Error:', err);
    }
  });
  next();
};
