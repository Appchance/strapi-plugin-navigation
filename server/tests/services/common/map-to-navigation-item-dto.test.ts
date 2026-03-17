import { Core } from '@strapi/strapi';

import { getGenericRepository } from '../../../src/repositories';
import commonService from '../../../src/services/common/common';
import { asProxy } from '../../utils';

jest.mock('../../../src/repositories', () => {
  const actual = jest.requireActual('../../../src/repositories');

  return {
    ...actual,
    getGenericRepository: jest.fn(),
  };
});

describe('Navigation', () => {
  describe('Server', () => {
    describe('Common service', () => {
      describe('mapToNavigationItemDTO()', () => {
        const RELATED_COLLECTION_UID = 'api::article.article';
        const getStore = jest.fn();
        const store = jest.fn().mockReturnValue({ get: getStore });
        const strapi = asProxy<Core.Strapi>({});

        const findManyById = jest.fn();
        const mockedGetGenericRepository = getGenericRepository as jest.Mock;

        const config = {
          additionalFields: [],
          allowedLevels: 1,
          contentTypes: [RELATED_COLLECTION_UID],
          defaultContentType: RELATED_COLLECTION_UID,
          contentTypesNameFields: {
            [RELATED_COLLECTION_UID]: ['title'],
          },
          contentTypesPopulate: {
            [RELATED_COLLECTION_UID]: ['cover'],
          },
          gql: {
            navigationItemRelated: [],
          },
          pathDefaultFields: {},
          cascadeMenuAttached: false,
          preferCustomContentTypes: false,
        };

        beforeEach(() => {
          jest.clearAllMocks();

          (global as any).strapi = { store } as unknown as Core.Strapi;
          getStore.mockResolvedValue(config);
          mockedGetGenericRepository.mockReturnValue({
            findManyById,
          });
          findManyById.mockResolvedValue([]);
        });

        it('should make one query for one object', async () => {
          const service = commonService({ strapi });

          await service.mapToNavigationItemDTO({
            locale: 'en',
            navigationItems: [
              {
                related: {
                  __type: RELATED_COLLECTION_UID,
                  documentId: 'doc-1',
                },
                items: [],
              },
            ] as any,
            populate: [],
            status: 'published',
          });

          expect(mockedGetGenericRepository).toHaveBeenCalledTimes(1);
          expect(mockedGetGenericRepository.mock.calls[0][1]).toBe(RELATED_COLLECTION_UID);
          expect(mockedGetGenericRepository.mock.calls[0][0]?.strapi?.store).toBe(store);
          expect(findManyById).toHaveBeenCalledTimes(1);
          expect(findManyById).toHaveBeenCalledWith(['doc-1'], ['cover'], 'published', 'en');
        });

        it('should make one query for three objects of the same type', async () => {
          const service = commonService({ strapi });

          await service.mapToNavigationItemDTO({
            locale: 'en',
            navigationItems: [
              {
                related: {
                  __type: RELATED_COLLECTION_UID,
                  documentId: 'doc-1',
                },
                items: [],
              },
              {
                related: {
                  __type: RELATED_COLLECTION_UID,
                  documentId: 'doc-2',
                },
                items: [],
              },
              {
                related: {
                  __type: RELATED_COLLECTION_UID,
                  documentId: 'doc-3',
                },
                items: [],
              },
            ] as any,
            populate: [],
            status: 'published',
          });

          expect(mockedGetGenericRepository).toHaveBeenCalledTimes(1);
          expect(mockedGetGenericRepository.mock.calls[0][1]).toBe(RELATED_COLLECTION_UID);
          expect(mockedGetGenericRepository.mock.calls[0][0]?.strapi?.store).toBe(store);
          expect(findManyById).toHaveBeenCalledTimes(1);
          expect(findManyById.mock.calls[0][0]).toEqual(
            expect.arrayContaining(['doc-1', 'doc-2', 'doc-3'])
          );
          expect(findManyById.mock.calls[0][0]).toHaveLength(3);
        });

        it('should return empty array and not throw when objects are missing', async () => {
          const service = commonService({ strapi });

          await expect(
            service.mapToNavigationItemDTO({
              locale: 'en',
              navigationItems: [],
              populate: [],
              status: 'published',
            })
          ).resolves.toEqual([]);

          expect(mockedGetGenericRepository).not.toHaveBeenCalled();
          expect(findManyById).not.toHaveBeenCalled();
        });
      });
    });
  });
});
