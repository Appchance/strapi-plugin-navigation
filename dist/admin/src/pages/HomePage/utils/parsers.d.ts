import { ConfigFromServerSchema, NavigationItemSchema, NavigationItemTypeSchema, StrapiContentTypeItemSchema } from '../../../api/validators';
import { NavigationItemFormSchema } from '../components/NavigationItemForm';
export declare const transformItemToViewPayload: (payload: NavigationItemFormSchema, items: ({
    id: number;
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    order: number;
    title: string;
    documentId: string;
    uiRouterKey: string;
    menuAttached: boolean;
    collapsed: boolean;
    path?: string | null | undefined;
    additionalFields?: Record<string, unknown> | null | undefined;
    audience?: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[] | null | undefined;
    externalPath?: string | null | undefined;
    autoSync?: boolean | null | undefined;
    related?: import("zod").objectOutputType<{
        documentId: import("zod").ZodOptional<import("zod").ZodString>;
        __type: import("zod").ZodString;
    }, import("zod").ZodUnknown, "strip"> | null | undefined;
    viewId?: number | undefined;
    viewParentId?: number | undefined;
    structureId?: string | undefined;
    removed?: boolean | undefined;
    isSearchActive?: boolean | undefined;
    updated?: boolean | undefined;
} & {
    items?: NavigationItemSchema[] | null | undefined;
} & {
    viewId?: number | undefined;
})[] | undefined, config: ConfigFromServerSchema) => Array<NavigationItemSchema & {
    viewId?: number;
}>;
export declare const extractRelatedItemLabel: (item: StrapiContentTypeItemSchema, config?: ConfigFromServerSchema) => any;
export declare const isRelationCorrect: (item: Partial<NavigationItemFormSchema>) => boolean | undefined;
export declare const isRelationPublished: ({ relatedRef, relatedType, type, isCollection, }: {
    relatedRef: StrapiContentTypeItemSchema;
    relatedType?: {
        available?: boolean;
    };
    type: NavigationItemTypeSchema;
    isCollection: boolean;
}) => any;
export declare const mapServerNavigationItem: (item: NavigationItemSchema, stopAtFirstLevel?: boolean) => NavigationItemFormSchema;
