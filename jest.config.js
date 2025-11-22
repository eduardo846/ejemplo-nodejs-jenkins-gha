module.exports = {
  testEnvironment: "node",
  coverageDirectory: 'coverage',
  collectCoverageFrom:[
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  testMatch:[
    '**/*.test.js'
  ],
  coverageReporters:['text','lcov','html'],
  reporters:[
    'default',
    ['jest-junit',{
        outputDirectory:'coverage',
        outputName:'junit.xml'
    }]
  ]
};
