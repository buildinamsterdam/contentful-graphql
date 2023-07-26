# contentful-graphql

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Contentful GraphQL client

## Introduction

Package introduction, couple of paragraphs.

```typescript
import { createClient } from "@buildinams/contentful-graphql";

const makeQuery = createClient({
  environment: process.env.CONTENTFUL_ENV || "",
  spaceId: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  previewKey: process.env.CONTENTFUL_PREVIEW_KEY || "",
});
```

## Installation

Install this package with `npm`.

```bash
npm i @buildinams/contentful-graphql
```

## Usage

Example 1 description.

```tsx
import { createClient, adaptor } from "@buildinams/contentful-graphql";

const makeQuery = createClient({
  environment: process.env.CONTENTFUL_ENV || "",
  spaceId: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  previewKey: process.env.CONTENTFUL_PREVIEW_KEY || "",
});

export const cfAdaptor = new CFAdaptor({});

const fetchData = async (args: DataTypeArgs) => {
  const data = await makeQuery<DataType>({
    query: dataTypeGraphQLQuery,
    variables: args,
  });

  return cfAdaptor.adapt(data);
};
```

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/contentful-graphql/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/contentful-graphql.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/contentful-graphql
[ci-image]: https://github.com/buildinamsterdam/contentful-graphql/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/contentful-graphql/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/contentful-graphql.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/contentful-graphql?minimal=true
