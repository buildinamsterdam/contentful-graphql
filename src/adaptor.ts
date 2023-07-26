export type Adaptor = (entry: any) => any;

export type AdaptorTypes = {
  [x: string | number | symbol]: Adaptor;
};

export type ContentfulAdaptorArgs = {
  contentAdaptors: AdaptorTypes;
  pageAdaptors: AdaptorTypes;
};

export type DataObject = Record<string | number | symbol, any>;

const fallbackPageAdaptor: Adaptor = (x) => x;

/**
 * @function ContentfulAdaptor
 * @description Generate a client to adapt the provided data
 */
export class ContentfulAdaptor {
  #pageAdaptors: AdaptorTypes = {};
  #contentAdaptors: AdaptorTypes = {};

  constructor(args?: ContentfulAdaptorArgs) {
    const { contentAdaptors = {}, pageAdaptors = {} } = args || {};
    this.#contentAdaptors = contentAdaptors;
    this.#pageAdaptors = pageAdaptors;
  }

  /**
   * @function adaptContentType
   * @description
   */
  #adaptData = <T>(data: T): T | Array<unknown> | null => {
    //? Falsey data should always be null so it's parseble by NextJS, 'undefined' throws
    if (!data) return null;

    //? If we get an array loop the data so we resolved adapted data
    if (Array.isArray(data)) {
      return data.map((dataEntry: unknown) => this.#adaptData(dataEntry));
    }

    if (typeof data !== "object") return data;

    const adaptedData = Object.entries(data).reduce(
      (acc: DataObject, [key, val]) => {
        acc[key] = this.#adaptData(val);
        return acc;
      },
      {}
    );

    const adaptor = this.#contentAdaptors[adaptedData.__typename];

    if (!adaptor) return adaptedData;
    return adaptor(adaptedData);
  };

  adapt = <T>(data: T) => {
    if (typeof data !== "object" && !Array.isArray(data)) return null;

    const dataObject = data as DataObject;
    const pageAdaptor =
      this.#pageAdaptors[dataObject.__typename] || fallbackPageAdaptor;
    return pageAdaptor(this.#adaptData(dataObject));
  };
}
