const logger = exports;
logger.debugLevel = 'warn';
logger.log = function(level, message) {
  const levels = ['error', 'warn', 'debug', 'info'];
  if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel) ) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    console.log(level + ': ' + message);
  }
}
