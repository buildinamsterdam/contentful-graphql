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

```tsx
import {
  createClient,
  ContentfulAdaptor,
} from "@buildinams/contentful-graphql";

const makeQuery = createClient({
  environment: process.env.CONTENTFUL_ENV || "",
  spaceId: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  previewKey: process.env.CONTENTFUL_PREVIEW_KEY || "",
});

const Adaptor = new ContentfulAdaptor({});

const fetchData = async (args: DataTypeArgs) => {
  const data = await makeQuery<DataType>({
    query: dataTypeGraphQLQuery,
    variables: args,
  });

  return Adaptor.adapt(data);
};
```

### createClient

```typescript
import { createClient } from "@buildinams/contentful-graphql";
const makeQuery = createClient({
  environment: process.env.CONTENTFUL_ENV || "",
  spaceId: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  previewKey: process.env.CONTENTFUL_PREVIEW_KEY || "",
});
```

Create client creates a helper function that is able to send GraphQL queries to your Contentful space. The expected arguments are;

- **accessToken** - [Access token](https://www.contentful.com/developers/docs/references/authentication/) of your Contentful space
- **previewKey** - [Preview key](https://www.contentful.com/developers/docs/references/content-preview-api/) to be able to query draft data
- **spaceId** - Space to get data from
- **baseUrl** - Optional; Location of your Contentful space, defaults to; "https://graphql.contentful.com/content"
- **environment** - Optional; Environment to query, default to; "master"

### ContentfulAdaptor

```typescript
import { ContentfulAdaptor } from "@buildinams/contentful-graphql";
const Adaptor = new ContentfulAdaptor({
  contentAdaptors: {
    BlockMedia: blockMediaAdaptor,
  },
  pageAdaptors: {
    Homepage: homepageAdaptor,
  },
});
```

This generates a JavaScript class that gives you the option to adapt the data. Expected arguments;

- **contentAdaptors** - Content adaptors run recursively over the provided data. When an object matches the pattern: `{ __typename: {key} }` it will run the adaptor with the matching `{key}`.
- **pageAdaptors** - Page adaptors only run top level. These can be used if you want to format the initial data but you don't want to run to run them when they are referenced. Example; we want a `pageLayout` to contain all data but when referenced in a `cta` we don't want the page adaptor.

#### Adaptors

The concept of adaptors are generics that modifiy certain data by content type (`__typename`). Often these can follow the structure below;

```typescript
const blockMediaAdaptor = (data: ContentfulQueryResponse) => {
  return {
    type: data.file.fileType,
    src: data.src,
    ratio: data.height / data.width,
  };
};

export type BlockMedia = ReturnType<typeof blockMediaAdaptor>;
```

Within your application you can then use the `BlockMedia` type to link back to the type of data you expect to receive.

### getIndicatorProps

```typescript
import { getIndicatorProps } from "@buildinams/contentful-graphql/getIndicatorProps";
<h1 {...getIndicatorProps({ entryId: entry.sys.id, fieldId: "title" })}>
  {entry.title}
</h1>;
```

A small helper function to get [indicator mode](https://www.contentful.com/developers/docs/tutorials/general/live-preview/#set-up-inspector-mode) in Contentful preview mode. Expected arugments;

- **entryId** - ID of the linked content entry, usually `entry.sys.id`
- **fieldId** - Name of the field that's displayed
- **locale** - Optional; Locale of the displayed entry

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/contentful-graphql/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/contentful-graphql.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/contentful-graphql
[ci-image]: https://github.com/buildinamsterdam/contentful-graphql/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/contentful-graphql/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/contentful-graphql.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/contentful-graphql?minimal=true
