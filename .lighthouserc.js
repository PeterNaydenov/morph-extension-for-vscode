module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        'categories:accessibility': ['warn', {minScore: 0.9}],
        'categories:performance': ['warn', {minScore: 0.8}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
