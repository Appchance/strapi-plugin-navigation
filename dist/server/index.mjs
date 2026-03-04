import * as ol from "lodash";
import H, { kebabCase as Up } from "lodash";
import St, { z as Bp } from "zod";
import { union as Hp, getOr as qp, has as Lr, assoc as Gp, assign as Yp, remove as Wp, eq as po, cloneDeep as bt, curry as ft, isObject as Ne, isNil as Y, clone as zp, isArray as Oe, toPath as ho, isEmpty as Ze, defaults as sl, toNumber as hr, isInteger as Da, isString as Fe, get as Ma, isBoolean as Kp, pick as gu, omit as jr, trim as kr, pipe as La, split as ja, map as Qp, flatten as Vp, first as ul, constant as ka, identity as Xp, join as Zp, merge as Dn, trimChars as Jp, trimCharsEnd as eh, trimCharsStart as th, isNumber as nh } from "lodash/fp";
import Qn from "crypto";
import Ur from "child_process";
import Br from "lodash/has";
import cl from "lodash/mapValues";
import yu from "lodash/snakeCase";
import rh from "lodash/camelCase";
import ih from "lodash/mapKeys";
import yi from "os";
import Me from "path";
import Ft from "fs";
import ll from "assert";
import ah from "events";
import oh from "buffer";
import vi from "stream";
import Jt from "util";
import sh from "constants";
import { Writable as uh } from "node:stream";
import wi from "@sindresorhus/slugify";
import * as Q from "zod/v4";
import ch from "pluralize";
var F = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function lh(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var r = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(n, i, r.get ? r : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), n;
}
var fl = {}, oa = {}, Mn = {}, et = {}, dl = {};
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(c, l, f, d) {
    d === void 0 && (d = f);
    var p = Object.getOwnPropertyDescriptor(l, f);
    (!p || ("get" in p ? !l.__esModule : p.writable || p.configurable)) && (p = { enumerable: !0, get: function() {
      return l[f];
    } }), Object.defineProperty(c, d, p);
  } : function(c, l, f, d) {
    d === void 0 && (d = f), c[d] = l[f];
  }), n = F && F.__setModuleDefault || (Object.create ? function(c, l) {
    Object.defineProperty(c, "default", { enumerable: !0, value: l });
  } : function(c, l) {
    c.default = l;
  }), i = F && F.__importStar || /* @__PURE__ */ function() {
    var c = function(l) {
      return c = Object.getOwnPropertyNames || function(f) {
        var d = [];
        for (var p in f) Object.prototype.hasOwnProperty.call(f, p) && (d[d.length] = p);
        return d;
      }, c(l);
    };
    return function(l) {
      if (l && l.__esModule) return l;
      var f = {};
      if (l != null) for (var d = c(l), p = 0; p < d.length; p++) d[p] !== "default" && t(f, l, d[p]);
      return n(f, l), f;
    };
  }();
  Object.defineProperty(e, "__esModule", { value: !0 }), e.configSchema = e.navigationItemAdditionalField = e.navigationItemCustomField = void 0;
  const r = i(St), o = r.object({
    name: r.string({ required_error: "requiredError" }).nonempty("requiredError").refine((c) => !c.includes(" "), { message: "noSpaceError" }),
    label: r.string({ required_error: "requiredError" }).nonempty("requiredError"),
    description: r.string().optional(),
    placeholder: r.string().optional(),
    required: r.boolean().optional(),
    enabled: r.boolean().optional()
  }), a = o.extend({
    type: r.literal("select"),
    multi: r.boolean(),
    options: r.array(r.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
  }), s = o.extend({
    type: r.enum(["boolean", "string"]),
    multi: r.literal(!1).optional(),
    options: r.array(r.string()).max(0).optional()
  }), u = o.extend({
    type: r.literal("media"),
    multi: r.literal(!1).optional(),
    options: r.array(r.string()).max(0).optional()
  });
  e.navigationItemCustomField = r.discriminatedUnion("type", [
    s,
    u,
    a
  ]), e.navigationItemAdditionalField = r.union([
    r.literal("audience"),
    e.navigationItemCustomField
  ]), e.configSchema = r.object({
    additionalFields: r.array(e.navigationItemAdditionalField),
    allowedLevels: r.number(),
    contentTypes: r.array(r.string()),
    defaultContentType: r.string().optional(),
    contentTypesNameFields: r.record(r.string(), r.array(r.string())),
    contentTypesPopulate: r.record(r.string(), r.array(r.string())),
    gql: r.object({
      navigationItemRelated: r.array(r.string())
    }),
    pathDefaultFields: r.record(r.string(), r.any()),
    cascadeMenuAttached: r.boolean(),
    preferCustomContentTypes: r.boolean(),
    isCacheEnabled: r.boolean().optional()
  });
})(dl);
var Ua = {};
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(s, u, c, l) {
    l === void 0 && (l = c);
    var f = Object.getOwnPropertyDescriptor(u, c);
    (!f || ("get" in f ? !u.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
      return u[c];
    } }), Object.defineProperty(s, l, f);
  } : function(s, u, c, l) {
    l === void 0 && (l = c), s[l] = u[c];
  }), n = F && F.__setModuleDefault || (Object.create ? function(s, u) {
    Object.defineProperty(s, "default", { enumerable: !0, value: u });
  } : function(s, u) {
    s.default = u;
  }), i = F && F.__importStar || /* @__PURE__ */ function() {
    var s = function(u) {
      return s = Object.getOwnPropertyNames || function(c) {
        var l = [];
        for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (l[l.length] = f);
        return l;
      }, s(u);
    };
    return function(u) {
      if (u && u.__esModule) return u;
      var c = {};
      if (u != null) for (var l = s(u), f = 0; f < l.length; f++) l[f] !== "default" && t(c, u, l[f]);
      return n(c, u), c;
    };
  }();
  Object.defineProperty(e, "__esModule", { value: !0 }), e.updateNavigationSchema = e.updateNavigationItemsSchema = e.updateNavigationItemSchema = e.createNavigationSchema = e.navigationDBSchema = e.navigationItemsDBSchema = e.navigationItemDBSchema = e.readNavigationItemFromLocaleSchema = e.navigationItemType = e.audienceDBSchema = void 0;
  const r = i(St);
  e.audienceDBSchema = r.object({
    id: r.number(),
    documentId: r.string(),
    name: r.string(),
    key: r.string()
  }), e.navigationItemType = r.enum(["INTERNAL", "EXTERNAL", "WRAPPER"]);
  const o = r.object({
    id: r.number(),
    documentId: r.string(),
    title: r.string(),
    type: e.navigationItemType,
    path: r.string().or(r.null()).optional(),
    slug: r.string().or(r.null()).optional(),
    externalPath: r.string().or(r.null()).optional(),
    uiRouterKey: r.string(),
    menuAttached: r.boolean(),
    order: r.number().int(),
    collapsed: r.boolean(),
    related: r.object({ documentId: r.string().optional(), __type: r.string() }).catchall(r.unknown()).nullish().optional(),
    additionalFields: r.record(r.string(), r.unknown()).or(r.null()).optional(),
    audience: r.array(e.audienceDBSchema).or(r.null()).optional(),
    autoSync: r.boolean().or(r.null()).optional()
  });
  e.readNavigationItemFromLocaleSchema = o.omit({
    related: !0
  }).pick({
    path: !0,
    type: !0,
    uiRouterKey: !0,
    title: !0,
    externalPath: !0
  }).extend({ related: r.unknown().optional() }), e.navigationItemDBSchema = o.extend({
    parent: r.lazy(() => e.navigationItemDBSchema.or(r.null())).optional(),
    items: r.lazy(() => e.navigationItemDBSchema.array()).optional(),
    master: r.lazy(() => (0, e.navigationDBSchema)(!1)).optional()
  }), e.navigationItemsDBSchema = r.array(e.navigationItemDBSchema);
  const a = (s) => r.object({
    id: r.number(),
    documentId: r.string(),
    name: r.string(),
    slug: r.string(),
    locale: r.string(),
    visible: r.boolean(),
    items: s ? r.array(e.navigationItemDBSchema) : e.navigationItemDBSchema.array().optional()
  });
  e.navigationDBSchema = a, e.createNavigationSchema = (0, e.navigationDBSchema)(!1).omit({
    items: !0,
    id: !0,
    documentId: !0,
    slug: !0,
    locale: !0
  }).extend({
    documentId: r.string().optional(),
    id: r.undefined().optional()
  }), e.updateNavigationItemSchema = o.omit({ id: !0, documentId: !0 }).extend({
    id: r.number().optional(),
    documentId: r.string().optional(),
    items: r.lazy(() => e.updateNavigationItemsSchema).or(r.null()).optional(),
    updated: r.boolean().optional(),
    removed: r.boolean().optional()
  }), e.updateNavigationItemsSchema = r.array(e.updateNavigationItemSchema), e.updateNavigationSchema = (0, e.navigationDBSchema)(!1).extend({
    items: e.updateNavigationItemsSchema
  }).partial().required({
    id: !0,
    documentId: !0
  });
})(Ua);
var pl = {};
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(o, a, s, u) {
    u === void 0 && (u = s);
    var c = Object.getOwnPropertyDescriptor(a, s);
    (!c || ("get" in c ? !a.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return a[s];
    } }), Object.defineProperty(o, u, c);
  } : function(o, a, s, u) {
    u === void 0 && (u = s), o[u] = a[s];
  }), n = F && F.__setModuleDefault || (Object.create ? function(o, a) {
    Object.defineProperty(o, "default", { enumerable: !0, value: a });
  } : function(o, a) {
    o.default = a;
  }), i = F && F.__importStar || /* @__PURE__ */ function() {
    var o = function(a) {
      return o = Object.getOwnPropertyNames || function(s) {
        var u = [];
        for (var c in s) Object.prototype.hasOwnProperty.call(s, c) && (u[u.length] = c);
        return u;
      }, o(a);
    };
    return function(a) {
      if (a && a.__esModule) return a;
      var s = {};
      if (a != null) for (var u = o(a), c = 0; c < u.length; c++) u[c] !== "default" && t(s, a, u[c]);
      return n(s, a), s;
    };
  }();
  Object.defineProperty(e, "__esModule", { value: !0 }), e.contentTypeSchema = e.contentTypeFullSchema = e.contentTypeAttributes = e.contentTypeRelationAttribute = e.contentTypeRelationType = e.contentTypeMediaAttribute = e.contentTypeUidAttribute = e.contentTypeDynamicZoneAttribute = e.contentTypeComponentAttribute = e.contentTypeEnumerationAttribute = e.simpleContentTypeAttribute = e.contentTypeFieldTypeSchema = e.contentTypeAttributeValidator = e.contentTypeInfo = e.contentType = void 0;
  const r = i(St);
  e.contentType = r.enum(["collectionType", "singleType"]), e.contentTypeInfo = r.object({
    singularName: r.string(),
    pluralName: r.string(),
    displayName: r.string(),
    description: r.string().optional(),
    name: r.string().optional()
  }), e.contentTypeAttributeValidator = r.object({
    required: r.boolean().optional(),
    max: r.number().optional(),
    min: r.number().optional(),
    minLength: r.number().optional(),
    maxLength: r.number().optional(),
    private: r.boolean().optional(),
    configurable: r.boolean().optional(),
    default: r.any().optional()
  }), e.contentTypeFieldTypeSchema = r.enum([
    "string",
    "text",
    "richtext",
    "blocks",
    "email",
    "password",
    "date",
    "time",
    "datetime",
    "timestamp",
    "boolean",
    "integer",
    "biginteger",
    "float",
    "decimal",
    "json",
    "relation",
    "media"
  ]), e.simpleContentTypeAttribute = e.contentTypeAttributeValidator.extend({
    type: e.contentTypeFieldTypeSchema
  }), e.contentTypeEnumerationAttribute = e.contentTypeAttributeValidator.extend({
    type: r.literal("enumeration"),
    enum: r.string().array()
  }), e.contentTypeComponentAttribute = r.object({
    type: r.literal("component"),
    component: r.string(),
    repeatable: r.boolean().optional()
  }), e.contentTypeDynamicZoneAttribute = r.object({
    type: r.literal("dynamiczone"),
    components: r.string().array()
  }), e.contentTypeUidAttribute = r.object({
    type: r.literal("uid")
  }), e.contentTypeMediaAttribute = r.object({
    type: r.literal("media"),
    allowedTypes: r.enum(["images", "videos", "audios", "files"]).array(),
    required: r.boolean().optional()
  }), e.contentTypeRelationType = r.enum([
    "oneToOne",
    "oneToMany",
    "manyToOne",
    "manyToMany",
    "morphToMany",
    "manyToMorph"
  ]), e.contentTypeRelationAttribute = r.object({
    type: r.literal("relation"),
    relation: e.contentTypeRelationType,
    target: r.string(),
    mappedBy: r.string().optional(),
    inversedBy: r.string().optional()
  }), e.contentTypeAttributes = r.record(r.string(), r.union([
    e.simpleContentTypeAttribute,
    e.contentTypeEnumerationAttribute,
    e.contentTypeComponentAttribute,
    e.contentTypeDynamicZoneAttribute,
    e.contentTypeRelationAttribute,
    e.contentTypeMediaAttribute,
    e.contentTypeUidAttribute
  ])), e.contentTypeFullSchema = r.object({
    kind: e.contentType,
    collectionName: r.string(),
    info: e.contentTypeInfo,
    options: r.object({
      draftAndPublish: r.boolean().optional(),
      hidden: r.boolean().optional(),
      templateName: r.string().optional()
    }).optional(),
    attributes: e.contentTypeAttributes,
    actions: r.record(r.string(), r.any()).optional(),
    lifecycles: r.record(r.string(), r.any()).optional(),
    uid: r.string(),
    apiName: r.string().optional(),
    // TODO?: remove
    associations: r.object({
      model: r.string(),
      alias: r.string()
    }).array().optional(),
    modelName: r.string().optional(),
    plugin: r.string().optional(),
    pluginOptions: r.record(r.string(), r.any()).optional(),
    isSingle: r.boolean().optional()
  }), e.contentTypeSchema = e.contentTypeFullSchema.pick({
    info: !0,
    kind: !0,
    attributes: !0,
    options: !0
  });
})(pl);
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(d, p, h, m) {
    m === void 0 && (m = h);
    var g = Object.getOwnPropertyDescriptor(p, h);
    (!g || ("get" in g ? !p.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return p[h];
    } }), Object.defineProperty(d, m, g);
  } : function(d, p, h, m) {
    m === void 0 && (m = h), d[m] = p[h];
  }), n = F && F.__exportStar || function(d, p) {
    for (var h in d) h !== "default" && !Object.prototype.hasOwnProperty.call(p, h) && t(p, d, h);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DynamicSchemas = e.updateUpdateNavigationSchema = e.updateCreateNavigationSchema = e.updateNavigationItemCustomField = e.updateNavigationItemAdditionalField = e.updateConfigSchema = e.updateNavigationItemsSchema = e.updateNavigationItemSchema = e.readNavigationItemFromLocaleSchema = e.navigationItemType = e.navigationItemsDBSchema = e.navigationItemDBSchema = e.navigationDBSchema = e.audienceDBSchema = void 0;
  const i = dl, r = Ua;
  n(pl, e);
  var o = Ua;
  Object.defineProperty(e, "audienceDBSchema", { enumerable: !0, get: function() {
    return o.audienceDBSchema;
  } }), Object.defineProperty(e, "navigationDBSchema", { enumerable: !0, get: function() {
    return o.navigationDBSchema;
  } }), Object.defineProperty(e, "navigationItemDBSchema", { enumerable: !0, get: function() {
    return o.navigationItemDBSchema;
  } }), Object.defineProperty(e, "navigationItemsDBSchema", { enumerable: !0, get: function() {
    return o.navigationItemsDBSchema;
  } }), Object.defineProperty(e, "navigationItemType", { enumerable: !0, get: function() {
    return o.navigationItemType;
  } }), Object.defineProperty(e, "readNavigationItemFromLocaleSchema", { enumerable: !0, get: function() {
    return o.readNavigationItemFromLocaleSchema;
  } }), Object.defineProperty(e, "updateNavigationItemSchema", { enumerable: !0, get: function() {
    return o.updateNavigationItemSchema;
  } }), Object.defineProperty(e, "updateNavigationItemsSchema", { enumerable: !0, get: function() {
    return o.updateNavigationItemsSchema;
  } });
  const a = (d, p) => (h) => {
    p(h(d()));
  };
  let s = i.configSchema;
  e.updateConfigSchema = a(() => s, (d) => {
    s = d;
  });
  let u = i.navigationItemAdditionalField;
  e.updateNavigationItemAdditionalField = a(() => u, (d) => {
    u = d;
  });
  let c = i.navigationItemCustomField;
  e.updateNavigationItemCustomField = a(() => c, (d) => {
    c = d;
  });
  let l = r.createNavigationSchema;
  e.updateCreateNavigationSchema = a(() => l, (d) => {
    l = d;
  });
  let f = r.updateNavigationSchema;
  e.updateUpdateNavigationSchema = a(() => f, (d) => {
    f = d;
  }), e.DynamicSchemas = {
    get configSchema() {
      return s;
    },
    get navigationItemAdditionalField() {
      return u;
    },
    get navigationItemCustomField() {
      return c;
    },
    get createNavigationSchema() {
      return l;
    },
    get updateNavigationSchema() {
      return f;
    }
  };
})(et);
var xe = {}, we = {};
Object.defineProperty(we, "__esModule", { value: !0 });
we.FORBIDDEN_CUSTOM_FIELD_NAMES = we.DEFAULT_POPULATE = we.KIND_TYPES = we.CONTENT_TYPES_NAME_FIELDS_DEFAULTS = we.RESTRICTED_CONTENT_TYPES = we.ALLOWED_CONTENT_TYPES = we.RELATED_ITEM_SEPARATOR = we.allLifecycleHooks = we.UID_REGEX = void 0;
we.UID_REGEX = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i;
we.allLifecycleHooks = [
  "beforeCreate",
  "beforeCreateMany",
  "afterCreate",
  "afterCreateMany",
  "beforeUpdate",
  "beforeUpdateMany",
  "afterUpdate",
  "afterUpdateMany",
  "beforeDelete",
  "beforeDeleteMany",
  "afterDelete",
  "afterDeleteMany",
  "beforeCount",
  "afterCount",
  "beforeFindOne",
  "afterFindOne",
  "beforeFindMany",
  "afterFindMany"
];
we.RELATED_ITEM_SEPARATOR = "$";
we.ALLOWED_CONTENT_TYPES = ["api::", "plugin::"];
we.RESTRICTED_CONTENT_TYPES = [
  "admin::",
  "plugin::content-releases",
  "plugin::i18n.locale",
  "plugin::navigation",
  "plugin::review-workflows",
  "plugin::users-permissions",
  "plugin::upload.folder"
];
we.CONTENT_TYPES_NAME_FIELDS_DEFAULTS = ["title", "subject", "name"];
we.KIND_TYPES = { SINGLE: "singleType", COLLECTION: "collectionType" };
we.DEFAULT_POPULATE = [];
we.FORBIDDEN_CUSTOM_FIELD_NAMES = [
  "title",
  "type",
  "path",
  "externalPath",
  "uiRouterKey",
  "menuAttached",
  "order",
  "collapsed",
  "related",
  "parent",
  "master",
  "audience",
  "additionalFields"
];
var hl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.singularize = e.isContentTypeEligible = e.parsePopulateQuery = e.getPluginModels = e.buildAllHookListeners = e.buildHookListener = e.resolveGlobalLikeId = e.assertNotEmpty = e.validateAdditionalFields = e.getCustomFields = void 0, e.assertConfig = c, e.getPluginService = p;
  const t = H, n = et, i = we, r = (v) => v.filter((w) => w !== "audience");
  e.getCustomFields = r;
  const o = (v) => {
    const w = (0, e.getCustomFields)(v);
    if (w.length !== (0, t.uniqBy)(w, "name").length)
      throw new Error("All names of custom fields must be unique.");
    if (!(0, t.isNil)((0, t.find)(w, (A) => typeof A == "object" && (0, t.includes)(i.FORBIDDEN_CUSTOM_FIELD_NAMES, A.name))))
      throw new Error(`Name of custom field cannot be one of: ${i.FORBIDDEN_CUSTOM_FIELD_NAMES.join(", ")}`);
  };
  e.validateAdditionalFields = o;
  const a = (v, w) => {
    if (v == null)
      throw w ?? new Error("Non-empty value expected, empty given");
  };
  e.assertNotEmpty = a;
  const s = (v = "") => {
    const w = (b) => b.split("-").map((O) => (0, t.capitalize)(O)).join(""), [A, C, x] = u(v);
    return A === "api" ? w(x) : `${w(C)}${w(x)}`;
  };
  e.resolveGlobalLikeId = s;
  const u = (v = "") => v.split(i.UID_REGEX).filter((w) => w && w.length > 0);
  function c(v) {
    if (!n.DynamicSchemas.configSchema.safeParse(v).success)
      throw new Error("Navigation plugin schema invalid");
  }
  const l = (v, w) => (A) => [
    A,
    async (C) => {
      await p(w, "common").runLifeCycleHook({
        contentTypeName: v,
        hookName: A,
        event: C
      });
    }
  ];
  e.buildHookListener = l;
  const f = (v, w) => Object.fromEntries(i.allLifecycleHooks.map((0, e.buildHookListener)(v, w)));
  e.buildAllHookListeners = f;
  const d = ({ strapi: v }) => {
    const w = v.plugin("navigation");
    return {
      masterModel: w.contentType("navigation"),
      itemModel: w.contentType("navigation-item"),
      relatedModel: w.contentType("navigations-items-related"),
      audienceModel: w.contentType("audience")
    };
  };
  e.getPluginModels = d;
  function p({ strapi: v }, w) {
    return v.plugin("navigation").service(w);
  }
  const h = (v) => v === "*" ? "*" : typeof v == "string" ? [v] : v === !1 ? [] : v === !0 ? "*" : v;
  e.parsePopulateQuery = h;
  const m = (v = "") => {
    const w = !!i.ALLOWED_CONTENT_TYPES.find((C) => v.includes(C)), A = !i.RESTRICTED_CONTENT_TYPES.find((C) => v.includes(C) || v === C);
    return !!v && w && A;
  };
  e.isContentTypeEligible = m;
  const g = (v = "") => (0, t.last)(v) === "s" ? v.substr(0, v.length - 1) : v;
  e.singularize = g;
})(hl);
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(i, r, o, a) {
    a === void 0 && (a = o);
    var s = Object.getOwnPropertyDescriptor(r, o);
    (!s || ("get" in s ? !r.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
      return r[o];
    } }), Object.defineProperty(i, a, s);
  } : function(i, r, o, a) {
    a === void 0 && (a = o), i[a] = r[o];
  }), n = F && F.__exportStar || function(i, r) {
    for (var o in i) o !== "default" && !Object.prototype.hasOwnProperty.call(r, o) && t(r, i, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(we, e), n(hl, e);
})(xe);
var vu;
function fh() {
  if (vu) return Mn;
  vu = 1;
  var e = F && F.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.configSetup = void 0;
  const t = H, n = e(bi()), i = et, r = xe, o = async ({ strapi: u, forceDefault: c = !1 }) => {
    var l;
    const f = u.store({
      type: "plugin",
      name: "navigation"
    }), d = await u.plugin("navigation").config, p = c ? {} : {
      ...n.default.default,
      ...(l = await f.get({
        key: "config"
      })) !== null && l !== void 0 ? l : n.default.default
    };
    let h = (0, t.isEmpty)(p) ? p : i.DynamicSchemas.configSchema.parse(p);
    const m = a(h, d);
    return h = {
      additionalFields: m("additionalFields"),
      contentTypes: m("contentTypes"),
      contentTypesNameFields: m("contentTypesNameFields"),
      contentTypesPopulate: m("contentTypesPopulate"),
      defaultContentType: m("defaultContentType"),
      allowedLevels: m("allowedLevels"),
      gql: m("gql"),
      pathDefaultFields: m("pathDefaultFields"),
      cascadeMenuAttached: m("cascadeMenuAttached"),
      preferCustomContentTypes: m("preferCustomContentTypes"),
      isCacheEnabled: m("isCacheEnabled")
    }, s(h, { strapi: u }), (0, r.validateAdditionalFields)(h.additionalFields), await f.set({
      key: "config",
      value: h
    }), h;
  };
  Mn.configSetup = o;
  const a = (u, c) => (l) => {
    var f;
    const d = (f = u?.[l]) !== null && f !== void 0 ? f : c(l);
    return (0, r.assertNotEmpty)(d, new Error(`[Navigation] Config "${l}" is undefined`)), d;
  }, s = (u, { strapi: c }) => {
    const l = u.contentTypes.filter((d) => !c.contentTypes[d]);
    if (l.length === 0)
      return;
    const f = l.map(r.resolveGlobalLikeId);
    u.contentTypes = u.contentTypes.filter((d) => !l.includes(d)), u.contentTypesNameFields = Object.fromEntries(Object.entries(u.contentTypesNameFields).filter(([d]) => !l.includes(d))), u.gql.navigationItemRelated = u.gql.navigationItemRelated.filter((d) => !f.includes(d));
  };
  return Mn;
}
var wu;
function bi() {
  return wu || (wu = 1, function(e) {
    var t = F && F.__createBinding || (Object.create ? function(i, r, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(r, o);
      (!s || ("get" in s ? !r.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return r[o];
      } }), Object.defineProperty(i, a, s);
    } : function(i, r, o, a) {
      a === void 0 && (a = o), i[a] = r[o];
    }), n = F && F.__exportStar || function(i, r) {
      for (var o in i) o !== "default" && !Object.prototype.hasOwnProperty.call(r, o) && t(r, i, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), n(fh(), e), e.default = {
      default: {
        additionalFields: [],
        allowedLevels: 2,
        contentTypes: [],
        defaultContentType: "",
        contentTypesNameFields: {},
        contentTypesPopulate: {},
        gql: {
          navigationItemRelated: []
        },
        pathDefaultFields: {},
        pruneObsoleteI18nNavigations: !1,
        cascadeMenuAttached: !0,
        preferCustomContentTypes: !1,
        isCacheEnabled: !1
      }
    };
  }(oa)), oa;
}
var _i = {}, An = {}, Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
Ei.getAudienceRepository = void 0;
const dh = H, ph = et, hh = xe;
Ei.getAudienceRepository = (0, dh.once)((e) => ({
  find(t, n) {
    const { audienceModel: { uid: i } } = (0, hh.getPluginModels)(e);
    return e.strapi.query(i).findMany({ where: t, limit: n }).then(ph.audienceDBSchema.array().parse);
  }
}));
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.getGenericRepository = void 0;
const mr = xe, mh = (e, t) => ({
  findFirst(n, i, r = {}) {
    return e.strapi.documents(t).findFirst({ populate: (0, mr.parsePopulateQuery)(n), status: i, ...r });
  },
  findById(n, i, r, o = {}) {
    return e.strapi.documents(t).findOne({ documentId: n, populate: (0, mr.parsePopulateQuery)(i), status: r, ...o });
  },
  findManyById(n, i, r, o) {
    return e.strapi.documents(t).findMany({
      where: { documentId: { $in: n } },
      populate: (0, mr.parsePopulateQuery)(i),
      status: r,
      locale: o
    });
  },
  findMany(n, i, r, o) {
    return e.strapi.documents(t).findMany({ where: n, populate: (0, mr.parsePopulateQuery)(i), status: r, locale: o });
  },
  count(n, i) {
    return e.strapi.documents(t).count({
      where: n,
      status: i
    });
  }
});
nr.getGenericRepository = mh;
var mo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.flattenRelated = e.removeSensitiveFields = e.getNavigationItemRepository = void 0;
  const t = H, n = et, i = xe, r = nr;
  e.getNavigationItemRepository = (0, t.once)((u) => ({
    async save({ item: c, locale: l }) {
      var f;
      const { itemModel: d } = (0, i.getPluginModels)(u), { __type: p, documentId: h } = (f = c?.related) !== null && f !== void 0 ? f : {}, m = p ? (0, r.getGenericRepository)(u, p) : void 0, g = p && m ? h ? await m.findById(h, void 0, void 0, { locale: l }) : await m.findFirst(void 0, void 0, { locale: l }) : void 0;
      if (typeof c.documentId == "string") {
        const { documentId: v, ...w } = c;
        return u.strapi.documents(d.uid).update({
          documentId: c.documentId,
          data: {
            ...w,
            related: g ? { ...g, __type: p } : void 0
          },
          locale: l
        });
      } else
        return u.strapi.documents(d.uid).create({
          data: {
            ...c,
            related: g ? { ...g, __type: p } : void 0
          },
          locale: l
        });
    },
    find({ filters: c, locale: l, limit: f, order: d, populate: p }) {
      const { itemModel: h } = (0, i.getPluginModels)(u);
      return u.strapi.documents(h.uid).findMany({ filters: c, locale: l, limit: f, populate: p, orderBy: d }).then((m) => m.map(e.flattenRelated)).then(n.navigationItemsDBSchema.parse).then((m) => m.map(e.removeSensitiveFields));
    },
    findV4({ filters: c, locale: l, limit: f, order: d, populate: p }) {
      const { itemModel: h } = (0, i.getPluginModels)(u);
      return u.strapi.documents(h.uid).findMany({ filters: c, locale: l, limit: f, populate: p, orderBy: d });
    },
    count(c) {
      const { itemModel: l } = (0, i.getPluginModels)(u);
      return u.strapi.query(l.uid).count({ where: c });
    },
    remove(c) {
      const { itemModel: l } = (0, i.getPluginModels)(u);
      return u.strapi.documents(l.uid).delete({
        documentId: c.documentId,
        populate: "*"
      });
    },
    removeForIds(c) {
      const { itemModel: l } = (0, i.getPluginModels)(u);
      return c.map((f) => u.strapi.documents(l.uid).delete({ documentId: f, populate: "*" }));
    },
    findForMasterIds(c) {
      const { itemModel: l } = (0, i.getPluginModels)(u);
      return u.strapi.query(l.uid).findMany({
        where: {
          $or: c.map((f) => ({ master: f }))
        },
        limit: Number.MAX_SAFE_INTEGER
      }).then(n.navigationItemsDBSchema.parse);
    }
  }));
  const o = ["id", "publishedAt", "createdAt", "updatedAt", "locale"], a = ({ related: u, items: c = [], ...l }) => ({
    ...l,
    items: c.map(e.removeSensitiveFields),
    related: u ? (0, t.omit)(u, o) : void 0
  });
  e.removeSensitiveFields = a;
  const s = ({ related: u, ...c }) => ({
    ...c,
    related: u?.[0]
  });
  e.flattenRelated = s;
})(mo);
var Ti = {}, rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.InvalidParamNavigationError = rt.FillNavigationError = rt.NavigationError = void 0;
class go extends Error {
  constructor(t, n) {
    super(t), this.additionalInfo = n, this.type = "NavigationError";
  }
}
rt.NavigationError = go;
class gh extends go {
  constructor() {
    super(...arguments), this.type = "FillNavigationError";
  }
}
rt.FillNavigationError = gh;
class yh extends go {
  constructor() {
    super(...arguments), this.type = "InvalidParamNavigationError";
  }
}
rt.InvalidParamNavigationError = yh;
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.getNavigationRepository = void 0;
const bu = H, vh = rt, gr = et, yr = xe, vr = mo, _u = (e) => e === !0 ? !0 : Array.isArray(e) ? e.includes("items") : !1;
Ti.getNavigationRepository = (0, bu.once)((e) => ({
  find({ filters: t, locale: n, limit: i, orderBy: r, populate: o }) {
    const { masterModel: a } = (0, yr.getPluginModels)(e);
    return e.strapi.documents(a.uid).findMany({ filters: t, locale: n, limit: i, populate: o, orderBy: r }).then((s) => s.map(({ items: u, ...c }) => ({
      ...c,
      items: u?.map(vr.flattenRelated)
    }))).then((s) => s.map(({ items: u, ...c }) => ({
      ...c,
      items: u?.map(vr.removeSensitiveFields)
    }))).then((s) => (0, gr.navigationDBSchema)(_u(o)).array().parse(s));
  },
  findOne({ locale: t, filters: n, populate: i }) {
    const { masterModel: r } = (0, yr.getPluginModels)(e);
    return e.strapi.documents(r.uid).findOne({ documentId: n.documentId, locale: t, populate: i }).then((o) => {
      var a;
      return o && { ...o, items: (a = o.items) === null || a === void 0 ? void 0 : a.map(vr.flattenRelated) };
    }).then((o) => (0, gr.navigationDBSchema)(_u(i)).parse(o)).then((o) => {
      var a;
      return {
        ...o,
        items: (a = o.items) === null || a === void 0 ? void 0 : a.map(vr.removeSensitiveFields)
      };
    });
  },
  async save(t) {
    const { masterModel: n } = (0, yr.getPluginModels)(e), { documentId: i, locale: r, ...o } = t;
    return i ? e.strapi.documents(n.uid).update({
      locale: r,
      documentId: i,
      data: (0, bu.omit)(o, ["id", "documentId"]),
      populate: ["items"]
    }).then((0, gr.navigationDBSchema)(!1).parse) : e.strapi.documents(n.uid).create({
      locale: r,
      data: {
        ...o,
        populate: ["items"]
      }
    }).then((0, gr.navigationDBSchema)(!1).parse);
  },
  remove(t) {
    const { masterModel: n } = (0, yr.getPluginModels)(e);
    if (!t.documentId)
      throw new vh.NavigationError("Document id is required.");
    return e.strapi.documents(n.uid).delete({ documentId: t.documentId });
  }
}));
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getNavigationRepository = e.getNavigationItemRepository = e.getGenericRepository = e.getAudienceRepository = void 0;
  var t = Ei;
  Object.defineProperty(e, "getAudienceRepository", { enumerable: !0, get: function() {
    return t.getAudienceRepository;
  } });
  var n = nr;
  Object.defineProperty(e, "getGenericRepository", { enumerable: !0, get: function() {
    return n.getGenericRepository;
  } });
  var i = mo;
  Object.defineProperty(e, "getNavigationItemRepository", { enumerable: !0, get: function() {
    return i.getNavigationItemRepository;
  } });
  var r = Ti;
  Object.defineProperty(e, "getNavigationRepository", { enumerable: !0, get: function() {
    return r.getNavigationRepository;
  } });
})(An);
Object.defineProperty(_i, "__esModule", { value: !0 });
_i.navigationSetup = void 0;
const wh = An, bh = xe, _h = "Navigation", Eh = "navigation", Th = async (e) => {
  const t = (0, bh.getPluginService)(e, "common"), { defaultLocale: n, restLocale: i = [] } = await t.readLocale(), r = (0, wh.getNavigationRepository)(e), o = await r.find({
    limit: Number.MAX_SAFE_INTEGER,
    filters: {},
    locale: "*"
  });
  o.length === 0 && o.push(await r.save({
    name: _h,
    visible: !0,
    locale: n,
    slug: Eh
  }));
  const a = o.filter(({ locale: s }) => s === n);
  for (const s of a)
    for (const u of i)
      !o.find(({ locale: l, documentId: f }) => f === s.documentId && u === l) && await r.save({
        documentId: s.documentId,
        name: s.name,
        locale: u,
        visible: s.visible,
        slug: s.slug
      });
};
_i.navigationSetup = Th;
var On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
On.setupPermissions = void 0;
const Pr = {
  render: function(e) {
    return `plugin::navigation.${e}`;
  },
  navigation: {
    read: "read",
    update: "update",
    settings: "settings"
  }
}, Sh = async ({ strapi: e }) => {
  const t = [
    {
      section: "plugins",
      displayName: "Read",
      uid: Pr.navigation.read,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: Pr.navigation.update,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Settings",
      uid: Pr.navigation.settings,
      pluginName: "navigation"
    }
  ];
  await e.admin.services.permission.actionProvider.registerMany(t);
};
On.setupPermissions = Sh;
On.default = Pr;
var ml = {}, Si = {}, yo = {}, Ai = {}, Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.renderNavigation = void 0;
const Ah = St, Oh = xe, Ch = "I18NLocaleCode", xh = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: i, stringArg: r, booleanArg: o } = t;
  return {
    args: {
      navigationIdOrSlug: n(r()),
      type: "NavigationRenderType",
      menuOnly: o(),
      path: r(),
      locale: t.arg({ type: Ch })
    },
    type: n(i("NavigationItem")),
    resolve(u, { navigationIdOrSlug: c, type: l, menuOnly: f, path: d, locale: p }) {
      const h = Ah.z.string().parse(c);
      return (0, Oh.getPluginService)({ strapi: e }, "client").render({
        idOrSlug: h,
        type: l,
        rootPath: d,
        locale: p,
        menuOnly: f,
        wrapRelated: !0
      });
    }
  };
};
Oi.renderNavigation = xh;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.renderNavigationChild = void 0;
const Ph = St, Rh = xe, $h = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: i, stringArg: r, booleanArg: o } = t;
  return {
    type: n(i("NavigationItem")),
    args: {
      documentId: n(r()),
      childUiKey: n(r()),
      type: "NavigationRenderType",
      menuOnly: o()
    },
    resolve(a, s) {
      const { documentId: u, childUIKey: c, type: l, menuOnly: f } = s, d = Ph.z.string().parse(u);
      return (0, Rh.getPluginService)({ strapi: e }, "client").renderChildren({
        idOrSlug: d,
        childUIKey: c,
        type: l,
        menuOnly: f,
        wrapRelated: !0
      });
    }
  };
};
Ci.renderNavigationChild = $h;
Object.defineProperty(Ai, "__esModule", { value: !0 });
Ai.getQueries = void 0;
const Ih = Oi, Nh = Ci, Fh = (e) => {
  const t = {
    renderNavigationChild: Nh.renderNavigationChild,
    renderNavigation: Ih.renderNavigation
  };
  return e.nexus.extendType({
    type: "Query",
    definition(n) {
      for (const [i, r] of Object.entries(t)) {
        const o = r(e);
        n.field(i, o);
      }
    }
  });
};
Ai.getQueries = Fh;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.getResolversConfig = void 0;
const Dh = () => ({
  "Query.renderNavigationChild": { auth: !1 },
  "Query.renderNavigation": { auth: !1 }
});
xi.getResolversConfig = Dh;
var Pi = {}, vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
vo.default = ({ nexus: e }) => e.objectType({
  name: "ContentTypes",
  definition(t) {
    t.nonNull.string("uid"), t.nonNull.string("name"), t.nonNull.boolean("isSingle"), t.nonNull.string("collectionName"), t.nonNull.string("contentTypeName"), t.nonNull.string("label"), t.nonNull.string("relatedField"), t.nonNull.string("labelSingular"), t.nonNull.string("endpoint"), t.nonNull.boolean("available"), t.nonNull.boolean("visible");
  }
});
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const Mh = et, Lh = xe;
wo.default = ({ nexus: e, strapi: t }) => e.objectType({
  name: "ContentTypesNameFields",
  async definition(n) {
    n.nonNull.list.nonNull.string("default");
    const r = await (0, Lh.getPluginService)({ strapi: t }, "common").getPluginStore(), a = Mh.DynamicSchemas.configSchema.parse(await r.get({ key: "config" })).contentTypesNameFields;
    Object.keys(a || {}).forEach((s) => n.nonNull.list.string(s));
  }
});
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.default = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigation",
  definition(t) {
    t.nonNull.string("name"), t.nonNull.list.field("items", { type: "CreateNavigationItem" });
  }
});
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
_o.default = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationItem",
  definition(t) {
    t.nonNull.string("title"), t.nonNull.field("type", { type: "NavigationItemType" }), t.string("path"), t.string("externalPath"), t.nonNull.string("uiRouterKey"), t.nonNull.boolean("menuAttached"), t.nonNull.int("order"), t.string("parent"), t.string("master"), t.list.field("items", { type: "CreateNavigationItem" }), t.list.string("audience"), t.field("related", { type: "CreateNavigationRelated" });
  }
});
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.default = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationRelated",
  definition(t) {
    t.nonNull.string("ref"), t.nonNull.string("field"), t.nonNull.string("refId");
  }
});
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
To.default = ({ nexus: e }) => e.objectType({
  name: "Navigation",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible");
  }
});
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
So.default = ({ nexus: e }) => e.objectType({
  name: "NavigationConfig",
  definition(t) {
    t.int("allowedLevels"), t.nonNull.list.string("additionalFields"), t.field("contentTypesNameFields", { type: "ContentTypesNameFields" }), t.list.field("contentTypes", { type: "ContentTypes" });
  }
});
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.default = ({ nexus: e }) => e.objectType({
  name: "NavigationDetails",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible"), t.nonNull.list.field("items", { type: "NavigationItem" });
  }
});
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.default = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItem",
  definition(n) {
    n.nonNull.int("id"), n.nonNull.string("documentId"), n.nonNull.string("title"), n.nonNull.field("type", { type: "NavigationItemType" }), n.string("path"), n.string("externalPath"), n.nonNull.string("uiRouterKey"), n.nonNull.boolean("menuAttached"), n.nonNull.int("order"), n.field("parent", { type: "NavigationItem" }), n.string("master"), n.list.field("items", { type: "NavigationItem" }), n.field("related", { type: "NavigationItemRelated" }), t.additionalFields.find((i) => i === "audience") && n.list.string("audience"), n.field("additionalFields", { type: "NavigationItemAdditionalFields" }), n.string("created_at"), n.string("updated_at"), n.string("created_by"), n.string("updated_by"), n.string("createdAt"), n.string("updatedAt"), n.string("createdBy"), n.string("updatedBy");
  }
});
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.default = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItemAdditionalFields",
  definition(n) {
    t.additionalFields.forEach((i) => {
      if (i !== "audience" && i.enabled)
        switch (i.type) {
          case "media":
            n.field(i.name, { type: "UploadFile" });
            break;
          case "string":
            n.string(i.name);
            break;
          case "boolean":
            n.boolean(i.name);
            break;
          case "select":
            i.multi ? n.list.string(i.name) : n.string(i.name);
            break;
          default:
            throw new Error(`Type "${JSON.stringify(i.type)}" is unsupported by custom fields`);
        }
    });
  }
});
var xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
xo.default = ({ strapi: e, nexus: t, config: n }) => {
  var i;
  const r = (i = n.gql) === null || i === void 0 ? void 0 : i.navigationItemRelated, o = "NavigationItemRelated";
  return r?.length ? t.unionType({
    name: o,
    definition(a) {
      a.members(...r);
    },
    resolveType: (a) => {
      var s;
      return (s = e.contentTypes[a.__type]) === null || s === void 0 ? void 0 : s.globalId;
    }
  }) : t.objectType({
    name: o,
    definition(a) {
      a.int("id"), a.string("documentId"), a.string("title"), a.string("name");
    }
  });
};
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
Po.default = ({ nexus: e }) => e.enumType({
  name: "NavigationItemType",
  members: ["INTERNAL", "EXTERNAL", "WRAPPER"]
});
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.default = ({ nexus: e }) => e.enumType({
  name: "NavigationRenderType",
  members: ["FLAT", "TREE"]
});
var Qe = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Pi, "__esModule", { value: !0 });
Pi.getTypes = void 0;
const jh = Qe(vo), kh = Qe(wo), Uh = Qe(bo), Bh = Qe(_o), Hh = Qe(Eo), qh = Qe(To), Gh = Qe(So), Yh = Qe(Ao), Wh = Qe(Oo), zh = Qe(Co), Kh = Qe(xo), Qh = Qe(Po), Vh = Qe(Ro), Xh = [
  zh.default,
  Kh.default,
  Wh.default,
  Vh.default,
  qh.default,
  Yh.default,
  kh.default,
  jh.default,
  Gh.default,
  Hh.default,
  Bh.default,
  Uh.default,
  Qh.default
], Zh = (e) => Xh.map((t) => t(e));
Pi.getTypes = Zh;
Object.defineProperty(yo, "__esModule", { value: !0 });
const Jh = et, em = xe, tm = Ai, nm = xi, rm = Pi;
yo.default = async ({ strapi: e }) => {
  const t = e.plugin("graphql").service("extension");
  t.shadowCRUD("plugin::navigation.audience").disable(), t.shadowCRUD("plugin::navigation.navigation").disable(), t.shadowCRUD("plugin::navigation.navigation-item").disable(), t.shadowCRUD("plugin::navigation.navigations-items-related").disable();
  const i = await (0, em.getPluginService)({ strapi: e }, "common").getPluginStore(), r = Jh.DynamicSchemas.configSchema.parse(await i.get({ key: "config" }));
  t.use(({ strapi: o, nexus: a }) => {
    const s = (0, rm.getTypes)({ strapi: o, nexus: a, config: r }), u = (0, tm.getQueries)({ strapi: o, nexus: a }), c = (0, nm.getResolversConfig)();
    return {
      types: [s, u],
      resolversConfig: c
    };
  });
};
var im = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Si, "__esModule", { value: !0 });
Si.graphQLSetup = void 0;
const am = im(yo), om = async ({ strapi: e }) => {
  !!e.plugin("graphql") && await (0, am.default)({ strapi: e });
};
Si.graphQLSetup = om;
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(i, r, o, a) {
    a === void 0 && (a = o);
    var s = Object.getOwnPropertyDescriptor(r, o);
    (!s || ("get" in s ? !r.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
      return r[o];
    } }), Object.defineProperty(i, a, s);
  } : function(i, r, o, a) {
    a === void 0 && (a = o), i[a] = r[o];
  }), n = F && F.__exportStar || function(i, r) {
    for (var o in i) o !== "default" && !Object.prototype.hasOwnProperty.call(r, o) && t(r, i, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(Si, e);
})(ml);
Object.defineProperty(fl, "__esModule", { value: !0 });
const sm = bi(), um = _i, cm = On, lm = ml, fm = xe, dm = async (e) => {
  await (0, sm.configSetup)(e), await (0, um.navigationSetup)(e), await (0, cm.setupPermissions)(e), await (0, lm.graphQLSetup)(e), await strapi.service("plugin::navigation.migrate").migrateRelatedIdToDocumentId(), strapi.db.lifecycles.subscribe({
    models: ["plugin::i18n.locale"],
    async afterCreate(t) {
      var n;
      await (0, fm.getPluginService)(e, "admin").refreshNavigationLocale((n = t.result) === null || n === void 0 ? void 0 : n.code);
    }
  });
};
var pm = fl.default = dm, gl = {};
Object.defineProperty(gl, "__esModule", { value: !0 });
const hm = ({ strapi: e }) => {
};
var mm = gl.default = hm, yl = {};
Object.defineProperty(yl, "__esModule", { value: !0 });
const gm = ({ strapi: e }) => {
};
var ym = yl.default = gm, vm = bi();
const wm = /* @__PURE__ */ tr(vm);
var vl = {}, $o = {}, Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
Io.default = {
  collectionName: "audience",
  info: {
    singularName: "audience",
    pluralName: "audiences",
    displayName: "Audience",
    name: "audience"
  },
  options: {
    increments: !0,
    comment: "Audience"
  },
  attributes: {
    name: {
      type: "string",
      required: !0
    },
    key: {
      type: "uid",
      targetField: "name"
    }
  }
};
var bm = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty($o, "__esModule", { value: !0 });
const _m = bm(Io);
$o.default = {
  schema: _m.default
};
var No = {}, Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Em = xe;
Fo.default = (0, Em.buildAllHookListeners)("navigation", {
  strapi
});
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
Do.default = {
  collectionName: "navigations",
  info: {
    singularName: "navigation",
    pluralName: "navigations",
    displayName: "Navigation",
    name: "navigation"
  },
  options: {
    comment: ""
  },
  pluginOptions: {
    "content-manager": {
      visible: !1
    },
    "content-type-builder": {
      visible: !1
    },
    i18n: {
      localized: !0
    }
  },
  attributes: {
    name: {
      type: "text",
      configurable: !1,
      required: !0
    },
    slug: {
      type: "uid",
      target: "name",
      configurable: !1,
      required: !0
    },
    visible: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    items: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.navigation-item",
      configurable: !1,
      mappedBy: "master"
    }
  }
};
var wl = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(No, "__esModule", { value: !0 });
const Tm = wl(Fo), Sm = wl(Do);
No.default = {
  schema: Sm.default,
  lifecycles: Tm.default
};
var Mo = {}, Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Am = xe;
Lo.default = (0, Am.buildAllHookListeners)("navigation-item", {
  strapi
});
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.default = {
  collectionName: "navigations_items",
  info: {
    singularName: "navigation-item",
    pluralName: "navigation-items",
    displayName: "Navigation Item",
    name: "navigation-item"
  },
  options: {
    increments: !0,
    timestamps: !0,
    comment: "Navigation Item"
  },
  pluginOptions: {
    "content-manager": {
      visible: !1
    },
    "content-type-builder": {
      visible: !1
    },
    i18n: {
      localized: !1
    }
  },
  attributes: {
    title: {
      type: "text",
      configurable: !1,
      required: !0,
      pluginOptions: {
        i18n: {
          localized: !1
        }
      }
    },
    type: {
      type: "enumeration",
      enum: ["INTERNAL", "EXTERNAL", "WRAPPER"],
      default: "INTERNAL",
      configurable: !1
    },
    path: {
      type: "text",
      targetField: "title",
      configurable: !1
    },
    externalPath: {
      type: "text",
      configurable: !1
    },
    uiRouterKey: {
      type: "string",
      configurable: !1
    },
    menuAttached: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    order: {
      type: "integer",
      default: 0,
      configurable: !1
    },
    collapsed: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    autoSync: {
      type: "boolean",
      default: !0,
      configurable: !1
    },
    related: {
      type: "relation",
      relation: "morphToMany",
      required: !0,
      configurable: !1
    },
    parent: {
      type: "relation",
      relation: "oneToOne",
      target: "plugin::navigation.navigation-item",
      configurable: !1,
      default: null
    },
    master: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::navigation.navigation",
      configurable: !1,
      inversedBy: "items"
    },
    audience: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.audience"
    },
    additionalFields: {
      type: "json",
      require: !1,
      default: {}
    }
  }
};
var bl = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const Om = bl(Lo), Cm = bl(jo);
Mo.default = {
  schema: Cm.default,
  lifecycles: Om.default
};
var ko = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(vl, "__esModule", { value: !0 });
const xm = ko($o), Pm = ko(No), Rm = ko(Mo);
var $m = vl.default = {
  audience: xm.default,
  navigation: Pm.default,
  "navigation-item": Rm.default
}, _l = {}, Uo = {}, Ri = {};
(function(e) {
  var t = F && F.__createBinding || (Object.create ? function(a, s, u, c) {
    c === void 0 && (c = u);
    var l = Object.getOwnPropertyDescriptor(s, u);
    (!l || ("get" in l ? !s.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return s[u];
    } }), Object.defineProperty(a, c, l);
  } : function(a, s, u, c) {
    c === void 0 && (c = u), a[c] = s[u];
  }), n = F && F.__setModuleDefault || (Object.create ? function(a, s) {
    Object.defineProperty(a, "default", { enumerable: !0, value: s });
  } : function(a, s) {
    a.default = s;
  }), i = F && F.__importStar || /* @__PURE__ */ function() {
    var a = function(s) {
      return a = Object.getOwnPropertyNames || function(u) {
        var c = [];
        for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (c[c.length] = l);
        return c;
      }, a(s);
    };
    return function(s) {
      if (s && s.__esModule) return s;
      var u = {};
      if (s != null) for (var c = a(s), l = 0; l < c.length; l++) c[l] !== "default" && t(u, s, c[l]);
      return n(u, s), u;
    };
  }();
  Object.defineProperty(e, "__esModule", { value: !0 }), e.fillFromOtherLocaleParams = e.renderChildQueryParams = e.renderQuerySchema = e.populateSchema = e.statusSchema = e.renderTypeSchema = e.readAllQuerySchema = e.idSchema = void 0;
  const r = i(St), o = r.enum(["true", "false"]);
  e.idSchema = r.string(), e.readAllQuerySchema = r.object({
    locale: r.string().optional(),
    orderBy: r.string().optional(),
    orderDirection: r.enum(["DESC", "ASC"]).optional()
  }), e.renderTypeSchema = r.enum(["FLAT", "TREE", "RFR"]), e.statusSchema = r.enum(["draft", "published"]), e.populateSchema = r.union([r.boolean(), r.string(), r.string().array(), r.undefined()]), e.renderQuerySchema = r.object({
    type: e.renderTypeSchema.optional(),
    menu: o.optional(),
    path: r.string().optional(),
    locale: r.string().optional(),
    populate: e.populateSchema.optional(),
    status: e.statusSchema.optional()
  }), e.renderChildQueryParams = r.object({
    type: e.renderTypeSchema.optional(),
    menu: o.optional(),
    locale: r.string().optional(),
    status: e.statusSchema.optional()
  }), e.fillFromOtherLocaleParams = r.object({
    source: r.string().min(1),
    target: r.string().min(1),
    documentId: r.string().min(1)
  });
})(Ri);
var Im = F && F.__createBinding || (Object.create ? function(e, t, n, i) {
  i === void 0 && (i = n);
  var r = Object.getOwnPropertyDescriptor(t, n);
  (!r || ("get" in r ? !t.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, i, r);
} : function(e, t, n, i) {
  i === void 0 && (i = n), e[i] = t[n];
}), Nm = F && F.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Fm = F && F.__importStar || /* @__PURE__ */ function() {
  var e = function(t) {
    return e = Object.getOwnPropertyNames || function(n) {
      var i = [];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (i[i.length] = r);
      return i;
    }, e(t);
  };
  return function(t) {
    if (t && t.__esModule) return t;
    var n = {};
    if (t != null) for (var i = e(t), r = 0; r < i.length; r++) i[r] !== "default" && Im(n, t, i[r]);
    return Nm(n, t), n;
  };
}();
Object.defineProperty(Uo, "__esModule", { value: !0 });
Uo.default = Dm;
const mt = Fm(St), sa = et, Eu = xe, Ln = Ri;
function Dm(e) {
  return {
    getAdminService() {
      return (0, Eu.getPluginService)(e, "admin");
    },
    getCommonService() {
      return (0, Eu.getPluginService)(e, "common");
    },
    async get() {
      return await this.getAdminService().get({});
    },
    async post(t) {
      const { auditLog: n } = t;
      try {
        return await this.getAdminService().post({
          payload: sa.DynamicSchemas.createNavigationSchema.parse(t.request.body),
          auditLog: n
        });
      } catch (i) {
        const r = i instanceof Error ? {
          name: i.name,
          message: i.message
        } : {};
        return t.internalServerError("Unable to create", { originalError: r });
      }
    },
    async put(t) {
      const { params: { documentId: n }, auditLog: i } = t, r = mt.record(mt.string(), mt.unknown()).parse(t.request.body);
      try {
        return await this.getAdminService().put({
          auditLog: i,
          payload: sa.DynamicSchemas.updateNavigationSchema.parse({
            ...r,
            documentId: n
          })
        });
      } catch (o) {
        const a = o instanceof Error ? {
          name: o.name,
          message: o.message
        } : {};
        return t.internalServerError("Unable to update", { originalError: a });
      }
    },
    async delete(t) {
      const { auditLog: n, params: { documentId: i } } = t;
      return await this.getAdminService().delete({
        documentId: Ln.idSchema.parse(i),
        auditLog: n
      }), {};
    },
    config() {
      return this.getAdminService().config({ viaSettingsPage: !1 });
    },
    async updateConfig(t) {
      return await this.getAdminService().updateConfig({
        config: sa.DynamicSchemas.configSchema.parse(t.request.body)
      }), {};
    },
    async restoreConfig() {
      return await this.getAdminService().restoreConfig(), {};
    },
    settingsConfig() {
      return this.getAdminService().config({ viaSettingsPage: !0 });
    },
    async settingsRestart() {
      return await this.getAdminService().restart(), {};
    },
    getById(t) {
      const { params: { documentId: n } } = t;
      return this.getAdminService().getById({ documentId: Ln.idSchema.parse(n) });
    },
    getContentTypeItems(t) {
      const { params: { model: n }, query: i = {} } = t;
      return this.getAdminService().getContentTypeItems({
        query: mt.record(mt.string(), mt.unknown()).parse(i),
        uid: mt.string().parse(n)
      });
    },
    async fillFromOtherLocale(t) {
      const { params: n, auditLog: i } = t, { source: r, target: o, documentId: a } = Ln.fillFromOtherLocaleParams.parse(n);
      return await this.getAdminService().fillFromOtherLocale({
        source: r,
        target: o,
        documentId: a,
        auditLog: i
      });
    },
    readNavigationItemFromLocale(t) {
      const { params: { source: n, target: i }, query: { path: r } } = t;
      return this.getAdminService().readNavigationItemFromLocale({
        path: mt.string().parse(r),
        source: Ln.idSchema.parse(n),
        target: Ln.idSchema.parse(i)
      });
    },
    getSlug(t) {
      const { query: { q: n } } = t;
      return this.getCommonService().getSlug({ query: mt.string().parse(n) }).then((i) => ({ slug: i }));
    },
    settingsLocale() {
      return this.getCommonService().readLocale();
    }
  };
}
var Bo = {}, wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
wn.parseId = wn.sanitizePopulateField = void 0;
const Mm = St, Lm = Ri, jm = (e) => {
  if (!(!e || e === !0 || e === "*") && typeof e != "object")
    return Array.isArray(e), e;
};
wn.sanitizePopulateField = jm;
const km = (e) => Number.isNaN(parseInt(e)) ? Mm.z.string().parse(e) : Lm.idSchema.parse(parseInt(e));
wn.parseId = km;
var Um = F && F.__createBinding || (Object.create ? function(e, t, n, i) {
  i === void 0 && (i = n);
  var r = Object.getOwnPropertyDescriptor(t, n);
  (!r || ("get" in r ? !t.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, i, r);
} : function(e, t, n, i) {
  i === void 0 && (i = n), e[i] = t[n];
}), Bm = F && F.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), Hm = F && F.__importStar || /* @__PURE__ */ function() {
  var e = function(t) {
    return e = Object.getOwnPropertyNames || function(n) {
      var i = [];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (i[i.length] = r);
      return i;
    }, e(t);
  };
  return function(t) {
    if (t && t.__esModule) return t;
    var n = {};
    if (t != null) for (var i = e(t), r = 0; r < i.length; r++) i[r] !== "default" && Um(n, t, i[r]);
    return Bm(n, t), n;
  };
}();
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.default = Ym;
const ua = Hm(St), qm = xe, Gm = wn, wr = Ri;
function Ym(e) {
  return {
    getService() {
      return (0, qm.getPluginService)(e, "client");
    },
    async readAll(t) {
      try {
        const { query: n = {} } = t, { locale: i, orderBy: r, orderDirection: o } = wr.readAllQuerySchema.parse(n);
        return await this.getService().readAll({
          locale: i,
          orderBy: r,
          orderDirection: o
        });
      } catch (n) {
        if (n instanceof Error)
          return t.badRequest(n.message);
        throw n;
      }
    },
    async render(t) {
      const { params: n, query: i = {} } = t, { type: r, menu: o, path: a, locale: s, populate: u, status: c = "published" } = wr.renderQuerySchema.parse(i), l = ua.string().parse(n.idOrSlug);
      return await this.getService().render({
        idOrSlug: l,
        type: r,
        menuOnly: o === "true",
        rootPath: a,
        locale: s,
        populate: (0, Gm.sanitizePopulateField)(wr.populateSchema.parse(u === "true" ? !0 : u === "false" ? !1 : Array.isArray(u) ? u.map((f) => f === "true" ? !0 : f === "false" ? !1 : u) : u)),
        status: c
      });
    },
    async renderChild(t) {
      const { params: n, query: i = {} } = t, { type: r, menu: o, locale: a, status: s = "published" } = wr.renderChildQueryParams.parse(i), u = ua.string().parse(n.idOrSlug), c = ua.string().parse(n.childUIKey);
      return await this.getService().renderChildren({
        idOrSlug: u,
        childUIKey: c,
        type: r,
        menuOnly: o === "true",
        locale: a,
        status: s
      });
    }
  };
}
var El = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(_l, "__esModule", { value: !0 });
const Wm = El(Uo), zm = El(Bo);
var Km = _l.default = {
  admin: Wm.default,
  client: zm.default
}, Tl = {};
Object.defineProperty(Tl, "__esModule", { value: !0 });
var Qm = Tl.default = {}, Sl = {};
Object.defineProperty(Sl, "__esModule", { value: !0 });
var Vm = Sl.default = {}, Al = {}, Ho = {}, Xm = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const Ve = Xm(On), Zm = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "admin.get",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/",
      handler: "admin.post",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/config",
      handler: "admin.config",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/config",
      handler: "admin.updateConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/config",
      handler: "admin.restoreConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/slug",
      handler: "admin.getSlug",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/:documentId",
      handler: "admin.getById",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/:documentId",
      handler: "admin.put",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/:documentId",
      handler: "admin.delete",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/content-type-items/:model",
      handler: "admin.getContentTypeItems",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/locale",
      handler: "admin.settingsLocale",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/config",
      handler: "admin.settingsConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/settings/restart",
      handler: "admin.settingsRestart",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/i18n/copy/:documentId/:source/:target",
      handler: "admin.fillFromOtherLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/i18n/item/read/:source/:target",
      handler: "admin.readNavigationItemFromLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [Ve.default.render("read")]
            }
          }
        ]
      }
    }
  ]
};
Ho.default = Zm;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Jm = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/render/:idOrSlug",
      handler: "client.render",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/render/:idOrSlug/:childUIKey",
      handler: "client.renderChild",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/",
      handler: "client.readAll",
      config: {
        policies: []
      }
    }
  ]
};
qo.default = Jm;
var Ol = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Al, "__esModule", { value: !0 });
const eg = Ol(Ho), tg = Ol(qo), ng = {
  admin: eg.default,
  "content-api": tg.default
};
var rg = Al.default = ng, Cl = {}, Go = {}, Yo = {};
function Et(e) {
  "@babel/helpers - typeof";
  return Et = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Et(e);
}
function He(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function Te(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function De(e) {
  Te(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || Et(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function ig(e, t) {
  Te(2, arguments);
  var n = De(e).getTime(), i = He(t);
  return new Date(n + i);
}
var ag = {};
function Cn() {
  return ag;
}
function xl(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
var Wo = 6e4, zo = 36e5, og = 1e3;
function Pl(e) {
  return Te(1, arguments), e instanceof Date || Et(e) === "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Hr(e) {
  if (Te(1, arguments), !Pl(e) && typeof e != "number")
    return !1;
  var t = De(e);
  return !isNaN(Number(t));
}
function Rl(e, t) {
  Te(2, arguments);
  var n = He(t);
  return ig(e, -n);
}
var sg = 864e5;
function ug(e) {
  Te(1, arguments);
  var t = De(e), n = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var i = t.getTime(), r = n - i;
  return Math.floor(r / sg) + 1;
}
function bn(e) {
  Te(1, arguments);
  var t = 1, n = De(e), i = n.getUTCDay(), r = (i < t ? 7 : 0) + i - t;
  return n.setUTCDate(n.getUTCDate() - r), n.setUTCHours(0, 0, 0, 0), n;
}
function $l(e) {
  Te(1, arguments);
  var t = De(e), n = t.getUTCFullYear(), i = /* @__PURE__ */ new Date(0);
  i.setUTCFullYear(n + 1, 0, 4), i.setUTCHours(0, 0, 0, 0);
  var r = bn(i), o = /* @__PURE__ */ new Date(0);
  o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var a = bn(o);
  return t.getTime() >= r.getTime() ? n + 1 : t.getTime() >= a.getTime() ? n : n - 1;
}
function cg(e) {
  Te(1, arguments);
  var t = $l(e), n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var i = bn(n);
  return i;
}
var lg = 6048e5;
function Il(e) {
  Te(1, arguments);
  var t = De(e), n = bn(t).getTime() - cg(t).getTime();
  return Math.round(n / lg) + 1;
}
function Vt(e, t) {
  var n, i, r, o, a, s, u, c;
  Te(1, arguments);
  var l = Cn(), f = He((n = (i = (r = (o = t?.weekStartsOn) !== null && o !== void 0 ? o : t == null || (a = t.locale) === null || a === void 0 || (s = a.options) === null || s === void 0 ? void 0 : s.weekStartsOn) !== null && r !== void 0 ? r : l.weekStartsOn) !== null && i !== void 0 ? i : (u = l.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.weekStartsOn) !== null && n !== void 0 ? n : 0);
  if (!(f >= 0 && f <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var d = De(e), p = d.getUTCDay(), h = (p < f ? 7 : 0) + p - f;
  return d.setUTCDate(d.getUTCDate() - h), d.setUTCHours(0, 0, 0, 0), d;
}
function Ko(e, t) {
  var n, i, r, o, a, s, u, c;
  Te(1, arguments);
  var l = De(e), f = l.getUTCFullYear(), d = Cn(), p = He((n = (i = (r = (o = t?.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (a = t.locale) === null || a === void 0 || (s = a.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && r !== void 0 ? r : d.firstWeekContainsDate) !== null && i !== void 0 ? i : (u = d.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && n !== void 0 ? n : 1);
  if (!(p >= 1 && p <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var h = /* @__PURE__ */ new Date(0);
  h.setUTCFullYear(f + 1, 0, p), h.setUTCHours(0, 0, 0, 0);
  var m = Vt(h, t), g = /* @__PURE__ */ new Date(0);
  g.setUTCFullYear(f, 0, p), g.setUTCHours(0, 0, 0, 0);
  var v = Vt(g, t);
  return l.getTime() >= m.getTime() ? f + 1 : l.getTime() >= v.getTime() ? f : f - 1;
}
function fg(e, t) {
  var n, i, r, o, a, s, u, c;
  Te(1, arguments);
  var l = Cn(), f = He((n = (i = (r = (o = t?.firstWeekContainsDate) !== null && o !== void 0 ? o : t == null || (a = t.locale) === null || a === void 0 || (s = a.options) === null || s === void 0 ? void 0 : s.firstWeekContainsDate) !== null && r !== void 0 ? r : l.firstWeekContainsDate) !== null && i !== void 0 ? i : (u = l.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && n !== void 0 ? n : 1), d = Ko(e, t), p = /* @__PURE__ */ new Date(0);
  p.setUTCFullYear(d, 0, f), p.setUTCHours(0, 0, 0, 0);
  var h = Vt(p, t);
  return h;
}
var dg = 6048e5;
function Nl(e, t) {
  Te(1, arguments);
  var n = De(e), i = Vt(n, t).getTime() - fg(n, t).getTime();
  return Math.round(i / dg) + 1;
}
function ae(e, t) {
  for (var n = e < 0 ? "-" : "", i = Math.abs(e).toString(); i.length < t; )
    i = "0" + i;
  return n + i;
}
var Ot = {
  // Year
  y: function(t, n) {
    var i = t.getUTCFullYear(), r = i > 0 ? i : 1 - i;
    return ae(n === "yy" ? r % 100 : r, n.length);
  },
  // Month
  M: function(t, n) {
    var i = t.getUTCMonth();
    return n === "M" ? String(i + 1) : ae(i + 1, 2);
  },
  // Day of the month
  d: function(t, n) {
    return ae(t.getUTCDate(), n.length);
  },
  // AM or PM
  a: function(t, n) {
    var i = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return i.toUpperCase();
      case "aaa":
        return i;
      case "aaaaa":
        return i[0];
      case "aaaa":
      default:
        return i === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function(t, n) {
    return ae(t.getUTCHours() % 12 || 12, n.length);
  },
  // Hour [0-23]
  H: function(t, n) {
    return ae(t.getUTCHours(), n.length);
  },
  // Minute
  m: function(t, n) {
    return ae(t.getUTCMinutes(), n.length);
  },
  // Second
  s: function(t, n) {
    return ae(t.getUTCSeconds(), n.length);
  },
  // Fraction of second
  S: function(t, n) {
    var i = n.length, r = t.getUTCMilliseconds(), o = Math.floor(r * Math.pow(10, i - 3));
    return ae(o, n.length);
  }
}, tn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, pg = {
  // Era
  G: function(t, n, i) {
    var r = t.getUTCFullYear() > 0 ? 1 : 0;
    switch (n) {
      case "G":
      case "GG":
      case "GGG":
        return i.era(r, {
          width: "abbreviated"
        });
      case "GGGGG":
        return i.era(r, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return i.era(r, {
          width: "wide"
        });
    }
  },
  // Year
  y: function(t, n, i) {
    if (n === "yo") {
      var r = t.getUTCFullYear(), o = r > 0 ? r : 1 - r;
      return i.ordinalNumber(o, {
        unit: "year"
      });
    }
    return Ot.y(t, n);
  },
  // Local week-numbering year
  Y: function(t, n, i, r) {
    var o = Ko(t, r), a = o > 0 ? o : 1 - o;
    if (n === "YY") {
      var s = a % 100;
      return ae(s, 2);
    }
    return n === "Yo" ? i.ordinalNumber(a, {
      unit: "year"
    }) : ae(a, n.length);
  },
  // ISO week-numbering year
  R: function(t, n) {
    var i = $l(t);
    return ae(i, n.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, n) {
    var i = t.getUTCFullYear();
    return ae(i, n.length);
  },
  // Quarter
  Q: function(t, n, i) {
    var r = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "Q":
        return String(r);
      case "QQ":
        return ae(r, 2);
      case "Qo":
        return i.ordinalNumber(r, {
          unit: "quarter"
        });
      case "QQQ":
        return i.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return i.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return i.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, n, i) {
    var r = Math.ceil((t.getUTCMonth() + 1) / 3);
    switch (n) {
      case "q":
        return String(r);
      case "qq":
        return ae(r, 2);
      case "qo":
        return i.ordinalNumber(r, {
          unit: "quarter"
        });
      case "qqq":
        return i.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return i.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return i.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, n, i) {
    var r = t.getUTCMonth();
    switch (n) {
      case "M":
      case "MM":
        return Ot.M(t, n);
      case "Mo":
        return i.ordinalNumber(r + 1, {
          unit: "month"
        });
      case "MMM":
        return i.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return i.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return i.month(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function(t, n, i) {
    var r = t.getUTCMonth();
    switch (n) {
      case "L":
        return String(r + 1);
      case "LL":
        return ae(r + 1, 2);
      case "Lo":
        return i.ordinalNumber(r + 1, {
          unit: "month"
        });
      case "LLL":
        return i.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return i.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return i.month(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function(t, n, i, r) {
    var o = Nl(t, r);
    return n === "wo" ? i.ordinalNumber(o, {
      unit: "week"
    }) : ae(o, n.length);
  },
  // ISO week of year
  I: function(t, n, i) {
    var r = Il(t);
    return n === "Io" ? i.ordinalNumber(r, {
      unit: "week"
    }) : ae(r, n.length);
  },
  // Day of the month
  d: function(t, n, i) {
    return n === "do" ? i.ordinalNumber(t.getUTCDate(), {
      unit: "date"
    }) : Ot.d(t, n);
  },
  // Day of year
  D: function(t, n, i) {
    var r = ug(t);
    return n === "Do" ? i.ordinalNumber(r, {
      unit: "dayOfYear"
    }) : ae(r, n.length);
  },
  // Day of week
  E: function(t, n, i) {
    var r = t.getUTCDay();
    switch (n) {
      case "E":
      case "EE":
      case "EEE":
        return i.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return i.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return i.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return i.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, n, i, r) {
    var o = t.getUTCDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "e":
        return String(a);
      case "ee":
        return ae(a, 2);
      case "eo":
        return i.ordinalNumber(a, {
          unit: "day"
        });
      case "eee":
        return i.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return i.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return i.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return i.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, n, i, r) {
    var o = t.getUTCDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (n) {
      case "c":
        return String(a);
      case "cc":
        return ae(a, n.length);
      case "co":
        return i.ordinalNumber(a, {
          unit: "day"
        });
      case "ccc":
        return i.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return i.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return i.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return i.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, n, i) {
    var r = t.getUTCDay(), o = r === 0 ? 7 : r;
    switch (n) {
      case "i":
        return String(o);
      case "ii":
        return ae(o, n.length);
      case "io":
        return i.ordinalNumber(o, {
          unit: "day"
        });
      case "iii":
        return i.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return i.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return i.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return i.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, n, i) {
    var r = t.getUTCHours(), o = r / 12 >= 1 ? "pm" : "am";
    switch (n) {
      case "a":
      case "aa":
        return i.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return i.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return i.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return i.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, n, i) {
    var r = t.getUTCHours(), o;
    switch (r === 12 ? o = tn.noon : r === 0 ? o = tn.midnight : o = r / 12 >= 1 ? "pm" : "am", n) {
      case "b":
      case "bb":
        return i.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return i.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return i.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return i.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, n, i) {
    var r = t.getUTCHours(), o;
    switch (r >= 17 ? o = tn.evening : r >= 12 ? o = tn.afternoon : r >= 4 ? o = tn.morning : o = tn.night, n) {
      case "B":
      case "BB":
      case "BBB":
        return i.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return i.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return i.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, n, i) {
    if (n === "ho") {
      var r = t.getUTCHours() % 12;
      return r === 0 && (r = 12), i.ordinalNumber(r, {
        unit: "hour"
      });
    }
    return Ot.h(t, n);
  },
  // Hour [0-23]
  H: function(t, n, i) {
    return n === "Ho" ? i.ordinalNumber(t.getUTCHours(), {
      unit: "hour"
    }) : Ot.H(t, n);
  },
  // Hour [0-11]
  K: function(t, n, i) {
    var r = t.getUTCHours() % 12;
    return n === "Ko" ? i.ordinalNumber(r, {
      unit: "hour"
    }) : ae(r, n.length);
  },
  // Hour [1-24]
  k: function(t, n, i) {
    var r = t.getUTCHours();
    return r === 0 && (r = 24), n === "ko" ? i.ordinalNumber(r, {
      unit: "hour"
    }) : ae(r, n.length);
  },
  // Minute
  m: function(t, n, i) {
    return n === "mo" ? i.ordinalNumber(t.getUTCMinutes(), {
      unit: "minute"
    }) : Ot.m(t, n);
  },
  // Second
  s: function(t, n, i) {
    return n === "so" ? i.ordinalNumber(t.getUTCSeconds(), {
      unit: "second"
    }) : Ot.s(t, n);
  },
  // Fraction of second
  S: function(t, n) {
    return Ot.S(t, n);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, n, i, r) {
    var o = r._originalDate || t, a = o.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (n) {
      case "X":
        return Su(a);
      case "XXXX":
      case "XX":
        return Bt(a);
      case "XXXXX":
      case "XXX":
      default:
        return Bt(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, n, i, r) {
    var o = r._originalDate || t, a = o.getTimezoneOffset();
    switch (n) {
      case "x":
        return Su(a);
      case "xxxx":
      case "xx":
        return Bt(a);
      case "xxxxx":
      case "xxx":
      default:
        return Bt(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, n, i, r) {
    var o = r._originalDate || t, a = o.getTimezoneOffset();
    switch (n) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Tu(a, ":");
      case "OOOO":
      default:
        return "GMT" + Bt(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, n, i, r) {
    var o = r._originalDate || t, a = o.getTimezoneOffset();
    switch (n) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Tu(a, ":");
      case "zzzz":
      default:
        return "GMT" + Bt(a, ":");
    }
  },
  // Seconds timestamp
  t: function(t, n, i, r) {
    var o = r._originalDate || t, a = Math.floor(o.getTime() / 1e3);
    return ae(a, n.length);
  },
  // Milliseconds timestamp
  T: function(t, n, i, r) {
    var o = r._originalDate || t, a = o.getTime();
    return ae(a, n.length);
  }
};
function Tu(e, t) {
  var n = e > 0 ? "-" : "+", i = Math.abs(e), r = Math.floor(i / 60), o = i % 60;
  if (o === 0)
    return n + String(r);
  var a = t;
  return n + String(r) + a + ae(o, 2);
}
function Su(e, t) {
  if (e % 60 === 0) {
    var n = e > 0 ? "-" : "+";
    return n + ae(Math.abs(e) / 60, 2);
  }
  return Bt(e, t);
}
function Bt(e, t) {
  var n = t || "", i = e > 0 ? "-" : "+", r = Math.abs(e), o = ae(Math.floor(r / 60), 2), a = ae(r % 60, 2);
  return i + o + n + a;
}
var Au = function(t, n) {
  switch (t) {
    case "P":
      return n.date({
        width: "short"
      });
    case "PP":
      return n.date({
        width: "medium"
      });
    case "PPP":
      return n.date({
        width: "long"
      });
    case "PPPP":
    default:
      return n.date({
        width: "full"
      });
  }
}, Fl = function(t, n) {
  switch (t) {
    case "p":
      return n.time({
        width: "short"
      });
    case "pp":
      return n.time({
        width: "medium"
      });
    case "ppp":
      return n.time({
        width: "long"
      });
    case "pppp":
    default:
      return n.time({
        width: "full"
      });
  }
}, hg = function(t, n) {
  var i = t.match(/(P+)(p+)?/) || [], r = i[1], o = i[2];
  if (!o)
    return Au(t, n);
  var a;
  switch (r) {
    case "P":
      a = n.dateTime({
        width: "short"
      });
      break;
    case "PP":
      a = n.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      a = n.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      a = n.dateTime({
        width: "full"
      });
      break;
  }
  return a.replace("{{date}}", Au(r, n)).replace("{{time}}", Fl(o, n));
}, Ba = {
  p: Fl,
  P: hg
}, mg = ["D", "DD"], gg = ["YY", "YYYY"];
function Dl(e) {
  return mg.indexOf(e) !== -1;
}
function Ml(e) {
  return gg.indexOf(e) !== -1;
}
function qr(e, t, n) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(n, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var yg = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, vg = function(t, n, i) {
  var r, o = yg[t];
  return typeof o == "string" ? r = o : n === 1 ? r = o.one : r = o.other.replace("{{count}}", n.toString()), i != null && i.addSuffix ? i.comparison && i.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ca(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.width ? String(t.width) : e.defaultWidth, i = e.formats[n] || e.formats[e.defaultWidth];
    return i;
  };
}
var wg = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, bg = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, _g = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Eg = {
  date: ca({
    formats: wg,
    defaultWidth: "full"
  }),
  time: ca({
    formats: bg,
    defaultWidth: "full"
  }),
  dateTime: ca({
    formats: _g,
    defaultWidth: "full"
  })
}, Tg = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Sg = function(t, n, i, r) {
  return Tg[t];
};
function jn(e) {
  return function(t, n) {
    var i = n != null && n.context ? String(n.context) : "standalone", r;
    if (i === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, a = n != null && n.width ? String(n.width) : o;
      r = e.formattingValues[a] || e.formattingValues[o];
    } else {
      var s = e.defaultWidth, u = n != null && n.width ? String(n.width) : e.defaultWidth;
      r = e.values[u] || e.values[s];
    }
    var c = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[c];
  };
}
var Ag = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Og = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Cg = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, xg = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Pg = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Rg = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, $g = function(t, n) {
  var i = Number(t), r = i % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return i + "st";
      case 2:
        return i + "nd";
      case 3:
        return i + "rd";
    }
  return i + "th";
}, Ig = {
  ordinalNumber: $g,
  era: jn({
    values: Ag,
    defaultWidth: "wide"
  }),
  quarter: jn({
    values: Og,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: jn({
    values: Cg,
    defaultWidth: "wide"
  }),
  day: jn({
    values: xg,
    defaultWidth: "wide"
  }),
  dayPeriod: jn({
    values: Pg,
    defaultWidth: "wide",
    formattingValues: Rg,
    defaultFormattingWidth: "wide"
  })
};
function kn(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.width, r = i && e.matchPatterns[i] || e.matchPatterns[e.defaultMatchWidth], o = t.match(r);
    if (!o)
      return null;
    var a = o[0], s = i && e.parsePatterns[i] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(s) ? Fg(s, function(f) {
      return f.test(a);
    }) : Ng(s, function(f) {
      return f.test(a);
    }), c;
    c = e.valueCallback ? e.valueCallback(u) : u, c = n.valueCallback ? n.valueCallback(c) : c;
    var l = t.slice(a.length);
    return {
      value: c,
      rest: l
    };
  };
}
function Ng(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n) && t(e[n]))
      return n;
}
function Fg(e, t) {
  for (var n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Dg(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = t.match(e.matchPattern);
    if (!i) return null;
    var r = i[0], o = t.match(e.parsePattern);
    if (!o) return null;
    var a = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    var s = t.slice(r.length);
    return {
      value: a,
      rest: s
    };
  };
}
var Mg = /^(\d+)(th|st|nd|rd)?/i, Lg = /\d+/i, jg = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, kg = {
  any: [/^b/i, /^(a|c)/i]
}, Ug = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Bg = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Hg = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, qg = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Gg = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Yg = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Wg = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, zg = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Kg = {
  ordinalNumber: Dg({
    matchPattern: Mg,
    parsePattern: Lg,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: kn({
    matchPatterns: jg,
    defaultMatchWidth: "wide",
    parsePatterns: kg,
    defaultParseWidth: "any"
  }),
  quarter: kn({
    matchPatterns: Ug,
    defaultMatchWidth: "wide",
    parsePatterns: Bg,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: kn({
    matchPatterns: Hg,
    defaultMatchWidth: "wide",
    parsePatterns: qg,
    defaultParseWidth: "any"
  }),
  day: kn({
    matchPatterns: Gg,
    defaultMatchWidth: "wide",
    parsePatterns: Yg,
    defaultParseWidth: "any"
  }),
  dayPeriod: kn({
    matchPatterns: Wg,
    defaultMatchWidth: "any",
    parsePatterns: zg,
    defaultParseWidth: "any"
  })
}, Ll = {
  code: "en-US",
  formatDistance: vg,
  formatLong: Eg,
  formatRelative: Sg,
  localize: Ig,
  match: Kg,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Qg = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Vg = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xg = /^'([^]*?)'?$/, Zg = /''/g, Jg = /[a-zA-Z]/;
function Ha(e, t, n) {
  var i, r, o, a, s, u, c, l, f, d, p, h, m, g;
  Te(2, arguments);
  var v = String(t), w = Cn(), A = (i = (r = void 0) !== null && r !== void 0 ? r : w.locale) !== null && i !== void 0 ? i : Ll, C = He((o = (a = (s = (u = void 0) !== null && u !== void 0 ? u : void 0) !== null && s !== void 0 ? s : w.firstWeekContainsDate) !== null && a !== void 0 ? a : (c = w.locale) === null || c === void 0 || (l = c.options) === null || l === void 0 ? void 0 : l.firstWeekContainsDate) !== null && o !== void 0 ? o : 1);
  if (!(C >= 1 && C <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var x = He((f = (d = (p = (h = void 0) !== null && h !== void 0 ? h : void 0) !== null && p !== void 0 ? p : w.weekStartsOn) !== null && d !== void 0 ? d : (m = w.locale) === null || m === void 0 || (g = m.options) === null || g === void 0 ? void 0 : g.weekStartsOn) !== null && f !== void 0 ? f : 0);
  if (!(x >= 0 && x <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!A.localize)
    throw new RangeError("locale must contain localize property");
  if (!A.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var b = De(e);
  if (!Hr(b))
    throw new RangeError("Invalid time value");
  var O = xl(b), S = Rl(b, O), _ = {
    firstWeekContainsDate: C,
    weekStartsOn: x,
    locale: A,
    _originalDate: b
  }, R = v.match(Vg).map(function(y) {
    var N = y[0];
    if (N === "p" || N === "P") {
      var j = Ba[N];
      return j(y, A.formatLong);
    }
    return y;
  }).join("").match(Qg).map(function(y) {
    if (y === "''")
      return "'";
    var N = y[0];
    if (N === "'")
      return ey(y);
    var j = pg[N];
    if (j)
      return Ml(y) && qr(y, t, String(e)), Dl(y) && qr(y, t, String(e)), j(S, y, A.localize, _);
    if (N.match(Jg))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + N + "`");
    return y;
  }).join("");
  return R;
}
function ey(e) {
  var t = e.match(Xg);
  return t ? t[1].replace(Zg, "'") : e;
}
function ty(e, t) {
  if (e == null)
    throw new TypeError("assign requires that input parameter not be null or undefined");
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
function Ou(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
  return i;
}
function ny(e, t) {
  if (e) {
    if (typeof e == "string") return Ou(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ou(e, t) : void 0;
  }
}
function Cu(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = ny(e)) || t) {
      n && (e = n);
      var i = 0, r = function() {
      };
      return {
        s: r,
        n: function() {
          return i >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[i++]
          };
        },
        e: function(c) {
          throw c;
        },
        f: r
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o, a = !0, s = !1;
  return {
    s: function() {
      n = n.call(e);
    },
    n: function() {
      var c = n.next();
      return a = c.done, c;
    },
    e: function(c) {
      s = !0, o = c;
    },
    f: function() {
      try {
        a || n.return == null || n.return();
      } finally {
        if (s) throw o;
      }
    }
  };
}
function q(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function qa(e, t) {
  return qa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, qa(e, t);
}
function te(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && qa(e, t);
}
function Gr(e) {
  return Gr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Gr(e);
}
function jl() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (jl = function() {
    return !!e;
  })();
}
function ry(e, t) {
  if (t && (Et(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return q(e);
}
function ne(e) {
  var t = jl();
  return function() {
    var n, i = Gr(e);
    if (t) {
      var r = Gr(this).constructor;
      n = Reflect.construct(i, arguments, r);
    } else n = i.apply(this, arguments);
    return ry(this, n);
  };
}
function J(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function iy(e, t) {
  if (Et(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (Et(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function kl(e) {
  var t = iy(e, "string");
  return Et(t) == "symbol" ? t : t + "";
}
function ay(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, kl(i.key), i);
  }
}
function ee(e, t, n) {
  return t && ay(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function B(e, t, n) {
  return (t = kl(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var oy = 10, Ul = /* @__PURE__ */ function() {
  function e() {
    J(this, e), B(this, "priority", void 0), B(this, "subPriority", 0);
  }
  return ee(e, [{
    key: "validate",
    value: function(n, i) {
      return !0;
    }
  }]), e;
}(), sy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n(i, r, o, a, s) {
    var u;
    return J(this, n), u = t.call(this), u.value = i, u.validateValue = r, u.setValue = o, u.priority = a, s && (u.subPriority = s), u;
  }
  return ee(n, [{
    key: "validate",
    value: function(r, o) {
      return this.validateValue(r, this.value, o);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return this.setValue(r, o, this.value, a);
    }
  }]), n;
}(Ul), uy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", oy), B(q(i), "subPriority", -1), i;
  }
  return ee(n, [{
    key: "set",
    value: function(r, o) {
      if (o.timestampIsSet)
        return r;
      var a = /* @__PURE__ */ new Date(0);
      return a.setFullYear(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), a.setHours(r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds()), a;
    }
  }]), n;
}(Ul), re = /* @__PURE__ */ function() {
  function e() {
    J(this, e), B(this, "incompatibleTokens", void 0), B(this, "priority", void 0), B(this, "subPriority", void 0);
  }
  return ee(e, [{
    key: "run",
    value: function(n, i, r, o) {
      var a = this.parse(n, i, r, o);
      return a ? {
        setter: new sy(a.value, this.validate, this.set, this.priority, this.subPriority),
        rest: a.rest
      } : null;
    }
  }, {
    key: "validate",
    value: function(n, i, r) {
      return !0;
    }
  }]), e;
}(), cy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 140), B(q(i), "incompatibleTokens", ["R", "u", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "G":
        case "GG":
        case "GGG":
          return a.era(r, {
            width: "abbreviated"
          }) || a.era(r, {
            width: "narrow"
          });
        case "GGGGG":
          return a.era(r, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return a.era(r, {
            width: "wide"
          }) || a.era(r, {
            width: "abbreviated"
          }) || a.era(r, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return o.era = a, r.setUTCFullYear(a, 0, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), _e = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, st = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function Ee(e, t) {
  return e && {
    value: t(e.value),
    rest: e.rest
  };
}
function he(e, t) {
  var n = t.match(e);
  return n ? {
    value: parseInt(n[0], 10),
    rest: t.slice(n[0].length)
  } : null;
}
function ut(e, t) {
  var n = t.match(e);
  if (!n)
    return null;
  if (n[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  var i = n[1] === "+" ? 1 : -1, r = n[2] ? parseInt(n[2], 10) : 0, o = n[3] ? parseInt(n[3], 10) : 0, a = n[5] ? parseInt(n[5], 10) : 0;
  return {
    value: i * (r * zo + o * Wo + a * og),
    rest: t.slice(n[0].length)
  };
}
function Bl(e) {
  return he(_e.anyDigitsSigned, e);
}
function me(e, t) {
  switch (e) {
    case 1:
      return he(_e.singleDigit, t);
    case 2:
      return he(_e.twoDigits, t);
    case 3:
      return he(_e.threeDigits, t);
    case 4:
      return he(_e.fourDigits, t);
    default:
      return he(new RegExp("^\\d{1," + e + "}"), t);
  }
}
function Yr(e, t) {
  switch (e) {
    case 1:
      return he(_e.singleDigitSigned, t);
    case 2:
      return he(_e.twoDigitsSigned, t);
    case 3:
      return he(_e.threeDigitsSigned, t);
    case 4:
      return he(_e.fourDigitsSigned, t);
    default:
      return he(new RegExp("^-?\\d{1," + e + "}"), t);
  }
}
function Qo(e) {
  switch (e) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function Hl(e, t) {
  var n = t > 0, i = n ? t : 1 - t, r;
  if (i <= 50)
    r = e || 100;
  else {
    var o = i + 50, a = Math.floor(o / 100) * 100, s = e >= o % 100;
    r = e + a - (s ? 100 : 0);
  }
  return n ? r : 1 - r;
}
function ql(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
var ly = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 130), B(q(i), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      var s = function(c) {
        return {
          year: c,
          isTwoDigitYear: o === "yy"
        };
      };
      switch (o) {
        case "y":
          return Ee(me(4, r), s);
        case "yo":
          return Ee(a.ordinalNumber(r, {
            unit: "year"
          }), s);
        default:
          return Ee(me(o.length, r), s);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      var s = r.getUTCFullYear();
      if (a.isTwoDigitYear) {
        var u = Hl(a.year, s);
        return r.setUTCFullYear(u, 0, 1), r.setUTCHours(0, 0, 0, 0), r;
      }
      var c = !("era" in o) || o.era === 1 ? a.year : 1 - a.year;
      return r.setUTCFullYear(c, 0, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), fy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 130), B(q(i), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      var s = function(c) {
        return {
          year: c,
          isTwoDigitYear: o === "YY"
        };
      };
      switch (o) {
        case "Y":
          return Ee(me(4, r), s);
        case "Yo":
          return Ee(a.ordinalNumber(r, {
            unit: "year"
          }), s);
        default:
          return Ee(me(o.length, r), s);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o.isTwoDigitYear || o.year > 0;
    }
  }, {
    key: "set",
    value: function(r, o, a, s) {
      var u = Ko(r, s);
      if (a.isTwoDigitYear) {
        var c = Hl(a.year, u);
        return r.setUTCFullYear(c, 0, s.firstWeekContainsDate), r.setUTCHours(0, 0, 0, 0), Vt(r, s);
      }
      var l = !("era" in o) || o.era === 1 ? a.year : 1 - a.year;
      return r.setUTCFullYear(l, 0, s.firstWeekContainsDate), r.setUTCHours(0, 0, 0, 0), Vt(r, s);
    }
  }]), n;
}(re), dy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 130), B(q(i), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o) {
      return Yr(o === "R" ? 4 : o.length, r);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      var s = /* @__PURE__ */ new Date(0);
      return s.setUTCFullYear(a, 0, 4), s.setUTCHours(0, 0, 0, 0), bn(s);
    }
  }]), n;
}(re), py = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 130), B(q(i), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o) {
      return Yr(o === "u" ? 4 : o.length, r);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCFullYear(a, 0, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), hy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 120), B(q(i), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "Q":
        case "QQ":
          return me(o.length, r);
        case "Qo":
          return a.ordinalNumber(r, {
            unit: "quarter"
          });
        case "QQQ":
          return a.quarter(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.quarter(r, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return a.quarter(r, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return a.quarter(r, {
            width: "wide",
            context: "formatting"
          }) || a.quarter(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.quarter(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMonth((a - 1) * 3, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), my = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 120), B(q(i), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "q":
        case "qq":
          return me(o.length, r);
        case "qo":
          return a.ordinalNumber(r, {
            unit: "quarter"
          });
        case "qqq":
          return a.quarter(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.quarter(r, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return a.quarter(r, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return a.quarter(r, {
            width: "wide",
            context: "standalone"
          }) || a.quarter(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.quarter(r, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 4;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMonth((a - 1) * 3, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), gy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]), B(q(i), "priority", 110), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      var s = function(c) {
        return c - 1;
      };
      switch (o) {
        case "M":
          return Ee(he(_e.month, r), s);
        case "MM":
          return Ee(me(2, r), s);
        case "Mo":
          return Ee(a.ordinalNumber(r, {
            unit: "month"
          }), s);
        case "MMM":
          return a.month(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.month(r, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return a.month(r, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return a.month(r, {
            width: "wide",
            context: "formatting"
          }) || a.month(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.month(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMonth(a, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), yy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 110), B(q(i), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      var s = function(c) {
        return c - 1;
      };
      switch (o) {
        case "L":
          return Ee(he(_e.month, r), s);
        case "LL":
          return Ee(me(2, r), s);
        case "Lo":
          return Ee(a.ordinalNumber(r, {
            unit: "month"
          }), s);
        case "LLL":
          return a.month(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.month(r, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return a.month(r, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return a.month(r, {
            width: "wide",
            context: "standalone"
          }) || a.month(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.month(r, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMonth(a, 1), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re);
function vy(e, t, n) {
  Te(2, arguments);
  var i = De(e), r = He(t), o = Nl(i, n) - r;
  return i.setUTCDate(i.getUTCDate() - o * 7), i;
}
var wy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 100), B(q(i), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "w":
          return he(_e.week, r);
        case "wo":
          return a.ordinalNumber(r, {
            unit: "week"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(r, o, a, s) {
      return Vt(vy(r, a, s), s);
    }
  }]), n;
}(re);
function by(e, t) {
  Te(2, arguments);
  var n = De(e), i = He(t), r = Il(n) - i;
  return n.setUTCDate(n.getUTCDate() - r * 7), n;
}
var _y = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 100), B(q(i), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "I":
          return he(_e.week, r);
        case "Io":
          return a.ordinalNumber(r, {
            unit: "week"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 53;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return bn(by(r, a));
    }
  }]), n;
}(re), Ey = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ty = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Sy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "subPriority", 1), B(q(i), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "d":
          return he(_e.date, r);
        case "do":
          return a.ordinalNumber(r, {
            unit: "date"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      var a = r.getUTCFullYear(), s = ql(a), u = r.getUTCMonth();
      return s ? o >= 1 && o <= Ty[u] : o >= 1 && o <= Ey[u];
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCDate(a), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), Ay = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "subpriority", 1), B(q(i), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "D":
        case "DD":
          return he(_e.dayOfYear, r);
        case "Do":
          return a.ordinalNumber(r, {
            unit: "date"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      var a = r.getUTCFullYear(), s = ql(a);
      return s ? o >= 1 && o <= 366 : o >= 1 && o <= 365;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMonth(0, a), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re);
function Vo(e, t, n) {
  var i, r, o, a, s, u, c, l;
  Te(2, arguments);
  var f = Cn(), d = He((i = (r = (o = (a = n?.weekStartsOn) !== null && a !== void 0 ? a : n == null || (s = n.locale) === null || s === void 0 || (u = s.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && o !== void 0 ? o : f.weekStartsOn) !== null && r !== void 0 ? r : (c = f.locale) === null || c === void 0 || (l = c.options) === null || l === void 0 ? void 0 : l.weekStartsOn) !== null && i !== void 0 ? i : 0);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var p = De(e), h = He(t), m = p.getUTCDay(), g = h % 7, v = (g + 7) % 7, w = (v < d ? 7 : 0) + h - m;
  return p.setUTCDate(p.getUTCDate() + w), p;
}
var Oy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "E":
        case "EE":
        case "EEE":
          return a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return a.day(r, {
            width: "wide",
            context: "formatting"
          }) || a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(r, o, a, s) {
      return r = Vo(r, a, s), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), Cy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a, s) {
      var u = function(l) {
        var f = Math.floor((l - 1) / 7) * 7;
        return (l + s.weekStartsOn + 6) % 7 + f;
      };
      switch (o) {
        case "e":
        case "ee":
          return Ee(me(o.length, r), u);
        case "eo":
          return Ee(a.ordinalNumber(r, {
            unit: "day"
          }), u);
        case "eee":
          return a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return a.day(r, {
            width: "wide",
            context: "formatting"
          }) || a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(r, o, a, s) {
      return r = Vo(r, a, s), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), xy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a, s) {
      var u = function(l) {
        var f = Math.floor((l - 1) / 7) * 7;
        return (l + s.weekStartsOn + 6) % 7 + f;
      };
      switch (o) {
        case "c":
        case "cc":
          return Ee(me(o.length, r), u);
        case "co":
          return Ee(a.ordinalNumber(r, {
            unit: "day"
          }), u);
        case "ccc":
          return a.day(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.day(r, {
            width: "short",
            context: "standalone"
          }) || a.day(r, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return a.day(r, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return a.day(r, {
            width: "short",
            context: "standalone"
          }) || a.day(r, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return a.day(r, {
            width: "wide",
            context: "standalone"
          }) || a.day(r, {
            width: "abbreviated",
            context: "standalone"
          }) || a.day(r, {
            width: "short",
            context: "standalone"
          }) || a.day(r, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 6;
    }
  }, {
    key: "set",
    value: function(r, o, a, s) {
      return r = Vo(r, a, s), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re);
function Py(e, t) {
  Te(2, arguments);
  var n = He(t);
  n % 7 === 0 && (n = n - 7);
  var i = 1, r = De(e), o = r.getUTCDay(), a = n % 7, s = (a + 7) % 7, u = (s < i ? 7 : 0) + n - o;
  return r.setUTCDate(r.getUTCDate() + u), r;
}
var Ry = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 90), B(q(i), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      var s = function(c) {
        return c === 0 ? 7 : c;
      };
      switch (o) {
        case "i":
        case "ii":
          return me(o.length, r);
        case "io":
          return a.ordinalNumber(r, {
            unit: "day"
          });
        case "iii":
          return Ee(a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          }), s);
        case "iiiii":
          return Ee(a.day(r, {
            width: "narrow",
            context: "formatting"
          }), s);
        case "iiiiii":
          return Ee(a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          }), s);
        case "iiii":
        default:
          return Ee(a.day(r, {
            width: "wide",
            context: "formatting"
          }) || a.day(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(r, {
            width: "short",
            context: "formatting"
          }) || a.day(r, {
            width: "narrow",
            context: "formatting"
          }), s);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 7;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r = Py(r, a), r.setUTCHours(0, 0, 0, 0), r;
    }
  }]), n;
}(re), $y = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 80), B(q(i), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "a":
        case "aa":
        case "aaa":
          return a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return a.dayPeriod(r, {
            width: "wide",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCHours(Qo(a), 0, 0, 0), r;
    }
  }]), n;
}(re), Iy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 80), B(q(i), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "b":
        case "bb":
        case "bbb":
          return a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return a.dayPeriod(r, {
            width: "wide",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCHours(Qo(a), 0, 0, 0), r;
    }
  }]), n;
}(re), Ny = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 80), B(q(i), "incompatibleTokens", ["a", "b", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "B":
        case "BB":
        case "BBB":
          return a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return a.dayPeriod(r, {
            width: "wide",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting"
          }) || a.dayPeriod(r, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCHours(Qo(a), 0, 0, 0), r;
    }
  }]), n;
}(re), Fy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 70), B(q(i), "incompatibleTokens", ["H", "K", "k", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "h":
          return he(_e.hour12h, r);
        case "ho":
          return a.ordinalNumber(r, {
            unit: "hour"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 12;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      var s = r.getUTCHours() >= 12;
      return s && a < 12 ? r.setUTCHours(a + 12, 0, 0, 0) : !s && a === 12 ? r.setUTCHours(0, 0, 0, 0) : r.setUTCHours(a, 0, 0, 0), r;
    }
  }]), n;
}(re), Dy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 70), B(q(i), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "H":
          return he(_e.hour23h, r);
        case "Ho":
          return a.ordinalNumber(r, {
            unit: "hour"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 23;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCHours(a, 0, 0, 0), r;
    }
  }]), n;
}(re), My = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 70), B(q(i), "incompatibleTokens", ["h", "H", "k", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "K":
          return he(_e.hour11h, r);
        case "Ko":
          return a.ordinalNumber(r, {
            unit: "hour"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 11;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      var s = r.getUTCHours() >= 12;
      return s && a < 12 ? r.setUTCHours(a + 12, 0, 0, 0) : r.setUTCHours(a, 0, 0, 0), r;
    }
  }]), n;
}(re), Ly = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 70), B(q(i), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "k":
          return he(_e.hour24h, r);
        case "ko":
          return a.ordinalNumber(r, {
            unit: "hour"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 1 && o <= 24;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      var s = a <= 24 ? a % 24 : a;
      return r.setUTCHours(s, 0, 0, 0), r;
    }
  }]), n;
}(re), jy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 60), B(q(i), "incompatibleTokens", ["t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "m":
          return he(_e.minute, r);
        case "mo":
          return a.ordinalNumber(r, {
            unit: "minute"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMinutes(a, 0, 0), r;
    }
  }]), n;
}(re), ky = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 50), B(q(i), "incompatibleTokens", ["t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o, a) {
      switch (o) {
        case "s":
          return he(_e.second, r);
        case "so":
          return a.ordinalNumber(r, {
            unit: "second"
          });
        default:
          return me(o.length, r);
      }
    }
  }, {
    key: "validate",
    value: function(r, o) {
      return o >= 0 && o <= 59;
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCSeconds(a, 0), r;
    }
  }]), n;
}(re), Uy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 30), B(q(i), "incompatibleTokens", ["t", "T"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o) {
      var a = function(u) {
        return Math.floor(u * Math.pow(10, -o.length + 3));
      };
      return Ee(me(o.length, r), a);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return r.setUTCMilliseconds(a), r;
    }
  }]), n;
}(re), By = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 10), B(q(i), "incompatibleTokens", ["t", "T", "x"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o) {
      switch (o) {
        case "X":
          return ut(st.basicOptionalMinutes, r);
        case "XX":
          return ut(st.basic, r);
        case "XXXX":
          return ut(st.basicOptionalSeconds, r);
        case "XXXXX":
          return ut(st.extendedOptionalSeconds, r);
        case "XXX":
        default:
          return ut(st.extended, r);
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return o.timestampIsSet ? r : new Date(r.getTime() - a);
    }
  }]), n;
}(re), Hy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 10), B(q(i), "incompatibleTokens", ["t", "T", "X"]), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r, o) {
      switch (o) {
        case "x":
          return ut(st.basicOptionalMinutes, r);
        case "xx":
          return ut(st.basic, r);
        case "xxxx":
          return ut(st.basicOptionalSeconds, r);
        case "xxxxx":
          return ut(st.extendedOptionalSeconds, r);
        case "xxx":
        default:
          return ut(st.extended, r);
      }
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return o.timestampIsSet ? r : new Date(r.getTime() - a);
    }
  }]), n;
}(re), qy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 40), B(q(i), "incompatibleTokens", "*"), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r) {
      return Bl(r);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return [new Date(a * 1e3), {
        timestampIsSet: !0
      }];
    }
  }]), n;
}(re), Gy = /* @__PURE__ */ function(e) {
  te(n, e);
  var t = ne(n);
  function n() {
    var i;
    J(this, n);
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return i = t.call.apply(t, [this].concat(o)), B(q(i), "priority", 20), B(q(i), "incompatibleTokens", "*"), i;
  }
  return ee(n, [{
    key: "parse",
    value: function(r) {
      return Bl(r);
    }
  }, {
    key: "set",
    value: function(r, o, a) {
      return [new Date(a), {
        timestampIsSet: !0
      }];
    }
  }]), n;
}(re), Yy = {
  G: new cy(),
  y: new ly(),
  Y: new fy(),
  R: new dy(),
  u: new py(),
  Q: new hy(),
  q: new my(),
  M: new gy(),
  L: new yy(),
  w: new wy(),
  I: new _y(),
  d: new Sy(),
  D: new Ay(),
  E: new Oy(),
  e: new Cy(),
  c: new xy(),
  i: new Ry(),
  a: new $y(),
  b: new Iy(),
  B: new Ny(),
  h: new Fy(),
  H: new Dy(),
  K: new My(),
  k: new Ly(),
  m: new jy(),
  s: new ky(),
  S: new Uy(),
  X: new By(),
  x: new Hy(),
  t: new qy(),
  T: new Gy()
}, Wy = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zy = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ky = /^'([^]*?)'?$/, Qy = /''/g, Vy = /\S/, Xy = /[a-zA-Z]/;
function Zy(e, t, n, i) {
  var r, o, a, s, u, c, l, f, d, p, h, m, g, v;
  Te(3, arguments);
  var w = String(e), A = String(t), C = Cn(), x = (r = (o = void 0) !== null && o !== void 0 ? o : C.locale) !== null && r !== void 0 ? r : Ll;
  if (!x.match)
    throw new RangeError("locale must contain match property");
  var b = He((a = (s = (u = (c = void 0) !== null && c !== void 0 ? c : void 0) !== null && u !== void 0 ? u : C.firstWeekContainsDate) !== null && s !== void 0 ? s : (l = C.locale) === null || l === void 0 || (f = l.options) === null || f === void 0 ? void 0 : f.firstWeekContainsDate) !== null && a !== void 0 ? a : 1);
  if (!(b >= 1 && b <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var O = He((d = (p = (h = (m = void 0) !== null && m !== void 0 ? m : void 0) !== null && h !== void 0 ? h : C.weekStartsOn) !== null && p !== void 0 ? p : (g = C.locale) === null || g === void 0 || (v = g.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && d !== void 0 ? d : 0);
  if (!(O >= 0 && O <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (A === "")
    return w === "" ? De(n) : /* @__PURE__ */ new Date(NaN);
  var S = {
    firstWeekContainsDate: b,
    weekStartsOn: O,
    locale: x
  }, _ = [new uy()], R = A.match(zy).map(function(P) {
    var $ = P[0];
    if ($ in Ba) {
      var I = Ba[$];
      return I(P, x.formatLong);
    }
    return P;
  }).join("").match(Wy), y = [], N = Cu(R), j;
  try {
    var G = function() {
      var $ = j.value;
      !(i != null && i.useAdditionalWeekYearTokens) && Ml($) && qr($, A, e), !(i != null && i.useAdditionalDayOfYearTokens) && Dl($) && qr($, A, e);
      var I = $[0], X = Yy[I];
      if (X) {
        var fe = X.incompatibleTokens;
        if (Array.isArray(fe)) {
          var k = y.find(function(L) {
            return fe.includes(L.token) || L.token === I;
          });
          if (k)
            throw new RangeError("The format string mustn't contain `".concat(k.fullToken, "` and `").concat($, "` at the same time"));
        } else if (X.incompatibleTokens === "*" && y.length > 0)
          throw new RangeError("The format string mustn't contain `".concat($, "` and any other token at the same time"));
        y.push({
          token: I,
          fullToken: $
        });
        var Z = X.run(w, $, x.match, S);
        if (!Z)
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        _.push(Z.setter), w = Z.rest;
      } else {
        if (I.match(Xy))
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + I + "`");
        if ($ === "''" ? $ = "'" : I === "'" && ($ = Jy($)), w.indexOf($) === 0)
          w = w.slice($.length);
        else
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
      }
    };
    for (N.s(); !(j = N.n()).done; ) {
      var E = G();
      if (Et(E) === "object") return E.v;
    }
  } catch (P) {
    N.e(P);
  } finally {
    N.f();
  }
  if (w.length > 0 && Vy.test(w))
    return /* @__PURE__ */ new Date(NaN);
  var T = _.map(function(P) {
    return P.priority;
  }).sort(function(P, $) {
    return $ - P;
  }).filter(function(P, $, I) {
    return I.indexOf(P) === $;
  }).map(function(P) {
    return _.filter(function($) {
      return $.priority === P;
    }).sort(function($, I) {
      return I.subPriority - $.subPriority;
    });
  }).map(function(P) {
    return P[0];
  }), U = De(n);
  if (isNaN(U.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var D = Rl(U, xl(U)), M = {}, z = Cu(T), V;
  try {
    for (z.s(); !(V = z.n()).done; ) {
      var ie = V.value;
      if (!ie.validate(D, S))
        return /* @__PURE__ */ new Date(NaN);
      var Ce = ie.set(D, M, S);
      Array.isArray(Ce) ? (D = Ce[0], ty(M, Ce[1])) : D = Ce;
    }
  } catch (P) {
    z.e(P);
  } finally {
    z.f();
  }
  return D;
}
function Jy(e) {
  return e.match(Ky)[1].replace(Qy, "'");
}
function Gl(e, t) {
  var n;
  Te(1, arguments);
  var i = He((n = void 0) !== null && n !== void 0 ? n : 2);
  if (i !== 2 && i !== 1 && i !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var r = rv(e), o;
  if (r.date) {
    var a = iv(r.date, i);
    o = av(a.restDateString, a.year);
  }
  if (!o || isNaN(o.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  var s = o.getTime(), u = 0, c;
  if (r.time && (u = ov(r.time), isNaN(u)))
    return /* @__PURE__ */ new Date(NaN);
  if (r.timezone) {
    if (c = sv(r.timezone), isNaN(c))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    var l = new Date(s + u), f = /* @__PURE__ */ new Date(0);
    return f.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), f.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), f;
  }
  return new Date(s + u + c);
}
var br = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, ev = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, tv = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, nv = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function rv(e) {
  var t = {}, n = e.split(br.dateTimeDelimiter), i;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? i = n[0] : (t.date = n[0], i = n[1], br.timeZoneDelimiter.test(t.date) && (t.date = e.split(br.timeZoneDelimiter)[0], i = e.substr(t.date.length, e.length))), i) {
    var r = br.timezone.exec(i);
    r ? (t.time = i.replace(r[1], ""), t.timezone = r[1]) : t.time = i;
  }
  return t;
}
function iv(e, t) {
  var n = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"), i = e.match(n);
  if (!i) return {
    year: NaN,
    restDateString: ""
  };
  var r = i[1] ? parseInt(i[1]) : null, o = i[2] ? parseInt(i[2]) : null;
  return {
    year: o === null ? r : o * 100,
    restDateString: e.slice((i[1] || i[2]).length)
  };
}
function av(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  var n = e.match(ev);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  var i = !!n[4], r = Un(n[1]), o = Un(n[2]) - 1, a = Un(n[3]), s = Un(n[4]), u = Un(n[5]) - 1;
  if (i)
    return dv(t, s, u) ? uv(t, s, u) : /* @__PURE__ */ new Date(NaN);
  var c = /* @__PURE__ */ new Date(0);
  return !lv(t, o, a) || !fv(t, r) ? /* @__PURE__ */ new Date(NaN) : (c.setUTCFullYear(t, o, Math.max(r, a)), c);
}
function Un(e) {
  return e ? parseInt(e) : 1;
}
function ov(e) {
  var t = e.match(tv);
  if (!t) return NaN;
  var n = la(t[1]), i = la(t[2]), r = la(t[3]);
  return pv(n, i, r) ? n * zo + i * Wo + r * 1e3 : NaN;
}
function la(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function sv(e) {
  if (e === "Z") return 0;
  var t = e.match(nv);
  if (!t) return 0;
  var n = t[1] === "+" ? -1 : 1, i = parseInt(t[2]), r = t[3] && parseInt(t[3]) || 0;
  return hv(i, r) ? n * (i * zo + r * Wo) : NaN;
}
function uv(e, t, n) {
  var i = /* @__PURE__ */ new Date(0);
  i.setUTCFullYear(e, 0, 4);
  var r = i.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - r;
  return i.setUTCDate(i.getUTCDate() + o), i;
}
var cv = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Yl(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function lv(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (cv[t] || (Yl(e) ? 29 : 28));
}
function fv(e, t) {
  return t >= 1 && t <= (Yl(e) ? 366 : 365);
}
function dv(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function pv(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function hv(e, t) {
  return t >= 0 && t <= 59;
}
const mv = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]{1,3})?$/, Xo = (e) => Pl(e), gv = (e) => {
  if (Xo(e))
    return Ha(e, "HH:mm:ss.SSS");
  if (typeof e != "string")
    throw new Error(`Expected a string, got a ${typeof e}`);
  const t = e.match(mv);
  if (t === null)
    throw new Error("Invalid time format, expected HH:mm:ss.SSS");
  const [, n, i, r, o = ".000"] = t, a = ol.padEnd(o.slice(1), 3, "0");
  return `${n}:${i}:${r}.${a}`;
}, yv = (e) => {
  if (Xo(e))
    return Ha(e, "yyyy-MM-dd");
  if (typeof e != "string")
    throw new Error(`Expected a string, got a ${typeof e}`);
  try {
    const t = Gl(e);
    if (Hr(t)) return Ha(t, "yyyy-MM-dd");
    throw new Error("Invalid format, expected an ISO compatible date");
  } catch {
    throw new Error("Invalid format, expected an ISO compatible date");
  }
}, vv = (e) => {
  if (Xo(e))
    return e;
  if (typeof e != "string")
    throw new Error(`Expected a string, got a ${typeof e}`);
  try {
    const t = Gl(e);
    if (Hr(t)) return t;
    const n = Zy(e, "T", /* @__PURE__ */ new Date());
    if (Hr(n)) return n;
    throw new Error("Invalid format, expected a timestamp or an ISO date");
  } catch {
    throw new Error("Invalid format, expected a timestamp or an ISO date");
  }
}, wv = (e, t) => {
  const { forceCast: n = !1 } = t;
  if (typeof e == "boolean")
    return e;
  if (typeof e == "string" || typeof e == "number") {
    if ([
      "true",
      "t",
      "1",
      1
    ].includes(e))
      return !0;
    if ([
      "false",
      "f",
      "0",
      0
    ].includes(e))
      return !1;
  }
  if (n)
    return !!e;
  throw new Error('Invalid boolean input. Expected "t","1","true","false","0","f"');
}, Yt = (e) => {
  const { type: t, value: n, forceCast: i } = e;
  switch (t) {
    case "boolean":
      return wv(n, {
        forceCast: i
      });
    case "integer":
    case "biginteger":
    case "float":
    case "decimal":
      return ol.toNumber(n);
    case "time":
      return gv(n);
    case "date":
      return yv(n);
    case "timestamp":
    case "datetime":
      return vv(n);
    default:
      return n;
  }
};
function bv(e, t) {
  return H.has(process.env, e) ? process.env[e] : t;
}
function nn(e) {
  return process.env[e] ?? "";
}
const _v = {
  int(e, t) {
    return H.has(process.env, e) ? parseInt(nn(e), 10) : t;
  },
  float(e, t) {
    return H.has(process.env, e) ? parseFloat(nn(e)) : t;
  },
  bool(e, t) {
    return H.has(process.env, e) ? nn(e) === "true" : t;
  },
  json(e, t) {
    if (!H.has(process.env, e))
      return t;
    try {
      return JSON.parse(nn(e));
    } catch (n) {
      throw n instanceof Error ? new Error(`Invalid json environment variable ${e}: ${n.message}`) : n;
    }
  },
  array(e, t) {
    if (!H.has(process.env, e))
      return t;
    let n = nn(e);
    return n.startsWith("[") && n.endsWith("]") && (n = n.substring(1, n.length - 1)), n.split(",").map((i) => H.trim(H.trim(i, " "), '"'));
  },
  date(e, t) {
    return H.has(process.env, e) ? new Date(nn(e)) : t;
  },
  /**
  * Gets a value from env that matches oneOf provided values
  * @param {string} key
  * @param {string[]} expectedValues
  * @param {string|undefined} defaultValue
  * @returns {string|undefined}
  */
  oneOf(e, t, n) {
    if (!t)
      throw new Error("env.oneOf requires expectedValues");
    if (n && !t.includes(n))
      throw new Error("env.oneOf requires defaultValue to be included in expectedValues");
    const i = Wl(e, n);
    return t.includes(i) ? i : n;
  }
}, Wl = Object.assign(bv, _v), zl = "singleType", Wr = "collectionType", Zo = "id", Jo = "documentId", Kl = "publishedAt", Ev = "firstPublishedAt", Ga = "createdBy", Ya = "updatedBy", Wa = "createdAt", za = "updatedAt", Je = {
  ID_ATTRIBUTE: Zo,
  DOC_ID_ATTRIBUTE: Jo,
  PUBLISHED_AT_ATTRIBUTE: Kl,
  FIRST_PUBLISHED_AT_ATTRIBUTE: Ev,
  CREATED_BY_ATTRIBUTE: Ga,
  UPDATED_BY_ATTRIBUTE: Ya,
  CREATED_AT_ATTRIBUTE: Wa,
  UPDATED_AT_ATTRIBUTE: za,
  SINGLE_TYPE: zl,
  COLLECTION_TYPE: Wr
}, es = (e) => {
  const t = [];
  return Lr(Wa, e.attributes) && t.push(Wa), Lr(za, e.attributes) && t.push(za), t;
}, Tv = (e) => {
  const t = [];
  return Lr(Ga, e.attributes) && t.push(Ga), Lr(Ya, e.attributes) && t.push(Ya), t;
}, $i = (e) => {
  if (!e) return [];
  const t = H.reduce(e.attributes, (n, i, r) => i.writable === !1 ? n.concat(r) : n, []);
  return H.uniq([
    Zo,
    Jo,
    ...es(e),
    ...t
  ]);
}, Ql = (e) => e ? H.difference(Object.keys(e.attributes), $i(e)) : [], Sv = (e, t) => Ql(e).includes(t), Vl = (e) => {
  const t = H.reduce(e.attributes, (n, i, r) => i.visible === !1 ? n.concat(r) : n, []);
  return H.uniq([
    Zo,
    Jo,
    ...es(e),
    ...t
  ]);
}, Xl = (e) => H.difference(H.keys(e.attributes), Vl(e)), Av = (e, t) => Xl(e).includes(t), Ov = (e) => H.assign({
  draftAndPublish: !1
}, H.get(e, "options", {})), Ii = (e) => H.get(e, "options.draftAndPublish", !1) === !0, Cv = (e) => strapi.config.get("features.future.experimental_firstPublishedAt", !1) && Ii(e), xv = (e, t) => Ii(t) && H.get(e, Kl) === null, ts = (e) => typeof e == "object" && e !== null && "modelType" in e && typeof e.modelType == "string" && [
  "component",
  "contentType"
].includes(e.modelType), Zl = (e) => ts(e) && e.modelType === "component", Pv = (e) => ts(e) && e.modelType === "contentType", Jl = ({ kind: e = Wr }) => e === zl, Rv = ({ kind: e = Wr }) => e === Wr, $v = (e) => (t) => t.kind === e, ef = (e) => Hp(strapi?.config?.get("api.responses.privateAttributes", []) ?? [], qp([], "options.privateAttributes", e)), Iv = (e) => H.union(ef(e), H.keys(H.pickBy(e.attributes, (t) => !!t.private))), ns = (e, t) => e?.attributes?.[t]?.private === !0 ? !0 : ef(e).includes(t), xn = (e) => e && ![
  "media",
  "component",
  "relation",
  "dynamiczone"
].includes(e.type), Nv = (e) => e.required || e.unique || Object.prototype.hasOwnProperty.call(e, "max") || Object.prototype.hasOwnProperty.call(e, "min") || Object.prototype.hasOwnProperty.call(e, "maxLength") || Object.prototype.hasOwnProperty.call(e, "minLength"), rs = (e) => e?.type === "media", dt = (e) => e?.type === "relation", Fv = [
  "manyToMany",
  "manyToOne",
  "oneToMany"
], tf = (e) => dt(e) && Fv.includes(e.relation), nf = (e) => [
  "component",
  "dynamiczone"
].includes(e?.type), rr = (e) => !!e && e.type === "dynamiczone", Dt = (e) => !!e && dt(e) && e.relation?.startsWith?.("morphTo"), Dv = (e) => H.reduce(e.attributes, (t, n, i) => (nf(n) && t.push(i), t), []), Mv = (e) => H.reduce(e.attributes, (t, n, i) => (xn(n) && t.push(i), t), []), Lv = (e) => H.reduce(e.attributes, (t, n, i) => (dt(n) && t.push(i), t), []), jv = (e, t) => H.has(e, "type") && e.type === t, kv = (e) => Jl(e) ? H.kebabCase(e.info.singularName) : H.kebabCase(e.info.pluralName), Uv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  constants: Je,
  getComponentAttributes: Dv,
  getContentTypeRoutePrefix: kv,
  getCreatorFields: Tv,
  getDoesAttributeRequireValidation: Nv,
  getNonVisibleAttributes: Vl,
  getNonWritableAttributes: $i,
  getOptions: Ov,
  getPrivateAttributes: Iv,
  getRelationalAttributes: Lv,
  getScalarAttributes: Mv,
  getTimestamps: es,
  getVisibleAttributes: Xl,
  getWritableAttributes: Ql,
  hasDraftAndPublish: Ii,
  hasFirstPublishedAtField: Cv,
  hasRelationReordering: tf,
  isCollectionType: Rv,
  isComponentAttribute: nf,
  isComponentSchema: Zl,
  isContentTypeSchema: Pv,
  isDraft: xv,
  isDynamicZoneAttribute: rr,
  isKind: $v,
  isMediaAttribute: rs,
  isMorphToRelationalAttribute: Dt,
  isPrivateAttribute: ns,
  isRelationalAttribute: dt,
  isScalarAttribute: xn,
  isSchema: ts,
  isSingleType: Jl,
  isTypedAttribute: jv,
  isVisibleAttribute: Av,
  isWritableAttribute: Sv
}, Symbol.toStringTag, { value: "Module" })), { CREATED_BY_ATTRIBUTE: Bv, UPDATED_BY_ATTRIBUTE: xu } = Je, Hv = ({ user: e, isEdition: t = !1 }) => (n) => t ? Gp(xu, e.id, n) : Yp(n, {
  [Bv]: e.id,
  [xu]: e.id
}), ir = () => {
  const e = {
    handlers: []
  };
  return {
    getHandlers() {
      return e.handlers;
    },
    register(t) {
      return e.handlers.push(t), this;
    },
    delete(t) {
      return e.handlers = Wp(po(t), e.handlers), this;
    },
    call() {
      throw new Error("Method not implemented");
    }
  };
}, rf = () => ({
  ...ir(),
  async call(e) {
    for (const t of this.getHandlers())
      await t(e);
  }
}), qv = () => ({
  ...ir(),
  async call(e) {
    let t = e;
    for (const n of this.getHandlers())
      t = await n(t);
    return t;
  }
}), Rr = () => ({
  ...ir(),
  async call(e) {
    const t = this.getHandlers().map((n) => n(bt(e)));
    return Promise.all(t);
  }
}), Gv = () => ({
  ...ir(),
  async call(e) {
    for (const t of this.getHandlers()) {
      const n = await t(e);
      if (n !== void 0)
        return n;
    }
  }
}), Yv = {
  // Internal utils
  createHook: ir
}, Wv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAsyncBailHook: Gv,
  createAsyncParallelHook: Rr,
  createAsyncSeriesHook: rf,
  createAsyncSeriesWaterfallHook: qv,
  internals: Yv
}, Symbol.toStringTag, { value: "Module" })), zv = () => ({
  // Register events
  willRegister: rf(),
  didRegister: Rr(),
  // Delete events
  willDelete: Rr(),
  didDelete: Rr()
}), Kv = (e = {}) => {
  const { throwOnDuplicates: t = !0 } = e, n = {
    hooks: zv(),
    registry: /* @__PURE__ */ new Map()
  };
  return {
    hooks: n.hooks,
    async register(i, r) {
      if (t && this.has(i))
        throw new Error(`Duplicated item key: ${i}`);
      return await n.hooks.willRegister.call({
        key: i,
        value: r
      }), n.registry.set(i, r), await n.hooks.didRegister.call({
        key: i,
        value: bt(r)
      }), this;
    },
    async delete(i) {
      if (this.has(i)) {
        const r = this.get(i);
        await n.hooks.willDelete.call({
          key: i,
          value: bt(r)
        }), n.registry.delete(i), await n.hooks.didDelete.call({
          key: i,
          value: bt(r)
        });
      }
      return this;
    },
    get(i) {
      return n.registry.get(i);
    },
    values() {
      return Array.from(n.registry.values());
    },
    keys() {
      return Array.from(n.registry.keys());
    },
    has(i) {
      return n.registry.has(i);
    },
    size() {
      return n.registry.size;
    },
    async clear() {
      const i = this.keys();
      for (const r of i)
        await this.delete(r);
      return this;
    }
  };
}, ln = async (e, t, n) => {
  const { path: i = {
    raw: null,
    attribute: null
  }, schema: r, getModel: o } = t;
  let a = t.parent;
  const s = async (m, g, v) => {
    const A = {
      schema: o(v.__type),
      path: g,
      getModel: o,
      parent: a
    };
    return ln(m, A, v);
  }, u = (m) => async (g, v, w) => ln(g, {
    schema: m,
    path: v,
    getModel: o,
    parent: a
  }, w), c = async (m, g, v) => {
    const C = {
      schema: o("plugin::upload.file"),
      path: g,
      getModel: o,
      parent: a
    };
    return ln(m, C, v);
  }, l = async (m, g, v, w) => ln(m, {
    schema: v,
    path: g,
    getModel: o,
    parent: a
  }, w), f = async (m, g, v) => {
    const A = {
      schema: o(v.__component),
      path: g,
      getModel: o,
      parent: a
    };
    return ln(m, A, v);
  };
  if (!Ne(n) || Y(r))
    return n;
  const d = zp(n), p = Qv({
    data: d
  }), h = Object.keys(d);
  for (let m = 0; m < h.length; m += 1) {
    const g = h[m], v = r.attributes[g], w = {
      ...i
    };
    w.raw = Y(i.raw) ? g : `${i.raw}.${g}`, Y(v) || (w.attribute = Y(i.attribute) ? g : `${i.attribute}.${g}`);
    const A = {
      data: d,
      schema: r,
      key: g,
      value: d[g],
      attribute: v,
      path: w,
      getModel: o,
      parent: a
    };
    await e(A, p);
    const C = d[g];
    if (!(Y(C) || Y(v))) {
      if (a = {
        schema: r,
        key: g,
        attribute: v,
        path: w
      }, dt(v)) {
        const b = v.relation.toLowerCase().startsWith("morph") ? s : u(o(v.target));
        if (Oe(C)) {
          const O = new Array(C.length);
          for (let S = 0; S < C.length; S += 1)
            O[S] = await b(e, w, C[S]);
          d[g] = O;
        } else
          d[g] = await b(e, w, C);
        continue;
      }
      if (rs(v)) {
        if (Oe(C)) {
          const x = new Array(C.length);
          for (let b = 0; b < C.length; b += 1)
            x[b] = await c(e, w, C[b]);
          d[g] = x;
        } else
          d[g] = await c(e, w, C);
        continue;
      }
      if (v.type === "component") {
        const x = o(v.component);
        if (Oe(C)) {
          const b = new Array(C.length);
          for (let O = 0; O < C.length; O += 1)
            b[O] = await l(e, w, x, C[O]);
          d[g] = b;
        } else
          d[g] = await l(e, w, x, C);
        continue;
      }
      if (v.type === "dynamiczone" && Oe(C)) {
        const x = new Array(C.length);
        for (let b = 0; b < C.length; b += 1)
          x[b] = await f(e, w, C[b]);
        d[g] = x;
        continue;
      }
    }
  }
  return d;
}, Qv = ({ data: e }) => ({
  remove(t) {
    delete e[t];
  },
  set(t, n) {
    e[t] = n;
  }
});
var _t = ft(ln);
function Vv(e) {
  const t = require(e);
  return t && t.__esModule ? t.default : t;
}
var af = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i(Ur, Qn);
  })(F, function(n, i) {
    return function(r) {
      function o(s) {
        if (a[s]) return a[s].exports;
        var u = a[s] = { exports: {}, id: s, loaded: !1 };
        return r[s].call(u.exports, u, u.exports, o), u.loaded = !0, u.exports;
      }
      var a = {};
      return o.m = r, o.c = a, o.p = "", o(0);
    }([function(r, o, a) {
      r.exports = a(34);
    }, function(r, o, a) {
      var s = a(29)("wks"), u = a(33), c = a(2).Symbol, l = typeof c == "function", f = r.exports = function(d) {
        return s[d] || (s[d] = l && c[d] || (l ? c : u)("Symbol." + d));
      };
      f.store = s;
    }, function(r, o) {
      var a = r.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
      typeof __g == "number" && (__g = a);
    }, function(r, o, a) {
      var s = a(9);
      r.exports = function(u) {
        if (!s(u)) throw TypeError(u + " is not an object!");
        return u;
      };
    }, function(r, o, a) {
      r.exports = !a(24)(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(r, o, a) {
      var s = a(12), u = a(17);
      r.exports = a(4) ? function(c, l, f) {
        return s.f(c, l, u(1, f));
      } : function(c, l, f) {
        return c[l] = f, c;
      };
    }, function(r, o) {
      var a = r.exports = { version: "2.4.0" };
      typeof __e == "number" && (__e = a);
    }, function(r, o, a) {
      var s = a(14);
      r.exports = function(u, c, l) {
        if (s(u), c === void 0) return u;
        switch (l) {
          case 1:
            return function(f) {
              return u.call(c, f);
            };
          case 2:
            return function(f, d) {
              return u.call(c, f, d);
            };
          case 3:
            return function(f, d, p) {
              return u.call(c, f, d, p);
            };
        }
        return function() {
          return u.apply(c, arguments);
        };
      };
    }, function(r, o) {
      var a = {}.hasOwnProperty;
      r.exports = function(s, u) {
        return a.call(s, u);
      };
    }, function(r, o) {
      r.exports = function(a) {
        return typeof a == "object" ? a !== null : typeof a == "function";
      };
    }, function(r, o) {
      r.exports = {};
    }, function(r, o) {
      var a = {}.toString;
      r.exports = function(s) {
        return a.call(s).slice(8, -1);
      };
    }, function(r, o, a) {
      var s = a(3), u = a(26), c = a(32), l = Object.defineProperty;
      o.f = a(4) ? Object.defineProperty : function(f, d, p) {
        if (s(f), d = c(d, !0), s(p), u) try {
          return l(f, d, p);
        } catch {
        }
        if ("get" in p || "set" in p) throw TypeError("Accessors not supported!");
        return "value" in p && (f[d] = p.value), f;
      };
    }, function(r, o, a) {
      var s = a(42), u = a(15);
      r.exports = function(c) {
        return s(u(c));
      };
    }, function(r, o) {
      r.exports = function(a) {
        if (typeof a != "function") throw TypeError(a + " is not a function!");
        return a;
      };
    }, function(r, o) {
      r.exports = function(a) {
        if (a == null) throw TypeError("Can't call method on  " + a);
        return a;
      };
    }, function(r, o, a) {
      var s = a(9), u = a(2).document, c = s(u) && s(u.createElement);
      r.exports = function(l) {
        return c ? u.createElement(l) : {};
      };
    }, function(r, o) {
      r.exports = function(a, s) {
        return { enumerable: !(1 & a), configurable: !(2 & a), writable: !(4 & a), value: s };
      };
    }, function(r, o, a) {
      var s = a(12).f, u = a(8), c = a(1)("toStringTag");
      r.exports = function(l, f, d) {
        l && !u(l = d ? l : l.prototype, c) && s(l, c, { configurable: !0, value: f });
      };
    }, function(r, o, a) {
      var s = a(29)("keys"), u = a(33);
      r.exports = function(c) {
        return s[c] || (s[c] = u(c));
      };
    }, function(r, o) {
      var a = Math.ceil, s = Math.floor;
      r.exports = function(u) {
        return isNaN(u = +u) ? 0 : (u > 0 ? s : a)(u);
      };
    }, function(r, o, a) {
      var s = a(11), u = a(1)("toStringTag"), c = s(/* @__PURE__ */ function() {
        return arguments;
      }()) == "Arguments", l = function(f, d) {
        try {
          return f[d];
        } catch {
        }
      };
      r.exports = function(f) {
        var d, p, h;
        return f === void 0 ? "Undefined" : f === null ? "Null" : typeof (p = l(d = Object(f), u)) == "string" ? p : c ? s(d) : (h = s(d)) == "Object" && typeof d.callee == "function" ? "Arguments" : h;
      };
    }, function(r, o) {
      r.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function(r, o, a) {
      var s = a(2), u = a(6), c = a(7), l = a(5), f = "prototype", d = function(p, h, m) {
        var g, v, w, A = p & d.F, C = p & d.G, x = p & d.S, b = p & d.P, O = p & d.B, S = p & d.W, _ = C ? u : u[h] || (u[h] = {}), R = _[f], y = C ? s : x ? s[h] : (s[h] || {})[f];
        C && (m = h);
        for (g in m) v = !A && y && y[g] !== void 0, v && g in _ || (w = v ? y[g] : m[g], _[g] = C && typeof y[g] != "function" ? m[g] : O && v ? c(w, s) : S && y[g] == w ? function(N) {
          var j = function(G, E, T) {
            if (this instanceof N) {
              switch (arguments.length) {
                case 0:
                  return new N();
                case 1:
                  return new N(G);
                case 2:
                  return new N(G, E);
              }
              return new N(G, E, T);
            }
            return N.apply(this, arguments);
          };
          return j[f] = N[f], j;
        }(w) : b && typeof w == "function" ? c(Function.call, w) : w, b && ((_.virtual || (_.virtual = {}))[g] = w, p & d.R && R && !R[g] && l(R, g, w)));
      };
      d.F = 1, d.G = 2, d.S = 4, d.P = 8, d.B = 16, d.W = 32, d.U = 64, d.R = 128, r.exports = d;
    }, function(r, o) {
      r.exports = function(a) {
        try {
          return !!a();
        } catch {
          return !0;
        }
      };
    }, function(r, o, a) {
      r.exports = a(2).document && document.documentElement;
    }, function(r, o, a) {
      r.exports = !a(4) && !a(24)(function() {
        return Object.defineProperty(a(16)("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(r, o, a) {
      var s = a(28), u = a(23), c = a(57), l = a(5), f = a(8), d = a(10), p = a(45), h = a(18), m = a(52), g = a(1)("iterator"), v = !([].keys && "next" in [].keys()), w = "@@iterator", A = "keys", C = "values", x = function() {
        return this;
      };
      r.exports = function(b, O, S, _, R, y, N) {
        p(S, O, _);
        var j, G, E, T = function($) {
          if (!v && $ in z) return z[$];
          switch ($) {
            case A:
              return function() {
                return new S(this, $);
              };
            case C:
              return function() {
                return new S(this, $);
              };
          }
          return function() {
            return new S(this, $);
          };
        }, U = O + " Iterator", D = R == C, M = !1, z = b.prototype, V = z[g] || z[w] || R && z[R], ie = V || T(R), Ce = R ? D ? T("entries") : ie : void 0, P = O == "Array" && z.entries || V;
        if (P && (E = m(P.call(new b())), E !== Object.prototype && (h(E, U, !0), s || f(E, g) || l(E, g, x))), D && V && V.name !== C && (M = !0, ie = function() {
          return V.call(this);
        }), s && !N || !v && !M && z[g] || l(z, g, ie), d[O] = ie, d[U] = x, R) if (j = { values: D ? ie : T(C), keys: y ? ie : T(A), entries: Ce }, N) for (G in j) G in z || c(z, G, j[G]);
        else u(u.P + u.F * (v || M), O, j);
        return j;
      };
    }, function(r, o) {
      r.exports = !0;
    }, function(r, o, a) {
      var s = a(2), u = "__core-js_shared__", c = s[u] || (s[u] = {});
      r.exports = function(l) {
        return c[l] || (c[l] = {});
      };
    }, function(r, o, a) {
      var s, u, c, l = a(7), f = a(41), d = a(25), p = a(16), h = a(2), m = h.process, g = h.setImmediate, v = h.clearImmediate, w = h.MessageChannel, A = 0, C = {}, x = "onreadystatechange", b = function() {
        var S = +this;
        if (C.hasOwnProperty(S)) {
          var _ = C[S];
          delete C[S], _();
        }
      }, O = function(S) {
        b.call(S.data);
      };
      g && v || (g = function(S) {
        for (var _ = [], R = 1; arguments.length > R; ) _.push(arguments[R++]);
        return C[++A] = function() {
          f(typeof S == "function" ? S : Function(S), _);
        }, s(A), A;
      }, v = function(S) {
        delete C[S];
      }, a(11)(m) == "process" ? s = function(S) {
        m.nextTick(l(b, S, 1));
      } : w ? (u = new w(), c = u.port2, u.port1.onmessage = O, s = l(c.postMessage, c, 1)) : h.addEventListener && typeof postMessage == "function" && !h.importScripts ? (s = function(S) {
        h.postMessage(S + "", "*");
      }, h.addEventListener("message", O, !1)) : s = x in p("script") ? function(S) {
        d.appendChild(p("script"))[x] = function() {
          d.removeChild(this), b.call(S);
        };
      } : function(S) {
        setTimeout(l(b, S, 1), 0);
      }), r.exports = { set: g, clear: v };
    }, function(r, o, a) {
      var s = a(20), u = Math.min;
      r.exports = function(c) {
        return c > 0 ? u(s(c), 9007199254740991) : 0;
      };
    }, function(r, o, a) {
      var s = a(9);
      r.exports = function(u, c) {
        if (!s(u)) return u;
        var l, f;
        if (c && typeof (l = u.toString) == "function" && !s(f = l.call(u)) || typeof (l = u.valueOf) == "function" && !s(f = l.call(u)) || !c && typeof (l = u.toString) == "function" && !s(f = l.call(u))) return f;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function(r, o) {
      var a = 0, s = Math.random();
      r.exports = function(u) {
        return "Symbol(".concat(u === void 0 ? "" : u, ")_", (++a + s).toString(36));
      };
    }, function(r, o, a) {
      function s(x) {
        return x && x.__esModule ? x : { default: x };
      }
      function u() {
        return process.platform !== "win32" ? "" : process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432") ? "mixed" : "native";
      }
      function c(x) {
        return (0, g.createHash)("sha256").update(x).digest("hex");
      }
      function l(x) {
        switch (w) {
          case "darwin":
            return x.split("IOPlatformUUID")[1].split(`
`)[0].replace(/\=|\s+|\"/gi, "").toLowerCase();
          case "win32":
            return x.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "linux":
            return x.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "freebsd":
            return x.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          default:
            throw new Error("Unsupported platform: " + process.platform);
        }
      }
      function f(x) {
        var b = l((0, m.execSync)(C[w]).toString());
        return x ? b : c(b);
      }
      function d(x) {
        return new h.default(function(b, O) {
          return (0, m.exec)(C[w], {}, function(S, _, R) {
            if (S) return O(new Error("Error while obtaining machine id: " + S.stack));
            var y = l(_.toString());
            return b(x ? y : c(y));
          });
        });
      }
      Object.defineProperty(o, "__esModule", { value: !0 });
      var p = a(35), h = s(p);
      o.machineIdSync = f, o.machineId = d;
      var m = a(70), g = a(71), v = process, w = v.platform, A = { native: "%windir%\\System32", mixed: "%windir%\\sysnative\\cmd.exe /c %windir%\\System32" }, C = { darwin: "ioreg -rd1 -c IOPlatformExpertDevice", win32: A[u()] + "\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid", linux: "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :", freebsd: "kenv -q smbios.system.uuid || sysctl -n kern.hostuuid" };
    }, function(r, o, a) {
      r.exports = { default: a(36), __esModule: !0 };
    }, function(r, o, a) {
      a(66), a(68), a(69), a(67), r.exports = a(6).Promise;
    }, function(r, o) {
      r.exports = function() {
      };
    }, function(r, o) {
      r.exports = function(a, s, u, c) {
        if (!(a instanceof s) || c !== void 0 && c in a) throw TypeError(u + ": incorrect invocation!");
        return a;
      };
    }, function(r, o, a) {
      var s = a(13), u = a(31), c = a(62);
      r.exports = function(l) {
        return function(f, d, p) {
          var h, m = s(f), g = u(m.length), v = c(p, g);
          if (l && d != d) {
            for (; g > v; ) if (h = m[v++], h != h) return !0;
          } else for (; g > v; v++) if ((l || v in m) && m[v] === d) return l || v || 0;
          return !l && -1;
        };
      };
    }, function(r, m, a) {
      var s = a(7), u = a(44), c = a(43), l = a(3), f = a(31), d = a(64), p = {}, h = {}, m = r.exports = function(g, v, w, A, C) {
        var x, b, O, S, _ = C ? function() {
          return g;
        } : d(g), R = s(w, A, v ? 2 : 1), y = 0;
        if (typeof _ != "function") throw TypeError(g + " is not iterable!");
        if (c(_)) {
          for (x = f(g.length); x > y; y++) if (S = v ? R(l(b = g[y])[0], b[1]) : R(g[y]), S === p || S === h) return S;
        } else for (O = _.call(g); !(b = O.next()).done; ) if (S = u(O, R, b.value, v), S === p || S === h) return S;
      };
      m.BREAK = p, m.RETURN = h;
    }, function(r, o) {
      r.exports = function(a, s, u) {
        var c = u === void 0;
        switch (s.length) {
          case 0:
            return c ? a() : a.call(u);
          case 1:
            return c ? a(s[0]) : a.call(u, s[0]);
          case 2:
            return c ? a(s[0], s[1]) : a.call(u, s[0], s[1]);
          case 3:
            return c ? a(s[0], s[1], s[2]) : a.call(u, s[0], s[1], s[2]);
          case 4:
            return c ? a(s[0], s[1], s[2], s[3]) : a.call(u, s[0], s[1], s[2], s[3]);
        }
        return a.apply(u, s);
      };
    }, function(r, o, a) {
      var s = a(11);
      r.exports = Object("z").propertyIsEnumerable(0) ? Object : function(u) {
        return s(u) == "String" ? u.split("") : Object(u);
      };
    }, function(r, o, a) {
      var s = a(10), u = a(1)("iterator"), c = Array.prototype;
      r.exports = function(l) {
        return l !== void 0 && (s.Array === l || c[u] === l);
      };
    }, function(r, o, a) {
      var s = a(3);
      r.exports = function(u, c, l, f) {
        try {
          return f ? c(s(l)[0], l[1]) : c(l);
        } catch (p) {
          var d = u.return;
          throw d !== void 0 && s(d.call(u)), p;
        }
      };
    }, function(r, o, a) {
      var s = a(49), u = a(17), c = a(18), l = {};
      a(5)(l, a(1)("iterator"), function() {
        return this;
      }), r.exports = function(f, d, p) {
        f.prototype = s(l, { next: u(1, p) }), c(f, d + " Iterator");
      };
    }, function(r, o, a) {
      var s = a(1)("iterator"), u = !1;
      try {
        var c = [7][s]();
        c.return = function() {
          u = !0;
        }, Array.from(c, function() {
          throw 2;
        });
      } catch {
      }
      r.exports = function(l, f) {
        if (!f && !u) return !1;
        var d = !1;
        try {
          var p = [7], h = p[s]();
          h.next = function() {
            return { done: d = !0 };
          }, p[s] = function() {
            return h;
          }, l(p);
        } catch {
        }
        return d;
      };
    }, function(r, o) {
      r.exports = function(a, s) {
        return { value: s, done: !!a };
      };
    }, function(r, o, a) {
      var s = a(2), u = a(30).set, c = s.MutationObserver || s.WebKitMutationObserver, l = s.process, f = s.Promise, d = a(11)(l) == "process";
      r.exports = function() {
        var p, h, m, g = function() {
          var C, x;
          for (d && (C = l.domain) && C.exit(); p; ) {
            x = p.fn, p = p.next;
            try {
              x();
            } catch (b) {
              throw p ? m() : h = void 0, b;
            }
          }
          h = void 0, C && C.enter();
        };
        if (d) m = function() {
          l.nextTick(g);
        };
        else if (c) {
          var v = !0, w = document.createTextNode("");
          new c(g).observe(w, { characterData: !0 }), m = function() {
            w.data = v = !v;
          };
        } else if (f && f.resolve) {
          var A = f.resolve();
          m = function() {
            A.then(g);
          };
        } else m = function() {
          u.call(s, g);
        };
        return function(C) {
          var x = { fn: C, next: void 0 };
          h && (h.next = x), p || (p = x, m()), h = x;
        };
      };
    }, function(r, o, a) {
      var s = a(3), u = a(50), c = a(22), l = a(19)("IE_PROTO"), f = function() {
      }, d = "prototype", p = function() {
        var h, m = a(16)("iframe"), g = c.length, v = ">";
        for (m.style.display = "none", a(25).appendChild(m), m.src = "javascript:", h = m.contentWindow.document, h.open(), h.write("<script>document.F=Object<\/script" + v), h.close(), p = h.F; g--; ) delete p[d][c[g]];
        return p();
      };
      r.exports = Object.create || function(h, m) {
        var g;
        return h !== null ? (f[d] = s(h), g = new f(), f[d] = null, g[l] = h) : g = p(), m === void 0 ? g : u(g, m);
      };
    }, function(r, o, a) {
      var s = a(12), u = a(3), c = a(54);
      r.exports = a(4) ? Object.defineProperties : function(l, f) {
        u(l);
        for (var d, p = c(f), h = p.length, m = 0; h > m; ) s.f(l, d = p[m++], f[d]);
        return l;
      };
    }, function(r, o, a) {
      var s = a(55), u = a(17), c = a(13), l = a(32), f = a(8), d = a(26), p = Object.getOwnPropertyDescriptor;
      o.f = a(4) ? p : function(h, m) {
        if (h = c(h), m = l(m, !0), d) try {
          return p(h, m);
        } catch {
        }
        if (f(h, m)) return u(!s.f.call(h, m), h[m]);
      };
    }, function(r, o, a) {
      var s = a(8), u = a(63), c = a(19)("IE_PROTO"), l = Object.prototype;
      r.exports = Object.getPrototypeOf || function(f) {
        return f = u(f), s(f, c) ? f[c] : typeof f.constructor == "function" && f instanceof f.constructor ? f.constructor.prototype : f instanceof Object ? l : null;
      };
    }, function(r, o, a) {
      var s = a(8), u = a(13), c = a(39)(!1), l = a(19)("IE_PROTO");
      r.exports = function(f, d) {
        var p, h = u(f), m = 0, g = [];
        for (p in h) p != l && s(h, p) && g.push(p);
        for (; d.length > m; ) s(h, p = d[m++]) && (~c(g, p) || g.push(p));
        return g;
      };
    }, function(r, o, a) {
      var s = a(53), u = a(22);
      r.exports = Object.keys || function(c) {
        return s(c, u);
      };
    }, function(r, o) {
      o.f = {}.propertyIsEnumerable;
    }, function(r, o, a) {
      var s = a(5);
      r.exports = function(u, c, l) {
        for (var f in c) l && u[f] ? u[f] = c[f] : s(u, f, c[f]);
        return u;
      };
    }, function(r, o, a) {
      r.exports = a(5);
    }, function(r, o, a) {
      var s = a(9), u = a(3), c = function(l, f) {
        if (u(l), !s(f) && f !== null) throw TypeError(f + ": can't set as prototype!");
      };
      r.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function(l, f, d) {
        try {
          d = a(7)(Function.call, a(51).f(Object.prototype, "__proto__").set, 2), d(l, []), f = !(l instanceof Array);
        } catch {
          f = !0;
        }
        return function(p, h) {
          return c(p, h), f ? p.__proto__ = h : d(p, h), p;
        };
      }({}, !1) : void 0), check: c };
    }, function(r, o, a) {
      var s = a(2), u = a(6), c = a(12), l = a(4), f = a(1)("species");
      r.exports = function(d) {
        var p = typeof u[d] == "function" ? u[d] : s[d];
        l && p && !p[f] && c.f(p, f, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, function(r, o, a) {
      var s = a(3), u = a(14), c = a(1)("species");
      r.exports = function(l, f) {
        var d, p = s(l).constructor;
        return p === void 0 || (d = s(p)[c]) == null ? f : u(d);
      };
    }, function(r, o, a) {
      var s = a(20), u = a(15);
      r.exports = function(c) {
        return function(l, f) {
          var d, p, h = String(u(l)), m = s(f), g = h.length;
          return m < 0 || m >= g ? c ? "" : void 0 : (d = h.charCodeAt(m), d < 55296 || d > 56319 || m + 1 === g || (p = h.charCodeAt(m + 1)) < 56320 || p > 57343 ? c ? h.charAt(m) : d : c ? h.slice(m, m + 2) : (d - 55296 << 10) + (p - 56320) + 65536);
        };
      };
    }, function(r, o, a) {
      var s = a(20), u = Math.max, c = Math.min;
      r.exports = function(l, f) {
        return l = s(l), l < 0 ? u(l + f, 0) : c(l, f);
      };
    }, function(r, o, a) {
      var s = a(15);
      r.exports = function(u) {
        return Object(s(u));
      };
    }, function(r, o, a) {
      var s = a(21), u = a(1)("iterator"), c = a(10);
      r.exports = a(6).getIteratorMethod = function(l) {
        if (l != null) return l[u] || l["@@iterator"] || c[s(l)];
      };
    }, function(r, o, a) {
      var s = a(37), u = a(47), c = a(10), l = a(13);
      r.exports = a(27)(Array, "Array", function(f, d) {
        this._t = l(f), this._i = 0, this._k = d;
      }, function() {
        var f = this._t, d = this._k, p = this._i++;
        return !f || p >= f.length ? (this._t = void 0, u(1)) : d == "keys" ? u(0, p) : d == "values" ? u(0, f[p]) : u(0, [p, f[p]]);
      }, "values"), c.Arguments = c.Array, s("keys"), s("values"), s("entries");
    }, function(r, o) {
    }, function(r, o, a) {
      var s, u, c, l = a(28), f = a(2), d = a(7), p = a(21), h = a(23), m = a(9), g = (a(3), a(14)), v = a(38), w = a(40), A = (a(58).set, a(60)), C = a(30).set, x = a(48)(), b = "Promise", O = f.TypeError, _ = f.process, S = f[b], _ = f.process, R = p(_) == "process", y = function() {
      }, N = !!function() {
        try {
          var P = S.resolve(1), $ = (P.constructor = {})[a(1)("species")] = function(I) {
            I(y, y);
          };
          return (R || typeof PromiseRejectionEvent == "function") && P.then(y) instanceof $;
        } catch {
        }
      }(), j = function(P, $) {
        return P === $ || P === S && $ === c;
      }, G = function(P) {
        var $;
        return !(!m(P) || typeof ($ = P.then) != "function") && $;
      }, E = function(P) {
        return j(S, P) ? new T(P) : new u(P);
      }, T = u = function(P) {
        var $, I;
        this.promise = new P(function(X, fe) {
          if ($ !== void 0 || I !== void 0) throw O("Bad Promise constructor");
          $ = X, I = fe;
        }), this.resolve = g($), this.reject = g(I);
      }, U = function(P) {
        try {
          P();
        } catch ($) {
          return { error: $ };
        }
      }, D = function(P, $) {
        if (!P._n) {
          P._n = !0;
          var I = P._c;
          x(function() {
            for (var X = P._v, fe = P._s == 1, k = 0, Z = function(L) {
              var K, oe, ye = fe ? L.ok : L.fail, ue = L.resolve, at = L.reject, ht = L.domain;
              try {
                ye ? (fe || (P._h == 2 && V(P), P._h = 1), ye === !0 ? K = X : (ht && ht.enter(), K = ye(X), ht && ht.exit()), K === L.promise ? at(O("Promise-chain cycle")) : (oe = G(K)) ? oe.call(K, ue, at) : ue(K)) : at(X);
              } catch (kp) {
                at(kp);
              }
            }; I.length > k; ) Z(I[k++]);
            P._c = [], P._n = !1, $ && !P._h && M(P);
          });
        }
      }, M = function(P) {
        C.call(f, function() {
          var $, I, X, fe = P._v;
          if (z(P) && ($ = U(function() {
            R ? _.emit("unhandledRejection", fe, P) : (I = f.onunhandledrejection) ? I({ promise: P, reason: fe }) : (X = f.console) && X.error && X.error("Unhandled promise rejection", fe);
          }), P._h = R || z(P) ? 2 : 1), P._a = void 0, $) throw $.error;
        });
      }, z = function(P) {
        if (P._h == 1) return !1;
        for (var $, I = P._a || P._c, X = 0; I.length > X; ) if ($ = I[X++], $.fail || !z($.promise)) return !1;
        return !0;
      }, V = function(P) {
        C.call(f, function() {
          var $;
          R ? _.emit("rejectionHandled", P) : ($ = f.onrejectionhandled) && $({ promise: P, reason: P._v });
        });
      }, ie = function(P) {
        var $ = this;
        $._d || ($._d = !0, $ = $._w || $, $._v = P, $._s = 2, $._a || ($._a = $._c.slice()), D($, !0));
      }, Ce = function(P) {
        var $, I = this;
        if (!I._d) {
          I._d = !0, I = I._w || I;
          try {
            if (I === P) throw O("Promise can't be resolved itself");
            ($ = G(P)) ? x(function() {
              var X = { _w: I, _d: !1 };
              try {
                $.call(P, d(Ce, X, 1), d(ie, X, 1));
              } catch (fe) {
                ie.call(X, fe);
              }
            }) : (I._v = P, I._s = 1, D(I, !1));
          } catch (X) {
            ie.call({ _w: I, _d: !1 }, X);
          }
        }
      };
      N || (S = function(P) {
        v(this, S, b, "_h"), g(P), s.call(this);
        try {
          P(d(Ce, this, 1), d(ie, this, 1));
        } catch ($) {
          ie.call(this, $);
        }
      }, s = function(P) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
      }, s.prototype = a(56)(S.prototype, { then: function(P, $) {
        var I = E(A(this, S));
        return I.ok = typeof P != "function" || P, I.fail = typeof $ == "function" && $, I.domain = R ? _.domain : void 0, this._c.push(I), this._a && this._a.push(I), this._s && D(this, !1), I.promise;
      }, catch: function(P) {
        return this.then(void 0, P);
      } }), T = function() {
        var P = new s();
        this.promise = P, this.resolve = d(Ce, P, 1), this.reject = d(ie, P, 1);
      }), h(h.G + h.W + h.F * !N, { Promise: S }), a(18)(S, b), a(59)(b), c = a(6)[b], h(h.S + h.F * !N, b, { reject: function(P) {
        var $ = E(this), I = $.reject;
        return I(P), $.promise;
      } }), h(h.S + h.F * (l || !N), b, { resolve: function(P) {
        if (P instanceof S && j(P.constructor, this)) return P;
        var $ = E(this), I = $.resolve;
        return I(P), $.promise;
      } }), h(h.S + h.F * !(N && a(46)(function(P) {
        S.all(P).catch(y);
      })), b, { all: function(P) {
        var $ = this, I = E($), X = I.resolve, fe = I.reject, k = U(function() {
          var Z = [], L = 0, K = 1;
          w(P, !1, function(oe) {
            var ye = L++, ue = !1;
            Z.push(void 0), K++, $.resolve(oe).then(function(at) {
              ue || (ue = !0, Z[ye] = at, --K || X(Z));
            }, fe);
          }), --K || X(Z);
        });
        return k && fe(k.error), I.promise;
      }, race: function(P) {
        var $ = this, I = E($), X = I.reject, fe = U(function() {
          w(P, !1, function(k) {
            $.resolve(k).then(I.resolve, X);
          });
        });
        return fe && X(fe.error), I.promise;
      } });
    }, function(r, o, a) {
      var s = a(61)(!0);
      a(27)(String, "String", function(u) {
        this._t = String(u), this._i = 0;
      }, function() {
        var u, c = this._t, l = this._i;
        return l >= c.length ? { value: void 0, done: !0 } : (u = s(c, l), this._i += u.length, { value: u, done: !1 });
      });
    }, function(r, o, a) {
      a(65);
      for (var s = a(2), u = a(5), c = a(10), l = a(1)("toStringTag"), f = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], d = 0; d < 5; d++) {
        var p = f[d], h = s[p], m = h && h.prototype;
        m && !m[l] && u(m, l, p), c[p] = c.Array;
      }
    }, function(r, o) {
      r.exports = Ur;
    }, function(r, o) {
      r.exports = Qn;
    }]);
  });
})(af);
var Xv = af.exports;
const Zv = (e, t) => {
  if (t) return t;
  try {
    const n = Xv.machineIdSync();
    return e ? Qn.createHash("sha256").update(`${n}-${e}`).digest("hex") : Qn.randomUUID();
  } catch {
    return Qn.randomUUID();
  }
};
var Ka;
try {
  Ka = Map;
} catch {
}
var Qa;
try {
  Qa = Set;
} catch {
}
function of(e, t, n) {
  if (!e || typeof e != "object" || typeof e == "function")
    return e;
  if (e.nodeType && "cloneNode" in e)
    return e.cloneNode(!0);
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp)
    return new RegExp(e);
  if (Array.isArray(e))
    return e.map(Va);
  if (Ka && e instanceof Ka)
    return new Map(Array.from(e.entries()));
  if (Qa && e instanceof Qa)
    return new Set(Array.from(e.values()));
  if (e instanceof Object) {
    t.push(e);
    var i = Object.create(e);
    n.push(i);
    for (var r in e) {
      var o = t.findIndex(function(a) {
        return a === e[r];
      });
      i[r] = o > -1 ? n[o] : of(e[r], t, n);
    }
    return i;
  }
  return e;
}
function Va(e) {
  return of(e, [], []);
}
const Jv = Object.prototype.toString, e0 = Error.prototype.toString, t0 = RegExp.prototype.toString, n0 = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", r0 = /^Symbol\((.*)\)(.*)$/;
function i0(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : "" + e;
}
function Pu(e, t = !1) {
  if (e == null || e === !0 || e === !1) return "" + e;
  const n = typeof e;
  if (n === "number") return i0(e);
  if (n === "string") return t ? `"${e}"` : e;
  if (n === "function") return "[Function " + (e.name || "anonymous") + "]";
  if (n === "symbol") return n0.call(e).replace(r0, "Symbol($1)");
  const i = Jv.call(e).slice(8, -1);
  return i === "Date" ? isNaN(e.getTime()) ? "" + e : e.toISOString(e) : i === "Error" || e instanceof Error ? "[" + e0.call(e) + "]" : i === "RegExp" ? t0.call(e) : null;
}
function _n(e, t) {
  let n = Pu(e, t);
  return n !== null ? n : JSON.stringify(e, function(i, r) {
    let o = Pu(this[i], t);
    return o !== null ? o : r;
  }, 2);
}
let Ht = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path: e,
    type: t,
    value: n,
    originalValue: i
  }) => {
    let r = i != null && i !== n, o = `${e} must be a \`${t}\` type, but the final value was: \`${_n(n, !0)}\`` + (r ? ` (cast from the value \`${_n(i, !0)}\`).` : ".");
    return n === null && (o += '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'), o;
  },
  defined: "${path} must be defined"
}, nt = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
}, Pt = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
}, Xa = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
}, Za = {
  isValue: "${path} field must be ${value}"
}, Ja = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
}, $r = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must be have ${length} items"
};
const a0 = Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: Ht,
  string: nt,
  number: Pt,
  date: Xa,
  object: Ja,
  array: $r,
  boolean: Za
}), Pn = (e) => e && e.__isYupSchema__;
class o0 {
  constructor(t, n) {
    if (this.refs = t, this.refs = t, typeof n == "function") {
      this.fn = n;
      return;
    }
    if (!Br(n, "is")) throw new TypeError("`is:` is required for `when()` conditions");
    if (!n.then && !n.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is: i,
      then: r,
      otherwise: o
    } = n, a = typeof i == "function" ? i : (...s) => s.every((u) => u === i);
    this.fn = function(...s) {
      let u = s.pop(), c = s.pop(), l = a(...s) ? r : o;
      if (l)
        return typeof l == "function" ? l(c) : c.concat(l.resolve(u));
    };
  }
  resolve(t, n) {
    let i = this.refs.map((o) => o.getValue(n?.value, n?.parent, n?.context)), r = this.fn.apply(t, i.concat(t, n));
    if (r === void 0 || r === t) return t;
    if (!Pn(r)) throw new TypeError("conditions must return a schema object");
    return r.resolve(n);
  }
}
function sf(e) {
  return e == null ? [] : [].concat(e);
}
function eo() {
  return eo = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, eo.apply(this, arguments);
}
let s0 = /\$\{\s*(\w+)\s*\}/g, Be = class to extends Error {
  static formatError(t, n) {
    const i = n.label || n.path || "this";
    return i !== n.path && (n = eo({}, n, {
      path: i
    })), typeof t == "string" ? t.replace(s0, (r, o) => _n(n[o])) : typeof t == "function" ? t(n) : t;
  }
  static isError(t) {
    return t && t.name === "ValidationError";
  }
  constructor(t, n, i, r) {
    super(), this.name = "ValidationError", this.value = n, this.path = i, this.type = r, this.errors = [], this.inner = [], sf(t).forEach((o) => {
      to.isError(o) ? (this.errors.push(...o.errors), this.inner = this.inner.concat(o.inner.length ? o.inner : o)) : this.errors.push(o);
    }), this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0], Error.captureStackTrace && Error.captureStackTrace(this, to);
  }
};
const u0 = (e) => {
  let t = !1;
  return (...n) => {
    t || (t = !0, e(...n));
  };
};
function zr(e, t) {
  let {
    endEarly: n,
    tests: i,
    args: r,
    value: o,
    errors: a,
    sort: s,
    path: u
  } = e, c = u0(t), l = i.length;
  const f = [];
  if (a = a || [], !l) return a.length ? c(new Be(a, o, u)) : c(null, o);
  for (let d = 0; d < i.length; d++) {
    const p = i[d];
    p(r, function(m) {
      if (m) {
        if (!Be.isError(m))
          return c(m, o);
        if (n)
          return m.value = o, c(m, o);
        f.push(m);
      }
      if (--l <= 0) {
        if (f.length && (s && f.sort(s), a.length && f.push(...a), a = f), a.length) {
          c(new Be(a, o, u), o);
          return;
        }
        c(null, o);
      }
    });
  }
}
function en(e) {
  this._maxSize = e, this.clear();
}
en.prototype.clear = function() {
  this._size = 0, this._values = /* @__PURE__ */ Object.create(null);
};
en.prototype.get = function(e) {
  return this._values[e];
};
en.prototype.set = function(e, t) {
  return this._size >= this._maxSize && this.clear(), e in this._values || this._size++, this._values[e] = t;
};
var c0 = /[^.^\]^[]+|(?=\[\]|\.\.)/g, uf = /^\d+$/, l0 = /^\d/, f0 = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, d0 = /^\s*(['"]?)(.*?)(\1)\s*$/, is = 512, Ru = new en(is), $u = new en(is), Iu = new en(is), Ni = {
  Cache: en,
  split: no,
  normalizePath: fa,
  setter: function(e) {
    var t = fa(e);
    return $u.get(e) || $u.set(e, function(i, r) {
      for (var o = 0, a = t.length, s = i; o < a - 1; ) {
        var u = t[o];
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return i;
        s = s[t[o++]];
      }
      s[t[o]] = r;
    });
  },
  getter: function(e, t) {
    var n = fa(e);
    return Iu.get(e) || Iu.set(e, function(r) {
      for (var o = 0, a = n.length; o < a; )
        if (r != null || !t) r = r[n[o++]];
        else return;
      return r;
    });
  },
  join: function(e) {
    return e.reduce(function(t, n) {
      return t + (as(n) || uf.test(n) ? "[" + n + "]" : (t ? "." : "") + n);
    }, "");
  },
  forEach: function(e, t, n) {
    p0(Array.isArray(e) ? e : no(e), t, n);
  }
};
function fa(e) {
  return Ru.get(e) || Ru.set(
    e,
    no(e).map(function(t) {
      return t.replace(d0, "$2");
    })
  );
}
function no(e) {
  return e.match(c0) || [""];
}
function p0(e, t, n) {
  var i = e.length, r, o, a, s;
  for (o = 0; o < i; o++)
    r = e[o], r && (g0(r) && (r = '"' + r + '"'), s = as(r), a = !s && /^\d+$/.test(r), t.call(n, r, s, a, o, e));
}
function as(e) {
  return typeof e == "string" && e && ["'", '"'].indexOf(e.charAt(0)) !== -1;
}
function h0(e) {
  return e.match(l0) && !e.match(uf);
}
function m0(e) {
  return f0.test(e);
}
function g0(e) {
  return !as(e) && (h0(e) || m0(e));
}
const _r = {
  context: "$",
  value: "."
};
function y0(e, t) {
  return new It(e, t);
}
class It {
  constructor(t, n = {}) {
    if (typeof t != "string") throw new TypeError("ref must be a string, got: " + t);
    if (this.key = t.trim(), t === "") throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === _r.context, this.isValue = this.key[0] === _r.value, this.isSibling = !this.isContext && !this.isValue;
    let i = this.isContext ? _r.context : this.isValue ? _r.value : "";
    this.path = this.key.slice(i.length), this.getter = this.path && Ni.getter(this.path, !0), this.map = n.map;
  }
  getValue(t, n, i) {
    let r = this.isContext ? i : this.isValue ? t : n;
    return this.getter && (r = this.getter(r || {})), this.map && (r = this.map(r)), r;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(t, n) {
    return this.getValue(t, n?.parent, n?.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(t) {
    return t && t.__isYupRef;
  }
}
It.prototype.__isYupRef = !0;
function Kr() {
  return Kr = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, Kr.apply(this, arguments);
}
function v0(e, t) {
  if (e == null) return {};
  var n = {}, i = Object.keys(e), r, o;
  for (o = 0; o < i.length; o++)
    r = i[o], !(t.indexOf(r) >= 0) && (n[r] = e[r]);
  return n;
}
function Er(e) {
  function t(n, i) {
    let {
      value: r,
      path: o = "",
      label: a,
      options: s,
      originalValue: u,
      sync: c
    } = n, l = v0(n, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name: f,
      test: d,
      params: p,
      message: h
    } = e;
    let {
      parent: m,
      context: g
    } = s;
    function v(b) {
      return It.isRef(b) ? b.getValue(r, m, g) : b;
    }
    function w(b = {}) {
      const O = cl(Kr({
        value: r,
        originalValue: u,
        label: a,
        path: b.path || o
      }, p, b.params), v), S = new Be(Be.formatError(b.message || h, O), r, O.path, b.type || f);
      return S.params = O, S;
    }
    let A = Kr({
      path: o,
      parent: m,
      type: f,
      createError: w,
      resolve: v,
      options: s,
      originalValue: u
    }, l);
    if (!c) {
      try {
        Promise.resolve(d.call(A, r, A)).then((b) => {
          Be.isError(b) ? i(b) : b ? i(null, b) : i(w());
        });
      } catch (b) {
        i(b);
      }
      return;
    }
    let C;
    try {
      var x;
      if (C = d.call(A, r, A), typeof ((x = C) == null ? void 0 : x.then) == "function")
        throw new Error(`Validation test of type: "${A.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
    } catch (b) {
      i(b);
      return;
    }
    Be.isError(C) ? i(C) : C ? i(null, C) : i(w());
  }
  return t.OPTIONS = e, t;
}
let w0 = (e) => e.substr(0, e.length - 1).substr(1);
function cf(e, t, n, i = n) {
  let r, o, a;
  return t ? (Ni.forEach(t, (s, u, c) => {
    let l = u ? w0(s) : s;
    if (e = e.resolve({
      context: i,
      parent: r,
      value: n
    }), e.innerType) {
      let f = c ? parseInt(l, 10) : 0;
      if (n && f >= n.length)
        throw new Error(`Yup.reach cannot resolve an array item at index: ${s}, in the path: ${t}. because there is no value at that index. `);
      r = n, n = n && n[f], e = e.innerType;
    }
    if (!c) {
      if (!e.fields || !e.fields[l]) throw new Error(`The schema does not contain the path: ${t}. (failed at: ${a} which is a type: "${e._type}")`);
      r = n, n = n && n[l], e = e.fields[l];
    }
    o = l, a = u ? "[" + s + "]" : "." + s;
  }), {
    schema: e,
    parent: r,
    parentPath: o
  }) : {
    parent: r,
    parentPath: t,
    schema: e
  };
}
const b0 = (e, t, n, i) => cf(e, t, n, i).schema;
class Qr {
  constructor() {
    this.list = /* @__PURE__ */ new Set(), this.refs = /* @__PURE__ */ new Map();
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const t = [];
    for (const n of this.list) t.push(n);
    for (const [, n] of this.refs) t.push(n.describe());
    return t;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  add(t) {
    It.isRef(t) ? this.refs.set(t.key, t) : this.list.add(t);
  }
  delete(t) {
    It.isRef(t) ? this.refs.delete(t.key) : this.list.delete(t);
  }
  has(t, n) {
    if (this.list.has(t)) return !0;
    let i, r = this.refs.values();
    for (; i = r.next(), !i.done; ) if (n(i.value) === t) return !0;
    return !1;
  }
  clone() {
    const t = new Qr();
    return t.list = new Set(this.list), t.refs = new Map(this.refs), t;
  }
  merge(t, n) {
    const i = this.clone();
    return t.list.forEach((r) => i.add(r)), t.refs.forEach((r) => i.add(r)), n.list.forEach((r) => i.delete(r)), n.refs.forEach((r) => i.delete(r)), i;
  }
}
function Xe() {
  return Xe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, Xe.apply(this, arguments);
}
class Pe {
  constructor(t) {
    this.deps = [], this.conditions = [], this._whitelist = new Qr(), this._blacklist = new Qr(), this.exclusiveTests = /* @__PURE__ */ Object.create(null), this.tests = [], this.transforms = [], this.withMutation(() => {
      this.typeError(Ht.notType);
    }), this.type = t?.type || "mixed", this.spec = Xe({
      strip: !1,
      strict: !1,
      abortEarly: !0,
      recursive: !0,
      nullable: !1,
      presence: "optional"
    }, t?.spec);
  }
  // TODO: remove
  get _type() {
    return this.type;
  }
  _typeCheck(t) {
    return !0;
  }
  clone(t) {
    if (this._mutate)
      return t && Object.assign(this.spec, t), this;
    const n = Object.create(Object.getPrototypeOf(this));
    return n.type = this.type, n._typeError = this._typeError, n._whitelistError = this._whitelistError, n._blacklistError = this._blacklistError, n._whitelist = this._whitelist.clone(), n._blacklist = this._blacklist.clone(), n.exclusiveTests = Xe({}, this.exclusiveTests), n.deps = [...this.deps], n.conditions = [...this.conditions], n.tests = [...this.tests], n.transforms = [...this.transforms], n.spec = Va(Xe({}, this.spec, t)), n;
  }
  label(t) {
    var n = this.clone();
    return n.spec.label = t, n;
  }
  meta(...t) {
    if (t.length === 0) return this.spec.meta;
    let n = this.clone();
    return n.spec.meta = Object.assign(n.spec.meta || {}, t[0]), n;
  }
  // withContext<TContext extends AnyObject>(): BaseSchema<
  //   TCast,
  //   TContext,
  //   TOutput
  // > {
  //   return this as any;
  // }
  withMutation(t) {
    let n = this._mutate;
    this._mutate = !0;
    let i = t(this);
    return this._mutate = n, i;
  }
  concat(t) {
    if (!t || t === this) return this;
    if (t.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);
    let n = this, i = t.clone();
    const r = Xe({}, n.spec, i.spec);
    return i.spec = r, i._typeError || (i._typeError = n._typeError), i._whitelistError || (i._whitelistError = n._whitelistError), i._blacklistError || (i._blacklistError = n._blacklistError), i._whitelist = n._whitelist.merge(t._whitelist, t._blacklist), i._blacklist = n._blacklist.merge(t._blacklist, t._whitelist), i.tests = n.tests, i.exclusiveTests = n.exclusiveTests, i.withMutation((o) => {
      t.tests.forEach((a) => {
        o.test(a.OPTIONS);
      });
    }), i;
  }
  isType(t) {
    return this.spec.nullable && t === null ? !0 : this._typeCheck(t);
  }
  resolve(t) {
    let n = this;
    if (n.conditions.length) {
      let i = n.conditions;
      n = n.clone(), n.conditions = [], n = i.reduce((r, o) => o.resolve(r, t), n), n = n.resolve(t);
    }
    return n;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {*=} options.parent
   * @param {*=} options.context
   */
  cast(t, n = {}) {
    let i = this.resolve(Xe({
      value: t
    }, n)), r = i._cast(t, n);
    if (t !== void 0 && n.assert !== !1 && i.isType(r) !== !0) {
      let o = _n(t), a = _n(r);
      throw new TypeError(`The value of ${n.path || "field"} could not be cast to a value that satisfies the schema type: "${i._type}". 

attempted value: ${o} 
` + (a !== o ? `result of cast: ${a}` : ""));
    }
    return r;
  }
  _cast(t, n) {
    let i = t === void 0 ? t : this.transforms.reduce((r, o) => o.call(this, r, t, this), t);
    return i === void 0 && (i = this.getDefault()), i;
  }
  _validate(t, n = {}, i) {
    let {
      sync: r,
      path: o,
      from: a = [],
      originalValue: s = t,
      strict: u = this.spec.strict,
      abortEarly: c = this.spec.abortEarly
    } = n, l = t;
    u || (l = this._cast(l, Xe({
      assert: !1
    }, n)));
    let f = {
      value: l,
      path: o,
      options: n,
      originalValue: s,
      schema: this,
      label: this.spec.label,
      sync: r,
      from: a
    }, d = [];
    this._typeError && d.push(this._typeError), this._whitelistError && d.push(this._whitelistError), this._blacklistError && d.push(this._blacklistError), zr({
      args: f,
      value: l,
      path: o,
      tests: d,
      endEarly: c
    }, (p) => {
      if (p) return void i(p, l);
      zr({
        tests: this.tests,
        args: f,
        path: o,
        sync: r,
        value: l,
        endEarly: c
      }, i);
    });
  }
  validate(t, n, i) {
    let r = this.resolve(Xe({}, n, {
      value: t
    }));
    return typeof i == "function" ? r._validate(t, n, i) : new Promise((o, a) => r._validate(t, n, (s, u) => {
      s ? a(s) : o(u);
    }));
  }
  validateSync(t, n) {
    let i = this.resolve(Xe({}, n, {
      value: t
    })), r;
    return i._validate(t, Xe({}, n, {
      sync: !0
    }), (o, a) => {
      if (o) throw o;
      r = a;
    }), r;
  }
  isValid(t, n) {
    return this.validate(t, n).then(() => !0, (i) => {
      if (Be.isError(i)) return !1;
      throw i;
    });
  }
  isValidSync(t, n) {
    try {
      return this.validateSync(t, n), !0;
    } catch (i) {
      if (Be.isError(i)) return !1;
      throw i;
    }
  }
  _getDefault() {
    let t = this.spec.default;
    return t == null ? t : typeof t == "function" ? t.call(this) : Va(t);
  }
  getDefault(t) {
    return this.resolve(t || {})._getDefault();
  }
  default(t) {
    return arguments.length === 0 ? this._getDefault() : this.clone({
      default: t
    });
  }
  strict(t = !0) {
    var n = this.clone();
    return n.spec.strict = t, n;
  }
  _isPresent(t) {
    return t != null;
  }
  defined(t = Ht.defined) {
    return this.test({
      message: t,
      name: "defined",
      exclusive: !0,
      test(n) {
        return n !== void 0;
      }
    });
  }
  required(t = Ht.required) {
    return this.clone({
      presence: "required"
    }).withMutation((n) => n.test({
      message: t,
      name: "required",
      exclusive: !0,
      test(i) {
        return this.schema._isPresent(i);
      }
    }));
  }
  notRequired() {
    var t = this.clone({
      presence: "optional"
    });
    return t.tests = t.tests.filter((n) => n.OPTIONS.name !== "required"), t;
  }
  nullable(t = !0) {
    var n = this.clone({
      nullable: t !== !1
    });
    return n;
  }
  transform(t) {
    var n = this.clone();
    return n.transforms.push(t), n;
  }
  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */
  test(...t) {
    let n;
    if (t.length === 1 ? typeof t[0] == "function" ? n = {
      test: t[0]
    } : n = t[0] : t.length === 2 ? n = {
      name: t[0],
      test: t[1]
    } : n = {
      name: t[0],
      message: t[1],
      test: t[2]
    }, n.message === void 0 && (n.message = Ht.default), typeof n.test != "function") throw new TypeError("`test` is a required parameters");
    let i = this.clone(), r = Er(n), o = n.exclusive || n.name && i.exclusiveTests[n.name] === !0;
    if (n.exclusive && !n.name)
      throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    return n.name && (i.exclusiveTests[n.name] = !!n.exclusive), i.tests = i.tests.filter((a) => !(a.OPTIONS.name === n.name && (o || a.OPTIONS.test === r.OPTIONS.test))), i.tests.push(r), i;
  }
  when(t, n) {
    !Array.isArray(t) && typeof t != "string" && (n = t, t = ".");
    let i = this.clone(), r = sf(t).map((o) => new It(o));
    return r.forEach((o) => {
      o.isSibling && i.deps.push(o.key);
    }), i.conditions.push(new o0(r, n)), i;
  }
  typeError(t) {
    var n = this.clone();
    return n._typeError = Er({
      message: t,
      name: "typeError",
      test(i) {
        return i !== void 0 && !this.schema.isType(i) ? this.createError({
          params: {
            type: this.schema._type
          }
        }) : !0;
      }
    }), n;
  }
  oneOf(t, n = Ht.oneOf) {
    var i = this.clone();
    return t.forEach((r) => {
      i._whitelist.add(r), i._blacklist.delete(r);
    }), i._whitelistError = Er({
      message: n,
      name: "oneOf",
      test(r) {
        if (r === void 0) return !0;
        let o = this.schema._whitelist;
        return o.has(r, this.resolve) ? !0 : this.createError({
          params: {
            values: o.toArray().join(", ")
          }
        });
      }
    }), i;
  }
  notOneOf(t, n = Ht.notOneOf) {
    var i = this.clone();
    return t.forEach((r) => {
      i._blacklist.add(r), i._whitelist.delete(r);
    }), i._blacklistError = Er({
      message: n,
      name: "notOneOf",
      test(r) {
        let o = this.schema._blacklist;
        return o.has(r, this.resolve) ? this.createError({
          params: {
            values: o.toArray().join(", ")
          }
        }) : !0;
      }
    }), i;
  }
  strip(t = !0) {
    let n = this.clone();
    return n.spec.strip = t, n;
  }
  describe() {
    const t = this.clone(), {
      label: n,
      meta: i
    } = t.spec;
    return {
      meta: i,
      label: n,
      type: t.type,
      oneOf: t._whitelist.describe(),
      notOneOf: t._blacklist.describe(),
      tests: t.tests.map((o) => ({
        name: o.OPTIONS.name,
        params: o.OPTIONS.params
      })).filter((o, a, s) => s.findIndex((u) => u.name === o.name) === a)
    };
  }
}
Pe.prototype.__isYupSchema__ = !0;
for (const e of ["validate", "validateSync"]) Pe.prototype[`${e}At`] = function(t, n, i = {}) {
  const {
    parent: r,
    parentPath: o,
    schema: a
  } = cf(this, t, n, i.context);
  return a[e](r && r[o], Xe({}, i, {
    parent: r,
    path: t
  }));
};
for (const e of ["equals", "is"]) Pe.prototype[e] = Pe.prototype.oneOf;
for (const e of ["not", "nope"]) Pe.prototype[e] = Pe.prototype.notOneOf;
Pe.prototype.optional = Pe.prototype.notRequired;
const Fi = Pe;
function ar() {
  return new Fi();
}
ar.prototype = Fi.prototype;
const pe = (e) => e == null;
function ro() {
  return new os();
}
class os extends Pe {
  constructor() {
    super({
      type: "boolean"
    }), this.withMutation(() => {
      this.transform(function(t) {
        if (!this.isType(t)) {
          if (/^(true|1)$/i.test(String(t))) return !0;
          if (/^(false|0)$/i.test(String(t))) return !1;
        }
        return t;
      });
    });
  }
  _typeCheck(t) {
    return t instanceof Boolean && (t = t.valueOf()), typeof t == "boolean";
  }
  isTrue(t = Za.isValue) {
    return this.test({
      message: t,
      name: "is-value",
      exclusive: !0,
      params: {
        value: "true"
      },
      test(n) {
        return pe(n) || n === !0;
      }
    });
  }
  isFalse(t = Za.isValue) {
    return this.test({
      message: t,
      name: "is-value",
      exclusive: !0,
      params: {
        value: "false"
      },
      test(n) {
        return pe(n) || n === !1;
      }
    });
  }
}
ro.prototype = os.prototype;
let _0 = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, E0 = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, T0 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, S0 = (e) => pe(e) || e === e.trim(), A0 = {}.toString();
function Di() {
  return new ss();
}
class ss extends Pe {
  constructor() {
    super({
      type: "string"
    }), this.withMutation(() => {
      this.transform(function(t) {
        if (this.isType(t) || Array.isArray(t)) return t;
        const n = t != null && t.toString ? t.toString() : t;
        return n === A0 ? t : n;
      });
    });
  }
  _typeCheck(t) {
    return t instanceof String && (t = t.valueOf()), typeof t == "string";
  }
  _isPresent(t) {
    return super._isPresent(t) && !!t.length;
  }
  length(t, n = nt.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(i) {
        return pe(i) || i.length === this.resolve(t);
      }
    });
  }
  min(t, n = nt.min) {
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(i) {
        return pe(i) || i.length >= this.resolve(t);
      }
    });
  }
  max(t, n = nt.max) {
    return this.test({
      name: "max",
      exclusive: !0,
      message: n,
      params: {
        max: t
      },
      test(i) {
        return pe(i) || i.length <= this.resolve(t);
      }
    });
  }
  matches(t, n) {
    let i = !1, r, o;
    return n && (typeof n == "object" ? {
      excludeEmptyString: i = !1,
      message: r,
      name: o
    } = n : r = n), this.test({
      name: o || "matches",
      message: r || nt.matches,
      params: {
        regex: t
      },
      test: (a) => pe(a) || a === "" && i || a.search(t) !== -1
    });
  }
  email(t = nt.email) {
    return this.matches(_0, {
      name: "email",
      message: t,
      excludeEmptyString: !0
    });
  }
  url(t = nt.url) {
    return this.matches(E0, {
      name: "url",
      message: t,
      excludeEmptyString: !0
    });
  }
  uuid(t = nt.uuid) {
    return this.matches(T0, {
      name: "uuid",
      message: t,
      excludeEmptyString: !1
    });
  }
  //-- transforms --
  ensure() {
    return this.default("").transform((t) => t === null ? "" : t);
  }
  trim(t = nt.trim) {
    return this.transform((n) => n != null ? n.trim() : n).test({
      message: t,
      name: "trim",
      test: S0
    });
  }
  lowercase(t = nt.lowercase) {
    return this.transform((n) => pe(n) ? n : n.toLowerCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => pe(n) || n === n.toLowerCase()
    });
  }
  uppercase(t = nt.uppercase) {
    return this.transform((n) => pe(n) ? n : n.toUpperCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => pe(n) || n === n.toUpperCase()
    });
  }
}
Di.prototype = ss.prototype;
let O0 = (e) => e != +e;
function lf() {
  return new us();
}
class us extends Pe {
  constructor() {
    super({
      type: "number"
    }), this.withMutation(() => {
      this.transform(function(t) {
        let n = t;
        if (typeof n == "string") {
          if (n = n.replace(/\s/g, ""), n === "") return NaN;
          n = +n;
        }
        return this.isType(n) ? n : parseFloat(n);
      });
    });
  }
  _typeCheck(t) {
    return t instanceof Number && (t = t.valueOf()), typeof t == "number" && !O0(t);
  }
  min(t, n = Pt.min) {
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(i) {
        return pe(i) || i >= this.resolve(t);
      }
    });
  }
  max(t, n = Pt.max) {
    return this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(i) {
        return pe(i) || i <= this.resolve(t);
      }
    });
  }
  lessThan(t, n = Pt.lessThan) {
    return this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        less: t
      },
      test(i) {
        return pe(i) || i < this.resolve(t);
      }
    });
  }
  moreThan(t, n = Pt.moreThan) {
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        more: t
      },
      test(i) {
        return pe(i) || i > this.resolve(t);
      }
    });
  }
  positive(t = Pt.positive) {
    return this.moreThan(0, t);
  }
  negative(t = Pt.negative) {
    return this.lessThan(0, t);
  }
  integer(t = Pt.integer) {
    return this.test({
      name: "integer",
      message: t,
      test: (n) => pe(n) || Number.isInteger(n)
    });
  }
  truncate() {
    return this.transform((t) => pe(t) ? t : t | 0);
  }
  round(t) {
    var n, i = ["ceil", "floor", "round", "trunc"];
    if (t = ((n = t) == null ? void 0 : n.toLowerCase()) || "round", t === "trunc") return this.truncate();
    if (i.indexOf(t.toLowerCase()) === -1) throw new TypeError("Only valid options for round() are: " + i.join(", "));
    return this.transform((r) => pe(r) ? r : Math[t](r));
  }
}
lf.prototype = us.prototype;
var C0 = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function x0(e) {
  var t = [1, 4, 5, 6, 7, 10, 11], n = 0, i, r;
  if (r = C0.exec(e)) {
    for (var o = 0, a; a = t[o]; ++o) r[a] = +r[a] || 0;
    r[2] = (+r[2] || 1) - 1, r[3] = +r[3] || 1, r[7] = r[7] ? String(r[7]).substr(0, 3) : 0, (r[8] === void 0 || r[8] === "") && (r[9] === void 0 || r[9] === "") ? i = +new Date(r[1], r[2], r[3], r[4], r[5], r[6], r[7]) : (r[8] !== "Z" && r[9] !== void 0 && (n = r[10] * 60 + r[11], r[9] === "+" && (n = 0 - n)), i = Date.UTC(r[1], r[2], r[3], r[4], r[5] + n, r[6], r[7]));
  } else i = Date.parse ? Date.parse(e) : NaN;
  return i;
}
let cs = /* @__PURE__ */ new Date(""), P0 = (e) => Object.prototype.toString.call(e) === "[object Date]";
function ls() {
  return new Mi();
}
class Mi extends Pe {
  constructor() {
    super({
      type: "date"
    }), this.withMutation(() => {
      this.transform(function(t) {
        return this.isType(t) ? t : (t = x0(t), isNaN(t) ? cs : new Date(t));
      });
    });
  }
  _typeCheck(t) {
    return P0(t) && !isNaN(t.getTime());
  }
  prepareParam(t, n) {
    let i;
    if (It.isRef(t))
      i = t;
    else {
      let r = this.cast(t);
      if (!this._typeCheck(r)) throw new TypeError(`\`${n}\` must be a Date or a value that can be \`cast()\` to a Date`);
      i = r;
    }
    return i;
  }
  min(t, n = Xa.min) {
    let i = this.prepareParam(t, "min");
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(r) {
        return pe(r) || r >= this.resolve(i);
      }
    });
  }
  max(t, n = Xa.max) {
    var i = this.prepareParam(t, "max");
    return this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(r) {
        return pe(r) || r <= this.resolve(i);
      }
    });
  }
}
Mi.INVALID_DATE = cs;
ls.prototype = Mi.prototype;
ls.INVALID_DATE = cs;
var fs = { exports: {} };
fs.exports = function(e) {
  return ff(R0(e), e);
};
fs.exports.array = ff;
function ff(e, t) {
  var n = e.length, i = new Array(n), r = {}, o = n, a = $0(t), s = I0(e);
  for (t.forEach(function(c) {
    if (!s.has(c[0]) || !s.has(c[1]))
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
  }); o--; )
    r[o] || u(e[o], o, /* @__PURE__ */ new Set());
  return i;
  function u(c, l, f) {
    if (f.has(c)) {
      var d;
      try {
        d = ", node was:" + JSON.stringify(c);
      } catch {
        d = "";
      }
      throw new Error("Cyclic dependency" + d);
    }
    if (!s.has(c))
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(c));
    if (!r[l]) {
      r[l] = !0;
      var p = a.get(c) || /* @__PURE__ */ new Set();
      if (p = Array.from(p), l = p.length) {
        f.add(c);
        do {
          var h = p[--l];
          u(h, s.get(h), f);
        } while (l);
        f.delete(c);
      }
      i[--n] = c;
    }
  }
}
function R0(e) {
  for (var t = /* @__PURE__ */ new Set(), n = 0, i = e.length; n < i; n++) {
    var r = e[n];
    t.add(r[0]), t.add(r[1]);
  }
  return Array.from(t);
}
function $0(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, i = e.length; n < i; n++) {
    var r = e[n];
    t.has(r[0]) || t.set(r[0], /* @__PURE__ */ new Set()), t.has(r[1]) || t.set(r[1], /* @__PURE__ */ new Set()), t.get(r[0]).add(r[1]);
  }
  return t;
}
function I0(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, i = e.length; n < i; n++)
    t.set(e[n], n);
  return t;
}
var N0 = fs.exports;
const F0 = /* @__PURE__ */ tr(N0);
function D0(e, t = []) {
  let n = [], i = [];
  function r(o, a) {
    var s = Ni.split(o)[0];
    ~i.indexOf(s) || i.push(s), ~t.indexOf(`${a}-${s}`) || n.push([a, s]);
  }
  for (const o in e) if (Br(e, o)) {
    let a = e[o];
    ~i.indexOf(o) || i.push(o), It.isRef(a) && a.isSibling ? r(a.path, o) : Pn(a) && "deps" in a && a.deps.forEach((s) => r(s, o));
  }
  return F0.array(i, n).reverse();
}
function Nu(e, t) {
  let n = 1 / 0;
  return e.some((i, r) => {
    var o;
    if (((o = t.path) == null ? void 0 : o.indexOf(i)) !== -1)
      return n = r, !0;
  }), n;
}
function df(e) {
  return (t, n) => Nu(e, t) - Nu(e, n);
}
function hn() {
  return hn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, hn.apply(this, arguments);
}
let Fu = (e) => Object.prototype.toString.call(e) === "[object Object]";
function M0(e, t) {
  let n = Object.keys(e.fields);
  return Object.keys(t).filter((i) => n.indexOf(i) === -1);
}
const L0 = df([]);
class ds extends Pe {
  constructor(t) {
    super({
      type: "object"
    }), this.fields = /* @__PURE__ */ Object.create(null), this._sortErrors = L0, this._nodes = [], this._excludedEdges = [], this.withMutation(() => {
      this.transform(function(i) {
        if (typeof i == "string")
          try {
            i = JSON.parse(i);
          } catch {
            i = null;
          }
        return this.isType(i) ? i : null;
      }), t && this.shape(t);
    });
  }
  _typeCheck(t) {
    return Fu(t) || typeof t == "function";
  }
  _cast(t, n = {}) {
    var i;
    let r = super._cast(t, n);
    if (r === void 0) return this.getDefault();
    if (!this._typeCheck(r)) return r;
    let o = this.fields, a = (i = n.stripUnknown) != null ? i : this.spec.noUnknown, s = this._nodes.concat(Object.keys(r).filter((f) => this._nodes.indexOf(f) === -1)), u = {}, c = hn({}, n, {
      parent: u,
      __validating: n.__validating || !1
    }), l = !1;
    for (const f of s) {
      let d = o[f], p = Br(r, f);
      if (d) {
        let h, m = r[f];
        c.path = (n.path ? `${n.path}.` : "") + f, d = d.resolve({
          value: m,
          context: n.context,
          parent: u
        });
        let g = "spec" in d ? d.spec : void 0, v = g?.strict;
        if (g?.strip) {
          l = l || f in r;
          continue;
        }
        h = !n.__validating || !v ? (
          // TODO: use _cast, this is double resolving
          d.cast(r[f], c)
        ) : r[f], h !== void 0 && (u[f] = h);
      } else p && !a && (u[f] = r[f]);
      u[f] !== r[f] && (l = !0);
    }
    return l ? u : r;
  }
  _validate(t, n = {}, i) {
    let r = [], {
      sync: o,
      from: a = [],
      originalValue: s = t,
      abortEarly: u = this.spec.abortEarly,
      recursive: c = this.spec.recursive
    } = n;
    a = [{
      schema: this,
      value: s
    }, ...a], n.__validating = !0, n.originalValue = s, n.from = a, super._validate(t, n, (l, f) => {
      if (l) {
        if (!Be.isError(l) || u)
          return void i(l, f);
        r.push(l);
      }
      if (!c || !Fu(f)) {
        i(r[0] || null, f);
        return;
      }
      s = s || f;
      let d = this._nodes.map((p) => (h, m) => {
        let g = p.indexOf(".") === -1 ? (n.path ? `${n.path}.` : "") + p : `${n.path || ""}["${p}"]`, v = this.fields[p];
        if (v && "validate" in v) {
          v.validate(f[p], hn({}, n, {
            // @ts-ignore
            path: g,
            from: a,
            // inner fields are always strict:
            // 1. this isn't strict so the casting will also have cast inner values
            // 2. this is strict in which case the nested values weren't cast either
            strict: !0,
            parent: f,
            originalValue: s[p]
          }), m);
          return;
        }
        m(null);
      });
      zr({
        tests: d,
        value: f,
        errors: r,
        endEarly: u,
        sort: this._sortErrors,
        path: n.path
      }, i);
    });
  }
  clone(t) {
    const n = super.clone(t);
    return n.fields = hn({}, this.fields), n._nodes = this._nodes, n._excludedEdges = this._excludedEdges, n._sortErrors = this._sortErrors, n;
  }
  concat(t) {
    let n = super.concat(t), i = n.fields;
    for (let [r, o] of Object.entries(this.fields)) {
      const a = i[r];
      a === void 0 ? i[r] = o : a instanceof Pe && o instanceof Pe && (i[r] = o.concat(a));
    }
    return n.withMutation(() => n.shape(i));
  }
  getDefaultFromShape() {
    let t = {};
    return this._nodes.forEach((n) => {
      const i = this.fields[n];
      t[n] = "default" in i ? i.getDefault() : void 0;
    }), t;
  }
  _getDefault() {
    if ("default" in this.spec)
      return super._getDefault();
    if (this._nodes.length)
      return this.getDefaultFromShape();
  }
  shape(t, n = []) {
    let i = this.clone(), r = Object.assign(i.fields, t);
    if (i.fields = r, i._sortErrors = df(Object.keys(r)), n.length) {
      Array.isArray(n[0]) || (n = [n]);
      let o = n.map(([a, s]) => `${a}-${s}`);
      i._excludedEdges = i._excludedEdges.concat(o);
    }
    return i._nodes = D0(r, i._excludedEdges), i;
  }
  pick(t) {
    const n = {};
    for (const i of t)
      this.fields[i] && (n[i] = this.fields[i]);
    return this.clone().withMutation((i) => (i.fields = {}, i.shape(n)));
  }
  omit(t) {
    const n = this.clone(), i = n.fields;
    n.fields = {};
    for (const r of t)
      delete i[r];
    return n.withMutation(() => n.shape(i));
  }
  from(t, n, i) {
    let r = Ni.getter(t, !0);
    return this.transform((o) => {
      if (o == null) return o;
      let a = o;
      return Br(o, t) && (a = hn({}, o), i || delete a[t], a[n] = r(o)), a;
    });
  }
  noUnknown(t = !0, n = Ja.noUnknown) {
    typeof t == "string" && (n = t, t = !0);
    let i = this.test({
      name: "noUnknown",
      exclusive: !0,
      message: n,
      test(r) {
        if (r == null) return !0;
        const o = M0(this.schema, r);
        return !t || o.length === 0 || this.createError({
          params: {
            unknown: o.join(", ")
          }
        });
      }
    });
    return i.spec.noUnknown = t, i;
  }
  unknown(t = !0, n = Ja.noUnknown) {
    return this.noUnknown(!t, n);
  }
  transformKeys(t) {
    return this.transform((n) => n && ih(n, (i, r) => t(r)));
  }
  camelCase() {
    return this.transformKeys(rh);
  }
  snakeCase() {
    return this.transformKeys(yu);
  }
  constantCase() {
    return this.transformKeys((t) => yu(t).toUpperCase());
  }
  describe() {
    let t = super.describe();
    return t.fields = cl(this.fields, (n) => n.describe()), t;
  }
}
function ps(e) {
  return new ds(e);
}
ps.prototype = ds.prototype;
function Vr() {
  return Vr = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, Vr.apply(this, arguments);
}
function hs(e) {
  return new ms(e);
}
class ms extends Pe {
  constructor(t) {
    super({
      type: "array"
    }), this.innerType = t, this.withMutation(() => {
      this.transform(function(n) {
        if (typeof n == "string") try {
          n = JSON.parse(n);
        } catch {
          n = null;
        }
        return this.isType(n) ? n : null;
      });
    });
  }
  _typeCheck(t) {
    return Array.isArray(t);
  }
  get _subType() {
    return this.innerType;
  }
  _cast(t, n) {
    const i = super._cast(t, n);
    if (!this._typeCheck(i) || !this.innerType) return i;
    let r = !1;
    const o = i.map((a, s) => {
      const u = this.innerType.cast(a, Vr({}, n, {
        path: `${n.path || ""}[${s}]`
      }));
      return u !== a && (r = !0), u;
    });
    return r ? o : i;
  }
  _validate(t, n = {}, i) {
    var r, o;
    let a = [];
    n.sync;
    let s = n.path, u = this.innerType, c = (r = n.abortEarly) != null ? r : this.spec.abortEarly, l = (o = n.recursive) != null ? o : this.spec.recursive, f = n.originalValue != null ? n.originalValue : t;
    super._validate(t, n, (d, p) => {
      if (d) {
        if (!Be.isError(d) || c)
          return void i(d, p);
        a.push(d);
      }
      if (!l || !u || !this._typeCheck(p)) {
        i(a[0] || null, p);
        return;
      }
      f = f || p;
      let h = new Array(p.length);
      for (let m = 0; m < p.length; m++) {
        let g = p[m], v = `${n.path || ""}[${m}]`, w = Vr({}, n, {
          path: v,
          strict: !0,
          parent: p,
          index: m,
          originalValue: f[m]
        });
        h[m] = (A, C) => u.validate(g, w, C);
      }
      zr({
        path: s,
        value: p,
        errors: a,
        endEarly: c,
        tests: h
      }, i);
    });
  }
  clone(t) {
    const n = super.clone(t);
    return n.innerType = this.innerType, n;
  }
  concat(t) {
    let n = super.concat(t);
    return n.innerType = this.innerType, t.innerType && (n.innerType = n.innerType ? (
      // @ts-expect-error Lazy doesn't have concat()
      n.innerType.concat(t.innerType)
    ) : t.innerType), n;
  }
  of(t) {
    let n = this.clone();
    if (!Pn(t)) throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + _n(t));
    return n.innerType = t, n;
  }
  length(t, n = $r.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(i) {
        return pe(i) || i.length === this.resolve(t);
      }
    });
  }
  min(t, n) {
    return n = n || $r.min, this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      // FIXME(ts): Array<typeof T>
      test(i) {
        return pe(i) || i.length >= this.resolve(t);
      }
    });
  }
  max(t, n) {
    return n = n || $r.max, this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(i) {
        return pe(i) || i.length <= this.resolve(t);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((t, n) => this._typeCheck(t) ? t : n == null ? [] : [].concat(n));
  }
  compact(t) {
    let n = t ? (i, r, o) => !t(i, r, o) : (i) => !!i;
    return this.transform((i) => i != null ? i.filter(n) : i);
  }
  describe() {
    let t = super.describe();
    return this.innerType && (t.innerType = this.innerType.describe()), t;
  }
  nullable(t = !0) {
    return super.nullable(t);
  }
  defined() {
    return super.defined();
  }
  required(t) {
    return super.required(t);
  }
}
hs.prototype = ms.prototype;
function j0(e) {
  return new k0(e);
}
class k0 {
  constructor(t) {
    this.type = "lazy", this.__isYupSchema__ = !0, this._resolve = (n, i = {}) => {
      let r = this.builder(n, i);
      if (!Pn(r)) throw new TypeError("lazy() functions must return a valid schema");
      return r.resolve(i);
    }, this.builder = t;
  }
  resolve(t) {
    return this._resolve(t.value, t);
  }
  cast(t, n) {
    return this._resolve(t, n).cast(t, n);
  }
  validate(t, n, i) {
    return this._resolve(t, n).validate(t, n, i);
  }
  validateSync(t, n) {
    return this._resolve(t, n).validateSync(t, n);
  }
  validateAt(t, n, i) {
    return this._resolve(n, i).validateAt(t, n, i);
  }
  validateSyncAt(t, n, i) {
    return this._resolve(n, i).validateSyncAt(t, n, i);
  }
  describe() {
    return null;
  }
  isValid(t, n) {
    return this._resolve(t, n).isValid(t, n);
  }
  isValidSync(t, n) {
    return this._resolve(t, n).isValidSync(t, n);
  }
}
function pf(e) {
  Object.keys(e).forEach((t) => {
    Object.keys(e[t]).forEach((n) => {
      a0[t][n] = e[t][n];
    });
  });
}
function Mt(e, t, n) {
  if (!e || !Pn(e.prototype)) throw new TypeError("You must provide a yup schema constructor function");
  if (typeof t != "string") throw new TypeError("A Method name must be provided");
  if (typeof n != "function") throw new TypeError("Method function must be provided");
  e.prototype[t] = n;
}
var hf = { exports: {} };
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var U0 = B0;
function B0(e) {
  if (!e)
    throw new TypeError("argument namespace is required");
  function t(n) {
  }
  return t._file = void 0, t._ignored = !0, t._namespace = e, t._traced = !1, t._warned = /* @__PURE__ */ Object.create(null), t.function = H0, t.property = q0, t;
}
function H0(e, t) {
  if (typeof e != "function")
    throw new TypeError("argument fn must be a function");
  return e;
}
function q0(e, t, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new TypeError("argument obj must be object");
  var i = Object.getOwnPropertyDescriptor(e, t);
  if (!i)
    throw new TypeError("must call property on owner object");
  if (!i.configurable)
    throw new TypeError("property must be configurable");
}
var G0 = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? Y0 : W0);
function Y0(e, t) {
  return e.__proto__ = t, e;
}
function W0(e, t) {
  for (var n in t)
    Object.prototype.hasOwnProperty.call(e, n) || (e[n] = t[n]);
  return e;
}
const z0 = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var gs = z0, K0 = it;
it.message = gs;
it.code = Q0(gs);
it.codes = V0(gs);
it.redirect = {
  300: !0,
  301: !0,
  302: !0,
  303: !0,
  305: !0,
  307: !0,
  308: !0
};
it.empty = {
  204: !0,
  205: !0,
  304: !0
};
it.retry = {
  502: !0,
  503: !0,
  504: !0
};
function Q0(e) {
  var t = {};
  return Object.keys(e).forEach(function(i) {
    var r = e[i], o = Number(i);
    t[r.toLowerCase()] = o;
  }), t;
}
function V0(e) {
  return Object.keys(e).map(function(n) {
    return Number(n);
  });
}
function X0(e) {
  var t = e.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(it.code, t))
    throw new Error('invalid status message: "' + e + '"');
  return it.code[t];
}
function Du(e) {
  if (!Object.prototype.hasOwnProperty.call(it.message, e))
    throw new Error("invalid status code: " + e);
  return it.message[e];
}
function it(e) {
  if (typeof e == "number")
    return Du(e);
  if (typeof e != "string")
    throw new TypeError("code must be a number or string");
  var t = parseInt(e, 10);
  return isNaN(t) ? X0(e) : Du(t);
}
var io = { exports: {} };
typeof Object.create == "function" ? io.exports = function(t, n) {
  n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : io.exports = function(t, n) {
  if (n) {
    t.super_ = n;
    var i = function() {
    };
    i.prototype = n.prototype, t.prototype = new i(), t.prototype.constructor = t;
  }
};
var Z0 = io.exports;
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var J0 = ew;
function ew(e) {
  return e.split(" ").map(function(t) {
    return t.slice(0, 1).toUpperCase() + t.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  U0("http-errors");
  var t = G0, n = K0, i = Z0, r = J0;
  e.exports = a, e.exports.HttpError = s(), e.exports.isHttpError = c(e.exports.HttpError), d(e.exports, n.codes, e.exports.HttpError);
  function o(h) {
    return +(String(h).charAt(0) + "00");
  }
  function a() {
    for (var h, m, g = 500, v = {}, w = 0; w < arguments.length; w++) {
      var A = arguments[w], C = typeof A;
      if (C === "object" && A instanceof Error)
        h = A, g = h.status || h.statusCode || g;
      else if (C === "number" && w === 0)
        g = A;
      else if (C === "string")
        m = A;
      else if (C === "object")
        v = A;
      else
        throw new TypeError("argument #" + (w + 1) + " unsupported type " + C);
    }
    (typeof g != "number" || !n.message[g] && (g < 400 || g >= 600)) && (g = 500);
    var x = a[g] || a[o(g)];
    h || (h = x ? new x(m) : new Error(m || n.message[g]), Error.captureStackTrace(h, a)), (!x || !(h instanceof x) || h.status !== g) && (h.expose = g < 500, h.status = h.statusCode = g);
    for (var b in v)
      b !== "status" && b !== "statusCode" && (h[b] = v[b]);
    return h;
  }
  function s() {
    function h() {
      throw new TypeError("cannot construct abstract class");
    }
    return i(h, Error), h;
  }
  function u(h, m, g) {
    var v = p(m);
    function w(A) {
      var C = A ?? n.message[g], x = new Error(C);
      return Error.captureStackTrace(x, w), t(x, w.prototype), Object.defineProperty(x, "message", {
        enumerable: !0,
        configurable: !0,
        value: C,
        writable: !0
      }), Object.defineProperty(x, "name", {
        enumerable: !1,
        configurable: !0,
        value: v,
        writable: !0
      }), x;
    }
    return i(w, h), f(w, v), w.prototype.status = g, w.prototype.statusCode = g, w.prototype.expose = !0, w;
  }
  function c(h) {
    return function(g) {
      return !g || typeof g != "object" ? !1 : g instanceof h ? !0 : g instanceof Error && typeof g.expose == "boolean" && typeof g.statusCode == "number" && g.status === g.statusCode;
    };
  }
  function l(h, m, g) {
    var v = p(m);
    function w(A) {
      var C = A ?? n.message[g], x = new Error(C);
      return Error.captureStackTrace(x, w), t(x, w.prototype), Object.defineProperty(x, "message", {
        enumerable: !0,
        configurable: !0,
        value: C,
        writable: !0
      }), Object.defineProperty(x, "name", {
        enumerable: !1,
        configurable: !0,
        value: v,
        writable: !0
      }), x;
    }
    return i(w, h), f(w, v), w.prototype.status = g, w.prototype.statusCode = g, w.prototype.expose = !1, w;
  }
  function f(h, m) {
    var g = Object.getOwnPropertyDescriptor(h, "name");
    g && g.configurable && (g.value = m, Object.defineProperty(h, "name", g));
  }
  function d(h, m, g) {
    m.forEach(function(w) {
      var A, C = r(n.message[w]);
      switch (o(w)) {
        case 400:
          A = u(g, C, w);
          break;
        case 500:
          A = l(g, C, w);
          break;
      }
      A && (h[w] = A, h[C] = A);
    });
  }
  function p(h) {
    return h.substr(-5) !== "Error" ? h + "Error" : h;
  }
})(hf);
var tw = hf.exports;
const Mu = (e) => ({
  path: ho(e.path),
  message: e.message,
  name: e.name,
  value: e.value
}), nw = (e) => ({
  errors: Ze(e.inner) ? [
    Mu(e)
  ] : e.inner.map(Mu),
  message: e.message
});
class At extends Error {
  constructor(t = "An application error occured", n = {}) {
    super(), this.name = "ApplicationError", this.message = t, this.details = n;
  }
}
class yt extends At {
  constructor(t, n) {
    super(t, n), this.name = "ValidationError";
  }
}
class mf extends yt {
  constructor(t, n) {
    super("Validation");
    const { errors: i, message: r } = nw(t);
    this.message = n || r, this.details = {
      errors: i
    };
  }
}
class Vn extends At {
  constructor(t = "Invalid pagination", n) {
    super(t, n), this.name = "PaginationError", this.message = t;
  }
}
class rw extends At {
  constructor(t = "Entity not found", n) {
    super(t, n), this.name = "NotFoundError", this.message = t;
  }
}
class gf extends At {
  constructor(t = "Forbidden access", n) {
    super(t, n), this.name = "ForbiddenError", this.message = t;
  }
}
class iw extends At {
  constructor(t = "Unauthorized", n) {
    super(t, n), this.name = "UnauthorizedError", this.message = t;
  }
}
class aw extends At {
  constructor(t = "Too many requests, please try again later.", n) {
    super(t, n), this.name = "RateLimitError", this.message = t, this.details = n || {};
  }
}
class ow extends At {
  constructor(t = "Entity too large", n) {
    super(t, n), this.name = "PayloadTooLargeError", this.message = t;
  }
}
class sw extends gf {
  constructor(t = "Policy Failed", n) {
    super(t, n), this.name = "PolicyError", this.message = t, this.details = n || {};
  }
}
class uw extends At {
  constructor(t = "This feature is not implemented yet", n) {
    super(t, n), this.name = "NotImplementedError", this.message = t;
  }
}
const cw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApplicationError: At,
  ForbiddenError: gf,
  HttpError: tw.HttpError,
  NotFoundError: rw,
  NotImplementedError: uw,
  PaginationError: Vn,
  PayloadTooLargeError: ow,
  PolicyError: sw,
  RateLimitError: aw,
  UnauthorizedError: iw,
  ValidationError: yt,
  YupValidationError: mf
}, Symbol.toStringTag, { value: "Module" })), yf = (e, t) => {
  throw new mf(e, t);
}, vf = {
  strict: !0,
  abortEarly: !1
}, lw = (e, t = {}) => async (n, i) => {
  try {
    const r = sl(vf, t);
    return await e.validate(n, r);
  } catch (r) {
    throw r instanceof Be && yf(r, i), r;
  }
}, fw = (e, t = {}) => (n, i) => {
  try {
    const r = sl(vf, t);
    return e.validateSync(n, r);
  } catch (r) {
    throw r instanceof Be && yf(r, i), r;
  }
}, dw = [
  "$and",
  "$or"
], pw = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$eqi",
  "$ne",
  "$nei",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$null",
  "$notNull",
  "$between",
  "$startsWith",
  "$endsWith",
  "$startsWithi",
  "$endsWithi",
  "$contains",
  "$notContains",
  "$containsi",
  "$notContainsi",
  // Experimental, only for internal use
  "$jsonSupersetOf"
], hw = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$ne",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$between"
], mw = [
  "$in",
  "$notIn",
  "$between"
], Xr = {
  where: pw,
  cast: hw,
  group: dw,
  array: mw
}, gw = Object.fromEntries(Object.entries(Xr).map(([e, t]) => [
  e,
  t.map((n) => n.toLowerCase())
])), yw = (e, t) => e in t, wf = (e, t, n = !1) => n ? gw[e]?.includes(t.toLowerCase()) ?? !1 : yw(e, Xr) ? Xr[e]?.includes(t) ?? !1 : !1, Li = (e, t = !1) => Object.keys(Xr).some((n) => wf(n, e, t)), { ID_ATTRIBUTE: Bn, DOC_ID_ATTRIBUTE: da, PUBLISHED_AT_ATTRIBUTE: vw } = Je;
class ww extends Error {
  constructor() {
    super(), this.message = "Invalid order. order can only be one of asc|desc|ASC|DESC";
  }
}
class bw extends Error {
  constructor() {
    super(), this.message = "Invalid sort parameter. Expected a string, an array of strings, a sort object or an array of sort objects";
  }
}
function Lu(e) {
  if (!Fe(e) || ![
    "asc",
    "desc"
  ].includes(e.toLocaleLowerCase()))
    throw new ww();
}
const _w = (e) => Yt({
  type: "boolean",
  value: e
}), Ew = (e) => e, rn = (e) => H.isPlainObject(e), ju = (e) => Oe(e) && e.every(Fe), Tw = ({ getModel: e }) => {
  const t = (b) => {
    if (typeof b == "string")
      return n(b);
    if (ju(b))
      return b.flatMap((O) => n(O));
    if (Array.isArray(b))
      return b.map((O) => r(O));
    if (rn(b))
      return r(b);
    throw new bw();
  }, n = (b) => b.split(",").map((O) => i(O)), i = (b) => {
    if (!b)
      return {};
    if (!Fe(b))
      throw new Error("Invalid sort query");
    const [O, S = "asc"] = b.split(":");
    if (O.length === 0)
      throw new Error("Field cannot be empty");
    return Lu(S), H.set({}, O, S);
  }, r = (b) => {
    const O = {};
    for (const S of Object.keys(b)) {
      const _ = b[S];
      if (rn(_))
        O[S] = r(_);
      else if (typeof _ == "string")
        Lu(_), O[S] = _;
      else
        throw Error(`Invalid sort type expected object or string got ${typeof _}`);
    }
    return O;
  }, o = (b) => {
    const O = hr(b);
    if (!H.isInteger(O) || O < 0)
      throw new Error(`convertStartQueryParams expected a positive integer got ${O}`);
    return O;
  }, a = (b) => {
    const O = hr(b);
    if (!H.isInteger(O) || O !== -1 && O < 0)
      throw new Error(`convertLimitQueryParams expected a positive integer got ${O}`);
    if (O !== -1)
      return O;
  }, s = (b) => {
    const O = hr(b);
    if (!Da(O) || O <= 0)
      throw new Vn(`Invalid 'page' parameter. Expected an integer > 0, received: ${b}`);
    return O;
  }, u = (b, O) => {
    const S = hr(b);
    if (!Da(S) || S <= 0)
      throw new Vn(`Invalid 'pageSize' parameter. Expected an integer > 0, received: ${O}`);
    return S;
  }, c = (b, O, S, _) => {
    const R = !Y(b) || !Y(O), y = !Y(S) || !Y(_);
    if (R && y)
      throw new Vn("Invalid pagination attributes. The page parameters are incorrect and must be in the pagination object");
  };
  class l extends Error {
    constructor() {
      super(), this.message = "Invalid populate parameter. Expected a string, an array of strings, a populate object";
    }
  }
  const f = (b, O, S = 0) => {
    if (S === 0 && b === "*")
      return !0;
    if (typeof b == "string")
      return b.split(",").map((_) => H.trim(_));
    if (Array.isArray(b))
      return H.uniq(b.flatMap((_) => {
        if (typeof _ != "string")
          throw new l();
        return _.split(",").map((R) => H.trim(R));
      }));
    if (H.isPlainObject(b))
      return h(b, O);
    throw new l();
  }, d = (b) => typeof b == "object" && "on" in b && !Y(b.on), p = (b) => typeof b == "object" && "count" in b && typeof b.count == "boolean", h = (b, O) => {
    if (!O)
      return {};
    const { attributes: S } = O;
    return Object.entries(b).reduce((_, [R, y]) => {
      if (H.isString(y))
        try {
          return Yt({
            type: "boolean",
            value: y
          }) ? {
            ..._,
            [R]: !0
          } : _;
        } catch {
        }
      if (H.isBoolean(y))
        return y === !0 ? {
          ..._,
          [R]: !0
        } : _;
      const N = S[R];
      if (!N)
        return _;
      const j = rr(N) || Dt(N);
      if (j) {
        if (Object.keys(y).some((M) => ![
          "populate",
          "on",
          "count"
        ].includes(M)))
          throw new Error(`Invalid nested populate for ${O.info?.singularName}.${R} (${O.uid}). Expected a fragment ("on") or "count" but found ${JSON.stringify(y)}`);
        if ("populate" in y && y.populate !== "*")
          throw new Error("Invalid nested population query detected. When using 'populate' within polymorphic structures, its value must be '*' to indicate all second level links. Specific field targeting is not supported here. Consider using the fragment API for more granular population control.");
        const D = {};
        return "populate" in y && Object.assign(D, {
          populate: !0
        }), d(y) && Object.assign(D, {
          on: Object.entries(y.on).reduce((M, [z, V]) => ({
            ...M,
            [z]: m(V, e(z))
          }), {})
        }), p(y) && Object.assign(D, {
          count: y.count
        }), {
          ..._,
          [R]: D
        };
      }
      if (!j && d(y))
        throw new Error(`Using fragments is not permitted to populate "${R}" in "${O.uid}"`);
      let G;
      if (N.type === "relation")
        G = N.target;
      else if (N.type === "component")
        G = N.component;
      else if (N.type === "media")
        G = "plugin::upload.file";
      else
        return _;
      const E = e(G);
      if (!E)
        return _;
      const T = m(y, E);
      return T ? {
        ..._,
        [R]: T
      } : _;
    }, {});
  }, m = (b, O) => {
    if (H.isString(b))
      return Yt({
        type: "boolean",
        value: b,
        forceCast: !0
      });
    if (H.isBoolean(b))
      return b;
    if (!rn(b))
      throw new Error("Invalid nested populate. Expected '*' or an object");
    const { sort: S, filters: _, fields: R, populate: y, count: N, ordering: j, page: G, pageSize: E, start: T, limit: U } = b, D = {};
    return S && (D.orderBy = t(S)), _ && (D.where = w(_, O)), R && (D.select = g(R, O)), y && (D.populate = f(y, O)), N && (D.count = _w(N)), j && (D.ordering = Ew(j)), c(G, E, T, U), Y(G) || (D.page = s(G)), Y(E) || (D.pageSize = u(E, G)), Y(T) || (D.offset = o(T)), Y(U) || (D.limit = a(U)), D;
  }, g = (b, O, S = 0) => {
    if (!(S === 0 && b === "*")) {
      if (typeof b == "string") {
        const _ = b.split(",").map((R) => H.trim(R));
        return O?.modelType === "contentType" ? H.uniq([
          Bn,
          da,
          ..._
        ]) : H.uniq([
          Bn,
          ..._
        ]);
      }
      if (ju(b)) {
        const _ = b.flatMap((R) => g(R, O, S + 1)).filter((R) => !Y(R));
        return O?.modelType === "contentType" ? H.uniq([
          Bn,
          da,
          ..._
        ]) : H.uniq([
          Bn,
          ..._
        ]);
      }
      throw new Error("Invalid fields parameter. Expected a string or an array of strings");
    }
  }, v = (b, O) => [
    da,
    Bn
  ].includes(b) ? !0 : O ? Object.keys(O.attributes).includes(b) : !1, w = (b, O) => {
    if (!Ne(b))
      throw new Error("The filters parameter must be an object or an array");
    const S = bt(b);
    return A(S, O);
  }, A = (b, O) => {
    if (Array.isArray(b))
      return b.map((_) => A(_, O)).filter((_) => !rn(_) || !Ze(_));
    if (!rn(b))
      return b;
    const S = (_) => delete b[_];
    for (const [_, R] of Object.entries(b)) {
      const y = Ma(_, O?.attributes);
      Li(_) || v(_, O) ? y ? y.type === "relation" ? b[_] = A(R, e(y.target)) : y.type === "component" ? b[_] = A(R, e(y.component)) : y.type === "media" ? b[_] = A(R, e("plugin::upload.file")) : y.type === "dynamiczone" || y.type === "password" ? S(_) : b[_] = A(R, O) : [
        "$null",
        "$notNull"
      ].includes(_) ? b[_] = Yt({
        type: "boolean",
        value: b[_],
        forceCast: !0
      }) : Ne(R) && (b[_] = A(R, O)) : S(_), rn(b[_]) && Ze(b[_]) && S(_);
    }
    return b;
  }, C = (b, O = {}) => {
    O.filters = ({ meta: S }) => {
      const _ = e(S.uid);
      return !_ || !Ii(_) ? {} : {
        [vw]: {
          $null: b === "draft"
        }
      };
    };
  };
  return {
    private_convertSortQueryParams: t,
    private_convertStartQueryParams: o,
    private_convertLimitQueryParams: a,
    private_convertPopulateQueryParams: f,
    private_convertFiltersQueryParams: w,
    private_convertFieldsQueryParams: g,
    transformQueryParams: (b, O) => {
      const S = e(b), _ = {}, { _q: R, sort: y, filters: N, fields: j, populate: G, page: E, pageSize: T, start: U, limit: D, status: M, ...z } = O;
      return Y(M) || C(M, _), Y(R) || (_._q = R), Y(y) || (_.orderBy = t(y)), Y(N) || (_.where = w(N, S)), Y(j) || (_.select = g(j, S)), Y(G) || (_.populate = f(G, S)), c(E, T, U, D), Y(E) || (_.page = s(E)), Y(T) || (_.pageSize = u(T, E)), Y(U) || (_.offset = o(U)), Y(D) || (_.limit = a(D)), {
        ...z,
        ..._
      };
    }
  };
}, Sw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTransformer: Tw
}, Symbol.toStringTag, { value: "Module" }));
var Aw = (e, t = 1, n) => {
  if (n = {
    indent: " ",
    includeEmptyLines: !1,
    ...n
  }, typeof e != "string")
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
    );
  if (typeof t != "number")
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof t}\``
    );
  if (typeof n.indent != "string")
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof n.indent}\``
    );
  if (t === 0)
    return e;
  const i = n.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return e.replace(i, n.indent.repeat(t));
};
const ku = yi, Uu = /\s+at.*(?:\(|\s)(.*)\)?/, Ow = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/, Cw = typeof ku.homedir > "u" ? "" : ku.homedir();
var xw = (e, t) => (t = Object.assign({ pretty: !1 }, t), e.replace(/\\/g, "/").split(`
`).filter((n) => {
  const i = n.match(Uu);
  if (i === null || !i[1])
    return !0;
  const r = i[1];
  return r.includes(".app/Contents/Resources/electron.asar") || r.includes(".app/Contents/Resources/default_app.asar") ? !1 : !Ow.test(r);
}).filter((n) => n.trim() !== "").map((n) => t.pretty ? n.replace(Uu, (i, r) => i.replace(r, r.replace(Cw, "~"))) : n).join(`
`));
const Pw = Aw, Rw = xw, $w = (e) => e.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
let Iw = class extends Error {
  constructor(t) {
    if (!Array.isArray(t))
      throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
    t = [...t].map((i) => i instanceof Error ? i : i !== null && typeof i == "object" ? Object.assign(new Error(i.message), i) : new Error(i));
    let n = t.map((i) => typeof i.stack == "string" ? $w(Rw(i.stack)) : String(i)).join(`
`);
    n = `
` + Pw(n, 4), super(n), this.name = "AggregateError", Object.defineProperty(this, "_errors", { value: t });
  }
  *[Symbol.iterator]() {
    for (const t of this._errors)
      yield t;
  }
};
var Nw = Iw;
const Fw = Nw;
var Dw = async (e, t, {
  concurrency: n = 1 / 0,
  stopOnError: i = !0
} = {}) => new Promise((r, o) => {
  if (typeof t != "function")
    throw new TypeError("Mapper function is required");
  if (!((Number.isSafeInteger(n) || n === 1 / 0) && n >= 1))
    throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${n}\` (${typeof n})`);
  const a = [], s = [], u = e[Symbol.iterator]();
  let c = !1, l = !1, f = 0, d = 0;
  const p = () => {
    if (c)
      return;
    const h = u.next(), m = d;
    if (d++, h.done) {
      l = !0, f === 0 && (!i && s.length !== 0 ? o(new Fw(s)) : r(a));
      return;
    }
    f++, (async () => {
      try {
        const g = await h.value;
        a[m] = await t(g, m), f--, p();
      } catch (g) {
        i ? (c = !0, o(g)) : (s.push(g), f--, p());
      }
    })();
  };
  for (let h = 0; h < n && (p(), !l); h++)
    ;
});
const Mw = /* @__PURE__ */ tr(Dw);
function Se(...e) {
  const [t, ...n] = e;
  return async (...i) => {
    let r = await t.apply(t, i);
    for (let o = 0; o < n.length; o += 1)
      r = await n[o](r);
    return r;
  };
}
const Lw = ft(Mw), jw = (e) => async (t, n) => {
  let i = n;
  for (let r = 0; r < e.length; r += 1)
    i = await t(i, await e[r], r);
  return i;
}, kw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  map: Lw,
  pipe: Se,
  reduce: jw
}, Symbol.toStringTag, { value: "Module" })), Rn = ({ key: e, attribute: t }, { remove: n }) => {
  t?.type === "password" && n(e);
}, $n = ({ schema: e, key: t, attribute: n }, { remove: i }) => {
  if (!n)
    return;
  (n.private === !0 || ns(e, t)) && i(t);
}, Uw = [
  "oneToMany",
  "manyToMany"
], Bw = (e) => Object.keys(e.attributes).filter((t) => e.attributes[t].type === "relation"), Hw = (e) => dt(e) && [
  "oneToOne",
  "oneToMany"
].includes(e.relation), qw = (e) => dt(e) && [
  "manyToMany",
  "manyToOne"
].includes(e.relation), Gw = (e) => dt(e) && [
  "oneToOne",
  "manyToOne"
].includes(e.relation), Yw = (e) => dt(e) && [
  "oneToMany",
  "manyToMany"
].includes(e.relation), Ww = (e) => [
  "morphOne",
  "morphMany",
  "morphToOne",
  "morphToMany"
].includes(e.relation), zw = {
  MANY_RELATIONS: Uw
}, Zr = {
  strict: Kp
}, Kw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VALID_RELATION_ORDERING_KEYS: Zr,
  constants: zw,
  getRelationalFields: Bw,
  isAnyToMany: Yw,
  isAnyToOne: Gw,
  isManyToAny: qw,
  isOneToAny: Hw,
  isPolymorphic: Ww
}, Symbol.toStringTag, { value: "Module" })), Bu = [
  "find"
], { CREATED_BY_ATTRIBUTE: Qw, UPDATED_BY_ATTRIBUTE: Vw } = Je;
var fn = (e) => async ({ data: t, key: n, attribute: i, schema: r }, { remove: o, set: a }) => {
  if (!i || !(i.type === "relation"))
    return;
  const u = async () => {
    const d = t[n];
    if (d)
      if ("connect" in d || "set" in d || "disconnect" in d) {
        const p = {}, h = await c(d.connect || []), m = await c(d.set || []), g = await c(d.disconnect || []);
        if (h.length > 0 && (p.connect = h), m.length > 0 && (p.set = m), g.length > 0 && (p.disconnect = g), "options" in d && typeof d.options == "object" && d.options !== null) {
          const v = {};
          Object.keys(d.options).forEach((w) => {
            const A = Zr[w];
            A && A(d.options[w]) && (v[w] = d.options[w]);
          }), p.options = v;
        } else
          p.options = {};
        a(n, p);
      } else {
        const p = await c(d);
        p.length && a(n, p);
      }
  }, c = async (d) => {
    const p = [];
    if (!Oe(d))
      return p;
    for (const h of d) {
      if (!Ne(h) || !("__type" in h))
        continue;
      const m = Bu.map((v) => `${h.__type}.${v}`);
      await Hu(m, e) && p.push(h);
    }
    return p;
  }, l = async () => {
    const d = Bu.map((h) => `${i.target}.${h}`);
    await Hu(d, e) || o(n);
  }, f = [
    Qw,
    Vw
  ].includes(n);
  if (Dt(i)) {
    await u();
    return;
  }
  f && r.options?.populateCreatorFields || await l();
};
const Hu = async (e, t) => {
  for (const n of e)
    try {
      return await strapi.auth.verify(t, {
        scope: n
      }), !0;
    } catch {
      continue;
    }
  return !1;
}, ys = ({ key: e, attribute: t }, { remove: n }) => {
  Dt(t) && n(e);
}, vs = ({ key: e, attribute: t }, { remove: n }) => {
  rr(t) && n(e);
};
var Xw = (e = null) => ({ key: t, path: { attribute: n } }, { remove: i }) => {
  if (e === null)
    return;
  if (!(Oe(e) && e.every(Fe)))
    throw new TypeError(`Expected array of strings for allowedFields but got "${typeof e}"`);
  if (Y(n))
    return;
  const r = Zw(n);
  e.some((a) => r.includes(a) || a.startsWith(`${n}.`)) || i(t);
};
const Zw = (e) => ho(e).reduce((n, i, r, o) => [
  ...n,
  o.slice(0, r + 1).join(".")
], []);
var bf = (e = null) => ({ key: t, path: { attribute: n } }, { remove: i }) => {
  if (e === null) {
    i(t);
    return;
  }
  if (!(Oe(e) && e.every(Fe)))
    throw new TypeError(`Expected array of strings for restrictedFields but got "${typeof e}"`);
  if (e.includes(n)) {
    i(t);
    return;
  }
  e.some((o) => n?.toString().startsWith(`${o}.`)) && i(t);
};
const _f = ({ schema: e, key: t, value: n }, { set: i }) => {
  if (t === "" && n === "*") {
    const { attributes: r } = e, o = Object.entries(r).filter(([, a]) => [
      "relation",
      "component",
      "media",
      "dynamiczone"
    ].includes(a.type)).reduce((a, [s]) => ({
      ...a,
      [s]: !0
    }), {});
    i("", o);
  }
}, Jw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  expandWildcardPopulate: _f,
  removeDisallowedFields: Xw,
  removeDynamicZones: vs,
  removeMorphToRelations: ys,
  removePassword: Rn,
  removePrivate: $n,
  removeRestrictedFields: bf,
  removeRestrictedRelations: fn
}, Symbol.toStringTag, { value: "Module" })), eb = {
  raw: null,
  attribute: null
};
var ji = () => {
  const e = {
    parsers: [],
    interceptors: [],
    ignore: [],
    handlers: {
      attributes: [],
      common: []
    }
  }, t = async (n, i, r) => {
    const { path: o = eb, parent: a, schema: s, getModel: u } = i ?? {};
    for (const { predicate: p, handler: h } of e.interceptors)
      if (p(r))
        return h(n, i, r, {
          recurse: t
        });
    const c = e.parsers.find((p) => p.predicate(r))?.parser, l = c?.(r);
    if (!l)
      return r;
    let f = l.transform(r);
    const d = l.keys(f);
    for (const p of d) {
      const h = s?.attributes?.[p], m = {
        ...o
      };
      m.raw = Y(o.raw) ? p : `${o.raw}.${p}`, Y(h) || (m.attribute = Y(o.attribute) ? p : `${o.attribute}.${p}`);
      const g = {
        key: p,
        value: l.get(p, f),
        attribute: h,
        schema: s,
        path: m,
        data: f,
        getModel: u,
        parent: a
      }, v = {
        remove(O) {
          f = l.remove(O, f);
        },
        set(O, S) {
          f = l.set(O, S, f);
        },
        recurse: t
      };
      await n(g, gu([
        "remove",
        "set"
      ], v));
      const w = l.get(p, f), A = () => ({
        key: p,
        value: w,
        attribute: h,
        schema: s,
        path: m,
        data: f,
        visitor: n,
        getModel: u,
        parent: a
      }), C = A();
      if (e.ignore.some((O) => O(C)))
        continue;
      const b = [
        ...e.handlers.common,
        ...e.handlers.attributes
      ];
      for await (const O of b) {
        const S = A();
        await O.predicate(S) && await O.handler(S, gu([
          "recurse",
          "set"
        ], v));
      }
    }
    return f;
  };
  return {
    traverse: t,
    intercept(n, i) {
      return e.interceptors.push({
        predicate: n,
        handler: i
      }), this;
    },
    parse(n, i) {
      return e.parsers.push({
        predicate: n,
        parser: i
      }), this;
    },
    ignore(n) {
      return e.ignore.push(n), this;
    },
    on(n, i) {
      return e.handlers.common.push({
        predicate: n,
        handler: i
      }), this;
    },
    onAttribute(n, i) {
      return e.handlers.attributes.push({
        predicate: n,
        handler: i
      }), this;
    },
    onRelation(n) {
      return this.onAttribute(({ attribute: i }) => i?.type === "relation", n);
    },
    onMedia(n) {
      return this.onAttribute(({ attribute: i }) => i?.type === "media", n);
    },
    onComponent(n) {
      return this.onAttribute(({ attribute: i }) => i?.type === "component", n);
    },
    onDynamicZone(n) {
      return this.onAttribute(({ attribute: i }) => i?.type === "dynamiczone", n);
    }
  };
};
const tb = (e) => Ne(e), nb = ji().intercept(
  // Intercept filters arrays and apply the traversal to each one individually
  Oe,
  async (e, t, n, { recurse: i }) => Promise.all(n.map((r, o) => {
    const a = t.path ? {
      ...t.path,
      raw: `${t.path.raw}[${o}]`
    } : t.path;
    return i(e, {
      ...t,
      path: a
    }, r);
  })).then((r) => r.filter((o) => !(Ne(o) && Ze(o))))
).intercept(
  // Ignore non object filters and return the value as-is
  (e) => !Ne(e),
  (e, t, n) => n
).parse(tb, () => ({
  transform: bt,
  remove(e, t) {
    return jr(e, t);
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).ignore(({ value: e }) => Y(e)).on(({ attribute: e }) => Y(e), async ({ key: e, visitor: t, path: n, value: i, schema: r, getModel: o, attribute: a }, { set: s, recurse: u }) => {
  s(e, await u(t, {
    schema: r,
    path: n,
    getModel: o,
    parent: {
      key: e,
      path: n,
      schema: r,
      attribute: a
    }
  }, i));
}).onRelation(async ({ key: e, attribute: t, visitor: n, path: i, value: r, schema: o, getModel: a }, { set: s, recurse: u }) => {
  if (t.relation.toLowerCase().startsWith("morph"))
    return;
  const l = {
    key: e,
    path: i,
    schema: o,
    attribute: t
  }, f = t.target, d = a(f), p = await u(n, {
    schema: d,
    path: i,
    getModel: a,
    parent: l
  }, r);
  s(e, p);
}).onComponent(async ({ key: e, attribute: t, visitor: n, path: i, schema: r, value: o, getModel: a }, { set: s, recurse: u }) => {
  const c = {
    key: e,
    path: i,
    schema: r,
    attribute: t
  }, l = a(t.component), f = await u(n, {
    schema: l,
    path: i,
    getModel: a,
    parent: c
  }, o);
  s(e, f);
}).onMedia(async ({ key: e, visitor: t, path: n, schema: i, attribute: r, value: o, getModel: a }, { set: s, recurse: u }) => {
  const c = {
    key: e,
    path: n,
    schema: i,
    attribute: r
  }, f = a("plugin::upload.file"), d = await u(t, {
    schema: f,
    path: n,
    getModel: a,
    parent: c
  }, o);
  s(e, d);
});
var qe = ft(nb.traverse);
const rb = {
  asc: "asc",
  desc: "desc"
}, ib = Object.values(rb), ab = (e) => ib.includes(e.toLowerCase()), ob = (e) => Array.isArray(e) && e.every(Fe), sb = (e) => Array.isArray(e) && e.every(Ne), ub = (e) => Fe(e) && e.split(",").length > 1, cb = (e) => Ne(e), lb = ji().intercept(
  // String with chained sorts (foo,bar,foobar) => split, map(recurse), then recompose
  ub,
  async (e, t, n, { recurse: i }) => Promise.all(n.split(",").map(kr).map((r) => i(e, t, r))).then((r) => r.filter((o) => !Ze(o)).join(","))
).intercept(
  // Array of strings ['foo', 'foo,bar'] => map(recurse), then filter out empty items
  ob,
  async (e, t, n, { recurse: i }) => Promise.all(n.map((r) => i(e, t, r))).then((r) => r.filter((o) => !Ze(o)))
).intercept(
  // Array of objects [{ foo: 'asc' }, { bar: 'desc', baz: 'asc' }] => map(recurse), then filter out empty items
  sb,
  async (e, t, n, { recurse: i }) => Promise.all(n.map((r) => i(e, t, r))).then((r) => r.filter((o) => !Ze(o)))
).parse(Fe, () => {
  const e = La(ja("."), Qp(ja(":")), Vp), t = (n) => {
    if (n.length !== 0)
      return n.reduce((i, r) => Ze(r) ? i : i === "" ? r : ab(r) ? `${i}:${r}` : `${i}.${r}`, "");
  };
  return {
    transform: kr,
    remove(n, i) {
      const [r] = e(i);
      return r === n ? void 0 : i;
    },
    set(n, i, r) {
      const [o] = e(r);
      return o !== n ? r : Y(i) ? o : `${o}.${i}`;
    },
    keys(n) {
      const i = ul(e(n));
      return i ? [
        i
      ] : [];
    },
    get(n, i) {
      const [r, ...o] = e(i);
      return n === r ? t(o) : void 0;
    }
  };
}).parse(cb, () => ({
  transform: bt,
  remove(e, t) {
    const { [e]: n, ...i } = t;
    return i;
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).onRelation(async ({ key: e, value: t, attribute: n, visitor: i, path: r, getModel: o, schema: a }, { set: s, recurse: u }) => {
  if (n.relation.toLowerCase().startsWith("morph"))
    return;
  const l = {
    key: e,
    path: r,
    schema: a,
    attribute: n
  }, f = n.target, d = o(f), p = await u(i, {
    schema: d,
    path: r,
    getModel: o,
    parent: l
  }, t);
  s(e, p);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: i, visitor: r, value: o, getModel: a }, { recurse: s, set: u }) => {
  const c = {
    key: e,
    path: t,
    schema: n,
    attribute: i
  }, f = a("plugin::upload.file"), d = await s(r, {
    schema: f,
    path: t,
    getModel: a,
    parent: c
  }, o);
  u(e, d);
}).onComponent(async ({ key: e, value: t, visitor: n, path: i, schema: r, attribute: o, getModel: a }, { recurse: s, set: u }) => {
  const c = {
    key: e,
    path: i,
    schema: r,
    attribute: o
  }, l = a(o.component), f = await s(n, {
    schema: l,
    path: i,
    getModel: a,
    parent: c
  }, t);
  u(e, f);
});
var Ue = ft(lb.traverse);
const qu = (e) => ({ key: t, attribute: n }) => !n && e === t, Ef = (e) => e === "*", fb = (e) => Fe(e) && !Ef(e), db = (e) => Oe(e) && e.every(Fe), Gu = (e) => Ne(e), pb = ji().intercept(fb, async (e, t, n, { recurse: i }) => {
  const r = mb([
    n
  ]), o = await i(e, t, r), [a] = hb(o);
  return a;
}).intercept(db, async (e, t, n, { recurse: i }) => (await Promise.all(n.map((o) => i(e, t, o)))).filter((o) => !Y(o))).parse(Ef, () => ({
  /**
  * Since value is '*', we don't need to transform it
  */
  transform: Xp,
  /**
  * '*' isn't a key/value structure, so regardless
  *  of the given key, it returns the data ('*')
  */
  get: (e, t) => t,
  /**
  * '*' isn't a key/value structure, so regardless
  * of the given `key`, use `value` as the new `data`
  */
  set: (e, t) => t,
  /**
  * '*' isn't a key/value structure, but we need to simulate at least one to enable
  * the data traversal. We're using '' since it represents a falsy string value
  */
  keys: ka([
    ""
  ]),
  /**
  * Removing '*' means setting it to undefined, regardless of the given key
  */
  remove: ka(void 0)
})).parse(Fe, () => {
  const e = ja("."), t = Zp(".");
  return {
    transform: kr,
    remove(n, i) {
      const [r] = e(i);
      return r === n ? void 0 : i;
    },
    set(n, i, r) {
      const [o] = e(r);
      return o !== n ? r : Y(i) || Ze(i) ? o : `${o}.${i}`;
    },
    keys(n) {
      const i = ul(e(n));
      return i ? [
        i
      ] : [];
    },
    get(n, i) {
      const [r, ...o] = e(i);
      return n === r ? t(o) : void 0;
    }
  };
}).parse(Gu, () => ({
  transform: bt,
  remove(e, t) {
    const { [e]: n, ...i } = t;
    return i;
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).ignore(({ key: e, attribute: t }) => [
  "sort",
  "filters",
  "fields"
].includes(e) && !t).on(
  // Handle recursion on populate."populate"
  qu("populate"),
  async ({ key: e, visitor: t, path: n, value: i, schema: r, getModel: o, attribute: a }, { set: s, recurse: u }) => {
    const l = await u(t, {
      schema: r,
      path: n,
      getModel: o,
      parent: {
        key: e,
        path: n,
        schema: r,
        attribute: a
      }
    }, i);
    s(e, l);
  }
).on(qu("on"), async ({ key: e, visitor: t, path: n, value: i, getModel: r, parent: o }, { set: a, recurse: s }) => {
  const u = {};
  if (Gu(i)) {
    for (const [c, l] of Object.entries(i)) {
      const f = r(c), d = {
        ...n,
        raw: `${n.raw}[${c}]`
      };
      u[c] = await s(t, {
        schema: f,
        path: d,
        getModel: r,
        parent: o
      }, l);
    }
    a(e, u);
  }
}).onRelation(async ({ key: e, value: t, attribute: n, visitor: i, path: r, schema: o, getModel: a }, { set: s, recurse: u }) => {
  if (Y(t))
    return;
  const c = {
    key: e,
    path: r,
    schema: o,
    attribute: n
  };
  if (Dt(n)) {
    if (!Ne(t) || !("on" in t && Ne(t?.on)))
      return;
    const p = await u(i, {
      schema: o,
      path: r,
      getModel: a,
      parent: c
    }, {
      on: t?.on
    });
    s(e, p);
    return;
  }
  const l = n.target, f = a(l), d = await u(i, {
    schema: f,
    path: r,
    getModel: a,
    parent: c
  }, t);
  s(e, d);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: i, visitor: r, value: o, getModel: a }, { recurse: s, set: u }) => {
  if (Y(o))
    return;
  const c = {
    key: e,
    path: t,
    schema: n,
    attribute: i
  }, f = a("plugin::upload.file"), d = await s(r, {
    schema: f,
    path: t,
    getModel: a,
    parent: c
  }, o);
  u(e, d);
}).onComponent(async ({ key: e, value: t, schema: n, visitor: i, path: r, attribute: o, getModel: a }, { recurse: s, set: u }) => {
  if (Y(t))
    return;
  const c = {
    key: e,
    path: r,
    schema: n,
    attribute: o
  }, l = a(o.component), f = await s(i, {
    schema: l,
    path: r,
    getModel: a,
    parent: c
  }, t);
  u(e, f);
}).onDynamicZone(async ({ key: e, value: t, schema: n, visitor: i, path: r, attribute: o, getModel: a }, { set: s, recurse: u }) => {
  if (Y(t) || !Ne(t))
    return;
  const c = {
    key: e,
    path: r,
    schema: n,
    attribute: o
  };
  if ("on" in t && t.on) {
    const l = await u(i, {
      schema: n,
      path: r,
      getModel: a,
      parent: c
    }, {
      on: t.on
    });
    s(e, l);
  }
});
var Rt = ft(pb.traverse);
const hb = (e) => {
  const t = [];
  function n(i, r) {
    for (const [o, a] of Object.entries(i)) {
      const s = r ? `${r}.${o}` : o;
      a === !0 ? t.push(s) : n(a.populate, s);
    }
  }
  return n(e, ""), t;
}, mb = (e) => {
  const t = {};
  function n(i, r) {
    const [o, ...a] = r;
    a.length === 0 ? i[o] = !0 : ((!i[o] || typeof i[o] == "boolean") && (i[o] = {
      populate: {}
    }), n(i[o].populate, a));
  }
  return e.forEach((i) => n(t, i.split("."))), t;
}, gb = (e) => Oe(e) && e.every(Fe), yb = ji().intercept(gb, async (e, t, n, { recurse: i }) => Promise.all(n.map((r) => i(e, t, r)))).intercept((e) => Fe(e) && e.includes(","), (e, t, n, { recurse: i }) => Promise.all(n.split(",").map((r) => i(e, t, r)))).intercept((e) => po("*", e), ka("*")).parse(Fe, () => ({
  transform: kr,
  remove(e, t) {
    return t === e ? void 0 : t;
  },
  set(e, t, n) {
    return n;
  },
  keys(e) {
    return [
      e
    ];
  },
  get(e, t) {
    return e === t ? t : void 0;
  }
}));
var Wt = ft(yb.traverse);
const { ID_ATTRIBUTE: Jr, DOC_ID_ATTRIBUTE: ei } = Je, vb = (e) => async (t) => {
  if (!e.schema)
    throw new Error("Missing schema in sanitizePasswords");
  return _t(Rn, e, t);
}, Tf = async (e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeOutput");
  return _t((...n) => {
    Rn(...n), $n(...n);
  }, e, t);
}, ws = ft((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFilters");
  return Se(
    // Remove keys that are not attributes or valid operators
    qe(({ key: n, attribute: i }, { remove: r }) => {
      const o = !!i;
      [
        Jr,
        ei
      ].includes(n) || !o && !Li(n) && r(n);
    }, e),
    // Remove dynamic zones from filters
    qe(vs, e),
    // Remove morpTo relations from filters
    qe(ys, e),
    // Remove passwords from filters
    qe(Rn, e),
    // Remove private from filters
    qe($n, e),
    // Remove empty objects
    qe(({ key: n, value: i }, { remove: r }) => {
      Ne(i) && Ze(i) && r(n);
    }, e)
  )(t);
}), bs = ft((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeSort");
  return Se(
    // Remove non attribute keys
    Ue(({ key: n, attribute: i }, { remove: r }) => {
      [
        Jr,
        ei
      ].includes(n) || i || r(n);
    }, e),
    // Remove dynamic zones from sort
    Ue(vs, e),
    // Remove morpTo relations from sort
    Ue(ys, e),
    // Remove private from sort
    Ue($n, e),
    // Remove passwords from filters
    Ue(Rn, e),
    // Remove keys for empty non-scalar values
    Ue(({ key: n, attribute: i, value: r }, { remove: o }) => {
      [
        Jr,
        ei
      ].includes(n) || !xn(i) && Ze(r) && o(n);
    }, e)
  )(t);
}), _s = ft((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFields");
  return Se(
    // Only keep scalar attributes
    Wt(({ key: n, attribute: i }, { remove: r }) => {
      [
        Jr,
        ei
      ].includes(n) || (Y(i) || !xn(i)) && r(n);
    }, e),
    // Remove private fields
    Wt($n, e),
    // Remove password fields
    Wt(Rn, e),
    // Remove nil values from fields array
    (n) => Oe(n) ? n.filter((i) => !Y(i)) : n
  )(t);
}), Es = ft((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizePopulate");
  return Se(
    Rt(_f, e),
    Rt(async ({ key: n, value: i, schema: r, attribute: o, getModel: a, path: s }, { set: u }) => {
      if (o)
        return;
      const c = {
        key: n,
        path: s,
        schema: r,
        attribute: o
      };
      n === "sort" && u(n, await bs({
        schema: r,
        getModel: a,
        parent: c
      }, i)), n === "filters" && u(n, await ws({
        schema: r,
        getModel: a,
        parent: c
      }, i)), n === "fields" && u(n, await _s({
        schema: r,
        getModel: a,
        parent: c
      }, i)), n === "populate" && u(n, await Es({
        schema: r,
        getModel: a,
        parent: c
      }, i));
    }, e),
    // Remove private fields
    Rt($n, e)
  )(t);
}), wb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultSanitizeFields: _s,
  defaultSanitizeFilters: ws,
  defaultSanitizeOutput: Tf,
  defaultSanitizePopulate: Es,
  defaultSanitizeSort: bs,
  sanitizePasswords: vb
}, Symbol.toStringTag, { value: "Module" })), bb = (e) => {
  const { getModel: t } = e, n = (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizeInput");
    if (Oe(c))
      return Promise.all(c.map((h) => n(h, l, {
        auth: f
      })));
    const d = $i(l), p = [
      // Remove first level ID in inputs
      jr(Je.ID_ATTRIBUTE),
      jr(Je.DOC_ID_ATTRIBUTE),
      // Remove non-writable attributes
      _t(bf(d), {
        schema: l,
        getModel: t
      })
    ];
    return f && p.push(_t(fn(f), {
      schema: l,
      getModel: t
    })), e?.sanitizers?.input?.forEach((h) => p.push(h(l))), Se(...p)(c);
  }, i = async (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizeOutput");
    if (Oe(c)) {
      const p = new Array(c.length);
      for (let h = 0; h < c.length; h += 1)
        p[h] = await i(c[h], l, {
          auth: f
        });
      return p;
    }
    const d = [
      (p) => Tf({
        schema: l,
        getModel: t
      }, p)
    ];
    return f && d.push(_t(fn(f), {
      schema: l,
      getModel: t
    })), e?.sanitizers?.output?.forEach((p) => d.push(p(l))), Se(...d)(c);
  }, r = async (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizeQuery");
    const { filters: d, sort: p, fields: h, populate: m } = c, g = bt(c);
    return d && Object.assign(g, {
      filters: await o(d, l, {
        auth: f
      })
    }), p && Object.assign(g, {
      sort: await a(p, l, {
        auth: f
      })
    }), h && Object.assign(g, {
      fields: await s(h, l)
    }), m && Object.assign(g, {
      populate: await u(m, l)
    }), g;
  }, o = (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizeFilters");
    if (Oe(c))
      return Promise.all(c.map((p) => o(p, l, {
        auth: f
      })));
    const d = [
      ws({
        schema: l,
        getModel: t
      })
    ];
    return f && d.push(qe(fn(f), {
      schema: l,
      getModel: t
    })), Se(...d)(c);
  }, a = (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizeSort");
    const d = [
      bs({
        schema: l,
        getModel: t
      })
    ];
    return f && d.push(Ue(fn(f), {
      schema: l,
      getModel: t
    })), Se(...d)(c);
  }, s = (c, l) => {
    if (!l)
      throw new Error("Missing schema in sanitizeFields");
    const f = [
      _s({
        schema: l,
        getModel: t
      })
    ];
    return Se(...f)(c);
  }, u = (c, l, { auth: f } = {}) => {
    if (!l)
      throw new Error("Missing schema in sanitizePopulate");
    const d = [
      Es({
        schema: l,
        getModel: t
      })
    ];
    return f && d.push(Rt(fn(f), {
      schema: l,
      getModel: t
    })), Se(...d)(c);
  };
  return {
    input: n,
    output: i,
    query: r,
    filters: o,
    sort: a,
    fields: s,
    populate: u
  };
}, _b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAPISanitizers: bb,
  sanitizers: wb,
  visitors: Jw
}, Symbol.toStringTag, { value: "Module" })), se = ({ key: e, path: t }) => {
  const n = t && t !== e ? `Invalid key ${e} at ${t}` : `Invalid key ${e}`;
  throw new yt(n, {
    key: e,
    path: t
  });
}, Lt = (e) => {
  const t = (...n) => n.length >= e.length ? e(...n) : (...i) => t(...n, ...i);
  return t;
}, ki = ({ key: e, attribute: t, path: n }) => {
  t?.type === "password" && se({
    key: e,
    path: n.attribute
  });
}, or = ({ schema: e, key: t, attribute: n, path: i }) => {
  if (!n)
    return;
  (n.private === !0 || ns(e, t)) && se({
    key: t,
    path: i.attribute
  });
}, Yu = [
  "find"
], { CREATED_BY_ATTRIBUTE: Eb, UPDATED_BY_ATTRIBUTE: Tb } = Je;
var zn = (e) => async ({ data: t, key: n, attribute: i, schema: r, path: o }) => {
  if (!i || !(i.type === "relation"))
    return;
  const s = async () => {
    const f = t[n];
    if ("connect" in f || "set" in f || "disconnect" in f || "options" in f) {
      if (await u(f.connect || []), await u(f.set || []), await u(f.disconnect || []), "options" in f) {
        if (f.options === null || f.options === void 0)
          return;
        typeof f.options != "object" && se({
          key: n,
          path: o.attribute
        });
        const d = Object.keys(f.options);
        for (const p of d)
          p in Zr || se({
            key: p,
            path: o.attribute
          }), Zr[p](f.options[p]) || se({
            key: p,
            path: o.attribute
          });
      }
    } else
      await u(f);
  }, u = async (f) => {
    Oe(f) || se({
      key: n,
      path: o.attribute
    });
    for (const d of f) {
      (!Ne(d) || !("__type" in d)) && se({
        key: n,
        path: o.attribute
      });
      const p = Yu.map((m) => `${d.__type}.${m}`);
      await Wu(p, e) || se({
        key: n,
        path: o.attribute
      });
    }
  }, c = async () => {
    const f = Yu.map((p) => `${i.target}.${p}`);
    await Wu(f, e) || se({
      key: n,
      path: o.attribute
    });
  }, l = [
    Eb,
    Tb
  ].includes(n);
  if (Dt(i)) {
    await s();
    return;
  }
  l && r.options?.populateCreatorFields || await c();
};
const Wu = async (e, t) => {
  for (const n of e)
    try {
      return await strapi.auth.verify(t, {
        scope: n
      }), !0;
    } catch {
      continue;
    }
  return !1;
}, Ts = ({ key: e, attribute: t, path: n }) => {
  Dt(t) && se({
    key: e,
    path: n.attribute
  });
}, Ss = ({ key: e, attribute: t, path: n }) => {
  rr(t) && se({
    key: e,
    path: n.attribute
  });
};
var Sb = (e = null) => ({ key: t, path: { attribute: n } }) => {
  if (e === null)
    return;
  if (!(Oe(e) && e.every(Fe)))
    throw new TypeError(`Expected array of strings for allowedFields but got "${typeof e}"`);
  if (Y(n))
    return;
  const i = Ab(n);
  e.some((o) => i.includes(o) || o.startsWith(`${n}.`)) || se({
    key: t,
    path: n
  });
};
const Ab = (e) => ho(e).reduce((n, i, r, o) => [
  ...n,
  o.slice(0, r + 1).join(".")
], []);
var Sf = (e = null) => ({ key: t, path: { attribute: n } }) => {
  if (e === null && se({
    key: t,
    path: n
  }), !(Oe(e) && e.every(Fe)))
    throw new TypeError(`Expected array of strings for restrictedFields but got "${typeof e}"`);
  e.includes(n) && se({
    key: t,
    path: n
  }), e.some((r) => n?.toString().startsWith(`${r}.`)) && se({
    key: t,
    path: n
  });
};
const Af = [
  Je.DOC_ID_ATTRIBUTE,
  Je.DOC_ID_ATTRIBUTE
], Ob = [
  ...Af
], Cb = [
  "__type"
], xb = [
  "__component"
], Pb = [
  "connect",
  "disconnect",
  "set",
  "options"
], Of = ({ key: e, attribute: t, path: n, schema: i, parent: r }) => {
  if (t)
    return;
  if (n.attribute === null)
    return Ob.includes(e) ? void 0 : se({
      key: e,
      path: t
    });
  Dt(r?.attribute) && Cb.includes(e) || Zl(i) && rr(r?.attribute) && xb.includes(e) || tf(r?.attribute) && Pb.includes(e) || (dt(r?.attribute) || rs(r?.attribute)) && !Af.includes(e) || se({
    key: e,
    path: t
  });
}, Rb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  throwDisallowedFields: Sb,
  throwDynamicZones: Ss,
  throwMorphToRelations: Ts,
  throwPassword: ki,
  throwPrivate: or,
  throwRestrictedFields: Sf,
  throwRestrictedRelations: zn,
  throwUnrecognizedFields: Of
}, Symbol.toStringTag, { value: "Module" })), { ID_ATTRIBUTE: ti, DOC_ID_ATTRIBUTE: ni } = Je, Ui = [
  "nonAttributesOperators",
  "dynamicZones",
  "morphRelations",
  "passwords",
  "private"
], As = Lt(async (e, t, n) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultValidateFilters");
  const i = [];
  return n.includes("nonAttributesOperators") && i.push(qe(({ key: r, attribute: o, path: a }) => {
    if ([
      ti,
      ni
    ].includes(r))
      return;
    !!!o && !Li(r) && se({
      key: r,
      path: a.attribute
    });
  }, e)), n.includes("dynamicZones") && i.push(qe(Ss, e)), n.includes("morphRelations") && i.push(qe(Ts, e)), n.includes("passwords") && i.push(qe(ki, e)), n.includes("private") && i.push(qe(or, e)), i.length === 0 ? t : Se(...i)(t);
}), Cf = Lt(async (e, t) => As(e, t, Ui)), Bi = [
  "nonAttributesOperators",
  "dynamicZones",
  "morphRelations",
  "passwords",
  "private",
  "nonScalarEmptyKeys"
], Os = Lt(async (e, t, n) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultValidateSort");
  const i = [];
  return n.includes("nonAttributesOperators") && i.push(Ue(({ key: r, attribute: o, path: a }) => {
    [
      ti,
      ni
    ].includes(r) || o || se({
      key: r,
      path: a.attribute
    });
  }, e)), n.includes("dynamicZones") && i.push(Ue(Ss, e)), n.includes("morphRelations") && i.push(Ue(Ts, e)), n.includes("passwords") && i.push(Ue(ki, e)), n.includes("private") && i.push(Ue(or, e)), n.includes("nonScalarEmptyKeys") && i.push(Ue(({ key: r, attribute: o, value: a, path: s }) => {
    [
      ti,
      ni
    ].includes(r) || !xn(o) && Ze(a) && se({
      key: r,
      path: s.attribute
    });
  }, e)), i.length === 0 ? t : Se(...i)(t);
}), xf = Lt(async (e, t) => Os(e, t, Bi)), Hi = [
  "scalarAttributes",
  "privateFields",
  "passwordFields"
], Cs = Lt(async (e, t, n) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultValidateFields");
  const i = [];
  return n.includes("scalarAttributes") && i.push(Wt(({ key: r, attribute: o, path: a }) => {
    [
      ti,
      ni
    ].includes(r) || (Y(o) || !xn(o)) && se({
      key: r,
      path: a.attribute
    });
  }, e)), n.includes("privateFields") && i.push(Wt(or, e)), n.includes("passwordFields") && i.push(Wt(ki, e)), i.length === 0 ? t : Se(...i)(t);
}), Pf = Lt(async (e, t) => Cs(e, t, Hi)), Rf = [
  "nonAttributesOperators",
  "private"
], xs = Lt(async (e, t, n) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultValidatePopulate");
  const i = [];
  return i.push(Rt(async ({ key: r, path: o, value: a, schema: s, attribute: u, getModel: c, parent: l }, { set: f }) => {
    if (!l?.attribute && u) {
      [
        "relation",
        "dynamiczone",
        "component",
        "media"
      ].includes(u.type) || se({
        key: r,
        path: o.raw
      });
      return;
    }
    if (r === "on") {
      if (!Ne(a))
        return se({
          key: r,
          path: o.raw
        });
      const d = Object.keys(a);
      for (const p of d)
        c(p) || se({
          key: p,
          path: `${o.raw}.${p}`
        });
      return;
    }
    if (!(r === "" && a === "*")) {
      if (r === "count")
        try {
          Yt({
            type: "boolean",
            value: a
          });
          return;
        } catch {
          se({
            key: r,
            path: o.attribute
          });
        }
      try {
        Yt({
          type: "boolean",
          value: r
        });
        return;
      } catch {
      }
      if (r === "sort") {
        f(r, await Os({
          schema: s,
          getModel: c
        }, a, n?.sort || Bi));
        return;
      }
      if (r === "filters") {
        f(r, await As({
          schema: s,
          getModel: c
        }, a, n?.filters || Ui));
        return;
      }
      if (r === "fields") {
        f(r, await Cs({
          schema: s,
          getModel: c
        }, a, n?.fields || Hi));
        return;
      }
      if (r === "populate") {
        f(r, await xs(
          {
            schema: s,
            getModel: c,
            parent: {
              key: r,
              path: o,
              schema: s,
              attribute: u
            },
            path: o
          },
          a,
          n
          // pass down the same includes object
        ));
        return;
      }
      n?.populate?.includes("nonAttributesOperators") && se({
        key: r,
        path: o.attribute
      });
    }
  }, e)), n?.populate?.includes("private") && i.push(Rt(or, e)), i.length === 0 ? t : Se(...i)(t);
}), $f = Lt(async (e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultValidatePopulate");
  return xs(e, t, {
    filters: Ui,
    sort: Bi,
    fields: Hi,
    populate: Rf
  });
}), $b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FIELDS_TRAVERSALS: Hi,
  FILTER_TRAVERSALS: Ui,
  POPULATE_TRAVERSALS: Rf,
  SORT_TRAVERSALS: Bi,
  defaultValidateFields: Pf,
  defaultValidateFilters: Cf,
  defaultValidatePopulate: $f,
  defaultValidateSort: xf,
  validateFields: Cs,
  validateFilters: As,
  validatePopulate: xs,
  validateSort: Os
}, Symbol.toStringTag, { value: "Module" })), { ID_ATTRIBUTE: zu, DOC_ID_ATTRIBUTE: Ku } = Je, Ib = (e) => {
  const { getModel: t } = e || {}, n = async (u, c, { auth: l } = {}) => {
    if (!c)
      throw new Error("Missing schema in validateInput");
    if (Oe(u)) {
      await Promise.all(u.map((p) => n(p, c, {
        auth: l
      })));
      return;
    }
    const f = $i(c), d = [
      (p) => (Ne(p) && (zu in p && se({
        key: zu
      }), Ku in p && se({
        key: Ku
      })), p),
      // non-writable attributes
      _t(Sf(f), {
        schema: c,
        getModel: t
      }),
      // unrecognized attributes
      _t(Of, {
        schema: c,
        getModel: t
      })
    ];
    l && d.push(_t(zn(l), {
      schema: c,
      getModel: t
    })), e?.validators?.input?.forEach((p) => d.push(p(c)));
    try {
      await Se(...d)(u);
    } catch (p) {
      throw p instanceof yt && (p.details.source = "body"), p;
    }
  }, i = async (u, c, { auth: l } = {}) => {
    if (!c)
      throw new Error("Missing schema in validateQuery");
    const { filters: f, sort: d, fields: p, populate: h } = u;
    f && await r(f, c, {
      auth: l
    }), d && await o(d, c, {
      auth: l
    }), p && await a(p, c), h && h !== "*" && await s(h, c);
  }, r = async (u, c, { auth: l } = {}) => {
    if (!c)
      throw new Error("Missing schema in validateFilters");
    if (Oe(u)) {
      await Promise.all(u.map((d) => r(d, c, {
        auth: l
      })));
      return;
    }
    const f = [
      Cf({
        schema: c,
        getModel: t
      })
    ];
    l && f.push(qe(zn(l), {
      schema: c,
      getModel: t
    }));
    try {
      await Se(...f)(u);
    } catch (d) {
      throw d instanceof yt && (d.details.source = "query", d.details.param = "filters"), d;
    }
  }, o = async (u, c, { auth: l } = {}) => {
    if (!c)
      throw new Error("Missing schema in validateSort");
    const f = [
      xf({
        schema: c,
        getModel: t
      })
    ];
    l && f.push(Ue(zn(l), {
      schema: c,
      getModel: t
    }));
    try {
      await Se(...f)(u);
    } catch (d) {
      throw d instanceof yt && (d.details.source = "query", d.details.param = "sort"), d;
    }
  }, a = async (u, c) => {
    if (!c)
      throw new Error("Missing schema in validateFields");
    const l = [
      Pf({
        schema: c,
        getModel: t
      })
    ];
    try {
      await Se(...l)(u);
    } catch (f) {
      throw f instanceof yt && (f.details.source = "query", f.details.param = "fields"), f;
    }
  }, s = async (u, c, { auth: l } = {}) => {
    if (!c)
      throw new Error("Missing schema in sanitizePopulate");
    const f = [
      $f({
        schema: c,
        getModel: t
      })
    ];
    l && f.push(Rt(zn(l), {
      schema: c,
      getModel: t
    }));
    try {
      await Se(...f)(u);
    } catch (d) {
      throw d instanceof yt && (d.details.source = "query", d.details.param = "populate"), d;
    }
  };
  return {
    input: n,
    query: i,
    filters: r,
    sort: o,
    fields: a,
    populate: s
  };
}, Nb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAPIValidators: Ib,
  validators: $b,
  visitors: Rb
}, Symbol.toStringTag, { value: "Module" })), Fb = {
  offset: {
    start: 0,
    limit: 10
  },
  page: {
    page: 1,
    pageSize: 10
  }
}, Db = [
  "start",
  "limit",
  "page",
  "pageSize"
], Mb = (e, t = -1) => t === -1 || e < t ? e : t, Lb = ({ start: e, limit: t }) => ({
  start: Math.max(e, 0),
  limit: t === -1 ? t : Math.max(t, 1)
}), jb = (e = -1) => ({ start: t, limit: n }) => ({
  start: t,
  limit: Mb(n, e)
}), kb = (e, t = -1) => ({
  ...e,
  limit: e.limit === -1 ? t : e.limit
}), Ub = (e, { defaults: t = {}, maxLimit: n = -1 } = {}) => {
  const i = Dn(Fb, t), r = !Y(e.page) || !Y(e.pageSize), o = !Y(e.start) || !Y(e.limit), a = La(Lb, jb(n));
  if (!r && !o)
    return Dn(e, a(i.offset));
  if (r && o)
    throw new Vn("Cannot use both page & offset pagination in the same query");
  const s = {
    start: 0,
    limit: 0
  };
  if (o) {
    const { start: c, limit: l } = Dn(i.offset, e);
    Object.assign(s, {
      start: c,
      limit: l
    });
  }
  if (r) {
    const { page: c, pageSize: l } = Dn(i.page, {
      ...e,
      pageSize: Math.max(1, e.pageSize ?? 0)
    });
    Object.assign(s, {
      start: (c - 1) * l,
      limit: l
    });
  }
  return Object.assign(s, kb(s, n)), La(
    // Remove pagination attributes
    jr(Db),
    // Merge the object with the new pagination + ensure minimum & maximum values
    Dn(a(s))
  )(e);
}, Bb = (e, t) => {
  if (!Y(e.page)) {
    const n = e.page, i = e.pageSize ?? t;
    return {
      page: n,
      pageSize: i,
      pageCount: i > 0 ? Math.ceil(t / i) : 0,
      total: t
    };
  }
  if (!Y(e.start)) {
    const n = e.start, i = e.limit ?? t;
    return {
      page: Math.floor(n / i) + 1,
      pageSize: i,
      pageCount: i > 0 ? Math.ceil(t / i) : 0,
      total: t
    };
  }
  return {
    ...e,
    page: 1,
    pageSize: 10,
    pageCount: 1,
    total: t
  };
}, Hb = (e, t) => {
  if (!Y(e.page)) {
    const n = e.pageSize ?? t;
    return {
      start: (e.page - 1) * n,
      limit: n,
      total: t
    };
  }
  if (!Y(e.start)) {
    const n = e.start, i = e.limit ?? t;
    return {
      start: n,
      limit: i,
      total: t
    };
  }
  return {
    ...e,
    start: 0,
    limit: 10,
    total: t
  };
}, qb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  transformOffsetPaginationInfo: Hb,
  transformPagedPaginationInfo: Bb,
  withDefaultPagination: Ub
}, Symbol.toStringTag, { value: "Module" }));
var In = { exports: {} }, Nn = { exports: {} }, pa, Qu;
function Gb() {
  if (Qu) return pa;
  Qu = 1, pa = i, i.sync = r;
  var e = Ft;
  function t(o, a) {
    var s = a.pathExt !== void 0 ? a.pathExt : process.env.PATHEXT;
    if (!s || (s = s.split(";"), s.indexOf("") !== -1))
      return !0;
    for (var u = 0; u < s.length; u++) {
      var c = s[u].toLowerCase();
      if (c && o.substr(-c.length).toLowerCase() === c)
        return !0;
    }
    return !1;
  }
  function n(o, a, s) {
    return !o.isSymbolicLink() && !o.isFile() ? !1 : t(a, s);
  }
  function i(o, a, s) {
    e.stat(o, function(u, c) {
      s(u, u ? !1 : n(c, o, a));
    });
  }
  function r(o, a) {
    return n(e.statSync(o), o, a);
  }
  return pa;
}
var ha, Vu;
function Yb() {
  if (Vu) return ha;
  Vu = 1, ha = t, t.sync = n;
  var e = Ft;
  function t(o, a, s) {
    e.stat(o, function(u, c) {
      s(u, u ? !1 : i(c, a));
    });
  }
  function n(o, a) {
    return i(e.statSync(o), a);
  }
  function i(o, a) {
    return o.isFile() && r(o, a);
  }
  function r(o, a) {
    var s = o.mode, u = o.uid, c = o.gid, l = a.uid !== void 0 ? a.uid : process.getuid && process.getuid(), f = a.gid !== void 0 ? a.gid : process.getgid && process.getgid(), d = parseInt("100", 8), p = parseInt("010", 8), h = parseInt("001", 8), m = d | p, g = s & h || s & p && c === f || s & d && u === l || s & m && l === 0;
    return g;
  }
  return ha;
}
var ri;
process.platform === "win32" || F.TESTING_WINDOWS ? ri = Gb() : ri = Yb();
var Wb = Ps;
Ps.sync = zb;
function Ps(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), !n) {
    if (typeof Promise != "function")
      throw new TypeError("callback not provided");
    return new Promise(function(i, r) {
      Ps(e, t || {}, function(o, a) {
        o ? r(o) : i(a);
      });
    });
  }
  ri(e, t || {}, function(i, r) {
    i && (i.code === "EACCES" || t && t.ignoreErrors) && (i = null, r = !1), n(i, r);
  });
}
function zb(e, t) {
  try {
    return ri.sync(e, t || {});
  } catch (n) {
    if (t && t.ignoreErrors || n.code === "EACCES")
      return !1;
    throw n;
  }
}
const dn = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", If = Me, Kb = dn ? ";" : ":", Nf = Wb, Ff = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), Df = (e, t) => {
  const n = t.colon || Kb, i = e.match(/\//) || dn && e.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...dn ? [process.cwd()] : [],
    ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(n)
  ], r = dn ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = dn ? r.split(n) : [""];
  return dn && e.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
    pathEnv: i,
    pathExt: o,
    pathExtExe: r
  };
}, Mf = (e, t, n) => {
  typeof t == "function" && (n = t, t = {}), t || (t = {});
  const { pathEnv: i, pathExt: r, pathExtExe: o } = Df(e, t), a = [], s = (c) => new Promise((l, f) => {
    if (c === i.length)
      return t.all && a.length ? l(a) : f(Ff(e));
    const d = i[c], p = /^".*"$/.test(d) ? d.slice(1, -1) : d, h = If.join(p, e), m = !p && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + h : h;
    l(u(m, c, 0));
  }), u = (c, l, f) => new Promise((d, p) => {
    if (f === r.length)
      return d(s(l + 1));
    const h = r[f];
    Nf(c + h, { pathExt: o }, (m, g) => {
      if (!m && g)
        if (t.all)
          a.push(c + h);
        else
          return d(c + h);
      return d(u(c, l, f + 1));
    });
  });
  return n ? s(0).then((c) => n(null, c), n) : s(0);
}, Qb = (e, t) => {
  t = t || {};
  const { pathEnv: n, pathExt: i, pathExtExe: r } = Df(e, t), o = [];
  for (let a = 0; a < n.length; a++) {
    const s = n[a], u = /^".*"$/.test(s) ? s.slice(1, -1) : s, c = If.join(u, e), l = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + c : c;
    for (let f = 0; f < i.length; f++) {
      const d = l + i[f];
      try {
        if (Nf.sync(d, { pathExt: r }))
          if (t.all)
            o.push(d);
          else
            return d;
      } catch {
      }
    }
  }
  if (t.all && o.length)
    return o;
  if (t.nothrow)
    return null;
  throw Ff(e);
};
var Vb = Mf;
Mf.sync = Qb;
var Rs = { exports: {} };
const Lf = (e = {}) => {
  const t = e.env || process.env;
  return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((i) => i.toUpperCase() === "PATH") || "Path";
};
Rs.exports = Lf;
Rs.exports.default = Lf;
var jf = Rs.exports;
const Xu = Me, Xb = Vb, Zb = jf;
function Zu(e, t) {
  const n = e.options.env || process.env, i = process.cwd(), r = e.options.cwd != null, o = r && process.chdir !== void 0 && !process.chdir.disabled;
  if (o)
    try {
      process.chdir(e.options.cwd);
    } catch {
    }
  let a;
  try {
    a = Xb.sync(e.command, {
      path: n[Zb({ env: n })],
      pathExt: t ? Xu.delimiter : void 0
    });
  } catch {
  } finally {
    o && process.chdir(i);
  }
  return a && (a = Xu.resolve(r ? e.options.cwd : "", a)), a;
}
function Jb(e) {
  return Zu(e) || Zu(e, !0);
}
var e_ = Jb, $s = {};
const ao = /([()\][%!^"`<>&|;, *?])/g;
function t_(e) {
  return e = e.replace(ao, "^$1"), e;
}
function n_(e, t) {
  return e = `${e}`, e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), e = e.replace(/(?=(\\+?)?)\1$/, "$1$1"), e = `"${e}"`, e = e.replace(ao, "^$1"), t && (e = e.replace(ao, "^$1")), e;
}
$s.command = t_;
$s.argument = n_;
var r_ = /^#!(.*)/;
const i_ = r_;
var a_ = (e = "") => {
  const t = e.match(i_);
  if (!t)
    return null;
  const [n, i] = t[0].replace(/#! ?/, "").split(" "), r = n.split("/").pop();
  return r === "env" ? i : i ? `${r} ${i}` : r;
};
const ma = Ft, o_ = a_;
function s_(e) {
  const n = Buffer.alloc(150);
  let i;
  try {
    i = ma.openSync(e, "r"), ma.readSync(i, n, 0, 150, 0), ma.closeSync(i);
  } catch {
  }
  return o_(n.toString());
}
var u_ = s_;
const c_ = Me, Ju = e_, ec = $s, l_ = u_, f_ = process.platform === "win32", d_ = /\.(?:com|exe)$/i, p_ = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function h_(e) {
  e.file = Ju(e);
  const t = e.file && l_(e.file);
  return t ? (e.args.unshift(e.file), e.command = t, Ju(e)) : e.file;
}
function m_(e) {
  if (!f_)
    return e;
  const t = h_(e), n = !d_.test(t);
  if (e.options.forceShell || n) {
    const i = p_.test(t);
    e.command = c_.normalize(e.command), e.command = ec.command(e.command), e.args = e.args.map((o) => ec.argument(o, i));
    const r = [e.command].concat(e.args).join(" ");
    e.args = ["/d", "/s", "/c", `"${r}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
  }
  return e;
}
function g_(e, t, n) {
  t && !Array.isArray(t) && (n = t, t = null), t = t ? t.slice(0) : [], n = Object.assign({}, n);
  const i = {
    command: e,
    args: t,
    options: n,
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return n.shell ? i : m_(i);
}
var y_ = g_;
const Is = process.platform === "win32";
function Ns(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}
function v_(e, t) {
  if (!Is)
    return;
  const n = e.emit;
  e.emit = function(i, r) {
    if (i === "exit") {
      const o = kf(r, t);
      if (o)
        return n.call(e, "error", o);
    }
    return n.apply(e, arguments);
  };
}
function kf(e, t) {
  return Is && e === 1 && !t.file ? Ns(t.original, "spawn") : null;
}
function w_(e, t) {
  return Is && e === 1 && !t.file ? Ns(t.original, "spawnSync") : null;
}
var b_ = {
  hookChildProcess: v_,
  verifyENOENT: kf,
  verifyENOENTSync: w_,
  notFoundError: Ns
};
const Uf = Ur, Fs = y_, Ds = b_;
function Bf(e, t, n) {
  const i = Fs(e, t, n), r = Uf.spawn(i.command, i.args, i.options);
  return Ds.hookChildProcess(r, i), r;
}
function __(e, t, n) {
  const i = Fs(e, t, n), r = Uf.spawnSync(i.command, i.args, i.options);
  return r.error = r.error || Ds.verifyENOENTSync(r.status, i), r;
}
Nn.exports = Bf;
Nn.exports.spawn = Bf;
Nn.exports.sync = __;
Nn.exports._parse = Fs;
Nn.exports._enoent = Ds;
var E_ = Nn.exports, T_ = (e) => {
  const t = typeof e == "string" ? `
` : 10, n = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === n && (e = e.slice(0, e.length - 1)), e;
}, Ms = { exports: {} };
Ms.exports;
(function(e) {
  const t = Me, n = jf, i = (r) => {
    r = {
      cwd: process.cwd(),
      path: process.env[n()],
      execPath: process.execPath,
      ...r
    };
    let o, a = t.resolve(r.cwd);
    const s = [];
    for (; o !== a; )
      s.push(t.join(a, "node_modules/.bin")), o = a, a = t.resolve(a, "..");
    const u = t.resolve(r.cwd, r.execPath, "..");
    return s.push(u), s.concat(r.path).join(t.delimiter);
  };
  e.exports = i, e.exports.default = i, e.exports.env = (r) => {
    r = {
      env: process.env,
      ...r
    };
    const o = { ...r.env }, a = n({ env: o });
    return r.path = o[a], o[a] = e.exports(r), o;
  };
})(Ms);
var S_ = Ms.exports, qi = { exports: {} }, Ls = { exports: {} };
const Hf = (e, t) => {
  for (const n of Reflect.ownKeys(t))
    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
  return e;
};
Ls.exports = Hf;
Ls.exports.default = Hf;
var A_ = Ls.exports;
const O_ = A_, ii = /* @__PURE__ */ new WeakMap(), qf = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, i = 0;
  const r = e.displayName || e.name || "<anonymous>", o = function(...a) {
    if (ii.set(o, ++i), i === 1)
      n = e.apply(this, a), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${r}\` can only be called once`);
    return n;
  };
  return O_(o, e), ii.set(o, i), o;
};
qi.exports = qf;
qi.exports.default = qf;
qi.exports.callCount = (e) => {
  if (!ii.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return ii.get(e);
};
var C_ = qi.exports, En = {}, Gi = {}, Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.SIGNALS = void 0;
const x_ = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];
Yi.SIGNALS = x_;
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.SIGRTMAX = Xt.getRealtimeSignals = void 0;
const P_ = function() {
  const e = Yf - Gf + 1;
  return Array.from({ length: e }, R_);
};
Xt.getRealtimeSignals = P_;
const R_ = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: Gf + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, Gf = 34, Yf = 64;
Xt.SIGRTMAX = Yf;
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.getSignals = void 0;
var $_ = yi, I_ = Yi, N_ = Xt;
const F_ = function() {
  const e = (0, N_.getRealtimeSignals)();
  return [...I_.SIGNALS, ...e].map(D_);
};
Gi.getSignals = F_;
const D_ = function({
  name: e,
  number: t,
  description: n,
  action: i,
  forced: r = !1,
  standard: o
}) {
  const {
    signals: { [e]: a }
  } = $_.constants, s = a !== void 0;
  return { name: e, number: s ? a : t, description: n, supported: s, action: i, forced: r, standard: o };
};
Object.defineProperty(En, "__esModule", { value: !0 });
En.signalsByNumber = En.signalsByName = void 0;
var M_ = yi, Wf = Gi, L_ = Xt;
const j_ = function() {
  return (0, Wf.getSignals)().reduce(k_, {});
}, k_ = function(e, { name: t, number: n, description: i, supported: r, action: o, forced: a, standard: s }) {
  return {
    ...e,
    [t]: { name: t, number: n, description: i, supported: r, action: o, forced: a, standard: s }
  };
}, U_ = j_();
En.signalsByName = U_;
const B_ = function() {
  const e = (0, Wf.getSignals)(), t = L_.SIGRTMAX + 1, n = Array.from({ length: t }, (i, r) => H_(r, e));
  return Object.assign({}, ...n);
}, H_ = function(e, t) {
  const n = q_(e, t);
  if (n === void 0)
    return {};
  const { name: i, description: r, supported: o, action: a, forced: s, standard: u } = n;
  return {
    [e]: {
      name: i,
      number: e,
      description: r,
      supported: o,
      action: a,
      forced: s,
      standard: u
    }
  };
}, q_ = function(e, t) {
  const n = t.find(({ name: i }) => M_.constants.signals[i] === e);
  return n !== void 0 ? n : t.find((i) => i.number === e);
}, G_ = B_();
En.signalsByNumber = G_;
const { signalsByName: Y_ } = En, W_ = ({ timedOut: e, timeout: t, errorCode: n, signal: i, signalDescription: r, exitCode: o, isCanceled: a }) => e ? `timed out after ${t} milliseconds` : a ? "was canceled" : n !== void 0 ? `failed with ${n}` : i !== void 0 ? `was killed with ${i} (${r})` : o !== void 0 ? `failed with exit code ${o}` : "failed", z_ = ({
  stdout: e,
  stderr: t,
  all: n,
  error: i,
  signal: r,
  exitCode: o,
  command: a,
  escapedCommand: s,
  timedOut: u,
  isCanceled: c,
  killed: l,
  parsed: { options: { timeout: f } }
}) => {
  o = o === null ? void 0 : o, r = r === null ? void 0 : r;
  const d = r === void 0 ? void 0 : Y_[r].description, p = i && i.code, m = `Command ${W_({ timedOut: u, timeout: f, errorCode: p, signal: r, signalDescription: d, exitCode: o, isCanceled: c })}: ${a}`, g = Object.prototype.toString.call(i) === "[object Error]", v = g ? `${m}
${i.message}` : m, w = [v, t, e].filter(Boolean).join(`
`);
  return g ? (i.originalMessage = i.message, i.message = w) : i = new Error(w), i.shortMessage = v, i.command = a, i.escapedCommand = s, i.exitCode = o, i.signal = r, i.signalDescription = d, i.stdout = e, i.stderr = t, n !== void 0 && (i.all = n), "bufferedData" in i && delete i.bufferedData, i.failed = !0, i.timedOut = !!u, i.isCanceled = c, i.killed = l && !u, i;
};
var K_ = z_, js = { exports: {} };
const Ir = ["stdin", "stdout", "stderr"], Q_ = (e) => Ir.some((t) => e[t] !== void 0), zf = (e) => {
  if (!e)
    return;
  const { stdio: t } = e;
  if (t === void 0)
    return Ir.map((i) => e[i]);
  if (Q_(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Ir.map((i) => `\`${i}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  const n = Math.max(t.length, Ir.length);
  return Array.from({ length: n }, (i, r) => t[r]);
};
js.exports = zf;
js.exports.node = (e) => {
  const t = zf(e);
  return t === "ipc" ? "ipc" : t === void 0 || typeof t == "string" ? [t, t, t, "ipc"] : t.includes("ipc") ? t : [...t, "ipc"];
};
var V_ = js.exports, pn = { exports: {} }, ga = { exports: {} }, tc;
function X_() {
  return tc || (tc = 1, function(e) {
    e.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && e.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && e.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  }(ga)), ga.exports;
}
var le = F.process;
const jt = function(e) {
  return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
};
if (!jt(le))
  pn.exports = function() {
    return function() {
    };
  };
else {
  var Z_ = ll, Hn = X_(), J_ = /^win/i.test(le.platform), Tr = ah;
  typeof Tr != "function" && (Tr = Tr.EventEmitter);
  var $e;
  le.__signal_exit_emitter__ ? $e = le.__signal_exit_emitter__ : ($e = le.__signal_exit_emitter__ = new Tr(), $e.count = 0, $e.emitted = {}), $e.infinite || ($e.setMaxListeners(1 / 0), $e.infinite = !0), pn.exports = function(e, t) {
    if (!jt(F.process))
      return function() {
      };
    Z_.equal(typeof e, "function", "a callback must be provided for exit handler"), qn === !1 && nc();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    var i = function() {
      $e.removeListener(n, e), $e.listeners("exit").length === 0 && $e.listeners("afterexit").length === 0 && ya();
    };
    return $e.on(n, e), i;
  };
  var ya = function() {
    !qn || !jt(F.process) || (qn = !1, Hn.forEach(function(t) {
      try {
        le.removeListener(t, va[t]);
      } catch {
      }
    }), le.emit = wa, le.reallyExit = rc, $e.count -= 1);
  };
  pn.exports.unload = ya;
  var an = function(t, n, i) {
    $e.emitted[t] || ($e.emitted[t] = !0, $e.emit(t, n, i));
  }, va = {};
  Hn.forEach(function(e) {
    va[e] = function() {
      if (jt(F.process)) {
        var n = le.listeners(e);
        n.length === $e.count && (ya(), an("exit", null, e), an("afterexit", null, e), J_ && e === "SIGHUP" && (e = "SIGINT"), le.kill(le.pid, e));
      }
    };
  }), pn.exports.signals = function() {
    return Hn;
  };
  var qn = !1, nc = function() {
    qn || !jt(F.process) || (qn = !0, $e.count += 1, Hn = Hn.filter(function(t) {
      try {
        return le.on(t, va[t]), !0;
      } catch {
        return !1;
      }
    }), le.emit = tE, le.reallyExit = eE);
  };
  pn.exports.load = nc;
  var rc = le.reallyExit, eE = function(t) {
    jt(F.process) && (le.exitCode = t || /* istanbul ignore next */
    0, an("exit", le.exitCode, null), an("afterexit", le.exitCode, null), rc.call(le, le.exitCode));
  }, wa = le.emit, tE = function(t, n) {
    if (t === "exit" && jt(F.process)) {
      n !== void 0 && (le.exitCode = n);
      var i = wa.apply(this, arguments);
      return an("exit", le.exitCode, null), an("afterexit", le.exitCode, null), i;
    } else
      return wa.apply(this, arguments);
  };
}
var nE = pn.exports;
const rE = yi, iE = nE, aE = 1e3 * 5, oE = (e, t = "SIGTERM", n = {}) => {
  const i = e(t);
  return sE(e, t, n, i), i;
}, sE = (e, t, n, i) => {
  if (!uE(t, n, i))
    return;
  const r = lE(n), o = setTimeout(() => {
    e("SIGKILL");
  }, r);
  o.unref && o.unref();
}, uE = (e, { forceKillAfterTimeout: t }, n) => cE(e) && t !== !1 && n, cE = (e) => e === rE.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", lE = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return aE;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, fE = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, dE = (e, t, n) => {
  e.kill(t), n(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, pE = (e, { timeout: t, killSignal: n = "SIGTERM" }, i) => {
  if (t === 0 || t === void 0)
    return i;
  let r;
  const o = new Promise((s, u) => {
    r = setTimeout(() => {
      dE(e, n, u);
    }, t);
  }), a = i.finally(() => {
    clearTimeout(r);
  });
  return Promise.race([o, a]);
}, hE = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, mE = async (e, { cleanup: t, detached: n }, i) => {
  if (!t || n)
    return i;
  const r = iE(() => {
    e.kill();
  });
  return i.finally(() => {
    r();
  });
};
var gE = {
  spawnedKill: oE,
  spawnedCancel: fE,
  setupTimeout: pE,
  validateTimeout: hE,
  setExitHandler: mE
};
const ct = (e) => e !== null && typeof e == "object" && typeof e.pipe == "function";
ct.writable = (e) => ct(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
ct.readable = (e) => ct(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
ct.duplex = (e) => ct.writable(e) && ct.readable(e);
ct.transform = (e) => ct.duplex(e) && typeof e._transform == "function";
var yE = ct, sr = { exports: {} };
const { PassThrough: vE } = vi;
var wE = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const i = n === "buffer";
  let r = !1;
  t ? r = !(n || i) : n = n || "utf8", i && (n = null);
  const o = new vE({ objectMode: r });
  n && o.setEncoding(n);
  let a = 0;
  const s = [];
  return o.on("data", (u) => {
    s.push(u), r ? a = s.length : a += u.length;
  }), o.getBufferedValue = () => t ? s : i ? Buffer.concat(s, a) : s.join(""), o.getBufferedLength = () => a, o;
};
const { constants: bE } = oh, _E = vi, { promisify: EE } = Jt, TE = wE, SE = EE(_E.pipeline);
class Kf extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function ks(e, t) {
  if (!e)
    throw new Error("Expected a stream");
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: n } = t, i = TE(t);
  return await new Promise((r, o) => {
    const a = (s) => {
      s && i.getBufferedLength() <= bE.MAX_LENGTH && (s.bufferedData = i.getBufferedValue()), o(s);
    };
    (async () => {
      try {
        await SE(e, i), r();
      } catch (s) {
        a(s);
      }
    })(), i.on("data", () => {
      i.getBufferedLength() > n && a(new Kf());
    });
  }), i.getBufferedValue();
}
sr.exports = ks;
sr.exports.buffer = (e, t) => ks(e, { ...t, encoding: "buffer" });
sr.exports.array = (e, t) => ks(e, { ...t, array: !0 });
sr.exports.MaxBufferError = Kf;
var AE = sr.exports;
const { PassThrough: OE } = vi;
var CE = function() {
  var e = [], t = new OE({ objectMode: !0 });
  return t.setMaxListeners(0), t.add = n, t.isEmpty = i, t.on("unpipe", r), Array.prototype.slice.call(arguments).forEach(n), t;
  function n(o) {
    return Array.isArray(o) ? (o.forEach(n), this) : (e.push(o), o.once("end", r.bind(null, o)), o.once("error", t.emit.bind(t, "error")), o.pipe(t, { end: !1 }), this);
  }
  function i() {
    return e.length == 0;
  }
  function r(o) {
    e = e.filter(function(a) {
      return a !== o;
    }), !e.length && t.readable && t.end();
  }
};
const Qf = yE, ic = AE, xE = CE, PE = (e, t) => {
  t === void 0 || e.stdin === void 0 || (Qf(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, RE = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  const n = xE();
  return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
}, ba = async (e, t) => {
  if (e) {
    e.destroy();
    try {
      return await t;
    } catch (n) {
      return n.bufferedData;
    }
  }
}, _a = (e, { encoding: t, buffer: n, maxBuffer: i }) => {
  if (!(!e || !n))
    return t ? ic(e, { encoding: t, maxBuffer: i }) : ic.buffer(e, { maxBuffer: i });
}, $E = async ({ stdout: e, stderr: t, all: n }, { encoding: i, buffer: r, maxBuffer: o }, a) => {
  const s = _a(e, { encoding: i, buffer: r, maxBuffer: o }), u = _a(t, { encoding: i, buffer: r, maxBuffer: o }), c = _a(n, { encoding: i, buffer: r, maxBuffer: o * 2 });
  try {
    return await Promise.all([a, s, u, c]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      ba(e, s),
      ba(t, u),
      ba(n, c)
    ]);
  }
}, IE = ({ input: e }) => {
  if (Qf(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
};
var NE = {
  handleInput: PE,
  makeAllStream: RE,
  getSpawnedResult: $E,
  validateInputSync: IE
};
const FE = (async () => {
})().constructor.prototype, DE = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(FE, e)
]), ME = (e, t) => {
  for (const [n, i] of DE) {
    const r = typeof t == "function" ? (...o) => Reflect.apply(i.value, t(), o) : i.value.bind(t);
    Reflect.defineProperty(e, n, { ...i, value: r });
  }
  return e;
}, LE = (e) => new Promise((t, n) => {
  e.on("exit", (i, r) => {
    t({ exitCode: i, signal: r });
  }), e.on("error", (i) => {
    n(i);
  }), e.stdin && e.stdin.on("error", (i) => {
    n(i);
  });
});
var jE = {
  mergePromise: ME,
  getSpawnedPromise: LE
};
const Vf = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], kE = /^[\w.-]+$/, UE = /"/g, BE = (e) => typeof e != "string" || kE.test(e) ? e : `"${e.replace(UE, '\\"')}"`, HE = (e, t) => Vf(e, t).join(" "), qE = (e, t) => Vf(e, t).map((n) => BE(n)).join(" "), GE = / +/g, YE = (e) => {
  const t = [];
  for (const n of e.trim().split(GE)) {
    const i = t[t.length - 1];
    i && i.endsWith("\\") ? t[t.length - 1] = `${i.slice(0, -1)} ${n}` : t.push(n);
  }
  return t;
};
var WE = {
  joinCommand: HE,
  getEscapedCommand: qE,
  parseCommand: YE
};
const zE = Me, oo = Ur, KE = E_, QE = T_, VE = S_, XE = C_, ai = K_, Xf = V_, { spawnedKill: ZE, spawnedCancel: JE, setupTimeout: eT, validateTimeout: tT, setExitHandler: nT } = gE, { handleInput: rT, getSpawnedResult: iT, makeAllStream: aT, validateInputSync: oT } = NE, { mergePromise: ac, getSpawnedPromise: sT } = jE, { joinCommand: Zf, parseCommand: Jf, getEscapedCommand: ed } = WE, uT = 1e3 * 1e3 * 100, cT = ({ env: e, extendEnv: t, preferLocal: n, localDir: i, execPath: r }) => {
  const o = t ? { ...process.env, ...e } : e;
  return n ? VE.env({ env: o, cwd: i, execPath: r }) : o;
}, td = (e, t, n = {}) => {
  const i = KE._parse(e, t, n);
  return e = i.command, t = i.args, n = i.options, n = {
    maxBuffer: uT,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: n.cwd || process.cwd(),
    execPath: process.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    ...n
  }, n.env = cT(n), n.stdio = Xf(n), process.platform === "win32" && zE.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: n, parsed: i };
}, Xn = (e, t, n) => typeof t != "string" && !Buffer.isBuffer(t) ? n === void 0 ? void 0 : "" : e.stripFinalNewline ? QE(t) : t, Wi = (e, t, n) => {
  const i = td(e, t, n), r = Zf(e, t), o = ed(e, t);
  tT(i.options);
  let a;
  try {
    a = oo.spawn(i.file, i.args, i.options);
  } catch (p) {
    const h = new oo.ChildProcess(), m = Promise.reject(ai({
      error: p,
      stdout: "",
      stderr: "",
      all: "",
      command: r,
      escapedCommand: o,
      parsed: i,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return ac(h, m);
  }
  const s = sT(a), u = eT(a, i.options, s), c = nT(a, i.options, u), l = { isCanceled: !1 };
  a.kill = ZE.bind(null, a.kill.bind(a)), a.cancel = JE.bind(null, a, l);
  const d = XE(async () => {
    const [{ error: p, exitCode: h, signal: m, timedOut: g }, v, w, A] = await iT(a, i.options, c), C = Xn(i.options, v), x = Xn(i.options, w), b = Xn(i.options, A);
    if (p || h !== 0 || m !== null) {
      const O = ai({
        error: p,
        exitCode: h,
        signal: m,
        stdout: C,
        stderr: x,
        all: b,
        command: r,
        escapedCommand: o,
        parsed: i,
        timedOut: g,
        isCanceled: l.isCanceled,
        killed: a.killed
      });
      if (!i.options.reject)
        return O;
      throw O;
    }
    return {
      command: r,
      escapedCommand: o,
      exitCode: 0,
      stdout: C,
      stderr: x,
      all: b,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return rT(a, i.options.input), a.all = aT(a, i.options), ac(a, d);
};
In.exports = Wi;
In.exports.sync = (e, t, n) => {
  const i = td(e, t, n), r = Zf(e, t), o = ed(e, t);
  oT(i.options);
  let a;
  try {
    a = oo.spawnSync(i.file, i.args, i.options);
  } catch (c) {
    throw ai({
      error: c,
      stdout: "",
      stderr: "",
      all: "",
      command: r,
      escapedCommand: o,
      parsed: i,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  const s = Xn(i.options, a.stdout, a.error), u = Xn(i.options, a.stderr, a.error);
  if (a.error || a.status !== 0 || a.signal !== null) {
    const c = ai({
      stdout: s,
      stderr: u,
      error: a.error,
      signal: a.signal,
      exitCode: a.status,
      command: r,
      escapedCommand: o,
      parsed: i,
      timedOut: a.error && a.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: a.signal !== null
    });
    if (!i.options.reject)
      return c;
    throw c;
  }
  return {
    command: r,
    escapedCommand: o,
    exitCode: 0,
    stdout: s,
    stderr: u,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
};
In.exports.command = (e, t) => {
  const [n, ...i] = Jf(e);
  return Wi(n, i, t);
};
In.exports.commandSync = (e, t) => {
  const [n, ...i] = Jf(e);
  return Wi.sync(n, i, t);
};
In.exports.node = (e, t, n = {}) => {
  t && !Array.isArray(t) && typeof t == "object" && (n = t, t = []);
  const i = Xf.node(n), r = process.execArgv.filter((s) => !s.startsWith("--inspect")), {
    nodePath: o = process.execPath,
    nodeOptions: a = r
  } = n;
  return Wi(
    o,
    [
      ...a,
      e,
      ...Array.isArray(t) ? t : []
    ],
    {
      ...n,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio: i,
      shell: !1
    }
  );
};
var lT = In.exports;
const fT = /* @__PURE__ */ tr(lT);
var ze = {}, zi = { exports: {} }, nd = { exports: {} }, Us = { exports: {} }, Bs = { exports: {} }, Hs = { exports: {} }, qs = { exports: {} };
const rd = (e, ...t) => new Promise((n) => {
  n(e(...t));
});
qs.exports = rd;
qs.exports.default = rd;
var dT = qs.exports;
const pT = dT, id = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let n = 0;
  const i = () => {
    n--, t.length > 0 && t.shift()();
  }, r = (s, u, ...c) => {
    n++;
    const l = pT(s, ...c);
    u(l), l.then(i, i);
  }, o = (s, u, ...c) => {
    n < e ? r(s, u, ...c) : t.push(r.bind(null, s, u, ...c));
  }, a = (s, ...u) => new Promise((c) => o(s, c, ...u));
  return Object.defineProperties(a, {
    activeCount: {
      get: () => n
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), a;
};
Hs.exports = id;
Hs.exports.default = id;
var hT = Hs.exports;
const oc = hT;
let ad = class extends Error {
  constructor(t) {
    super(), this.value = t;
  }
};
const mT = async (e, t) => t(await e), gT = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new ad(t[0]);
  return !1;
}, od = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const i = oc(n.concurrency), r = [...e].map((a) => [a, i(mT, a, t)]), o = oc(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(r.map((a) => o(gT, a)));
  } catch (a) {
    if (a instanceof ad)
      return a.value;
    throw a;
  }
};
Bs.exports = od;
Bs.exports.default = od;
var yT = Bs.exports;
const sd = Me, oi = Ft, { promisify: ud } = Jt, vT = yT, wT = ud(oi.stat), bT = ud(oi.lstat), cd = {
  directory: "isDirectory",
  file: "isFile"
};
function ld({ type: e }) {
  if (!(e in cd))
    throw new Error(`Invalid type specified: ${e}`);
}
const fd = (e, t) => e === void 0 || t[cd[e]]();
Us.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, ld(t);
  const n = t.allowSymlinks ? wT : bT;
  return vT(e, async (i) => {
    try {
      const r = await n(sd.resolve(t.cwd, i));
      return fd(t.type, r);
    } catch {
      return !1;
    }
  }, t);
};
Us.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, ld(t);
  const n = t.allowSymlinks ? oi.statSync : oi.lstatSync;
  for (const i of e)
    try {
      const r = n(sd.resolve(t.cwd, i));
      if (fd(t.type, r))
        return i;
    } catch {
    }
};
var _T = Us.exports, Gs = { exports: {} };
const dd = Ft, { promisify: ET } = Jt, TT = ET(dd.access);
Gs.exports = async (e) => {
  try {
    return await TT(e), !0;
  } catch {
    return !1;
  }
};
Gs.exports.sync = (e) => {
  try {
    return dd.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Ki = Gs.exports;
(function(e) {
  const t = Me, n = _T, i = Ki, r = Symbol("findUp.stop");
  e.exports = async (o, a = {}) => {
    let s = t.resolve(a.cwd || "");
    const { root: u } = t.parse(s), c = [].concat(o), l = async (f) => {
      if (typeof o != "function")
        return n(c, f);
      const d = await o(f.cwd);
      return typeof d == "string" ? n([d], f) : d;
    };
    for (; ; ) {
      const f = await l({ ...a, cwd: s });
      if (f === r)
        return;
      if (f)
        return t.resolve(s, f);
      if (s === u)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (o, a = {}) => {
    let s = t.resolve(a.cwd || "");
    const { root: u } = t.parse(s), c = [].concat(o), l = (f) => {
      if (typeof o != "function")
        return n.sync(c, f);
      const d = o(f.cwd);
      return typeof d == "string" ? n.sync([d], f) : d;
    };
    for (; ; ) {
      const f = l({ ...a, cwd: s });
      if (f === r)
        return;
      if (f)
        return t.resolve(s, f);
      if (s === u)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = i, e.exports.sync.exists = i.sync, e.exports.stop = r;
})(nd);
var ST = nd.exports;
const pd = Me, hd = ST, md = async (e) => {
  const t = await hd("package.json", { cwd: e });
  return t && pd.dirname(t);
};
zi.exports = md;
zi.exports.default = md;
zi.exports.sync = (e) => {
  const t = hd.sync("package.json", { cwd: e });
  return t && pd.dirname(t);
};
var AT = zi.exports, Qi = {};
(function(e) {
  e.isInteger = (t) => typeof t == "number" ? Number.isInteger(t) : typeof t == "string" && t.trim() !== "" ? Number.isInteger(Number(t)) : !1, e.find = (t, n) => t.nodes.find((i) => i.type === n), e.exceedsLimit = (t, n, i = 1, r) => r === !1 || !e.isInteger(t) || !e.isInteger(n) ? !1 : (Number(n) - Number(t)) / Number(i) >= r, e.escapeNode = (t, n = 0, i) => {
    const r = t.nodes[n];
    r && (i && r.type === i || r.type === "open" || r.type === "close") && r.escaped !== !0 && (r.value = "\\" + r.value, r.escaped = !0);
  }, e.encloseBrace = (t) => t.type !== "brace" || t.commas >> 0 + t.ranges >> 0 ? !1 : (t.invalid = !0, !0), e.isInvalidBrace = (t) => t.type !== "brace" ? !1 : t.invalid === !0 || t.dollar ? !0 : !(t.commas >> 0 + t.ranges >> 0) || t.open !== !0 || t.close !== !0 ? (t.invalid = !0, !0) : !1, e.isOpenOrClose = (t) => t.type === "open" || t.type === "close" ? !0 : t.open === !0 || t.close === !0, e.reduce = (t) => t.reduce((n, i) => (i.type === "text" && n.push(i.value), i.type === "range" && (i.type = "text"), n), []), e.flatten = (...t) => {
    const n = [], i = (r) => {
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        if (Array.isArray(a)) {
          i(a);
          continue;
        }
        a !== void 0 && n.push(a);
      }
      return n;
    };
    return i(t), n;
  };
})(Qi);
const sc = Qi;
var Ys = (e, t = {}) => {
  const n = (i, r = {}) => {
    const o = t.escapeInvalid && sc.isInvalidBrace(r), a = i.invalid === !0 && t.escapeInvalid === !0;
    let s = "";
    if (i.value)
      return (o || a) && sc.isOpenOrClose(i) ? "\\" + i.value : i.value;
    if (i.value)
      return i.value;
    if (i.nodes)
      for (const u of i.nodes)
        s += n(u);
    return s;
  };
  return n(e);
};
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var OT = function(e) {
  return typeof e == "number" ? e - e === 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const uc = OT, zt = (e, t, n) => {
  if (uc(e) === !1)
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  if (t === void 0 || e === t)
    return String(e);
  if (uc(t) === !1)
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  let i = { relaxZeros: !0, ...n };
  typeof i.strictZeros == "boolean" && (i.relaxZeros = i.strictZeros === !1);
  let r = String(i.relaxZeros), o = String(i.shorthand), a = String(i.capture), s = String(i.wrap), u = e + ":" + t + "=" + r + o + a + s;
  if (zt.cache.hasOwnProperty(u))
    return zt.cache[u].result;
  let c = Math.min(e, t), l = Math.max(e, t);
  if (Math.abs(c - l) === 1) {
    let m = e + "|" + t;
    return i.capture ? `(${m})` : i.wrap === !1 ? m : `(?:${m})`;
  }
  let f = hc(e) || hc(t), d = { min: e, max: t, a: c, b: l }, p = [], h = [];
  if (f && (d.isPadded = f, d.maxLen = String(d.max).length), c < 0) {
    let m = l < 0 ? Math.abs(l) : 1;
    h = cc(m, Math.abs(c), d, i), c = d.a = 0;
  }
  return l >= 0 && (p = cc(c, l, d, i)), d.negatives = h, d.positives = p, d.result = CT(h, p), i.capture === !0 ? d.result = `(${d.result})` : i.wrap !== !1 && p.length + h.length > 1 && (d.result = `(?:${d.result})`), zt.cache[u] = d, d.result;
};
function CT(e, t, n) {
  let i = Ea(e, t, "-", !1) || [], r = Ea(t, e, "", !1) || [], o = Ea(e, t, "-?", !0) || [];
  return i.concat(o).concat(r).join("|");
}
function xT(e, t) {
  let n = 1, i = 1, r = fc(e, n), o = /* @__PURE__ */ new Set([t]);
  for (; e <= r && r <= t; )
    o.add(r), n += 1, r = fc(e, n);
  for (r = dc(t + 1, i) - 1; e < r && r <= t; )
    o.add(r), i += 1, r = dc(t + 1, i) - 1;
  return o = [...o], o.sort($T), o;
}
function PT(e, t, n) {
  if (e === t)
    return { pattern: e, count: [], digits: 0 };
  let i = RT(e, t), r = i.length, o = "", a = 0;
  for (let s = 0; s < r; s++) {
    let [u, c] = i[s];
    u === c ? o += u : u !== "0" || c !== "9" ? o += IT(u, c) : a++;
  }
  return a && (o += n.shorthand === !0 ? "\\d" : "[0-9]"), { pattern: o, count: [a], digits: r };
}
function cc(e, t, n, i) {
  let r = xT(e, t), o = [], a = e, s;
  for (let u = 0; u < r.length; u++) {
    let c = r[u], l = PT(String(a), String(c), i), f = "";
    if (!n.isPadded && s && s.pattern === l.pattern) {
      s.count.length > 1 && s.count.pop(), s.count.push(l.count[0]), s.string = s.pattern + pc(s.count), a = c + 1;
      continue;
    }
    n.isPadded && (f = NT(c, n, i)), l.string = f + l.pattern + pc(l.count), o.push(l), a = c + 1, s = l;
  }
  return o;
}
function Ea(e, t, n, i, r) {
  let o = [];
  for (let a of e) {
    let { string: s } = a;
    !i && !lc(t, "string", s) && o.push(n + s), i && lc(t, "string", s) && o.push(n + s);
  }
  return o;
}
function RT(e, t) {
  let n = [];
  for (let i = 0; i < e.length; i++) n.push([e[i], t[i]]);
  return n;
}
function $T(e, t) {
  return e > t ? 1 : t > e ? -1 : 0;
}
function lc(e, t, n) {
  return e.some((i) => i[t] === n);
}
function fc(e, t) {
  return Number(String(e).slice(0, -t) + "9".repeat(t));
}
function dc(e, t) {
  return e - e % Math.pow(10, t);
}
function pc(e) {
  let [t = 0, n = ""] = e;
  return n || t > 1 ? `{${t + (n ? "," + n : "")}}` : "";
}
function IT(e, t, n) {
  return `[${e}${t - e === 1 ? "" : "-"}${t}]`;
}
function hc(e) {
  return /^-?(0+)\d/.test(e);
}
function NT(e, t, n) {
  if (!t.isPadded)
    return e;
  let i = Math.abs(t.maxLen - String(e).length), r = n.relaxZeros !== !1;
  switch (i) {
    case 0:
      return "";
    case 1:
      return r ? "0?" : "0";
    case 2:
      return r ? "0{0,2}" : "00";
    default:
      return r ? `0{0,${i}}` : `0{${i}}`;
  }
}
zt.cache = {};
zt.clearCache = () => zt.cache = {};
var FT = zt;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const DT = Jt, gd = FT, mc = (e) => e !== null && typeof e == "object" && !Array.isArray(e), MT = (e) => (t) => e === !0 ? Number(t) : String(t), Ta = (e) => typeof e == "number" || typeof e == "string" && e !== "", Zn = (e) => Number.isInteger(+e), Sa = (e) => {
  let t = `${e}`, n = -1;
  if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
  for (; t[++n] === "0"; ) ;
  return n > 0;
}, LT = (e, t, n) => typeof e == "string" || typeof t == "string" ? !0 : n.stringify === !0, jT = (e, t, n) => {
  if (t > 0) {
    let i = e[0] === "-" ? "-" : "";
    i && (e = e.slice(1)), e = i + e.padStart(i ? t - 1 : t, "0");
  }
  return n === !1 ? String(e) : e;
}, si = (e, t) => {
  let n = e[0] === "-" ? "-" : "";
  for (n && (e = e.slice(1), t--); e.length < t; ) e = "0" + e;
  return n ? "-" + e : e;
}, kT = (e, t, n) => {
  e.negatives.sort((s, u) => s < u ? -1 : s > u ? 1 : 0), e.positives.sort((s, u) => s < u ? -1 : s > u ? 1 : 0);
  let i = t.capture ? "" : "?:", r = "", o = "", a;
  return e.positives.length && (r = e.positives.map((s) => si(String(s), n)).join("|")), e.negatives.length && (o = `-(${i}${e.negatives.map((s) => si(String(s), n)).join("|")})`), r && o ? a = `${r}|${o}` : a = r || o, t.wrap ? `(${i}${a})` : a;
}, yd = (e, t, n, i) => {
  if (n)
    return gd(e, t, { wrap: !1, ...i });
  let r = String.fromCharCode(e);
  if (e === t) return r;
  let o = String.fromCharCode(t);
  return `[${r}-${o}]`;
}, vd = (e, t, n) => {
  if (Array.isArray(e)) {
    let i = n.wrap === !0, r = n.capture ? "" : "?:";
    return i ? `(${r}${e.join("|")})` : e.join("|");
  }
  return gd(e, t, n);
}, wd = (...e) => new RangeError("Invalid range arguments: " + DT.inspect(...e)), bd = (e, t, n) => {
  if (n.strictRanges === !0) throw wd([e, t]);
  return [];
}, UT = (e, t) => {
  if (t.strictRanges === !0)
    throw new TypeError(`Expected step "${e}" to be a number`);
  return [];
}, BT = (e, t, n = 1, i = {}) => {
  let r = Number(e), o = Number(t);
  if (!Number.isInteger(r) || !Number.isInteger(o)) {
    if (i.strictRanges === !0) throw wd([e, t]);
    return [];
  }
  r === 0 && (r = 0), o === 0 && (o = 0);
  let a = r > o, s = String(e), u = String(t), c = String(n);
  n = Math.max(Math.abs(n), 1);
  let l = Sa(s) || Sa(u) || Sa(c), f = l ? Math.max(s.length, u.length, c.length) : 0, d = l === !1 && LT(e, t, i) === !1, p = i.transform || MT(d);
  if (i.toRegex && n === 1)
    return yd(si(e, f), si(t, f), !0, i);
  let h = { negatives: [], positives: [] }, m = (w) => h[w < 0 ? "negatives" : "positives"].push(Math.abs(w)), g = [], v = 0;
  for (; a ? r >= o : r <= o; )
    i.toRegex === !0 && n > 1 ? m(r) : g.push(jT(p(r, v), f, d)), r = a ? r - n : r + n, v++;
  return i.toRegex === !0 ? n > 1 ? kT(h, i, f) : vd(g, null, { wrap: !1, ...i }) : g;
}, HT = (e, t, n = 1, i = {}) => {
  if (!Zn(e) && e.length > 1 || !Zn(t) && t.length > 1)
    return bd(e, t, i);
  let r = i.transform || ((d) => String.fromCharCode(d)), o = `${e}`.charCodeAt(0), a = `${t}`.charCodeAt(0), s = o > a, u = Math.min(o, a), c = Math.max(o, a);
  if (i.toRegex && n === 1)
    return yd(u, c, !1, i);
  let l = [], f = 0;
  for (; s ? o >= a : o <= a; )
    l.push(r(o, f)), o = s ? o - n : o + n, f++;
  return i.toRegex === !0 ? vd(l, null, { wrap: !1, options: i }) : l;
}, Nr = (e, t, n, i = {}) => {
  if (t == null && Ta(e))
    return [e];
  if (!Ta(e) || !Ta(t))
    return bd(e, t, i);
  if (typeof n == "function")
    return Nr(e, t, 1, { transform: n });
  if (mc(n))
    return Nr(e, t, 0, n);
  let r = { ...i };
  return r.capture === !0 && (r.wrap = !0), n = n || r.step || 1, Zn(n) ? Zn(e) && Zn(t) ? BT(e, t, n, r) : HT(e, t, Math.max(Math.abs(n), 1), r) : n != null && !mc(n) ? UT(n, r) : Nr(e, t, 1, n);
};
var _d = Nr;
const qT = _d, gc = Qi, GT = (e, t = {}) => {
  const n = (i, r = {}) => {
    const o = gc.isInvalidBrace(r), a = i.invalid === !0 && t.escapeInvalid === !0, s = o === !0 || a === !0, u = t.escapeInvalid === !0 ? "\\" : "";
    let c = "";
    if (i.isOpen === !0)
      return u + i.value;
    if (i.isClose === !0)
      return console.log("node.isClose", u, i.value), u + i.value;
    if (i.type === "open")
      return s ? u + i.value : "(";
    if (i.type === "close")
      return s ? u + i.value : ")";
    if (i.type === "comma")
      return i.prev.type === "comma" ? "" : s ? i.value : "|";
    if (i.value)
      return i.value;
    if (i.nodes && i.ranges > 0) {
      const l = gc.reduce(i.nodes), f = qT(...l, { ...t, wrap: !1, toRegex: !0, strictZeros: !0 });
      if (f.length !== 0)
        return l.length > 1 && f.length > 1 ? `(${f})` : f;
    }
    if (i.nodes)
      for (const l of i.nodes)
        c += n(l, i);
    return c;
  };
  return n(e);
};
var YT = GT;
const WT = _d, yc = Ys, mn = Qi, qt = (e = "", t = "", n = !1) => {
  const i = [];
  if (e = [].concat(e), t = [].concat(t), !t.length) return e;
  if (!e.length)
    return n ? mn.flatten(t).map((r) => `{${r}}`) : t;
  for (const r of e)
    if (Array.isArray(r))
      for (const o of r)
        i.push(qt(o, t, n));
    else
      for (let o of t)
        n === !0 && typeof o == "string" && (o = `{${o}}`), i.push(Array.isArray(o) ? qt(r, o, n) : r + o);
  return mn.flatten(i);
}, zT = (e, t = {}) => {
  const n = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit, i = (r, o = {}) => {
    r.queue = [];
    let a = o, s = o.queue;
    for (; a.type !== "brace" && a.type !== "root" && a.parent; )
      a = a.parent, s = a.queue;
    if (r.invalid || r.dollar) {
      s.push(qt(s.pop(), yc(r, t)));
      return;
    }
    if (r.type === "brace" && r.invalid !== !0 && r.nodes.length === 2) {
      s.push(qt(s.pop(), ["{}"]));
      return;
    }
    if (r.nodes && r.ranges > 0) {
      const f = mn.reduce(r.nodes);
      if (mn.exceedsLimit(...f, t.step, n))
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      let d = WT(...f, t);
      d.length === 0 && (d = yc(r, t)), s.push(qt(s.pop(), d)), r.nodes = [];
      return;
    }
    const u = mn.encloseBrace(r);
    let c = r.queue, l = r;
    for (; l.type !== "brace" && l.type !== "root" && l.parent; )
      l = l.parent, c = l.queue;
    for (let f = 0; f < r.nodes.length; f++) {
      const d = r.nodes[f];
      if (d.type === "comma" && r.type === "brace") {
        f === 1 && c.push(""), c.push("");
        continue;
      }
      if (d.type === "close") {
        s.push(qt(s.pop(), c, u));
        continue;
      }
      if (d.value && d.type !== "open") {
        c.push(qt(c.pop(), d.value));
        continue;
      }
      d.nodes && i(d, r);
    }
    return c;
  };
  return mn.flatten(i(e));
};
var KT = zT, QT = {
  MAX_LENGTH: 1e4,
  CHAR_LEFT_PARENTHESES: "(",
  /* ( */
  CHAR_RIGHT_PARENTHESES: ")",
  /* ) */
  CHAR_BACKSLASH: "\\",
  /* \ */
  CHAR_BACKTICK: "`",
  /* ` */
  CHAR_COMMA: ",",
  /* , */
  CHAR_DOT: ".",
  /* . */
  CHAR_DOUBLE_QUOTE: '"',
  /* " */
  CHAR_LEFT_CURLY_BRACE: "{",
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: "[",
  /* [ */
  CHAR_NO_BREAK_SPACE: " ",
  /* \u00A0 */
  CHAR_RIGHT_CURLY_BRACE: "}",
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: "]",
  /* ] */
  CHAR_SINGLE_QUOTE: "'",
  /* ' */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  /* \uFEFF */
};
const VT = Ys, {
  MAX_LENGTH: vc,
  CHAR_BACKSLASH: Aa,
  /* \ */
  CHAR_BACKTICK: XT,
  /* ` */
  CHAR_COMMA: ZT,
  /* , */
  CHAR_DOT: JT,
  /* . */
  CHAR_LEFT_PARENTHESES: eS,
  /* ( */
  CHAR_RIGHT_PARENTHESES: tS,
  /* ) */
  CHAR_LEFT_CURLY_BRACE: nS,
  /* { */
  CHAR_RIGHT_CURLY_BRACE: rS,
  /* } */
  CHAR_LEFT_SQUARE_BRACKET: wc,
  /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: bc,
  /* ] */
  CHAR_DOUBLE_QUOTE: iS,
  /* " */
  CHAR_SINGLE_QUOTE: aS,
  /* ' */
  CHAR_NO_BREAK_SPACE: oS,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: sS
} = QT, uS = (e, t = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  const n = t || {}, i = typeof n.maxLength == "number" ? Math.min(vc, n.maxLength) : vc;
  if (e.length > i)
    throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${i})`);
  const r = { type: "root", input: e, nodes: [] }, o = [r];
  let a = r, s = r, u = 0;
  const c = e.length;
  let l = 0, f = 0, d;
  const p = () => e[l++], h = (m) => {
    if (m.type === "text" && s.type === "dot" && (s.type = "text"), s && s.type === "text" && m.type === "text") {
      s.value += m.value;
      return;
    }
    return a.nodes.push(m), m.parent = a, m.prev = s, s = m, m;
  };
  for (h({ type: "bos" }); l < c; )
    if (a = o[o.length - 1], d = p(), !(d === sS || d === oS)) {
      if (d === Aa) {
        h({ type: "text", value: (t.keepEscaping ? d : "") + p() });
        continue;
      }
      if (d === bc) {
        h({ type: "text", value: "\\" + d });
        continue;
      }
      if (d === wc) {
        u++;
        let m;
        for (; l < c && (m = p()); ) {
          if (d += m, m === wc) {
            u++;
            continue;
          }
          if (m === Aa) {
            d += p();
            continue;
          }
          if (m === bc && (u--, u === 0))
            break;
        }
        h({ type: "text", value: d });
        continue;
      }
      if (d === eS) {
        a = h({ type: "paren", nodes: [] }), o.push(a), h({ type: "text", value: d });
        continue;
      }
      if (d === tS) {
        if (a.type !== "paren") {
          h({ type: "text", value: d });
          continue;
        }
        a = o.pop(), h({ type: "text", value: d }), a = o[o.length - 1];
        continue;
      }
      if (d === iS || d === aS || d === XT) {
        const m = d;
        let g;
        for (t.keepQuotes !== !0 && (d = ""); l < c && (g = p()); ) {
          if (g === Aa) {
            d += g + p();
            continue;
          }
          if (g === m) {
            t.keepQuotes === !0 && (d += g);
            break;
          }
          d += g;
        }
        h({ type: "text", value: d });
        continue;
      }
      if (d === nS) {
        f++;
        const g = {
          type: "brace",
          open: !0,
          close: !1,
          dollar: s.value && s.value.slice(-1) === "$" || a.dollar === !0,
          depth: f,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        a = h(g), o.push(a), h({ type: "open", value: d });
        continue;
      }
      if (d === rS) {
        if (a.type !== "brace") {
          h({ type: "text", value: d });
          continue;
        }
        const m = "close";
        a = o.pop(), a.close = !0, h({ type: m, value: d }), f--, a = o[o.length - 1];
        continue;
      }
      if (d === ZT && f > 0) {
        if (a.ranges > 0) {
          a.ranges = 0;
          const m = a.nodes.shift();
          a.nodes = [m, { type: "text", value: VT(a) }];
        }
        h({ type: "comma", value: d }), a.commas++;
        continue;
      }
      if (d === JT && f > 0 && a.commas === 0) {
        const m = a.nodes;
        if (f === 0 || m.length === 0) {
          h({ type: "text", value: d });
          continue;
        }
        if (s.type === "dot") {
          if (a.range = [], s.value += d, s.type = "range", a.nodes.length !== 3 && a.nodes.length !== 5) {
            a.invalid = !0, a.ranges = 0, s.type = "text";
            continue;
          }
          a.ranges++, a.args = [];
          continue;
        }
        if (s.type === "range") {
          m.pop();
          const g = m[m.length - 1];
          g.value += s.value + d, s = g, a.ranges--;
          continue;
        }
        h({ type: "dot", value: d });
        continue;
      }
      h({ type: "text", value: d });
    }
  do
    if (a = o.pop(), a.type !== "root") {
      a.nodes.forEach((v) => {
        v.nodes || (v.type === "open" && (v.isOpen = !0), v.type === "close" && (v.isClose = !0), v.nodes || (v.type = "text"), v.invalid = !0);
      });
      const m = o[o.length - 1], g = m.nodes.indexOf(a);
      m.nodes.splice(g, 1, ...a.nodes);
    }
  while (o.length > 0);
  return h({ type: "eos" }), r;
};
var cS = uS;
const _c = Ys, lS = YT, fS = KT, dS = cS, Ke = (e, t = {}) => {
  let n = [];
  if (Array.isArray(e))
    for (const i of e) {
      const r = Ke.create(i, t);
      Array.isArray(r) ? n.push(...r) : n.push(r);
    }
  else
    n = [].concat(Ke.create(e, t));
  return t && t.expand === !0 && t.nodupes === !0 && (n = [...new Set(n)]), n;
};
Ke.parse = (e, t = {}) => dS(e, t);
Ke.stringify = (e, t = {}) => _c(typeof e == "string" ? Ke.parse(e, t) : e, t);
Ke.compile = (e, t = {}) => (typeof e == "string" && (e = Ke.parse(e, t)), lS(e, t));
Ke.expand = (e, t = {}) => {
  typeof e == "string" && (e = Ke.parse(e, t));
  let n = fS(e, t);
  return t.noempty === !0 && (n = n.filter(Boolean)), t.nodupes === !0 && (n = [...new Set(n)]), n;
};
Ke.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? Ke.compile(e, t) : Ke.expand(e, t);
var pS = Ke, ur = {};
const hS = Me, ot = "\\\\/", Ec = `[^${ot}]`, vt = "\\.", mS = "\\+", gS = "\\?", Vi = "\\/", yS = "(?=.)", Ed = "[^/]", Ws = `(?:${Vi}|$)`, Td = `(?:^|${Vi})`, zs = `${vt}{1,2}${Ws}`, vS = `(?!${vt})`, wS = `(?!${Td}${zs})`, bS = `(?!${vt}{0,1}${Ws})`, _S = `(?!${zs})`, ES = `[^.${Vi}]`, TS = `${Ed}*?`, Sd = {
  DOT_LITERAL: vt,
  PLUS_LITERAL: mS,
  QMARK_LITERAL: gS,
  SLASH_LITERAL: Vi,
  ONE_CHAR: yS,
  QMARK: Ed,
  END_ANCHOR: Ws,
  DOTS_SLASH: zs,
  NO_DOT: vS,
  NO_DOTS: wS,
  NO_DOT_SLASH: bS,
  NO_DOTS_SLASH: _S,
  QMARK_NO_DOT: ES,
  STAR: TS,
  START_ANCHOR: Td
}, SS = {
  ...Sd,
  SLASH_LITERAL: `[${ot}]`,
  QMARK: Ec,
  STAR: `${Ec}*?`,
  DOTS_SLASH: `${vt}{1,2}(?:[${ot}]|$)`,
  NO_DOT: `(?!${vt})`,
  NO_DOTS: `(?!(?:^|[${ot}])${vt}{1,2}(?:[${ot}]|$))`,
  NO_DOT_SLASH: `(?!${vt}{0,1}(?:[${ot}]|$))`,
  NO_DOTS_SLASH: `(?!${vt}{1,2}(?:[${ot}]|$))`,
  QMARK_NO_DOT: `[^.${ot}]`,
  START_ANCHOR: `(?:^|[${ot}])`,
  END_ANCHOR: `(?:[${ot}]|$)`
}, AS = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var Xi = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: AS,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  // Digits
  CHAR_0: 48,
  /* 0 */
  CHAR_9: 57,
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  /* A */
  CHAR_LOWERCASE_A: 97,
  /* a */
  CHAR_UPPERCASE_Z: 90,
  /* Z */
  CHAR_LOWERCASE_Z: 122,
  /* z */
  CHAR_LEFT_PARENTHESES: 40,
  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,
  /* ) */
  CHAR_ASTERISK: 42,
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,
  /* & */
  CHAR_AT: 64,
  /* @ */
  CHAR_BACKWARD_SLASH: 92,
  /* \ */
  CHAR_CARRIAGE_RETURN: 13,
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,
  /* ^ */
  CHAR_COLON: 58,
  /* : */
  CHAR_COMMA: 44,
  /* , */
  CHAR_DOT: 46,
  /* . */
  CHAR_DOUBLE_QUOTE: 34,
  /* " */
  CHAR_EQUAL: 61,
  /* = */
  CHAR_EXCLAMATION_MARK: 33,
  /* ! */
  CHAR_FORM_FEED: 12,
  /* \f */
  CHAR_FORWARD_SLASH: 47,
  /* / */
  CHAR_GRAVE_ACCENT: 96,
  /* ` */
  CHAR_HASH: 35,
  /* # */
  CHAR_HYPHEN_MINUS: 45,
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,
  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,
  /* [ */
  CHAR_LINE_FEED: 10,
  /* \n */
  CHAR_NO_BREAK_SPACE: 160,
  /* \u00A0 */
  CHAR_PERCENT: 37,
  /* % */
  CHAR_PLUS: 43,
  /* + */
  CHAR_QUESTION_MARK: 63,
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  /* ] */
  CHAR_SEMICOLON: 59,
  /* ; */
  CHAR_SINGLE_QUOTE: 39,
  /* ' */
  CHAR_SPACE: 32,
  /*   */
  CHAR_TAB: 9,
  /* \t */
  CHAR_UNDERSCORE: 95,
  /* _ */
  CHAR_VERTICAL_LINE: 124,
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  /* \uFEFF */
  SEP: hS.sep,
  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars(e) {
    return {
      "!": { type: "negate", open: "(?:(?!(?:", close: `))${e.STAR})` },
      "?": { type: "qmark", open: "(?:", close: ")?" },
      "+": { type: "plus", open: "(?:", close: ")+" },
      "*": { type: "star", open: "(?:", close: ")*" },
      "@": { type: "at", open: "(?:", close: ")" }
    };
  },
  /**
   * Create GLOB_CHARS
   */
  globChars(e) {
    return e === !0 ? SS : Sd;
  }
};
(function(e) {
  const t = Me, n = process.platform === "win32", {
    REGEX_BACKSLASH: i,
    REGEX_REMOVE_BACKSLASH: r,
    REGEX_SPECIAL_CHARS: o,
    REGEX_SPECIAL_CHARS_GLOBAL: a
  } = Xi;
  e.isObject = (s) => s !== null && typeof s == "object" && !Array.isArray(s), e.hasRegexChars = (s) => o.test(s), e.isRegexChar = (s) => s.length === 1 && e.hasRegexChars(s), e.escapeRegex = (s) => s.replace(a, "\\$1"), e.toPosixSlashes = (s) => s.replace(i, "/"), e.removeBackslashes = (s) => s.replace(r, (u) => u === "\\" ? "" : u), e.supportsLookbehinds = () => {
    const s = process.version.slice(1).split(".").map(Number);
    return s.length === 3 && s[0] >= 9 || s[0] === 8 && s[1] >= 10;
  }, e.isWindows = (s) => s && typeof s.windows == "boolean" ? s.windows : n === !0 || t.sep === "\\", e.escapeLast = (s, u, c) => {
    const l = s.lastIndexOf(u, c);
    return l === -1 ? s : s[l - 1] === "\\" ? e.escapeLast(s, u, l - 1) : `${s.slice(0, l)}\\${s.slice(l)}`;
  }, e.removePrefix = (s, u = {}) => {
    let c = s;
    return c.startsWith("./") && (c = c.slice(2), u.prefix = "./"), c;
  }, e.wrapOutput = (s, u = {}, c = {}) => {
    const l = c.contains ? "" : "^", f = c.contains ? "" : "$";
    let d = `${l}(?:${s})${f}`;
    return u.negated === !0 && (d = `(?:^(?!${d}).*$)`), d;
  };
})(ur);
const Tc = ur, {
  CHAR_ASTERISK: Oa,
  /* * */
  CHAR_AT: OS,
  /* @ */
  CHAR_BACKWARD_SLASH: Kn,
  /* \ */
  CHAR_COMMA: CS,
  /* , */
  CHAR_DOT: Ca,
  /* . */
  CHAR_EXCLAMATION_MARK: xa,
  /* ! */
  CHAR_FORWARD_SLASH: Ad,
  /* / */
  CHAR_LEFT_CURLY_BRACE: Pa,
  /* { */
  CHAR_LEFT_PARENTHESES: Ra,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET: xS,
  /* [ */
  CHAR_PLUS: PS,
  /* + */
  CHAR_QUESTION_MARK: Sc,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE: RS,
  /* } */
  CHAR_RIGHT_PARENTHESES: Ac,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET: $S
  /* ] */
} = Xi, Oc = (e) => e === Ad || e === Kn, Cc = (e) => {
  e.isPrefix !== !0 && (e.depth = e.isGlobstar ? 1 / 0 : 1);
}, IS = (e, t) => {
  const n = t || {}, i = e.length - 1, r = n.parts === !0 || n.scanToEnd === !0, o = [], a = [], s = [];
  let u = e, c = -1, l = 0, f = 0, d = !1, p = !1, h = !1, m = !1, g = !1, v = !1, w = !1, A = !1, C = !1, x = !1, b = 0, O, S, _ = { value: "", depth: 0, isGlob: !1 };
  const R = () => c >= i, y = () => u.charCodeAt(c + 1), N = () => (O = S, u.charCodeAt(++c));
  for (; c < i; ) {
    S = N();
    let U;
    if (S === Kn) {
      w = _.backslashes = !0, S = N(), S === Pa && (v = !0);
      continue;
    }
    if (v === !0 || S === Pa) {
      for (b++; R() !== !0 && (S = N()); ) {
        if (S === Kn) {
          w = _.backslashes = !0, N();
          continue;
        }
        if (S === Pa) {
          b++;
          continue;
        }
        if (v !== !0 && S === Ca && (S = N()) === Ca) {
          if (d = _.isBrace = !0, h = _.isGlob = !0, x = !0, r === !0)
            continue;
          break;
        }
        if (v !== !0 && S === CS) {
          if (d = _.isBrace = !0, h = _.isGlob = !0, x = !0, r === !0)
            continue;
          break;
        }
        if (S === RS && (b--, b === 0)) {
          v = !1, d = _.isBrace = !0, x = !0;
          break;
        }
      }
      if (r === !0)
        continue;
      break;
    }
    if (S === Ad) {
      if (o.push(c), a.push(_), _ = { value: "", depth: 0, isGlob: !1 }, x === !0) continue;
      if (O === Ca && c === l + 1) {
        l += 2;
        continue;
      }
      f = c + 1;
      continue;
    }
    if (n.noext !== !0 && (S === PS || S === OS || S === Oa || S === Sc || S === xa) === !0 && y() === Ra) {
      if (h = _.isGlob = !0, m = _.isExtglob = !0, x = !0, S === xa && c === l && (C = !0), r === !0) {
        for (; R() !== !0 && (S = N()); ) {
          if (S === Kn) {
            w = _.backslashes = !0, S = N();
            continue;
          }
          if (S === Ac) {
            h = _.isGlob = !0, x = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (S === Oa) {
      if (O === Oa && (g = _.isGlobstar = !0), h = _.isGlob = !0, x = !0, r === !0)
        continue;
      break;
    }
    if (S === Sc) {
      if (h = _.isGlob = !0, x = !0, r === !0)
        continue;
      break;
    }
    if (S === xS) {
      for (; R() !== !0 && (U = N()); ) {
        if (U === Kn) {
          w = _.backslashes = !0, N();
          continue;
        }
        if (U === $S) {
          p = _.isBracket = !0, h = _.isGlob = !0, x = !0;
          break;
        }
      }
      if (r === !0)
        continue;
      break;
    }
    if (n.nonegate !== !0 && S === xa && c === l) {
      A = _.negated = !0, l++;
      continue;
    }
    if (n.noparen !== !0 && S === Ra) {
      if (h = _.isGlob = !0, r === !0) {
        for (; R() !== !0 && (S = N()); ) {
          if (S === Ra) {
            w = _.backslashes = !0, S = N();
            continue;
          }
          if (S === Ac) {
            x = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (h === !0) {
      if (x = !0, r === !0)
        continue;
      break;
    }
  }
  n.noext === !0 && (m = !1, h = !1);
  let j = u, G = "", E = "";
  l > 0 && (G = u.slice(0, l), u = u.slice(l), f -= l), j && h === !0 && f > 0 ? (j = u.slice(0, f), E = u.slice(f)) : h === !0 ? (j = "", E = u) : j = u, j && j !== "" && j !== "/" && j !== u && Oc(j.charCodeAt(j.length - 1)) && (j = j.slice(0, -1)), n.unescape === !0 && (E && (E = Tc.removeBackslashes(E)), j && w === !0 && (j = Tc.removeBackslashes(j)));
  const T = {
    prefix: G,
    input: e,
    start: l,
    base: j,
    glob: E,
    isBrace: d,
    isBracket: p,
    isGlob: h,
    isExtglob: m,
    isGlobstar: g,
    negated: A,
    negatedExtglob: C
  };
  if (n.tokens === !0 && (T.maxDepth = 0, Oc(S) || a.push(_), T.tokens = a), n.parts === !0 || n.tokens === !0) {
    let U;
    for (let D = 0; D < o.length; D++) {
      const M = U ? U + 1 : l, z = o[D], V = e.slice(M, z);
      n.tokens && (D === 0 && l !== 0 ? (a[D].isPrefix = !0, a[D].value = G) : a[D].value = V, Cc(a[D]), T.maxDepth += a[D].depth), (D !== 0 || V !== "") && s.push(V), U = z;
    }
    if (U && U + 1 < e.length) {
      const D = e.slice(U + 1);
      s.push(D), n.tokens && (a[a.length - 1].value = D, Cc(a[a.length - 1]), T.maxDepth += a[a.length - 1].depth);
    }
    T.slashes = o, T.parts = s;
  }
  return T;
};
var NS = IS;
const ui = Xi, We = ur, {
  MAX_LENGTH: ci,
  POSIX_REGEX_SOURCE: FS,
  REGEX_NON_SPECIAL_CHARS: DS,
  REGEX_SPECIAL_CHARS_BACKREF: MS,
  REPLACEMENTS: Od
} = ui, LS = (e, t) => {
  if (typeof t.expandRange == "function")
    return t.expandRange(...e, t);
  e.sort();
  const n = `[${e.join("-")}]`;
  try {
    new RegExp(n);
  } catch {
    return e.map((r) => We.escapeRegex(r)).join("..");
  }
  return n;
}, on = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, Ks = (e, t) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  e = Od[e] || e;
  const n = { ...t }, i = typeof n.maxLength == "number" ? Math.min(ci, n.maxLength) : ci;
  let r = e.length;
  if (r > i)
    throw new SyntaxError(`Input length: ${r}, exceeds maximum allowed length: ${i}`);
  const o = { type: "bos", value: "", output: n.prepend || "" }, a = [o], s = n.capture ? "" : "?:", u = We.isWindows(t), c = ui.globChars(u), l = ui.extglobChars(c), {
    DOT_LITERAL: f,
    PLUS_LITERAL: d,
    SLASH_LITERAL: p,
    ONE_CHAR: h,
    DOTS_SLASH: m,
    NO_DOT: g,
    NO_DOT_SLASH: v,
    NO_DOTS_SLASH: w,
    QMARK: A,
    QMARK_NO_DOT: C,
    STAR: x,
    START_ANCHOR: b
  } = c, O = (k) => `(${s}(?:(?!${b}${k.dot ? m : f}).)*?)`, S = n.dot ? "" : g, _ = n.dot ? A : C;
  let R = n.bash === !0 ? O(n) : x;
  n.capture && (R = `(${R})`), typeof n.noext == "boolean" && (n.noextglob = n.noext);
  const y = {
    input: e,
    index: -1,
    start: 0,
    dot: n.dot === !0,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: !1,
    negated: !1,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: !1,
    tokens: a
  };
  e = We.removePrefix(e, y), r = e.length;
  const N = [], j = [], G = [];
  let E = o, T;
  const U = () => y.index === r - 1, D = y.peek = (k = 1) => e[y.index + k], M = y.advance = () => e[++y.index] || "", z = () => e.slice(y.index + 1), V = (k = "", Z = 0) => {
    y.consumed += k, y.index += Z;
  }, ie = (k) => {
    y.output += k.output != null ? k.output : k.value, V(k.value);
  }, Ce = () => {
    let k = 1;
    for (; D() === "!" && (D(2) !== "(" || D(3) === "?"); )
      M(), y.start++, k++;
    return k % 2 === 0 ? !1 : (y.negated = !0, y.start++, !0);
  }, P = (k) => {
    y[k]++, G.push(k);
  }, $ = (k) => {
    y[k]--, G.pop();
  }, I = (k) => {
    if (E.type === "globstar") {
      const Z = y.braces > 0 && (k.type === "comma" || k.type === "brace"), L = k.extglob === !0 || N.length && (k.type === "pipe" || k.type === "paren");
      k.type !== "slash" && k.type !== "paren" && !Z && !L && (y.output = y.output.slice(0, -E.output.length), E.type = "star", E.value = "*", E.output = R, y.output += E.output);
    }
    if (N.length && k.type !== "paren" && (N[N.length - 1].inner += k.value), (k.value || k.output) && ie(k), E && E.type === "text" && k.type === "text") {
      E.value += k.value, E.output = (E.output || "") + k.value;
      return;
    }
    k.prev = E, a.push(k), E = k;
  }, X = (k, Z) => {
    const L = { ...l[Z], conditions: 1, inner: "" };
    L.prev = E, L.parens = y.parens, L.output = y.output;
    const K = (n.capture ? "(" : "") + L.open;
    P("parens"), I({ type: k, value: Z, output: y.output ? "" : h }), I({ type: "paren", extglob: !0, value: M(), output: K }), N.push(L);
  }, fe = (k) => {
    let Z = k.close + (n.capture ? ")" : ""), L;
    if (k.type === "negate") {
      let K = R;
      if (k.inner && k.inner.length > 1 && k.inner.includes("/") && (K = O(n)), (K !== R || U() || /^\)+$/.test(z())) && (Z = k.close = `)$))${K}`), k.inner.includes("*") && (L = z()) && /^\.[^\\/.]+$/.test(L)) {
        const oe = Ks(L, { ...t, fastpaths: !1 }).output;
        Z = k.close = `)${oe})${K})`;
      }
      k.prev.type === "bos" && (y.negatedExtglob = !0);
    }
    I({ type: "paren", extglob: !0, value: T, output: Z }), $("parens");
  };
  if (n.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
    let k = !1, Z = e.replace(MS, (L, K, oe, ye, ue, at) => ye === "\\" ? (k = !0, L) : ye === "?" ? K ? K + ye + (ue ? A.repeat(ue.length) : "") : at === 0 ? _ + (ue ? A.repeat(ue.length) : "") : A.repeat(oe.length) : ye === "." ? f.repeat(oe.length) : ye === "*" ? K ? K + ye + (ue ? R : "") : R : K ? L : `\\${L}`);
    return k === !0 && (n.unescape === !0 ? Z = Z.replace(/\\/g, "") : Z = Z.replace(/\\+/g, (L) => L.length % 2 === 0 ? "\\\\" : L ? "\\" : "")), Z === e && n.contains === !0 ? (y.output = e, y) : (y.output = We.wrapOutput(Z, y, t), y);
  }
  for (; !U(); ) {
    if (T = M(), T === "\0")
      continue;
    if (T === "\\") {
      const L = D();
      if (L === "/" && n.bash !== !0 || L === "." || L === ";")
        continue;
      if (!L) {
        T += "\\", I({ type: "text", value: T });
        continue;
      }
      const K = /^\\+/.exec(z());
      let oe = 0;
      if (K && K[0].length > 2 && (oe = K[0].length, y.index += oe, oe % 2 !== 0 && (T += "\\")), n.unescape === !0 ? T = M() : T += M(), y.brackets === 0) {
        I({ type: "text", value: T });
        continue;
      }
    }
    if (y.brackets > 0 && (T !== "]" || E.value === "[" || E.value === "[^")) {
      if (n.posix !== !1 && T === ":") {
        const L = E.value.slice(1);
        if (L.includes("[") && (E.posix = !0, L.includes(":"))) {
          const K = E.value.lastIndexOf("["), oe = E.value.slice(0, K), ye = E.value.slice(K + 2), ue = FS[ye];
          if (ue) {
            E.value = oe + ue, y.backtrack = !0, M(), !o.output && a.indexOf(E) === 1 && (o.output = h);
            continue;
          }
        }
      }
      (T === "[" && D() !== ":" || T === "-" && D() === "]") && (T = `\\${T}`), T === "]" && (E.value === "[" || E.value === "[^") && (T = `\\${T}`), n.posix === !0 && T === "!" && E.value === "[" && (T = "^"), E.value += T, ie({ value: T });
      continue;
    }
    if (y.quotes === 1 && T !== '"') {
      T = We.escapeRegex(T), E.value += T, ie({ value: T });
      continue;
    }
    if (T === '"') {
      y.quotes = y.quotes === 1 ? 0 : 1, n.keepQuotes === !0 && I({ type: "text", value: T });
      continue;
    }
    if (T === "(") {
      P("parens"), I({ type: "paren", value: T });
      continue;
    }
    if (T === ")") {
      if (y.parens === 0 && n.strictBrackets === !0)
        throw new SyntaxError(on("opening", "("));
      const L = N[N.length - 1];
      if (L && y.parens === L.parens + 1) {
        fe(N.pop());
        continue;
      }
      I({ type: "paren", value: T, output: y.parens ? ")" : "\\)" }), $("parens");
      continue;
    }
    if (T === "[") {
      if (n.nobracket === !0 || !z().includes("]")) {
        if (n.nobracket !== !0 && n.strictBrackets === !0)
          throw new SyntaxError(on("closing", "]"));
        T = `\\${T}`;
      } else
        P("brackets");
      I({ type: "bracket", value: T });
      continue;
    }
    if (T === "]") {
      if (n.nobracket === !0 || E && E.type === "bracket" && E.value.length === 1) {
        I({ type: "text", value: T, output: `\\${T}` });
        continue;
      }
      if (y.brackets === 0) {
        if (n.strictBrackets === !0)
          throw new SyntaxError(on("opening", "["));
        I({ type: "text", value: T, output: `\\${T}` });
        continue;
      }
      $("brackets");
      const L = E.value.slice(1);
      if (E.posix !== !0 && L[0] === "^" && !L.includes("/") && (T = `/${T}`), E.value += T, ie({ value: T }), n.literalBrackets === !1 || We.hasRegexChars(L))
        continue;
      const K = We.escapeRegex(E.value);
      if (y.output = y.output.slice(0, -E.value.length), n.literalBrackets === !0) {
        y.output += K, E.value = K;
        continue;
      }
      E.value = `(${s}${K}|${E.value})`, y.output += E.value;
      continue;
    }
    if (T === "{" && n.nobrace !== !0) {
      P("braces");
      const L = {
        type: "brace",
        value: T,
        output: "(",
        outputIndex: y.output.length,
        tokensIndex: y.tokens.length
      };
      j.push(L), I(L);
      continue;
    }
    if (T === "}") {
      const L = j[j.length - 1];
      if (n.nobrace === !0 || !L) {
        I({ type: "text", value: T, output: T });
        continue;
      }
      let K = ")";
      if (L.dots === !0) {
        const oe = a.slice(), ye = [];
        for (let ue = oe.length - 1; ue >= 0 && (a.pop(), oe[ue].type !== "brace"); ue--)
          oe[ue].type !== "dots" && ye.unshift(oe[ue].value);
        K = LS(ye, n), y.backtrack = !0;
      }
      if (L.comma !== !0 && L.dots !== !0) {
        const oe = y.output.slice(0, L.outputIndex), ye = y.tokens.slice(L.tokensIndex);
        L.value = L.output = "\\{", T = K = "\\}", y.output = oe;
        for (const ue of ye)
          y.output += ue.output || ue.value;
      }
      I({ type: "brace", value: T, output: K }), $("braces"), j.pop();
      continue;
    }
    if (T === "|") {
      N.length > 0 && N[N.length - 1].conditions++, I({ type: "text", value: T });
      continue;
    }
    if (T === ",") {
      let L = T;
      const K = j[j.length - 1];
      K && G[G.length - 1] === "braces" && (K.comma = !0, L = "|"), I({ type: "comma", value: T, output: L });
      continue;
    }
    if (T === "/") {
      if (E.type === "dot" && y.index === y.start + 1) {
        y.start = y.index + 1, y.consumed = "", y.output = "", a.pop(), E = o;
        continue;
      }
      I({ type: "slash", value: T, output: p });
      continue;
    }
    if (T === ".") {
      if (y.braces > 0 && E.type === "dot") {
        E.value === "." && (E.output = f);
        const L = j[j.length - 1];
        E.type = "dots", E.output += T, E.value += T, L.dots = !0;
        continue;
      }
      if (y.braces + y.parens === 0 && E.type !== "bos" && E.type !== "slash") {
        I({ type: "text", value: T, output: f });
        continue;
      }
      I({ type: "dot", value: T, output: f });
      continue;
    }
    if (T === "?") {
      if (!(E && E.value === "(") && n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        X("qmark", T);
        continue;
      }
      if (E && E.type === "paren") {
        const K = D();
        let oe = T;
        if (K === "<" && !We.supportsLookbehinds())
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        (E.value === "(" && !/[!=<:]/.test(K) || K === "<" && !/<([!=]|\w+>)/.test(z())) && (oe = `\\${T}`), I({ type: "text", value: T, output: oe });
        continue;
      }
      if (n.dot !== !0 && (E.type === "slash" || E.type === "bos")) {
        I({ type: "qmark", value: T, output: C });
        continue;
      }
      I({ type: "qmark", value: T, output: A });
      continue;
    }
    if (T === "!") {
      if (n.noextglob !== !0 && D() === "(" && (D(2) !== "?" || !/[!=<:]/.test(D(3)))) {
        X("negate", T);
        continue;
      }
      if (n.nonegate !== !0 && y.index === 0) {
        Ce();
        continue;
      }
    }
    if (T === "+") {
      if (n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        X("plus", T);
        continue;
      }
      if (E && E.value === "(" || n.regex === !1) {
        I({ type: "plus", value: T, output: d });
        continue;
      }
      if (E && (E.type === "bracket" || E.type === "paren" || E.type === "brace") || y.parens > 0) {
        I({ type: "plus", value: T });
        continue;
      }
      I({ type: "plus", value: d });
      continue;
    }
    if (T === "@") {
      if (n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        I({ type: "at", extglob: !0, value: T, output: "" });
        continue;
      }
      I({ type: "text", value: T });
      continue;
    }
    if (T !== "*") {
      (T === "$" || T === "^") && (T = `\\${T}`);
      const L = DS.exec(z());
      L && (T += L[0], y.index += L[0].length), I({ type: "text", value: T });
      continue;
    }
    if (E && (E.type === "globstar" || E.star === !0)) {
      E.type = "star", E.star = !0, E.value += T, E.output = R, y.backtrack = !0, y.globstar = !0, V(T);
      continue;
    }
    let k = z();
    if (n.noextglob !== !0 && /^\([^?]/.test(k)) {
      X("star", T);
      continue;
    }
    if (E.type === "star") {
      if (n.noglobstar === !0) {
        V(T);
        continue;
      }
      const L = E.prev, K = L.prev, oe = L.type === "slash" || L.type === "bos", ye = K && (K.type === "star" || K.type === "globstar");
      if (n.bash === !0 && (!oe || k[0] && k[0] !== "/")) {
        I({ type: "star", value: T, output: "" });
        continue;
      }
      const ue = y.braces > 0 && (L.type === "comma" || L.type === "brace"), at = N.length && (L.type === "pipe" || L.type === "paren");
      if (!oe && L.type !== "paren" && !ue && !at) {
        I({ type: "star", value: T, output: "" });
        continue;
      }
      for (; k.slice(0, 3) === "/**"; ) {
        const ht = e[y.index + 4];
        if (ht && ht !== "/")
          break;
        k = k.slice(3), V("/**", 3);
      }
      if (L.type === "bos" && U()) {
        E.type = "globstar", E.value += T, E.output = O(n), y.output = E.output, y.globstar = !0, V(T);
        continue;
      }
      if (L.type === "slash" && L.prev.type !== "bos" && !ye && U()) {
        y.output = y.output.slice(0, -(L.output + E.output).length), L.output = `(?:${L.output}`, E.type = "globstar", E.output = O(n) + (n.strictSlashes ? ")" : "|$)"), E.value += T, y.globstar = !0, y.output += L.output + E.output, V(T);
        continue;
      }
      if (L.type === "slash" && L.prev.type !== "bos" && k[0] === "/") {
        const ht = k[1] !== void 0 ? "|$" : "";
        y.output = y.output.slice(0, -(L.output + E.output).length), L.output = `(?:${L.output}`, E.type = "globstar", E.output = `${O(n)}${p}|${p}${ht})`, E.value += T, y.output += L.output + E.output, y.globstar = !0, V(T + M()), I({ type: "slash", value: "/", output: "" });
        continue;
      }
      if (L.type === "bos" && k[0] === "/") {
        E.type = "globstar", E.value += T, E.output = `(?:^|${p}|${O(n)}${p})`, y.output = E.output, y.globstar = !0, V(T + M()), I({ type: "slash", value: "/", output: "" });
        continue;
      }
      y.output = y.output.slice(0, -E.output.length), E.type = "globstar", E.output = O(n), E.value += T, y.output += E.output, y.globstar = !0, V(T);
      continue;
    }
    const Z = { type: "star", value: T, output: R };
    if (n.bash === !0) {
      Z.output = ".*?", (E.type === "bos" || E.type === "slash") && (Z.output = S + Z.output), I(Z);
      continue;
    }
    if (E && (E.type === "bracket" || E.type === "paren") && n.regex === !0) {
      Z.output = T, I(Z);
      continue;
    }
    (y.index === y.start || E.type === "slash" || E.type === "dot") && (E.type === "dot" ? (y.output += v, E.output += v) : n.dot === !0 ? (y.output += w, E.output += w) : (y.output += S, E.output += S), D() !== "*" && (y.output += h, E.output += h)), I(Z);
  }
  for (; y.brackets > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(on("closing", "]"));
    y.output = We.escapeLast(y.output, "["), $("brackets");
  }
  for (; y.parens > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(on("closing", ")"));
    y.output = We.escapeLast(y.output, "("), $("parens");
  }
  for (; y.braces > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(on("closing", "}"));
    y.output = We.escapeLast(y.output, "{"), $("braces");
  }
  if (n.strictSlashes !== !0 && (E.type === "star" || E.type === "bracket") && I({ type: "maybe_slash", value: "", output: `${p}?` }), y.backtrack === !0) {
    y.output = "";
    for (const k of y.tokens)
      y.output += k.output != null ? k.output : k.value, k.suffix && (y.output += k.suffix);
  }
  return y;
};
Ks.fastpaths = (e, t) => {
  const n = { ...t }, i = typeof n.maxLength == "number" ? Math.min(ci, n.maxLength) : ci, r = e.length;
  if (r > i)
    throw new SyntaxError(`Input length: ${r}, exceeds maximum allowed length: ${i}`);
  e = Od[e] || e;
  const o = We.isWindows(t), {
    DOT_LITERAL: a,
    SLASH_LITERAL: s,
    ONE_CHAR: u,
    DOTS_SLASH: c,
    NO_DOT: l,
    NO_DOTS: f,
    NO_DOTS_SLASH: d,
    STAR: p,
    START_ANCHOR: h
  } = ui.globChars(o), m = n.dot ? f : l, g = n.dot ? d : l, v = n.capture ? "" : "?:", w = { negated: !1, prefix: "" };
  let A = n.bash === !0 ? ".*?" : p;
  n.capture && (A = `(${A})`);
  const C = (S) => S.noglobstar === !0 ? A : `(${v}(?:(?!${h}${S.dot ? c : a}).)*?)`, x = (S) => {
    switch (S) {
      case "*":
        return `${m}${u}${A}`;
      case ".*":
        return `${a}${u}${A}`;
      case "*.*":
        return `${m}${A}${a}${u}${A}`;
      case "*/*":
        return `${m}${A}${s}${u}${g}${A}`;
      case "**":
        return m + C(n);
      case "**/*":
        return `(?:${m}${C(n)}${s})?${g}${u}${A}`;
      case "**/*.*":
        return `(?:${m}${C(n)}${s})?${g}${A}${a}${u}${A}`;
      case "**/.*":
        return `(?:${m}${C(n)}${s})?${a}${u}${A}`;
      default: {
        const _ = /^(.*?)\.(\w+)$/.exec(S);
        if (!_) return;
        const R = x(_[1]);
        return R ? R + a + _[2] : void 0;
      }
    }
  }, b = We.removePrefix(e, w);
  let O = x(b);
  return O && n.strictSlashes !== !0 && (O += `${s}?`), O;
};
var jS = Ks;
const kS = Me, US = NS, so = jS, Qs = ur, BS = Xi, HS = (e) => e && typeof e == "object" && !Array.isArray(e), be = (e, t, n = !1) => {
  if (Array.isArray(e)) {
    const l = e.map((d) => be(d, t, n));
    return (d) => {
      for (const p of l) {
        const h = p(d);
        if (h) return h;
      }
      return !1;
    };
  }
  const i = HS(e) && e.tokens && e.input;
  if (e === "" || typeof e != "string" && !i)
    throw new TypeError("Expected pattern to be a non-empty string");
  const r = t || {}, o = Qs.isWindows(t), a = i ? be.compileRe(e, t) : be.makeRe(e, t, !1, !0), s = a.state;
  delete a.state;
  let u = () => !1;
  if (r.ignore) {
    const l = { ...t, ignore: null, onMatch: null, onResult: null };
    u = be(r.ignore, l, n);
  }
  const c = (l, f = !1) => {
    const { isMatch: d, match: p, output: h } = be.test(l, a, t, { glob: e, posix: o }), m = { glob: e, state: s, regex: a, posix: o, input: l, output: h, match: p, isMatch: d };
    return typeof r.onResult == "function" && r.onResult(m), d === !1 ? (m.isMatch = !1, f ? m : !1) : u(l) ? (typeof r.onIgnore == "function" && r.onIgnore(m), m.isMatch = !1, f ? m : !1) : (typeof r.onMatch == "function" && r.onMatch(m), f ? m : !0);
  };
  return n && (c.state = s), c;
};
be.test = (e, t, n, { glob: i, posix: r } = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected input to be a string");
  if (e === "")
    return { isMatch: !1, output: "" };
  const o = n || {}, a = o.format || (r ? Qs.toPosixSlashes : null);
  let s = e === i, u = s && a ? a(e) : e;
  return s === !1 && (u = a ? a(e) : e, s = u === i), (s === !1 || o.capture === !0) && (o.matchBase === !0 || o.basename === !0 ? s = be.matchBase(e, t, n, r) : s = t.exec(u)), { isMatch: !!s, match: s, output: u };
};
be.matchBase = (e, t, n, i = Qs.isWindows(n)) => (t instanceof RegExp ? t : be.makeRe(t, n)).test(kS.basename(e));
be.isMatch = (e, t, n) => be(t, n)(e);
be.parse = (e, t) => Array.isArray(e) ? e.map((n) => be.parse(n, t)) : so(e, { ...t, fastpaths: !1 });
be.scan = (e, t) => US(e, t);
be.compileRe = (e, t, n = !1, i = !1) => {
  if (n === !0)
    return e.output;
  const r = t || {}, o = r.contains ? "" : "^", a = r.contains ? "" : "$";
  let s = `${o}(?:${e.output})${a}`;
  e && e.negated === !0 && (s = `^(?!${s}).*$`);
  const u = be.toRegex(s, t);
  return i === !0 && (u.state = e), u;
};
be.makeRe = (e, t = {}, n = !1, i = !1) => {
  if (!e || typeof e != "string")
    throw new TypeError("Expected a non-empty string");
  let r = { negated: !1, fastpaths: !0 };
  return t.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (r.output = so.fastpaths(e, t)), r.output || (r = so(e, t)), be.compileRe(r, t, n, i);
};
be.toRegex = (e, t) => {
  try {
    const n = t || {};
    return new RegExp(e, n.flags || (n.nocase ? "i" : ""));
  } catch (n) {
    if (t && t.debug === !0) throw n;
    return /$^/;
  }
};
be.constants = BS;
var qS = be, GS = qS;
const Cd = Jt, xd = pS, pt = GS, uo = ur, xc = (e) => e === "" || e === "./", Pd = (e) => {
  const t = e.indexOf("{");
  return t > -1 && e.indexOf("}", t) > -1;
}, ce = (e, t, n) => {
  t = [].concat(t), e = [].concat(e);
  let i = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), a = 0, s = (l) => {
    o.add(l.output), n && n.onResult && n.onResult(l);
  };
  for (let l = 0; l < t.length; l++) {
    let f = pt(String(t[l]), { ...n, onResult: s }, !0), d = f.state.negated || f.state.negatedExtglob;
    d && a++;
    for (let p of e) {
      let h = f(p, !0);
      (d ? !h.isMatch : h.isMatch) && (d ? i.add(h.output) : (i.delete(h.output), r.add(h.output)));
    }
  }
  let c = (a === t.length ? [...o] : [...r]).filter((l) => !i.has(l));
  if (n && c.length === 0) {
    if (n.failglob === !0)
      throw new Error(`No matches found for "${t.join(", ")}"`);
    if (n.nonull === !0 || n.nullglob === !0)
      return n.unescape ? t.map((l) => l.replace(/\\/g, "")) : t;
  }
  return c;
};
ce.match = ce;
ce.matcher = (e, t) => pt(e, t);
ce.isMatch = (e, t, n) => pt(t, n)(e);
ce.any = ce.isMatch;
ce.not = (e, t, n = {}) => {
  t = [].concat(t).map(String);
  let i = /* @__PURE__ */ new Set(), r = [], o = (s) => {
    n.onResult && n.onResult(s), r.push(s.output);
  }, a = new Set(ce(e, t, { ...n, onResult: o }));
  for (let s of r)
    a.has(s) || i.add(s);
  return [...i];
};
ce.contains = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${Cd.inspect(e)}"`);
  if (Array.isArray(t))
    return t.some((i) => ce.contains(e, i, n));
  if (typeof t == "string") {
    if (xc(e) || xc(t))
      return !1;
    if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t))
      return !0;
  }
  return ce.isMatch(e, t, { ...n, contains: !0 });
};
ce.matchKeys = (e, t, n) => {
  if (!uo.isObject(e))
    throw new TypeError("Expected the first argument to be an object");
  let i = ce(Object.keys(e), t, n), r = {};
  for (let o of i) r[o] = e[o];
  return r;
};
ce.some = (e, t, n) => {
  let i = [].concat(e);
  for (let r of [].concat(t)) {
    let o = pt(String(r), n);
    if (i.some((a) => o(a)))
      return !0;
  }
  return !1;
};
ce.every = (e, t, n) => {
  let i = [].concat(e);
  for (let r of [].concat(t)) {
    let o = pt(String(r), n);
    if (!i.every((a) => o(a)))
      return !1;
  }
  return !0;
};
ce.all = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${Cd.inspect(e)}"`);
  return [].concat(t).every((i) => pt(i, n)(e));
};
ce.capture = (e, t, n) => {
  let i = uo.isWindows(n), o = pt.makeRe(String(e), { ...n, capture: !0 }).exec(i ? uo.toPosixSlashes(t) : t);
  if (o)
    return o.slice(1).map((a) => a === void 0 ? "" : a);
};
ce.makeRe = (...e) => pt.makeRe(...e);
ce.scan = (...e) => pt.scan(...e);
ce.parse = (e, t) => {
  let n = [];
  for (let i of [].concat(e || []))
    for (let r of xd(String(i), t))
      n.push(pt.parse(r, t));
  return n;
};
ce.braces = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return t && t.nobrace === !0 || !Pd(e) ? [e] : xd(e, t);
};
ce.braceExpand = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return ce.braces(e, { ...t, expand: !0 });
};
ce.hasBraces = Pd;
var YS = ce, Vs = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.readPackageJSON = ze.extractWorkspaces = ze.isMatchWorkspaces = ze.checkWorkspaces = ze.findWorkspaceRoot = void 0;
const li = Vs(Me), WS = Vs(AT), Pc = Ft, zS = Vs(YS);
function Tt(e) {
  e || (e = process.cwd());
  let t = WS.default.sync(e);
  if (!t)
    return null;
  e = li.default.normalize(t);
  let n = null, i = e;
  do {
    const r = Ji(i);
    Zi(r);
    let { done: o, found: a } = Rd(i, e);
    if (o)
      return a;
    n = i, i = li.default.dirname(i);
  } while (i !== n);
  return null;
}
ze.findWorkspaceRoot = Tt;
function Rd(e, t) {
  const n = Ji(e), i = Zi(n);
  let r = !1, o, a;
  return i && (r = !0, a = li.default.relative(e, t), a === "" || Xs(a, i) ? o = e : o = null), {
    done: r,
    found: o,
    relativePath: a
  };
}
ze.checkWorkspaces = Rd;
function Xs(e, t) {
  return zS.default([e], t).length > 0;
}
ze.isMatchWorkspaces = Xs;
function Zi(e) {
  const t = (e || {}).workspaces;
  return t && t.packages || (Array.isArray(t) ? t : null);
}
ze.extractWorkspaces = Zi;
function Ji(e) {
  const t = li.default.join(e, "package.json");
  return Pc.existsSync(t) ? JSON.parse(Pc.readFileSync(t, "utf8")) : null;
}
ze.readPackageJSON = Ji;
Tt.findWorkspaceRoot = Tt;
Tt.readPackageJSON = Ji;
Tt.extractWorkspaces = Zi;
Tt.isMatchWorkspaces = Xs;
Tt.default = Tt;
ze.default = Tt;
const KS = ze;
var QS = KS.findWorkspaceRoot, $d = { exports: {} }, Zs = { exports: {} };
class VS {
  /// value;
  /// next;
  constructor(t) {
    this.value = t, this.next = void 0;
  }
}
let XS = class {
  // TODO: Use private class fields when targeting Node.js 12.
  // #_head;
  // #_tail;
  // #_size;
  constructor() {
    this.clear();
  }
  enqueue(t) {
    const n = new VS(t);
    this._head ? (this._tail.next = n, this._tail = n) : (this._head = n, this._tail = n), this._size++;
  }
  dequeue() {
    const t = this._head;
    if (t)
      return this._head = this._head.next, this._size--, t.value;
  }
  clear() {
    this._head = void 0, this._tail = void 0, this._size = 0;
  }
  get size() {
    return this._size;
  }
  *[Symbol.iterator]() {
    let t = this._head;
    for (; t; )
      yield t.value, t = t.next;
  }
};
var ZS = XS;
const JS = ZS, eA = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  const t = new JS();
  let n = 0;
  const i = () => {
    n--, t.size > 0 && t.dequeue()();
  }, r = async (s, u, ...c) => {
    n++;
    const l = (async () => s(...c))();
    u(l);
    try {
      await l;
    } catch {
    }
    i();
  }, o = (s, u, ...c) => {
    t.enqueue(r.bind(null, s, u, ...c)), (async () => (await Promise.resolve(), n < e && t.size > 0 && t.dequeue()()))();
  }, a = (s, ...u) => new Promise((c) => {
    o(s, c, ...u);
  });
  return Object.defineProperties(a, {
    activeCount: {
      get: () => n
    },
    pendingCount: {
      get: () => t.size
    },
    clearQueue: {
      value: () => {
        t.clear();
      }
    }
  }), a;
};
var tA = eA;
const Rc = tA;
class Id extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const nA = async (e, t) => t(await e), rA = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new Id(t[0]);
  return !1;
}, iA = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const i = Rc(n.concurrency), r = [...e].map((a) => [a, i(nA, a, t)]), o = Rc(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(r.map((a) => o(rA, a)));
  } catch (a) {
    if (a instanceof Id)
      return a.value;
    throw a;
  }
};
var aA = iA;
const Nd = Me, fi = Ft, { promisify: Fd } = Jt, oA = aA, sA = Fd(fi.stat), uA = Fd(fi.lstat), Dd = {
  directory: "isDirectory",
  file: "isFile"
};
function Md({ type: e }) {
  if (!(e in Dd))
    throw new Error(`Invalid type specified: ${e}`);
}
const Ld = (e, t) => e === void 0 || t[Dd[e]]();
Zs.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, Md(t);
  const n = t.allowSymlinks ? sA : uA;
  return oA(e, async (i) => {
    try {
      const r = await n(Nd.resolve(t.cwd, i));
      return Ld(t.type, r);
    } catch {
      return !1;
    }
  }, t);
};
Zs.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, Md(t);
  const n = t.allowSymlinks ? fi.statSync : fi.lstatSync;
  for (const i of e)
    try {
      const r = n(Nd.resolve(t.cwd, i));
      if (Ld(t.type, r))
        return i;
    } catch {
    }
};
var cA = Zs.exports;
(function(e) {
  const t = Me, n = cA, i = Ki, r = Symbol("findUp.stop");
  e.exports = async (o, a = {}) => {
    let s = t.resolve(a.cwd || "");
    const { root: u } = t.parse(s), c = [].concat(o), l = async (f) => {
      if (typeof o != "function")
        return n(c, f);
      const d = await o(f.cwd);
      return typeof d == "string" ? n([d], f) : d;
    };
    for (; ; ) {
      const f = await l({ ...a, cwd: s });
      if (f === r)
        return;
      if (f)
        return t.resolve(s, f);
      if (s === u)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (o, a = {}) => {
    let s = t.resolve(a.cwd || "");
    const { root: u } = t.parse(s), c = [].concat(o), l = (f) => {
      if (typeof o != "function")
        return n.sync(c, f);
      const d = o(f.cwd);
      return typeof d == "string" ? n.sync([d], f) : d;
    };
    for (; ; ) {
      const f = l({ ...a, cwd: s });
      if (f === r)
        return;
      if (f)
        return t.resolve(s, f);
      if (s === u)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = i, e.exports.sync.exists = i.sync, e.exports.stop = r;
})($d);
var lA = $d.exports, Js = { exports: {} }, Ct = sh, fA = process.cwd, Fr = null, dA = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Fr || (Fr = fA.call(process)), Fr;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var $c = process.chdir;
  process.chdir = function(e) {
    Fr = null, $c.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, $c);
}
var pA = hA;
function hA(e) {
  Ct.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = i(e.chmod), e.fchmod = i(e.fchmod), e.lchmod = i(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = r(e.chmodSync), e.fchmodSync = r(e.fchmodSync), e.lchmodSync = r(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = u(e.statSync), e.fstatSync = u(e.fstatSync), e.lstatSync = u(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, d, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), dA === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(d, p, h) {
      var m = Date.now(), g = 0;
      l(d, p, function v(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(p, function(A, C) {
              A && A.code === "ENOENT" ? l(d, p, v) : h(w);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        h && h(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(d, p, h, m, g, v) {
      var w;
      if (v && typeof v == "function") {
        var A = 0;
        w = function(C, x, b) {
          if (C && C.code === "EAGAIN" && A < 10)
            return A++, l.call(e, d, p, h, m, g, w);
          v.apply(this, arguments);
        };
      }
      return l.call(e, d, p, h, m, g, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, d, p, h, m) {
      for (var g = 0; ; )
        try {
          return l.call(e, f, d, p, h, m);
        } catch (v) {
          if (v.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, d, p) {
      l.open(
        f,
        Ct.O_WRONLY | Ct.O_SYMLINK,
        d,
        function(h, m) {
          if (h) {
            p && p(h);
            return;
          }
          l.fchmod(m, d, function(g) {
            l.close(m, function(v) {
              p && p(g || v);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, d) {
      var p = l.openSync(f, Ct.O_WRONLY | Ct.O_SYMLINK, d), h = !0, m;
      try {
        m = l.fchmodSync(p, d), h = !1;
      } finally {
        if (h)
          try {
            l.closeSync(p);
          } catch {
          }
        else
          l.closeSync(p);
      }
      return m;
    };
  }
  function n(l) {
    Ct.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, d, p, h) {
      l.open(f, Ct.O_SYMLINK, function(m, g) {
        if (m) {
          h && h(m);
          return;
        }
        l.futimes(g, d, p, function(v) {
          l.close(g, function(w) {
            h && h(v || w);
          });
        });
      });
    }, l.lutimesSync = function(f, d, p) {
      var h = l.openSync(f, Ct.O_SYMLINK), m, g = !0;
      try {
        m = l.futimesSync(h, d, p), g = !1;
      } finally {
        if (g)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return m;
    }) : l.futimes && (l.lutimes = function(f, d, p, h) {
      h && process.nextTick(h);
    }, l.lutimesSync = function() {
    });
  }
  function i(l) {
    return l && function(f, d, p) {
      return l.call(e, f, d, function(h) {
        c(h) && (h = null), p && p.apply(this, arguments);
      });
    };
  }
  function r(l) {
    return l && function(f, d) {
      try {
        return l.call(e, f, d);
      } catch (p) {
        if (!c(p)) throw p;
      }
    };
  }
  function o(l) {
    return l && function(f, d, p, h) {
      return l.call(e, f, d, p, function(m) {
        c(m) && (m = null), h && h.apply(this, arguments);
      });
    };
  }
  function a(l) {
    return l && function(f, d, p) {
      try {
        return l.call(e, f, d, p);
      } catch (h) {
        if (!c(h)) throw h;
      }
    };
  }
  function s(l) {
    return l && function(f, d, p) {
      typeof d == "function" && (p = d, d = null);
      function h(m, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return d ? l.call(e, f, d, h) : l.call(e, f, h);
    };
  }
  function u(l) {
    return l && function(f, d) {
      var p = d ? l.call(e, f, d) : l.call(e, f);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function c(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ic = vi.Stream, mA = gA;
function gA(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(i, r) {
    if (!(this instanceof t)) return new t(i, r);
    Ic.call(this);
    var o = this;
    this.path = i, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
    for (var a = Object.keys(r), s = 0, u = a.length; s < u; s++) {
      var c = a[s];
      this[c] = r[c];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function n(i, r) {
    if (!(this instanceof n)) return new n(i, r);
    Ic.call(this), this.path = i, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
    for (var o = Object.keys(r), a = 0, s = o.length; a < s; a++) {
      var u = o[a];
      this[u] = r[u];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var yA = wA, vA = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function wA(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: vA(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var de = Ft, bA = pA, _A = mA, EA = yA, Sr = Jt, Ie, di;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ie = Symbol.for("graceful-fs.queue"), di = Symbol.for("graceful-fs.previous")) : (Ie = "___graceful-fs.queue", di = "___graceful-fs.previous");
function TA() {
}
function jd(e, t) {
  Object.defineProperty(e, Ie, {
    get: function() {
      return t;
    }
  });
}
var Kt = TA;
Sr.debuglog ? Kt = Sr.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Kt = function() {
  var e = Sr.format.apply(Sr, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!de[Ie]) {
  var SA = F[Ie] || [];
  jd(de, SA), de.close = function(e) {
    function t(n, i) {
      return e.call(de, n, function(r) {
        r || Nc(), typeof i == "function" && i.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, di, {
      value: e
    }), t;
  }(de.close), de.closeSync = function(e) {
    function t(n) {
      e.apply(de, arguments), Nc();
    }
    return Object.defineProperty(t, di, {
      value: e
    }), t;
  }(de.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Kt(de[Ie]), ll.equal(de[Ie].length, 0);
  });
}
F[Ie] || jd(F, de[Ie]);
var kd = eu(EA(de));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !de.__patched && (kd = eu(de), de.__patched = !0);
function eu(e) {
  bA(e), e.gracefulify = eu, e.createReadStream = x, e.createWriteStream = b;
  var t = e.readFile;
  e.readFile = n;
  function n(_, R, y) {
    return typeof R == "function" && (y = R, R = null), N(_, R, y);
    function N(j, G, E, T) {
      return t(j, G, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? sn([N, [j, G, E], U, T || Date.now(), Date.now()]) : typeof E == "function" && E.apply(this, arguments);
      });
    }
  }
  var i = e.writeFile;
  e.writeFile = r;
  function r(_, R, y, N) {
    return typeof y == "function" && (N = y, y = null), j(_, R, y, N);
    function j(G, E, T, U, D) {
      return i(G, E, T, function(M) {
        M && (M.code === "EMFILE" || M.code === "ENFILE") ? sn([j, [G, E, T, U], M, D || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(_, R, y, N) {
    return typeof y == "function" && (N = y, y = null), j(_, R, y, N);
    function j(G, E, T, U, D) {
      return o(G, E, T, function(M) {
        M && (M.code === "EMFILE" || M.code === "ENFILE") ? sn([j, [G, E, T, U], M, D || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = u);
  function u(_, R, y, N) {
    return typeof y == "function" && (N = y, y = 0), j(_, R, y, N);
    function j(G, E, T, U, D) {
      return s(G, E, T, function(M) {
        M && (M.code === "EMFILE" || M.code === "ENFILE") ? sn([j, [G, E, T, U], M, D || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var c = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(_, R, y) {
    typeof R == "function" && (y = R, R = null);
    var N = l.test(process.version) ? function(E, T, U, D) {
      return c(E, j(
        E,
        T,
        U,
        D
      ));
    } : function(E, T, U, D) {
      return c(E, T, j(
        E,
        T,
        U,
        D
      ));
    };
    return N(_, R, y);
    function j(G, E, T, U) {
      return function(D, M) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? sn([
          N,
          [G, E, T],
          D,
          U || Date.now(),
          Date.now()
        ]) : (M && M.sort && M.sort(), typeof T == "function" && T.call(this, D, M));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = _A(e);
    v = d.ReadStream, A = d.WriteStream;
  }
  var p = e.ReadStream;
  p && (v.prototype = Object.create(p.prototype), v.prototype.open = w);
  var h = e.WriteStream;
  h && (A.prototype = Object.create(h.prototype), A.prototype.open = C), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(_) {
      v = _;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return A;
    },
    set: function(_) {
      A = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var m = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return m;
    },
    set: function(_) {
      m = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = A;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(_) {
      g = _;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(_, R) {
    return this instanceof v ? (p.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function w() {
    var _ = this;
    S(_.path, _.flags, _.mode, function(R, y) {
      R ? (_.autoClose && _.destroy(), _.emit("error", R)) : (_.fd = y, _.emit("open", y), _.read());
    });
  }
  function A(_, R) {
    return this instanceof A ? (h.apply(this, arguments), this) : A.apply(Object.create(A.prototype), arguments);
  }
  function C() {
    var _ = this;
    S(_.path, _.flags, _.mode, function(R, y) {
      R ? (_.destroy(), _.emit("error", R)) : (_.fd = y, _.emit("open", y));
    });
  }
  function x(_, R) {
    return new e.ReadStream(_, R);
  }
  function b(_, R) {
    return new e.WriteStream(_, R);
  }
  var O = e.open;
  e.open = S;
  function S(_, R, y, N) {
    return typeof y == "function" && (N = y, y = null), j(_, R, y, N);
    function j(G, E, T, U, D) {
      return O(G, E, T, function(M, z) {
        M && (M.code === "EMFILE" || M.code === "ENFILE") ? sn([j, [G, E, T, U], M, D || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  return e;
}
function sn(e) {
  Kt("ENQUEUE", e[0].name, e[1]), de[Ie].push(e), tu();
}
var Ar;
function Nc() {
  for (var e = Date.now(), t = 0; t < de[Ie].length; ++t)
    de[Ie][t].length > 2 && (de[Ie][t][3] = e, de[Ie][t][4] = e);
  tu();
}
function tu() {
  if (clearTimeout(Ar), Ar = void 0, de[Ie].length !== 0) {
    var e = de[Ie].shift(), t = e[0], n = e[1], i = e[2], r = e[3], o = e[4];
    if (r === void 0)
      Kt("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - r >= 6e4) {
      Kt("TIMEOUT", t.name, n);
      var a = n.pop();
      typeof a == "function" && a.call(null, i);
    } else {
      var s = Date.now() - o, u = Math.max(o - r, 1), c = Math.min(u * 1.2, 100);
      s >= c ? (Kt("RETRY", t.name, n), t.apply(null, n.concat([r]))) : de[Ie].push(e);
    }
    Ar === void 0 && (Ar = setTimeout(tu, 0));
  }
}
const Fc = (e, t) => function(...n) {
  const i = t.promiseModule;
  return new i((r, o) => {
    t.multiArgs ? n.push((...a) => {
      t.errorFirst ? a[0] ? o(a) : (a.shift(), r(a)) : r(a);
    }) : t.errorFirst ? n.push((a, s) => {
      a ? o(a) : r(s);
    }) : n.push(r), e.apply(this, n);
  });
};
var AA = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const n = typeof e;
  if (!(e !== null && (n === "object" || n === "function")))
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : n}\``);
  const i = (o) => {
    const a = (s) => typeof s == "string" ? o === s : s.test(o);
    return t.include ? t.include.some(a) : !t.exclude.some(a);
  };
  let r;
  n === "function" ? r = function(...o) {
    return t.excludeMain ? e(...o) : Fc(e, t).apply(this, o);
  } : r = Object.create(Object.getPrototypeOf(e));
  for (const o in e) {
    const a = e[o];
    r[o] = typeof a == "function" && i(o) ? Fc(a, t) : a;
  }
  return r;
}, OA = (e) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string, got " + typeof e);
  return e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}, ge = {}, cr = {}, tt = {};
function Ud(e) {
  return typeof e > "u" || e === null;
}
function CA(e) {
  return typeof e == "object" && e !== null;
}
function xA(e) {
  return Array.isArray(e) ? e : Ud(e) ? [] : [e];
}
function PA(e, t) {
  var n, i, r, o;
  if (t)
    for (o = Object.keys(t), n = 0, i = o.length; n < i; n += 1)
      r = o[n], e[r] = t[r];
  return e;
}
function RA(e, t) {
  var n = "", i;
  for (i = 0; i < t; i += 1)
    n += e;
  return n;
}
function $A(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
tt.isNothing = Ud;
tt.isObject = CA;
tt.toArray = xA;
tt.repeat = RA;
tt.isNegativeZero = $A;
tt.extend = PA;
function Jn(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Jn.prototype = Object.create(Error.prototype);
Jn.prototype.constructor = Jn;
Jn.prototype.toString = function(t) {
  var n = this.name + ": ";
  return n += this.reason || "(unknown reason)", !t && this.mark && (n += " " + this.mark.toString()), n;
};
var lr = Jn, Dc = tt;
function nu(e, t, n, i, r) {
  this.name = e, this.buffer = t, this.position = n, this.line = i, this.column = r;
}
nu.prototype.getSnippet = function(t, n) {
  var i, r, o, a, s;
  if (!this.buffer) return null;
  for (t = t || 4, n = n || 75, i = "", r = this.position; r > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(r - 1)) === -1; )
    if (r -= 1, this.position - r > n / 2 - 1) {
      i = " ... ", r += 5;
      break;
    }
  for (o = "", a = this.position; a < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(a)) === -1; )
    if (a += 1, a - this.position > n / 2 - 1) {
      o = " ... ", a -= 5;
      break;
    }
  return s = this.buffer.slice(r, a), Dc.repeat(" ", t) + i + s + o + `
` + Dc.repeat(" ", t + this.position - r + i.length) + "^";
};
nu.prototype.toString = function(t) {
  var n, i = "";
  return this.name && (i += 'in "' + this.name + '" '), i += "at line " + (this.line + 1) + ", column " + (this.column + 1), t || (n = this.getSnippet(), n && (i += `:
` + n)), i;
};
var IA = nu, Mc = lr, NA = [
  "kind",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "defaultStyle",
  "styleAliases"
], FA = [
  "scalar",
  "sequence",
  "mapping"
];
function DA(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(i) {
      t[String(i)] = n;
    });
  }), t;
}
function MA(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (NA.indexOf(n) === -1)
      throw new Mc('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.defaultStyle = t.defaultStyle || null, this.styleAliases = DA(t.styleAliases || null), FA.indexOf(this.kind) === -1)
    throw new Mc('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Re = MA, Lc = tt, Dr = lr, LA = Re;
function co(e, t, n) {
  var i = [];
  return e.include.forEach(function(r) {
    n = co(r, t, n);
  }), e[t].forEach(function(r) {
    n.forEach(function(o, a) {
      o.tag === r.tag && o.kind === r.kind && i.push(a);
    }), n.push(r);
  }), n.filter(function(r, o) {
    return i.indexOf(o) === -1;
  });
}
function jA() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, t, n;
  function i(r) {
    e[r.kind][r.tag] = e.fallback[r.tag] = r;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(i);
  return e;
}
function gn(e) {
  this.include = e.include || [], this.implicit = e.implicit || [], this.explicit = e.explicit || [], this.implicit.forEach(function(t) {
    if (t.loadKind && t.loadKind !== "scalar")
      throw new Dr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
  }), this.compiledImplicit = co(this, "implicit", []), this.compiledExplicit = co(this, "explicit", []), this.compiledTypeMap = jA(this.compiledImplicit, this.compiledExplicit);
}
gn.DEFAULT = null;
gn.create = function() {
  var t, n;
  switch (arguments.length) {
    case 1:
      t = gn.DEFAULT, n = arguments[0];
      break;
    case 2:
      t = arguments[0], n = arguments[1];
      break;
    default:
      throw new Dr("Wrong number of arguments for Schema.create function");
  }
  if (t = Lc.toArray(t), n = Lc.toArray(n), !t.every(function(i) {
    return i instanceof gn;
  }))
    throw new Dr("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
  if (!n.every(function(i) {
    return i instanceof LA;
  }))
    throw new Dr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  return new gn({
    include: t,
    explicit: n
  });
};
var Fn = gn, kA = Re, UA = new kA("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), BA = Re, HA = new BA("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), qA = Re, GA = new qA("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), YA = Fn, ru = new YA({
  explicit: [
    UA,
    HA,
    GA
  ]
}), WA = Re;
function zA(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function KA() {
  return null;
}
function QA(e) {
  return e === null;
}
var VA = new WA("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: zA,
  construct: KA,
  predicate: QA,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    }
  },
  defaultStyle: "lowercase"
}), XA = Re;
function ZA(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function JA(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function e1(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var t1 = new XA("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: ZA,
  construct: JA,
  predicate: e1,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), n1 = tt, r1 = Re;
function i1(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function a1(e) {
  return 48 <= e && e <= 55;
}
function o1(e) {
  return 48 <= e && e <= 57;
}
function s1(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, i = !1, r;
  if (!t) return !1;
  if (r = e[n], (r === "-" || r === "+") && (r = e[++n]), r === "0") {
    if (n + 1 === t) return !0;
    if (r = e[++n], r === "b") {
      for (n++; n < t; n++)
        if (r = e[n], r !== "_") {
          if (r !== "0" && r !== "1") return !1;
          i = !0;
        }
      return i && r !== "_";
    }
    if (r === "x") {
      for (n++; n < t; n++)
        if (r = e[n], r !== "_") {
          if (!i1(e.charCodeAt(n))) return !1;
          i = !0;
        }
      return i && r !== "_";
    }
    for (; n < t; n++)
      if (r = e[n], r !== "_") {
        if (!a1(e.charCodeAt(n))) return !1;
        i = !0;
      }
    return i && r !== "_";
  }
  if (r === "_") return !1;
  for (; n < t; n++)
    if (r = e[n], r !== "_") {
      if (r === ":") break;
      if (!o1(e.charCodeAt(n)))
        return !1;
      i = !0;
    }
  return !i || r === "_" ? !1 : r !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(n));
}
function u1(e) {
  var t = e, n = 1, i, r, o = [];
  return t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), i = t[0], (i === "-" || i === "+") && (i === "-" && (n = -1), t = t.slice(1), i = t[0]), t === "0" ? 0 : i === "0" ? t[1] === "b" ? n * parseInt(t.slice(2), 2) : t[1] === "x" ? n * parseInt(t, 16) : n * parseInt(t, 8) : t.indexOf(":") !== -1 ? (t.split(":").forEach(function(a) {
    o.unshift(parseInt(a, 10));
  }), t = 0, r = 1, o.forEach(function(a) {
    t += a * r, r *= 60;
  }), n * t) : n * parseInt(t, 10);
}
function c1(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !n1.isNegativeZero(e);
}
var l1 = new r1("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: s1,
  construct: u1,
  predicate: c1,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0" + e.toString(8) : "-0" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Bd = tt, f1 = Re, d1 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function p1(e) {
  return !(e === null || !d1.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function h1(e) {
  var t, n, i, r;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, r = [], "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : t.indexOf(":") >= 0 ? (t.split(":").forEach(function(o) {
    r.unshift(parseFloat(o, 10));
  }), t = 0, i = 1, r.forEach(function(o) {
    t += o * i, i *= 60;
  }), n * t) : n * parseFloat(t, 10);
}
var m1 = /^[-+]?[0-9]+e/;
function g1(e, t) {
  var n;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Bd.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), m1.test(n) ? n.replace("e", ".e") : n;
}
function y1(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Bd.isNegativeZero(e));
}
var v1 = new f1("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: p1,
  construct: h1,
  predicate: y1,
  represent: g1,
  defaultStyle: "lowercase"
}), w1 = Fn, Hd = new w1({
  include: [
    ru
  ],
  implicit: [
    VA,
    t1,
    l1,
    v1
  ]
}), b1 = Fn, qd = new b1({
  include: [
    Hd
  ]
}), _1 = Re, Gd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Yd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function E1(e) {
  return e === null ? !1 : Gd.exec(e) !== null || Yd.exec(e) !== null;
}
function T1(e) {
  var t, n, i, r, o, a, s, u = 0, c = null, l, f, d;
  if (t = Gd.exec(e), t === null && (t = Yd.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], i = +t[2] - 1, r = +t[3], !t[4])
    return new Date(Date.UTC(n, i, r));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (u = t[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return t[9] && (l = +t[10], f = +(t[11] || 0), c = (l * 60 + f) * 6e4, t[9] === "-" && (c = -c)), d = new Date(Date.UTC(n, i, r, o, a, s, u)), c && d.setTime(d.getTime() - c), d;
}
function S1(e) {
  return e.toISOString();
}
var A1 = new _1("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: E1,
  construct: T1,
  instanceOf: Date,
  represent: S1
}), O1 = Re;
function C1(e) {
  return e === "<<" || e === null;
}
var x1 = new O1("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: C1
});
function Wd(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Gt;
try {
  var P1 = Wd;
  Gt = P1("buffer").Buffer;
} catch {
}
var R1 = Re, iu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function $1(e) {
  if (e === null) return !1;
  var t, n, i = 0, r = e.length, o = iu;
  for (n = 0; n < r; n++)
    if (t = o.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function I1(e) {
  var t, n, i = e.replace(/[\r\n=]/g, ""), r = i.length, o = iu, a = 0, s = [];
  for (t = 0; t < r; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(i.charAt(t));
  return n = r % 4 * 6, n === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : n === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : n === 12 && s.push(a >> 4 & 255), Gt ? Gt.from ? Gt.from(s) : new Gt(s) : s;
}
function N1(e) {
  var t = "", n = 0, i, r, o = e.length, a = iu;
  for (i = 0; i < o; i++)
    i % 3 === 0 && i && (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]), n = (n << 8) + e[i];
  return r = o % 3, r === 0 ? (t += a[n >> 18 & 63], t += a[n >> 12 & 63], t += a[n >> 6 & 63], t += a[n & 63]) : r === 2 ? (t += a[n >> 10 & 63], t += a[n >> 4 & 63], t += a[n << 2 & 63], t += a[64]) : r === 1 && (t += a[n >> 2 & 63], t += a[n << 4 & 63], t += a[64], t += a[64]), t;
}
function F1(e) {
  return Gt && Gt.isBuffer(e);
}
var D1 = new R1("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: $1,
  construct: I1,
  predicate: F1,
  represent: N1
}), M1 = Re, L1 = Object.prototype.hasOwnProperty, j1 = Object.prototype.toString;
function k1(e) {
  if (e === null) return !0;
  var t = [], n, i, r, o, a, s = e;
  for (n = 0, i = s.length; n < i; n += 1) {
    if (r = s[n], a = !1, j1.call(r) !== "[object Object]") return !1;
    for (o in r)
      if (L1.call(r, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function U1(e) {
  return e !== null ? e : [];
}
var B1 = new M1("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: k1,
  construct: U1
}), H1 = Re, q1 = Object.prototype.toString;
function G1(e) {
  if (e === null) return !0;
  var t, n, i, r, o, a = e;
  for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) {
    if (i = a[t], q1.call(i) !== "[object Object]" || (r = Object.keys(i), r.length !== 1)) return !1;
    o[t] = [r[0], i[r[0]]];
  }
  return !0;
}
function Y1(e) {
  if (e === null) return [];
  var t, n, i, r, o, a = e;
  for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1)
    i = a[t], r = Object.keys(i), o[t] = [r[0], i[r[0]]];
  return o;
}
var W1 = new H1("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: G1,
  construct: Y1
}), z1 = Re, K1 = Object.prototype.hasOwnProperty;
function Q1(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (K1.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function V1(e) {
  return e !== null ? e : {};
}
var X1 = new z1("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Q1,
  construct: V1
}), Z1 = Fn, fr = new Z1({
  include: [
    qd
  ],
  implicit: [
    A1,
    x1
  ],
  explicit: [
    D1,
    B1,
    W1,
    X1
  ]
}), J1 = Re;
function eO() {
  return !0;
}
function tO() {
}
function nO() {
  return "";
}
function rO(e) {
  return typeof e > "u";
}
var iO = new J1("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve: eO,
  construct: tO,
  predicate: rO,
  represent: nO
}), aO = Re;
function oO(e) {
  if (e === null || e.length === 0) return !1;
  var t = e, n = /\/([gim]*)$/.exec(e), i = "";
  return !(t[0] === "/" && (n && (i = n[1]), i.length > 3 || t[t.length - i.length - 1] !== "/"));
}
function sO(e) {
  var t = e, n = /\/([gim]*)$/.exec(e), i = "";
  return t[0] === "/" && (n && (i = n[1]), t = t.slice(1, t.length - i.length - 1)), new RegExp(t, i);
}
function uO(e) {
  var t = "/" + e.source + "/";
  return e.global && (t += "g"), e.multiline && (t += "m"), e.ignoreCase && (t += "i"), t;
}
function cO(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var lO = new aO("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve: oO,
  construct: sO,
  predicate: cO,
  represent: uO
}), pi;
try {
  var fO = Wd;
  pi = fO("esprima");
} catch {
  typeof window < "u" && (pi = window.esprima);
}
var dO = Re;
function pO(e) {
  if (e === null) return !1;
  try {
    var t = "(" + e + ")", n = pi.parse(t, { range: !0 });
    return !(n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression");
  } catch {
    return !1;
  }
}
function hO(e) {
  var t = "(" + e + ")", n = pi.parse(t, { range: !0 }), i = [], r;
  if (n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression")
    throw new Error("Failed to resolve function");
  return n.body[0].expression.params.forEach(function(o) {
    i.push(o.name);
  }), r = n.body[0].expression.body.range, n.body[0].expression.body.type === "BlockStatement" ? new Function(i, t.slice(r[0] + 1, r[1] - 1)) : new Function(i, "return " + t.slice(r[0], r[1]));
}
function mO(e) {
  return e.toString();
}
function gO(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
var yO = new dO("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve: pO,
  construct: hO,
  predicate: gO,
  represent: mO
}), jc = Fn, ea = jc.DEFAULT = new jc({
  include: [
    fr
  ],
  explicit: [
    iO,
    lO,
    yO
  ]
}), wt = tt, zd = lr, vO = IA, Kd = fr, wO = ea, Nt = Object.prototype.hasOwnProperty, hi = 1, Qd = 2, Vd = 3, mi = 4, $a = 1, bO = 2, kc = 3, _O = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, EO = /[\x85\u2028\u2029]/, TO = /[,\[\]\{\}]/, Xd = /^(?:!|!!|![a-z\-]+!)$/i, Zd = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Uc(e) {
  return Object.prototype.toString.call(e);
}
function lt(e) {
  return e === 10 || e === 13;
}
function Qt(e) {
  return e === 9 || e === 32;
}
function Ge(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function yn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function SO(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function AO(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function OO(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Bc(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function CO(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Jd = new Array(256), ep = new Array(256);
for (var un = 0; un < 256; un++)
  Jd[un] = Bc(un) ? 1 : 0, ep[un] = Bc(un);
function xO(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || wO, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
}
function tp(e, t) {
  return new zd(
    t,
    new vO(e.filename, e.input, e.position, e.line, e.position - e.lineStart)
  );
}
function W(e, t) {
  throw tp(e, t);
}
function gi(e, t) {
  e.onWarning && e.onWarning.call(null, tp(e, t));
}
var Hc = {
  YAML: function(t, n, i) {
    var r, o, a;
    t.version !== null && W(t, "duplication of %YAML directive"), i.length !== 1 && W(t, "YAML directive accepts exactly one argument"), r = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), r === null && W(t, "ill-formed argument of the YAML directive"), o = parseInt(r[1], 10), a = parseInt(r[2], 10), o !== 1 && W(t, "unacceptable YAML version of the document"), t.version = i[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && gi(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, i) {
    var r, o;
    i.length !== 2 && W(t, "TAG directive accepts exactly two arguments"), r = i[0], o = i[1], Xd.test(r) || W(t, "ill-formed tag handle (first argument) of the TAG directive"), Nt.call(t.tagMap, r) && W(t, 'there is a previously declared suffix for "' + r + '" tag handle'), Zd.test(o) || W(t, "ill-formed tag prefix (second argument) of the TAG directive"), t.tagMap[r] = o;
  }
};
function $t(e, t, n, i) {
  var r, o, a, s;
  if (t < n) {
    if (s = e.input.slice(t, n), i)
      for (r = 0, o = s.length; r < o; r += 1)
        a = s.charCodeAt(r), a === 9 || 32 <= a && a <= 1114111 || W(e, "expected valid JSON character");
    else _O.test(s) && W(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function qc(e, t, n, i) {
  var r, o, a, s;
  for (wt.isObject(n) || W(e, "cannot merge mappings; the provided source object is unacceptable"), r = Object.keys(n), a = 0, s = r.length; a < s; a += 1)
    o = r[a], Nt.call(t, o) || (t[o] = n[o], i[o] = !0);
}
function vn(e, t, n, i, r, o, a, s) {
  var u, c;
  if (Array.isArray(r))
    for (r = Array.prototype.slice.call(r), u = 0, c = r.length; u < c; u += 1)
      Array.isArray(r[u]) && W(e, "nested arrays are not supported inside keys"), typeof r == "object" && Uc(r[u]) === "[object Object]" && (r[u] = "[object Object]");
  if (typeof r == "object" && Uc(r) === "[object Object]" && (r = "[object Object]"), r = String(r), t === null && (t = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (u = 0, c = o.length; u < c; u += 1)
        qc(e, t, o[u], n);
    else
      qc(e, t, o, n);
  else
    !e.json && !Nt.call(n, r) && Nt.call(t, r) && (e.line = a || e.line, e.position = s || e.position, W(e, "duplicated mapping key")), t[r] = o, delete n[r];
  return t;
}
function au(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : W(e, "a line break is expected"), e.line += 1, e.lineStart = e.position;
}
function Ae(e, t, n) {
  for (var i = 0, r = e.input.charCodeAt(e.position); r !== 0; ) {
    for (; Qt(r); )
      r = e.input.charCodeAt(++e.position);
    if (t && r === 35)
      do
        r = e.input.charCodeAt(++e.position);
      while (r !== 10 && r !== 13 && r !== 0);
    if (lt(r))
      for (au(e), r = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; r === 32; )
        e.lineIndent++, r = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && i !== 0 && e.lineIndent < n && gi(e, "deficient indentation"), i;
}
function ta(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Ge(n)));
}
function ou(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += wt.repeat(`
`, t - 1));
}
function PO(e, t, n) {
  var i, r, o, a, s, u, c, l, f = e.kind, d = e.result, p;
  if (p = e.input.charCodeAt(e.position), Ge(p) || yn(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (r = e.input.charCodeAt(e.position + 1), Ge(r) || n && yn(r)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; p !== 0; ) {
    if (p === 58) {
      if (r = e.input.charCodeAt(e.position + 1), Ge(r) || n && yn(r))
        break;
    } else if (p === 35) {
      if (i = e.input.charCodeAt(e.position - 1), Ge(i))
        break;
    } else {
      if (e.position === e.lineStart && ta(e) || n && yn(p))
        break;
      if (lt(p))
        if (u = e.line, c = e.lineStart, l = e.lineIndent, Ae(e, !1, -1), e.lineIndent >= t) {
          s = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = u, e.lineStart = c, e.lineIndent = l;
          break;
        }
    }
    s && ($t(e, o, a, !1), ou(e, e.line - u), o = a = e.position, s = !1), Qt(p) || (a = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return $t(e, o, a, !1), e.result ? !0 : (e.kind = f, e.result = d, !1);
}
function RO(e, t) {
  var n, i, r;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if ($t(e, i, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        i = e.position, e.position++, r = e.position;
      else
        return !0;
    else lt(n) ? ($t(e, i, r, !0), ou(e, Ae(e, !1, t)), i = r = e.position) : e.position === e.lineStart && ta(e) ? W(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position);
  W(e, "unexpected end of the stream within a single quoted scalar");
}
function $O(e, t) {
  var n, i, r, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return $t(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if ($t(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), lt(s))
        Ae(e, !1, t);
      else if (s < 256 && Jd[s])
        e.result += ep[s], e.position++;
      else if ((a = AO(s)) > 0) {
        for (r = a, o = 0; r > 0; r--)
          s = e.input.charCodeAt(++e.position), (a = SO(s)) >= 0 ? o = (o << 4) + a : W(e, "expected hexadecimal character");
        e.result += CO(o), e.position++;
      } else
        W(e, "unknown escape sequence");
      n = i = e.position;
    } else lt(s) ? ($t(e, n, i, !0), ou(e, Ae(e, !1, t)), n = i = e.position) : e.position === e.lineStart && ta(e) ? W(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  W(e, "unexpected end of the stream within a double quoted scalar");
}
function IO(e, t) {
  var n = !0, i, r = e.tag, o, a = e.anchor, s, u, c, l, f, d = {}, p, h, m, g;
  if (g = e.input.charCodeAt(e.position), g === 91)
    u = 93, f = !1, o = [];
  else if (g === 123)
    u = 125, f = !0, o = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), g = e.input.charCodeAt(++e.position); g !== 0; ) {
    if (Ae(e, !0, t), g = e.input.charCodeAt(e.position), g === u)
      return e.position++, e.tag = r, e.anchor = a, e.kind = f ? "mapping" : "sequence", e.result = o, !0;
    n || W(e, "missed comma between flow collection entries"), h = p = m = null, c = l = !1, g === 63 && (s = e.input.charCodeAt(e.position + 1), Ge(s) && (c = l = !0, e.position++, Ae(e, !0, t))), i = e.line, Tn(e, t, hi, !1, !0), h = e.tag, p = e.result, Ae(e, !0, t), g = e.input.charCodeAt(e.position), (l || e.line === i) && g === 58 && (c = !0, g = e.input.charCodeAt(++e.position), Ae(e, !0, t), Tn(e, t, hi, !1, !0), m = e.result), f ? vn(e, o, d, h, p, m) : c ? o.push(vn(e, null, d, h, p, m)) : o.push(p), Ae(e, !0, t), g = e.input.charCodeAt(e.position), g === 44 ? (n = !0, g = e.input.charCodeAt(++e.position)) : n = !1;
  }
  W(e, "unexpected end of the stream within a flow collection");
}
function NO(e, t) {
  var n, i, r = $a, o = !1, a = !1, s = t, u = 0, c = !1, l, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    i = !1;
  else if (f === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      $a === r ? r = f === 43 ? kc : bO : W(e, "repeat of a chomping mode identifier");
    else if ((l = OO(f)) >= 0)
      l === 0 ? W(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? W(e, "repeat of an indentation width identifier") : (s = t + l - 1, a = !0);
    else
      break;
  if (Qt(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Qt(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!lt(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (au(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), lt(f)) {
      u++;
      continue;
    }
    if (e.lineIndent < s) {
      r === kc ? e.result += wt.repeat(`
`, o ? 1 + u : u) : r === $a && o && (e.result += `
`);
      break;
    }
    for (i ? Qt(f) ? (c = !0, e.result += wt.repeat(`
`, o ? 1 + u : u)) : c ? (c = !1, e.result += wt.repeat(`
`, u + 1)) : u === 0 ? o && (e.result += " ") : e.result += wt.repeat(`
`, u) : e.result += wt.repeat(`
`, o ? 1 + u : u), o = !0, a = !0, u = 0, n = e.position; !lt(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    $t(e, n, e.position, !1);
  }
  return !0;
}
function Gc(e, t) {
  var n, i = e.tag, r = e.anchor, o = [], a, s = !1, u;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), u = e.input.charCodeAt(e.position); u !== 0 && !(u !== 45 || (a = e.input.charCodeAt(e.position + 1), !Ge(a))); ) {
    if (s = !0, e.position++, Ae(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), u = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, Tn(e, t, Vd, !1, !0), o.push(e.result), Ae(e, !0, -1), u = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && u !== 0)
      W(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = i, e.anchor = r, e.kind = "sequence", e.result = o, !0) : !1;
}
function FO(e, t, n) {
  var i, r, o, a, s = e.tag, u = e.anchor, c = {}, l = {}, f = null, d = null, p = null, h = !1, m = !1, g;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), g = e.input.charCodeAt(e.position); g !== 0; ) {
    if (i = e.input.charCodeAt(e.position + 1), o = e.line, a = e.position, (g === 63 || g === 58) && Ge(i))
      g === 63 ? (h && (vn(e, c, l, f, d, null), f = d = p = null), m = !0, h = !0, r = !0) : h ? (h = !1, r = !0) : W(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, g = i;
    else if (Tn(e, n, Qd, !1, !0))
      if (e.line === o) {
        for (g = e.input.charCodeAt(e.position); Qt(g); )
          g = e.input.charCodeAt(++e.position);
        if (g === 58)
          g = e.input.charCodeAt(++e.position), Ge(g) || W(e, "a whitespace character is expected after the key-value separator within a block mapping"), h && (vn(e, c, l, f, d, null), f = d = p = null), m = !0, h = !1, r = !1, f = e.tag, d = e.result;
        else if (m)
          W(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = s, e.anchor = u, !0;
      } else if (m)
        W(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = s, e.anchor = u, !0;
    else
      break;
    if ((e.line === o || e.lineIndent > t) && (Tn(e, t, mi, !0, r) && (h ? d = e.result : p = e.result), h || (vn(e, c, l, f, d, p, o, a), f = d = p = null), Ae(e, !0, -1), g = e.input.charCodeAt(e.position)), e.lineIndent > t && g !== 0)
      W(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return h && vn(e, c, l, f, d, null), m && (e.tag = s, e.anchor = u, e.kind = "mapping", e.result = c), m;
}
function DO(e) {
  var t, n = !1, i = !1, r, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && W(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (n = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (i = !0, r = "!!", a = e.input.charCodeAt(++e.position)) : r = "!", t = e.position, n) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : W(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Ge(a); )
      a === 33 && (i ? W(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(t - 1, e.position + 1), Xd.test(r) || W(e, "named tag handle cannot contain such characters"), i = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), TO.test(o) && W(e, "tag suffix cannot contain flow indicator characters");
  }
  return o && !Zd.test(o) && W(e, "tag name cannot contain such characters: " + o), n ? e.tag = o : Nt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + o : r === "!" ? e.tag = "!" + o : r === "!!" ? e.tag = "tag:yaml.org,2002:" + o : W(e, 'undeclared tag handle "' + r + '"'), !0;
}
function MO(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && W(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ge(n) && !yn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && W(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function LO(e) {
  var t, n, i;
  if (i = e.input.charCodeAt(e.position), i !== 42) return !1;
  for (i = e.input.charCodeAt(++e.position), t = e.position; i !== 0 && !Ge(i) && !yn(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === t && W(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), Nt.call(e.anchorMap, n) || W(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], Ae(e, !0, -1), !0;
}
function Tn(e, t, n, i, r) {
  var o, a, s, u = 1, c = !1, l = !1, f, d, p, h, m;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = mi === n || Vd === n, i && Ae(e, !0, -1) && (c = !0, e.lineIndent > t ? u = 1 : e.lineIndent === t ? u = 0 : e.lineIndent < t && (u = -1)), u === 1)
    for (; DO(e) || MO(e); )
      Ae(e, !0, -1) ? (c = !0, s = o, e.lineIndent > t ? u = 1 : e.lineIndent === t ? u = 0 : e.lineIndent < t && (u = -1)) : s = !1;
  if (s && (s = c || r), (u === 1 || mi === n) && (hi === n || Qd === n ? h = t : h = t + 1, m = e.position - e.lineStart, u === 1 ? s && (Gc(e, m) || FO(e, m, h)) || IO(e, h) ? l = !0 : (a && NO(e, h) || RO(e, h) || $O(e, h) ? l = !0 : LO(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && W(e, "alias node should not have any properties")) : PO(e, h, hi === n) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : u === 0 && (l = s && Gc(e, m))), e.tag !== null && e.tag !== "!")
    if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && W(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, d = e.implicitTypes.length; f < d; f += 1)
        if (p = e.implicitTypes[f], p.resolve(e.result)) {
          e.result = p.construct(e.result), e.tag = p.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else Nt.call(e.typeMap[e.kind || "fallback"], e.tag) ? (p = e.typeMap[e.kind || "fallback"][e.tag], e.result !== null && p.kind !== e.kind && W(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + p.kind + '", not "' + e.kind + '"'), p.resolve(e.result) ? (e.result = p.construct(e.result), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : W(e, "cannot resolve a node with !<" + e.tag + "> explicit tag")) : W(e, "unknown tag !<" + e.tag + ">");
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function jO(e) {
  var t = e.position, n, i, r, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {}; (a = e.input.charCodeAt(e.position)) !== 0 && (Ae(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), n = e.position; a !== 0 && !Ge(a); )
      a = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(n, e.position), r = [], i.length < 1 && W(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Qt(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !lt(a));
        break;
      }
      if (lt(a)) break;
      for (n = e.position; a !== 0 && !Ge(a); )
        a = e.input.charCodeAt(++e.position);
      r.push(e.input.slice(n, e.position));
    }
    a !== 0 && au(e), Nt.call(Hc, i) ? Hc[i](e, i, r) : gi(e, 'unknown document directive "' + i + '"');
  }
  if (Ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ae(e, !0, -1)) : o && W(e, "directives end mark is expected"), Tn(e, e.lineIndent - 1, mi, !1, !0), Ae(e, !0, -1), e.checkLineBreaks && EO.test(e.input.slice(t, e.position)) && gi(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && ta(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ae(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    W(e, "end of the stream or a document separator is expected");
  else
    return;
}
function np(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new xO(e, t), i = e.indexOf("\0");
  for (i !== -1 && (n.position = i, W(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    jO(n);
  return n.documents;
}
function rp(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var i = np(e, n);
  if (typeof t != "function")
    return i;
  for (var r = 0, o = i.length; r < o; r += 1)
    t(i[r]);
}
function ip(e, t) {
  var n = np(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new zd("expected a single document in the stream, but found more");
  }
}
function kO(e, t, n) {
  return typeof t == "object" && t !== null && typeof n > "u" && (n = t, t = null), rp(e, t, wt.extend({ schema: Kd }, n));
}
function UO(e, t) {
  return ip(e, wt.extend({ schema: Kd }, t));
}
cr.loadAll = rp;
cr.load = ip;
cr.safeLoadAll = kO;
cr.safeLoad = UO;
var su = {}, dr = tt, pr = lr, BO = ea, HO = fr, ap = Object.prototype.toString, op = Object.prototype.hasOwnProperty, qO = 9, er = 10, GO = 13, YO = 32, WO = 33, zO = 34, sp = 35, KO = 37, QO = 38, VO = 39, XO = 42, up = 44, ZO = 45, cp = 58, JO = 61, eC = 62, tC = 63, nC = 64, lp = 91, fp = 93, rC = 96, dp = 123, iC = 124, pp = 125, Le = {};
Le[0] = "\\0";
Le[7] = "\\a";
Le[8] = "\\b";
Le[9] = "\\t";
Le[10] = "\\n";
Le[11] = "\\v";
Le[12] = "\\f";
Le[13] = "\\r";
Le[27] = "\\e";
Le[34] = '\\"';
Le[92] = "\\\\";
Le[133] = "\\N";
Le[160] = "\\_";
Le[8232] = "\\L";
Le[8233] = "\\P";
var aC = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
function oC(e, t) {
  var n, i, r, o, a, s, u;
  if (t === null) return {};
  for (n = {}, i = Object.keys(t), r = 0, o = i.length; r < o; r += 1)
    a = i[r], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), u = e.compiledTypeMap.fallback[a], u && op.call(u.styleAliases, s) && (s = u.styleAliases[s]), n[a] = s;
  return n;
}
function Yc(e) {
  var t, n, i;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", i = 2;
  else if (e <= 65535)
    n = "u", i = 4;
  else if (e <= 4294967295)
    n = "U", i = 8;
  else
    throw new pr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + dr.repeat("0", i - t.length) + t;
}
function sC(e) {
  this.schema = e.schema || BO, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = dr.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = oC(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Wc(e, t) {
  for (var n = dr.repeat(" ", t), i = 0, r = -1, o = "", a, s = e.length; i < s; )
    r = e.indexOf(`
`, i), r === -1 ? (a = e.slice(i), i = s) : (a = e.slice(i, r + 1), i = r + 1), a.length && a !== `
` && (o += n), o += a;
  return o;
}
function lo(e, t) {
  return `
` + dr.repeat(" ", e.indent * t);
}
function uC(e, t) {
  var n, i, r;
  for (n = 0, i = e.implicitTypes.length; n < i; n += 1)
    if (r = e.implicitTypes[n], r.resolve(t))
      return !0;
  return !1;
}
function uu(e) {
  return e === YO || e === qO;
}
function Sn(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== 65279 || 65536 <= e && e <= 1114111;
}
function cC(e) {
  return Sn(e) && !uu(e) && e !== 65279 && e !== GO && e !== er;
}
function zc(e, t) {
  return Sn(e) && e !== 65279 && e !== up && e !== lp && e !== fp && e !== dp && e !== pp && e !== cp && (e !== sp || t && cC(t));
}
function lC(e) {
  return Sn(e) && e !== 65279 && !uu(e) && e !== ZO && e !== tC && e !== cp && e !== up && e !== lp && e !== fp && e !== dp && e !== pp && e !== sp && e !== QO && e !== XO && e !== WO && e !== iC && e !== JO && e !== eC && e !== VO && e !== zO && e !== KO && e !== nC && e !== rC;
}
function hp(e) {
  var t = /^\n* /;
  return t.test(e);
}
var mp = 1, gp = 2, yp = 3, vp = 4, Mr = 5;
function fC(e, t, n, i, r) {
  var o, a, s, u = !1, c = !1, l = i !== -1, f = -1, d = lC(e.charCodeAt(0)) && !uu(e.charCodeAt(e.length - 1));
  if (t)
    for (o = 0; o < e.length; o++) {
      if (a = e.charCodeAt(o), !Sn(a))
        return Mr;
      s = o > 0 ? e.charCodeAt(o - 1) : null, d = d && zc(a, s);
    }
  else {
    for (o = 0; o < e.length; o++) {
      if (a = e.charCodeAt(o), a === er)
        u = !0, l && (c = c || // Foldable line = too long, and not more-indented.
        o - f - 1 > i && e[f + 1] !== " ", f = o);
      else if (!Sn(a))
        return Mr;
      s = o > 0 ? e.charCodeAt(o - 1) : null, d = d && zc(a, s);
    }
    c = c || l && o - f - 1 > i && e[f + 1] !== " ";
  }
  return !u && !c ? d && !r(e) ? mp : gp : n > 9 && hp(e) ? Mr : c ? vp : yp;
}
function dC(e, t, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return "''";
    if (!e.noCompatMode && aC.indexOf(t) !== -1)
      return "'" + t + "'";
    var r = e.indent * Math.max(1, n), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - r), a = i || e.flowLevel > -1 && n >= e.flowLevel;
    function s(u) {
      return uC(e, u);
    }
    switch (fC(t, a, e.indent, o, s)) {
      case mp:
        return t;
      case gp:
        return "'" + t.replace(/'/g, "''") + "'";
      case yp:
        return "|" + Kc(t, e.indent) + Qc(Wc(t, r));
      case vp:
        return ">" + Kc(t, e.indent) + Qc(Wc(pC(t, o), r));
      case Mr:
        return '"' + hC(t) + '"';
      default:
        throw new pr("impossible error: invalid scalar style");
    }
  }();
}
function Kc(e, t) {
  var n = hp(e) ? String(t) : "", i = e[e.length - 1] === `
`, r = i && (e[e.length - 2] === `
` || e === `
`), o = r ? "+" : i ? "" : "-";
  return n + o + `
`;
}
function Qc(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function pC(e, t) {
  for (var n = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, n.lastIndex = c, Vc(e.slice(0, c), t);
  }(), r = e[0] === `
` || e[0] === " ", o, a; a = n.exec(e); ) {
    var s = a[1], u = a[2];
    o = u[0] === " ", i += s + (!r && !o && u !== "" ? `
` : "") + Vc(u, t), r = o;
  }
  return i;
}
function Vc(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, i, r = 0, o, a = 0, s = 0, u = ""; i = n.exec(e); )
    s = i.index, s - r > t && (o = a > r ? a : s, u += `
` + e.slice(r, o), r = o + 1), a = s;
  return u += `
`, e.length - r > t && a > r ? u += e.slice(r, a) + `
` + e.slice(a + 1) : u += e.slice(r), u.slice(1);
}
function hC(e) {
  for (var t = "", n, i, r, o = 0; o < e.length; o++) {
    if (n = e.charCodeAt(o), n >= 55296 && n <= 56319 && (i = e.charCodeAt(o + 1), i >= 56320 && i <= 57343)) {
      t += Yc((n - 55296) * 1024 + i - 56320 + 65536), o++;
      continue;
    }
    r = Le[n], t += !r && Sn(n) ? e[o] : r || Yc(n);
  }
  return t;
}
function mC(e, t, n) {
  var i = "", r = e.tag, o, a;
  for (o = 0, a = n.length; o < a; o += 1)
    Zt(e, t, n[o], !1, !1) && (o !== 0 && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = r, e.dump = "[" + i + "]";
}
function gC(e, t, n, i) {
  var r = "", o = e.tag, a, s;
  for (a = 0, s = n.length; a < s; a += 1)
    Zt(e, t + 1, n[a], !0, !0) && ((!i || a !== 0) && (r += lo(e, t)), e.dump && er === e.dump.charCodeAt(0) ? r += "-" : r += "- ", r += e.dump);
  e.tag = o, e.dump = r || "[]";
}
function yC(e, t, n) {
  var i = "", r = e.tag, o = Object.keys(n), a, s, u, c, l;
  for (a = 0, s = o.length; a < s; a += 1)
    l = "", a !== 0 && (l += ", "), e.condenseFlow && (l += '"'), u = o[a], c = n[u], Zt(e, t, u, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Zt(e, t, c, !1, !1) && (l += e.dump, i += l));
  e.tag = r, e.dump = "{" + i + "}";
}
function vC(e, t, n, i) {
  var r = "", o = e.tag, a = Object.keys(n), s, u, c, l, f, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new pr("sortKeys must be a boolean or a function");
  for (s = 0, u = a.length; s < u; s += 1)
    d = "", (!i || s !== 0) && (d += lo(e, t)), c = a[s], l = n[c], Zt(e, t + 1, c, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && er === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, f && (d += lo(e, t)), Zt(e, t + 1, l, !0, f) && (e.dump && er === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, r += d));
  e.tag = o, e.dump = r || "{}";
}
function Xc(e, t, n) {
  var i, r, o, a, s, u;
  for (r = n ? e.explicitTypes : e.implicitTypes, o = 0, a = r.length; o < a; o += 1)
    if (s = r[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (e.tag = n ? s.tag : "?", s.represent) {
        if (u = e.styleMap[s.tag] || s.defaultStyle, ap.call(s.represent) === "[object Function]")
          i = s.represent(t, u);
        else if (op.call(s.represent, u))
          i = s.represent[u](t, u);
        else
          throw new pr("!<" + s.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function Zt(e, t, n, i, r, o) {
  e.tag = null, e.dump = n, Xc(e, n, !1) || Xc(e, n, !0);
  var a = ap.call(e.dump);
  i && (i = e.flowLevel < 0 || e.flowLevel > t);
  var s = a === "[object Object]" || a === "[object Array]", u, c;
  if (s && (u = e.duplicates.indexOf(n), c = u !== -1), (e.tag !== null && e.tag !== "?" || c || e.indent !== 2 && t > 0) && (r = !1), c && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (s && c && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), a === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (vC(e, t, e.dump, r), c && (e.dump = "&ref_" + u + e.dump)) : (yC(e, t, e.dump), c && (e.dump = "&ref_" + u + " " + e.dump));
    else if (a === "[object Array]") {
      var l = e.noArrayIndent && t > 0 ? t - 1 : t;
      i && e.dump.length !== 0 ? (gC(e, l, e.dump, r), c && (e.dump = "&ref_" + u + e.dump)) : (mC(e, l, e.dump), c && (e.dump = "&ref_" + u + " " + e.dump));
    } else if (a === "[object String]")
      e.tag !== "?" && dC(e, e.dump, t, o);
    else {
      if (e.skipInvalid) return !1;
      throw new pr("unacceptable kind of an object to dump " + a);
    }
    e.tag !== null && e.tag !== "?" && (e.dump = "!<" + e.tag + "> " + e.dump);
  }
  return !0;
}
function wC(e, t) {
  var n = [], i = [], r, o;
  for (fo(e, n, i), r = 0, o = i.length; r < o; r += 1)
    t.duplicates.push(n[i[r]]);
  t.usedDuplicates = new Array(o);
}
function fo(e, t, n) {
  var i, r, o;
  if (e !== null && typeof e == "object")
    if (r = t.indexOf(e), r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (r = 0, o = e.length; r < o; r += 1)
        fo(e[r], t, n);
    else
      for (i = Object.keys(e), r = 0, o = i.length; r < o; r += 1)
        fo(e[i[r]], t, n);
}
function wp(e, t) {
  t = t || {};
  var n = new sC(t);
  return n.noRefs || wC(e, n), Zt(n, 0, e, !0, !0) ? n.dump + `
` : "";
}
function bC(e, t) {
  return wp(e, dr.extend({ schema: HO }, t));
}
su.dump = wp;
su.safeDump = bC;
var na = cr, bp = su;
function ra(e) {
  return function() {
    throw new Error("Function " + e + " is deprecated and cannot be used.");
  };
}
ge.Type = Re;
ge.Schema = Fn;
ge.FAILSAFE_SCHEMA = ru;
ge.JSON_SCHEMA = Hd;
ge.CORE_SCHEMA = qd;
ge.DEFAULT_SAFE_SCHEMA = fr;
ge.DEFAULT_FULL_SCHEMA = ea;
ge.load = na.load;
ge.loadAll = na.loadAll;
ge.safeLoad = na.safeLoad;
ge.safeLoadAll = na.safeLoadAll;
ge.dump = bp.dump;
ge.safeDump = bp.safeDump;
ge.YAMLException = lr;
ge.MINIMAL_SCHEMA = ru;
ge.SAFE_SCHEMA = fr;
ge.DEFAULT_SCHEMA = ea;
ge.scan = ra("scan");
ge.parse = ra("parse");
ge.compose = ra("compose");
ge.addConstructor = ra("addConstructor");
var _C = ge, EC = _C;
const _p = kd, TC = AA, SC = OA, AC = EC, Ep = (e) => AC.safeLoad(SC(e));
Js.exports = (e) => TC(_p.readFile)(e, "utf8").then((t) => Ep(t));
Js.exports.sync = (e) => Ep(_p.readFileSync(e, "utf8"));
var OC = Js.exports;
const Ia = Me, Zc = Ki, CC = OC;
var xC = async function(e) {
  const t = Ia.join(e, "node_modules");
  if (await Zc(Ia.join(t, ".yarn-integrity"))) return { name: "yarn" };
  try {
    const r = await CC(Ia.join(t, ".modules.yaml"));
    return PC(r.packageManager);
  } catch (r) {
    if (r.code !== "ENOENT") throw r;
  }
  return await Zc(t) ? { name: "npm" } : null;
};
function PC(e) {
  if (e[0] === "@") {
    const i = e.substr(1).split("@");
    return {
      name: `@${i[0]}`,
      version: i[1]
    };
  }
  const t = e.split("@");
  return {
    name: t[0],
    version: t[1]
  };
}
const RC = QS, $C = lA, Gn = Me, Yn = Ki, IC = xC;
var NC = async function(t) {
  if (typeof t != "string")
    throw new TypeError(`pkgPath should be a string, got ${typeof t}`);
  if (await Yn(Gn.join(t, "package-lock.json")))
    return {
      name: "npm",
      version: ">=5"
    };
  if (await Yn(Gn.join(t, "yarn.lock")))
    return {
      name: "yarn",
      version: "*"
    };
  if (await Yn(Gn.join(t, "pnpm-lock.yaml")))
    return {
      name: "pnpm",
      version: ">=3"
    };
  if (await Yn(Gn.join(t, "shrinkwrap.yaml")))
    return {
      name: "pnpm",
      version: "1 || 2"
    };
  if (await Yn(Gn.join(t, "bun.lockb")))
    return {
      name: "bun",
      version: "*"
    };
  if (await $C("pnpm-lock.yaml", { cwd: t }))
    return {
      name: "pnpm",
      version: ">=3"
    };
  try {
    if (typeof RC(t) == "string")
      return {
        name: "yarn",
        version: "*"
      };
  } catch {
  }
  const n = await IC(t);
  return n && { name: n.name, version: n.version || "*" };
};
const FC = /* @__PURE__ */ tr(NC), DC = [
  "npm",
  "yarn"
], MC = "npm", LC = async (e) => {
  const t = await FC(e);
  if (!(t !== void 0))
    throw new Error("Couldn't find a package manager in your project.");
  return DC.includes(t.name) ? t.name : (process.emitWarning(`We detected your package manager (${t.name} v${t.version}), but it's not officially supported by Strapi yet. Defaulting to npm instead.`), MC);
}, jC = (e, t, n = {}) => fT(t, [
  "install"
], {
  ...n,
  cwd: e,
  stdin: "ignore"
}), kC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPreferred: LC,
  installDependencies: jC
}, Symbol.toStringTag, { value: "Module" })), UC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  traverseQueryFields: Wt,
  traverseQueryFilters: qe,
  traverseQueryPopulate: Rt,
  traverseQuerySort: Ue
}, Symbol.toStringTag, { value: "Module" })), BC = (e, t) => {
  const n = e.join("|");
  return new RegExp(`<%=\\s*(${n})\\s*%>`, t);
}, HC = (e) => new RegExp(/<%=([\s\S]+?)%>/, e), qC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createLooseInterpolationRegExp: HC,
  createStrictInterpolationRegExp: BC
}, Symbol.toStringTag, { value: "Module" })), GC = (e) => e * 1e3, YC = (e) => Math.round(e / 1e3 * 100) / 100, WC = (e) => {
  const t = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB"
  ];
  if (e === 0) return "0 Bytes";
  const n = parseInt(`${Math.floor(Math.log(e) / Math.log(1e3))}`, 10);
  return `${Math.round(e / 1e3 ** n)} ${t[n]}`;
}, zC = (e) => new Promise((t, n) => {
  const i = [];
  e.on("data", (r) => {
    i.push(r);
  }), e.on("end", () => {
    t(Buffer.concat(i));
  }), e.on("error", n);
}), KC = (e) => new Promise((t, n) => {
  let i = 0;
  e.on("data", (r) => {
    i += Buffer.byteLength(r);
  }), e.on("close", () => t(i)), e.on("error", n), e.resume();
});
function QC(e) {
  return new uh({
    ...e,
    write(t, n, i) {
      setImmediate(i);
    }
  });
}
const VC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bytesToHumanReadable: WC,
  bytesToKbytes: YC,
  getStreamSize: KC,
  kbytesToBytes: GC,
  streamToBuffer: zC,
  writableDiscardStream: QC
}, Symbol.toStringTag, { value: "Module" })), XC = (e) => {
  const { name: t = "unnamed", validator: n, handler: i } = e;
  return {
    name: t,
    validator: (o) => {
      if (n)
        try {
          n(o);
        } catch {
          throw new Error(`Invalid config passed to "${t}" policy.`);
        }
    },
    handler: i
  };
}, ZC = (e, t) => Object.assign({
  is: po(e),
  get type() {
    return e;
  }
}, t), JC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createPolicy: XC,
  createPolicyContext: ZC
}, Symbol.toStringTag, { value: "Module" })), ex = (e, t = {
  separator: "-"
}) => wi(e, t), tx = (e) => wi(e, {
  separator: "_"
}), nx = (e) => wi(e, {
  decamelize: !1,
  lowercase: !1,
  separator: "_"
}), rx = (...e) => {
  const [t, ...n] = e.map((i) => H.split(i, "/"));
  return H.join(H.takeWhile(t, (i, r) => n.every((o) => o[r] === i)), "/");
}, ix = (e, t) => String(e) === String(t), Tp = (e) => /^[a-z][a-zA-Z0-9]+$/.test(e), Sp = (e) => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(e), ax = (e) => /^[0-9]/.test(e), ox = (e, ...t) => {
  const n = Jp(e), i = eh(e), r = th(e);
  return t.reduce((o, a, s) => t.length === 1 ? a : s === 0 ? i(a) : s === t.length - 1 ? o + e + r(a) : o + e + n(a), "");
}, sx = (e) => Up(e), ux = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getCommonPath: rx,
  isCamelCase: Tp,
  isEqual: ix,
  isKebabCase: Sp,
  joinBy: ox,
  nameToCollectionName: tx,
  nameToSlug: ex,
  startsWithANumber: ax,
  toKebabCase: sx,
  toRegressedEnumValue: nx
}, Symbol.toStringTag, { value: "Module" })), { toString: cx } = Object.prototype, lx = Error.prototype.toString, fx = RegExp.prototype.toString, dx = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", px = /^Symbol\((.*)\)(.*)$/;
function hx(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : `${e}`;
}
function Jc(e, t = !1) {
  if (e == null || e === !0 || e === !1) return `${e}`;
  if (typeof e == "number") return hx(e);
  if (typeof e == "string") return t ? `"${e}"` : e;
  if (typeof e == "function") return `[Function ${e.name || "anonymous"}]`;
  if (typeof e == "symbol") return dx.call(e).replace(px, "Symbol($1)");
  const n = cx.call(e).slice(8, -1);
  if (n === "Date") {
    const i = e;
    return Number.isNaN(i.getTime()) ? `${i}` : i.toISOString();
  }
  return n === "Error" || e instanceof Error ? `[${lx.call(e)}]` : n === "RegExp" ? fx.call(e) : null;
}
function el(e, t) {
  const n = Jc(e, t);
  return n !== null ? n : JSON.stringify(e, function(r, o) {
    const a = Jc(this[r], t);
    return a !== null ? a : o;
  }, 2);
}
const mx = () => new Ap(), gx = (e) => !H.isNil(e), yx = (e) => !H.isNull(e);
Mt(ar, "notNil", function(t = "${path} must be defined.") {
  return this.test("defined", t, gx);
});
Mt(ar, "notNull", function(t = "${path} cannot be null.") {
  return this.test("defined", t, yx);
});
Mt(ar, "isFunction", function(t = "${path} is not a function") {
  return this.test("is a function", t, (n) => H.isUndefined(n) || H.isFunction(n));
});
Mt(Di, "isCamelCase", function(t = "${path} is not in camel case (anExampleOfCamelCase)") {
  return this.test("is in camelCase", t, (n) => n ? Tp(n) : !0);
});
Mt(Di, "isKebabCase", function(t = "${path} is not in kebab case (an-example-of-kebab-case)") {
  return this.test("is in kebab-case", t, (n) => n ? Sp(n) : !0);
});
Mt(ps, "onlyContainsFunctions", function(t = "${path} contains values that are not functions") {
  return this.test("only contains functions", t, (n) => H.isUndefined(n) || n && Object.values(n).every(H.isFunction));
});
Mt(hs, "uniqueProperty", function(t, n) {
  return this.test("unique", n, function(r) {
    const o = [];
    if (r?.forEach((a, s) => {
      r.filter((c) => Ma(t, c) === Ma(t, a)).length > 1 && o.push(this.createError({
        path: `${this.path}[${s}].${t}`,
        message: n
      }));
    }), o.length)
      throw new Be(o);
    return !0;
  });
});
class Ap extends Fi {
  _typeCheck(t) {
    return typeof t == "string" || nh(t) && Da(t) && t >= 0;
  }
  constructor() {
    super({
      type: "strapiID"
    });
  }
}
pf({
  mixed: {
    notType(e) {
      const { path: t, type: n, value: i, originalValue: r } = e, o = r != null && r !== i;
      return `${t} must be a \`${n}\` type, but the final value was: \`${el(i, !0)}\`${o ? ` (cast from the value \`${el(r, !0)}\`).` : "."}`;
    }
  }
});
const vx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArraySchema: ms,
  BaseSchema: Pe,
  BooleanSchema: os,
  DateSchema: Mi,
  MixedSchema: Fi,
  NumberSchema: us,
  ObjectSchema: ds,
  StrapiIDSchema: Ap,
  StringSchema: ss,
  ValidationError: Be,
  addMethod: Mt,
  array: hs,
  bool: ro,
  boolean: ro,
  date: ls,
  isSchema: Pn,
  lazy: j0,
  mixed: ar,
  number: lf,
  object: ps,
  reach: b0,
  ref: y0,
  setLocale: pf,
  strapiID: mx,
  string: Di
}, Symbol.toStringTag, { value: "Module" })), wx = (e) => (t) => {
  try {
    return e.parse(t);
  } catch (n) {
    if (n instanceof Bp.ZodError) {
      const { message: i, errors: r } = bx(n);
      throw new yt(i, {
        errors: r
      });
    }
    throw n;
  }
}, bx = (e) => ({
  errors: e.issues.map((t) => ({
    path: t.path,
    message: t.message,
    name: "ValidationError"
  })),
  message: "Validation error"
}), Op = Q.union([
  Q.string(),
  Q.array(Q.string())
]).describe("Select specific fields to return in the response"), Cp = Q.union([
  Q.literal("*"),
  Q.string(),
  Q.array(Q.string()),
  Q.record(Q.string(), Q.any())
]).describe("Specify which relations to populate in the response"), xp = Q.union([
  Q.string(),
  Q.array(Q.string()),
  Q.record(Q.string(), Q.enum([
    "asc",
    "desc"
  ])),
  Q.array(Q.record(Q.string(), Q.enum([
    "asc",
    "desc"
  ])))
]).describe("Sort the results by specified fields"), Pp = Q.intersection(Q.object({
  withCount: Q.boolean().optional().describe("Include total count in response")
}), Q.union([
  Q.object({
    page: Q.number().int().positive().describe("Page number (1-based)"),
    pageSize: Q.number().int().positive().describe("Number of entries per page")
  }).describe("Page-based pagination"),
  Q.object({
    start: Q.number().int().min(0).describe("Number of entries to skip"),
    limit: Q.number().int().positive().describe("Maximum number of entries to return")
  }).describe("Offset-based pagination")
])).describe("Pagination parameters"), Rp = Q.record(Q.string(), Q.any()).describe("Apply filters to the query"), $p = Q.string().describe("Specify the locale for localized content"), Ip = Q.enum([
  "draft",
  "published"
]).describe("Filter by publication status"), Np = Q.string().describe("Search query string"), gt = {
  fields: Op,
  populate: Cp,
  sort: xp,
  pagination: Pp,
  filters: Rp,
  locale: $p,
  status: Ip,
  _q: Np
};
class _x {
  /**
  * Creates a fields query parameter validator
  * Validates field selection for API responses
  */
  get queryFields() {
    return gt.fields;
  }
  /**
  * Creates a populate query parameter validator
  * Validates which relations to populate in the response
  */
  get queryPopulate() {
    return gt.populate;
  }
  /**
  * Creates a sort query parameter validator
  * Validates sorting options for list endpoints
  */
  get querySort() {
    return gt.sort;
  }
  /**
  * Creates a pagination query parameter validator
  * Supports both page-based and offset-based pagination
  */
  get pagination() {
    return gt.pagination;
  }
  /**
  * Creates a filters query parameter validator
  * Validates filtering options for list endpoints
  */
  get filters() {
    return gt.filters;
  }
  /**
  * Creates a locale query parameter validator
  * Used for internationalization
  */
  get locale() {
    return gt.locale;
  }
  /**
  * Creates a status query parameter validator
  * Used for draft & publish functionality
  */
  get status() {
    return gt.status;
  }
  /**
  * Creates a search query parameter validator
  * Used for text search functionality
  */
  get query() {
    return gt._q;
  }
  /**
  * Provides access to all base query parameter validators
  */
  get baseQueryValidators() {
    return {
      fields: () => this.queryFields.optional(),
      populate: () => this.queryPopulate.optional(),
      sort: () => this.querySort.optional(),
      filters: () => this.filters.optional(),
      pagination: () => this.pagination.optional(),
      locale: () => this.locale.optional(),
      status: () => this.status.optional(),
      _q: () => this.query.optional()
    };
  }
  /**
  * Helper method to create a query parameters object with specified validators
  *
  * @param params - Array of query parameter names to include
  * @returns Object containing Zod schemas for the requested query parameters
  */
  queryParams(t) {
    const n = this.baseQueryValidators;
    return t.reduce((i, r) => (r in n && (i[r] = n[r]()), i), {});
  }
}
const Ex = (e) => {
  const t = (i) => i.charAt(0).toUpperCase() + i.slice(1), n = (i) => i.split(/[-_]/).map(t).join("");
  if (e.includes("::")) {
    const [i, ...r] = e.split("::"), o = n(i), a = r.join(".").split(".").map(n).map(t);
    return `${t(o)}${a.join("")}Document`;
  }
  return e.includes(".") ? `${e.split(".").map(n).map(t).join("")}Entry` : `${n(t(e))}Schema`;
}, Tx = (e) => (t) => e !== !0 ? t.optional() : t.nonoptional(), Sx = (e) => (t) => e !== !1 ? t : t.readonly(), Ax = (e) => (t) => {
  if (e === void 0)
    return t;
  const n = typeof e == "function" ? e() : e;
  return t.default(n);
}, Ox = (e, t) => (n) => e !== void 0 && t !== void 0 ? n.min(e).max(t) : n, Cx = (e, t) => t.reduce((n, i) => i(n), e), Fp = ({ request: e, response: t, ...n }) => n, Dp = (e) => e.filter((t) => !!t && typeof t == "object").map(Fp), xx = (e) => Object.entries(e).reduce((t, [n, i]) => ({
  ...t,
  [n]: Array.isArray(i) ? Dp(i) : i
}), {}), Px = (e, t, n) => e.map((i) => n(i)).includes(n(t)), Rx = (e, t) => Px(e, t, String), $x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  includesString: Rx
}, Symbol.toStringTag, { value: "Module" })), Mp = (e, t = []) => H.isObject(e) ? H.reduce(e, (n, i, r) => H.concat(n, Mp(i, [
  ...t,
  r
])), []) : [
  t.join(".")
], Ix = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  keysDeep: Mp
}, Symbol.toStringTag, { value: "Module" })), Nx = (e) => (e ?? /* @__PURE__ */ new Date()).getTime().toString(36), Fx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  timestampCode: Nx
}, Symbol.toStringTag, { value: "Module" })), Dx = (e) => {
  let t;
  const n = () => (t || (t = e()), t), i = () => ({
    type: "content-api",
    routes: n()
  });
  return Object.defineProperty(i, "routes", {
    get: n,
    set(r) {
      t = r;
    },
    enumerable: !0
  }), i;
}, Mx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractRouteValidator: _x,
  arrays: $x,
  async: kw,
  augmentSchema: Cx,
  contentTypes: Uv,
  createContentApiRoutesFactory: Dx,
  dates: Fx,
  env: Wl,
  errors: cw,
  file: VC,
  filtersSchema: Rp,
  generateInstallId: Zv,
  hooks: Wv,
  importDefault: Vv,
  isOperator: Li,
  isOperatorOfType: wf,
  localeSchema: $p,
  maybeReadonly: Sx,
  maybeRequired: Tx,
  maybeWithDefault: Ax,
  maybeWithMinMax: Ox,
  objects: Ix,
  packageManager: kC,
  pagination: qb,
  paginationSchema: Pp,
  parseType: Yt,
  policy: JC,
  providerFactory: Kv,
  queryFieldsSchema: Op,
  queryParameterSchemas: gt,
  queryParams: Sw,
  queryPopulateSchema: Cp,
  querySortSchema: xp,
  relations: Kw,
  sanitize: _b,
  sanitizeRouteForSerialization: Fp,
  sanitizeRoutesArrayForSerialization: Dp,
  sanitizeRoutesMapForSerialization: xx,
  searchQuerySchema: Np,
  setCreatorFields: Hv,
  statusSchema: Ip,
  strings: ux,
  template: qC,
  transformUidToValidOpenApiName: Ex,
  traverse: UC,
  traverseEntity: _t,
  validate: Nb,
  validateYupSchema: lw,
  validateYupSchemaSync: fw,
  validateZod: wx,
  yup: vx
}, Symbol.toStringTag, { value: "Module" })), cu = /* @__PURE__ */ lh(Mx);
var Lp = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getCacheStatus = e.intercalate = e.processItems = e.prepareAuditLog = e.sendAuditLog = void 0;
  const t = et, n = (s, u, c) => {
    s && s.emit && s.emit(u, c);
  };
  e.sendAuditLog = n;
  const i = (s) => [
    ...new Set(s.filter((u) => !!u).flatMap(({ remove: u, create: c, update: l }) => [c ? "CREATE" : "", l ? "UPDATE" : "", u ? "REMOVE" : ""].filter((f) => !!f)))
  ].join("_");
  e.prepareAuditLog = i;
  const r = (s) => async (u) => ({
    title: u.title,
    path: u.path,
    audience: u.audience,
    type: u.type,
    uiRouterKey: u.uiRouterKey,
    order: u.order,
    collapsed: u.collapsed,
    menuAttached: u.menuAttached,
    removed: !1,
    updated: !0,
    externalPath: u.externalPath,
    items: u.items ? await Promise.all(u.items.map((0, e.processItems)(s))) : [],
    master: s.master,
    parent: void 0,
    related: u.related,
    additionalFields: u.additionalFields
  });
  e.processItems = r;
  const o = (s, u) => u.slice(1).reduce((c, l) => c.concat([s, l]), u.slice(0, 1));
  e.intercalate = o;
  const a = async ({ strapi: s }) => {
    const c = !!s.plugin("rest-cache"), l = s.store({
      type: "plugin",
      name: "navigation"
    }), f = t.DynamicSchemas.configSchema.parse(await l.get({
      key: "config"
    }));
    return c ? { hasCachePlugin: c, enabled: !!f.isCacheEnabled } : { hasCachePlugin: c, enabled: !1 };
  };
  e.getCacheStatus = a;
})(Lp);
var Lx = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Yo, "__esModule", { value: !0 });
const Or = cu, je = H, tl = Lx(ch), Cr = rt, Ye = An, kt = et, ve = xe, xt = Lp, jx = (e) => ({
  async config({ viaSettingsPage: t = !1 }) {
    const n = (0, ve.getPluginService)(e, "common"), i = await (0, xt.getCacheStatus)(e), o = await (await n.getPluginStore()).get({
      key: "config"
    }).then(kt.DynamicSchemas.configSchema.parse), { additionalFields: a, cascadeMenuAttached: s, contentTypesPopulate: u, contentTypesNameFields: c, defaultContentType: l, pathDefaultFields: f, allowedLevels: d, preferCustomContentTypes: p } = o, h = !!strapi.plugin("graphql");
    let m = {
      allowedContentTypes: ve.ALLOWED_CONTENT_TYPES,
      restrictedContentTypes: ve.RESTRICTED_CONTENT_TYPES,
      availableAudience: []
    };
    const g = await this.configContentTypes({}), v = {
      contentTypes: await this.configContentTypes({ viaSettingsPage: t }),
      contentTypesNameFields: {
        default: ve.CONTENT_TYPES_NAME_FIELDS_DEFAULTS,
        ...(0, je.isObject)(c) ? c : {}
      },
      contentTypesPopulate: (0, je.isObject)(u) ? u : {},
      defaultContentType: l,
      pathDefaultFields: (0, je.isObject)(f) ? f : {},
      allowedLevels: d,
      additionalFields: t ? a : a.filter((w) => typeof w == "string" || !!w.enabled),
      gql: {
        navigationItemRelated: g.map(({ labelSingular: w }) => w.replace(/\s+/g, ""))
      },
      isGQLPluginEnabled: t ? h : void 0,
      cascadeMenuAttached: s,
      preferCustomContentTypes: p
    };
    if (a.includes("audience")) {
      const w = await (0, Ye.getAudienceRepository)(e).find({}, Number.MAX_SAFE_INTEGER);
      m = {
        ...m,
        availableAudience: w
      };
    }
    return {
      ...v,
      ...m,
      isCacheEnabled: i.enabled,
      isCachePluginEnabled: i.hasCachePlugin
    };
  },
  async configContentTypes({ viaSettingsPage: t = !1 }) {
    const r = await (await (0, ve.getPluginService)(e, "common").getPluginStore()).get({ key: "config" }).then(kt.DynamicSchemas.configSchema.parse);
    return (await Promise.all(r.contentTypes.filter((a) => !!e.strapi.contentTypes[a] && (0, ve.isContentTypeEligible)(a)).map(async (a) => {
      const s = kt.contentTypeFullSchema.parse(strapi.contentTypes[a]), { kind: u, options: c, uid: l } = s, f = c?.draftAndPublish, d = u === ve.KIND_TYPES.SINGLE, p = d && f, h = (m) => ({
        key: a,
        available: m
      });
      if (d) {
        const m = (0, Ye.getGenericRepository)(e, l);
        if (p) {
          const v = p ? await m.count({}, "published") : !0;
          return h(v !== 0);
        }
        return await m.count({}) !== 0 ? h(!0) : t ? h(!1) : void 0;
      }
      return h(!0);
    }))).reduce((a, s) => {
      if (!s?.key)
        return a;
      const { key: u, available: c } = s, l = kt.contentTypeFullSchema.parse(e.strapi.contentTypes[u]), f = (l.associations || []).find(({ model: D }) => D === "navigationitem"), { uid: d, options: p, info: h, collectionName: m, modelName: g, apiName: v, plugin: w, kind: A, pluginOptions: C = {} } = l, x = c && !p?.hidden;
      if (!x)
        return a;
      const { visible: b = !0 } = C["content-manager"] || {}, { name: O = "", description: S = "" } = h, _ = (0, je.find)((0, je.get)(e.strapi.api, `[${g}].config.routes`, []), (D) => D.handler.includes(".find")), R = _ && _.path.split("/")[1], y = R && R !== v ? R : v || g, N = A === ve.KIND_TYPES.SINGLE, j = N ? y : (0, tl.default)(y), G = (0, ve.singularize)(g), E = typeof d == "string" ? (0, je.last)(d.split(".")).split("-") : [], T = E.length > 1 ? E.reduce((D, M) => `${D}${(0, je.upperFirst)(M)}`, "") : (0, je.upperFirst)(g), U = O || (0, je.upperFirst)(E.length > 1 ? E.join(" ") : G);
      return a.push({
        uid: d,
        name: G,
        draftAndPublish: p?.draftAndPublish,
        isSingle: N,
        description: S,
        collectionName: m,
        contentTypeName: T,
        label: N ? U : (0, tl.default)(O || U),
        relatedField: f ? f.alias : void 0,
        labelSingular: (0, ve.singularize)(U),
        endpoint: j,
        plugin: w,
        available: x,
        visible: b,
        templateName: p?.templateName
      }), a;
    }, []);
  },
  async get({ ids: t, locale: n }) {
    let i = {};
    t && t.length && (i.id = { $in: t });
    const r = await (0, Ye.getNavigationRepository)(e).find({
      filters: i,
      locale: n || "*",
      limit: Number.MAX_SAFE_INTEGER,
      populate: ["items", "items.parent", "items.audience", "items.related"]
    }), o = ({ allItems: a, item: s, parent: u }) => {
      const c = a.filter((l) => {
        var f;
        return ((f = l.parent) === null || f === void 0 ? void 0 : f.documentId) === s.documentId;
      });
      return {
        ...s,
        parent: u,
        items: c.map((l) => o({
          parent: s,
          item: l,
          allItems: a
        })).sort((l, f) => l.order - f.order)
      };
    };
    return r.map((a) => {
      var s;
      return {
        ...a,
        items: (s = a.items) === null || s === void 0 ? void 0 : s.filter((u) => !u.parent).map((u) => {
          var c;
          return o({
            allItems: (c = a.items) !== null && c !== void 0 ? c : [],
            item: u
          });
        }).sort((u, c) => u.order - c.order)
      };
    });
  },
  async getById({ documentId: t, locale: n, populate: i = [] }) {
    const r = (0, ve.getPluginService)(e, "common"), { defaultLocale: o } = await r.readLocale(), a = {
      documentId: t
    }, s = await (0, Ye.getNavigationRepository)(e).findOne({
      filters: a,
      locale: n || o
    }), u = await (0, Ye.getNavigationItemRepository)(e).find({
      filters: { master: s.id },
      locale: n || o,
      limit: Number.MAX_SAFE_INTEGER,
      order: [{ order: "asc" }],
      populate: ["parent", "audience", ...i]
    });
    return {
      ...s,
      items: r.buildNestedStructure({
        navigationItems: u
      }).filter(({ parent: c }) => !c)
    };
  },
  async post({ auditLog: t, payload: n }) {
    const { masterModel: i } = (0, ve.getPluginModels)(e), r = (0, ve.getPluginService)(e, "common"), { defaultLocale: o, restLocale: a } = await r.readLocale(), s = (0, Ye.getNavigationRepository)(e), u = [], { name: c, visible: l } = n, f = await r.getSlug({ query: c }), d = await s.save({
      name: c,
      visible: l,
      locale: o,
      slug: f
    });
    u.push(await this.getById({ documentId: d.documentId }));
    for (const p of a) {
      const h = await s.save({
        name: c,
        visible: l,
        locale: p,
        slug: f,
        documentId: d.documentId
      });
      u.push(await this.getById({ documentId: h.documentId }));
    }
    return u.map((p) => {
      (0, xt.sendAuditLog)(t, "onChangeNavigation", {
        actionType: "CREATE",
        oldEntity: p,
        newEntity: p
      });
    }), await r.emitEvent({
      entity: d,
      event: "entry.create",
      uid: i.uid
    }), {
      ...d,
      items: []
    };
  },
  async put({ auditLog: t, payload: n }) {
    const { masterModel: i } = (0, ve.getPluginModels)(e), r = (0, ve.getPluginService)(e, "common"), { defaultLocale: o, restLocale: a } = await r.readLocale(), s = (0, Ye.getNavigationRepository)(e), { name: u, visible: c, items: l } = n, f = await s.findOne({
      filters: { documentId: n.documentId },
      locale: n.locale,
      populate: "*"
    }), d = await this.getById({
      documentId: n.documentId,
      locale: n.locale
    });
    if (f.name !== u || f.visible !== c) {
      const h = u ? await r.getSlug({
        query: u
      }) : f.slug, m = await Promise.all([o, ...a].map((g) => s.findOne({
        filters: { documentId: f.documentId },
        locale: g
      })));
      for (const g of m)
        await s.save({
          documentId: g.documentId,
          id: g.id,
          slug: h,
          locale: g.locale,
          name: u,
          visible: c
        });
    }
    return await r.analyzeBranch({
      navigationItems: l ?? [],
      masterEntity: f,
      prevAction: {}
    }).then(xt.prepareAuditLog).then(async (h) => {
      const m = await this.getById({ documentId: f.documentId });
      (0, xt.sendAuditLog)(t, "onChangeNavigation", {
        actionType: h,
        oldEntity: d,
        newEntity: m
      });
    }), await r.emitEvent({
      entity: await s.findOne({
        filters: { documentId: n.documentId },
        populate: "*"
      }),
      event: "entry.update",
      uid: i.uid
    }), await this.getById({
      documentId: n.documentId,
      locale: n.locale,
      populate: ["related"]
    });
  },
  async delete({ auditLog: t, documentId: n }) {
    const i = (0, Ye.getNavigationRepository)(e), r = (0, Ye.getNavigationItemRepository)(e), o = await this.getById({ documentId: n }), a = async (c) => {
      c.length < 1 || await r.removeForIds(await r.findForMasterIds(c).then((l) => l.reduce((f, { documentId: d }) => (d && f.push(d), f), [])));
    }, s = await i.findOne({
      filters: { documentId: n },
      populate: "*"
    }), u = await i.find({
      filters: { documentId: s.documentId },
      populate: "*"
    });
    await a(u.map(({ id: c }) => c)), await i.remove({ documentId: s.documentId }), (0, xt.sendAuditLog)(t, "onNavigationDeletion", {
      entity: o,
      actionType: "DELETE"
    });
  },
  async restart() {
    e.strapi.reload.isWatching = !1, setImmediate(() => e.strapi.reload());
  },
  async restoreConfig() {
    console.log("restore");
    const t = (0, ve.getPluginService)(e, "common");
    await (await t.getPluginStore()).delete({ key: "config" }), await t.setDefaultConfig();
  },
  async refreshNavigationLocale(t) {
    if (!t)
      return;
    const n = (0, ve.getPluginService)(e, "common"), { defaultLocale: i } = await n.readLocale(), r = (0, Ye.getNavigationRepository)(e), o = await r.find({
      limit: Number.MAX_SAFE_INTEGER,
      locale: i
    });
    await Promise.all(o.map(({ name: a, visible: s, slug: u, documentId: c }) => r.save({
      name: a,
      visible: s,
      locale: t,
      slug: u,
      documentId: c
    })));
  },
  async updateConfig({ config: t }) {
    const n = (0, ve.getPluginService)(e, "common"), i = await n.getPluginStore(), r = await i.get({
      key: "config"
    }).then(kt.DynamicSchemas.configSchema.parse);
    (0, ve.validateAdditionalFields)(t.additionalFields), await i.set({ key: "config", value: t });
    const o = (0, je.differenceBy)(r.additionalFields, t.additionalFields, "name").reduce((a, s) => (typeof s == "string" || a.push(s), a), []);
    (0, je.isEmpty)(o) || await n.pruneCustomFields({ removedFields: o });
  },
  async fillFromOtherLocale({ auditLog: t, source: n, target: i, documentId: r }) {
    const o = await this.getById({ documentId: r, locale: i });
    return await this.i18nNavigationContentsCopy({
      source: await this.getById({ documentId: r, locale: n, populate: ["related"] }),
      target: o
    }).then(() => this.getById({ documentId: r, locale: i, populate: ["related"] })).then((a) => ((0, xt.sendAuditLog)(t, "onChangeNavigation", {
      actionType: "UPDATE",
      oldEntity: o,
      newEntity: a
    }), a));
  },
  async i18nNavigationContentsCopy({ source: t, target: n }) {
    var i, r;
    const o = (0, ve.getPluginService)(e, "common"), a = (i = t.items) !== null && i !== void 0 ? i : [], s = (0, Ye.getNavigationRepository)(e);
    if (!((r = n.items) === null || r === void 0) && r.length)
      throw new Cr.FillNavigationError("Current navigation is non-empty");
    if (!n.locale)
      throw new Cr.FillNavigationError("Current navigation does not have specified locale");
    if (!a.length)
      throw new Cr.FillNavigationError("Source navigation is empty");
    const u = /* @__PURE__ */ new Map(), c = (0, xt.processItems)({
      master: n,
      locale: n.locale,
      strapi,
      entities: u
    });
    await o.createBranch({
      action: { create: !0 },
      masterEntity: await s.findOne({
        filters: { documentId: n.documentId },
        locale: n.locale,
        populate: "*"
      }),
      navigationItems: await Promise.all(a.map(c)),
      parentItem: void 0
    });
  },
  async readNavigationItemFromLocale({ path: t, source: n, target: i }) {
    const r = await this.getById({ documentId: n }), o = await this.getById({ documentId: i });
    if (!r)
      throw new Or.errors.NotFoundError("Unable to find source navigation for specified query");
    if (!o)
      throw new Or.errors.NotFoundError("Unable to find target navigation for specified query");
    const a = [
      "path",
      "related",
      "type",
      "uiRouterKey",
      "title",
      "externalPath"
    ], s = t.split(".").map((c) => parseInt(c, 10));
    (!s.some(Number.isNaN) || !s.length) && new Cr.InvalidParamNavigationError("Path is invalid");
    let u = (0, je.get)(r.items, (0, xt.intercalate)("items", s.map(je.toString)));
    if (!u)
      throw new Or.errors.NotFoundError("Unable to find navigation item");
    return kt.readNavigationItemFromLocaleSchema.parse((0, je.pick)(u, a));
  },
  async getContentTypeItems({ query: t, uid: n }) {
    var i;
    const a = await (await (0, ve.getPluginService)(e, "common").getPluginStore()).get({ key: "config" }).then(kt.DynamicSchemas.configSchema.parse), s = {
      publishedAt: {
        $notNull: !0
      }
    }, u = (0, je.get)(e.strapi.contentTypes, n), { draftAndPublish: c } = u.options, { localized: l = !1 } = ((i = u?.pluginOptions) === null || i === void 0 ? void 0 : i.i18n) || {};
    l && t.locale && (s.locale = t.locale);
    const f = (0, Ye.getGenericRepository)(e, n);
    try {
      return await f.findMany(s, a.contentTypesPopulate[n] || [], c ? "published" : void 0);
    } catch (d) {
      return console.error(d), [];
    }
  },
  async purgeNavigationCache(t, n) {
    const i = (0, Ye.getNavigationRepository)(e), r = await i.findOne({ filters: { documentId: t } });
    if (!r)
      throw new Or.errors.NotFoundError("Navigation is not defined");
    const o = (c) => new RegExp(`/api/navigation/render/${c}`);
    let a = [o(r.documentId)];
    n && (a = (await i.find({
      filters: {
        documentId: r.documentId
      }
    })).map(({ documentId: l }) => o(l)));
    const u = strapi.plugin("rest-cache").service("cacheStore");
    return a.push(o(t)), await u.clearByRegexp(a), { success: !0 };
  },
  async purgeNavigationsCache() {
    const n = strapi.plugin("rest-cache").service("cacheStore"), i = new RegExp("/api/navigation/render(.*)");
    return await n.clearByRegexp([i]), { success: !0 };
  }
});
Yo.default = jx;
var kx = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Ux = kx(Yo);
Go.default = Ux.default;
var lu = {}, fu = {}, jp = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.compareArraysOfNumbers = e.buildNestedPaths = e.filterByPath = e.extractItemRelationTitle = e.composeItemTitle = void 0;
  const t = H, n = (s, u = {}, c = []) => {
    const { title: l, related: f } = s, d = (0, t.isArray)(f) ? (0, t.last)(f) : f;
    if (l)
      return (0, t.isString)(l) && !(0, t.isEmpty)(l) ? l : void 0;
    if (d) {
      const p = (0, e.extractItemRelationTitle)(d, u, c);
      return (0, t.isString)(p) && !(0, t.isEmpty)(p) ? p : void 0;
    }
  };
  e.composeItemTitle = n;
  const i = (s, u = {}, c = []) => {
    const { __contentType: l } = s, f = (0, t.find)(c, (p) => p.contentTypeName === l), { default: d = [] } = u;
    return (0, t.get)(u, `${f ? f.collectionName : ""}`, d).map((p) => s[p]).filter((p) => p)[0] || "";
  };
  e.extractItemRelationTitle = i;
  const r = (s, u) => {
    const c = (0, e.buildNestedPaths)(s), l = u ? c.filter(({ path: d }) => d.includes(u)) : c, f = l.find(({ path: d }) => d === u);
    return {
      root: f,
      items: (0, t.isNil)(f) ? [] : s.filter(({ documentId: d }) => l.find((p) => p.documentId === d))
    };
  };
  e.filterByPath = r;
  const o = (s, u, c = null) => s.filter((l) => {
    var f;
    return !l.parent == null && !u ? !0 : ((f = l.parent) === null || f === void 0 ? void 0 : f.documentId) === u;
  }).reduce((l, f) => {
    var d, p, h;
    const m = `${c || ""}/${f.path}`.replace("//", "/");
    return [
      {
        documentId: f.documentId,
        parent: c && (!((d = f.parent) === null || d === void 0) && d.documentId) ? {
          id: (p = f.parent) === null || p === void 0 ? void 0 : p.id,
          documentId: (h = f.parent) === null || h === void 0 ? void 0 : h.documentId,
          path: c
        } : void 0,
        path: m
      },
      ...(0, e.buildNestedPaths)(s, f.documentId, m),
      ...l
    ];
  }, []);
  e.buildNestedPaths = o;
  const a = (s, u) => {
    const c = (0, t.zipWith)(s, u, (l, f) => (0, t.isNil)(l) ? -1 : (0, t.isNil)(f) ? 1 : l - f);
    return (0, t.find)(c, (l) => l !== 0) || 0;
  };
  e.compareArraysOfNumbers = a;
})(jp);
Object.defineProperty(fu, "__esModule", { value: !0 });
const Bx = cu, ke = H, nl = rt, Na = An, Fa = xe, Wn = jp, Hx = (e) => ({
  async readAll({ locale: t, orderBy: n = "createdAt", orderDirection: i = "DESC" }) {
    return (0, Na.getNavigationRepository)(e).find({
      locale: t,
      orderBy: { [n]: i }
    });
  },
  renderRFRNavigationItem({ item: t }) {
    const { uiRouterKey: n, title: i, path: r, type: o, audience: a, additionalFields: s } = t, u = {
      label: i,
      type: o,
      audience: a?.map(({ key: c }) => c),
      additionalFields: s
    };
    if (o === "WRAPPER")
      return { ...u };
    if (o === "EXTERNAL")
      return (0, Fa.assertNotEmpty)(r, new nl.NavigationError("External navigation item's path is undefined", t)), {
        ...u,
        url: r
      };
    if (o === "INTERNAL")
      return {
        ...u,
        page: n
      };
    if (o === "WRAPPER")
      return {
        ...u
      };
    throw new nl.NavigationError("Unknown item type", t);
  },
  renderRFRPage({ item: t, parent: n, enabledCustomFieldsNames: i }) {
    const { documentId: r, uiRouterKey: o, title: a, path: s, related: u, type: c, audience: l, menuAttached: f, additionalFields: d } = t, p = i.reduce((h, m) => ({ ...h, [m]: d?.[m] }), {});
    return {
      id: o,
      documentId: r,
      title: a,
      related: c === "INTERNAL" && u?.documentId && u?.__type ? {
        contentType: u.__type,
        documentId: u.documentId
      } : void 0,
      path: s,
      parent: n,
      audience: l,
      menuAttached: f,
      additionalFields: p
    };
  },
  renderRFR({ items: t, parent: n, parentNavItem: i, contentTypes: r = [], enabledCustomFieldsNames: o }) {
    const a = [];
    let s = {}, u = {};
    return t.forEach((c) => {
      const { items: l, ...f } = c, d = this.renderRFRNavigationItem({
        item: f
      }), p = this.renderRFRPage({
        item: f,
        parent: n,
        enabledCustomFieldsNames: o
      });
      if (c.type !== "EXTERNAL" && (u = {
        ...u,
        [p.documentId]: {
          ...p
        }
      }), c.menuAttached && a.push(d), !n)
        s = {
          ...s,
          root: a
        };
      else {
        const h = a.filter((m) => m.type);
        (0, ke.isEmpty)(h) || (s = {
          ...s,
          [n]: h.concat(i || [])
        });
      }
      if (!(0, ke.isEmpty)(l)) {
        const { nav: h } = this.renderRFR({
          items: l ?? [],
          parent: p.documentId,
          parentNavItem: d,
          contentTypes: r,
          enabledCustomFieldsNames: o
        }), { pages: m } = this.renderRFR({
          items: l || [],
          parent: p.documentId,
          parentNavItem: d,
          contentTypes: r,
          enabledCustomFieldsNames: o
        });
        u = {
          ...u,
          ...m
        }, s = {
          ...s,
          ...h
        };
      }
    }), {
      pages: u,
      nav: s
    };
  },
  renderTree({ items: t = [], documentId: n, path: i = "", itemParser: r = (o) => Promise.resolve(o) }) {
    return Promise.all(t.reduce((o, a) => {
      var s;
      return ((s = a.parent) === null || s === void 0 ? void 0 : s.documentId) === n && o.push(r((0, ke.cloneDeep)(a), i)), o;
    }, [])).then((o) => o.sort((a, s) => a.order !== void 0 && s.order !== void 0 ? a.order - s.order : 0));
  },
  getCustomFields(t) {
    return t.reduce((n, i) => (i !== "audience" && n.push(i), n), []);
  },
  async renderType({ criteria: t = {}, filter: n, itemCriteria: i = {}, locale: r, populate: o, rootPath: a, type: s = "FLAT", wrapRelated: u, status: c = "published" }) {
    var l, f;
    const d = (0, Fa.getPluginService)(e, "admin"), p = (0, Fa.getPluginService)(e, "common"), h = {
      ...t,
      visible: !0
    }, m = (0, Na.getNavigationRepository)(e), g = (0, Na.getNavigationItemRepository)(e);
    let v;
    if (r ? v = await m.find({
      filters: {
        ...h
      },
      locale: r,
      limit: 1
    }) : v = await m.find({
      filters: h,
      limit: 1
    }), (0, ke.isArray)(v) && (v = (0, ke.first)(v)), v && v.documentId) {
      const w = await g.find({
        filters: {
          master: (0, ke.pick)(v, ["slug", "id"]),
          ...i
        },
        locale: r,
        limit: Number.MAX_SAFE_INTEGER,
        order: [{ order: "asc" }],
        populate: ["audience", "parent", "related"]
      }), A = await p.mapToNavigationItemDTO({
        locale: r,
        master: v,
        navigationItems: w,
        populate: o,
        status: c
      }), { contentTypes: C, contentTypesNameFields: x, additionalFields: b } = await d.config({
        viaSettingsPage: !1
      }), O = this.getCustomFields(b).reduce((y, N) => N.enabled ? [...y, N.name] : y, []), S = (y) => u && y ? {
        documentId: y.documentId,
        ...y
      } : y, _ = b.filter((y) => typeof y != "string"), R = (y) => (N, j) => {
        var G;
        const E = _.find(({ name: U }) => U === j);
        let T = (G = y.additionalFields) === null || G === void 0 ? void 0 : G[j];
        if (T)
          switch (E?.type) {
            case "media":
              T = JSON.parse(T);
              break;
            case "boolean":
              T = T === "true";
              break;
          }
        return { ...N, [j]: T };
      };
      switch (s) {
        case "TREE":
        case "RFR":
          const y = async (M, z = "") => {
            var V, ie;
            const Ce = M.type === "EXTERNAL", P = Ce ? void 0 : `${z === "/" ? "" : z}/${(0, ke.first)(M.path) === "/" ? M.path.substring(1) : M.path}`, $ = typeof P == "string" ? await p.getSlug({
              query: ((0, ke.first)(P) === "/" ? P.substring(1) : P).replace(/\//g, "-")
            }) : void 0, I = (0, ke.isArray)(M.related) ? (0, ke.last)(M.related) : M.related, X = S(I), fe = O.reduce(R(M), {});
            return {
              id: M.id,
              documentId: M.documentId,
              title: (V = (0, Wn.composeItemTitle)(M, x, C)) !== null && V !== void 0 ? V : "Title missing",
              menuAttached: M.menuAttached,
              order: M.order,
              path: (ie = Ce ? M.externalPath : P) !== null && ie !== void 0 ? ie : "Path is missing",
              type: M.type,
              uiRouterKey: M.uiRouterKey,
              slug: !$ && M.uiRouterKey ? await p.getSlug({ query: M.uiRouterKey }) : $,
              related: Ce || !I ? void 0 : {
                ...X
              },
              audience: (0, ke.isEmpty)(M.audience) ? void 0 : M.audience,
              items: await this.renderTree({
                itemParser: y,
                path: P,
                documentId: M.documentId,
                items: A
              }),
              collapsed: M.collapsed,
              additionalFields: fe || {}
            };
          }, { items: N, root: j } = (0, Wn.filterByPath)(A, a), G = await this.renderTree({
            itemParser: y,
            items: (0, ke.isNil)(a) ? A : N,
            path: (l = j?.parent) === null || l === void 0 ? void 0 : l.path,
            documentId: (f = j?.parent) === null || f === void 0 ? void 0 : f.documentId
          }), E = n ? G.filter((M) => M.uiRouterKey === n) : G;
          return s === "RFR" ? this.renderRFR({
            items: E,
            contentTypes: C.map((M) => M.contentTypeName),
            enabledCustomFieldsNames: O
          }) : E;
        default:
          const T = (0, ke.isNil)(a) ? A : (0, Wn.filterByPath)(A, a).items, U = /* @__PURE__ */ new Map(), D = (M, z = U) => {
            const V = z.get(M);
            if (!(0, ke.isNil)(V))
              return V;
            const ie = T.find((I) => I.documentId === M);
            if ((0, ke.isNil)(ie))
              return [];
            const { order: Ce, parent: P } = ie, $ = P ? D(P.documentId, z).concat(Ce) : [Ce];
            return z.set(M, $), $;
          };
          return T.map((M) => {
            var z;
            const V = O.reduce(R(M), {});
            return {
              ...M,
              audience: (z = M.audience) === null || z === void 0 ? void 0 : z.map((ie) => ie.key),
              title: (0, Wn.composeItemTitle)(M, x, C) || "",
              related: S(M.related),
              items: null,
              additionalFields: V
            };
          }).sort((M, z) => (0, Wn.compareArraysOfNumbers)(D(M.documentId), D(z.documentId)));
      }
    }
    throw new Bx.errors.NotFoundError();
  },
  renderChildren({ childUIKey: t, idOrSlug: n, locale: i, menuOnly: r, type: o = "FLAT", wrapRelated: a, status: s }) {
    const u = { $or: [{ documentId: n }, { slug: n }] }, c = o === "FLAT" ? void 0 : t, l = {
      ...r && { menuAttached: !0 },
      ...o === "FLAT" ? { uiRouterKey: t } : {}
    };
    return this.renderType({
      type: o,
      criteria: u,
      itemCriteria: l,
      filter: c,
      wrapRelated: a,
      locale: i,
      status: s
    });
  },
  render({ idOrSlug: t, locale: n, menuOnly: i, populate: r, rootPath: o, type: a = "FLAT", wrapRelated: s, status: u }) {
    const c = { $or: [{ documentId: t }, { slug: t }] }, l = i ? { menuAttached: !0 } : {};
    return this.renderType({
      type: a,
      criteria: c,
      itemCriteria: l,
      rootPath: o,
      wrapRelated: s,
      locale: n,
      populate: r,
      status: u
    });
  }
});
fu.default = Hx;
var qx = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(lu, "__esModule", { value: !0 });
const Gx = qx(fu);
lu.default = Gx.default;
var du = {}, pu = {}, ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.checkDuplicatePath = void 0;
const Yx = rt, Wx = ({ checkData: e, parentItem: t }) => new Promise((n, i) => {
  if (t && t.items) {
    for (let r of e)
      for (let o of t.items)
        if (o.path === r.path && o.id !== r.id && r.type === "INTERNAL" && !o.removed)
          return i(new Yx.NavigationError(`Duplicate path:${r.path} in parent: ${t.title || "root"} for ${r.title} and ${o.title} items`, {
            parentTitle: t.title,
            parentId: t.id,
            path: r.path,
            errorTitles: [r.title, o.title]
          }));
  }
  return n();
});
ia.checkDuplicatePath = Wx;
var zx = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(pu, "__esModule", { value: !0 });
const Kx = cu, Qx = zx(wi), rl = H, Vx = bi(), Ut = An, cn = et, Xx = ia, xr = {
  navigation: {},
  "navigation-item": {}
}, Zx = (e) => ({
  async getPluginStore() {
    return await strapi.store({ type: "plugin", name: "navigation" });
  },
  async mapToNavigationItemDTO({ locale: t, master: n, navigationItems: i, parent: r, populate: o, status: a = "published" }) {
    const u = await (await this.getPluginStore()).get({
      key: "config"
    }).then(cn.DynamicSchemas.configSchema.parse), c = async (l, f) => {
      if (!l.length)
        return [];
      const d = l.reduce((g, v) => {
        var w, A, C;
        const x = (w = v.related) === null || w === void 0 ? void 0 : w.__type, b = (A = v.related) === null || A === void 0 ? void 0 : A.documentId;
        return !x || !b || ((C = g[x]) !== null && C !== void 0 || (g[x] = /* @__PURE__ */ new Set()), g[x].add(b)), g;
      }, {}), p = await Promise.all(Object.entries(d).map(async ([g, v]) => {
        const w = u.contentTypesPopulate[g], C = await (0, Ut.getGenericRepository)({ strapi }, g).findManyById(Array.from(v), w, a, t), x = new Map(C.map((b) => [b.documentId, b]));
        return [g, x];
      })), h = new Map(p), m = l.map((g) => {
        var v, w, A;
        const C = (v = g.related) === null || v === void 0 ? void 0 : v.__type, x = (w = g.related) === null || w === void 0 ? void 0 : w.documentId;
        if (!C || !x)
          return g;
        const b = (A = h.get(C)) === null || A === void 0 ? void 0 : A.get(x);
        return b ? {
          ...g,
          related: {
            ...b,
            __type: C,
            documentId: x
          }
        } : g;
      });
      return await Promise.all(m.map(async (g) => {
        const { items: v = [], ...w } = g;
        return {
          ...w,
          parent: f ?? w.parent,
          items: await c(v, w)
        };
      }));
    };
    return c(i, r);
  },
  setDefaultConfig() {
    return (0, Vx.configSetup)({ strapi, forceDefault: !0 });
  },
  getBranchName({ item: t }) {
    const n = !!t.documentId, i = t.removed;
    if (n && !i)
      return "toUpdate";
    if (n && i)
      return "toRemove";
    if (!n && !i)
      return "toCreate";
  },
  async analyzeBranch({ masterEntity: t, navigationItems: n = [], parentItem: i, prevAction: r = {} }) {
    const { toCreate: o, toRemove: a, toUpdate: s } = n.reduce((l, f) => {
      const d = this.getBranchName({
        item: f
      });
      return d ? { ...l, [d]: [...l[d], f] } : l;
    }, {
      toRemove: [],
      toCreate: [],
      toUpdate: []
    }), u = {
      create: r.create || o.length > 0,
      update: r.update || s.length > 0,
      remove: r.remove || a.length > 0
    }, c = [...o, ...s];
    return await (0, Xx.checkDuplicatePath)({
      checkData: c,
      parentItem: i
    }), Promise.all([
      this.createBranch({
        action: u,
        masterEntity: t,
        navigationItems: o,
        parentItem: i
      }),
      this.removeBranch({
        navigationItems: a,
        action: u
      }),
      this.updateBranch({
        action: u,
        masterEntity: t,
        navigationItems: s,
        parentItem: i
      })
    ]).then(([l, f, d]) => [...l, ...f, ...d]);
  },
  async removeBranch({ navigationItems: t = [], action: n = {} }) {
    var i;
    const r = [];
    for (const o of t)
      o.documentId && (n.remove = !0, await (0, Ut.getNavigationItemRepository)(e).remove(o), r.push(n), !((i = o.items) === null || i === void 0) && i.length && (await this.removeBranch({
        navigationItems: o.items
      })).forEach((s) => {
        r.push(s);
      }));
    return r;
  },
  async createBranch({ action: t, masterEntity: n, navigationItems: i, parentItem: r }) {
    var o;
    let a = [];
    for (const s of i) {
      t.create = !0;
      const { parent: u, master: c, items: l, documentId: f, id: d, ...p } = s, h = f && d ? {
        ...p,
        documentId: f,
        id: d,
        master: n ? n.id : void 0,
        parent: r ? r.id : void 0
      } : {
        ...p,
        documentId: void 0,
        id: void 0,
        master: n ? n.id : void 0,
        parent: r ? r.id : void 0
      }, m = await (0, Ut.getNavigationItemRepository)(e).save({
        item: h,
        locale: n?.locale
      });
      if (!((o = s.items) === null || o === void 0) && o.length) {
        const g = await this.createBranch({
          action: {},
          masterEntity: n,
          navigationItems: s.items,
          parentItem: m
        });
        a = a.concat(g).concat([t]);
      } else
        a.push(t);
    }
    return a;
  },
  async updateBranch({ masterEntity: t, navigationItems: n, action: i, parentItem: r }) {
    const o = [];
    for (const a of n) {
      i.update = !0;
      const { documentId: s, updated: u, parent: c, master: l, items: f, ...d } = a;
      let p;
      u ? p = await (0, Ut.getNavigationItemRepository)(e).save({
        item: {
          documentId: s,
          ...d
        },
        locale: t?.locale
      }) : p = a, f?.length ? (await this.analyzeBranch({
        navigationItems: f,
        prevAction: {},
        masterEntity: t,
        parentItem: p
      })).forEach((m) => {
        o.push(m);
      }) : o.push(i);
    }
    return o;
  },
  async emitEvent({ entity: t, event: n, uid: i }) {
    const r = strapi.getModel(i), o = await Kx.sanitize.sanitizers.defaultSanitizeOutput({
      ...r,
      schema: r.__schema__,
      getModel: () => r
    }, t);
    strapi.webhookRunner ? strapi.webhookRunner.eventHub.emit(n, {
      model: r.modelName,
      entry: o
    }) : console.warn("Webhook runner not present. Contact with Strapi Navigation Plugin team.");
  },
  async pruneCustomFields({ removedFields: t }) {
    const n = t.map(({ name: a }) => `additionalFields.${a}`), i = t.map(({ name: a }) => a), o = (await (0, Ut.getNavigationItemRepository)(e).find({
      filters: {
        additionalFields: {
          $contains: [i]
        }
      }
    })).map((a) => (0, rl.omit)(a, n));
    for (const a of o)
      await (0, Ut.getNavigationItemRepository)(e).save({
        item: {
          documentId: a.documentId,
          additionalFields: a.additionalFields
        }
      });
  },
  async getSlug({ query: t }) {
    let n = (0, Qx.default)(t);
    if (n) {
      const i = await (0, Ut.getNavigationItemRepository)(e).count({
        $or: [
          {
            uiRouterKey: {
              $startsWith: n
            }
          },
          { uiRouterKey: n }
        ]
      });
      i && (n = `${n}-${i}`);
    }
    return n.toLowerCase();
  },
  registerLifeCycleHook({ callback: t, contentTypeName: n, hookName: i }) {
    var r;
    xr[n][i] || (xr[n][i] = []), (r = xr[n][i]) === null || r === void 0 || r.push(t);
  },
  async runLifeCycleHook({ contentTypeName: t, event: n, hookName: i }) {
    var r;
    const o = (r = xr[t][i]) !== null && r !== void 0 ? r : [];
    for (const a of o)
      await a(n);
  },
  buildNestedStructure({ navigationItems: t, id: n }) {
    var i;
    return (i = t?.reduce((r, o) => {
      var a;
      return n && ((a = o.parent) === null || a === void 0 ? void 0 : a.id) !== n || r.push({
        ...(0, rl.omit)(o, ["related", "items"]),
        related: o.related,
        items: this.buildNestedStructure({
          navigationItems: t,
          id: o.id
        })
      }), r;
    }, [])) !== null && i !== void 0 ? i : [];
  },
  async readLocale() {
    const t = strapi.plugin("i18n").service("locales");
    let n = await t.getDefaultLocale(), i = (await t.find({})).map(({ code: r }) => r).filter((r) => r !== n);
    return n || (n = i[0], i = i.slice(1)), {
      defaultLocale: n,
      restLocale: i
    };
  },
  updateConfigSchema: cn.updateConfigSchema,
  updateCreateNavigationSchema: cn.updateCreateNavigationSchema,
  updateNavigationItemAdditionalField: cn.updateNavigationItemAdditionalField,
  updateNavigationItemCustomField: cn.updateNavigationItemCustomField,
  updateUpdateNavigationSchema: cn.updateUpdateNavigationSchema
});
pu.default = Zx;
var Jx = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(du, "__esModule", { value: !0 });
const eP = Jx(pu);
du.default = eP.default;
var hu = {}, mu = {};
Object.defineProperty(mu, "__esModule", { value: !0 });
const tP = H, nP = An, rP = xe, il = "navigations_items", al = "related", iP = (e) => ({
  async migrateRelatedIdToDocumentId() {
    if (!await strapi.db.connection.schema.hasColumn(il, al))
      return;
    console.log("Navigation plugin :: Migrations :: Related id to document id - START");
    const n = (0, nP.getNavigationItemRepository)(e), i = await n.findV4({
      filters: {},
      limit: Number.MAX_SAFE_INTEGER
    });
    await Promise.all(i.map(async (r) => {
      const o = r.related;
      if (o && typeof o == "string") {
        const [a, s] = o.split(rP.RELATED_ITEM_SEPARATOR);
        if (!(0, tP.isNaN)(parseInt(s, 10))) {
          const u = await e.strapi.query(a).findOne({ where: { id: s } });
          u && await n.save({
            item: {
              documentId: r.documentId,
              related: { __type: a, documentId: u.documentId }
            }
          });
        }
      }
    })), await strapi.db.connection.schema.alterTable(il, (r) => {
      r.dropColumn(al);
    }), console.log("Navigation plugin :: Migrations :: Related id to document id - DONE");
  }
});
mu.default = iP;
var aP = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(hu, "__esModule", { value: !0 });
const oP = aP(mu);
hu.default = oP.default;
var aa = F && F.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Cl, "__esModule", { value: !0 });
const sP = aa(Go), uP = aa(lu), cP = aa(du), lP = aa(hu);
var fP = Cl.default = {
  admin: sP.default,
  common: cP.default,
  client: uP.default,
  migrate: lP.default
};
const LP = {
  bootstrap: pm,
  destroy: mm,
  register: ym,
  config: wm,
  controllers: Km,
  contentTypes: $m,
  middlewares: Qm,
  policies: Vm,
  routes: rg,
  services: fP
};
export {
  LP as default
};
