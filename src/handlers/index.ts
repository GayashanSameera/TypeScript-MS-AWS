import { EDomains, EESIndexes } from '../types';

/**
 * Validate Elasticsearch index name
 *
 * @param {string} domain - domain name
 * @description this function will validate the existence of domain name
 * @returns {string|null} esindex - esindex name mapped to provided domain
 */
export const whichIndex = (domain: string): string => {
  const _domain: string = domain.toLowerCase();

  if (!EDomains[_domain]) throw Error('Unidentified domain provided!');

  if (EESIndexes[_domain]) return EESIndexes[_domain];

  return null;
};

export const mapIndex = () => Object.keys(EDomains).map(key => EESIndexes[EDomains[key]]);
