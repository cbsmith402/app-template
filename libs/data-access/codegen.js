const process = require('process');

module.exports = {
  schema: [
    {
      'http://localhost:1337/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./apps/**/*.tsx', './apps/**/*.ts', './apps/**/*.graphql'],
  overwrite: true,
  generates: {
    './libs/data-access/src/lib/generated/generated.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './libs/data-access/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
