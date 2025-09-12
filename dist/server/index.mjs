import de, { uniqBy as fu, isNil as Ke, find as Gn, includes as pu, last as qn, capitalize as du, isEmpty as nt, once as fi, omit as gn, get as un, toString as hu, pick as Ia, differenceBy as mu, upperFirst as dr, isObject as hr, isArray as jr, isString as Ji, zipWith as gu, first as mr, cloneDeep as yu, isNaN as vu } from "lodash";
import * as y from "zod";
import { z as Oa } from "zod";
import { union as wu, getOr as Eu, curry as De, isObject as $e, isNil as oe, clone as bu, isArray as We, pick as eo, isEmpty as ze, cloneDeep as pi, omit as xu, isString as Ue, trim as yn, pipe as Su, split as Hr, map as Au, flatten as _u, first as Na, constant as Br, identity as Tu, join as Cu, eq as Ru, get as to } from "lodash/fp";
import no from "crypto";
import vn from "child_process";
import wn from "lodash/has";
import Pa from "lodash/mapValues";
import ro from "lodash/snakeCase";
import Fu from "lodash/camelCase";
import $u from "lodash/mapKeys";
import Kn from "os";
import Ee from "path";
import Ve from "fs";
import La from "assert";
import Iu from "events";
import Ou from "buffer";
import Wn from "stream";
import ut from "util";
import Nu from "constants";
import "node:stream";
import Pu from "@sindresorhus/slugify";
import * as q from "zod/v4";
import io from "pluralize";
const di = y.object({
  name: y.string({ required_error: "requiredError" }).nonempty("requiredError").refine((e) => !e.includes(" "), { message: "noSpaceError" }),
  label: y.string({ required_error: "requiredError" }).nonempty("requiredError"),
  description: y.string().optional(),
  placeholder: y.string().optional(),
  required: y.boolean().optional(),
  enabled: y.boolean().optional()
}), Lu = di.extend({
  type: y.literal("select"),
  multi: y.boolean(),
  options: y.array(y.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
}), ku = di.extend({
  type: y.enum(["boolean", "string"]),
  multi: y.literal(!1).optional(),
  options: y.array(y.string()).max(0).optional()
}), Du = di.extend({
  type: y.literal("media"),
  multi: y.literal(!1).optional(),
  options: y.array(y.string()).max(0).optional()
}), ka = y.discriminatedUnion("type", [
  ku,
  Du,
  Lu
]), Da = y.union([
  y.literal("audience"),
  ka
]), Mu = y.object({
  additionalFields: y.array(Da),
  allowedLevels: y.number(),
  contentTypes: y.array(y.string()),
  defaultContentType: y.string().optional(),
  contentTypesNameFields: y.record(y.string(), y.array(y.string())),
  contentTypesPopulate: y.record(y.string(), y.array(y.string())),
  gql: y.object({
    navigationItemRelated: y.array(y.string())
  }),
  pathDefaultFields: y.record(y.string(), y.any()),
  cascadeMenuAttached: y.boolean(),
  preferCustomContentTypes: y.boolean(),
  isCacheEnabled: y.boolean().optional()
}), Ma = y.object({
  id: y.number(),
  documentId: y.string(),
  name: y.string(),
  key: y.string()
}), ju = y.enum(["INTERNAL", "EXTERNAL", "WRAPPER"]), hi = y.object({
  id: y.number(),
  documentId: y.string(),
  title: y.string(),
  type: ju,
  path: y.string().or(y.null()).optional(),
  slug: y.string().or(y.null()).optional(),
  externalPath: y.string().or(y.null()).optional(),
  uiRouterKey: y.string(),
  menuAttached: y.boolean(),
  order: y.number().int(),
  collapsed: y.boolean(),
  related: y.object({ documentId: y.string().optional(), __type: y.string() }).catchall(y.unknown()).nullish().optional(),
  additionalFields: y.record(y.string(), y.unknown()).or(y.null()).optional(),
  audience: y.array(Ma).or(y.null()).optional(),
  autoSync: y.boolean().or(y.null()).optional()
}), Hu = hi.omit({
  related: !0
}).pick({
  path: !0,
  type: !0,
  uiRouterKey: !0,
  title: !0,
  externalPath: !0
}).extend({ related: y.unknown().optional() }), Ht = hi.extend({
  parent: y.lazy(() => Ht.or(y.null())).optional(),
  items: y.lazy(() => Ht.array()).optional(),
  master: y.lazy(() => et(!1)).optional()
}), oo = y.array(Ht), et = (e) => y.object({
  id: y.number(),
  documentId: y.string(),
  name: y.string(),
  slug: y.string(),
  locale: y.string(),
  visible: y.boolean(),
  items: e ? y.array(Ht) : Ht.array().optional()
}), Bu = et(!1).omit({
  items: !0,
  id: !0,
  documentId: !0,
  slug: !0,
  locale: !0
}).extend({
  documentId: y.string().optional(),
  id: y.undefined().optional()
}), Uu = hi.omit({ id: !0, documentId: !0 }).extend({
  id: y.number().optional(),
  documentId: y.string().optional(),
  items: y.lazy(() => ja).or(y.null()).optional(),
  updated: y.boolean().optional(),
  removed: y.boolean().optional()
}), ja = y.array(Uu), Gu = et(!1).extend({
  items: ja
}).partial().required({
  id: !0,
  documentId: !0
}), qu = y.enum(["collectionType", "singleType"]), Ku = y.object({
  singularName: y.string(),
  pluralName: y.string(),
  displayName: y.string(),
  description: y.string().optional(),
  name: y.string().optional()
}), Ha = y.object({
  required: y.boolean().optional(),
  max: y.number().optional(),
  min: y.number().optional(),
  minLength: y.number().optional(),
  maxLength: y.number().optional(),
  private: y.boolean().optional(),
  configurable: y.boolean().optional(),
  default: y.any().optional()
}), Wu = y.enum([
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
]), zu = Ha.extend({
  type: Wu
}), Yu = Ha.extend({
  type: y.literal("enumeration"),
  enum: y.string().array()
}), Qu = y.object({
  type: y.literal("component"),
  component: y.string(),
  repeatable: y.boolean().optional()
}), Vu = y.object({
  type: y.literal("dynamiczone"),
  components: y.string().array()
}), Xu = y.object({
  type: y.literal("uid")
}), Zu = y.object({
  type: y.literal("media"),
  allowedTypes: y.enum(["images", "videos", "audios", "files"]).array(),
  required: y.boolean().optional()
}), Ju = y.enum([
  "oneToOne",
  "oneToMany",
  "manyToOne",
  "manyToMany",
  "morphToMany",
  "manyToMorph"
]), el = y.object({
  type: y.literal("relation"),
  relation: Ju,
  target: y.string(),
  mappedBy: y.string().optional(),
  inversedBy: y.string().optional()
}), tl = y.record(
  y.string(),
  y.union([
    zu,
    Yu,
    Qu,
    Vu,
    el,
    Zu,
    Xu
  ])
), Ur = y.object({
  kind: qu,
  collectionName: y.string(),
  info: Ku,
  options: y.object({
    draftAndPublish: y.boolean().optional(),
    hidden: y.boolean().optional(),
    templateName: y.string().optional()
  }).optional(),
  attributes: tl,
  actions: y.record(y.string(), y.any()).optional(),
  lifecycles: y.record(y.string(), y.any()).optional(),
  uid: y.string(),
  apiName: y.string().optional(),
  // TODO?: remove
  associations: y.object({
    model: y.string(),
    alias: y.string()
  }).array().optional(),
  modelName: y.string().optional(),
  plugin: y.string().optional(),
  pluginOptions: y.record(y.string(), y.any()).optional(),
  isSingle: y.boolean().optional()
});
Ur.pick({
  info: !0,
  kind: !0,
  attributes: !0,
  options: !0
});
const Gt = (e, t) => (n) => {
  t(n(e()));
};
let Gr = Mu;
const nl = Gt(
  () => Gr,
  (e) => {
    Gr = e;
  }
);
let qr = Da;
const rl = Gt(
  () => qr,
  (e) => {
    qr = e;
  }
);
let Kr = ka;
const il = Gt(
  () => Kr,
  (e) => {
    Kr = e;
  }
);
let Wr = Bu;
const ol = Gt(
  () => Wr,
  (e) => {
    Wr = e;
  }
);
let zr = Gu;
const al = Gt(
  () => zr,
  (e) => {
    zr = e;
  }
), Te = {
  get configSchema() {
    return Gr;
  },
  get navigationItemAdditionalField() {
    return qr;
  },
  get navigationItemCustomField() {
    return Kr;
  },
  get createNavigationSchema() {
    return Wr;
  },
  get updateNavigationSchema() {
    return zr;
  }
}, sl = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i, cl = [
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
], ul = "$", Ba = ["api::", "plugin::"], Ua = [
  "admin::",
  "plugin::content-releases",
  "plugin::i18n.locale",
  "plugin::navigation",
  "plugin::review-workflows",
  "plugin::users-permissions",
  "plugin::upload.folder"
], ll = ["title", "subject", "name"], ao = { SINGLE: "singleType" }, so = [
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
], fl = (e) => e.filter((t) => t !== "audience"), Ga = (e) => {
  const t = fl(e);
  if (t.length !== fu(t, "name").length)
    throw new Error("All names of custom fields must be unique.");
  if (!Ke(
    Gn(
      t,
      (n) => typeof n == "object" && pu(so, n.name)
    )
  ))
    throw new Error(
      `Name of custom field cannot be one of: ${so.join(", ")}`
    );
}, qa = (e, t) => {
  if (e == null)
    throw t ?? new Error("Non-empty value expected, empty given");
}, pl = (e = "") => {
  const t = (a) => a.split("-").map((o) => du(o)).join(""), [n, r, i] = dl(e);
  return n === "api" ? t(i) : `${t(r)}${t(i)}`;
}, dl = (e = "") => e.split(sl).filter((t) => t && t.length > 0), hl = (e, t) => (n) => [
  n,
  async (r) => {
    await te(t, "common").runLifeCycleHook({
      contentTypeName: e,
      hookName: n,
      event: r
    });
  }
], Ka = (e, t) => Object.fromEntries(cl.map(hl(e, t))), ye = ({
  strapi: e
}) => {
  const t = e.plugin("navigation");
  return {
    masterModel: t.contentType("navigation"),
    itemModel: t.contentType("navigation-item"),
    relatedModel: t.contentType("navigations-items-related"),
    audienceModel: t.contentType("audience")
  };
};
function te({ strapi: e }, t) {
  return e.plugin("navigation").service(t);
}
const Jt = (e) => e === "*" ? "*" : typeof e == "string" ? [e] : e === !1 ? [] : e === !0 ? "*" : e, ml = (e = "") => {
  const t = !!Ba.find((r) => e.includes(r)), n = !Ua.find((r) => e.includes(r) || e === r);
  return !!e && t && n;
}, co = (e = "") => qn(e) === "s" ? e.substr(0, e.length - 1) : e, Wa = async ({
  strapi: e,
  forceDefault: t = !1
}) => {
  const n = e.store({
    type: "plugin",
    name: "navigation"
  }), r = await e.plugin("navigation").config, i = t ? {} : {
    ...Yr.default,
    ...await n.get({
      key: "config"
    }) ?? Yr.default
  };
  let a = nt(i) ? i : Te.configSchema.parse(i);
  const o = gl(a, r);
  return a = {
    additionalFields: o("additionalFields"),
    contentTypes: o("contentTypes"),
    contentTypesNameFields: o("contentTypesNameFields"),
    contentTypesPopulate: o("contentTypesPopulate"),
    defaultContentType: o("defaultContentType"),
    allowedLevels: o("allowedLevels"),
    gql: o("gql"),
    pathDefaultFields: o("pathDefaultFields"),
    cascadeMenuAttached: o("cascadeMenuAttached"),
    preferCustomContentTypes: o("preferCustomContentTypes"),
    isCacheEnabled: o("isCacheEnabled")
  }, yl(a, { strapi: e }), Ga(a.additionalFields), await n.set({
    key: "config",
    value: a
  }), a;
}, gl = (e, t) => (n) => {
  const r = e?.[n] ?? t(n);
  return qa(r, new Error(`[Navigation] Config "${n}" is undefined`)), r;
}, yl = (e, { strapi: t }) => {
  const n = e.contentTypes.filter(
    (i) => !t.contentTypes[i]
  );
  if (n.length === 0)
    return;
  const r = n.map(pl);
  e.contentTypes = e.contentTypes.filter(
    (i) => !n.includes(i)
  ), e.contentTypesNameFields = Object.fromEntries(
    Object.entries(e.contentTypesNameFields).filter(
      ([i]) => !n.includes(i)
    )
  ), e.gql.navigationItemRelated = e.gql.navigationItemRelated.filter(
    (i) => !r.includes(i)
  );
}, Yr = {
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
}, vl = fi((e) => ({
  find(t, n) {
    const {
      audienceModel: { uid: r }
    } = ye(e);
    return e.strapi.query(r).findMany({ where: t, limit: n }).then(Ma.array().parse);
  }
})), En = (e, t) => ({
  findFirst(n, r, i = {}) {
    return e.strapi.documents(t).findFirst({ populate: Jt(n), status: r, ...i });
  },
  findById(n, r, i, a = {}) {
    return e.strapi.documents(t).findOne({ documentId: n, populate: Jt(r), status: i, ...a });
  },
  findManyById(n, r, i) {
    return e.strapi.documents(t).findMany({
      where: { documentId: { $in: n } },
      populate: Jt(r),
      status: i
    });
  },
  findMany(n, r, i, a) {
    return e.strapi.documents(t).findMany({ where: n, populate: Jt(r), status: i, locale: a });
  },
  count(n, r) {
    return e.strapi.documents(t).count({
      where: n,
      status: r
    });
  }
}), Pe = fi((e) => ({
  async save({ item: t, locale: n }) {
    const { itemModel: r } = ye(e), { __type: i, documentId: a } = t?.related ?? {}, o = i ? En(e, i) : void 0, s = i && o ? a ? await o.findById(a, void 0, void 0, { locale: n }) : await o.findFirst(void 0, void 0, { locale: n }) : void 0;
    if (typeof t.documentId == "string") {
      const { documentId: c, ...f } = t;
      return e.strapi.documents(r.uid).update({
        documentId: t.documentId,
        data: {
          ...f,
          related: s ? { ...s, __type: i } : void 0
        },
        locale: n
      });
    } else
      return e.strapi.documents(r.uid).create({
        data: {
          ...t,
          related: s ? { ...s, __type: i } : void 0
        },
        locale: n
      });
  },
  find({ filters: t, locale: n, limit: r, order: i, populate: a }) {
    const { itemModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i }).then((s) => s.map(Qr)).then(oo.parse).then((s) => s.map(bn));
  },
  findV4({ filters: t, locale: n, limit: r, order: i, populate: a }) {
    const { itemModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i });
  },
  count(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.query(n.uid).count({ where: t });
  },
  remove(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.documents(n.uid).delete({
      documentId: t.documentId,
      populate: "*"
    });
  },
  removeForIds(t) {
    const { itemModel: n } = ye(e);
    return t.map(
      (r) => e.strapi.documents(n.uid).delete({ documentId: r, populate: "*" })
    );
  },
  findForMasterIds(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.query(n.uid).findMany({
      where: {
        $or: t.map((r) => ({ master: r }))
      },
      limit: Number.MAX_SAFE_INTEGER
    }).then(oo.parse);
  }
})), wl = ["id", "publishedAt", "createdAt", "updatedAt", "locale"], bn = ({
  related: e,
  items: t = [],
  ...n
}) => ({
  ...n,
  items: t.map(bn),
  related: e ? gn(e, wl) : void 0
}), Qr = ({ related: e, ...t }) => ({
  ...t,
  related: e?.[0]
});
class Ct extends Error {
  constructor(t, n) {
    super(t), this.additionalInfo = n, this.type = "NavigationError";
  }
}
class gr extends Ct {
  constructor() {
    super(...arguments), this.type = "FillNavigationError";
  }
}
class El extends Ct {
  constructor() {
    super(...arguments), this.type = "InvalidParamNavigationError";
  }
}
const uo = (e) => e === !0 ? !0 : Array.isArray(e) ? e.includes("items") : !1, Fe = fi((e) => ({
  find({ filters: t, locale: n, limit: r, orderBy: i, populate: a }) {
    const { masterModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i }).then(
      (s) => s.map(({ items: c, ...f }) => ({
        ...f,
        items: c?.map(Qr)
      }))
    ).then(
      (s) => s.map(({ items: c, ...f }) => ({
        ...f,
        items: c?.map(bn)
      }))
    ).then((s) => et(uo(a)).array().parse(s));
  },
  findOne({ locale: t, filters: n, populate: r }) {
    const { masterModel: i } = ye(e);
    return e.strapi.documents(i.uid).findOne({ documentId: n.documentId, locale: t, populate: r }).then((a) => a && { ...a, items: a.items?.map(Qr) }).then((a) => et(uo(r)).parse(a)).then((a) => ({
      ...a,
      items: a.items?.map(bn)
    }));
  },
  async save(t) {
    const { masterModel: n } = ye(e), { documentId: r, locale: i, ...a } = t;
    return r ? e.strapi.documents(n.uid).update({
      locale: i,
      documentId: r,
      data: gn(a, ["id", "documentId"]),
      populate: ["items"]
    }).then(et(!1).parse) : e.strapi.documents(n.uid).create({
      locale: i,
      data: {
        ...a,
        populate: ["items"]
      }
    }).then(et(!1).parse);
  },
  remove(t) {
    const { masterModel: n } = ye(e);
    if (!t.documentId)
      throw new Ct("Document id is required.");
    return e.strapi.documents(n.uid).delete({ documentId: t.documentId });
  }
})), bl = "Navigation", xl = "navigation", Sl = async (e) => {
  const t = te(e, "common"), { defaultLocale: n, restLocale: r = [] } = await t.readLocale(), i = Fe(e), a = await i.find({
    limit: Number.MAX_SAFE_INTEGER,
    filters: {},
    locale: "*"
  });
  a.length === 0 && a.push(
    await i.save({
      name: bl,
      visible: !0,
      locale: n,
      slug: xl
    })
  );
  const o = a.filter(({ locale: s }) => s === n);
  for (const s of o)
    for (const c of r)
      !a.find(
        ({ locale: l, documentId: u }) => u === s.documentId && c === l
      ) && await i.save({
        documentId: s.documentId,
        name: s.name,
        locale: c,
        visible: s.visible,
        slug: s.slug
      });
}, pe = {
  render: function(e) {
    return `plugin::navigation.${e}`;
  },
  navigation: {
    read: "read",
    update: "update",
    settings: "settings"
  }
}, Al = async ({ strapi: e }) => {
  const t = [
    {
      section: "plugins",
      displayName: "Read",
      uid: pe.navigation.read,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: pe.navigation.update,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Settings",
      uid: pe.navigation.settings,
      pluginName: "navigation"
    }
  ];
  await e.admin.services.permission.actionProvider.registerMany(t);
}, _l = "I18NLocaleCode", Tl = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: r, stringArg: i, booleanArg: a } = t;
  return {
    args: {
      navigationIdOrSlug: n(i()),
      type: "NavigationRenderType",
      menuOnly: a(),
      path: i(),
      locale: t.arg({ type: _l })
    },
    type: n(r("NavigationItem")),
    resolve(c, { navigationIdOrSlug: f, type: l, menuOnly: u, path: p, locale: d }) {
      const h = Oa.string().parse(f);
      return te({ strapi: e }, "client").render({
        idOrSlug: h,
        type: l,
        rootPath: p,
        locale: d,
        menuOnly: u,
        wrapRelated: !0
      });
    }
  };
}, Cl = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: r, stringArg: i, booleanArg: a } = t;
  return {
    type: n(r("NavigationItem")),
    args: {
      documentId: n(i()),
      childUiKey: n(i()),
      type: "NavigationRenderType",
      menuOnly: a()
    },
    resolve(o, s) {
      const { documentId: c, childUIKey: f, type: l, menuOnly: u } = s, p = Oa.string().parse(c);
      return te({ strapi: e }, "client").renderChildren({
        idOrSlug: p,
        childUIKey: f,
        type: l,
        menuOnly: u,
        wrapRelated: !0
      });
    }
  };
}, Rl = (e) => {
  const t = {
    renderNavigationChild: Cl,
    renderNavigation: Tl
  };
  return e.nexus.extendType({
    type: "Query",
    definition(n) {
      for (const [r, i] of Object.entries(t)) {
        const a = i(e);
        n.field(r, a);
      }
    }
  });
}, Fl = () => ({
  "Query.renderNavigationChild": { auth: !1 },
  "Query.renderNavigation": { auth: !1 }
}), $l = ({ nexus: e }) => e.objectType({
  name: "ContentTypes",
  definition(t) {
    t.nonNull.string("uid"), t.nonNull.string("name"), t.nonNull.boolean("isSingle"), t.nonNull.string("collectionName"), t.nonNull.string("contentTypeName"), t.nonNull.string("label"), t.nonNull.string("relatedField"), t.nonNull.string("labelSingular"), t.nonNull.string("endpoint"), t.nonNull.boolean("available"), t.nonNull.boolean("visible");
  }
}), Il = ({ nexus: e, strapi: t }) => e.objectType({
  name: "ContentTypesNameFields",
  async definition(n) {
    n.nonNull.list.nonNull.string("default");
    const i = await te({ strapi: t }, "common").getPluginStore(), o = Te.configSchema.parse(await i.get({ key: "config" })).contentTypesNameFields;
    Object.keys(o || {}).forEach((s) => n.nonNull.list.string(s));
  }
}), Ol = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigation",
  definition(t) {
    t.nonNull.string("name"), t.nonNull.list.field("items", { type: "CreateNavigationItem" });
  }
}), Nl = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationItem",
  definition(t) {
    t.nonNull.string("title"), t.nonNull.field("type", { type: "NavigationItemType" }), t.string("path"), t.string("externalPath"), t.nonNull.string("uiRouterKey"), t.nonNull.boolean("menuAttached"), t.nonNull.int("order"), t.string("parent"), t.string("master"), t.list.field("items", { type: "CreateNavigationItem" }), t.list.string("audience"), t.field("related", { type: "CreateNavigationRelated" });
  }
}), Pl = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationRelated",
  definition(t) {
    t.nonNull.string("ref"), t.nonNull.string("field"), t.nonNull.string("refId");
  }
}), Ll = ({ nexus: e }) => e.objectType({
  name: "Navigation",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible");
  }
}), kl = ({ nexus: e }) => e.objectType({
  name: "NavigationConfig",
  definition(t) {
    t.int("allowedLevels"), t.nonNull.list.string("additionalFields"), t.field("contentTypesNameFields", { type: "ContentTypesNameFields" }), t.list.field("contentTypes", { type: "ContentTypes" });
  }
}), Dl = ({ nexus: e }) => e.objectType({
  name: "NavigationDetails",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible"), t.nonNull.list.field("items", { type: "NavigationItem" });
  }
}), Ml = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItem",
  definition(n) {
    n.nonNull.int("id"), n.nonNull.string("documentId"), n.nonNull.string("title"), n.nonNull.field("type", { type: "NavigationItemType" }), n.string("path"), n.string("externalPath"), n.nonNull.string("uiRouterKey"), n.nonNull.boolean("menuAttached"), n.nonNull.int("order"), n.field("parent", { type: "NavigationItem" }), n.string("master"), n.list.field("items", { type: "NavigationItem" }), n.field("related", { type: "NavigationItemRelated" }), t.additionalFields.find((r) => r === "audience") && n.list.string("audience"), n.field("additionalFields", { type: "NavigationItemAdditionalFields" }), n.string("created_at"), n.string("updated_at"), n.string("created_by"), n.string("updated_by"), n.string("createdAt"), n.string("updatedAt"), n.string("createdBy"), n.string("updatedBy");
  }
}), jl = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItemAdditionalFields",
  definition(n) {
    t.additionalFields.forEach((r) => {
      if (r !== "audience" && r.enabled)
        switch (r.type) {
          case "media":
            n.field(r.name, { type: "UploadFile" });
            break;
          case "string":
            n.string(r.name);
            break;
          case "boolean":
            n.boolean(r.name);
            break;
          case "select":
            r.multi ? n.list.string(r.name) : n.string(r.name);
            break;
          default:
            throw new Error(
              `Type "${JSON.stringify(r.type)}" is unsupported by custom fields`
            );
        }
    });
  }
}), Hl = ({ strapi: e, nexus: t, config: n }) => {
  const r = n.gql?.navigationItemRelated, i = "NavigationItemRelated";
  return r?.length ? t.unionType({
    name: i,
    definition(a) {
      a.members(...r);
    },
    resolveType: (a) => e.contentTypes[a.__type]?.globalId
  }) : t.objectType({
    name: i,
    definition(a) {
      a.int("id"), a.string("documentId"), a.string("title"), a.string("name");
    }
  });
}, Bl = ({ nexus: e }) => e.enumType({
  name: "NavigationItemType",
  members: ["INTERNAL", "EXTERNAL", "WRAPPER"]
}), Ul = ({ nexus: e }) => e.enumType({
  name: "NavigationRenderType",
  members: ["FLAT", "TREE"]
}), Gl = [
  jl,
  Hl,
  Ml,
  Ul,
  Ll,
  Dl,
  Il,
  $l,
  kl,
  Pl,
  Nl,
  Ol,
  Bl
], ql = (e) => Gl.map((t) => t(e)), Kl = async ({ strapi: e }) => {
  const t = e.plugin("graphql").service("extension");
  t.shadowCRUD("plugin::navigation.audience").disable(), t.shadowCRUD("plugin::navigation.navigation").disable(), t.shadowCRUD("plugin::navigation.navigation-item").disable(), t.shadowCRUD("plugin::navigation.navigations-items-related").disable();
  const r = await te({ strapi: e }, "common").getPluginStore(), i = Te.configSchema.parse(await r.get({ key: "config" }));
  t.use(({ strapi: a, nexus: o }) => {
    const s = ql({ strapi: a, nexus: o, config: i }), c = Rl({ strapi: a, nexus: o }), f = Fl();
    return {
      types: [s, c],
      resolversConfig: f
    };
  });
}, Wl = async ({ strapi: e }) => {
  !!e.plugin("graphql") && await Kl({ strapi: e });
}, zl = async (e) => {
  await Wa(e), await Sl(e), await Al(e), await Wl(e), await strapi.service("plugin::navigation.migrate").migrateRelatedIdToDocumentId(), strapi.db.lifecycles.subscribe({
    models: ["plugin::i18n.locale"],
    async afterCreate(t) {
      await te(e, "admin").refreshNavigationLocale(t.result?.code);
    }
  });
}, Yl = ({ strapi: e }) => {
}, Ql = ({ strapi: e }) => {
}, Vl = {
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
}, Xl = {
  schema: Vl
}, Zl = Ka("navigation", {
  strapi
}), Jl = {
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
}, ef = {
  schema: Jl,
  lifecycles: Zl
}, tf = Ka("navigation-item", {
  strapi
}), nf = {
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
}, rf = {
  schema: nf,
  lifecycles: tf
}, of = {
  audience: Xl,
  navigation: ef,
  "navigation-item": rf
}, za = y.enum(["true", "false"]), en = y.string(), af = y.object({
  locale: y.string().optional(),
  orderBy: y.string().optional(),
  orderDirection: y.enum(["DESC", "ASC"]).optional()
}), Ya = y.enum(["FLAT", "TREE", "RFR"]), Qa = y.enum(["draft", "published"]), Va = y.union([y.boolean(), y.string(), y.string().array(), y.undefined()]), sf = y.object({
  type: Ya.optional(),
  menu: za.optional(),
  path: y.string().optional(),
  locale: y.string().optional(),
  populate: Va.optional(),
  status: Qa.optional()
}), cf = y.object({
  type: Ya.optional(),
  menu: za.optional(),
  locale: y.string().optional(),
  status: Qa.optional()
}), uf = y.object({
  source: y.string().min(1),
  target: y.string().min(1),
  documentId: y.string().min(1)
});
function lf(e) {
  return {
    getAdminService() {
      return te(e, "admin");
    },
    getCommonService() {
      return te(e, "common");
    },
    async get() {
      return await this.getAdminService().get({});
    },
    async post(t) {
      const { auditLog: n } = t;
      try {
        return await this.getAdminService().post({
          payload: Te.createNavigationSchema.parse(t.request.body),
          auditLog: n
        });
      } catch (r) {
        const i = r instanceof Error ? {
          name: r.name,
          message: r.message
        } : {};
        return t.internalServerError("Unable to create", { originalError: i });
      }
    },
    async put(t) {
      const {
        params: { documentId: n },
        auditLog: r
      } = t, i = y.record(y.string(), y.unknown()).parse(t.request.body);
      try {
        return await this.getAdminService().put({
          auditLog: r,
          payload: Te.updateNavigationSchema.parse({
            ...i,
            documentId: n
          })
        });
      } catch (a) {
        const o = a instanceof Error ? {
          name: a.name,
          message: a.message
        } : {};
        return t.internalServerError("Unable to update", { originalError: o });
      }
    },
    async delete(t) {
      const {
        auditLog: n,
        params: { documentId: r }
      } = t;
      return await this.getAdminService().delete({
        documentId: en.parse(r),
        auditLog: n
      }), {};
    },
    config() {
      return this.getAdminService().config({ viaSettingsPage: !1 });
    },
    async updateConfig(t) {
      return await this.getAdminService().updateConfig({
        config: Te.configSchema.parse(t.request.body)
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
      const {
        params: { documentId: n }
      } = t;
      return this.getAdminService().getById({ documentId: en.parse(n) });
    },
    getContentTypeItems(t) {
      const {
        params: { model: n },
        query: r = {}
      } = t;
      return this.getAdminService().getContentTypeItems({
        query: y.record(y.string(), y.unknown()).parse(r),
        uid: y.string().parse(n)
      });
    },
    async fillFromOtherLocale(t) {
      const { params: n, auditLog: r } = t, { source: i, target: a, documentId: o } = uf.parse(n);
      return await this.getAdminService().fillFromOtherLocale({
        source: i,
        target: a,
        documentId: o,
        auditLog: r
      });
    },
    readNavigationItemFromLocale(t) {
      const {
        params: { source: n, target: r },
        query: { path: i }
      } = t;
      return this.getAdminService().readNavigationItemFromLocale({
        path: y.string().parse(i),
        source: en.parse(n),
        target: en.parse(r)
      });
    },
    getSlug(t) {
      const {
        query: { q: n }
      } = t;
      return this.getCommonService().getSlug({ query: y.string().parse(n) }).then((r) => ({ slug: r }));
    },
    settingsLocale() {
      return this.getCommonService().readLocale();
    }
  };
}
const ff = (e) => {
  if (!(!e || e === !0 || e === "*") && typeof e != "object")
    return Array.isArray(e), e;
};
function pf(e) {
  return {
    getService() {
      return te(e, "client");
    },
    async readAll(t) {
      try {
        const { query: n = {} } = t, { locale: r, orderBy: i, orderDirection: a } = af.parse(n);
        return await this.getService().readAll({
          locale: r,
          orderBy: i,
          orderDirection: a
        });
      } catch (n) {
        if (n instanceof Error)
          return t.badRequest(n.message);
        throw n;
      }
    },
    async render(t) {
      const { params: n, query: r = {} } = t, {
        type: i,
        menu: a,
        path: o,
        locale: s,
        populate: c,
        status: f = "published"
      } = sf.parse(r), l = y.string().parse(n.idOrSlug);
      return await this.getService().render({
        idOrSlug: l,
        type: i,
        menuOnly: a === "true",
        rootPath: o,
        locale: s,
        populate: ff(
          Va.parse(
            c === "true" ? !0 : c === "false" ? !1 : Array.isArray(c) ? c.map((u) => u === "true" ? !0 : u === "false" ? !1 : c) : c
          )
        ),
        status: f
      });
    },
    async renderChild(t) {
      const { params: n, query: r = {} } = t, { type: i, menu: a, locale: o, status: s = "published" } = cf.parse(r), c = y.string().parse(n.idOrSlug), f = y.string().parse(n.childUIKey);
      return await this.getService().renderChildren({
        idOrSlug: c,
        childUIKey: f,
        type: i,
        menuOnly: a === "true",
        locale: o,
        status: s
      });
    }
  };
}
const df = {
  admin: lf,
  client: pf
}, hf = {}, mf = {}, gf = {
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
              actions: [pe.render("read")]
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
              actions: [pe.render("update")]
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
              actions: [pe.render("read")]
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
              actions: [pe.render("settings")]
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
              actions: [pe.render("settings")]
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
              actions: [pe.render("read")]
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
              actions: [pe.render("update")]
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
              actions: [pe.render("update")]
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
              actions: [pe.render("settings")]
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
              actions: [pe.render("settings")]
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
              actions: [pe.render("update")]
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
              actions: [pe.render("read")]
            }
          }
        ]
      }
    }
  ]
}, yf = {
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
}, vf = {
  admin: gf,
  "content-api": yf
};
function wf(e, t) {
  return de.has(process.env, e) ? process.env[e] : t;
}
function pt(e) {
  return process.env[e] ?? "";
}
const Ef = {
  int(e, t) {
    return de.has(process.env, e) ? parseInt(pt(e), 10) : t;
  },
  float(e, t) {
    return de.has(process.env, e) ? parseFloat(pt(e)) : t;
  },
  bool(e, t) {
    return de.has(process.env, e) ? pt(e) === "true" : t;
  },
  json(e, t) {
    if (!de.has(process.env, e))
      return t;
    try {
      return JSON.parse(pt(e));
    } catch (n) {
      throw n instanceof Error ? new Error(`Invalid json environment variable ${e}: ${n.message}`) : n;
    }
  },
  array(e, t) {
    if (!de.has(process.env, e))
      return t;
    let n = pt(e);
    return n.startsWith("[") && n.endsWith("]") && (n = n.substring(1, n.length - 1)), n.split(",").map((r) => de.trim(de.trim(r, " "), '"'));
  },
  date(e, t) {
    return de.has(process.env, e) ? new Date(pt(e)) : t;
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
    const r = bf(e, n);
    return t.includes(r) ? r : n;
  }
}, bf = Object.assign(wf, Ef), xf = "id", Sf = "documentId", Af = {
  ID_ATTRIBUTE: xf,
  DOC_ID_ATTRIBUTE: Sf
}, _f = (e) => wu(strapi?.config?.get("api.responses.privateAttributes", []) ?? [], Eu([], "options.privateAttributes", e)), Tf = (e, t) => e?.attributes?.[t]?.private === !0 ? !0 : _f(e).includes(t), Xa = (e) => e && ![
  "media",
  "component",
  "relation",
  "dynamiczone"
].includes(e.type), Cf = (e) => e?.type === "media", Za = (e) => e?.type === "relation", Rf = (e) => !!e && e.type === "dynamiczone", Ja = (e) => !!e && Za(e) && e.relation?.startsWith?.("morphTo"), wt = async (e, t, n) => {
  const { path: r = {
    raw: null,
    attribute: null
  }, schema: i, getModel: a } = t;
  let o = t.parent;
  const s = async (m, g, b) => {
    const T = {
      schema: a(b.__type),
      path: g,
      getModel: a,
      parent: o
    };
    return wt(m, T, b);
  }, c = (m) => async (g, b, x) => wt(g, {
    schema: m,
    path: b,
    getModel: a,
    parent: o
  }, x), f = async (m, g, b) => {
    const _ = {
      schema: a("plugin::upload.file"),
      path: g,
      getModel: a,
      parent: o
    };
    return wt(m, _, b);
  }, l = async (m, g, b, x) => wt(m, {
    schema: b,
    path: g,
    getModel: a,
    parent: o
  }, x), u = async (m, g, b) => {
    const T = {
      schema: a(b.__component),
      path: g,
      getModel: a,
      parent: o
    };
    return wt(m, T, b);
  };
  if (!$e(n) || oe(i))
    return n;
  const p = bu(n), d = Ff({
    data: p
  }), h = Object.keys(p);
  for (let m = 0; m < h.length; m += 1) {
    const g = h[m], b = i.attributes[g], x = {
      ...r
    };
    x.raw = oe(r.raw) ? g : `${r.raw}.${g}`, oe(b) || (x.attribute = oe(r.attribute) ? g : `${r.attribute}.${g}`);
    const T = {
      data: p,
      schema: i,
      key: g,
      value: p[g],
      attribute: b,
      path: x,
      getModel: a,
      parent: o
    };
    await e(T, d);
    const _ = p[g];
    if (!(oe(_) || oe(b))) {
      if (o = {
        schema: i,
        key: g,
        attribute: b,
        path: x
      }, Za(b)) {
        const R = b.relation.toLowerCase().startsWith("morph") ? s : c(a(b.target));
        if (We(_)) {
          const M = new Array(_.length);
          for (let S = 0; S < _.length; S += 1)
            M[S] = await R(e, x, _[S]);
          p[g] = M;
        } else
          p[g] = await R(e, x, _);
        continue;
      }
      if (Cf(b)) {
        if (We(_)) {
          const C = new Array(_.length);
          for (let R = 0; R < _.length; R += 1)
            C[R] = await f(e, x, _[R]);
          p[g] = C;
        } else
          p[g] = await f(e, x, _);
        continue;
      }
      if (b.type === "component") {
        const C = a(b.component);
        if (We(_)) {
          const R = new Array(_.length);
          for (let M = 0; M < _.length; M += 1)
            R[M] = await l(e, x, C, _[M]);
          p[g] = R;
        } else
          p[g] = await l(e, x, C, _);
        continue;
      }
      if (b.type === "dynamiczone" && We(_)) {
        const C = new Array(_.length);
        for (let R = 0; R < _.length; R += 1)
          C[R] = await u(e, x, _[R]);
        p[g] = C;
        continue;
      }
    }
  }
  return p;
}, Ff = ({ data: e }) => ({
  remove(t) {
    delete e[t];
  },
  set(t, n) {
    e[t] = n;
  }
});
var $f = De(wt), ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function es(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var If = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r(vn, no);
  })(ve, function(n, r) {
    return function(i) {
      function a(s) {
        if (o[s]) return o[s].exports;
        var c = o[s] = { exports: {}, id: s, loaded: !1 };
        return i[s].call(c.exports, c, c.exports, a), c.loaded = !0, c.exports;
      }
      var o = {};
      return a.m = i, a.c = o, a.p = "", a(0);
    }([function(i, a, o) {
      i.exports = o(34);
    }, function(i, a, o) {
      var s = o(29)("wks"), c = o(33), f = o(2).Symbol, l = typeof f == "function", u = i.exports = function(p) {
        return s[p] || (s[p] = l && f[p] || (l ? f : c)("Symbol." + p));
      };
      u.store = s;
    }, function(i, a) {
      var o = i.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
      typeof __g == "number" && (__g = o);
    }, function(i, a, o) {
      var s = o(9);
      i.exports = function(c) {
        if (!s(c)) throw TypeError(c + " is not an object!");
        return c;
      };
    }, function(i, a, o) {
      i.exports = !o(24)(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, a, o) {
      var s = o(12), c = o(17);
      i.exports = o(4) ? function(f, l, u) {
        return s.f(f, l, c(1, u));
      } : function(f, l, u) {
        return f[l] = u, f;
      };
    }, function(i, a) {
      var o = i.exports = { version: "2.4.0" };
      typeof __e == "number" && (__e = o);
    }, function(i, a, o) {
      var s = o(14);
      i.exports = function(c, f, l) {
        if (s(c), f === void 0) return c;
        switch (l) {
          case 1:
            return function(u) {
              return c.call(f, u);
            };
          case 2:
            return function(u, p) {
              return c.call(f, u, p);
            };
          case 3:
            return function(u, p, d) {
              return c.call(f, u, p, d);
            };
        }
        return function() {
          return c.apply(f, arguments);
        };
      };
    }, function(i, a) {
      var o = {}.hasOwnProperty;
      i.exports = function(s, c) {
        return o.call(s, c);
      };
    }, function(i, a) {
      i.exports = function(o) {
        return typeof o == "object" ? o !== null : typeof o == "function";
      };
    }, function(i, a) {
      i.exports = {};
    }, function(i, a) {
      var o = {}.toString;
      i.exports = function(s) {
        return o.call(s).slice(8, -1);
      };
    }, function(i, a, o) {
      var s = o(3), c = o(26), f = o(32), l = Object.defineProperty;
      a.f = o(4) ? Object.defineProperty : function(u, p, d) {
        if (s(u), p = f(p, !0), s(d), c) try {
          return l(u, p, d);
        } catch {
        }
        if ("get" in d || "set" in d) throw TypeError("Accessors not supported!");
        return "value" in d && (u[p] = d.value), u;
      };
    }, function(i, a, o) {
      var s = o(42), c = o(15);
      i.exports = function(f) {
        return s(c(f));
      };
    }, function(i, a) {
      i.exports = function(o) {
        if (typeof o != "function") throw TypeError(o + " is not a function!");
        return o;
      };
    }, function(i, a) {
      i.exports = function(o) {
        if (o == null) throw TypeError("Can't call method on  " + o);
        return o;
      };
    }, function(i, a, o) {
      var s = o(9), c = o(2).document, f = s(c) && s(c.createElement);
      i.exports = function(l) {
        return f ? c.createElement(l) : {};
      };
    }, function(i, a) {
      i.exports = function(o, s) {
        return { enumerable: !(1 & o), configurable: !(2 & o), writable: !(4 & o), value: s };
      };
    }, function(i, a, o) {
      var s = o(12).f, c = o(8), f = o(1)("toStringTag");
      i.exports = function(l, u, p) {
        l && !c(l = p ? l : l.prototype, f) && s(l, f, { configurable: !0, value: u });
      };
    }, function(i, a, o) {
      var s = o(29)("keys"), c = o(33);
      i.exports = function(f) {
        return s[f] || (s[f] = c(f));
      };
    }, function(i, a) {
      var o = Math.ceil, s = Math.floor;
      i.exports = function(c) {
        return isNaN(c = +c) ? 0 : (c > 0 ? s : o)(c);
      };
    }, function(i, a, o) {
      var s = o(11), c = o(1)("toStringTag"), f = s(/* @__PURE__ */ function() {
        return arguments;
      }()) == "Arguments", l = function(u, p) {
        try {
          return u[p];
        } catch {
        }
      };
      i.exports = function(u) {
        var p, d, h;
        return u === void 0 ? "Undefined" : u === null ? "Null" : typeof (d = l(p = Object(u), c)) == "string" ? d : f ? s(p) : (h = s(p)) == "Object" && typeof p.callee == "function" ? "Arguments" : h;
      };
    }, function(i, a) {
      i.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function(i, a, o) {
      var s = o(2), c = o(6), f = o(7), l = o(5), u = "prototype", p = function(d, h, m) {
        var g, b, x, T = d & p.F, _ = d & p.G, C = d & p.S, R = d & p.P, M = d & p.B, S = d & p.W, A = _ ? c : c[h] || (c[h] = {}), O = A[u], v = _ ? s : C ? s[h] : (s[h] || {})[u];
        _ && (m = h);
        for (g in m) b = !T && v && v[g] !== void 0, b && g in A || (x = b ? v[g] : m[g], A[g] = _ && typeof v[g] != "function" ? m[g] : M && b ? f(x, s) : S && v[g] == x ? function(D) {
          var j = function(G, w, E) {
            if (this instanceof D) {
              switch (arguments.length) {
                case 0:
                  return new D();
                case 1:
                  return new D(G);
                case 2:
                  return new D(G, w);
              }
              return new D(G, w, E);
            }
            return D.apply(this, arguments);
          };
          return j[u] = D[u], j;
        }(x) : R && typeof x == "function" ? f(Function.call, x) : x, R && ((A.virtual || (A.virtual = {}))[g] = x, d & p.R && O && !O[g] && l(O, g, x)));
      };
      p.F = 1, p.G = 2, p.S = 4, p.P = 8, p.B = 16, p.W = 32, p.U = 64, p.R = 128, i.exports = p;
    }, function(i, a) {
      i.exports = function(o) {
        try {
          return !!o();
        } catch {
          return !0;
        }
      };
    }, function(i, a, o) {
      i.exports = o(2).document && document.documentElement;
    }, function(i, a, o) {
      i.exports = !o(4) && !o(24)(function() {
        return Object.defineProperty(o(16)("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, a, o) {
      var s = o(28), c = o(23), f = o(57), l = o(5), u = o(8), p = o(10), d = o(45), h = o(18), m = o(52), g = o(1)("iterator"), b = !([].keys && "next" in [].keys()), x = "@@iterator", T = "keys", _ = "values", C = function() {
        return this;
      };
      i.exports = function(R, M, S, A, O, v, D) {
        d(S, M, A);
        var j, G, w, E = function(k) {
          if (!b && k in K) return K[k];
          switch (k) {
            case T:
              return function() {
                return new S(this, k);
              };
            case _:
              return function() {
                return new S(this, k);
              };
          }
          return function() {
            return new S(this, k);
          };
        }, F = M + " Iterator", L = O == _, H = !1, K = R.prototype, Y = K[g] || K[x] || O && K[O], Z = Y || E(O), Ae = O ? L ? E("entries") : Z : void 0, $ = M == "Array" && K.entries || Y;
        if ($ && (w = m($.call(new R())), w !== Object.prototype && (h(w, F, !0), s || u(w, g) || l(w, g, C))), L && Y && Y.name !== _ && (H = !0, Z = function() {
          return Y.call(this);
        }), s && !D || !b && !H && K[g] || l(K, g, Z), p[M] = Z, p[F] = C, O) if (j = { values: L ? Z : E(_), keys: v ? Z : E(T), entries: Ae }, D) for (G in j) G in K || f(K, G, j[G]);
        else c(c.P + c.F * (b || H), M, j);
        return j;
      };
    }, function(i, a) {
      i.exports = !0;
    }, function(i, a, o) {
      var s = o(2), c = "__core-js_shared__", f = s[c] || (s[c] = {});
      i.exports = function(l) {
        return f[l] || (f[l] = {});
      };
    }, function(i, a, o) {
      var s, c, f, l = o(7), u = o(41), p = o(25), d = o(16), h = o(2), m = h.process, g = h.setImmediate, b = h.clearImmediate, x = h.MessageChannel, T = 0, _ = {}, C = "onreadystatechange", R = function() {
        var S = +this;
        if (_.hasOwnProperty(S)) {
          var A = _[S];
          delete _[S], A();
        }
      }, M = function(S) {
        R.call(S.data);
      };
      g && b || (g = function(S) {
        for (var A = [], O = 1; arguments.length > O; ) A.push(arguments[O++]);
        return _[++T] = function() {
          u(typeof S == "function" ? S : Function(S), A);
        }, s(T), T;
      }, b = function(S) {
        delete _[S];
      }, o(11)(m) == "process" ? s = function(S) {
        m.nextTick(l(R, S, 1));
      } : x ? (c = new x(), f = c.port2, c.port1.onmessage = M, s = l(f.postMessage, f, 1)) : h.addEventListener && typeof postMessage == "function" && !h.importScripts ? (s = function(S) {
        h.postMessage(S + "", "*");
      }, h.addEventListener("message", M, !1)) : s = C in d("script") ? function(S) {
        p.appendChild(d("script"))[C] = function() {
          p.removeChild(this), R.call(S);
        };
      } : function(S) {
        setTimeout(l(R, S, 1), 0);
      }), i.exports = { set: g, clear: b };
    }, function(i, a, o) {
      var s = o(20), c = Math.min;
      i.exports = function(f) {
        return f > 0 ? c(s(f), 9007199254740991) : 0;
      };
    }, function(i, a, o) {
      var s = o(9);
      i.exports = function(c, f) {
        if (!s(c)) return c;
        var l, u;
        if (f && typeof (l = c.toString) == "function" && !s(u = l.call(c)) || typeof (l = c.valueOf) == "function" && !s(u = l.call(c)) || !f && typeof (l = c.toString) == "function" && !s(u = l.call(c))) return u;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function(i, a) {
      var o = 0, s = Math.random();
      i.exports = function(c) {
        return "Symbol(".concat(c === void 0 ? "" : c, ")_", (++o + s).toString(36));
      };
    }, function(i, a, o) {
      function s(C) {
        return C && C.__esModule ? C : { default: C };
      }
      function c() {
        return process.platform !== "win32" ? "" : process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432") ? "mixed" : "native";
      }
      function f(C) {
        return (0, g.createHash)("sha256").update(C).digest("hex");
      }
      function l(C) {
        switch (x) {
          case "darwin":
            return C.split("IOPlatformUUID")[1].split(`
`)[0].replace(/\=|\s+|\"/gi, "").toLowerCase();
          case "win32":
            return C.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "linux":
            return C.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "freebsd":
            return C.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          default:
            throw new Error("Unsupported platform: " + process.platform);
        }
      }
      function u(C) {
        var R = l((0, m.execSync)(_[x]).toString());
        return C ? R : f(R);
      }
      function p(C) {
        return new h.default(function(R, M) {
          return (0, m.exec)(_[x], {}, function(S, A, O) {
            if (S) return M(new Error("Error while obtaining machine id: " + S.stack));
            var v = l(A.toString());
            return R(C ? v : f(v));
          });
        });
      }
      Object.defineProperty(a, "__esModule", { value: !0 });
      var d = o(35), h = s(d);
      a.machineIdSync = u, a.machineId = p;
      var m = o(70), g = o(71), b = process, x = b.platform, T = { native: "%windir%\\System32", mixed: "%windir%\\sysnative\\cmd.exe /c %windir%\\System32" }, _ = { darwin: "ioreg -rd1 -c IOPlatformExpertDevice", win32: T[c()] + "\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid", linux: "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :", freebsd: "kenv -q smbios.system.uuid || sysctl -n kern.hostuuid" };
    }, function(i, a, o) {
      i.exports = { default: o(36), __esModule: !0 };
    }, function(i, a, o) {
      o(66), o(68), o(69), o(67), i.exports = o(6).Promise;
    }, function(i, a) {
      i.exports = function() {
      };
    }, function(i, a) {
      i.exports = function(o, s, c, f) {
        if (!(o instanceof s) || f !== void 0 && f in o) throw TypeError(c + ": incorrect invocation!");
        return o;
      };
    }, function(i, a, o) {
      var s = o(13), c = o(31), f = o(62);
      i.exports = function(l) {
        return function(u, p, d) {
          var h, m = s(u), g = c(m.length), b = f(d, g);
          if (l && p != p) {
            for (; g > b; ) if (h = m[b++], h != h) return !0;
          } else for (; g > b; b++) if ((l || b in m) && m[b] === p) return l || b || 0;
          return !l && -1;
        };
      };
    }, function(i, m, o) {
      var s = o(7), c = o(44), f = o(43), l = o(3), u = o(31), p = o(64), d = {}, h = {}, m = i.exports = function(g, b, x, T, _) {
        var C, R, M, S, A = _ ? function() {
          return g;
        } : p(g), O = s(x, T, b ? 2 : 1), v = 0;
        if (typeof A != "function") throw TypeError(g + " is not iterable!");
        if (f(A)) {
          for (C = u(g.length); C > v; v++) if (S = b ? O(l(R = g[v])[0], R[1]) : O(g[v]), S === d || S === h) return S;
        } else for (M = A.call(g); !(R = M.next()).done; ) if (S = c(M, O, R.value, b), S === d || S === h) return S;
      };
      m.BREAK = d, m.RETURN = h;
    }, function(i, a) {
      i.exports = function(o, s, c) {
        var f = c === void 0;
        switch (s.length) {
          case 0:
            return f ? o() : o.call(c);
          case 1:
            return f ? o(s[0]) : o.call(c, s[0]);
          case 2:
            return f ? o(s[0], s[1]) : o.call(c, s[0], s[1]);
          case 3:
            return f ? o(s[0], s[1], s[2]) : o.call(c, s[0], s[1], s[2]);
          case 4:
            return f ? o(s[0], s[1], s[2], s[3]) : o.call(c, s[0], s[1], s[2], s[3]);
        }
        return o.apply(c, s);
      };
    }, function(i, a, o) {
      var s = o(11);
      i.exports = Object("z").propertyIsEnumerable(0) ? Object : function(c) {
        return s(c) == "String" ? c.split("") : Object(c);
      };
    }, function(i, a, o) {
      var s = o(10), c = o(1)("iterator"), f = Array.prototype;
      i.exports = function(l) {
        return l !== void 0 && (s.Array === l || f[c] === l);
      };
    }, function(i, a, o) {
      var s = o(3);
      i.exports = function(c, f, l, u) {
        try {
          return u ? f(s(l)[0], l[1]) : f(l);
        } catch (d) {
          var p = c.return;
          throw p !== void 0 && s(p.call(c)), d;
        }
      };
    }, function(i, a, o) {
      var s = o(49), c = o(17), f = o(18), l = {};
      o(5)(l, o(1)("iterator"), function() {
        return this;
      }), i.exports = function(u, p, d) {
        u.prototype = s(l, { next: c(1, d) }), f(u, p + " Iterator");
      };
    }, function(i, a, o) {
      var s = o(1)("iterator"), c = !1;
      try {
        var f = [7][s]();
        f.return = function() {
          c = !0;
        }, Array.from(f, function() {
          throw 2;
        });
      } catch {
      }
      i.exports = function(l, u) {
        if (!u && !c) return !1;
        var p = !1;
        try {
          var d = [7], h = d[s]();
          h.next = function() {
            return { done: p = !0 };
          }, d[s] = function() {
            return h;
          }, l(d);
        } catch {
        }
        return p;
      };
    }, function(i, a) {
      i.exports = function(o, s) {
        return { value: s, done: !!o };
      };
    }, function(i, a, o) {
      var s = o(2), c = o(30).set, f = s.MutationObserver || s.WebKitMutationObserver, l = s.process, u = s.Promise, p = o(11)(l) == "process";
      i.exports = function() {
        var d, h, m, g = function() {
          var _, C;
          for (p && (_ = l.domain) && _.exit(); d; ) {
            C = d.fn, d = d.next;
            try {
              C();
            } catch (R) {
              throw d ? m() : h = void 0, R;
            }
          }
          h = void 0, _ && _.enter();
        };
        if (p) m = function() {
          l.nextTick(g);
        };
        else if (f) {
          var b = !0, x = document.createTextNode("");
          new f(g).observe(x, { characterData: !0 }), m = function() {
            x.data = b = !b;
          };
        } else if (u && u.resolve) {
          var T = u.resolve();
          m = function() {
            T.then(g);
          };
        } else m = function() {
          c.call(s, g);
        };
        return function(_) {
          var C = { fn: _, next: void 0 };
          h && (h.next = C), d || (d = C, m()), h = C;
        };
      };
    }, function(i, a, o) {
      var s = o(3), c = o(50), f = o(22), l = o(19)("IE_PROTO"), u = function() {
      }, p = "prototype", d = function() {
        var h, m = o(16)("iframe"), g = f.length, b = ">";
        for (m.style.display = "none", o(25).appendChild(m), m.src = "javascript:", h = m.contentWindow.document, h.open(), h.write("<script>document.F=Object<\/script" + b), h.close(), d = h.F; g--; ) delete d[p][f[g]];
        return d();
      };
      i.exports = Object.create || function(h, m) {
        var g;
        return h !== null ? (u[p] = s(h), g = new u(), u[p] = null, g[l] = h) : g = d(), m === void 0 ? g : c(g, m);
      };
    }, function(i, a, o) {
      var s = o(12), c = o(3), f = o(54);
      i.exports = o(4) ? Object.defineProperties : function(l, u) {
        c(l);
        for (var p, d = f(u), h = d.length, m = 0; h > m; ) s.f(l, p = d[m++], u[p]);
        return l;
      };
    }, function(i, a, o) {
      var s = o(55), c = o(17), f = o(13), l = o(32), u = o(8), p = o(26), d = Object.getOwnPropertyDescriptor;
      a.f = o(4) ? d : function(h, m) {
        if (h = f(h), m = l(m, !0), p) try {
          return d(h, m);
        } catch {
        }
        if (u(h, m)) return c(!s.f.call(h, m), h[m]);
      };
    }, function(i, a, o) {
      var s = o(8), c = o(63), f = o(19)("IE_PROTO"), l = Object.prototype;
      i.exports = Object.getPrototypeOf || function(u) {
        return u = c(u), s(u, f) ? u[f] : typeof u.constructor == "function" && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? l : null;
      };
    }, function(i, a, o) {
      var s = o(8), c = o(13), f = o(39)(!1), l = o(19)("IE_PROTO");
      i.exports = function(u, p) {
        var d, h = c(u), m = 0, g = [];
        for (d in h) d != l && s(h, d) && g.push(d);
        for (; p.length > m; ) s(h, d = p[m++]) && (~f(g, d) || g.push(d));
        return g;
      };
    }, function(i, a, o) {
      var s = o(53), c = o(22);
      i.exports = Object.keys || function(f) {
        return s(f, c);
      };
    }, function(i, a) {
      a.f = {}.propertyIsEnumerable;
    }, function(i, a, o) {
      var s = o(5);
      i.exports = function(c, f, l) {
        for (var u in f) l && c[u] ? c[u] = f[u] : s(c, u, f[u]);
        return c;
      };
    }, function(i, a, o) {
      i.exports = o(5);
    }, function(i, a, o) {
      var s = o(9), c = o(3), f = function(l, u) {
        if (c(l), !s(u) && u !== null) throw TypeError(u + ": can't set as prototype!");
      };
      i.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function(l, u, p) {
        try {
          p = o(7)(Function.call, o(51).f(Object.prototype, "__proto__").set, 2), p(l, []), u = !(l instanceof Array);
        } catch {
          u = !0;
        }
        return function(d, h) {
          return f(d, h), u ? d.__proto__ = h : p(d, h), d;
        };
      }({}, !1) : void 0), check: f };
    }, function(i, a, o) {
      var s = o(2), c = o(6), f = o(12), l = o(4), u = o(1)("species");
      i.exports = function(p) {
        var d = typeof c[p] == "function" ? c[p] : s[p];
        l && d && !d[u] && f.f(d, u, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, function(i, a, o) {
      var s = o(3), c = o(14), f = o(1)("species");
      i.exports = function(l, u) {
        var p, d = s(l).constructor;
        return d === void 0 || (p = s(d)[f]) == null ? u : c(p);
      };
    }, function(i, a, o) {
      var s = o(20), c = o(15);
      i.exports = function(f) {
        return function(l, u) {
          var p, d, h = String(c(l)), m = s(u), g = h.length;
          return m < 0 || m >= g ? f ? "" : void 0 : (p = h.charCodeAt(m), p < 55296 || p > 56319 || m + 1 === g || (d = h.charCodeAt(m + 1)) < 56320 || d > 57343 ? f ? h.charAt(m) : p : f ? h.slice(m, m + 2) : (p - 55296 << 10) + (d - 56320) + 65536);
        };
      };
    }, function(i, a, o) {
      var s = o(20), c = Math.max, f = Math.min;
      i.exports = function(l, u) {
        return l = s(l), l < 0 ? c(l + u, 0) : f(l, u);
      };
    }, function(i, a, o) {
      var s = o(15);
      i.exports = function(c) {
        return Object(s(c));
      };
    }, function(i, a, o) {
      var s = o(21), c = o(1)("iterator"), f = o(10);
      i.exports = o(6).getIteratorMethod = function(l) {
        if (l != null) return l[c] || l["@@iterator"] || f[s(l)];
      };
    }, function(i, a, o) {
      var s = o(37), c = o(47), f = o(10), l = o(13);
      i.exports = o(27)(Array, "Array", function(u, p) {
        this._t = l(u), this._i = 0, this._k = p;
      }, function() {
        var u = this._t, p = this._k, d = this._i++;
        return !u || d >= u.length ? (this._t = void 0, c(1)) : p == "keys" ? c(0, d) : p == "values" ? c(0, u[d]) : c(0, [d, u[d]]);
      }, "values"), f.Arguments = f.Array, s("keys"), s("values"), s("entries");
    }, function(i, a) {
    }, function(i, a, o) {
      var s, c, f, l = o(28), u = o(2), p = o(7), d = o(21), h = o(23), m = o(9), g = (o(3), o(14)), b = o(38), x = o(40), T = (o(58).set, o(60)), _ = o(30).set, C = o(48)(), R = "Promise", M = u.TypeError, A = u.process, S = u[R], A = u.process, O = d(A) == "process", v = function() {
      }, D = !!function() {
        try {
          var $ = S.resolve(1), k = ($.constructor = {})[o(1)("species")] = function(N) {
            N(v, v);
          };
          return (O || typeof PromiseRejectionEvent == "function") && $.then(v) instanceof k;
        } catch {
        }
      }(), j = function($, k) {
        return $ === k || $ === S && k === f;
      }, G = function($) {
        var k;
        return !(!m($) || typeof (k = $.then) != "function") && k;
      }, w = function($) {
        return j(S, $) ? new E($) : new c($);
      }, E = c = function($) {
        var k, N;
        this.promise = new $(function(z, se) {
          if (k !== void 0 || N !== void 0) throw M("Bad Promise constructor");
          k = z, N = se;
        }), this.resolve = g(k), this.reject = g(N);
      }, F = function($) {
        try {
          $();
        } catch (k) {
          return { error: k };
        }
      }, L = function($, k) {
        if (!$._n) {
          $._n = !0;
          var N = $._c;
          C(function() {
            for (var z = $._v, se = $._s == 1, P = 0, W = function(I) {
              var U, Q, re = se ? I.ok : I.fail, V = I.resolve, Oe = I.reject, je = I.domain;
              try {
                re ? (se || ($._h == 2 && Y($), $._h = 1), re === !0 ? U = z : (je && je.enter(), U = re(z), je && je.exit()), U === I.promise ? Oe(M("Promise-chain cycle")) : (Q = G(U)) ? Q.call(U, V, Oe) : V(U)) : Oe(z);
              } catch (lu) {
                Oe(lu);
              }
            }; N.length > P; ) W(N[P++]);
            $._c = [], $._n = !1, k && !$._h && H($);
          });
        }
      }, H = function($) {
        _.call(u, function() {
          var k, N, z, se = $._v;
          if (K($) && (k = F(function() {
            O ? A.emit("unhandledRejection", se, $) : (N = u.onunhandledrejection) ? N({ promise: $, reason: se }) : (z = u.console) && z.error && z.error("Unhandled promise rejection", se);
          }), $._h = O || K($) ? 2 : 1), $._a = void 0, k) throw k.error;
        });
      }, K = function($) {
        if ($._h == 1) return !1;
        for (var k, N = $._a || $._c, z = 0; N.length > z; ) if (k = N[z++], k.fail || !K(k.promise)) return !1;
        return !0;
      }, Y = function($) {
        _.call(u, function() {
          var k;
          O ? A.emit("rejectionHandled", $) : (k = u.onrejectionhandled) && k({ promise: $, reason: $._v });
        });
      }, Z = function($) {
        var k = this;
        k._d || (k._d = !0, k = k._w || k, k._v = $, k._s = 2, k._a || (k._a = k._c.slice()), L(k, !0));
      }, Ae = function($) {
        var k, N = this;
        if (!N._d) {
          N._d = !0, N = N._w || N;
          try {
            if (N === $) throw M("Promise can't be resolved itself");
            (k = G($)) ? C(function() {
              var z = { _w: N, _d: !1 };
              try {
                k.call($, p(Ae, z, 1), p(Z, z, 1));
              } catch (se) {
                Z.call(z, se);
              }
            }) : (N._v = $, N._s = 1, L(N, !1));
          } catch (z) {
            Z.call({ _w: N, _d: !1 }, z);
          }
        }
      };
      D || (S = function($) {
        b(this, S, R, "_h"), g($), s.call(this);
        try {
          $(p(Ae, this, 1), p(Z, this, 1));
        } catch (k) {
          Z.call(this, k);
        }
      }, s = function($) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
      }, s.prototype = o(56)(S.prototype, { then: function($, k) {
        var N = w(T(this, S));
        return N.ok = typeof $ != "function" || $, N.fail = typeof k == "function" && k, N.domain = O ? A.domain : void 0, this._c.push(N), this._a && this._a.push(N), this._s && L(this, !1), N.promise;
      }, catch: function($) {
        return this.then(void 0, $);
      } }), E = function() {
        var $ = new s();
        this.promise = $, this.resolve = p(Ae, $, 1), this.reject = p(Z, $, 1);
      }), h(h.G + h.W + h.F * !D, { Promise: S }), o(18)(S, R), o(59)(R), f = o(6)[R], h(h.S + h.F * !D, R, { reject: function($) {
        var k = w(this), N = k.reject;
        return N($), k.promise;
      } }), h(h.S + h.F * (l || !D), R, { resolve: function($) {
        if ($ instanceof S && j($.constructor, this)) return $;
        var k = w(this), N = k.resolve;
        return N($), k.promise;
      } }), h(h.S + h.F * !(D && o(46)(function($) {
        S.all($).catch(v);
      })), R, { all: function($) {
        var k = this, N = w(k), z = N.resolve, se = N.reject, P = F(function() {
          var W = [], I = 0, U = 1;
          x($, !1, function(Q) {
            var re = I++, V = !1;
            W.push(void 0), U++, k.resolve(Q).then(function(Oe) {
              V || (V = !0, W[re] = Oe, --U || z(W));
            }, se);
          }), --U || z(W);
        });
        return P && se(P.error), N.promise;
      }, race: function($) {
        var k = this, N = w(k), z = N.reject, se = F(function() {
          x($, !1, function(P) {
            k.resolve(P).then(N.resolve, z);
          });
        });
        return se && z(se.error), N.promise;
      } });
    }, function(i, a, o) {
      var s = o(61)(!0);
      o(27)(String, "String", function(c) {
        this._t = String(c), this._i = 0;
      }, function() {
        var c, f = this._t, l = this._i;
        return l >= f.length ? { value: void 0, done: !0 } : (c = s(f, l), this._i += c.length, { value: c, done: !1 });
      });
    }, function(i, a, o) {
      o(65);
      for (var s = o(2), c = o(5), f = o(10), l = o(1)("toStringTag"), u = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var d = u[p], h = s[d], m = h && h.prototype;
        m && !m[l] && c(m, l, d), f[d] = f.Array;
      }
    }, function(i, a) {
      i.exports = vn;
    }, function(i, a) {
      i.exports = no;
    }]);
  });
})(If);
var Vr;
try {
  Vr = Map;
} catch {
}
var Xr;
try {
  Xr = Set;
} catch {
}
function ts(e, t, n) {
  if (!e || typeof e != "object" || typeof e == "function")
    return e;
  if (e.nodeType && "cloneNode" in e)
    return e.cloneNode(!0);
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp)
    return new RegExp(e);
  if (Array.isArray(e))
    return e.map(Zr);
  if (Vr && e instanceof Vr)
    return new Map(Array.from(e.entries()));
  if (Xr && e instanceof Xr)
    return new Set(Array.from(e.values()));
  if (e instanceof Object) {
    t.push(e);
    var r = Object.create(e);
    n.push(r);
    for (var i in e) {
      var a = t.findIndex(function(o) {
        return o === e[i];
      });
      r[i] = a > -1 ? n[a] : ts(e[i], t, n);
    }
    return r;
  }
  return e;
}
function Zr(e) {
  return ts(e, [], []);
}
const Of = Object.prototype.toString, Nf = Error.prototype.toString, Pf = RegExp.prototype.toString, Lf = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", kf = /^Symbol\((.*)\)(.*)$/;
function Df(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : "" + e;
}
function lo(e, t = !1) {
  if (e == null || e === !0 || e === !1) return "" + e;
  const n = typeof e;
  if (n === "number") return Df(e);
  if (n === "string") return t ? `"${e}"` : e;
  if (n === "function") return "[Function " + (e.name || "anonymous") + "]";
  if (n === "symbol") return Lf.call(e).replace(kf, "Symbol($1)");
  const r = Of.call(e).slice(8, -1);
  return r === "Date" ? isNaN(e.getTime()) ? "" + e : e.toISOString(e) : r === "Error" || e instanceof Error ? "[" + Nf.call(e) + "]" : r === "RegExp" ? Pf.call(e) : null;
}
function Rt(e, t) {
  let n = lo(e, t);
  return n !== null ? n : JSON.stringify(e, function(r, i) {
    let a = lo(this[r], t);
    return a !== null ? a : i;
  }, 2);
}
let Ze = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path: e,
    type: t,
    value: n,
    originalValue: r
  }) => {
    let i = r != null && r !== n, a = `${e} must be a \`${t}\` type, but the final value was: \`${Rt(n, !0)}\`` + (i ? ` (cast from the value \`${Rt(r, !0)}\`).` : ".");
    return n === null && (a += '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'), a;
  },
  defined: "${path} must be defined"
}, Re = {
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
}, Mf = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
}, Jr = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
}, jf = {
  isValue: "${path} field must be ${value}"
}, ei = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
}, ln = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must be have ${length} items"
};
const Hf = Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: Ze,
  string: Re,
  number: Mf,
  date: Jr,
  object: ei,
  array: ln,
  boolean: jf
}), zn = (e) => e && e.__isYupSchema__;
class Bf {
  constructor(t, n) {
    if (this.refs = t, this.refs = t, typeof n == "function") {
      this.fn = n;
      return;
    }
    if (!wn(n, "is")) throw new TypeError("`is:` is required for `when()` conditions");
    if (!n.then && !n.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is: r,
      then: i,
      otherwise: a
    } = n, o = typeof r == "function" ? r : (...s) => s.every((c) => c === r);
    this.fn = function(...s) {
      let c = s.pop(), f = s.pop(), l = o(...s) ? i : a;
      if (l)
        return typeof l == "function" ? l(f) : f.concat(l.resolve(c));
    };
  }
  resolve(t, n) {
    let r = this.refs.map((a) => a.getValue(n?.value, n?.parent, n?.context)), i = this.fn.apply(t, r.concat(t, n));
    if (i === void 0 || i === t) return t;
    if (!zn(i)) throw new TypeError("conditions must return a schema object");
    return i.resolve(n);
  }
}
function ns(e) {
  return e == null ? [] : [].concat(e);
}
function ti() {
  return ti = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ti.apply(this, arguments);
}
let Uf = /\$\{\s*(\w+)\s*\}/g;
class he extends Error {
  static formatError(t, n) {
    const r = n.label || n.path || "this";
    return r !== n.path && (n = ti({}, n, {
      path: r
    })), typeof t == "string" ? t.replace(Uf, (i, a) => Rt(n[a])) : typeof t == "function" ? t(n) : t;
  }
  static isError(t) {
    return t && t.name === "ValidationError";
  }
  constructor(t, n, r, i) {
    super(), this.name = "ValidationError", this.value = n, this.path = r, this.type = i, this.errors = [], this.inner = [], ns(t).forEach((a) => {
      he.isError(a) ? (this.errors.push(...a.errors), this.inner = this.inner.concat(a.inner.length ? a.inner : a)) : this.errors.push(a);
    }), this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0], Error.captureStackTrace && Error.captureStackTrace(this, he);
  }
}
const Gf = (e) => {
  let t = !1;
  return (...n) => {
    t || (t = !0, e(...n));
  };
};
function xn(e, t) {
  let {
    endEarly: n,
    tests: r,
    args: i,
    value: a,
    errors: o,
    sort: s,
    path: c
  } = e, f = Gf(t), l = r.length;
  const u = [];
  if (o = o || [], !l) return o.length ? f(new he(o, a, c)) : f(null, a);
  for (let p = 0; p < r.length; p++) {
    const d = r[p];
    d(i, function(m) {
      if (m) {
        if (!he.isError(m))
          return f(m, a);
        if (n)
          return m.value = a, f(m, a);
        u.push(m);
      }
      if (--l <= 0) {
        if (u.length && (s && u.sort(s), o.length && u.push(...o), o = u), o.length) {
          f(new he(o, a, c), a);
          return;
        }
        f(null, a);
      }
    });
  }
}
function lt(e) {
  this._maxSize = e, this.clear();
}
lt.prototype.clear = function() {
  this._size = 0, this._values = /* @__PURE__ */ Object.create(null);
};
lt.prototype.get = function(e) {
  return this._values[e];
};
lt.prototype.set = function(e, t) {
  return this._size >= this._maxSize && this.clear(), e in this._values || this._size++, this._values[e] = t;
};
var qf = /[^.^\]^[]+|(?=\[\]|\.\.)/g, rs = /^\d+$/, Kf = /^\d/, Wf = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, zf = /^\s*(['"]?)(.*?)(\1)\s*$/, mi = 512, fo = new lt(mi), po = new lt(mi), ho = new lt(mi), Yn = {
  Cache: lt,
  split: ni,
  normalizePath: yr,
  setter: function(e) {
    var t = yr(e);
    return po.get(e) || po.set(e, function(r, i) {
      for (var a = 0, o = t.length, s = r; a < o - 1; ) {
        var c = t[a];
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return r;
        s = s[t[a++]];
      }
      s[t[a]] = i;
    });
  },
  getter: function(e, t) {
    var n = yr(e);
    return ho.get(e) || ho.set(e, function(i) {
      for (var a = 0, o = n.length; a < o; )
        if (i != null || !t) i = i[n[a++]];
        else return;
      return i;
    });
  },
  join: function(e) {
    return e.reduce(function(t, n) {
      return t + (gi(n) || rs.test(n) ? "[" + n + "]" : (t ? "." : "") + n);
    }, "");
  },
  forEach: function(e, t, n) {
    Yf(Array.isArray(e) ? e : ni(e), t, n);
  }
};
function yr(e) {
  return fo.get(e) || fo.set(
    e,
    ni(e).map(function(t) {
      return t.replace(zf, "$2");
    })
  );
}
function ni(e) {
  return e.match(qf) || [""];
}
function Yf(e, t, n) {
  var r = e.length, i, a, o, s;
  for (a = 0; a < r; a++)
    i = e[a], i && (Xf(i) && (i = '"' + i + '"'), s = gi(i), o = !s && /^\d+$/.test(i), t.call(n, i, s, o, a, e));
}
function gi(e) {
  return typeof e == "string" && e && ["'", '"'].indexOf(e.charAt(0)) !== -1;
}
function Qf(e) {
  return e.match(Kf) && !e.match(rs);
}
function Vf(e) {
  return Wf.test(e);
}
function Xf(e) {
  return !gi(e) && (Qf(e) || Vf(e));
}
const tn = {
  context: "$",
  value: "."
};
class at {
  constructor(t, n = {}) {
    if (typeof t != "string") throw new TypeError("ref must be a string, got: " + t);
    if (this.key = t.trim(), t === "") throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === tn.context, this.isValue = this.key[0] === tn.value, this.isSibling = !this.isContext && !this.isValue;
    let r = this.isContext ? tn.context : this.isValue ? tn.value : "";
    this.path = this.key.slice(r.length), this.getter = this.path && Yn.getter(this.path, !0), this.map = n.map;
  }
  getValue(t, n, r) {
    let i = this.isContext ? r : this.isValue ? t : n;
    return this.getter && (i = this.getter(i || {})), this.map && (i = this.map(i)), i;
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
at.prototype.__isYupRef = !0;
function Sn() {
  return Sn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Sn.apply(this, arguments);
}
function Zf(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function nn(e) {
  function t(n, r) {
    let {
      value: i,
      path: a = "",
      label: o,
      options: s,
      originalValue: c,
      sync: f
    } = n, l = Zf(n, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name: u,
      test: p,
      params: d,
      message: h
    } = e;
    let {
      parent: m,
      context: g
    } = s;
    function b(R) {
      return at.isRef(R) ? R.getValue(i, m, g) : R;
    }
    function x(R = {}) {
      const M = Pa(Sn({
        value: i,
        originalValue: c,
        label: o,
        path: R.path || a
      }, d, R.params), b), S = new he(he.formatError(R.message || h, M), i, M.path, R.type || u);
      return S.params = M, S;
    }
    let T = Sn({
      path: a,
      parent: m,
      type: u,
      createError: x,
      resolve: b,
      options: s,
      originalValue: c
    }, l);
    if (!f) {
      try {
        Promise.resolve(p.call(T, i, T)).then((R) => {
          he.isError(R) ? r(R) : R ? r(null, R) : r(x());
        });
      } catch (R) {
        r(R);
      }
      return;
    }
    let _;
    try {
      var C;
      if (_ = p.call(T, i, T), typeof ((C = _) == null ? void 0 : C.then) == "function")
        throw new Error(`Validation test of type: "${T.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
    } catch (R) {
      r(R);
      return;
    }
    he.isError(_) ? r(_) : _ ? r(null, _) : r(x());
  }
  return t.OPTIONS = e, t;
}
let Jf = (e) => e.substr(0, e.length - 1).substr(1);
function ep(e, t, n, r = n) {
  let i, a, o;
  return t ? (Yn.forEach(t, (s, c, f) => {
    let l = c ? Jf(s) : s;
    if (e = e.resolve({
      context: r,
      parent: i,
      value: n
    }), e.innerType) {
      let u = f ? parseInt(l, 10) : 0;
      if (n && u >= n.length)
        throw new Error(`Yup.reach cannot resolve an array item at index: ${s}, in the path: ${t}. because there is no value at that index. `);
      i = n, n = n && n[u], e = e.innerType;
    }
    if (!f) {
      if (!e.fields || !e.fields[l]) throw new Error(`The schema does not contain the path: ${t}. (failed at: ${o} which is a type: "${e._type}")`);
      i = n, n = n && n[l], e = e.fields[l];
    }
    a = l, o = c ? "[" + s + "]" : "." + s;
  }), {
    schema: e,
    parent: i,
    parentPath: a
  }) : {
    parent: i,
    parentPath: t,
    schema: e
  };
}
class An {
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
    at.isRef(t) ? this.refs.set(t.key, t) : this.list.add(t);
  }
  delete(t) {
    at.isRef(t) ? this.refs.delete(t.key) : this.list.delete(t);
  }
  has(t, n) {
    if (this.list.has(t)) return !0;
    let r, i = this.refs.values();
    for (; r = i.next(), !r.done; ) if (n(r.value) === t) return !0;
    return !1;
  }
  clone() {
    const t = new An();
    return t.list = new Set(this.list), t.refs = new Map(this.refs), t;
  }
  merge(t, n) {
    const r = this.clone();
    return t.list.forEach((i) => r.add(i)), t.refs.forEach((i) => r.add(i)), n.list.forEach((i) => r.delete(i)), n.refs.forEach((i) => r.delete(i)), r;
  }
}
function _e() {
  return _e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _e.apply(this, arguments);
}
class me {
  constructor(t) {
    this.deps = [], this.conditions = [], this._whitelist = new An(), this._blacklist = new An(), this.exclusiveTests = /* @__PURE__ */ Object.create(null), this.tests = [], this.transforms = [], this.withMutation(() => {
      this.typeError(Ze.notType);
    }), this.type = t?.type || "mixed", this.spec = _e({
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
    return n.type = this.type, n._typeError = this._typeError, n._whitelistError = this._whitelistError, n._blacklistError = this._blacklistError, n._whitelist = this._whitelist.clone(), n._blacklist = this._blacklist.clone(), n.exclusiveTests = _e({}, this.exclusiveTests), n.deps = [...this.deps], n.conditions = [...this.conditions], n.tests = [...this.tests], n.transforms = [...this.transforms], n.spec = Zr(_e({}, this.spec, t)), n;
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
    let r = t(this);
    return this._mutate = n, r;
  }
  concat(t) {
    if (!t || t === this) return this;
    if (t.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);
    let n = this, r = t.clone();
    const i = _e({}, n.spec, r.spec);
    return r.spec = i, r._typeError || (r._typeError = n._typeError), r._whitelistError || (r._whitelistError = n._whitelistError), r._blacklistError || (r._blacklistError = n._blacklistError), r._whitelist = n._whitelist.merge(t._whitelist, t._blacklist), r._blacklist = n._blacklist.merge(t._blacklist, t._whitelist), r.tests = n.tests, r.exclusiveTests = n.exclusiveTests, r.withMutation((a) => {
      t.tests.forEach((o) => {
        a.test(o.OPTIONS);
      });
    }), r;
  }
  isType(t) {
    return this.spec.nullable && t === null ? !0 : this._typeCheck(t);
  }
  resolve(t) {
    let n = this;
    if (n.conditions.length) {
      let r = n.conditions;
      n = n.clone(), n.conditions = [], n = r.reduce((i, a) => a.resolve(i, t), n), n = n.resolve(t);
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
    let r = this.resolve(_e({
      value: t
    }, n)), i = r._cast(t, n);
    if (t !== void 0 && n.assert !== !1 && r.isType(i) !== !0) {
      let a = Rt(t), o = Rt(i);
      throw new TypeError(`The value of ${n.path || "field"} could not be cast to a value that satisfies the schema type: "${r._type}". 

attempted value: ${a} 
` + (o !== a ? `result of cast: ${o}` : ""));
    }
    return i;
  }
  _cast(t, n) {
    let r = t === void 0 ? t : this.transforms.reduce((i, a) => a.call(this, i, t, this), t);
    return r === void 0 && (r = this.getDefault()), r;
  }
  _validate(t, n = {}, r) {
    let {
      sync: i,
      path: a,
      from: o = [],
      originalValue: s = t,
      strict: c = this.spec.strict,
      abortEarly: f = this.spec.abortEarly
    } = n, l = t;
    c || (l = this._cast(l, _e({
      assert: !1
    }, n)));
    let u = {
      value: l,
      path: a,
      options: n,
      originalValue: s,
      schema: this,
      label: this.spec.label,
      sync: i,
      from: o
    }, p = [];
    this._typeError && p.push(this._typeError), this._whitelistError && p.push(this._whitelistError), this._blacklistError && p.push(this._blacklistError), xn({
      args: u,
      value: l,
      path: a,
      tests: p,
      endEarly: f
    }, (d) => {
      if (d) return void r(d, l);
      xn({
        tests: this.tests,
        args: u,
        path: a,
        sync: i,
        value: l,
        endEarly: f
      }, r);
    });
  }
  validate(t, n, r) {
    let i = this.resolve(_e({}, n, {
      value: t
    }));
    return typeof r == "function" ? i._validate(t, n, r) : new Promise((a, o) => i._validate(t, n, (s, c) => {
      s ? o(s) : a(c);
    }));
  }
  validateSync(t, n) {
    let r = this.resolve(_e({}, n, {
      value: t
    })), i;
    return r._validate(t, _e({}, n, {
      sync: !0
    }), (a, o) => {
      if (a) throw a;
      i = o;
    }), i;
  }
  isValid(t, n) {
    return this.validate(t, n).then(() => !0, (r) => {
      if (he.isError(r)) return !1;
      throw r;
    });
  }
  isValidSync(t, n) {
    try {
      return this.validateSync(t, n), !0;
    } catch (r) {
      if (he.isError(r)) return !1;
      throw r;
    }
  }
  _getDefault() {
    let t = this.spec.default;
    return t == null ? t : typeof t == "function" ? t.call(this) : Zr(t);
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
  defined(t = Ze.defined) {
    return this.test({
      message: t,
      name: "defined",
      exclusive: !0,
      test(n) {
        return n !== void 0;
      }
    });
  }
  required(t = Ze.required) {
    return this.clone({
      presence: "required"
    }).withMutation((n) => n.test({
      message: t,
      name: "required",
      exclusive: !0,
      test(r) {
        return this.schema._isPresent(r);
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
    }, n.message === void 0 && (n.message = Ze.default), typeof n.test != "function") throw new TypeError("`test` is a required parameters");
    let r = this.clone(), i = nn(n), a = n.exclusive || n.name && r.exclusiveTests[n.name] === !0;
    if (n.exclusive && !n.name)
      throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    return n.name && (r.exclusiveTests[n.name] = !!n.exclusive), r.tests = r.tests.filter((o) => !(o.OPTIONS.name === n.name && (a || o.OPTIONS.test === i.OPTIONS.test))), r.tests.push(i), r;
  }
  when(t, n) {
    !Array.isArray(t) && typeof t != "string" && (n = t, t = ".");
    let r = this.clone(), i = ns(t).map((a) => new at(a));
    return i.forEach((a) => {
      a.isSibling && r.deps.push(a.key);
    }), r.conditions.push(new Bf(i, n)), r;
  }
  typeError(t) {
    var n = this.clone();
    return n._typeError = nn({
      message: t,
      name: "typeError",
      test(r) {
        return r !== void 0 && !this.schema.isType(r) ? this.createError({
          params: {
            type: this.schema._type
          }
        }) : !0;
      }
    }), n;
  }
  oneOf(t, n = Ze.oneOf) {
    var r = this.clone();
    return t.forEach((i) => {
      r._whitelist.add(i), r._blacklist.delete(i);
    }), r._whitelistError = nn({
      message: n,
      name: "oneOf",
      test(i) {
        if (i === void 0) return !0;
        let a = this.schema._whitelist;
        return a.has(i, this.resolve) ? !0 : this.createError({
          params: {
            values: a.toArray().join(", ")
          }
        });
      }
    }), r;
  }
  notOneOf(t, n = Ze.notOneOf) {
    var r = this.clone();
    return t.forEach((i) => {
      r._blacklist.add(i), r._whitelist.delete(i);
    }), r._blacklistError = nn({
      message: n,
      name: "notOneOf",
      test(i) {
        let a = this.schema._blacklist;
        return a.has(i, this.resolve) ? this.createError({
          params: {
            values: a.toArray().join(", ")
          }
        }) : !0;
      }
    }), r;
  }
  strip(t = !0) {
    let n = this.clone();
    return n.spec.strip = t, n;
  }
  describe() {
    const t = this.clone(), {
      label: n,
      meta: r
    } = t.spec;
    return {
      meta: r,
      label: n,
      type: t.type,
      oneOf: t._whitelist.describe(),
      notOneOf: t._blacklist.describe(),
      tests: t.tests.map((a) => ({
        name: a.OPTIONS.name,
        params: a.OPTIONS.params
      })).filter((a, o, s) => s.findIndex((c) => c.name === a.name) === o)
    };
  }
}
me.prototype.__isYupSchema__ = !0;
for (const e of ["validate", "validateSync"]) me.prototype[`${e}At`] = function(t, n, r = {}) {
  const {
    parent: i,
    parentPath: a,
    schema: o
  } = ep(this, t, n, r.context);
  return o[e](i && i[a], _e({}, r, {
    parent: i,
    path: t
  }));
};
for (const e of ["equals", "is"]) me.prototype[e] = me.prototype.oneOf;
for (const e of ["not", "nope"]) me.prototype[e] = me.prototype.notOneOf;
me.prototype.optional = me.prototype.notRequired;
const is = me;
function Qn() {
  return new is();
}
Qn.prototype = is.prototype;
const ge = (e) => e == null;
let tp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, np = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, rp = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, ip = (e) => ge(e) || e === e.trim(), op = {}.toString();
function yi() {
  return new os();
}
class os extends me {
  constructor() {
    super({
      type: "string"
    }), this.withMutation(() => {
      this.transform(function(t) {
        if (this.isType(t) || Array.isArray(t)) return t;
        const n = t != null && t.toString ? t.toString() : t;
        return n === op ? t : n;
      });
    });
  }
  _typeCheck(t) {
    return t instanceof String && (t = t.valueOf()), typeof t == "string";
  }
  _isPresent(t) {
    return super._isPresent(t) && !!t.length;
  }
  length(t, n = Re.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(r) {
        return ge(r) || r.length === this.resolve(t);
      }
    });
  }
  min(t, n = Re.min) {
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(r) {
        return ge(r) || r.length >= this.resolve(t);
      }
    });
  }
  max(t, n = Re.max) {
    return this.test({
      name: "max",
      exclusive: !0,
      message: n,
      params: {
        max: t
      },
      test(r) {
        return ge(r) || r.length <= this.resolve(t);
      }
    });
  }
  matches(t, n) {
    let r = !1, i, a;
    return n && (typeof n == "object" ? {
      excludeEmptyString: r = !1,
      message: i,
      name: a
    } = n : i = n), this.test({
      name: a || "matches",
      message: i || Re.matches,
      params: {
        regex: t
      },
      test: (o) => ge(o) || o === "" && r || o.search(t) !== -1
    });
  }
  email(t = Re.email) {
    return this.matches(tp, {
      name: "email",
      message: t,
      excludeEmptyString: !0
    });
  }
  url(t = Re.url) {
    return this.matches(np, {
      name: "url",
      message: t,
      excludeEmptyString: !0
    });
  }
  uuid(t = Re.uuid) {
    return this.matches(rp, {
      name: "uuid",
      message: t,
      excludeEmptyString: !1
    });
  }
  //-- transforms --
  ensure() {
    return this.default("").transform((t) => t === null ? "" : t);
  }
  trim(t = Re.trim) {
    return this.transform((n) => n != null ? n.trim() : n).test({
      message: t,
      name: "trim",
      test: ip
    });
  }
  lowercase(t = Re.lowercase) {
    return this.transform((n) => ge(n) ? n : n.toLowerCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => ge(n) || n === n.toLowerCase()
    });
  }
  uppercase(t = Re.uppercase) {
    return this.transform((n) => ge(n) ? n : n.toUpperCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => ge(n) || n === n.toUpperCase()
    });
  }
}
yi.prototype = os.prototype;
var ap = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function sp(e) {
  var t = [1, 4, 5, 6, 7, 10, 11], n = 0, r, i;
  if (i = ap.exec(e)) {
    for (var a = 0, o; o = t[a]; ++a) i[o] = +i[o] || 0;
    i[2] = (+i[2] || 1) - 1, i[3] = +i[3] || 1, i[7] = i[7] ? String(i[7]).substr(0, 3) : 0, (i[8] === void 0 || i[8] === "") && (i[9] === void 0 || i[9] === "") ? r = +new Date(i[1], i[2], i[3], i[4], i[5], i[6], i[7]) : (i[8] !== "Z" && i[9] !== void 0 && (n = i[10] * 60 + i[11], i[9] === "+" && (n = 0 - n)), r = Date.UTC(i[1], i[2], i[3], i[4], i[5] + n, i[6], i[7]));
  } else r = Date.parse ? Date.parse(e) : NaN;
  return r;
}
let as = /* @__PURE__ */ new Date(""), cp = (e) => Object.prototype.toString.call(e) === "[object Date]";
class up extends me {
  constructor() {
    super({
      type: "date"
    }), this.withMutation(() => {
      this.transform(function(t) {
        return this.isType(t) ? t : (t = sp(t), isNaN(t) ? as : new Date(t));
      });
    });
  }
  _typeCheck(t) {
    return cp(t) && !isNaN(t.getTime());
  }
  prepareParam(t, n) {
    let r;
    if (at.isRef(t))
      r = t;
    else {
      let i = this.cast(t);
      if (!this._typeCheck(i)) throw new TypeError(`\`${n}\` must be a Date or a value that can be \`cast()\` to a Date`);
      r = i;
    }
    return r;
  }
  min(t, n = Jr.min) {
    let r = this.prepareParam(t, "min");
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(i) {
        return ge(i) || i >= this.resolve(r);
      }
    });
  }
  max(t, n = Jr.max) {
    var r = this.prepareParam(t, "max");
    return this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(i) {
        return ge(i) || i <= this.resolve(r);
      }
    });
  }
}
up.INVALID_DATE = as;
var vi = { exports: {} };
vi.exports = function(e) {
  return ss(lp(e), e);
};
vi.exports.array = ss;
function ss(e, t) {
  var n = e.length, r = new Array(n), i = {}, a = n, o = fp(t), s = pp(e);
  for (t.forEach(function(f) {
    if (!s.has(f[0]) || !s.has(f[1]))
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
  }); a--; )
    i[a] || c(e[a], a, /* @__PURE__ */ new Set());
  return r;
  function c(f, l, u) {
    if (u.has(f)) {
      var p;
      try {
        p = ", node was:" + JSON.stringify(f);
      } catch {
        p = "";
      }
      throw new Error("Cyclic dependency" + p);
    }
    if (!s.has(f))
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(f));
    if (!i[l]) {
      i[l] = !0;
      var d = o.get(f) || /* @__PURE__ */ new Set();
      if (d = Array.from(d), l = d.length) {
        u.add(f);
        do {
          var h = d[--l];
          c(h, s.get(h), u);
        } while (l);
        u.delete(f);
      }
      r[--n] = f;
    }
  }
}
function lp(e) {
  for (var t = /* @__PURE__ */ new Set(), n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    t.add(i[0]), t.add(i[1]);
  }
  return Array.from(t);
}
function fp(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    t.has(i[0]) || t.set(i[0], /* @__PURE__ */ new Set()), t.has(i[1]) || t.set(i[1], /* @__PURE__ */ new Set()), t.get(i[0]).add(i[1]);
  }
  return t;
}
function pp(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, r = e.length; n < r; n++)
    t.set(e[n], n);
  return t;
}
var dp = vi.exports;
const hp = /* @__PURE__ */ es(dp);
function mp(e, t = []) {
  let n = [], r = [];
  function i(a, o) {
    var s = Yn.split(a)[0];
    ~r.indexOf(s) || r.push(s), ~t.indexOf(`${o}-${s}`) || n.push([o, s]);
  }
  for (const a in e) if (wn(e, a)) {
    let o = e[a];
    ~r.indexOf(a) || r.push(a), at.isRef(o) && o.isSibling ? i(o.path, a) : zn(o) && "deps" in o && o.deps.forEach((s) => i(s, a));
  }
  return hp.array(r, n).reverse();
}
function mo(e, t) {
  let n = 1 / 0;
  return e.some((r, i) => {
    var a;
    if (((a = t.path) == null ? void 0 : a.indexOf(r)) !== -1)
      return n = i, !0;
  }), n;
}
function cs(e) {
  return (t, n) => mo(e, t) - mo(e, n);
}
function xt() {
  return xt = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, xt.apply(this, arguments);
}
let go = (e) => Object.prototype.toString.call(e) === "[object Object]";
function gp(e, t) {
  let n = Object.keys(e.fields);
  return Object.keys(t).filter((r) => n.indexOf(r) === -1);
}
const yp = cs([]);
class us extends me {
  constructor(t) {
    super({
      type: "object"
    }), this.fields = /* @__PURE__ */ Object.create(null), this._sortErrors = yp, this._nodes = [], this._excludedEdges = [], this.withMutation(() => {
      this.transform(function(r) {
        if (typeof r == "string")
          try {
            r = JSON.parse(r);
          } catch {
            r = null;
          }
        return this.isType(r) ? r : null;
      }), t && this.shape(t);
    });
  }
  _typeCheck(t) {
    return go(t) || typeof t == "function";
  }
  _cast(t, n = {}) {
    var r;
    let i = super._cast(t, n);
    if (i === void 0) return this.getDefault();
    if (!this._typeCheck(i)) return i;
    let a = this.fields, o = (r = n.stripUnknown) != null ? r : this.spec.noUnknown, s = this._nodes.concat(Object.keys(i).filter((u) => this._nodes.indexOf(u) === -1)), c = {}, f = xt({}, n, {
      parent: c,
      __validating: n.__validating || !1
    }), l = !1;
    for (const u of s) {
      let p = a[u], d = wn(i, u);
      if (p) {
        let h, m = i[u];
        f.path = (n.path ? `${n.path}.` : "") + u, p = p.resolve({
          value: m,
          context: n.context,
          parent: c
        });
        let g = "spec" in p ? p.spec : void 0, b = g?.strict;
        if (g?.strip) {
          l = l || u in i;
          continue;
        }
        h = !n.__validating || !b ? (
          // TODO: use _cast, this is double resolving
          p.cast(i[u], f)
        ) : i[u], h !== void 0 && (c[u] = h);
      } else d && !o && (c[u] = i[u]);
      c[u] !== i[u] && (l = !0);
    }
    return l ? c : i;
  }
  _validate(t, n = {}, r) {
    let i = [], {
      sync: a,
      from: o = [],
      originalValue: s = t,
      abortEarly: c = this.spec.abortEarly,
      recursive: f = this.spec.recursive
    } = n;
    o = [{
      schema: this,
      value: s
    }, ...o], n.__validating = !0, n.originalValue = s, n.from = o, super._validate(t, n, (l, u) => {
      if (l) {
        if (!he.isError(l) || c)
          return void r(l, u);
        i.push(l);
      }
      if (!f || !go(u)) {
        r(i[0] || null, u);
        return;
      }
      s = s || u;
      let p = this._nodes.map((d) => (h, m) => {
        let g = d.indexOf(".") === -1 ? (n.path ? `${n.path}.` : "") + d : `${n.path || ""}["${d}"]`, b = this.fields[d];
        if (b && "validate" in b) {
          b.validate(u[d], xt({}, n, {
            // @ts-ignore
            path: g,
            from: o,
            // inner fields are always strict:
            // 1. this isn't strict so the casting will also have cast inner values
            // 2. this is strict in which case the nested values weren't cast either
            strict: !0,
            parent: u,
            originalValue: s[d]
          }), m);
          return;
        }
        m(null);
      });
      xn({
        tests: p,
        value: u,
        errors: i,
        endEarly: c,
        sort: this._sortErrors,
        path: n.path
      }, r);
    });
  }
  clone(t) {
    const n = super.clone(t);
    return n.fields = xt({}, this.fields), n._nodes = this._nodes, n._excludedEdges = this._excludedEdges, n._sortErrors = this._sortErrors, n;
  }
  concat(t) {
    let n = super.concat(t), r = n.fields;
    for (let [i, a] of Object.entries(this.fields)) {
      const o = r[i];
      o === void 0 ? r[i] = a : o instanceof me && a instanceof me && (r[i] = a.concat(o));
    }
    return n.withMutation(() => n.shape(r));
  }
  getDefaultFromShape() {
    let t = {};
    return this._nodes.forEach((n) => {
      const r = this.fields[n];
      t[n] = "default" in r ? r.getDefault() : void 0;
    }), t;
  }
  _getDefault() {
    if ("default" in this.spec)
      return super._getDefault();
    if (this._nodes.length)
      return this.getDefaultFromShape();
  }
  shape(t, n = []) {
    let r = this.clone(), i = Object.assign(r.fields, t);
    if (r.fields = i, r._sortErrors = cs(Object.keys(i)), n.length) {
      Array.isArray(n[0]) || (n = [n]);
      let a = n.map(([o, s]) => `${o}-${s}`);
      r._excludedEdges = r._excludedEdges.concat(a);
    }
    return r._nodes = mp(i, r._excludedEdges), r;
  }
  pick(t) {
    const n = {};
    for (const r of t)
      this.fields[r] && (n[r] = this.fields[r]);
    return this.clone().withMutation((r) => (r.fields = {}, r.shape(n)));
  }
  omit(t) {
    const n = this.clone(), r = n.fields;
    n.fields = {};
    for (const i of t)
      delete r[i];
    return n.withMutation(() => n.shape(r));
  }
  from(t, n, r) {
    let i = Yn.getter(t, !0);
    return this.transform((a) => {
      if (a == null) return a;
      let o = a;
      return wn(a, t) && (o = xt({}, a), r || delete o[t], o[n] = i(a)), o;
    });
  }
  noUnknown(t = !0, n = ei.noUnknown) {
    typeof t == "string" && (n = t, t = !0);
    let r = this.test({
      name: "noUnknown",
      exclusive: !0,
      message: n,
      test(i) {
        if (i == null) return !0;
        const a = gp(this.schema, i);
        return !t || a.length === 0 || this.createError({
          params: {
            unknown: a.join(", ")
          }
        });
      }
    });
    return r.spec.noUnknown = t, r;
  }
  unknown(t = !0, n = ei.noUnknown) {
    return this.noUnknown(!t, n);
  }
  transformKeys(t) {
    return this.transform((n) => n && $u(n, (r, i) => t(i)));
  }
  camelCase() {
    return this.transformKeys(Fu);
  }
  snakeCase() {
    return this.transformKeys(ro);
  }
  constantCase() {
    return this.transformKeys((t) => ro(t).toUpperCase());
  }
  describe() {
    let t = super.describe();
    return t.fields = Pa(this.fields, (n) => n.describe()), t;
  }
}
function ls(e) {
  return new us(e);
}
ls.prototype = us.prototype;
function _n() {
  return _n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _n.apply(this, arguments);
}
function fs(e) {
  return new ps(e);
}
class ps extends me {
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
    const r = super._cast(t, n);
    if (!this._typeCheck(r) || !this.innerType) return r;
    let i = !1;
    const a = r.map((o, s) => {
      const c = this.innerType.cast(o, _n({}, n, {
        path: `${n.path || ""}[${s}]`
      }));
      return c !== o && (i = !0), c;
    });
    return i ? a : r;
  }
  _validate(t, n = {}, r) {
    var i, a;
    let o = [];
    n.sync;
    let s = n.path, c = this.innerType, f = (i = n.abortEarly) != null ? i : this.spec.abortEarly, l = (a = n.recursive) != null ? a : this.spec.recursive, u = n.originalValue != null ? n.originalValue : t;
    super._validate(t, n, (p, d) => {
      if (p) {
        if (!he.isError(p) || f)
          return void r(p, d);
        o.push(p);
      }
      if (!l || !c || !this._typeCheck(d)) {
        r(o[0] || null, d);
        return;
      }
      u = u || d;
      let h = new Array(d.length);
      for (let m = 0; m < d.length; m++) {
        let g = d[m], b = `${n.path || ""}[${m}]`, x = _n({}, n, {
          path: b,
          strict: !0,
          parent: d,
          index: m,
          originalValue: u[m]
        });
        h[m] = (T, _) => c.validate(g, x, _);
      }
      xn({
        path: s,
        value: d,
        errors: o,
        endEarly: f,
        tests: h
      }, r);
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
    if (!zn(t)) throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + Rt(t));
    return n.innerType = t, n;
  }
  length(t, n = ln.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(r) {
        return ge(r) || r.length === this.resolve(t);
      }
    });
  }
  min(t, n) {
    return n = n || ln.min, this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      // FIXME(ts): Array<typeof T>
      test(r) {
        return ge(r) || r.length >= this.resolve(t);
      }
    });
  }
  max(t, n) {
    return n = n || ln.max, this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(r) {
        return ge(r) || r.length <= this.resolve(t);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((t, n) => this._typeCheck(t) ? t : n == null ? [] : [].concat(n));
  }
  compact(t) {
    let n = t ? (r, i, a) => !t(r, i, a) : (r) => !!r;
    return this.transform((r) => r != null ? r.filter(n) : r);
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
fs.prototype = ps.prototype;
function vp(e) {
  Object.keys(e).forEach((t) => {
    Object.keys(e[t]).forEach((n) => {
      Hf[t][n] = e[t][n];
    });
  });
}
function ft(e, t, n) {
  if (!e || !zn(e.prototype)) throw new TypeError("You must provide a yup schema constructor function");
  if (typeof t != "string") throw new TypeError("A Method name must be provided");
  if (typeof n != "function") throw new TypeError("Method function must be provided");
  e.prototype[t] = n;
}
var wp = { exports: {} };
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ep = bp;
function bp(e) {
  if (!e)
    throw new TypeError("argument namespace is required");
  function t(n) {
  }
  return t._file = void 0, t._ignored = !0, t._namespace = e, t._traced = !1, t._warned = /* @__PURE__ */ Object.create(null), t.function = xp, t.property = Sp, t;
}
function xp(e, t) {
  if (typeof e != "function")
    throw new TypeError("argument fn must be a function");
  return e;
}
function Sp(e, t, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new TypeError("argument obj must be object");
  var r = Object.getOwnPropertyDescriptor(e, t);
  if (!r)
    throw new TypeError("must call property on owner object");
  if (!r.configurable)
    throw new TypeError("property must be configurable");
}
var Ap = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? _p : Tp);
function _p(e, t) {
  return e.__proto__ = t, e;
}
function Tp(e, t) {
  for (var n in t)
    Object.prototype.hasOwnProperty.call(e, n) || (e[n] = t[n]);
  return e;
}
const Cp = {
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
var wi = Cp, Rp = Ie;
Ie.message = wi;
Ie.code = Fp(wi);
Ie.codes = $p(wi);
Ie.redirect = {
  300: !0,
  301: !0,
  302: !0,
  303: !0,
  305: !0,
  307: !0,
  308: !0
};
Ie.empty = {
  204: !0,
  205: !0,
  304: !0
};
Ie.retry = {
  502: !0,
  503: !0,
  504: !0
};
function Fp(e) {
  var t = {};
  return Object.keys(e).forEach(function(r) {
    var i = e[r], a = Number(r);
    t[i.toLowerCase()] = a;
  }), t;
}
function $p(e) {
  return Object.keys(e).map(function(n) {
    return Number(n);
  });
}
function Ip(e) {
  var t = e.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(Ie.code, t))
    throw new Error('invalid status message: "' + e + '"');
  return Ie.code[t];
}
function yo(e) {
  if (!Object.prototype.hasOwnProperty.call(Ie.message, e))
    throw new Error("invalid status code: " + e);
  return Ie.message[e];
}
function Ie(e) {
  if (typeof e == "number")
    return yo(e);
  if (typeof e != "string")
    throw new TypeError("code must be a number or string");
  var t = parseInt(e, 10);
  return isNaN(t) ? Ip(e) : yo(t);
}
var ri = { exports: {} };
typeof Object.create == "function" ? ri.exports = function(t, n) {
  n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : ri.exports = function(t, n) {
  if (n) {
    t.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var Op = ri.exports;
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Np = Pp;
function Pp(e) {
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
  Ep("http-errors");
  var t = Ap, n = Rp, r = Op, i = Np;
  e.exports = o, e.exports.HttpError = s(), e.exports.isHttpError = f(e.exports.HttpError), p(e.exports, n.codes, e.exports.HttpError);
  function a(h) {
    return +(String(h).charAt(0) + "00");
  }
  function o() {
    for (var h, m, g = 500, b = {}, x = 0; x < arguments.length; x++) {
      var T = arguments[x], _ = typeof T;
      if (_ === "object" && T instanceof Error)
        h = T, g = h.status || h.statusCode || g;
      else if (_ === "number" && x === 0)
        g = T;
      else if (_ === "string")
        m = T;
      else if (_ === "object")
        b = T;
      else
        throw new TypeError("argument #" + (x + 1) + " unsupported type " + _);
    }
    (typeof g != "number" || !n.message[g] && (g < 400 || g >= 600)) && (g = 500);
    var C = o[g] || o[a(g)];
    h || (h = C ? new C(m) : new Error(m || n.message[g]), Error.captureStackTrace(h, o)), (!C || !(h instanceof C) || h.status !== g) && (h.expose = g < 500, h.status = h.statusCode = g);
    for (var R in b)
      R !== "status" && R !== "statusCode" && (h[R] = b[R]);
    return h;
  }
  function s() {
    function h() {
      throw new TypeError("cannot construct abstract class");
    }
    return r(h, Error), h;
  }
  function c(h, m, g) {
    var b = d(m);
    function x(T) {
      var _ = T ?? n.message[g], C = new Error(_);
      return Error.captureStackTrace(C, x), t(C, x.prototype), Object.defineProperty(C, "message", {
        enumerable: !0,
        configurable: !0,
        value: _,
        writable: !0
      }), Object.defineProperty(C, "name", {
        enumerable: !1,
        configurable: !0,
        value: b,
        writable: !0
      }), C;
    }
    return r(x, h), u(x, b), x.prototype.status = g, x.prototype.statusCode = g, x.prototype.expose = !0, x;
  }
  function f(h) {
    return function(g) {
      return !g || typeof g != "object" ? !1 : g instanceof h ? !0 : g instanceof Error && typeof g.expose == "boolean" && typeof g.statusCode == "number" && g.status === g.statusCode;
    };
  }
  function l(h, m, g) {
    var b = d(m);
    function x(T) {
      var _ = T ?? n.message[g], C = new Error(_);
      return Error.captureStackTrace(C, x), t(C, x.prototype), Object.defineProperty(C, "message", {
        enumerable: !0,
        configurable: !0,
        value: _,
        writable: !0
      }), Object.defineProperty(C, "name", {
        enumerable: !1,
        configurable: !0,
        value: b,
        writable: !0
      }), C;
    }
    return r(x, h), u(x, b), x.prototype.status = g, x.prototype.statusCode = g, x.prototype.expose = !1, x;
  }
  function u(h, m) {
    var g = Object.getOwnPropertyDescriptor(h, "name");
    g && g.configurable && (g.value = m, Object.defineProperty(h, "name", g));
  }
  function p(h, m, g) {
    m.forEach(function(x) {
      var T, _ = i(n.message[x]);
      switch (a(x)) {
        case 400:
          T = c(g, _, x);
          break;
        case 500:
          T = l(g, _, x);
          break;
      }
      T && (h[x] = T, h[_] = T);
    });
  }
  function d(h) {
    return h.substr(-5) !== "Error" ? h + "Error" : h;
  }
})(wp);
class Lp extends Error {
  constructor(t = "An application error occured", n = {}) {
    super(), this.name = "ApplicationError", this.message = t, this.details = n;
  }
}
class kt extends Lp {
  constructor(t = "Entity not found", n) {
    super(t, n), this.name = "NotFoundError", this.message = t;
  }
}
const kp = [
  "$and",
  "$or"
], Dp = [
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
], Mp = [
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
], jp = [
  "$in",
  "$notIn",
  "$between"
], Tn = {
  where: Dp,
  cast: Mp,
  group: kp,
  array: jp
}, Hp = Object.fromEntries(Object.entries(Tn).map(([e, t]) => [
  e,
  t.map((n) => n.toLowerCase())
])), Bp = (e, t) => e in t, Up = (e, t, n = !1) => n ? Hp[e]?.includes(t.toLowerCase()) ?? !1 : Bp(e, Tn) ? Tn[e]?.includes(t) ?? !1 : !1, Gp = (e, t = !1) => Object.keys(Tn).some((n) => Up(n, e, t));
var qp = (e, t = 1, n) => {
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
  const r = n.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return e.replace(r, n.indent.repeat(t));
};
const vo = Kn, wo = /\s+at.*(?:\(|\s)(.*)\)?/, Kp = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/, Wp = typeof vo.homedir > "u" ? "" : vo.homedir();
var zp = (e, t) => (t = Object.assign({ pretty: !1 }, t), e.replace(/\\/g, "/").split(`
`).filter((n) => {
  const r = n.match(wo);
  if (r === null || !r[1])
    return !0;
  const i = r[1];
  return i.includes(".app/Contents/Resources/electron.asar") || i.includes(".app/Contents/Resources/default_app.asar") ? !1 : !Kp.test(i);
}).filter((n) => n.trim() !== "").map((n) => t.pretty ? n.replace(wo, (r, i) => r.replace(i, i.replace(Wp, "~"))) : n).join(`
`));
const Yp = qp, Qp = zp, Vp = (e) => e.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
let Xp = class extends Error {
  constructor(t) {
    if (!Array.isArray(t))
      throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
    t = [...t].map((r) => r instanceof Error ? r : r !== null && typeof r == "object" ? Object.assign(new Error(r.message), r) : new Error(r));
    let n = t.map((r) => typeof r.stack == "string" ? Vp(Qp(r.stack)) : String(r)).join(`
`);
    n = `
` + Yp(n, 4), super(n), this.name = "AggregateError", Object.defineProperty(this, "_errors", { value: t });
  }
  *[Symbol.iterator]() {
    for (const t of this._errors)
      yield t;
  }
};
var Zp = Xp;
const Jp = Zp;
var ed = async (e, t, {
  concurrency: n = 1 / 0,
  stopOnError: r = !0
} = {}) => new Promise((i, a) => {
  if (typeof t != "function")
    throw new TypeError("Mapper function is required");
  if (!((Number.isSafeInteger(n) || n === 1 / 0) && n >= 1))
    throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${n}\` (${typeof n})`);
  const o = [], s = [], c = e[Symbol.iterator]();
  let f = !1, l = !1, u = 0, p = 0;
  const d = () => {
    if (f)
      return;
    const h = c.next(), m = p;
    if (p++, h.done) {
      l = !0, u === 0 && (!r && s.length !== 0 ? a(new Jp(s)) : i(o));
      return;
    }
    u++, (async () => {
      try {
        const g = await h.value;
        o[m] = await t(g, m), u--, d();
      } catch (g) {
        r ? (f = !0, a(g)) : (s.push(g), u--, d());
      }
    })();
  };
  for (let h = 0; h < n && (d(), !l); h++)
    ;
});
const td = /* @__PURE__ */ es(ed);
function Vn(...e) {
  const [t, ...n] = e;
  return async (...r) => {
    let i = await t.apply(t, r);
    for (let a = 0; a < n.length; a += 1)
      i = await n[a](i);
    return i;
  };
}
De(td);
const Xn = ({ key: e, attribute: t }, { remove: n }) => {
  t?.type === "password" && n(e);
}, qt = ({ schema: e, key: t, attribute: n }, { remove: r }) => {
  if (!n)
    return;
  (n.private === !0 || Tf(e, t)) && r(t);
}, ds = ({ key: e, attribute: t }, { remove: n }) => {
  Ja(t) && n(e);
}, hs = ({ key: e, attribute: t }, { remove: n }) => {
  Rf(t) && n(e);
}, nd = ({ schema: e, key: t, value: n }, { set: r }) => {
  if (t === "" && n === "*") {
    const { attributes: i } = e, a = Object.entries(i).filter(([, o]) => [
      "relation",
      "component",
      "media",
      "dynamiczone"
    ].includes(o.type)).reduce((o, [s]) => ({
      ...o,
      [s]: !0
    }), {});
    r("", a);
  }
}, rd = {
  raw: null,
  attribute: null
};
var Zn = () => {
  const e = {
    parsers: [],
    interceptors: [],
    ignore: [],
    handlers: {
      attributes: [],
      common: []
    }
  }, t = async (n, r, i) => {
    const { path: a = rd, parent: o, schema: s, getModel: c } = r ?? {};
    for (const { predicate: d, handler: h } of e.interceptors)
      if (d(i))
        return h(n, r, i, {
          recurse: t
        });
    const f = e.parsers.find((d) => d.predicate(i))?.parser, l = f?.(i);
    if (!l)
      return i;
    let u = l.transform(i);
    const p = l.keys(u);
    for (const d of p) {
      const h = s?.attributes?.[d], m = {
        ...a
      };
      m.raw = oe(a.raw) ? d : `${a.raw}.${d}`, oe(h) || (m.attribute = oe(a.attribute) ? d : `${a.attribute}.${d}`);
      const g = {
        key: d,
        value: l.get(d, u),
        attribute: h,
        schema: s,
        path: m,
        data: u,
        getModel: c,
        parent: o
      }, b = {
        remove(M) {
          u = l.remove(M, u);
        },
        set(M, S) {
          u = l.set(M, S, u);
        },
        recurse: t
      };
      await n(g, eo([
        "remove",
        "set"
      ], b));
      const x = l.get(d, u), T = () => ({
        key: d,
        value: x,
        attribute: h,
        schema: s,
        path: m,
        data: u,
        visitor: n,
        getModel: c,
        parent: o
      }), _ = T();
      if (e.ignore.some((M) => M(_)))
        continue;
      const R = [
        ...e.handlers.common,
        ...e.handlers.attributes
      ];
      for await (const M of R) {
        const S = T();
        await M.predicate(S) && await M.handler(S, eo([
          "recurse",
          "set"
        ], b));
      }
    }
    return u;
  };
  return {
    traverse: t,
    intercept(n, r) {
      return e.interceptors.push({
        predicate: n,
        handler: r
      }), this;
    },
    parse(n, r) {
      return e.parsers.push({
        predicate: n,
        parser: r
      }), this;
    },
    ignore(n) {
      return e.ignore.push(n), this;
    },
    on(n, r) {
      return e.handlers.common.push({
        predicate: n,
        handler: r
      }), this;
    },
    onAttribute(n, r) {
      return e.handlers.attributes.push({
        predicate: n,
        handler: r
      }), this;
    },
    onRelation(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "relation", n);
    },
    onMedia(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "media", n);
    },
    onComponent(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "component", n);
    },
    onDynamicZone(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "dynamiczone", n);
    }
  };
};
const id = (e) => $e(e), od = Zn().intercept(
  // Intercept filters arrays and apply the traversal to each one individually
  We,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i, a) => {
    const o = t.path ? {
      ...t.path,
      raw: `${t.path.raw}[${a}]`
    } : t.path;
    return r(e, {
      ...t,
      path: o
    }, i);
  })).then((i) => i.filter((a) => !($e(a) && ze(a))))
).intercept(
  // Ignore non object filters and return the value as-is
  (e) => !$e(e),
  (e, t, n) => n
).parse(id, () => ({
  transform: pi,
  remove(e, t) {
    return xu(e, t);
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
})).ignore(({ value: e }) => oe(e)).on(({ attribute: e }) => oe(e), async ({ key: e, visitor: t, path: n, value: r, schema: i, getModel: a, attribute: o }, { set: s, recurse: c }) => {
  s(e, await c(t, {
    schema: i,
    path: n,
    getModel: a,
    parent: {
      key: e,
      path: n,
      schema: i,
      attribute: o
    }
  }, r));
}).onRelation(async ({ key: e, attribute: t, visitor: n, path: r, value: i, schema: a, getModel: o }, { set: s, recurse: c }) => {
  if (t.relation.toLowerCase().startsWith("morph"))
    return;
  const l = {
    key: e,
    path: r,
    schema: a,
    attribute: t
  }, u = t.target, p = o(u), d = await c(n, {
    schema: p,
    path: r,
    getModel: o,
    parent: l
  }, i);
  s(e, d);
}).onComponent(async ({ key: e, attribute: t, visitor: n, path: r, schema: i, value: a, getModel: o }, { set: s, recurse: c }) => {
  const f = {
    key: e,
    path: r,
    schema: i,
    attribute: t
  }, l = o(t.component), u = await c(n, {
    schema: l,
    path: r,
    getModel: o,
    parent: f
  }, a);
  s(e, u);
}).onMedia(async ({ key: e, visitor: t, path: n, schema: r, attribute: i, value: a, getModel: o }, { set: s, recurse: c }) => {
  const f = {
    key: e,
    path: n,
    schema: r,
    attribute: i
  }, u = o("plugin::upload.file"), p = await c(t, {
    schema: u,
    path: n,
    getModel: o,
    parent: f
  }, a);
  s(e, p);
});
var dt = De(od.traverse);
const ad = {
  asc: "asc",
  desc: "desc"
}, sd = Object.values(ad), cd = (e) => sd.includes(e.toLowerCase()), ud = (e) => Array.isArray(e) && e.every(Ue), ld = (e) => Array.isArray(e) && e.every($e), fd = (e) => Ue(e) && e.split(",").length > 1, pd = (e) => $e(e), dd = Zn().intercept(
  // String with chained sorts (foo,bar,foobar) => split, map(recurse), then recompose
  fd,
  async (e, t, n, { recurse: r }) => Promise.all(n.split(",").map(yn).map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)).join(","))
).intercept(
  // Array of strings ['foo', 'foo,bar'] => map(recurse), then filter out empty items
  ud,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)))
).intercept(
  // Array of objects [{ foo: 'asc' }, { bar: 'desc', baz: 'asc' }] => map(recurse), then filter out empty items
  ld,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)))
).parse(Ue, () => {
  const e = Su(Hr("."), Au(Hr(":")), _u), t = (n) => {
    if (n.length !== 0)
      return n.reduce((r, i) => ze(i) ? r : r === "" ? i : cd(i) ? `${r}:${i}` : `${r}.${i}`, "");
  };
  return {
    transform: yn,
    remove(n, r) {
      const [i] = e(r);
      return i === n ? void 0 : r;
    },
    set(n, r, i) {
      const [a] = e(i);
      return a !== n ? i : oe(r) ? a : `${a}.${r}`;
    },
    keys(n) {
      const r = Na(e(n));
      return r ? [
        r
      ] : [];
    },
    get(n, r) {
      const [i, ...a] = e(r);
      return n === i ? t(a) : void 0;
    }
  };
}).parse(pd, () => ({
  transform: pi,
  remove(e, t) {
    const { [e]: n, ...r } = t;
    return r;
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
})).onRelation(async ({ key: e, value: t, attribute: n, visitor: r, path: i, getModel: a, schema: o }, { set: s, recurse: c }) => {
  if (n.relation.toLowerCase().startsWith("morph"))
    return;
  const l = {
    key: e,
    path: i,
    schema: o,
    attribute: n
  }, u = n.target, p = a(u), d = await c(r, {
    schema: p,
    path: i,
    getModel: a,
    parent: l
  }, t);
  s(e, d);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: r, visitor: i, value: a, getModel: o }, { recurse: s, set: c }) => {
  const f = {
    key: e,
    path: t,
    schema: n,
    attribute: r
  }, u = o("plugin::upload.file"), p = await s(i, {
    schema: u,
    path: t,
    getModel: o,
    parent: f
  }, a);
  c(e, p);
}).onComponent(async ({ key: e, value: t, visitor: n, path: r, schema: i, attribute: a, getModel: o }, { recurse: s, set: c }) => {
  const f = {
    key: e,
    path: r,
    schema: i,
    attribute: a
  }, l = o(a.component), u = await s(n, {
    schema: l,
    path: r,
    getModel: o,
    parent: f
  }, t);
  c(e, u);
});
var ht = De(dd.traverse);
const Eo = (e) => ({ key: t, attribute: n }) => !n && e === t, ms = (e) => e === "*", hd = (e) => Ue(e) && !ms(e), md = (e) => We(e) && e.every(Ue), bo = (e) => $e(e), gd = Zn().intercept(hd, async (e, t, n, { recurse: r }) => {
  const i = vd([
    n
  ]), a = await r(e, t, i), [o] = yd(a);
  return o;
}).intercept(md, async (e, t, n, { recurse: r }) => (await Promise.all(n.map((a) => r(e, t, a)))).filter((a) => !oe(a))).parse(ms, () => ({
  /**
  * Since value is '*', we don't need to transform it
  */
  transform: Tu,
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
  keys: Br([
    ""
  ]),
  /**
  * Removing '*' means setting it to undefined, regardless of the given key
  */
  remove: Br(void 0)
})).parse(Ue, () => {
  const e = Hr("."), t = Cu(".");
  return {
    transform: yn,
    remove(n, r) {
      const [i] = e(r);
      return i === n ? void 0 : r;
    },
    set(n, r, i) {
      const [a] = e(i);
      return a !== n ? i : oe(r) || ze(r) ? a : `${a}.${r}`;
    },
    keys(n) {
      const r = Na(e(n));
      return r ? [
        r
      ] : [];
    },
    get(n, r) {
      const [i, ...a] = e(r);
      return n === i ? t(a) : void 0;
    }
  };
}).parse(bo, () => ({
  transform: pi,
  remove(e, t) {
    const { [e]: n, ...r } = t;
    return r;
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
  Eo("populate"),
  async ({ key: e, visitor: t, path: n, value: r, schema: i, getModel: a, attribute: o }, { set: s, recurse: c }) => {
    const l = await c(t, {
      schema: i,
      path: n,
      getModel: a,
      parent: {
        key: e,
        path: n,
        schema: i,
        attribute: o
      }
    }, r);
    s(e, l);
  }
).on(Eo("on"), async ({ key: e, visitor: t, path: n, value: r, getModel: i, parent: a }, { set: o, recurse: s }) => {
  const c = {};
  if (bo(r)) {
    for (const [f, l] of Object.entries(r)) {
      const u = i(f), p = {
        ...n,
        raw: `${n.raw}[${f}]`
      };
      c[f] = await s(t, {
        schema: u,
        path: p,
        getModel: i,
        parent: a
      }, l);
    }
    o(e, c);
  }
}).onRelation(async ({ key: e, value: t, attribute: n, visitor: r, path: i, schema: a, getModel: o }, { set: s, recurse: c }) => {
  if (oe(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: a,
    attribute: n
  };
  if (Ja(n)) {
    if (!$e(t) || !("on" in t && $e(t?.on)))
      return;
    const d = await c(r, {
      schema: a,
      path: i,
      getModel: o,
      parent: f
    }, {
      on: t?.on
    });
    s(e, d);
    return;
  }
  const l = n.target, u = o(l), p = await c(r, {
    schema: u,
    path: i,
    getModel: o,
    parent: f
  }, t);
  s(e, p);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: r, visitor: i, value: a, getModel: o }, { recurse: s, set: c }) => {
  if (oe(a))
    return;
  const f = {
    key: e,
    path: t,
    schema: n,
    attribute: r
  }, u = o("plugin::upload.file"), p = await s(i, {
    schema: u,
    path: t,
    getModel: o,
    parent: f
  }, a);
  c(e, p);
}).onComponent(async ({ key: e, value: t, schema: n, visitor: r, path: i, attribute: a, getModel: o }, { recurse: s, set: c }) => {
  if (oe(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: n,
    attribute: a
  }, l = o(a.component), u = await s(r, {
    schema: l,
    path: i,
    getModel: o,
    parent: f
  }, t);
  c(e, u);
}).onDynamicZone(async ({ key: e, value: t, schema: n, visitor: r, path: i, attribute: a, getModel: o }, { set: s, recurse: c }) => {
  if (oe(t) || !$e(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: n,
    attribute: a
  };
  if ("on" in t && t.on) {
    const l = await c(r, {
      schema: n,
      path: i,
      getModel: o,
      parent: f
    }, {
      on: t.on
    });
    s(e, l);
  }
});
var vr = De(gd.traverse);
const yd = (e) => {
  const t = [];
  function n(r, i) {
    for (const [a, o] of Object.entries(r)) {
      const s = i ? `${i}.${a}` : a;
      o === !0 ? t.push(s) : n(o.populate, s);
    }
  }
  return n(e, ""), t;
}, vd = (e) => {
  const t = {};
  function n(r, i) {
    const [a, ...o] = i;
    o.length === 0 ? r[a] = !0 : ((!r[a] || typeof r[a] == "boolean") && (r[a] = {
      populate: {}
    }), n(r[a].populate, o));
  }
  return e.forEach((r) => n(t, r.split("."))), t;
}, wd = (e) => We(e) && e.every(Ue), Ed = Zn().intercept(wd, async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i)))).intercept((e) => Ue(e) && e.includes(","), (e, t, n, { recurse: r }) => Promise.all(n.split(",").map((i) => r(e, t, i)))).intercept((e) => Ru("*", e), Br("*")).parse(Ue, () => ({
  transform: yn,
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
var wr = De(Ed.traverse);
const { ID_ATTRIBUTE: Cn, DOC_ID_ATTRIBUTE: Rn } = Af, bd = async (e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeOutput");
  return $f((...n) => {
    Xn(...n), qt(...n);
  }, e, t);
}, xd = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFilters");
  return Vn(
    // Remove keys that are not attributes or valid operators
    dt(({ key: n, attribute: r }, { remove: i }) => {
      const a = !!r;
      [
        Cn,
        Rn
      ].includes(n) || !a && !Gp(n) && i(n);
    }, e),
    // Remove dynamic zones from filters
    dt(hs, e),
    // Remove morpTo relations from filters
    dt(ds, e),
    // Remove passwords from filters
    dt(Xn, e),
    // Remove private from filters
    dt(qt, e),
    // Remove empty objects
    dt(({ key: n, value: r }, { remove: i }) => {
      $e(r) && ze(r) && i(n);
    }, e)
  )(t);
}), Sd = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeSort");
  return Vn(
    // Remove non attribute keys
    ht(({ key: n, attribute: r }, { remove: i }) => {
      [
        Cn,
        Rn
      ].includes(n) || r || i(n);
    }, e),
    // Remove dynamic zones from sort
    ht(hs, e),
    // Remove morpTo relations from sort
    ht(ds, e),
    // Remove private from sort
    ht(qt, e),
    // Remove passwords from filters
    ht(Xn, e),
    // Remove keys for empty non-scalar values
    ht(({ key: n, attribute: r, value: i }, { remove: a }) => {
      [
        Cn,
        Rn
      ].includes(n) || !Xa(r) && ze(i) && a(n);
    }, e)
  )(t);
}), Ad = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFields");
  return Vn(
    // Only keep scalar attributes
    wr(({ key: n, attribute: r }, { remove: i }) => {
      [
        Cn,
        Rn
      ].includes(n) || (oe(r) || !Xa(r)) && i(n);
    }, e),
    // Remove private fields
    wr(qt, e),
    // Remove password fields
    wr(Xn, e),
    // Remove nil values from fields array
    (n) => We(n) ? n.filter((r) => !oe(r)) : n
  )(t);
}), _d = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizePopulate");
  return Vn(
    vr(nd, e),
    vr(async ({ key: n, value: r, schema: i, attribute: a, getModel: o, path: s }, { set: c }) => {
      if (a)
        return;
      const f = {
        key: n,
        path: s,
        schema: i,
        attribute: a
      };
      n === "sort" && c(n, await Sd({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "filters" && c(n, await xd({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "fields" && c(n, await Ad({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "populate" && c(n, await _d({
        schema: i,
        getModel: o,
        parent: f
      }, r));
    }, e),
    // Remove private fields
    vr(qt, e)
  )(t);
});
var Kt = { exports: {} }, Ot = { exports: {} }, Er, xo;
function Td() {
  if (xo) return Er;
  xo = 1, Er = r, r.sync = i;
  var e = Ve;
  function t(a, o) {
    var s = o.pathExt !== void 0 ? o.pathExt : process.env.PATHEXT;
    if (!s || (s = s.split(";"), s.indexOf("") !== -1))
      return !0;
    for (var c = 0; c < s.length; c++) {
      var f = s[c].toLowerCase();
      if (f && a.substr(-f.length).toLowerCase() === f)
        return !0;
    }
    return !1;
  }
  function n(a, o, s) {
    return !a.isSymbolicLink() && !a.isFile() ? !1 : t(o, s);
  }
  function r(a, o, s) {
    e.stat(a, function(c, f) {
      s(c, c ? !1 : n(f, a, o));
    });
  }
  function i(a, o) {
    return n(e.statSync(a), a, o);
  }
  return Er;
}
var br, So;
function Cd() {
  if (So) return br;
  So = 1, br = t, t.sync = n;
  var e = Ve;
  function t(a, o, s) {
    e.stat(a, function(c, f) {
      s(c, c ? !1 : r(f, o));
    });
  }
  function n(a, o) {
    return r(e.statSync(a), o);
  }
  function r(a, o) {
    return a.isFile() && i(a, o);
  }
  function i(a, o) {
    var s = a.mode, c = a.uid, f = a.gid, l = o.uid !== void 0 ? o.uid : process.getuid && process.getuid(), u = o.gid !== void 0 ? o.gid : process.getgid && process.getgid(), p = parseInt("100", 8), d = parseInt("010", 8), h = parseInt("001", 8), m = p | d, g = s & h || s & d && f === u || s & p && c === l || s & m && l === 0;
    return g;
  }
  return br;
}
var Fn;
process.platform === "win32" || ve.TESTING_WINDOWS ? Fn = Td() : Fn = Cd();
var Rd = Ei;
Ei.sync = Fd;
function Ei(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), !n) {
    if (typeof Promise != "function")
      throw new TypeError("callback not provided");
    return new Promise(function(r, i) {
      Ei(e, t || {}, function(a, o) {
        a ? i(a) : r(o);
      });
    });
  }
  Fn(e, t || {}, function(r, i) {
    r && (r.code === "EACCES" || t && t.ignoreErrors) && (r = null, i = !1), n(r, i);
  });
}
function Fd(e, t) {
  try {
    return Fn.sync(e, t || {});
  } catch (n) {
    if (t && t.ignoreErrors || n.code === "EACCES")
      return !1;
    throw n;
  }
}
const Et = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", gs = Ee, $d = Et ? ";" : ":", ys = Rd, vs = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), ws = (e, t) => {
  const n = t.colon || $d, r = e.match(/\//) || Et && e.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...Et ? [process.cwd()] : [],
    ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(n)
  ], i = Et ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", a = Et ? i.split(n) : [""];
  return Et && e.indexOf(".") !== -1 && a[0] !== "" && a.unshift(""), {
    pathEnv: r,
    pathExt: a,
    pathExtExe: i
  };
}, Es = (e, t, n) => {
  typeof t == "function" && (n = t, t = {}), t || (t = {});
  const { pathEnv: r, pathExt: i, pathExtExe: a } = ws(e, t), o = [], s = (f) => new Promise((l, u) => {
    if (f === r.length)
      return t.all && o.length ? l(o) : u(vs(e));
    const p = r[f], d = /^".*"$/.test(p) ? p.slice(1, -1) : p, h = gs.join(d, e), m = !d && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + h : h;
    l(c(m, f, 0));
  }), c = (f, l, u) => new Promise((p, d) => {
    if (u === i.length)
      return p(s(l + 1));
    const h = i[u];
    ys(f + h, { pathExt: a }, (m, g) => {
      if (!m && g)
        if (t.all)
          o.push(f + h);
        else
          return p(f + h);
      return p(c(f, l, u + 1));
    });
  });
  return n ? s(0).then((f) => n(null, f), n) : s(0);
}, Id = (e, t) => {
  t = t || {};
  const { pathEnv: n, pathExt: r, pathExtExe: i } = ws(e, t), a = [];
  for (let o = 0; o < n.length; o++) {
    const s = n[o], c = /^".*"$/.test(s) ? s.slice(1, -1) : s, f = gs.join(c, e), l = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + f : f;
    for (let u = 0; u < r.length; u++) {
      const p = l + r[u];
      try {
        if (ys.sync(p, { pathExt: i }))
          if (t.all)
            a.push(p);
          else
            return p;
      } catch {
      }
    }
  }
  if (t.all && a.length)
    return a;
  if (t.nothrow)
    return null;
  throw vs(e);
};
var Od = Es;
Es.sync = Id;
var bi = { exports: {} };
const bs = (e = {}) => {
  const t = e.env || process.env;
  return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
};
bi.exports = bs;
bi.exports.default = bs;
var xs = bi.exports;
const Ao = Ee, Nd = Od, Pd = xs;
function _o(e, t) {
  const n = e.options.env || process.env, r = process.cwd(), i = e.options.cwd != null, a = i && process.chdir !== void 0 && !process.chdir.disabled;
  if (a)
    try {
      process.chdir(e.options.cwd);
    } catch {
    }
  let o;
  try {
    o = Nd.sync(e.command, {
      path: n[Pd({ env: n })],
      pathExt: t ? Ao.delimiter : void 0
    });
  } catch {
  } finally {
    a && process.chdir(r);
  }
  return o && (o = Ao.resolve(i ? e.options.cwd : "", o)), o;
}
function Ld(e) {
  return _o(e) || _o(e, !0);
}
var kd = Ld, xi = {};
const ii = /([()\][%!^"`<>&|;, *?])/g;
function Dd(e) {
  return e = e.replace(ii, "^$1"), e;
}
function Md(e, t) {
  return e = `${e}`, e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), e = e.replace(/(?=(\\+?)?)\1$/, "$1$1"), e = `"${e}"`, e = e.replace(ii, "^$1"), t && (e = e.replace(ii, "^$1")), e;
}
xi.command = Dd;
xi.argument = Md;
var jd = /^#!(.*)/;
const Hd = jd;
var Bd = (e = "") => {
  const t = e.match(Hd);
  if (!t)
    return null;
  const [n, r] = t[0].replace(/#! ?/, "").split(" "), i = n.split("/").pop();
  return i === "env" ? r : r ? `${i} ${r}` : i;
};
const xr = Ve, Ud = Bd;
function Gd(e) {
  const n = Buffer.alloc(150);
  let r;
  try {
    r = xr.openSync(e, "r"), xr.readSync(r, n, 0, 150, 0), xr.closeSync(r);
  } catch {
  }
  return Ud(n.toString());
}
var qd = Gd;
const Kd = Ee, To = kd, Co = xi, Wd = qd, zd = process.platform === "win32", Yd = /\.(?:com|exe)$/i, Qd = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function Vd(e) {
  e.file = To(e);
  const t = e.file && Wd(e.file);
  return t ? (e.args.unshift(e.file), e.command = t, To(e)) : e.file;
}
function Xd(e) {
  if (!zd)
    return e;
  const t = Vd(e), n = !Yd.test(t);
  if (e.options.forceShell || n) {
    const r = Qd.test(t);
    e.command = Kd.normalize(e.command), e.command = Co.command(e.command), e.args = e.args.map((a) => Co.argument(a, r));
    const i = [e.command].concat(e.args).join(" ");
    e.args = ["/d", "/s", "/c", `"${i}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
  }
  return e;
}
function Zd(e, t, n) {
  t && !Array.isArray(t) && (n = t, t = null), t = t ? t.slice(0) : [], n = Object.assign({}, n);
  const r = {
    command: e,
    args: t,
    options: n,
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return n.shell ? r : Xd(r);
}
var Jd = Zd;
const Si = process.platform === "win32";
function Ai(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}
function eh(e, t) {
  if (!Si)
    return;
  const n = e.emit;
  e.emit = function(r, i) {
    if (r === "exit") {
      const a = Ss(i, t);
      if (a)
        return n.call(e, "error", a);
    }
    return n.apply(e, arguments);
  };
}
function Ss(e, t) {
  return Si && e === 1 && !t.file ? Ai(t.original, "spawn") : null;
}
function th(e, t) {
  return Si && e === 1 && !t.file ? Ai(t.original, "spawnSync") : null;
}
var nh = {
  hookChildProcess: eh,
  verifyENOENT: Ss,
  verifyENOENTSync: th,
  notFoundError: Ai
};
const As = vn, _i = Jd, Ti = nh;
function _s(e, t, n) {
  const r = _i(e, t, n), i = As.spawn(r.command, r.args, r.options);
  return Ti.hookChildProcess(i, r), i;
}
function rh(e, t, n) {
  const r = _i(e, t, n), i = As.spawnSync(r.command, r.args, r.options);
  return i.error = i.error || Ti.verifyENOENTSync(i.status, r), i;
}
Ot.exports = _s;
Ot.exports.spawn = _s;
Ot.exports.sync = rh;
Ot.exports._parse = _i;
Ot.exports._enoent = Ti;
var ih = Ot.exports, oh = (e) => {
  const t = typeof e == "string" ? `
` : 10, n = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === n && (e = e.slice(0, e.length - 1)), e;
}, Ci = { exports: {} };
Ci.exports;
(function(e) {
  const t = Ee, n = xs, r = (i) => {
    i = {
      cwd: process.cwd(),
      path: process.env[n()],
      execPath: process.execPath,
      ...i
    };
    let a, o = t.resolve(i.cwd);
    const s = [];
    for (; a !== o; )
      s.push(t.join(o, "node_modules/.bin")), a = o, o = t.resolve(o, "..");
    const c = t.resolve(i.cwd, i.execPath, "..");
    return s.push(c), s.concat(i.path).join(t.delimiter);
  };
  e.exports = r, e.exports.default = r, e.exports.env = (i) => {
    i = {
      env: process.env,
      ...i
    };
    const a = { ...i.env }, o = n({ env: a });
    return i.path = a[o], a[o] = e.exports(i), a;
  };
})(Ci);
var ah = Ci.exports, Jn = { exports: {} }, Ri = { exports: {} };
const Ts = (e, t) => {
  for (const n of Reflect.ownKeys(t))
    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
  return e;
};
Ri.exports = Ts;
Ri.exports.default = Ts;
var sh = Ri.exports;
const ch = sh, $n = /* @__PURE__ */ new WeakMap(), Cs = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, r = 0;
  const i = e.displayName || e.name || "<anonymous>", a = function(...o) {
    if ($n.set(a, ++r), r === 1)
      n = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${i}\` can only be called once`);
    return n;
  };
  return ch(a, e), $n.set(a, r), a;
};
Jn.exports = Cs;
Jn.exports.default = Cs;
Jn.exports.callCount = (e) => {
  if (!$n.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return $n.get(e);
};
var uh = Jn.exports, Ft = {}, er = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.SIGNALS = void 0;
const lh = [
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
tr.SIGNALS = lh;
var st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.SIGRTMAX = st.getRealtimeSignals = void 0;
const fh = function() {
  const e = Fs - Rs + 1;
  return Array.from({ length: e }, ph);
};
st.getRealtimeSignals = fh;
const ph = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: Rs + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, Rs = 34, Fs = 64;
st.SIGRTMAX = Fs;
Object.defineProperty(er, "__esModule", { value: !0 });
er.getSignals = void 0;
var dh = Kn, hh = tr, mh = st;
const gh = function() {
  const e = (0, mh.getRealtimeSignals)();
  return [...hh.SIGNALS, ...e].map(yh);
};
er.getSignals = gh;
const yh = function({
  name: e,
  number: t,
  description: n,
  action: r,
  forced: i = !1,
  standard: a
}) {
  const {
    signals: { [e]: o }
  } = dh.constants, s = o !== void 0;
  return { name: e, number: s ? o : t, description: n, supported: s, action: r, forced: i, standard: a };
};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.signalsByNumber = Ft.signalsByName = void 0;
var vh = Kn, $s = er, wh = st;
const Eh = function() {
  return (0, $s.getSignals)().reduce(bh, {});
}, bh = function(e, { name: t, number: n, description: r, supported: i, action: a, forced: o, standard: s }) {
  return {
    ...e,
    [t]: { name: t, number: n, description: r, supported: i, action: a, forced: o, standard: s }
  };
}, xh = Eh();
Ft.signalsByName = xh;
const Sh = function() {
  const e = (0, $s.getSignals)(), t = wh.SIGRTMAX + 1, n = Array.from({ length: t }, (r, i) => Ah(i, e));
  return Object.assign({}, ...n);
}, Ah = function(e, t) {
  const n = _h(e, t);
  if (n === void 0)
    return {};
  const { name: r, description: i, supported: a, action: o, forced: s, standard: c } = n;
  return {
    [e]: {
      name: r,
      number: e,
      description: i,
      supported: a,
      action: o,
      forced: s,
      standard: c
    }
  };
}, _h = function(e, t) {
  const n = t.find(({ name: r }) => vh.constants.signals[r] === e);
  return n !== void 0 ? n : t.find((r) => r.number === e);
}, Th = Sh();
Ft.signalsByNumber = Th;
const { signalsByName: Ch } = Ft, Rh = ({ timedOut: e, timeout: t, errorCode: n, signal: r, signalDescription: i, exitCode: a, isCanceled: o }) => e ? `timed out after ${t} milliseconds` : o ? "was canceled" : n !== void 0 ? `failed with ${n}` : r !== void 0 ? `was killed with ${r} (${i})` : a !== void 0 ? `failed with exit code ${a}` : "failed", Fh = ({
  stdout: e,
  stderr: t,
  all: n,
  error: r,
  signal: i,
  exitCode: a,
  command: o,
  escapedCommand: s,
  timedOut: c,
  isCanceled: f,
  killed: l,
  parsed: { options: { timeout: u } }
}) => {
  a = a === null ? void 0 : a, i = i === null ? void 0 : i;
  const p = i === void 0 ? void 0 : Ch[i].description, d = r && r.code, m = `Command ${Rh({ timedOut: c, timeout: u, errorCode: d, signal: i, signalDescription: p, exitCode: a, isCanceled: f })}: ${o}`, g = Object.prototype.toString.call(r) === "[object Error]", b = g ? `${m}
${r.message}` : m, x = [b, t, e].filter(Boolean).join(`
`);
  return g ? (r.originalMessage = r.message, r.message = x) : r = new Error(x), r.shortMessage = b, r.command = o, r.escapedCommand = s, r.exitCode = a, r.signal = i, r.signalDescription = p, r.stdout = e, r.stderr = t, n !== void 0 && (r.all = n), "bufferedData" in r && delete r.bufferedData, r.failed = !0, r.timedOut = !!c, r.isCanceled = f, r.killed = l && !c, r;
};
var $h = Fh, Fi = { exports: {} };
const fn = ["stdin", "stdout", "stderr"], Ih = (e) => fn.some((t) => e[t] !== void 0), Is = (e) => {
  if (!e)
    return;
  const { stdio: t } = e;
  if (t === void 0)
    return fn.map((r) => e[r]);
  if (Ih(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${fn.map((r) => `\`${r}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  const n = Math.max(t.length, fn.length);
  return Array.from({ length: n }, (r, i) => t[i]);
};
Fi.exports = Is;
Fi.exports.node = (e) => {
  const t = Is(e);
  return t === "ipc" ? "ipc" : t === void 0 || typeof t == "string" ? [t, t, t, "ipc"] : t.includes("ipc") ? t : [...t, "ipc"];
};
var Oh = Fi.exports, bt = { exports: {} }, Sr = { exports: {} }, Ro;
function Nh() {
  return Ro || (Ro = 1, function(e) {
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
  }(Sr)), Sr.exports;
}
var J = ve.process;
const Xe = function(e) {
  return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
};
if (!Xe(J))
  bt.exports = function() {
    return function() {
    };
  };
else {
  var Ph = La, Pt = Nh(), Lh = /^win/i.test(J.platform), rn = Iu;
  typeof rn != "function" && (rn = rn.EventEmitter);
  var ue;
  J.__signal_exit_emitter__ ? ue = J.__signal_exit_emitter__ : (ue = J.__signal_exit_emitter__ = new rn(), ue.count = 0, ue.emitted = {}), ue.infinite || (ue.setMaxListeners(1 / 0), ue.infinite = !0), bt.exports = function(e, t) {
    if (!Xe(ve.process))
      return function() {
      };
    Ph.equal(typeof e, "function", "a callback must be provided for exit handler"), Lt === !1 && Fo();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    var r = function() {
      ue.removeListener(n, e), ue.listeners("exit").length === 0 && ue.listeners("afterexit").length === 0 && Ar();
    };
    return ue.on(n, e), r;
  };
  var Ar = function() {
    !Lt || !Xe(ve.process) || (Lt = !1, Pt.forEach(function(t) {
      try {
        J.removeListener(t, _r[t]);
      } catch {
      }
    }), J.emit = Tr, J.reallyExit = $o, ue.count -= 1);
  };
  bt.exports.unload = Ar;
  var mt = function(t, n, r) {
    ue.emitted[t] || (ue.emitted[t] = !0, ue.emit(t, n, r));
  }, _r = {};
  Pt.forEach(function(e) {
    _r[e] = function() {
      if (Xe(ve.process)) {
        var n = J.listeners(e);
        n.length === ue.count && (Ar(), mt("exit", null, e), mt("afterexit", null, e), Lh && e === "SIGHUP" && (e = "SIGINT"), J.kill(J.pid, e));
      }
    };
  }), bt.exports.signals = function() {
    return Pt;
  };
  var Lt = !1, Fo = function() {
    Lt || !Xe(ve.process) || (Lt = !0, ue.count += 1, Pt = Pt.filter(function(t) {
      try {
        return J.on(t, _r[t]), !0;
      } catch {
        return !1;
      }
    }), J.emit = Dh, J.reallyExit = kh);
  };
  bt.exports.load = Fo;
  var $o = J.reallyExit, kh = function(t) {
    Xe(ve.process) && (J.exitCode = t || /* istanbul ignore next */
    0, mt("exit", J.exitCode, null), mt("afterexit", J.exitCode, null), $o.call(J, J.exitCode));
  }, Tr = J.emit, Dh = function(t, n) {
    if (t === "exit" && Xe(ve.process)) {
      n !== void 0 && (J.exitCode = n);
      var r = Tr.apply(this, arguments);
      return mt("exit", J.exitCode, null), mt("afterexit", J.exitCode, null), r;
    } else
      return Tr.apply(this, arguments);
  };
}
var Mh = bt.exports;
const jh = Kn, Hh = Mh, Bh = 1e3 * 5, Uh = (e, t = "SIGTERM", n = {}) => {
  const r = e(t);
  return Gh(e, t, n, r), r;
}, Gh = (e, t, n, r) => {
  if (!qh(t, n, r))
    return;
  const i = Wh(n), a = setTimeout(() => {
    e("SIGKILL");
  }, i);
  a.unref && a.unref();
}, qh = (e, { forceKillAfterTimeout: t }, n) => Kh(e) && t !== !1 && n, Kh = (e) => e === jh.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", Wh = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return Bh;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, zh = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, Yh = (e, t, n) => {
  e.kill(t), n(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, Qh = (e, { timeout: t, killSignal: n = "SIGTERM" }, r) => {
  if (t === 0 || t === void 0)
    return r;
  let i;
  const a = new Promise((s, c) => {
    i = setTimeout(() => {
      Yh(e, n, c);
    }, t);
  }), o = r.finally(() => {
    clearTimeout(i);
  });
  return Promise.race([a, o]);
}, Vh = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, Xh = async (e, { cleanup: t, detached: n }, r) => {
  if (!t || n)
    return r;
  const i = Hh(() => {
    e.kill();
  });
  return r.finally(() => {
    i();
  });
};
var Zh = {
  spawnedKill: Uh,
  spawnedCancel: zh,
  setupTimeout: Qh,
  validateTimeout: Vh,
  setExitHandler: Xh
};
const Le = (e) => e !== null && typeof e == "object" && typeof e.pipe == "function";
Le.writable = (e) => Le(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
Le.readable = (e) => Le(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
Le.duplex = (e) => Le.writable(e) && Le.readable(e);
Le.transform = (e) => Le.duplex(e) && typeof e._transform == "function";
var Jh = Le, Wt = { exports: {} };
const { PassThrough: em } = Wn;
var tm = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const a = new em({ objectMode: i });
  n && a.setEncoding(n);
  let o = 0;
  const s = [];
  return a.on("data", (c) => {
    s.push(c), i ? o = s.length : o += c.length;
  }), a.getBufferedValue = () => t ? s : r ? Buffer.concat(s, o) : s.join(""), a.getBufferedLength = () => o, a;
};
const { constants: nm } = Ou, rm = Wn, { promisify: im } = ut, om = tm, am = im(rm.pipeline);
class Os extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function $i(e, t) {
  if (!e)
    throw new Error("Expected a stream");
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: n } = t, r = om(t);
  return await new Promise((i, a) => {
    const o = (s) => {
      s && r.getBufferedLength() <= nm.MAX_LENGTH && (s.bufferedData = r.getBufferedValue()), a(s);
    };
    (async () => {
      try {
        await am(e, r), i();
      } catch (s) {
        o(s);
      }
    })(), r.on("data", () => {
      r.getBufferedLength() > n && o(new Os());
    });
  }), r.getBufferedValue();
}
Wt.exports = $i;
Wt.exports.buffer = (e, t) => $i(e, { ...t, encoding: "buffer" });
Wt.exports.array = (e, t) => $i(e, { ...t, array: !0 });
Wt.exports.MaxBufferError = Os;
var sm = Wt.exports;
const { PassThrough: cm } = Wn;
var um = function() {
  var e = [], t = new cm({ objectMode: !0 });
  return t.setMaxListeners(0), t.add = n, t.isEmpty = r, t.on("unpipe", i), Array.prototype.slice.call(arguments).forEach(n), t;
  function n(a) {
    return Array.isArray(a) ? (a.forEach(n), this) : (e.push(a), a.once("end", i.bind(null, a)), a.once("error", t.emit.bind(t, "error")), a.pipe(t, { end: !1 }), this);
  }
  function r() {
    return e.length == 0;
  }
  function i(a) {
    e = e.filter(function(o) {
      return o !== a;
    }), !e.length && t.readable && t.end();
  }
};
const Ns = Jh, Io = sm, lm = um, fm = (e, t) => {
  t === void 0 || e.stdin === void 0 || (Ns(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, pm = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  const n = lm();
  return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
}, Cr = async (e, t) => {
  if (e) {
    e.destroy();
    try {
      return await t;
    } catch (n) {
      return n.bufferedData;
    }
  }
}, Rr = (e, { encoding: t, buffer: n, maxBuffer: r }) => {
  if (!(!e || !n))
    return t ? Io(e, { encoding: t, maxBuffer: r }) : Io.buffer(e, { maxBuffer: r });
}, dm = async ({ stdout: e, stderr: t, all: n }, { encoding: r, buffer: i, maxBuffer: a }, o) => {
  const s = Rr(e, { encoding: r, buffer: i, maxBuffer: a }), c = Rr(t, { encoding: r, buffer: i, maxBuffer: a }), f = Rr(n, { encoding: r, buffer: i, maxBuffer: a * 2 });
  try {
    return await Promise.all([o, s, c, f]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      Cr(e, s),
      Cr(t, c),
      Cr(n, f)
    ]);
  }
}, hm = ({ input: e }) => {
  if (Ns(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
};
var mm = {
  handleInput: fm,
  makeAllStream: pm,
  getSpawnedResult: dm,
  validateInputSync: hm
};
const gm = (async () => {
})().constructor.prototype, ym = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(gm, e)
]), vm = (e, t) => {
  for (const [n, r] of ym) {
    const i = typeof t == "function" ? (...a) => Reflect.apply(r.value, t(), a) : r.value.bind(t);
    Reflect.defineProperty(e, n, { ...r, value: i });
  }
  return e;
}, wm = (e) => new Promise((t, n) => {
  e.on("exit", (r, i) => {
    t({ exitCode: r, signal: i });
  }), e.on("error", (r) => {
    n(r);
  }), e.stdin && e.stdin.on("error", (r) => {
    n(r);
  });
});
var Em = {
  mergePromise: vm,
  getSpawnedPromise: wm
};
const Ps = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], bm = /^[\w.-]+$/, xm = /"/g, Sm = (e) => typeof e != "string" || bm.test(e) ? e : `"${e.replace(xm, '\\"')}"`, Am = (e, t) => Ps(e, t).join(" "), _m = (e, t) => Ps(e, t).map((n) => Sm(n)).join(" "), Tm = / +/g, Cm = (e) => {
  const t = [];
  for (const n of e.trim().split(Tm)) {
    const r = t[t.length - 1];
    r && r.endsWith("\\") ? t[t.length - 1] = `${r.slice(0, -1)} ${n}` : t.push(n);
  }
  return t;
};
var Rm = {
  joinCommand: Am,
  getEscapedCommand: _m,
  parseCommand: Cm
};
const Fm = Ee, oi = vn, $m = ih, Im = oh, Om = ah, Nm = uh, In = $h, Ls = Oh, { spawnedKill: Pm, spawnedCancel: Lm, setupTimeout: km, validateTimeout: Dm, setExitHandler: Mm } = Zh, { handleInput: jm, getSpawnedResult: Hm, makeAllStream: Bm, validateInputSync: Um } = mm, { mergePromise: Oo, getSpawnedPromise: Gm } = Em, { joinCommand: ks, parseCommand: Ds, getEscapedCommand: Ms } = Rm, qm = 1e3 * 1e3 * 100, Km = ({ env: e, extendEnv: t, preferLocal: n, localDir: r, execPath: i }) => {
  const a = t ? { ...process.env, ...e } : e;
  return n ? Om.env({ env: a, cwd: r, execPath: i }) : a;
}, js = (e, t, n = {}) => {
  const r = $m._parse(e, t, n);
  return e = r.command, t = r.args, n = r.options, n = {
    maxBuffer: qm,
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
  }, n.env = Km(n), n.stdio = Ls(n), process.platform === "win32" && Fm.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: n, parsed: r };
}, Mt = (e, t, n) => typeof t != "string" && !Buffer.isBuffer(t) ? n === void 0 ? void 0 : "" : e.stripFinalNewline ? Im(t) : t, nr = (e, t, n) => {
  const r = js(e, t, n), i = ks(e, t), a = Ms(e, t);
  Dm(r.options);
  let o;
  try {
    o = oi.spawn(r.file, r.args, r.options);
  } catch (d) {
    const h = new oi.ChildProcess(), m = Promise.reject(In({
      error: d,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return Oo(h, m);
  }
  const s = Gm(o), c = km(o, r.options, s), f = Mm(o, r.options, c), l = { isCanceled: !1 };
  o.kill = Pm.bind(null, o.kill.bind(o)), o.cancel = Lm.bind(null, o, l);
  const p = Nm(async () => {
    const [{ error: d, exitCode: h, signal: m, timedOut: g }, b, x, T] = await Hm(o, r.options, f), _ = Mt(r.options, b), C = Mt(r.options, x), R = Mt(r.options, T);
    if (d || h !== 0 || m !== null) {
      const M = In({
        error: d,
        exitCode: h,
        signal: m,
        stdout: _,
        stderr: C,
        all: R,
        command: i,
        escapedCommand: a,
        parsed: r,
        timedOut: g,
        isCanceled: l.isCanceled,
        killed: o.killed
      });
      if (!r.options.reject)
        return M;
      throw M;
    }
    return {
      command: i,
      escapedCommand: a,
      exitCode: 0,
      stdout: _,
      stderr: C,
      all: R,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return jm(o, r.options.input), o.all = Bm(o, r.options), Oo(o, p);
};
Kt.exports = nr;
Kt.exports.sync = (e, t, n) => {
  const r = js(e, t, n), i = ks(e, t), a = Ms(e, t);
  Um(r.options);
  let o;
  try {
    o = oi.spawnSync(r.file, r.args, r.options);
  } catch (f) {
    throw In({
      error: f,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  const s = Mt(r.options, o.stdout, o.error), c = Mt(r.options, o.stderr, o.error);
  if (o.error || o.status !== 0 || o.signal !== null) {
    const f = In({
      stdout: s,
      stderr: c,
      error: o.error,
      signal: o.signal,
      exitCode: o.status,
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: o.error && o.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: o.signal !== null
    });
    if (!r.options.reject)
      return f;
    throw f;
  }
  return {
    command: i,
    escapedCommand: a,
    exitCode: 0,
    stdout: s,
    stderr: c,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
};
Kt.exports.command = (e, t) => {
  const [n, ...r] = Ds(e);
  return nr(n, r, t);
};
Kt.exports.commandSync = (e, t) => {
  const [n, ...r] = Ds(e);
  return nr.sync(n, r, t);
};
Kt.exports.node = (e, t, n = {}) => {
  t && !Array.isArray(t) && typeof t == "object" && (n = t, t = []);
  const r = Ls.node(n), i = process.execArgv.filter((s) => !s.startsWith("--inspect")), {
    nodePath: a = process.execPath,
    nodeOptions: o = i
  } = n;
  return nr(
    a,
    [
      ...o,
      e,
      ...Array.isArray(t) ? t : []
    ],
    {
      ...n,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio: r,
      shell: !1
    }
  );
};
var xe = {}, rr = { exports: {} }, Hs = { exports: {} }, Ii = { exports: {} }, Oi = { exports: {} }, Ni = { exports: {} }, Pi = { exports: {} };
const Bs = (e, ...t) => new Promise((n) => {
  n(e(...t));
});
Pi.exports = Bs;
Pi.exports.default = Bs;
var Wm = Pi.exports;
const zm = Wm, Us = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let n = 0;
  const r = () => {
    n--, t.length > 0 && t.shift()();
  }, i = (s, c, ...f) => {
    n++;
    const l = zm(s, ...f);
    c(l), l.then(r, r);
  }, a = (s, c, ...f) => {
    n < e ? i(s, c, ...f) : t.push(i.bind(null, s, c, ...f));
  }, o = (s, ...c) => new Promise((f) => a(s, f, ...c));
  return Object.defineProperties(o, {
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
  }), o;
};
Ni.exports = Us;
Ni.exports.default = Us;
var Ym = Ni.exports;
const No = Ym;
let Gs = class extends Error {
  constructor(t) {
    super(), this.value = t;
  }
};
const Qm = async (e, t) => t(await e), Vm = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new Gs(t[0]);
  return !1;
}, qs = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const r = No(n.concurrency), i = [...e].map((o) => [o, r(Qm, o, t)]), a = No(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(i.map((o) => a(Vm, o)));
  } catch (o) {
    if (o instanceof Gs)
      return o.value;
    throw o;
  }
};
Oi.exports = qs;
Oi.exports.default = qs;
var Xm = Oi.exports;
const Ks = Ee, On = Ve, { promisify: Ws } = ut, Zm = Xm, Jm = Ws(On.stat), eg = Ws(On.lstat), zs = {
  directory: "isDirectory",
  file: "isFile"
};
function Ys({ type: e }) {
  if (!(e in zs))
    throw new Error(`Invalid type specified: ${e}`);
}
const Qs = (e, t) => e === void 0 || t[zs[e]]();
Ii.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, Ys(t);
  const n = t.allowSymlinks ? Jm : eg;
  return Zm(e, async (r) => {
    try {
      const i = await n(Ks.resolve(t.cwd, r));
      return Qs(t.type, i);
    } catch {
      return !1;
    }
  }, t);
};
Ii.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, Ys(t);
  const n = t.allowSymlinks ? On.statSync : On.lstatSync;
  for (const r of e)
    try {
      const i = n(Ks.resolve(t.cwd, r));
      if (Qs(t.type, i))
        return r;
    } catch {
    }
};
var tg = Ii.exports, Li = { exports: {} };
const Vs = Ve, { promisify: ng } = ut, rg = ng(Vs.access);
Li.exports = async (e) => {
  try {
    return await rg(e), !0;
  } catch {
    return !1;
  }
};
Li.exports.sync = (e) => {
  try {
    return Vs.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Xs = Li.exports;
(function(e) {
  const t = Ee, n = tg, r = Xs, i = Symbol("findUp.stop");
  e.exports = async (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), l = async (u) => {
      if (typeof a != "function")
        return n(f, u);
      const p = await a(u.cwd);
      return typeof p == "string" ? n([p], u) : p;
    };
    for (; ; ) {
      const u = await l({ ...o, cwd: s });
      if (u === i)
        return;
      if (u)
        return t.resolve(s, u);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), l = (u) => {
      if (typeof a != "function")
        return n.sync(f, u);
      const p = a(u.cwd);
      return typeof p == "string" ? n.sync([p], u) : p;
    };
    for (; ; ) {
      const u = l({ ...o, cwd: s });
      if (u === i)
        return;
      if (u)
        return t.resolve(s, u);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = r, e.exports.sync.exists = r.sync, e.exports.stop = i;
})(Hs);
var ig = Hs.exports;
const Zs = Ee, Js = ig, ec = async (e) => {
  const t = await Js("package.json", { cwd: e });
  return t && Zs.dirname(t);
};
rr.exports = ec;
rr.exports.default = ec;
rr.exports.sync = (e) => {
  const t = Js.sync("package.json", { cwd: e });
  return t && Zs.dirname(t);
};
var og = rr.exports, ir = {};
(function(e) {
  e.isInteger = (t) => typeof t == "number" ? Number.isInteger(t) : typeof t == "string" && t.trim() !== "" ? Number.isInteger(Number(t)) : !1, e.find = (t, n) => t.nodes.find((r) => r.type === n), e.exceedsLimit = (t, n, r = 1, i) => i === !1 || !e.isInteger(t) || !e.isInteger(n) ? !1 : (Number(n) - Number(t)) / Number(r) >= i, e.escapeNode = (t, n = 0, r) => {
    const i = t.nodes[n];
    i && (r && i.type === r || i.type === "open" || i.type === "close") && i.escaped !== !0 && (i.value = "\\" + i.value, i.escaped = !0);
  }, e.encloseBrace = (t) => t.type !== "brace" || t.commas >> 0 + t.ranges >> 0 ? !1 : (t.invalid = !0, !0), e.isInvalidBrace = (t) => t.type !== "brace" ? !1 : t.invalid === !0 || t.dollar ? !0 : !(t.commas >> 0 + t.ranges >> 0) || t.open !== !0 || t.close !== !0 ? (t.invalid = !0, !0) : !1, e.isOpenOrClose = (t) => t.type === "open" || t.type === "close" ? !0 : t.open === !0 || t.close === !0, e.reduce = (t) => t.reduce((n, r) => (r.type === "text" && n.push(r.value), r.type === "range" && (r.type = "text"), n), []), e.flatten = (...t) => {
    const n = [], r = (i) => {
      for (let a = 0; a < i.length; a++) {
        const o = i[a];
        if (Array.isArray(o)) {
          r(o);
          continue;
        }
        o !== void 0 && n.push(o);
      }
      return n;
    };
    return r(t), n;
  };
})(ir);
const Po = ir;
var ki = (e, t = {}) => {
  const n = (r, i = {}) => {
    const a = t.escapeInvalid && Po.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0;
    let s = "";
    if (r.value)
      return (a || o) && Po.isOpenOrClose(r) ? "\\" + r.value : r.value;
    if (r.value)
      return r.value;
    if (r.nodes)
      for (const c of r.nodes)
        s += n(c);
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
var ag = function(e) {
  return typeof e == "number" ? e - e === 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const Lo = ag, rt = (e, t, n) => {
  if (Lo(e) === !1)
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  if (t === void 0 || e === t)
    return String(e);
  if (Lo(t) === !1)
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  let r = { relaxZeros: !0, ...n };
  typeof r.strictZeros == "boolean" && (r.relaxZeros = r.strictZeros === !1);
  let i = String(r.relaxZeros), a = String(r.shorthand), o = String(r.capture), s = String(r.wrap), c = e + ":" + t + "=" + i + a + o + s;
  if (rt.cache.hasOwnProperty(c))
    return rt.cache[c].result;
  let f = Math.min(e, t), l = Math.max(e, t);
  if (Math.abs(f - l) === 1) {
    let m = e + "|" + t;
    return r.capture ? `(${m})` : r.wrap === !1 ? m : `(?:${m})`;
  }
  let u = Bo(e) || Bo(t), p = { min: e, max: t, a: f, b: l }, d = [], h = [];
  if (u && (p.isPadded = u, p.maxLen = String(p.max).length), f < 0) {
    let m = l < 0 ? Math.abs(l) : 1;
    h = ko(m, Math.abs(f), p, r), f = p.a = 0;
  }
  return l >= 0 && (d = ko(f, l, p, r)), p.negatives = h, p.positives = d, p.result = sg(h, d), r.capture === !0 ? p.result = `(${p.result})` : r.wrap !== !1 && d.length + h.length > 1 && (p.result = `(?:${p.result})`), rt.cache[c] = p, p.result;
};
function sg(e, t, n) {
  let r = Fr(e, t, "-", !1) || [], i = Fr(t, e, "", !1) || [], a = Fr(e, t, "-?", !0) || [];
  return r.concat(a).concat(i).join("|");
}
function cg(e, t) {
  let n = 1, r = 1, i = Mo(e, n), a = /* @__PURE__ */ new Set([t]);
  for (; e <= i && i <= t; )
    a.add(i), n += 1, i = Mo(e, n);
  for (i = jo(t + 1, r) - 1; e < i && i <= t; )
    a.add(i), r += 1, i = jo(t + 1, r) - 1;
  return a = [...a], a.sort(fg), a;
}
function ug(e, t, n) {
  if (e === t)
    return { pattern: e, count: [], digits: 0 };
  let r = lg(e, t), i = r.length, a = "", o = 0;
  for (let s = 0; s < i; s++) {
    let [c, f] = r[s];
    c === f ? a += c : c !== "0" || f !== "9" ? a += pg(c, f) : o++;
  }
  return o && (a += n.shorthand === !0 ? "\\d" : "[0-9]"), { pattern: a, count: [o], digits: i };
}
function ko(e, t, n, r) {
  let i = cg(e, t), a = [], o = e, s;
  for (let c = 0; c < i.length; c++) {
    let f = i[c], l = ug(String(o), String(f), r), u = "";
    if (!n.isPadded && s && s.pattern === l.pattern) {
      s.count.length > 1 && s.count.pop(), s.count.push(l.count[0]), s.string = s.pattern + Ho(s.count), o = f + 1;
      continue;
    }
    n.isPadded && (u = dg(f, n, r)), l.string = u + l.pattern + Ho(l.count), a.push(l), o = f + 1, s = l;
  }
  return a;
}
function Fr(e, t, n, r, i) {
  let a = [];
  for (let o of e) {
    let { string: s } = o;
    !r && !Do(t, "string", s) && a.push(n + s), r && Do(t, "string", s) && a.push(n + s);
  }
  return a;
}
function lg(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r++) n.push([e[r], t[r]]);
  return n;
}
function fg(e, t) {
  return e > t ? 1 : t > e ? -1 : 0;
}
function Do(e, t, n) {
  return e.some((r) => r[t] === n);
}
function Mo(e, t) {
  return Number(String(e).slice(0, -t) + "9".repeat(t));
}
function jo(e, t) {
  return e - e % Math.pow(10, t);
}
function Ho(e) {
  let [t = 0, n = ""] = e;
  return n || t > 1 ? `{${t + (n ? "," + n : "")}}` : "";
}
function pg(e, t, n) {
  return `[${e}${t - e === 1 ? "" : "-"}${t}]`;
}
function Bo(e) {
  return /^-?(0+)\d/.test(e);
}
function dg(e, t, n) {
  if (!t.isPadded)
    return e;
  let r = Math.abs(t.maxLen - String(e).length), i = n.relaxZeros !== !1;
  switch (r) {
    case 0:
      return "";
    case 1:
      return i ? "0?" : "0";
    case 2:
      return i ? "0{0,2}" : "00";
    default:
      return i ? `0{0,${r}}` : `0{${r}}`;
  }
}
rt.cache = {};
rt.clearCache = () => rt.cache = {};
var hg = rt;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const mg = ut, tc = hg, Uo = (e) => e !== null && typeof e == "object" && !Array.isArray(e), gg = (e) => (t) => e === !0 ? Number(t) : String(t), $r = (e) => typeof e == "number" || typeof e == "string" && e !== "", jt = (e) => Number.isInteger(+e), Ir = (e) => {
  let t = `${e}`, n = -1;
  if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
  for (; t[++n] === "0"; ) ;
  return n > 0;
}, yg = (e, t, n) => typeof e == "string" || typeof t == "string" ? !0 : n.stringify === !0, vg = (e, t, n) => {
  if (t > 0) {
    let r = e[0] === "-" ? "-" : "";
    r && (e = e.slice(1)), e = r + e.padStart(r ? t - 1 : t, "0");
  }
  return n === !1 ? String(e) : e;
}, Nn = (e, t) => {
  let n = e[0] === "-" ? "-" : "";
  for (n && (e = e.slice(1), t--); e.length < t; ) e = "0" + e;
  return n ? "-" + e : e;
}, wg = (e, t, n) => {
  e.negatives.sort((s, c) => s < c ? -1 : s > c ? 1 : 0), e.positives.sort((s, c) => s < c ? -1 : s > c ? 1 : 0);
  let r = t.capture ? "" : "?:", i = "", a = "", o;
  return e.positives.length && (i = e.positives.map((s) => Nn(String(s), n)).join("|")), e.negatives.length && (a = `-(${r}${e.negatives.map((s) => Nn(String(s), n)).join("|")})`), i && a ? o = `${i}|${a}` : o = i || a, t.wrap ? `(${r}${o})` : o;
}, nc = (e, t, n, r) => {
  if (n)
    return tc(e, t, { wrap: !1, ...r });
  let i = String.fromCharCode(e);
  if (e === t) return i;
  let a = String.fromCharCode(t);
  return `[${i}-${a}]`;
}, rc = (e, t, n) => {
  if (Array.isArray(e)) {
    let r = n.wrap === !0, i = n.capture ? "" : "?:";
    return r ? `(${i}${e.join("|")})` : e.join("|");
  }
  return tc(e, t, n);
}, ic = (...e) => new RangeError("Invalid range arguments: " + mg.inspect(...e)), oc = (e, t, n) => {
  if (n.strictRanges === !0) throw ic([e, t]);
  return [];
}, Eg = (e, t) => {
  if (t.strictRanges === !0)
    throw new TypeError(`Expected step "${e}" to be a number`);
  return [];
}, bg = (e, t, n = 1, r = {}) => {
  let i = Number(e), a = Number(t);
  if (!Number.isInteger(i) || !Number.isInteger(a)) {
    if (r.strictRanges === !0) throw ic([e, t]);
    return [];
  }
  i === 0 && (i = 0), a === 0 && (a = 0);
  let o = i > a, s = String(e), c = String(t), f = String(n);
  n = Math.max(Math.abs(n), 1);
  let l = Ir(s) || Ir(c) || Ir(f), u = l ? Math.max(s.length, c.length, f.length) : 0, p = l === !1 && yg(e, t, r) === !1, d = r.transform || gg(p);
  if (r.toRegex && n === 1)
    return nc(Nn(e, u), Nn(t, u), !0, r);
  let h = { negatives: [], positives: [] }, m = (x) => h[x < 0 ? "negatives" : "positives"].push(Math.abs(x)), g = [], b = 0;
  for (; o ? i >= a : i <= a; )
    r.toRegex === !0 && n > 1 ? m(i) : g.push(vg(d(i, b), u, p)), i = o ? i - n : i + n, b++;
  return r.toRegex === !0 ? n > 1 ? wg(h, r, u) : rc(g, null, { wrap: !1, ...r }) : g;
}, xg = (e, t, n = 1, r = {}) => {
  if (!jt(e) && e.length > 1 || !jt(t) && t.length > 1)
    return oc(e, t, r);
  let i = r.transform || ((p) => String.fromCharCode(p)), a = `${e}`.charCodeAt(0), o = `${t}`.charCodeAt(0), s = a > o, c = Math.min(a, o), f = Math.max(a, o);
  if (r.toRegex && n === 1)
    return nc(c, f, !1, r);
  let l = [], u = 0;
  for (; s ? a >= o : a <= o; )
    l.push(i(a, u)), a = s ? a - n : a + n, u++;
  return r.toRegex === !0 ? rc(l, null, { wrap: !1, options: r }) : l;
}, pn = (e, t, n, r = {}) => {
  if (t == null && $r(e))
    return [e];
  if (!$r(e) || !$r(t))
    return oc(e, t, r);
  if (typeof n == "function")
    return pn(e, t, 1, { transform: n });
  if (Uo(n))
    return pn(e, t, 0, n);
  let i = { ...r };
  return i.capture === !0 && (i.wrap = !0), n = n || i.step || 1, jt(n) ? jt(e) && jt(t) ? bg(e, t, n, i) : xg(e, t, Math.max(Math.abs(n), 1), i) : n != null && !Uo(n) ? Eg(n, i) : pn(e, t, 1, n);
};
var ac = pn;
const Sg = ac, Go = ir, Ag = (e, t = {}) => {
  const n = (r, i = {}) => {
    const a = Go.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0, s = a === !0 || o === !0, c = t.escapeInvalid === !0 ? "\\" : "";
    let f = "";
    if (r.isOpen === !0)
      return c + r.value;
    if (r.isClose === !0)
      return console.log("node.isClose", c, r.value), c + r.value;
    if (r.type === "open")
      return s ? c + r.value : "(";
    if (r.type === "close")
      return s ? c + r.value : ")";
    if (r.type === "comma")
      return r.prev.type === "comma" ? "" : s ? r.value : "|";
    if (r.value)
      return r.value;
    if (r.nodes && r.ranges > 0) {
      const l = Go.reduce(r.nodes), u = Sg(...l, { ...t, wrap: !1, toRegex: !0, strictZeros: !0 });
      if (u.length !== 0)
        return l.length > 1 && u.length > 1 ? `(${u})` : u;
    }
    if (r.nodes)
      for (const l of r.nodes)
        f += n(l, r);
    return f;
  };
  return n(e);
};
var _g = Ag;
const Tg = ac, qo = ki, St = ir, Je = (e = "", t = "", n = !1) => {
  const r = [];
  if (e = [].concat(e), t = [].concat(t), !t.length) return e;
  if (!e.length)
    return n ? St.flatten(t).map((i) => `{${i}}`) : t;
  for (const i of e)
    if (Array.isArray(i))
      for (const a of i)
        r.push(Je(a, t, n));
    else
      for (let a of t)
        n === !0 && typeof a == "string" && (a = `{${a}}`), r.push(Array.isArray(a) ? Je(i, a, n) : i + a);
  return St.flatten(r);
}, Cg = (e, t = {}) => {
  const n = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit, r = (i, a = {}) => {
    i.queue = [];
    let o = a, s = a.queue;
    for (; o.type !== "brace" && o.type !== "root" && o.parent; )
      o = o.parent, s = o.queue;
    if (i.invalid || i.dollar) {
      s.push(Je(s.pop(), qo(i, t)));
      return;
    }
    if (i.type === "brace" && i.invalid !== !0 && i.nodes.length === 2) {
      s.push(Je(s.pop(), ["{}"]));
      return;
    }
    if (i.nodes && i.ranges > 0) {
      const u = St.reduce(i.nodes);
      if (St.exceedsLimit(...u, t.step, n))
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      let p = Tg(...u, t);
      p.length === 0 && (p = qo(i, t)), s.push(Je(s.pop(), p)), i.nodes = [];
      return;
    }
    const c = St.encloseBrace(i);
    let f = i.queue, l = i;
    for (; l.type !== "brace" && l.type !== "root" && l.parent; )
      l = l.parent, f = l.queue;
    for (let u = 0; u < i.nodes.length; u++) {
      const p = i.nodes[u];
      if (p.type === "comma" && i.type === "brace") {
        u === 1 && f.push(""), f.push("");
        continue;
      }
      if (p.type === "close") {
        s.push(Je(s.pop(), f, c));
        continue;
      }
      if (p.value && p.type !== "open") {
        f.push(Je(f.pop(), p.value));
        continue;
      }
      p.nodes && r(p, i);
    }
    return f;
  };
  return St.flatten(r(e));
};
var Rg = Cg, Fg = {
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
const $g = ki, {
  MAX_LENGTH: Ko,
  CHAR_BACKSLASH: Or,
  /* \ */
  CHAR_BACKTICK: Ig,
  /* ` */
  CHAR_COMMA: Og,
  /* , */
  CHAR_DOT: Ng,
  /* . */
  CHAR_LEFT_PARENTHESES: Pg,
  /* ( */
  CHAR_RIGHT_PARENTHESES: Lg,
  /* ) */
  CHAR_LEFT_CURLY_BRACE: kg,
  /* { */
  CHAR_RIGHT_CURLY_BRACE: Dg,
  /* } */
  CHAR_LEFT_SQUARE_BRACKET: Wo,
  /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: zo,
  /* ] */
  CHAR_DOUBLE_QUOTE: Mg,
  /* " */
  CHAR_SINGLE_QUOTE: jg,
  /* ' */
  CHAR_NO_BREAK_SPACE: Hg,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: Bg
} = Fg, Ug = (e, t = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  const n = t || {}, r = typeof n.maxLength == "number" ? Math.min(Ko, n.maxLength) : Ko;
  if (e.length > r)
    throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${r})`);
  const i = { type: "root", input: e, nodes: [] }, a = [i];
  let o = i, s = i, c = 0;
  const f = e.length;
  let l = 0, u = 0, p;
  const d = () => e[l++], h = (m) => {
    if (m.type === "text" && s.type === "dot" && (s.type = "text"), s && s.type === "text" && m.type === "text") {
      s.value += m.value;
      return;
    }
    return o.nodes.push(m), m.parent = o, m.prev = s, s = m, m;
  };
  for (h({ type: "bos" }); l < f; )
    if (o = a[a.length - 1], p = d(), !(p === Bg || p === Hg)) {
      if (p === Or) {
        h({ type: "text", value: (t.keepEscaping ? p : "") + d() });
        continue;
      }
      if (p === zo) {
        h({ type: "text", value: "\\" + p });
        continue;
      }
      if (p === Wo) {
        c++;
        let m;
        for (; l < f && (m = d()); ) {
          if (p += m, m === Wo) {
            c++;
            continue;
          }
          if (m === Or) {
            p += d();
            continue;
          }
          if (m === zo && (c--, c === 0))
            break;
        }
        h({ type: "text", value: p });
        continue;
      }
      if (p === Pg) {
        o = h({ type: "paren", nodes: [] }), a.push(o), h({ type: "text", value: p });
        continue;
      }
      if (p === Lg) {
        if (o.type !== "paren") {
          h({ type: "text", value: p });
          continue;
        }
        o = a.pop(), h({ type: "text", value: p }), o = a[a.length - 1];
        continue;
      }
      if (p === Mg || p === jg || p === Ig) {
        const m = p;
        let g;
        for (t.keepQuotes !== !0 && (p = ""); l < f && (g = d()); ) {
          if (g === Or) {
            p += g + d();
            continue;
          }
          if (g === m) {
            t.keepQuotes === !0 && (p += g);
            break;
          }
          p += g;
        }
        h({ type: "text", value: p });
        continue;
      }
      if (p === kg) {
        u++;
        const g = {
          type: "brace",
          open: !0,
          close: !1,
          dollar: s.value && s.value.slice(-1) === "$" || o.dollar === !0,
          depth: u,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        o = h(g), a.push(o), h({ type: "open", value: p });
        continue;
      }
      if (p === Dg) {
        if (o.type !== "brace") {
          h({ type: "text", value: p });
          continue;
        }
        const m = "close";
        o = a.pop(), o.close = !0, h({ type: m, value: p }), u--, o = a[a.length - 1];
        continue;
      }
      if (p === Og && u > 0) {
        if (o.ranges > 0) {
          o.ranges = 0;
          const m = o.nodes.shift();
          o.nodes = [m, { type: "text", value: $g(o) }];
        }
        h({ type: "comma", value: p }), o.commas++;
        continue;
      }
      if (p === Ng && u > 0 && o.commas === 0) {
        const m = o.nodes;
        if (u === 0 || m.length === 0) {
          h({ type: "text", value: p });
          continue;
        }
        if (s.type === "dot") {
          if (o.range = [], s.value += p, s.type = "range", o.nodes.length !== 3 && o.nodes.length !== 5) {
            o.invalid = !0, o.ranges = 0, s.type = "text";
            continue;
          }
          o.ranges++, o.args = [];
          continue;
        }
        if (s.type === "range") {
          m.pop();
          const g = m[m.length - 1];
          g.value += s.value + p, s = g, o.ranges--;
          continue;
        }
        h({ type: "dot", value: p });
        continue;
      }
      h({ type: "text", value: p });
    }
  do
    if (o = a.pop(), o.type !== "root") {
      o.nodes.forEach((b) => {
        b.nodes || (b.type === "open" && (b.isOpen = !0), b.type === "close" && (b.isClose = !0), b.nodes || (b.type = "text"), b.invalid = !0);
      });
      const m = a[a.length - 1], g = m.nodes.indexOf(o);
      m.nodes.splice(g, 1, ...o.nodes);
    }
  while (a.length > 0);
  return h({ type: "eos" }), i;
};
var Gg = Ug;
const Yo = ki, qg = _g, Kg = Rg, Wg = Gg, Se = (e, t = {}) => {
  let n = [];
  if (Array.isArray(e))
    for (const r of e) {
      const i = Se.create(r, t);
      Array.isArray(i) ? n.push(...i) : n.push(i);
    }
  else
    n = [].concat(Se.create(e, t));
  return t && t.expand === !0 && t.nodupes === !0 && (n = [...new Set(n)]), n;
};
Se.parse = (e, t = {}) => Wg(e, t);
Se.stringify = (e, t = {}) => Yo(typeof e == "string" ? Se.parse(e, t) : e, t);
Se.compile = (e, t = {}) => (typeof e == "string" && (e = Se.parse(e, t)), qg(e, t));
Se.expand = (e, t = {}) => {
  typeof e == "string" && (e = Se.parse(e, t));
  let n = Kg(e, t);
  return t.noempty === !0 && (n = n.filter(Boolean)), t.nodupes === !0 && (n = [...new Set(n)]), n;
};
Se.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? Se.compile(e, t) : Se.expand(e, t);
var zg = Se, zt = {};
const Yg = Ee, Ne = "\\\\/", Qo = `[^${Ne}]`, He = "\\.", Qg = "\\+", Vg = "\\?", or = "\\/", Xg = "(?=.)", sc = "[^/]", Di = `(?:${or}|$)`, cc = `(?:^|${or})`, Mi = `${He}{1,2}${Di}`, Zg = `(?!${He})`, Jg = `(?!${cc}${Mi})`, ey = `(?!${He}{0,1}${Di})`, ty = `(?!${Mi})`, ny = `[^.${or}]`, ry = `${sc}*?`, uc = {
  DOT_LITERAL: He,
  PLUS_LITERAL: Qg,
  QMARK_LITERAL: Vg,
  SLASH_LITERAL: or,
  ONE_CHAR: Xg,
  QMARK: sc,
  END_ANCHOR: Di,
  DOTS_SLASH: Mi,
  NO_DOT: Zg,
  NO_DOTS: Jg,
  NO_DOT_SLASH: ey,
  NO_DOTS_SLASH: ty,
  QMARK_NO_DOT: ny,
  STAR: ry,
  START_ANCHOR: cc
}, iy = {
  ...uc,
  SLASH_LITERAL: `[${Ne}]`,
  QMARK: Qo,
  STAR: `${Qo}*?`,
  DOTS_SLASH: `${He}{1,2}(?:[${Ne}]|$)`,
  NO_DOT: `(?!${He})`,
  NO_DOTS: `(?!(?:^|[${Ne}])${He}{1,2}(?:[${Ne}]|$))`,
  NO_DOT_SLASH: `(?!${He}{0,1}(?:[${Ne}]|$))`,
  NO_DOTS_SLASH: `(?!${He}{1,2}(?:[${Ne}]|$))`,
  QMARK_NO_DOT: `[^.${Ne}]`,
  START_ANCHOR: `(?:^|[${Ne}])`,
  END_ANCHOR: `(?:[${Ne}]|$)`
}, oy = {
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
var ar = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: oy,
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
  SEP: Yg.sep,
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
    return e === !0 ? iy : uc;
  }
};
(function(e) {
  const t = Ee, n = process.platform === "win32", {
    REGEX_BACKSLASH: r,
    REGEX_REMOVE_BACKSLASH: i,
    REGEX_SPECIAL_CHARS: a,
    REGEX_SPECIAL_CHARS_GLOBAL: o
  } = ar;
  e.isObject = (s) => s !== null && typeof s == "object" && !Array.isArray(s), e.hasRegexChars = (s) => a.test(s), e.isRegexChar = (s) => s.length === 1 && e.hasRegexChars(s), e.escapeRegex = (s) => s.replace(o, "\\$1"), e.toPosixSlashes = (s) => s.replace(r, "/"), e.removeBackslashes = (s) => s.replace(i, (c) => c === "\\" ? "" : c), e.supportsLookbehinds = () => {
    const s = process.version.slice(1).split(".").map(Number);
    return s.length === 3 && s[0] >= 9 || s[0] === 8 && s[1] >= 10;
  }, e.isWindows = (s) => s && typeof s.windows == "boolean" ? s.windows : n === !0 || t.sep === "\\", e.escapeLast = (s, c, f) => {
    const l = s.lastIndexOf(c, f);
    return l === -1 ? s : s[l - 1] === "\\" ? e.escapeLast(s, c, l - 1) : `${s.slice(0, l)}\\${s.slice(l)}`;
  }, e.removePrefix = (s, c = {}) => {
    let f = s;
    return f.startsWith("./") && (f = f.slice(2), c.prefix = "./"), f;
  }, e.wrapOutput = (s, c = {}, f = {}) => {
    const l = f.contains ? "" : "^", u = f.contains ? "" : "$";
    let p = `${l}(?:${s})${u}`;
    return c.negated === !0 && (p = `(?:^(?!${p}).*$)`), p;
  };
})(zt);
const Vo = zt, {
  CHAR_ASTERISK: Nr,
  /* * */
  CHAR_AT: ay,
  /* @ */
  CHAR_BACKWARD_SLASH: Dt,
  /* \ */
  CHAR_COMMA: sy,
  /* , */
  CHAR_DOT: Pr,
  /* . */
  CHAR_EXCLAMATION_MARK: Lr,
  /* ! */
  CHAR_FORWARD_SLASH: lc,
  /* / */
  CHAR_LEFT_CURLY_BRACE: kr,
  /* { */
  CHAR_LEFT_PARENTHESES: Dr,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET: cy,
  /* [ */
  CHAR_PLUS: uy,
  /* + */
  CHAR_QUESTION_MARK: Xo,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE: ly,
  /* } */
  CHAR_RIGHT_PARENTHESES: Zo,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET: fy
  /* ] */
} = ar, Jo = (e) => e === lc || e === Dt, ea = (e) => {
  e.isPrefix !== !0 && (e.depth = e.isGlobstar ? 1 / 0 : 1);
}, py = (e, t) => {
  const n = t || {}, r = e.length - 1, i = n.parts === !0 || n.scanToEnd === !0, a = [], o = [], s = [];
  let c = e, f = -1, l = 0, u = 0, p = !1, d = !1, h = !1, m = !1, g = !1, b = !1, x = !1, T = !1, _ = !1, C = !1, R = 0, M, S, A = { value: "", depth: 0, isGlob: !1 };
  const O = () => f >= r, v = () => c.charCodeAt(f + 1), D = () => (M = S, c.charCodeAt(++f));
  for (; f < r; ) {
    S = D();
    let F;
    if (S === Dt) {
      x = A.backslashes = !0, S = D(), S === kr && (b = !0);
      continue;
    }
    if (b === !0 || S === kr) {
      for (R++; O() !== !0 && (S = D()); ) {
        if (S === Dt) {
          x = A.backslashes = !0, D();
          continue;
        }
        if (S === kr) {
          R++;
          continue;
        }
        if (b !== !0 && S === Pr && (S = D()) === Pr) {
          if (p = A.isBrace = !0, h = A.isGlob = !0, C = !0, i === !0)
            continue;
          break;
        }
        if (b !== !0 && S === sy) {
          if (p = A.isBrace = !0, h = A.isGlob = !0, C = !0, i === !0)
            continue;
          break;
        }
        if (S === ly && (R--, R === 0)) {
          b = !1, p = A.isBrace = !0, C = !0;
          break;
        }
      }
      if (i === !0)
        continue;
      break;
    }
    if (S === lc) {
      if (a.push(f), o.push(A), A = { value: "", depth: 0, isGlob: !1 }, C === !0) continue;
      if (M === Pr && f === l + 1) {
        l += 2;
        continue;
      }
      u = f + 1;
      continue;
    }
    if (n.noext !== !0 && (S === uy || S === ay || S === Nr || S === Xo || S === Lr) === !0 && v() === Dr) {
      if (h = A.isGlob = !0, m = A.isExtglob = !0, C = !0, S === Lr && f === l && (_ = !0), i === !0) {
        for (; O() !== !0 && (S = D()); ) {
          if (S === Dt) {
            x = A.backslashes = !0, S = D();
            continue;
          }
          if (S === Zo) {
            h = A.isGlob = !0, C = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (S === Nr) {
      if (M === Nr && (g = A.isGlobstar = !0), h = A.isGlob = !0, C = !0, i === !0)
        continue;
      break;
    }
    if (S === Xo) {
      if (h = A.isGlob = !0, C = !0, i === !0)
        continue;
      break;
    }
    if (S === cy) {
      for (; O() !== !0 && (F = D()); ) {
        if (F === Dt) {
          x = A.backslashes = !0, D();
          continue;
        }
        if (F === fy) {
          d = A.isBracket = !0, h = A.isGlob = !0, C = !0;
          break;
        }
      }
      if (i === !0)
        continue;
      break;
    }
    if (n.nonegate !== !0 && S === Lr && f === l) {
      T = A.negated = !0, l++;
      continue;
    }
    if (n.noparen !== !0 && S === Dr) {
      if (h = A.isGlob = !0, i === !0) {
        for (; O() !== !0 && (S = D()); ) {
          if (S === Dr) {
            x = A.backslashes = !0, S = D();
            continue;
          }
          if (S === Zo) {
            C = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (h === !0) {
      if (C = !0, i === !0)
        continue;
      break;
    }
  }
  n.noext === !0 && (m = !1, h = !1);
  let j = c, G = "", w = "";
  l > 0 && (G = c.slice(0, l), c = c.slice(l), u -= l), j && h === !0 && u > 0 ? (j = c.slice(0, u), w = c.slice(u)) : h === !0 ? (j = "", w = c) : j = c, j && j !== "" && j !== "/" && j !== c && Jo(j.charCodeAt(j.length - 1)) && (j = j.slice(0, -1)), n.unescape === !0 && (w && (w = Vo.removeBackslashes(w)), j && x === !0 && (j = Vo.removeBackslashes(j)));
  const E = {
    prefix: G,
    input: e,
    start: l,
    base: j,
    glob: w,
    isBrace: p,
    isBracket: d,
    isGlob: h,
    isExtglob: m,
    isGlobstar: g,
    negated: T,
    negatedExtglob: _
  };
  if (n.tokens === !0 && (E.maxDepth = 0, Jo(S) || o.push(A), E.tokens = o), n.parts === !0 || n.tokens === !0) {
    let F;
    for (let L = 0; L < a.length; L++) {
      const H = F ? F + 1 : l, K = a[L], Y = e.slice(H, K);
      n.tokens && (L === 0 && l !== 0 ? (o[L].isPrefix = !0, o[L].value = G) : o[L].value = Y, ea(o[L]), E.maxDepth += o[L].depth), (L !== 0 || Y !== "") && s.push(Y), F = K;
    }
    if (F && F + 1 < e.length) {
      const L = e.slice(F + 1);
      s.push(L), n.tokens && (o[o.length - 1].value = L, ea(o[o.length - 1]), E.maxDepth += o[o.length - 1].depth);
    }
    E.slashes = a, E.parts = s;
  }
  return E;
};
var dy = py;
const Pn = ar, be = zt, {
  MAX_LENGTH: Ln,
  POSIX_REGEX_SOURCE: hy,
  REGEX_NON_SPECIAL_CHARS: my,
  REGEX_SPECIAL_CHARS_BACKREF: gy,
  REPLACEMENTS: fc
} = Pn, yy = (e, t) => {
  if (typeof t.expandRange == "function")
    return t.expandRange(...e, t);
  e.sort();
  const n = `[${e.join("-")}]`;
  try {
    new RegExp(n);
  } catch {
    return e.map((i) => be.escapeRegex(i)).join("..");
  }
  return n;
}, gt = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, ji = (e, t) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  e = fc[e] || e;
  const n = { ...t }, r = typeof n.maxLength == "number" ? Math.min(Ln, n.maxLength) : Ln;
  let i = e.length;
  if (i > r)
    throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
  const a = { type: "bos", value: "", output: n.prepend || "" }, o = [a], s = n.capture ? "" : "?:", c = be.isWindows(t), f = Pn.globChars(c), l = Pn.extglobChars(f), {
    DOT_LITERAL: u,
    PLUS_LITERAL: p,
    SLASH_LITERAL: d,
    ONE_CHAR: h,
    DOTS_SLASH: m,
    NO_DOT: g,
    NO_DOT_SLASH: b,
    NO_DOTS_SLASH: x,
    QMARK: T,
    QMARK_NO_DOT: _,
    STAR: C,
    START_ANCHOR: R
  } = f, M = (P) => `(${s}(?:(?!${R}${P.dot ? m : u}).)*?)`, S = n.dot ? "" : g, A = n.dot ? T : _;
  let O = n.bash === !0 ? M(n) : C;
  n.capture && (O = `(${O})`), typeof n.noext == "boolean" && (n.noextglob = n.noext);
  const v = {
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
    tokens: o
  };
  e = be.removePrefix(e, v), i = e.length;
  const D = [], j = [], G = [];
  let w = a, E;
  const F = () => v.index === i - 1, L = v.peek = (P = 1) => e[v.index + P], H = v.advance = () => e[++v.index] || "", K = () => e.slice(v.index + 1), Y = (P = "", W = 0) => {
    v.consumed += P, v.index += W;
  }, Z = (P) => {
    v.output += P.output != null ? P.output : P.value, Y(P.value);
  }, Ae = () => {
    let P = 1;
    for (; L() === "!" && (L(2) !== "(" || L(3) === "?"); )
      H(), v.start++, P++;
    return P % 2 === 0 ? !1 : (v.negated = !0, v.start++, !0);
  }, $ = (P) => {
    v[P]++, G.push(P);
  }, k = (P) => {
    v[P]--, G.pop();
  }, N = (P) => {
    if (w.type === "globstar") {
      const W = v.braces > 0 && (P.type === "comma" || P.type === "brace"), I = P.extglob === !0 || D.length && (P.type === "pipe" || P.type === "paren");
      P.type !== "slash" && P.type !== "paren" && !W && !I && (v.output = v.output.slice(0, -w.output.length), w.type = "star", w.value = "*", w.output = O, v.output += w.output);
    }
    if (D.length && P.type !== "paren" && (D[D.length - 1].inner += P.value), (P.value || P.output) && Z(P), w && w.type === "text" && P.type === "text") {
      w.value += P.value, w.output = (w.output || "") + P.value;
      return;
    }
    P.prev = w, o.push(P), w = P;
  }, z = (P, W) => {
    const I = { ...l[W], conditions: 1, inner: "" };
    I.prev = w, I.parens = v.parens, I.output = v.output;
    const U = (n.capture ? "(" : "") + I.open;
    $("parens"), N({ type: P, value: W, output: v.output ? "" : h }), N({ type: "paren", extglob: !0, value: H(), output: U }), D.push(I);
  }, se = (P) => {
    let W = P.close + (n.capture ? ")" : ""), I;
    if (P.type === "negate") {
      let U = O;
      if (P.inner && P.inner.length > 1 && P.inner.includes("/") && (U = M(n)), (U !== O || F() || /^\)+$/.test(K())) && (W = P.close = `)$))${U}`), P.inner.includes("*") && (I = K()) && /^\.[^\\/.]+$/.test(I)) {
        const Q = ji(I, { ...t, fastpaths: !1 }).output;
        W = P.close = `)${Q})${U})`;
      }
      P.prev.type === "bos" && (v.negatedExtglob = !0);
    }
    N({ type: "paren", extglob: !0, value: E, output: W }), k("parens");
  };
  if (n.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
    let P = !1, W = e.replace(gy, (I, U, Q, re, V, Oe) => re === "\\" ? (P = !0, I) : re === "?" ? U ? U + re + (V ? T.repeat(V.length) : "") : Oe === 0 ? A + (V ? T.repeat(V.length) : "") : T.repeat(Q.length) : re === "." ? u.repeat(Q.length) : re === "*" ? U ? U + re + (V ? O : "") : O : U ? I : `\\${I}`);
    return P === !0 && (n.unescape === !0 ? W = W.replace(/\\/g, "") : W = W.replace(/\\+/g, (I) => I.length % 2 === 0 ? "\\\\" : I ? "\\" : "")), W === e && n.contains === !0 ? (v.output = e, v) : (v.output = be.wrapOutput(W, v, t), v);
  }
  for (; !F(); ) {
    if (E = H(), E === "\0")
      continue;
    if (E === "\\") {
      const I = L();
      if (I === "/" && n.bash !== !0 || I === "." || I === ";")
        continue;
      if (!I) {
        E += "\\", N({ type: "text", value: E });
        continue;
      }
      const U = /^\\+/.exec(K());
      let Q = 0;
      if (U && U[0].length > 2 && (Q = U[0].length, v.index += Q, Q % 2 !== 0 && (E += "\\")), n.unescape === !0 ? E = H() : E += H(), v.brackets === 0) {
        N({ type: "text", value: E });
        continue;
      }
    }
    if (v.brackets > 0 && (E !== "]" || w.value === "[" || w.value === "[^")) {
      if (n.posix !== !1 && E === ":") {
        const I = w.value.slice(1);
        if (I.includes("[") && (w.posix = !0, I.includes(":"))) {
          const U = w.value.lastIndexOf("["), Q = w.value.slice(0, U), re = w.value.slice(U + 2), V = hy[re];
          if (V) {
            w.value = Q + V, v.backtrack = !0, H(), !a.output && o.indexOf(w) === 1 && (a.output = h);
            continue;
          }
        }
      }
      (E === "[" && L() !== ":" || E === "-" && L() === "]") && (E = `\\${E}`), E === "]" && (w.value === "[" || w.value === "[^") && (E = `\\${E}`), n.posix === !0 && E === "!" && w.value === "[" && (E = "^"), w.value += E, Z({ value: E });
      continue;
    }
    if (v.quotes === 1 && E !== '"') {
      E = be.escapeRegex(E), w.value += E, Z({ value: E });
      continue;
    }
    if (E === '"') {
      v.quotes = v.quotes === 1 ? 0 : 1, n.keepQuotes === !0 && N({ type: "text", value: E });
      continue;
    }
    if (E === "(") {
      $("parens"), N({ type: "paren", value: E });
      continue;
    }
    if (E === ")") {
      if (v.parens === 0 && n.strictBrackets === !0)
        throw new SyntaxError(gt("opening", "("));
      const I = D[D.length - 1];
      if (I && v.parens === I.parens + 1) {
        se(D.pop());
        continue;
      }
      N({ type: "paren", value: E, output: v.parens ? ")" : "\\)" }), k("parens");
      continue;
    }
    if (E === "[") {
      if (n.nobracket === !0 || !K().includes("]")) {
        if (n.nobracket !== !0 && n.strictBrackets === !0)
          throw new SyntaxError(gt("closing", "]"));
        E = `\\${E}`;
      } else
        $("brackets");
      N({ type: "bracket", value: E });
      continue;
    }
    if (E === "]") {
      if (n.nobracket === !0 || w && w.type === "bracket" && w.value.length === 1) {
        N({ type: "text", value: E, output: `\\${E}` });
        continue;
      }
      if (v.brackets === 0) {
        if (n.strictBrackets === !0)
          throw new SyntaxError(gt("opening", "["));
        N({ type: "text", value: E, output: `\\${E}` });
        continue;
      }
      k("brackets");
      const I = w.value.slice(1);
      if (w.posix !== !0 && I[0] === "^" && !I.includes("/") && (E = `/${E}`), w.value += E, Z({ value: E }), n.literalBrackets === !1 || be.hasRegexChars(I))
        continue;
      const U = be.escapeRegex(w.value);
      if (v.output = v.output.slice(0, -w.value.length), n.literalBrackets === !0) {
        v.output += U, w.value = U;
        continue;
      }
      w.value = `(${s}${U}|${w.value})`, v.output += w.value;
      continue;
    }
    if (E === "{" && n.nobrace !== !0) {
      $("braces");
      const I = {
        type: "brace",
        value: E,
        output: "(",
        outputIndex: v.output.length,
        tokensIndex: v.tokens.length
      };
      j.push(I), N(I);
      continue;
    }
    if (E === "}") {
      const I = j[j.length - 1];
      if (n.nobrace === !0 || !I) {
        N({ type: "text", value: E, output: E });
        continue;
      }
      let U = ")";
      if (I.dots === !0) {
        const Q = o.slice(), re = [];
        for (let V = Q.length - 1; V >= 0 && (o.pop(), Q[V].type !== "brace"); V--)
          Q[V].type !== "dots" && re.unshift(Q[V].value);
        U = yy(re, n), v.backtrack = !0;
      }
      if (I.comma !== !0 && I.dots !== !0) {
        const Q = v.output.slice(0, I.outputIndex), re = v.tokens.slice(I.tokensIndex);
        I.value = I.output = "\\{", E = U = "\\}", v.output = Q;
        for (const V of re)
          v.output += V.output || V.value;
      }
      N({ type: "brace", value: E, output: U }), k("braces"), j.pop();
      continue;
    }
    if (E === "|") {
      D.length > 0 && D[D.length - 1].conditions++, N({ type: "text", value: E });
      continue;
    }
    if (E === ",") {
      let I = E;
      const U = j[j.length - 1];
      U && G[G.length - 1] === "braces" && (U.comma = !0, I = "|"), N({ type: "comma", value: E, output: I });
      continue;
    }
    if (E === "/") {
      if (w.type === "dot" && v.index === v.start + 1) {
        v.start = v.index + 1, v.consumed = "", v.output = "", o.pop(), w = a;
        continue;
      }
      N({ type: "slash", value: E, output: d });
      continue;
    }
    if (E === ".") {
      if (v.braces > 0 && w.type === "dot") {
        w.value === "." && (w.output = u);
        const I = j[j.length - 1];
        w.type = "dots", w.output += E, w.value += E, I.dots = !0;
        continue;
      }
      if (v.braces + v.parens === 0 && w.type !== "bos" && w.type !== "slash") {
        N({ type: "text", value: E, output: u });
        continue;
      }
      N({ type: "dot", value: E, output: u });
      continue;
    }
    if (E === "?") {
      if (!(w && w.value === "(") && n.noextglob !== !0 && L() === "(" && L(2) !== "?") {
        z("qmark", E);
        continue;
      }
      if (w && w.type === "paren") {
        const U = L();
        let Q = E;
        if (U === "<" && !be.supportsLookbehinds())
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        (w.value === "(" && !/[!=<:]/.test(U) || U === "<" && !/<([!=]|\w+>)/.test(K())) && (Q = `\\${E}`), N({ type: "text", value: E, output: Q });
        continue;
      }
      if (n.dot !== !0 && (w.type === "slash" || w.type === "bos")) {
        N({ type: "qmark", value: E, output: _ });
        continue;
      }
      N({ type: "qmark", value: E, output: T });
      continue;
    }
    if (E === "!") {
      if (n.noextglob !== !0 && L() === "(" && (L(2) !== "?" || !/[!=<:]/.test(L(3)))) {
        z("negate", E);
        continue;
      }
      if (n.nonegate !== !0 && v.index === 0) {
        Ae();
        continue;
      }
    }
    if (E === "+") {
      if (n.noextglob !== !0 && L() === "(" && L(2) !== "?") {
        z("plus", E);
        continue;
      }
      if (w && w.value === "(" || n.regex === !1) {
        N({ type: "plus", value: E, output: p });
        continue;
      }
      if (w && (w.type === "bracket" || w.type === "paren" || w.type === "brace") || v.parens > 0) {
        N({ type: "plus", value: E });
        continue;
      }
      N({ type: "plus", value: p });
      continue;
    }
    if (E === "@") {
      if (n.noextglob !== !0 && L() === "(" && L(2) !== "?") {
        N({ type: "at", extglob: !0, value: E, output: "" });
        continue;
      }
      N({ type: "text", value: E });
      continue;
    }
    if (E !== "*") {
      (E === "$" || E === "^") && (E = `\\${E}`);
      const I = my.exec(K());
      I && (E += I[0], v.index += I[0].length), N({ type: "text", value: E });
      continue;
    }
    if (w && (w.type === "globstar" || w.star === !0)) {
      w.type = "star", w.star = !0, w.value += E, w.output = O, v.backtrack = !0, v.globstar = !0, Y(E);
      continue;
    }
    let P = K();
    if (n.noextglob !== !0 && /^\([^?]/.test(P)) {
      z("star", E);
      continue;
    }
    if (w.type === "star") {
      if (n.noglobstar === !0) {
        Y(E);
        continue;
      }
      const I = w.prev, U = I.prev, Q = I.type === "slash" || I.type === "bos", re = U && (U.type === "star" || U.type === "globstar");
      if (n.bash === !0 && (!Q || P[0] && P[0] !== "/")) {
        N({ type: "star", value: E, output: "" });
        continue;
      }
      const V = v.braces > 0 && (I.type === "comma" || I.type === "brace"), Oe = D.length && (I.type === "pipe" || I.type === "paren");
      if (!Q && I.type !== "paren" && !V && !Oe) {
        N({ type: "star", value: E, output: "" });
        continue;
      }
      for (; P.slice(0, 3) === "/**"; ) {
        const je = e[v.index + 4];
        if (je && je !== "/")
          break;
        P = P.slice(3), Y("/**", 3);
      }
      if (I.type === "bos" && F()) {
        w.type = "globstar", w.value += E, w.output = M(n), v.output = w.output, v.globstar = !0, Y(E);
        continue;
      }
      if (I.type === "slash" && I.prev.type !== "bos" && !re && F()) {
        v.output = v.output.slice(0, -(I.output + w.output).length), I.output = `(?:${I.output}`, w.type = "globstar", w.output = M(n) + (n.strictSlashes ? ")" : "|$)"), w.value += E, v.globstar = !0, v.output += I.output + w.output, Y(E);
        continue;
      }
      if (I.type === "slash" && I.prev.type !== "bos" && P[0] === "/") {
        const je = P[1] !== void 0 ? "|$" : "";
        v.output = v.output.slice(0, -(I.output + w.output).length), I.output = `(?:${I.output}`, w.type = "globstar", w.output = `${M(n)}${d}|${d}${je})`, w.value += E, v.output += I.output + w.output, v.globstar = !0, Y(E + H()), N({ type: "slash", value: "/", output: "" });
        continue;
      }
      if (I.type === "bos" && P[0] === "/") {
        w.type = "globstar", w.value += E, w.output = `(?:^|${d}|${M(n)}${d})`, v.output = w.output, v.globstar = !0, Y(E + H()), N({ type: "slash", value: "/", output: "" });
        continue;
      }
      v.output = v.output.slice(0, -w.output.length), w.type = "globstar", w.output = M(n), w.value += E, v.output += w.output, v.globstar = !0, Y(E);
      continue;
    }
    const W = { type: "star", value: E, output: O };
    if (n.bash === !0) {
      W.output = ".*?", (w.type === "bos" || w.type === "slash") && (W.output = S + W.output), N(W);
      continue;
    }
    if (w && (w.type === "bracket" || w.type === "paren") && n.regex === !0) {
      W.output = E, N(W);
      continue;
    }
    (v.index === v.start || w.type === "slash" || w.type === "dot") && (w.type === "dot" ? (v.output += b, w.output += b) : n.dot === !0 ? (v.output += x, w.output += x) : (v.output += S, w.output += S), L() !== "*" && (v.output += h, w.output += h)), N(W);
  }
  for (; v.brackets > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(gt("closing", "]"));
    v.output = be.escapeLast(v.output, "["), k("brackets");
  }
  for (; v.parens > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(gt("closing", ")"));
    v.output = be.escapeLast(v.output, "("), k("parens");
  }
  for (; v.braces > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(gt("closing", "}"));
    v.output = be.escapeLast(v.output, "{"), k("braces");
  }
  if (n.strictSlashes !== !0 && (w.type === "star" || w.type === "bracket") && N({ type: "maybe_slash", value: "", output: `${d}?` }), v.backtrack === !0) {
    v.output = "";
    for (const P of v.tokens)
      v.output += P.output != null ? P.output : P.value, P.suffix && (v.output += P.suffix);
  }
  return v;
};
ji.fastpaths = (e, t) => {
  const n = { ...t }, r = typeof n.maxLength == "number" ? Math.min(Ln, n.maxLength) : Ln, i = e.length;
  if (i > r)
    throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
  e = fc[e] || e;
  const a = be.isWindows(t), {
    DOT_LITERAL: o,
    SLASH_LITERAL: s,
    ONE_CHAR: c,
    DOTS_SLASH: f,
    NO_DOT: l,
    NO_DOTS: u,
    NO_DOTS_SLASH: p,
    STAR: d,
    START_ANCHOR: h
  } = Pn.globChars(a), m = n.dot ? u : l, g = n.dot ? p : l, b = n.capture ? "" : "?:", x = { negated: !1, prefix: "" };
  let T = n.bash === !0 ? ".*?" : d;
  n.capture && (T = `(${T})`);
  const _ = (S) => S.noglobstar === !0 ? T : `(${b}(?:(?!${h}${S.dot ? f : o}).)*?)`, C = (S) => {
    switch (S) {
      case "*":
        return `${m}${c}${T}`;
      case ".*":
        return `${o}${c}${T}`;
      case "*.*":
        return `${m}${T}${o}${c}${T}`;
      case "*/*":
        return `${m}${T}${s}${c}${g}${T}`;
      case "**":
        return m + _(n);
      case "**/*":
        return `(?:${m}${_(n)}${s})?${g}${c}${T}`;
      case "**/*.*":
        return `(?:${m}${_(n)}${s})?${g}${T}${o}${c}${T}`;
      case "**/.*":
        return `(?:${m}${_(n)}${s})?${o}${c}${T}`;
      default: {
        const A = /^(.*?)\.(\w+)$/.exec(S);
        if (!A) return;
        const O = C(A[1]);
        return O ? O + o + A[2] : void 0;
      }
    }
  }, R = be.removePrefix(e, x);
  let M = C(R);
  return M && n.strictSlashes !== !0 && (M += `${s}?`), M;
};
var vy = ji;
const wy = Ee, Ey = dy, ai = vy, Hi = zt, by = ar, xy = (e) => e && typeof e == "object" && !Array.isArray(e), ie = (e, t, n = !1) => {
  if (Array.isArray(e)) {
    const l = e.map((p) => ie(p, t, n));
    return (p) => {
      for (const d of l) {
        const h = d(p);
        if (h) return h;
      }
      return !1;
    };
  }
  const r = xy(e) && e.tokens && e.input;
  if (e === "" || typeof e != "string" && !r)
    throw new TypeError("Expected pattern to be a non-empty string");
  const i = t || {}, a = Hi.isWindows(t), o = r ? ie.compileRe(e, t) : ie.makeRe(e, t, !1, !0), s = o.state;
  delete o.state;
  let c = () => !1;
  if (i.ignore) {
    const l = { ...t, ignore: null, onMatch: null, onResult: null };
    c = ie(i.ignore, l, n);
  }
  const f = (l, u = !1) => {
    const { isMatch: p, match: d, output: h } = ie.test(l, o, t, { glob: e, posix: a }), m = { glob: e, state: s, regex: o, posix: a, input: l, output: h, match: d, isMatch: p };
    return typeof i.onResult == "function" && i.onResult(m), p === !1 ? (m.isMatch = !1, u ? m : !1) : c(l) ? (typeof i.onIgnore == "function" && i.onIgnore(m), m.isMatch = !1, u ? m : !1) : (typeof i.onMatch == "function" && i.onMatch(m), u ? m : !0);
  };
  return n && (f.state = s), f;
};
ie.test = (e, t, n, { glob: r, posix: i } = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected input to be a string");
  if (e === "")
    return { isMatch: !1, output: "" };
  const a = n || {}, o = a.format || (i ? Hi.toPosixSlashes : null);
  let s = e === r, c = s && o ? o(e) : e;
  return s === !1 && (c = o ? o(e) : e, s = c === r), (s === !1 || a.capture === !0) && (a.matchBase === !0 || a.basename === !0 ? s = ie.matchBase(e, t, n, i) : s = t.exec(c)), { isMatch: !!s, match: s, output: c };
};
ie.matchBase = (e, t, n, r = Hi.isWindows(n)) => (t instanceof RegExp ? t : ie.makeRe(t, n)).test(wy.basename(e));
ie.isMatch = (e, t, n) => ie(t, n)(e);
ie.parse = (e, t) => Array.isArray(e) ? e.map((n) => ie.parse(n, t)) : ai(e, { ...t, fastpaths: !1 });
ie.scan = (e, t) => Ey(e, t);
ie.compileRe = (e, t, n = !1, r = !1) => {
  if (n === !0)
    return e.output;
  const i = t || {}, a = i.contains ? "" : "^", o = i.contains ? "" : "$";
  let s = `${a}(?:${e.output})${o}`;
  e && e.negated === !0 && (s = `^(?!${s}).*$`);
  const c = ie.toRegex(s, t);
  return r === !0 && (c.state = e), c;
};
ie.makeRe = (e, t = {}, n = !1, r = !1) => {
  if (!e || typeof e != "string")
    throw new TypeError("Expected a non-empty string");
  let i = { negated: !1, fastpaths: !0 };
  return t.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (i.output = ai.fastpaths(e, t)), i.output || (i = ai(e, t)), ie.compileRe(i, t, n, r);
};
ie.toRegex = (e, t) => {
  try {
    const n = t || {};
    return new RegExp(e, n.flags || (n.nocase ? "i" : ""));
  } catch (n) {
    if (t && t.debug === !0) throw n;
    return /$^/;
  }
};
ie.constants = by;
var Sy = ie, Ay = Sy;
const pc = ut, dc = zg, Me = Ay, si = zt, ta = (e) => e === "" || e === "./", hc = (e) => {
  const t = e.indexOf("{");
  return t > -1 && e.indexOf("}", t) > -1;
}, X = (e, t, n) => {
  t = [].concat(t), e = [].concat(e);
  let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = 0, s = (l) => {
    a.add(l.output), n && n.onResult && n.onResult(l);
  };
  for (let l = 0; l < t.length; l++) {
    let u = Me(String(t[l]), { ...n, onResult: s }, !0), p = u.state.negated || u.state.negatedExtglob;
    p && o++;
    for (let d of e) {
      let h = u(d, !0);
      (p ? !h.isMatch : h.isMatch) && (p ? r.add(h.output) : (r.delete(h.output), i.add(h.output)));
    }
  }
  let f = (o === t.length ? [...a] : [...i]).filter((l) => !r.has(l));
  if (n && f.length === 0) {
    if (n.failglob === !0)
      throw new Error(`No matches found for "${t.join(", ")}"`);
    if (n.nonull === !0 || n.nullglob === !0)
      return n.unescape ? t.map((l) => l.replace(/\\/g, "")) : t;
  }
  return f;
};
X.match = X;
X.matcher = (e, t) => Me(e, t);
X.isMatch = (e, t, n) => Me(t, n)(e);
X.any = X.isMatch;
X.not = (e, t, n = {}) => {
  t = [].concat(t).map(String);
  let r = /* @__PURE__ */ new Set(), i = [], a = (s) => {
    n.onResult && n.onResult(s), i.push(s.output);
  }, o = new Set(X(e, t, { ...n, onResult: a }));
  for (let s of i)
    o.has(s) || r.add(s);
  return [...r];
};
X.contains = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${pc.inspect(e)}"`);
  if (Array.isArray(t))
    return t.some((r) => X.contains(e, r, n));
  if (typeof t == "string") {
    if (ta(e) || ta(t))
      return !1;
    if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t))
      return !0;
  }
  return X.isMatch(e, t, { ...n, contains: !0 });
};
X.matchKeys = (e, t, n) => {
  if (!si.isObject(e))
    throw new TypeError("Expected the first argument to be an object");
  let r = X(Object.keys(e), t, n), i = {};
  for (let a of r) i[a] = e[a];
  return i;
};
X.some = (e, t, n) => {
  let r = [].concat(e);
  for (let i of [].concat(t)) {
    let a = Me(String(i), n);
    if (r.some((o) => a(o)))
      return !0;
  }
  return !1;
};
X.every = (e, t, n) => {
  let r = [].concat(e);
  for (let i of [].concat(t)) {
    let a = Me(String(i), n);
    if (!r.every((o) => a(o)))
      return !1;
  }
  return !0;
};
X.all = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${pc.inspect(e)}"`);
  return [].concat(t).every((r) => Me(r, n)(e));
};
X.capture = (e, t, n) => {
  let r = si.isWindows(n), a = Me.makeRe(String(e), { ...n, capture: !0 }).exec(r ? si.toPosixSlashes(t) : t);
  if (a)
    return a.slice(1).map((o) => o === void 0 ? "" : o);
};
X.makeRe = (...e) => Me.makeRe(...e);
X.scan = (...e) => Me.scan(...e);
X.parse = (e, t) => {
  let n = [];
  for (let r of [].concat(e || []))
    for (let i of dc(String(r), t))
      n.push(Me.parse(i, t));
  return n;
};
X.braces = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return t && t.nobrace === !0 || !hc(e) ? [e] : dc(e, t);
};
X.braceExpand = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return X.braces(e, { ...t, expand: !0 });
};
X.hasBraces = hc;
var _y = X, Bi = ve && ve.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.readPackageJSON = xe.extractWorkspaces = xe.isMatchWorkspaces = xe.checkWorkspaces = xe.findWorkspaceRoot = void 0;
const kn = Bi(Ee), Ty = Bi(og), na = Ve, Cy = Bi(_y);
function Ge(e) {
  e || (e = process.cwd());
  let t = Ty.default.sync(e);
  if (!t)
    return null;
  e = kn.default.normalize(t);
  let n = null, r = e;
  do {
    const i = cr(r);
    sr(i);
    let { done: a, found: o } = mc(r, e);
    if (a)
      return o;
    n = r, r = kn.default.dirname(r);
  } while (r !== n);
  return null;
}
xe.findWorkspaceRoot = Ge;
function mc(e, t) {
  const n = cr(e), r = sr(n);
  let i = !1, a, o;
  return r && (i = !0, o = kn.default.relative(e, t), o === "" || Ui(o, r) ? a = e : a = null), {
    done: i,
    found: a,
    relativePath: o
  };
}
xe.checkWorkspaces = mc;
function Ui(e, t) {
  return Cy.default([e], t).length > 0;
}
xe.isMatchWorkspaces = Ui;
function sr(e) {
  const t = (e || {}).workspaces;
  return t && t.packages || (Array.isArray(t) ? t : null);
}
xe.extractWorkspaces = sr;
function cr(e) {
  const t = kn.default.join(e, "package.json");
  return na.existsSync(t) ? JSON.parse(na.readFileSync(t, "utf8")) : null;
}
xe.readPackageJSON = cr;
Ge.findWorkspaceRoot = Ge;
Ge.readPackageJSON = cr;
Ge.extractWorkspaces = sr;
Ge.isMatchWorkspaces = Ui;
Ge.default = Ge;
xe.default = Ge;
const Ry = xe;
Ry.findWorkspaceRoot;
var Fy = { exports: {} }, Gi = { exports: {} };
class $y {
  /// value;
  /// next;
  constructor(t) {
    this.value = t, this.next = void 0;
  }
}
let Iy = class {
  // TODO: Use private class fields when targeting Node.js 12.
  // #_head;
  // #_tail;
  // #_size;
  constructor() {
    this.clear();
  }
  enqueue(t) {
    const n = new $y(t);
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
var Oy = Iy;
const Ny = Oy, Py = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  const t = new Ny();
  let n = 0;
  const r = () => {
    n--, t.size > 0 && t.dequeue()();
  }, i = async (s, c, ...f) => {
    n++;
    const l = (async () => s(...f))();
    c(l);
    try {
      await l;
    } catch {
    }
    r();
  }, a = (s, c, ...f) => {
    t.enqueue(i.bind(null, s, c, ...f)), (async () => (await Promise.resolve(), n < e && t.size > 0 && t.dequeue()()))();
  }, o = (s, ...c) => new Promise((f) => {
    a(s, f, ...c);
  });
  return Object.defineProperties(o, {
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
  }), o;
};
var Ly = Py;
const ra = Ly;
class gc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const ky = async (e, t) => t(await e), Dy = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new gc(t[0]);
  return !1;
}, My = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const r = ra(n.concurrency), i = [...e].map((o) => [o, r(ky, o, t)]), a = ra(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(i.map((o) => a(Dy, o)));
  } catch (o) {
    if (o instanceof gc)
      return o.value;
    throw o;
  }
};
var jy = My;
const yc = Ee, Dn = Ve, { promisify: vc } = ut, Hy = jy, By = vc(Dn.stat), Uy = vc(Dn.lstat), wc = {
  directory: "isDirectory",
  file: "isFile"
};
function Ec({ type: e }) {
  if (!(e in wc))
    throw new Error(`Invalid type specified: ${e}`);
}
const bc = (e, t) => e === void 0 || t[wc[e]]();
Gi.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, Ec(t);
  const n = t.allowSymlinks ? By : Uy;
  return Hy(e, async (r) => {
    try {
      const i = await n(yc.resolve(t.cwd, r));
      return bc(t.type, i);
    } catch {
      return !1;
    }
  }, t);
};
Gi.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, Ec(t);
  const n = t.allowSymlinks ? Dn.statSync : Dn.lstatSync;
  for (const r of e)
    try {
      const i = n(yc.resolve(t.cwd, r));
      if (bc(t.type, i))
        return r;
    } catch {
    }
};
var Gy = Gi.exports;
(function(e) {
  const t = Ee, n = Gy, r = Xs, i = Symbol("findUp.stop");
  e.exports = async (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), l = async (u) => {
      if (typeof a != "function")
        return n(f, u);
      const p = await a(u.cwd);
      return typeof p == "string" ? n([p], u) : p;
    };
    for (; ; ) {
      const u = await l({ ...o, cwd: s });
      if (u === i)
        return;
      if (u)
        return t.resolve(s, u);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), l = (u) => {
      if (typeof a != "function")
        return n.sync(f, u);
      const p = a(u.cwd);
      return typeof p == "string" ? n.sync([p], u) : p;
    };
    for (; ; ) {
      const u = l({ ...o, cwd: s });
      if (u === i)
        return;
      if (u)
        return t.resolve(s, u);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = r, e.exports.sync.exists = r.sync, e.exports.stop = i;
})(Fy);
var xc = { exports: {} }, qe = Nu, qy = process.cwd, dn = null, Ky = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return dn || (dn = qy.call(process)), dn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var ia = process.chdir;
  process.chdir = function(e) {
    dn = null, ia.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ia);
}
var Wy = zy;
function zy(e) {
  qe.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, p, d) {
    d && process.nextTick(d);
  }, e.lchownSync = function() {
  }), Ky === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(p, d, h) {
      var m = Date.now(), g = 0;
      l(p, d, function b(x) {
        if (x && (x.code === "EACCES" || x.code === "EPERM" || x.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(d, function(T, _) {
              T && T.code === "ENOENT" ? l(p, d, b) : h(x);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        h && h(x);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(p, d, h, m, g, b) {
      var x;
      if (b && typeof b == "function") {
        var T = 0;
        x = function(_, C, R) {
          if (_ && _.code === "EAGAIN" && T < 10)
            return T++, l.call(e, p, d, h, m, g, x);
          b.apply(this, arguments);
        };
      }
      return l.call(e, p, d, h, m, g, x);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, p, d, h, m) {
      for (var g = 0; ; )
        try {
          return l.call(e, u, p, d, h, m);
        } catch (b) {
          if (b.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw b;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, p, d) {
      l.open(
        u,
        qe.O_WRONLY | qe.O_SYMLINK,
        p,
        function(h, m) {
          if (h) {
            d && d(h);
            return;
          }
          l.fchmod(m, p, function(g) {
            l.close(m, function(b) {
              d && d(g || b);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, p) {
      var d = l.openSync(u, qe.O_WRONLY | qe.O_SYMLINK, p), h = !0, m;
      try {
        m = l.fchmodSync(d, p), h = !1;
      } finally {
        if (h)
          try {
            l.closeSync(d);
          } catch {
          }
        else
          l.closeSync(d);
      }
      return m;
    };
  }
  function n(l) {
    qe.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, p, d, h) {
      l.open(u, qe.O_SYMLINK, function(m, g) {
        if (m) {
          h && h(m);
          return;
        }
        l.futimes(g, p, d, function(b) {
          l.close(g, function(x) {
            h && h(b || x);
          });
        });
      });
    }, l.lutimesSync = function(u, p, d) {
      var h = l.openSync(u, qe.O_SYMLINK), m, g = !0;
      try {
        m = l.futimesSync(h, p, d), g = !1;
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
    }) : l.futimes && (l.lutimes = function(u, p, d, h) {
      h && process.nextTick(h);
    }, l.lutimesSync = function() {
    });
  }
  function r(l) {
    return l && function(u, p, d) {
      return l.call(e, u, p, function(h) {
        f(h) && (h = null), d && d.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, p) {
      try {
        return l.call(e, u, p);
      } catch (d) {
        if (!f(d)) throw d;
      }
    };
  }
  function a(l) {
    return l && function(u, p, d, h) {
      return l.call(e, u, p, d, function(m) {
        f(m) && (m = null), h && h.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(u, p, d) {
      try {
        return l.call(e, u, p, d);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function s(l) {
    return l && function(u, p, d) {
      typeof p == "function" && (d = p, p = null);
      function h(m, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), d && d.apply(this, arguments);
      }
      return p ? l.call(e, u, p, h) : l.call(e, u, h);
    };
  }
  function c(l) {
    return l && function(u, p) {
      var d = p ? l.call(e, u, p) : l.call(e, u);
      return d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)), d;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var oa = Wn.Stream, Yy = Qy;
function Qy(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    oa.call(this);
    var a = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
      var f = o[s];
      this[f] = i[f];
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
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        a.emit("error", l), a.readable = !1;
        return;
      }
      a.fd = u, a.emit("open", u), a._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    oa.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var c = a[o];
      this[c] = i[c];
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
var Vy = Zy, Xy = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Zy(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Xy(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var ee = Ve, Jy = Wy, ev = Yy, tv = Vy, on = ut, le, Mn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (le = Symbol.for("graceful-fs.queue"), Mn = Symbol.for("graceful-fs.previous")) : (le = "___graceful-fs.queue", Mn = "___graceful-fs.previous");
function nv() {
}
function Sc(e, t) {
  Object.defineProperty(e, le, {
    get: function() {
      return t;
    }
  });
}
var it = nv;
on.debuglog ? it = on.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (it = function() {
  var e = on.format.apply(on, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ee[le]) {
  var rv = ve[le] || [];
  Sc(ee, rv), ee.close = function(e) {
    function t(n, r) {
      return e.call(ee, n, function(i) {
        i || aa(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Mn, {
      value: e
    }), t;
  }(ee.close), ee.closeSync = function(e) {
    function t(n) {
      e.apply(ee, arguments), aa();
    }
    return Object.defineProperty(t, Mn, {
      value: e
    }), t;
  }(ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    it(ee[le]), La.equal(ee[le].length, 0);
  });
}
ve[le] || Sc(ve, ee[le]);
var Ac = qi(tv(ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ee.__patched && (Ac = qi(ee), ee.__patched = !0);
function qi(e) {
  Jy(e), e.gracefulify = qi, e.createReadStream = C, e.createWriteStream = R;
  var t = e.readFile;
  e.readFile = n;
  function n(A, O, v) {
    return typeof O == "function" && (v = O, O = null), D(A, O, v);
    function D(j, G, w, E) {
      return t(j, G, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? yt([D, [j, G, w], F, E || Date.now(), Date.now()]) : typeof w == "function" && w.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(A, O, v, D) {
    return typeof v == "function" && (D = v, v = null), j(A, O, v, D);
    function j(G, w, E, F, L) {
      return r(G, w, E, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? yt([j, [G, w, E, F], H, L || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(A, O, v, D) {
    return typeof v == "function" && (D = v, v = null), j(A, O, v, D);
    function j(G, w, E, F, L) {
      return a(G, w, E, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? yt([j, [G, w, E, F], H, L || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(A, O, v, D) {
    return typeof v == "function" && (D = v, v = 0), j(A, O, v, D);
    function j(G, w, E, F, L) {
      return s(G, w, E, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? yt([j, [G, w, E, F], H, L || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(A, O, v) {
    typeof O == "function" && (v = O, O = null);
    var D = l.test(process.version) ? function(w, E, F, L) {
      return f(w, j(
        w,
        E,
        F,
        L
      ));
    } : function(w, E, F, L) {
      return f(w, E, j(
        w,
        E,
        F,
        L
      ));
    };
    return D(A, O, v);
    function j(G, w, E, F) {
      return function(L, H) {
        L && (L.code === "EMFILE" || L.code === "ENFILE") ? yt([
          D,
          [G, w, E],
          L,
          F || Date.now(),
          Date.now()
        ]) : (H && H.sort && H.sort(), typeof E == "function" && E.call(this, L, H));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = ev(e);
    b = p.ReadStream, T = p.WriteStream;
  }
  var d = e.ReadStream;
  d && (b.prototype = Object.create(d.prototype), b.prototype.open = x);
  var h = e.WriteStream;
  h && (T.prototype = Object.create(h.prototype), T.prototype.open = _), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return b;
    },
    set: function(A) {
      b = A;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(A) {
      T = A;
    },
    enumerable: !0,
    configurable: !0
  });
  var m = b;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return m;
    },
    set: function(A) {
      m = A;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(A) {
      g = A;
    },
    enumerable: !0,
    configurable: !0
  });
  function b(A, O) {
    return this instanceof b ? (d.apply(this, arguments), this) : b.apply(Object.create(b.prototype), arguments);
  }
  function x() {
    var A = this;
    S(A.path, A.flags, A.mode, function(O, v) {
      O ? (A.autoClose && A.destroy(), A.emit("error", O)) : (A.fd = v, A.emit("open", v), A.read());
    });
  }
  function T(A, O) {
    return this instanceof T ? (h.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function _() {
    var A = this;
    S(A.path, A.flags, A.mode, function(O, v) {
      O ? (A.destroy(), A.emit("error", O)) : (A.fd = v, A.emit("open", v));
    });
  }
  function C(A, O) {
    return new e.ReadStream(A, O);
  }
  function R(A, O) {
    return new e.WriteStream(A, O);
  }
  var M = e.open;
  e.open = S;
  function S(A, O, v, D) {
    return typeof v == "function" && (D = v, v = null), j(A, O, v, D);
    function j(G, w, E, F, L) {
      return M(G, w, E, function(H, K) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? yt([j, [G, w, E, F], H, L || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  return e;
}
function yt(e) {
  it("ENQUEUE", e[0].name, e[1]), ee[le].push(e), Ki();
}
var an;
function aa() {
  for (var e = Date.now(), t = 0; t < ee[le].length; ++t)
    ee[le][t].length > 2 && (ee[le][t][3] = e, ee[le][t][4] = e);
  Ki();
}
function Ki() {
  if (clearTimeout(an), an = void 0, ee[le].length !== 0) {
    var e = ee[le].shift(), t = e[0], n = e[1], r = e[2], i = e[3], a = e[4];
    if (i === void 0)
      it("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      it("TIMEOUT", t.name, n);
      var o = n.pop();
      typeof o == "function" && o.call(null, r);
    } else {
      var s = Date.now() - a, c = Math.max(a - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (it("RETRY", t.name, n), t.apply(null, n.concat([i]))) : ee[le].push(e);
    }
    an === void 0 && (an = setTimeout(Ki, 0));
  }
}
const sa = (e, t) => function(...n) {
  const r = t.promiseModule;
  return new r((i, a) => {
    t.multiArgs ? n.push((...o) => {
      t.errorFirst ? o[0] ? a(o) : (o.shift(), i(o)) : i(o);
    }) : t.errorFirst ? n.push((o, s) => {
      o ? a(o) : i(s);
    }) : n.push(i), e.apply(this, n);
  });
};
var iv = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const n = typeof e;
  if (!(e !== null && (n === "object" || n === "function")))
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : n}\``);
  const r = (a) => {
    const o = (s) => typeof s == "string" ? a === s : s.test(a);
    return t.include ? t.include.some(o) : !t.exclude.some(o);
  };
  let i;
  n === "function" ? i = function(...a) {
    return t.excludeMain ? e(...a) : sa(e, t).apply(this, a);
  } : i = Object.create(Object.getPrototypeOf(e));
  for (const a in e) {
    const o = e[a];
    i[a] = typeof o == "function" && r(a) ? sa(o, t) : o;
  }
  return i;
}, ov = (e) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string, got " + typeof e);
  return e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}, ne = {}, Yt = {}, Ce = {};
function _c(e) {
  return typeof e > "u" || e === null;
}
function av(e) {
  return typeof e == "object" && e !== null;
}
function sv(e) {
  return Array.isArray(e) ? e : _c(e) ? [] : [e];
}
function cv(e, t) {
  var n, r, i, a;
  if (t)
    for (a = Object.keys(t), n = 0, r = a.length; n < r; n += 1)
      i = a[n], e[i] = t[i];
  return e;
}
function uv(e, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e;
  return n;
}
function lv(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Ce.isNothing = _c;
Ce.isObject = av;
Ce.toArray = sv;
Ce.repeat = uv;
Ce.isNegativeZero = lv;
Ce.extend = cv;
function Bt(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Bt.prototype = Object.create(Error.prototype);
Bt.prototype.constructor = Bt;
Bt.prototype.toString = function(t) {
  var n = this.name + ": ";
  return n += this.reason || "(unknown reason)", !t && this.mark && (n += " " + this.mark.toString()), n;
};
var Qt = Bt, ca = Ce;
function Wi(e, t, n, r, i) {
  this.name = e, this.buffer = t, this.position = n, this.line = r, this.column = i;
}
Wi.prototype.getSnippet = function(t, n) {
  var r, i, a, o, s;
  if (!this.buffer) return null;
  for (t = t || 4, n = n || 75, r = "", i = this.position; i > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(i - 1)) === -1; )
    if (i -= 1, this.position - i > n / 2 - 1) {
      r = " ... ", i += 5;
      break;
    }
  for (a = "", o = this.position; o < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(o)) === -1; )
    if (o += 1, o - this.position > n / 2 - 1) {
      a = " ... ", o -= 5;
      break;
    }
  return s = this.buffer.slice(i, o), ca.repeat(" ", t) + r + s + a + `
` + ca.repeat(" ", t + this.position - i + r.length) + "^";
};
Wi.prototype.toString = function(t) {
  var n, r = "";
  return this.name && (r += 'in "' + this.name + '" '), r += "at line " + (this.line + 1) + ", column " + (this.column + 1), t || (n = this.getSnippet(), n && (r += `:
` + n)), r;
};
var fv = Wi, ua = Qt, pv = [
  "kind",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "defaultStyle",
  "styleAliases"
], dv = [
  "scalar",
  "sequence",
  "mapping"
];
function hv(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function mv(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (pv.indexOf(n) === -1)
      throw new ua('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.defaultStyle = t.defaultStyle || null, this.styleAliases = hv(t.styleAliases || null), dv.indexOf(this.kind) === -1)
    throw new ua('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var ce = mv, la = Ce, hn = Qt, gv = ce;
function ci(e, t, n) {
  var r = [];
  return e.include.forEach(function(i) {
    n = ci(i, t, n);
  }), e[t].forEach(function(i) {
    n.forEach(function(a, o) {
      a.tag === i.tag && a.kind === i.kind && r.push(o);
    }), n.push(i);
  }), n.filter(function(i, a) {
    return r.indexOf(a) === -1;
  });
}
function yv() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, t, n;
  function r(i) {
    e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e;
}
function At(e) {
  this.include = e.include || [], this.implicit = e.implicit || [], this.explicit = e.explicit || [], this.implicit.forEach(function(t) {
    if (t.loadKind && t.loadKind !== "scalar")
      throw new hn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
  }), this.compiledImplicit = ci(this, "implicit", []), this.compiledExplicit = ci(this, "explicit", []), this.compiledTypeMap = yv(this.compiledImplicit, this.compiledExplicit);
}
At.DEFAULT = null;
At.create = function() {
  var t, n;
  switch (arguments.length) {
    case 1:
      t = At.DEFAULT, n = arguments[0];
      break;
    case 2:
      t = arguments[0], n = arguments[1];
      break;
    default:
      throw new hn("Wrong number of arguments for Schema.create function");
  }
  if (t = la.toArray(t), n = la.toArray(n), !t.every(function(r) {
    return r instanceof At;
  }))
    throw new hn("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
  if (!n.every(function(r) {
    return r instanceof gv;
  }))
    throw new hn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  return new At({
    include: t,
    explicit: n
  });
};
var Nt = At, vv = ce, wv = new vv("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ev = ce, bv = new Ev("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), xv = ce, Sv = new xv("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Av = Nt, zi = new Av({
  explicit: [
    wv,
    bv,
    Sv
  ]
}), _v = ce;
function Tv(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Cv() {
  return null;
}
function Rv(e) {
  return e === null;
}
var Fv = new _v("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Tv,
  construct: Cv,
  predicate: Rv,
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
}), $v = ce;
function Iv(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Ov(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Nv(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Pv = new $v("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Iv,
  construct: Ov,
  predicate: Nv,
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
}), Lv = Ce, kv = ce;
function Dv(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Mv(e) {
  return 48 <= e && e <= 55;
}
function jv(e) {
  return 48 <= e && e <= 57;
}
function Hv(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, r = !1, i;
  if (!t) return !1;
  if (i = e[n], (i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!Dv(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    for (; n < t; n++)
      if (i = e[n], i !== "_") {
        if (!Mv(e.charCodeAt(n))) return !1;
        r = !0;
      }
    return r && i !== "_";
  }
  if (i === "_") return !1;
  for (; n < t; n++)
    if (i = e[n], i !== "_") {
      if (i === ":") break;
      if (!jv(e.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !r || i === "_" ? !1 : i !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(n));
}
function Bv(e) {
  var t = e, n = 1, r, i, a = [];
  return t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0" ? 0 : r === "0" ? t[1] === "b" ? n * parseInt(t.slice(2), 2) : t[1] === "x" ? n * parseInt(t, 16) : n * parseInt(t, 8) : t.indexOf(":") !== -1 ? (t.split(":").forEach(function(o) {
    a.unshift(parseInt(o, 10));
  }), t = 0, i = 1, a.forEach(function(o) {
    t += o * i, i *= 60;
  }), n * t) : n * parseInt(t, 10);
}
function Uv(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Lv.isNegativeZero(e);
}
var Gv = new kv("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Hv,
  construct: Bv,
  predicate: Uv,
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
}), Tc = Ce, qv = ce, Kv = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Wv(e) {
  return !(e === null || !Kv.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function zv(e) {
  var t, n, r, i;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, i = [], "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : t.indexOf(":") >= 0 ? (t.split(":").forEach(function(a) {
    i.unshift(parseFloat(a, 10));
  }), t = 0, r = 1, i.forEach(function(a) {
    t += a * r, r *= 60;
  }), n * t) : n * parseFloat(t, 10);
}
var Yv = /^[-+]?[0-9]+e/;
function Qv(e, t) {
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
  else if (Tc.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), Yv.test(n) ? n.replace("e", ".e") : n;
}
function Vv(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Tc.isNegativeZero(e));
}
var Xv = new qv("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Wv,
  construct: zv,
  predicate: Vv,
  represent: Qv,
  defaultStyle: "lowercase"
}), Zv = Nt, Cc = new Zv({
  include: [
    zi
  ],
  implicit: [
    Fv,
    Pv,
    Gv,
    Xv
  ]
}), Jv = Nt, Rc = new Jv({
  include: [
    Cc
  ]
}), e0 = ce, Fc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), $c = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function t0(e) {
  return e === null ? !1 : Fc.exec(e) !== null || $c.exec(e) !== null;
}
function n0(e) {
  var t, n, r, i, a, o, s, c = 0, f = null, l, u, p;
  if (t = Fc.exec(e), t === null && (t = $c.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), p = new Date(Date.UTC(n, r, i, a, o, s, c)), f && p.setTime(p.getTime() - f), p;
}
function r0(e) {
  return e.toISOString();
}
var i0 = new e0("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: t0,
  construct: n0,
  instanceOf: Date,
  represent: r0
}), o0 = ce;
function a0(e) {
  return e === "<<" || e === null;
}
var s0 = new o0("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: a0
});
function Ic(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var tt;
try {
  var c0 = Ic;
  tt = c0("buffer").Buffer;
} catch {
}
var u0 = ce, Yi = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function l0(e) {
  if (e === null) return !1;
  var t, n, r = 0, i = e.length, a = Yi;
  for (n = 0; n < i; n++)
    if (t = a.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function f0(e) {
  var t, n, r = e.replace(/[\r\n=]/g, ""), i = r.length, a = Yi, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : n === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : n === 12 && s.push(o >> 4 & 255), tt ? tt.from ? tt.from(s) : new tt(s) : s;
}
function p0(e) {
  var t = "", n = 0, r, i, a = e.length, o = Yi;
  for (r = 0; r < a; r++)
    r % 3 === 0 && r && (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]), n = (n << 8) + e[r];
  return i = a % 3, i === 0 ? (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]) : i === 2 ? (t += o[n >> 10 & 63], t += o[n >> 4 & 63], t += o[n << 2 & 63], t += o[64]) : i === 1 && (t += o[n >> 2 & 63], t += o[n << 4 & 63], t += o[64], t += o[64]), t;
}
function d0(e) {
  return tt && tt.isBuffer(e);
}
var h0 = new u0("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: l0,
  construct: f0,
  predicate: d0,
  represent: p0
}), m0 = ce, g0 = Object.prototype.hasOwnProperty, y0 = Object.prototype.toString;
function v0(e) {
  if (e === null) return !0;
  var t = [], n, r, i, a, o, s = e;
  for (n = 0, r = s.length; n < r; n += 1) {
    if (i = s[n], o = !1, y0.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (g0.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function w0(e) {
  return e !== null ? e : [];
}
var E0 = new m0("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: v0,
  construct: w0
}), b0 = ce, x0 = Object.prototype.toString;
function S0(e) {
  if (e === null) return !0;
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1) {
    if (r = o[t], x0.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    a[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function A0(e) {
  if (e === null) return [];
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1)
    r = o[t], i = Object.keys(r), a[t] = [i[0], r[i[0]]];
  return a;
}
var _0 = new b0("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: S0,
  construct: A0
}), T0 = ce, C0 = Object.prototype.hasOwnProperty;
function R0(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (C0.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function F0(e) {
  return e !== null ? e : {};
}
var $0 = new T0("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: R0,
  construct: F0
}), I0 = Nt, Vt = new I0({
  include: [
    Rc
  ],
  implicit: [
    i0,
    s0
  ],
  explicit: [
    h0,
    E0,
    _0,
    $0
  ]
}), O0 = ce;
function N0() {
  return !0;
}
function P0() {
}
function L0() {
  return "";
}
function k0(e) {
  return typeof e > "u";
}
var D0 = new O0("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve: N0,
  construct: P0,
  predicate: k0,
  represent: L0
}), M0 = ce;
function j0(e) {
  if (e === null || e.length === 0) return !1;
  var t = e, n = /\/([gim]*)$/.exec(e), r = "";
  return !(t[0] === "/" && (n && (r = n[1]), r.length > 3 || t[t.length - r.length - 1] !== "/"));
}
function H0(e) {
  var t = e, n = /\/([gim]*)$/.exec(e), r = "";
  return t[0] === "/" && (n && (r = n[1]), t = t.slice(1, t.length - r.length - 1)), new RegExp(t, r);
}
function B0(e) {
  var t = "/" + e.source + "/";
  return e.global && (t += "g"), e.multiline && (t += "m"), e.ignoreCase && (t += "i"), t;
}
function U0(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var G0 = new M0("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve: j0,
  construct: H0,
  predicate: U0,
  represent: B0
}), jn;
try {
  var q0 = Ic;
  jn = q0("esprima");
} catch {
  typeof window < "u" && (jn = window.esprima);
}
var K0 = ce;
function W0(e) {
  if (e === null) return !1;
  try {
    var t = "(" + e + ")", n = jn.parse(t, { range: !0 });
    return !(n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression");
  } catch {
    return !1;
  }
}
function z0(e) {
  var t = "(" + e + ")", n = jn.parse(t, { range: !0 }), r = [], i;
  if (n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression")
    throw new Error("Failed to resolve function");
  return n.body[0].expression.params.forEach(function(a) {
    r.push(a.name);
  }), i = n.body[0].expression.body.range, n.body[0].expression.body.type === "BlockStatement" ? new Function(r, t.slice(i[0] + 1, i[1] - 1)) : new Function(r, "return " + t.slice(i[0], i[1]));
}
function Y0(e) {
  return e.toString();
}
function Q0(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
var V0 = new K0("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve: W0,
  construct: z0,
  predicate: Q0,
  represent: Y0
}), fa = Nt, ur = fa.DEFAULT = new fa({
  include: [
    Vt
  ],
  explicit: [
    D0,
    G0,
    V0
  ]
}), Be = Ce, Oc = Qt, X0 = fv, Nc = Vt, Z0 = ur, Qe = Object.prototype.hasOwnProperty, Hn = 1, Pc = 2, Lc = 3, Bn = 4, Mr = 1, J0 = 2, pa = 3, ew = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, tw = /[\x85\u2028\u2029]/, nw = /[,\[\]\{\}]/, kc = /^(?:!|!!|![a-z\-]+!)$/i, Dc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function da(e) {
  return Object.prototype.toString.call(e);
}
function ke(e) {
  return e === 10 || e === 13;
}
function ot(e) {
  return e === 9 || e === 32;
}
function we(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function _t(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function rw(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function iw(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function ow(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ha(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function aw(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Mc = new Array(256), jc = new Array(256);
for (var vt = 0; vt < 256; vt++)
  Mc[vt] = ha(vt) ? 1 : 0, jc[vt] = ha(vt);
function sw(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Z0, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
}
function Hc(e, t) {
  return new Oc(
    t,
    new X0(e.filename, e.input, e.position, e.line, e.position - e.lineStart)
  );
}
function B(e, t) {
  throw Hc(e, t);
}
function Un(e, t) {
  e.onWarning && e.onWarning.call(null, Hc(e, t));
}
var ma = {
  YAML: function(t, n, r) {
    var i, a, o;
    t.version !== null && B(t, "duplication of %YAML directive"), r.length !== 1 && B(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && B(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && B(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Un(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, a;
    r.length !== 2 && B(t, "TAG directive accepts exactly two arguments"), i = r[0], a = r[1], kc.test(i) || B(t, "ill-formed tag handle (first argument) of the TAG directive"), Qe.call(t.tagMap, i) && B(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Dc.test(a) || B(t, "ill-formed tag prefix (second argument) of the TAG directive"), t.tagMap[i] = a;
  }
};
function Ye(e, t, n, r) {
  var i, a, o, s;
  if (t < n) {
    if (s = e.input.slice(t, n), r)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || B(e, "expected valid JSON character");
    else ew.test(s) && B(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function ga(e, t, n, r) {
  var i, a, o, s;
  for (Be.isObject(n) || B(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), o = 0, s = i.length; o < s; o += 1)
    a = i[o], Qe.call(t, a) || (t[a] = n[a], r[a] = !0);
}
function Tt(e, t, n, r, i, a, o, s) {
  var c, f;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, f = i.length; c < f; c += 1)
      Array.isArray(i[c]) && B(e, "nested arrays are not supported inside keys"), typeof i == "object" && da(i[c]) === "[object Object]" && (i[c] = "[object Object]");
  if (typeof i == "object" && da(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (c = 0, f = a.length; c < f; c += 1)
        ga(e, t, a[c], n);
    else
      ga(e, t, a, n);
  else
    !e.json && !Qe.call(n, i) && Qe.call(t, i) && (e.line = o || e.line, e.position = s || e.position, B(e, "duplicated mapping key")), t[i] = a, delete n[i];
  return t;
}
function Qi(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : B(e, "a line break is expected"), e.line += 1, e.lineStart = e.position;
}
function ae(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; ot(i); )
      i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (ke(i))
      for (Qi(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && Un(e, "deficient indentation"), r;
}
function lr(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || we(n)));
}
function Vi(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Be.repeat(`
`, t - 1));
}
function cw(e, t, n) {
  var r, i, a, o, s, c, f, l, u = e.kind, p = e.result, d;
  if (d = e.input.charCodeAt(e.position), we(d) || _t(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (i = e.input.charCodeAt(e.position + 1), we(i) || n && _t(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; d !== 0; ) {
    if (d === 58) {
      if (i = e.input.charCodeAt(e.position + 1), we(i) || n && _t(i))
        break;
    } else if (d === 35) {
      if (r = e.input.charCodeAt(e.position - 1), we(r))
        break;
    } else {
      if (e.position === e.lineStart && lr(e) || n && _t(d))
        break;
      if (ke(d))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, ae(e, !1, -1), e.lineIndent >= t) {
          s = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (Ye(e, a, o, !1), Vi(e, e.line - c), a = o = e.position, s = !1), ot(d) || (o = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return Ye(e, a, o, !1), e.result ? !0 : (e.kind = u, e.result = p, !1);
}
function uw(e, t) {
  var n, r, i;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (Ye(e, r, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        r = e.position, e.position++, i = e.position;
      else
        return !0;
    else ke(n) ? (Ye(e, r, i, !0), Vi(e, ae(e, !1, t)), r = i = e.position) : e.position === e.lineStart && lr(e) ? B(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  B(e, "unexpected end of the stream within a single quoted scalar");
}
function lw(e, t) {
  var n, r, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return Ye(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (Ye(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), ke(s))
        ae(e, !1, t);
      else if (s < 256 && Mc[s])
        e.result += jc[s], e.position++;
      else if ((o = iw(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = rw(s)) >= 0 ? a = (a << 4) + o : B(e, "expected hexadecimal character");
        e.result += aw(a), e.position++;
      } else
        B(e, "unknown escape sequence");
      n = r = e.position;
    } else ke(s) ? (Ye(e, n, r, !0), Vi(e, ae(e, !1, t)), n = r = e.position) : e.position === e.lineStart && lr(e) ? B(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  B(e, "unexpected end of the stream within a double quoted scalar");
}
function fw(e, t) {
  var n = !0, r, i = e.tag, a, o = e.anchor, s, c, f, l, u, p = {}, d, h, m, g;
  if (g = e.input.charCodeAt(e.position), g === 91)
    c = 93, u = !1, a = [];
  else if (g === 123)
    c = 125, u = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), g = e.input.charCodeAt(++e.position); g !== 0; ) {
    if (ae(e, !0, t), g = e.input.charCodeAt(e.position), g === c)
      return e.position++, e.tag = i, e.anchor = o, e.kind = u ? "mapping" : "sequence", e.result = a, !0;
    n || B(e, "missed comma between flow collection entries"), h = d = m = null, f = l = !1, g === 63 && (s = e.input.charCodeAt(e.position + 1), we(s) && (f = l = !0, e.position++, ae(e, !0, t))), r = e.line, $t(e, t, Hn, !1, !0), h = e.tag, d = e.result, ae(e, !0, t), g = e.input.charCodeAt(e.position), (l || e.line === r) && g === 58 && (f = !0, g = e.input.charCodeAt(++e.position), ae(e, !0, t), $t(e, t, Hn, !1, !0), m = e.result), u ? Tt(e, a, p, h, d, m) : f ? a.push(Tt(e, null, p, h, d, m)) : a.push(d), ae(e, !0, t), g = e.input.charCodeAt(e.position), g === 44 ? (n = !0, g = e.input.charCodeAt(++e.position)) : n = !1;
  }
  B(e, "unexpected end of the stream within a flow collection");
}
function pw(e, t) {
  var n, r, i = Mr, a = !1, o = !1, s = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Mr === i ? i = u === 43 ? pa : J0 : B(e, "repeat of a chomping mode identifier");
    else if ((l = ow(u)) >= 0)
      l === 0 ? B(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? B(e, "repeat of an indentation width identifier") : (s = t + l - 1, o = !0);
    else
      break;
  if (ot(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (ot(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!ke(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Qi(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), ke(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === pa ? e.result += Be.repeat(`
`, a ? 1 + c : c) : i === Mr && a && (e.result += `
`);
      break;
    }
    for (r ? ot(u) ? (f = !0, e.result += Be.repeat(`
`, a ? 1 + c : c)) : f ? (f = !1, e.result += Be.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += Be.repeat(`
`, c) : e.result += Be.repeat(`
`, a ? 1 + c : c), a = !0, o = !0, c = 0, n = e.position; !ke(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    Ye(e, n, e.position, !1);
  }
  return !0;
}
function ya(e, t) {
  var n, r = e.tag, i = e.anchor, a = [], o, s = !1, c;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !we(o))); ) {
    if (s = !0, e.position++, ae(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, $t(e, t, Lc, !1, !0), a.push(e.result), ae(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && c !== 0)
      B(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = r, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function dw(e, t, n) {
  var r, i, a, o, s = e.tag, c = e.anchor, f = {}, l = {}, u = null, p = null, d = null, h = !1, m = !1, g;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), g = e.input.charCodeAt(e.position); g !== 0; ) {
    if (r = e.input.charCodeAt(e.position + 1), a = e.line, o = e.position, (g === 63 || g === 58) && we(r))
      g === 63 ? (h && (Tt(e, f, l, u, p, null), u = p = d = null), m = !0, h = !0, i = !0) : h ? (h = !1, i = !0) : B(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, g = r;
    else if ($t(e, n, Pc, !1, !0))
      if (e.line === a) {
        for (g = e.input.charCodeAt(e.position); ot(g); )
          g = e.input.charCodeAt(++e.position);
        if (g === 58)
          g = e.input.charCodeAt(++e.position), we(g) || B(e, "a whitespace character is expected after the key-value separator within a block mapping"), h && (Tt(e, f, l, u, p, null), u = p = d = null), m = !0, h = !1, i = !1, u = e.tag, p = e.result;
        else if (m)
          B(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = s, e.anchor = c, !0;
      } else if (m)
        B(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = s, e.anchor = c, !0;
    else
      break;
    if ((e.line === a || e.lineIndent > t) && ($t(e, t, Bn, !0, i) && (h ? p = e.result : d = e.result), h || (Tt(e, f, l, u, p, d, a, o), u = p = d = null), ae(e, !0, -1), g = e.input.charCodeAt(e.position)), e.lineIndent > t && g !== 0)
      B(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return h && Tt(e, f, l, u, p, null), m && (e.tag = s, e.anchor = c, e.kind = "mapping", e.result = f), m;
}
function hw(e) {
  var t, n = !1, r = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && B(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (n = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (r = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, n) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : B(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !we(o); )
      o === 33 && (r ? B(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), kc.test(i) || B(e, "named tag handle cannot contain such characters"), r = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), nw.test(a) && B(e, "tag suffix cannot contain flow indicator characters");
  }
  return a && !Dc.test(a) && B(e, "tag name cannot contain such characters: " + a), n ? e.tag = a : Qe.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : B(e, 'undeclared tag handle "' + i + '"'), !0;
}
function mw(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && B(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !we(n) && !_t(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && B(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function gw(e) {
  var t, n, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !we(r) && !_t(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && B(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), Qe.call(e.anchorMap, n) || B(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], ae(e, !0, -1), !0;
}
function $t(e, t, n, r, i) {
  var a, o, s, c = 1, f = !1, l = !1, u, p, d, h, m;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = Bn === n || Lc === n, r && ae(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; hw(e) || mw(e); )
      ae(e, !0, -1) ? (f = !0, s = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || Bn === n) && (Hn === n || Pc === n ? h = t : h = t + 1, m = e.position - e.lineStart, c === 1 ? s && (ya(e, m) || dw(e, m, h)) || fw(e, h) ? l = !0 : (o && pw(e, h) || uw(e, h) || lw(e, h) ? l = !0 : gw(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && B(e, "alias node should not have any properties")) : cw(e, h, Hn === n) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = s && ya(e, m))), e.tag !== null && e.tag !== "!")
    if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && B(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, p = e.implicitTypes.length; u < p; u += 1)
        if (d = e.implicitTypes[u], d.resolve(e.result)) {
          e.result = d.construct(e.result), e.tag = d.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else Qe.call(e.typeMap[e.kind || "fallback"], e.tag) ? (d = e.typeMap[e.kind || "fallback"][e.tag], e.result !== null && d.kind !== e.kind && B(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + d.kind + '", not "' + e.kind + '"'), d.resolve(e.result) ? (e.result = d.construct(e.result), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : B(e, "cannot resolve a node with !<" + e.tag + "> explicit tag")) : B(e, "unknown tag !<" + e.tag + ">");
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function yw(e) {
  var t = e.position, n, r, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {}; (o = e.input.charCodeAt(e.position)) !== 0 && (ae(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), n = e.position; o !== 0 && !we(o); )
      o = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(n, e.position), i = [], r.length < 1 && B(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; ot(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !ke(o));
        break;
      }
      if (ke(o)) break;
      for (n = e.position; o !== 0 && !we(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    o !== 0 && Qi(e), Qe.call(ma, r) ? ma[r](e, r, i) : Un(e, 'unknown document directive "' + r + '"');
  }
  if (ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ae(e, !0, -1)) : a && B(e, "directives end mark is expected"), $t(e, e.lineIndent - 1, Bn, !1, !0), ae(e, !0, -1), e.checkLineBreaks && tw.test(e.input.slice(t, e.position)) && Un(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && lr(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ae(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    B(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Bc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new sw(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, B(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    yw(n);
  return n.documents;
}
function Uc(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = Bc(e, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, a = r.length; i < a; i += 1)
    t(r[i]);
}
function Gc(e, t) {
  var n = Bc(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Oc("expected a single document in the stream, but found more");
  }
}
function vw(e, t, n) {
  return typeof t == "object" && t !== null && typeof n > "u" && (n = t, t = null), Uc(e, t, Be.extend({ schema: Nc }, n));
}
function ww(e, t) {
  return Gc(e, Be.extend({ schema: Nc }, t));
}
Yt.loadAll = Uc;
Yt.load = Gc;
Yt.safeLoadAll = vw;
Yt.safeLoad = ww;
var Xi = {}, Xt = Ce, Zt = Qt, Ew = ur, bw = Vt, qc = Object.prototype.toString, Kc = Object.prototype.hasOwnProperty, xw = 9, Ut = 10, Sw = 13, Aw = 32, _w = 33, Tw = 34, Wc = 35, Cw = 37, Rw = 38, Fw = 39, $w = 42, zc = 44, Iw = 45, Yc = 58, Ow = 61, Nw = 62, Pw = 63, Lw = 64, Qc = 91, Vc = 93, kw = 96, Xc = 123, Dw = 124, Zc = 125, fe = {};
fe[0] = "\\0";
fe[7] = "\\a";
fe[8] = "\\b";
fe[9] = "\\t";
fe[10] = "\\n";
fe[11] = "\\v";
fe[12] = "\\f";
fe[13] = "\\r";
fe[27] = "\\e";
fe[34] = '\\"';
fe[92] = "\\\\";
fe[133] = "\\N";
fe[160] = "\\_";
fe[8232] = "\\L";
fe[8233] = "\\P";
var Mw = [
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
function jw(e, t) {
  var n, r, i, a, o, s, c;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, a = r.length; i < a; i += 1)
    o = r[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && Kc.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[o] = s;
  return n;
}
function va(e) {
  var t, n, r;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", r = 2;
  else if (e <= 65535)
    n = "u", r = 4;
  else if (e <= 4294967295)
    n = "U", r = 8;
  else
    throw new Zt("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + Xt.repeat("0", r - t.length) + t;
}
function Hw(e) {
  this.schema = e.schema || Ew, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Xt.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = jw(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function wa(e, t) {
  for (var n = Xt.repeat(" ", t), r = 0, i = -1, a = "", o, s = e.length; r < s; )
    i = e.indexOf(`
`, r), i === -1 ? (o = e.slice(r), r = s) : (o = e.slice(r, i + 1), r = i + 1), o.length && o !== `
` && (a += n), a += o;
  return a;
}
function ui(e, t) {
  return `
` + Xt.repeat(" ", e.indent * t);
}
function Bw(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (i = e.implicitTypes[n], i.resolve(t))
      return !0;
  return !1;
}
function Zi(e) {
  return e === Aw || e === xw;
}
function It(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== 65279 || 65536 <= e && e <= 1114111;
}
function Uw(e) {
  return It(e) && !Zi(e) && e !== 65279 && e !== Sw && e !== Ut;
}
function Ea(e, t) {
  return It(e) && e !== 65279 && e !== zc && e !== Qc && e !== Vc && e !== Xc && e !== Zc && e !== Yc && (e !== Wc || t && Uw(t));
}
function Gw(e) {
  return It(e) && e !== 65279 && !Zi(e) && e !== Iw && e !== Pw && e !== Yc && e !== zc && e !== Qc && e !== Vc && e !== Xc && e !== Zc && e !== Wc && e !== Rw && e !== $w && e !== _w && e !== Dw && e !== Ow && e !== Nw && e !== Fw && e !== Tw && e !== Cw && e !== Lw && e !== kw;
}
function Jc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var eu = 1, tu = 2, nu = 3, ru = 4, mn = 5;
function qw(e, t, n, r, i) {
  var a, o, s, c = !1, f = !1, l = r !== -1, u = -1, p = Gw(e.charCodeAt(0)) && !Zi(e.charCodeAt(e.length - 1));
  if (t)
    for (a = 0; a < e.length; a++) {
      if (o = e.charCodeAt(a), !It(o))
        return mn;
      s = a > 0 ? e.charCodeAt(a - 1) : null, p = p && Ea(o, s);
    }
  else {
    for (a = 0; a < e.length; a++) {
      if (o = e.charCodeAt(a), o === Ut)
        c = !0, l && (f = f || // Foldable line = too long, and not more-indented.
        a - u - 1 > r && e[u + 1] !== " ", u = a);
      else if (!It(o))
        return mn;
      s = a > 0 ? e.charCodeAt(a - 1) : null, p = p && Ea(o, s);
    }
    f = f || l && a - u - 1 > r && e[u + 1] !== " ";
  }
  return !c && !f ? p && !i(e) ? eu : tu : n > 9 && Jc(e) ? mn : f ? ru : nu;
}
function Kw(e, t, n, r) {
  e.dump = function() {
    if (t.length === 0)
      return "''";
    if (!e.noCompatMode && Mw.indexOf(t) !== -1)
      return "'" + t + "'";
    var i = e.indent * Math.max(1, n), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - i), o = r || e.flowLevel > -1 && n >= e.flowLevel;
    function s(c) {
      return Bw(e, c);
    }
    switch (qw(t, o, e.indent, a, s)) {
      case eu:
        return t;
      case tu:
        return "'" + t.replace(/'/g, "''") + "'";
      case nu:
        return "|" + ba(t, e.indent) + xa(wa(t, i));
      case ru:
        return ">" + ba(t, e.indent) + xa(wa(Ww(t, a), i));
      case mn:
        return '"' + zw(t) + '"';
      default:
        throw new Zt("impossible error: invalid scalar style");
    }
  }();
}
function ba(e, t) {
  var n = Jc(e) ? String(t) : "", r = e[e.length - 1] === `
`, i = r && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : r ? "" : "-";
  return n + a + `
`;
}
function xa(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Ww(e, t) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, n.lastIndex = f, Sa(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, o; o = n.exec(e); ) {
    var s = o[1], c = o[2];
    a = c[0] === " ", r += s + (!i && !a && c !== "" ? `
` : "") + Sa(c, t), i = a;
  }
  return r;
}
function Sa(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, r, i = 0, a, o = 0, s = 0, c = ""; r = n.exec(e); )
    s = r.index, s - i > t && (a = o > i ? o : s, c += `
` + e.slice(i, a), i = a + 1), o = s;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function zw(e) {
  for (var t = "", n, r, i, a = 0; a < e.length; a++) {
    if (n = e.charCodeAt(a), n >= 55296 && n <= 56319 && (r = e.charCodeAt(a + 1), r >= 56320 && r <= 57343)) {
      t += va((n - 55296) * 1024 + r - 56320 + 65536), a++;
      continue;
    }
    i = fe[n], t += !i && It(n) ? e[a] : i || va(n);
  }
  return t;
}
function Yw(e, t, n) {
  var r = "", i = e.tag, a, o;
  for (a = 0, o = n.length; a < o; a += 1)
    ct(e, t, n[a], !1, !1) && (a !== 0 && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = i, e.dump = "[" + r + "]";
}
function Qw(e, t, n, r) {
  var i = "", a = e.tag, o, s;
  for (o = 0, s = n.length; o < s; o += 1)
    ct(e, t + 1, n[o], !0, !0) && ((!r || o !== 0) && (i += ui(e, t)), e.dump && Ut === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function Vw(e, t, n) {
  var r = "", i = e.tag, a = Object.keys(n), o, s, c, f, l;
  for (o = 0, s = a.length; o < s; o += 1)
    l = "", o !== 0 && (l += ", "), e.condenseFlow && (l += '"'), c = a[o], f = n[c], ct(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), ct(e, t, f, !1, !1) && (l += e.dump, r += l));
  e.tag = i, e.dump = "{" + r + "}";
}
function Xw(e, t, n, r) {
  var i = "", a = e.tag, o = Object.keys(n), s, c, f, l, u, p;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Zt("sortKeys must be a boolean or a function");
  for (s = 0, c = o.length; s < c; s += 1)
    p = "", (!r || s !== 0) && (p += ui(e, t)), f = o[s], l = n[f], ct(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Ut === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, u && (p += ui(e, t)), ct(e, t + 1, l, !0, u) && (e.dump && Ut === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p));
  e.tag = a, e.dump = i || "{}";
}
function Aa(e, t, n) {
  var r, i, a, o, s, c;
  for (i = n ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (e.tag = n ? s.tag : "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, qc.call(s.represent) === "[object Function]")
          r = s.represent(t, c);
        else if (Kc.call(s.represent, c))
          r = s.represent[c](t, c);
        else
          throw new Zt("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function ct(e, t, n, r, i, a) {
  e.tag = null, e.dump = n, Aa(e, n, !1) || Aa(e, n, !0);
  var o = qc.call(e.dump);
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var s = o === "[object Object]" || o === "[object Array]", c, f;
  if (s && (c = e.duplicates.indexOf(n), f = c !== -1), (e.tag !== null && e.tag !== "?" || f || e.indent !== 2 && t > 0) && (i = !1), f && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (s && f && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), o === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Xw(e, t, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (Vw(e, t, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    else if (o === "[object Array]") {
      var l = e.noArrayIndent && t > 0 ? t - 1 : t;
      r && e.dump.length !== 0 ? (Qw(e, l, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (Yw(e, l, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    } else if (o === "[object String]")
      e.tag !== "?" && Kw(e, e.dump, t, a);
    else {
      if (e.skipInvalid) return !1;
      throw new Zt("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (e.dump = "!<" + e.tag + "> " + e.dump);
  }
  return !0;
}
function Zw(e, t) {
  var n = [], r = [], i, a;
  for (li(e, n, r), i = 0, a = r.length; i < a; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(a);
}
function li(e, t, n) {
  var r, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        li(e[i], t, n);
    else
      for (r = Object.keys(e), i = 0, a = r.length; i < a; i += 1)
        li(e[r[i]], t, n);
}
function iu(e, t) {
  t = t || {};
  var n = new Hw(t);
  return n.noRefs || Zw(e, n), ct(n, 0, e, !0, !0) ? n.dump + `
` : "";
}
function Jw(e, t) {
  return iu(e, Xt.extend({ schema: bw }, t));
}
Xi.dump = iu;
Xi.safeDump = Jw;
var fr = Yt, ou = Xi;
function pr(e) {
  return function() {
    throw new Error("Function " + e + " is deprecated and cannot be used.");
  };
}
ne.Type = ce;
ne.Schema = Nt;
ne.FAILSAFE_SCHEMA = zi;
ne.JSON_SCHEMA = Cc;
ne.CORE_SCHEMA = Rc;
ne.DEFAULT_SAFE_SCHEMA = Vt;
ne.DEFAULT_FULL_SCHEMA = ur;
ne.load = fr.load;
ne.loadAll = fr.loadAll;
ne.safeLoad = fr.safeLoad;
ne.safeLoadAll = fr.safeLoadAll;
ne.dump = ou.dump;
ne.safeDump = ou.safeDump;
ne.YAMLException = Qt;
ne.MINIMAL_SCHEMA = zi;
ne.SAFE_SCHEMA = Vt;
ne.DEFAULT_SCHEMA = ur;
ne.scan = pr("scan");
ne.parse = pr("parse");
ne.compose = pr("compose");
ne.addConstructor = pr("addConstructor");
var eE = ne, tE = eE;
const au = Ac, nE = iv, rE = ov, iE = tE, su = (e) => iE.safeLoad(rE(e));
xc.exports = (e) => nE(au.readFile)(e, "utf8").then((t) => su(t));
xc.exports.sync = (e) => su(au.readFileSync(e, "utf8"));
const oE = (e) => /^[a-z][a-zA-Z0-9]+$/.test(e), aE = (e) => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(e), { toString: sE } = Object.prototype, cE = Error.prototype.toString, uE = RegExp.prototype.toString, lE = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", fE = /^Symbol\((.*)\)(.*)$/;
function pE(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : `${e}`;
}
function _a(e, t = !1) {
  if (e == null || e === !0 || e === !1) return `${e}`;
  if (typeof e == "number") return pE(e);
  if (typeof e == "string") return t ? `"${e}"` : e;
  if (typeof e == "function") return `[Function ${e.name || "anonymous"}]`;
  if (typeof e == "symbol") return lE.call(e).replace(fE, "Symbol($1)");
  const n = sE.call(e).slice(8, -1);
  if (n === "Date") {
    const r = e;
    return Number.isNaN(r.getTime()) ? `${r}` : r.toISOString();
  }
  return n === "Error" || e instanceof Error ? `[${cE.call(e)}]` : n === "RegExp" ? uE.call(e) : null;
}
function Ta(e, t) {
  const n = _a(e, t);
  return n !== null ? n : JSON.stringify(e, function(i, a) {
    const o = _a(this[i], t);
    return o !== null ? o : a;
  }, 2);
}
const dE = (e) => !de.isNil(e), hE = (e) => !de.isNull(e);
ft(Qn, "notNil", function(t = "${path} must be defined.") {
  return this.test("defined", t, dE);
});
ft(Qn, "notNull", function(t = "${path} cannot be null.") {
  return this.test("defined", t, hE);
});
ft(Qn, "isFunction", function(t = "${path} is not a function") {
  return this.test("is a function", t, (n) => de.isUndefined(n) || de.isFunction(n));
});
ft(yi, "isCamelCase", function(t = "${path} is not in camel case (anExampleOfCamelCase)") {
  return this.test("is in camelCase", t, (n) => n ? oE(n) : !0);
});
ft(yi, "isKebabCase", function(t = "${path} is not in kebab case (an-example-of-kebab-case)") {
  return this.test("is in kebab-case", t, (n) => n ? aE(n) : !0);
});
ft(ls, "onlyContainsFunctions", function(t = "${path} contains values that are not functions") {
  return this.test("only contains functions", t, (n) => de.isUndefined(n) || n && Object.values(n).every(de.isFunction));
});
ft(fs, "uniqueProperty", function(t, n) {
  return this.test("unique", n, function(i) {
    const a = [];
    if (i?.forEach((o, s) => {
      i.filter((f) => to(t, f) === to(t, o)).length > 1 && a.push(this.createError({
        path: `${this.path}[${s}].${t}`,
        message: n
      }));
    }), a.length)
      throw new he(a);
    return !0;
  });
});
vp({
  mixed: {
    notType(e) {
      const { path: t, type: n, value: r, originalValue: i } = e, a = i != null && i !== r;
      return `${t} must be a \`${n}\` type, but the final value was: \`${Ta(r, !0)}\`${a ? ` (cast from the value \`${Ta(i, !0)}\`).` : "."}`;
    }
  }
});
q.union([
  q.string(),
  q.array(q.string())
]).describe("Select specific fields to return in the response");
q.union([
  q.literal("*"),
  q.string(),
  q.array(q.string()),
  q.record(q.string(), q.any())
]).describe("Specify which relations to populate in the response");
q.union([
  q.string(),
  q.array(q.string()),
  q.record(q.string(), q.enum([
    "asc",
    "desc"
  ])),
  q.array(q.record(q.string(), q.enum([
    "asc",
    "desc"
  ])))
]).describe("Sort the results by specified fields");
q.intersection(q.object({
  withCount: q.boolean().optional().describe("Include total count in response")
}), q.union([
  q.object({
    page: q.number().int().positive().describe("Page number (1-based)"),
    pageSize: q.number().int().positive().describe("Number of entries per page")
  }).describe("Page-based pagination"),
  q.object({
    start: q.number().int().min(0).describe("Number of entries to skip"),
    limit: q.number().int().positive().describe("Maximum number of entries to return")
  }).describe("Offset-based pagination")
])).describe("Pagination parameters");
q.record(q.string(), q.any()).describe("Apply filters to the query");
q.string().describe("Specify the locale for localized content");
q.enum([
  "draft",
  "published"
]).describe("Filter by publication status");
q.string().describe("Search query string");
const sn = (e, t, n) => {
  e && e.emit && e.emit(t, n);
}, mE = (e) => [
  ...new Set(
    e.filter((t) => !!t).flatMap(({ remove: t, create: n, update: r }) => [n ? "CREATE" : "", r ? "UPDATE" : "", t ? "REMOVE" : ""].filter(
      (i) => !!i
    ))
  )
].join("_"), cu = (e) => async (t) => ({
  title: t.title,
  path: t.path,
  audience: t.audience,
  type: t.type,
  uiRouterKey: t.uiRouterKey,
  order: t.order,
  collapsed: t.collapsed,
  menuAttached: t.menuAttached,
  removed: !1,
  updated: !0,
  externalPath: t.externalPath,
  items: t.items ? await Promise.all(t.items.map(cu(e))) : [],
  master: e.master,
  parent: void 0,
  related: t.related,
  additionalFields: t.additionalFields
}), gE = (e, t) => t.slice(1).reduce((n, r) => n.concat([e, r]), t.slice(0, 1)), yE = async ({
  strapi: e
}) => {
  const n = !!e.plugin("rest-cache"), r = e.store({
    type: "plugin",
    name: "navigation"
  }), i = Te.configSchema.parse(
    await r.get({
      key: "config"
    })
  );
  return n ? { hasCachePlugin: n, enabled: !!i.isCacheEnabled } : { hasCachePlugin: n, enabled: !1 };
}, vE = (e) => ({
  async config({ viaSettingsPage: t = !1 }) {
    const n = te(e, "common"), r = await yE(e), a = await (await n.getPluginStore()).get({
      key: "config"
    }).then(Te.configSchema.parse), {
      additionalFields: o,
      cascadeMenuAttached: s,
      contentTypesPopulate: c,
      contentTypesNameFields: f,
      defaultContentType: l,
      pathDefaultFields: u,
      allowedLevels: p,
      preferCustomContentTypes: d
    } = a, h = !!strapi.plugin("graphql");
    let m = {
      allowedContentTypes: Ba,
      restrictedContentTypes: Ua,
      availableAudience: []
    };
    const g = await this.configContentTypes({}), b = {
      contentTypes: await this.configContentTypes({ viaSettingsPage: t }),
      contentTypesNameFields: {
        default: ll,
        ...hr(f) ? f : {}
      },
      contentTypesPopulate: hr(c) ? c : {},
      defaultContentType: l,
      pathDefaultFields: hr(u) ? u : {},
      allowedLevels: p,
      additionalFields: t ? o : o.filter((x) => typeof x == "string" || !!x.enabled),
      gql: {
        navigationItemRelated: g.map(
          ({ labelSingular: x }) => x.replace(/\s+/g, "")
        )
      },
      isGQLPluginEnabled: t ? h : void 0,
      cascadeMenuAttached: s,
      preferCustomContentTypes: d
    };
    if (o.includes("audience")) {
      const x = await vl(e).find({}, Number.MAX_SAFE_INTEGER);
      m = {
        ...m,
        availableAudience: x
      };
    }
    return {
      ...b,
      ...m,
      isCacheEnabled: r.enabled,
      isCachePluginEnabled: r.hasCachePlugin
    };
  },
  async configContentTypes({
    viaSettingsPage: t = !1
  }) {
    const i = await (await te(e, "common").getPluginStore()).get({ key: "config" }).then(Te.configSchema.parse);
    return (await Promise.all(
      i.contentTypes.filter(
        (o) => !!e.strapi.contentTypes[o] && ml(o)
      ).map(async (o) => {
        const s = Ur.parse(strapi.contentTypes[o]), { kind: c, options: f, uid: l } = s, u = f?.draftAndPublish, p = c === ao.SINGLE, d = p && u, h = (m) => ({
          key: o,
          available: m
        });
        if (p) {
          const m = En(e, l);
          if (d) {
            const b = d ? await m.count({}, "published") : !0;
            return h(b !== 0);
          }
          return await m.count({}) !== 0 ? h(!0) : t ? h(!1) : void 0;
        }
        return h(!0);
      })
    )).reduce((o, s) => {
      if (!s?.key)
        return o;
      const { key: c, available: f } = s, l = Ur.parse(e.strapi.contentTypes[c]), u = (l.associations || []).find(
        ({ model: L }) => L === "navigationitem"
      ), {
        uid: p,
        options: d,
        info: h,
        collectionName: m,
        modelName: g,
        apiName: b,
        plugin: x,
        kind: T,
        pluginOptions: _ = {}
      } = l, C = f && !d?.hidden;
      if (!C)
        return o;
      const { visible: R = !0 } = _["content-manager"] || {}, { name: M = "", description: S = "" } = h, A = Gn(
        un(e.strapi.api, `[${g}].config.routes`, []),
        (L) => L.handler.includes(".find")
      ), O = A && A.path.split("/")[1], v = O && O !== b ? O : b || g, D = T === ao.SINGLE, j = D ? v : io(v), G = co(g), w = typeof p == "string" ? qn(p.split(".")).split("-") : [], E = w.length > 1 ? w.reduce((L, H) => `${L}${dr(H)}`, "") : dr(g), F = M || dr(w.length > 1 ? w.join(" ") : G);
      return o.push({
        uid: p,
        name: G,
        draftAndPublish: d?.draftAndPublish,
        isSingle: D,
        description: S,
        collectionName: m,
        contentTypeName: E,
        label: D ? F : io(M || F),
        relatedField: u ? u.alias : void 0,
        labelSingular: co(F),
        endpoint: j,
        plugin: x,
        available: C,
        visible: R,
        templateName: d?.templateName
      }), o;
    }, []);
  },
  async get({ ids: t, locale: n }) {
    let r = {};
    t && t.length && (r.id = { $in: t });
    const i = await Fe(e).find({
      filters: r,
      locale: n || "*",
      limit: Number.MAX_SAFE_INTEGER,
      populate: ["items", "items.parent", "items.audience", "items.related"]
    }), a = ({
      allItems: o,
      item: s,
      parent: c
    }) => {
      const f = o.filter((l) => l.parent?.documentId === s.documentId);
      return {
        ...s,
        parent: c,
        items: f.map(
          (l) => a({
            parent: s,
            item: l,
            allItems: o
          })
        ).sort((l, u) => l.order - u.order)
      };
    };
    return i.map((o) => ({
      ...o,
      items: o.items?.filter((s) => !s.parent).map(
        (s) => a({
          allItems: o.items ?? [],
          item: s
        })
      ).sort((s, c) => s.order - c.order)
    }));
  },
  async getById({ documentId: t, locale: n, populate: r = [] }) {
    const i = te(e, "common"), { defaultLocale: a } = await i.readLocale(), o = {
      documentId: t
    }, s = await Fe(e).findOne({
      filters: o,
      locale: n || a
    }), c = await Pe(e).find({
      filters: { master: s.id },
      locale: n || a,
      limit: Number.MAX_SAFE_INTEGER,
      order: [{ order: "asc" }],
      populate: ["parent", "audience", ...r]
    });
    return {
      ...s,
      items: i.buildNestedStructure({
        navigationItems: c
      }).filter(({ parent: f }) => !f)
    };
  },
  async post({ auditLog: t, payload: n }) {
    const { masterModel: r } = ye(e), i = te(e, "common"), { defaultLocale: a, restLocale: o } = await i.readLocale(), s = Fe(e), c = [], { name: f, visible: l } = n, u = await i.getSlug({ query: f }), p = await s.save({
      name: f,
      visible: l,
      locale: a,
      slug: u
    });
    c.push(await this.getById({ documentId: p.documentId }));
    for (const d of o) {
      const h = await s.save({
        name: f,
        visible: l,
        locale: d,
        slug: u,
        documentId: p.documentId
      });
      c.push(await this.getById({ documentId: h.documentId }));
    }
    return c.map((d) => {
      sn(t, "onChangeNavigation", {
        actionType: "CREATE",
        oldEntity: d,
        newEntity: d
      });
    }), await i.emitEvent({
      entity: p,
      event: "entry.create",
      uid: r.uid
    }), {
      ...p,
      items: []
    };
  },
  async put({ auditLog: t, payload: n }) {
    const { masterModel: r } = ye(e), i = te(e, "common"), { defaultLocale: a, restLocale: o } = await i.readLocale(), s = Fe(e), { name: c, visible: f, items: l } = n, u = await s.findOne({
      filters: { documentId: n.documentId },
      locale: n.locale,
      populate: "*"
    }), p = await this.getById({
      documentId: n.documentId,
      locale: n.locale
    });
    if (u.name !== c || u.visible !== f) {
      const h = c ? await i.getSlug({
        query: c
      }) : u.slug, m = await Promise.all(
        [a, ...o].map(
          (g) => s.findOne({
            filters: { documentId: u.documentId },
            locale: g
          })
        )
      );
      for (const g of m)
        await s.save({
          documentId: g.documentId,
          id: g.id,
          slug: h,
          locale: g.locale,
          name: c,
          visible: f
        });
    }
    return await i.analyzeBranch({
      navigationItems: l ?? [],
      masterEntity: u,
      prevAction: {}
    }).then(mE).then(async (h) => {
      const m = await this.getById({ documentId: u.documentId });
      sn(t, "onChangeNavigation", {
        actionType: h,
        oldEntity: p,
        newEntity: m
      });
    }), await i.emitEvent({
      entity: await s.findOne({
        filters: { documentId: n.documentId },
        populate: "*"
      }),
      event: "entry.update",
      uid: r.uid
    }), await this.getById({
      documentId: n.documentId,
      locale: n.locale,
      populate: ["related"]
    });
  },
  async delete({ auditLog: t, documentId: n }) {
    const r = Fe(e), i = Pe(e), a = await this.getById({ documentId: n }), o = async (f) => {
      f.length < 1 || await i.removeForIds(
        await i.findForMasterIds(f).then(
          (l) => l.reduce((u, { documentId: p }) => (p && u.push(p), u), [])
        )
      );
    }, s = await r.findOne({
      filters: { documentId: n },
      populate: "*"
    }), c = await r.find({
      filters: { documentId: s.documentId },
      populate: "*"
    });
    await o(c.map(({ id: f }) => f)), await r.remove({ documentId: s.documentId }), sn(t, "onNavigationDeletion", {
      entity: a,
      actionType: "DELETE"
    });
  },
  async restart() {
    e.strapi.reload.isWatching = !1, setImmediate(() => e.strapi.reload());
  },
  async restoreConfig() {
    console.log("restore");
    const t = te(e, "common");
    await (await t.getPluginStore()).delete({ key: "config" }), await t.setDefaultConfig();
  },
  async refreshNavigationLocale(t) {
    if (!t)
      return;
    const n = te(e, "common"), { defaultLocale: r } = await n.readLocale(), i = Fe(e), a = await i.find({
      limit: Number.MAX_SAFE_INTEGER,
      locale: r
    });
    await Promise.all(
      a.map(
        ({ name: o, visible: s, slug: c, documentId: f }) => i.save({
          name: o,
          visible: s,
          locale: t,
          slug: c,
          documentId: f
        })
      )
    );
  },
  async updateConfig({ config: t }) {
    const n = te(e, "common"), r = await n.getPluginStore(), i = await r.get({
      key: "config"
    }).then(Te.configSchema.parse);
    Ga(t.additionalFields), await r.set({ key: "config", value: t });
    const a = mu(
      i.additionalFields,
      t.additionalFields,
      "name"
    ).reduce((o, s) => (typeof s == "string" || o.push(s), o), []);
    nt(a) || await n.pruneCustomFields({ removedFields: a });
  },
  async fillFromOtherLocale({
    auditLog: t,
    source: n,
    target: r,
    documentId: i
  }) {
    const a = await this.getById({ documentId: i, locale: r });
    return await this.i18nNavigationContentsCopy({
      source: await this.getById({ documentId: i, locale: n, populate: ["related"] }),
      target: a
    }).then(() => this.getById({ documentId: i, locale: r, populate: ["related"] })).then((o) => (sn(t, "onChangeNavigation", {
      actionType: "UPDATE",
      oldEntity: a,
      newEntity: o
    }), o));
  },
  async i18nNavigationContentsCopy({
    source: t,
    target: n
  }) {
    const r = te(e, "common"), i = t.items ?? [], a = Fe(e);
    if (n.items?.length)
      throw new gr("Current navigation is non-empty");
    if (!n.locale)
      throw new gr("Current navigation does not have specified locale");
    if (!i.length)
      throw new gr("Source navigation is empty");
    const o = cu({
      master: n,
      locale: n.locale,
      strapi
    });
    await r.createBranch({
      action: { create: !0 },
      masterEntity: await a.findOne({
        filters: { documentId: n.documentId },
        locale: n.locale,
        populate: "*"
      }),
      navigationItems: await Promise.all(i.map(o)),
      parentItem: void 0
    });
  },
  async readNavigationItemFromLocale({
    path: t,
    source: n,
    target: r
  }) {
    const i = await this.getById({ documentId: n }), a = await this.getById({ documentId: r });
    if (!i)
      throw new kt("Unable to find source navigation for specified query");
    if (!a)
      throw new kt("Unable to find target navigation for specified query");
    const o = [
      "path",
      "related",
      "type",
      "uiRouterKey",
      "title",
      "externalPath"
    ], s = t.split(".").map((f) => parseInt(f, 10));
    (!s.some(Number.isNaN) || !s.length) && new El("Path is invalid");
    let c = un(
      i.items,
      gE("items", s.map(hu))
    );
    if (!c)
      throw new kt("Unable to find navigation item");
    return Hu.parse(Ia(c, o));
  },
  async getContentTypeItems({
    query: t,
    uid: n
  }) {
    const a = await (await te(e, "common").getPluginStore()).get({ key: "config" }).then(Te.configSchema.parse), o = {
      publishedAt: {
        $notNull: !0
      }
    }, s = un(e.strapi.contentTypes, n), { draftAndPublish: c } = s.options, { localized: f = !1 } = s?.pluginOptions?.i18n || {};
    f && t.locale && (o.locale = t.locale);
    const l = En(e, n);
    try {
      return await l.findMany(
        o,
        a.contentTypesPopulate[n] || [],
        c ? "published" : void 0
      );
    } catch (u) {
      return console.error(u), [];
    }
  },
  async purgeNavigationCache(t, n) {
    const r = Fe(e), i = await r.findOne({ filters: { documentId: t } });
    if (!i)
      throw new kt("Navigation is not defined");
    const a = (f) => new RegExp(`/api/navigation/render/${f}`);
    let o = [a(i.documentId)];
    n && (o = (await r.find({
      filters: {
        documentId: i.documentId
      }
    })).map(({ documentId: l }) => a(l)));
    const c = strapi.plugin("rest-cache").service("cacheStore");
    return o.push(a(t)), await c.clearByRegexp(o), { success: !0 };
  },
  async purgeNavigationsCache() {
    const n = strapi.plugin("rest-cache").service("cacheStore"), r = new RegExp("/api/navigation/render(.*)");
    return await n.clearByRegexp([r]), { success: !0 };
  }
}), Ca = (e, t = {}, n = []) => {
  const { title: r, related: i } = e, a = jr(i) ? qn(i) : i;
  if (r)
    return Ji(r) && !nt(r) ? r : void 0;
  if (a) {
    const o = wE(a, t, n);
    return Ji(o) && !nt(o) ? o : void 0;
  }
}, wE = (e, t = {}, n = []) => {
  const { __contentType: r } = e, i = Gn(n, (o) => o.contentTypeName === r), { default: a = [] } = t;
  return un(t, `${i ? i.collectionName : ""}`, a).map((o) => e[o]).filter((o) => o)[0] || "";
}, Ra = (e, t) => {
  const n = uu(e), r = t ? n.filter(({ path: a }) => a.includes(t)) : n, i = r.find(({ path: a }) => a === t);
  return {
    root: i,
    items: Ke(i) ? [] : e.filter(({ documentId: a }) => r.find((o) => o.documentId === a))
  };
}, uu = (e, t, n = null) => e.filter((r) => !r.parent == null && !t ? !0 : r.parent?.documentId === t).reduce((r, i) => {
  const a = `${n || ""}/${i.path}`.replace("//", "/");
  return [
    {
      documentId: i.documentId,
      parent: n && i.parent?.documentId ? {
        id: i.parent?.id,
        documentId: i.parent?.documentId,
        path: n
      } : void 0,
      path: a
    },
    ...uu(e, i.documentId, a),
    ...r
  ];
}, []), EE = (e, t) => {
  const n = gu(e, t, (r, i) => Ke(r) ? -1 : Ke(i) ? 1 : r - i);
  return Gn(n, (r) => r !== 0) || 0;
}, bE = (e) => ({
  async readAll({ locale: t, orderBy: n = "createdAt", orderDirection: r = "DESC" }) {
    return Fe(e).find({
      locale: t,
      orderBy: { [n]: r }
    });
  },
  renderRFRNavigationItem({ item: t }) {
    const { uiRouterKey: n, title: r, path: i, type: a, audience: o, additionalFields: s } = t, c = {
      label: r,
      type: a,
      audience: o?.map(({ key: f }) => f),
      additionalFields: s
    };
    if (a === "WRAPPER")
      return { ...c };
    if (a === "EXTERNAL")
      return qa(
        i,
        new Ct("External navigation item's path is undefined", t)
      ), {
        ...c,
        url: i
      };
    if (a === "INTERNAL")
      return {
        ...c,
        page: n
      };
    if (a === "WRAPPER")
      return {
        ...c
      };
    throw new Ct("Unknown item type", t);
  },
  renderRFRPage({ item: t, parent: n, enabledCustomFieldsNames: r }) {
    const {
      documentId: i,
      uiRouterKey: a,
      title: o,
      path: s,
      related: c,
      type: f,
      audience: l,
      menuAttached: u,
      additionalFields: p
    } = t, d = r.reduce(
      (h, m) => ({ ...h, [m]: p?.[m] }),
      {}
    );
    return {
      id: a,
      documentId: i,
      title: o,
      related: f === "INTERNAL" && c?.documentId && c?.__type ? {
        contentType: c.__type,
        documentId: c.documentId
      } : void 0,
      path: s,
      parent: n,
      audience: l,
      menuAttached: u,
      additionalFields: d
    };
  },
  renderRFR({
    items: t,
    parent: n,
    parentNavItem: r,
    contentTypes: i = [],
    enabledCustomFieldsNames: a
  }) {
    const o = [];
    let s = {}, c = {};
    return t.forEach((f) => {
      const { items: l, ...u } = f, p = this.renderRFRNavigationItem({
        item: u
      }), d = this.renderRFRPage({
        item: u,
        parent: n,
        enabledCustomFieldsNames: a
      });
      if (f.type !== "EXTERNAL" && (c = {
        ...c,
        [d.documentId]: {
          ...d
        }
      }), f.menuAttached && o.push(p), !n)
        s = {
          ...s,
          root: o
        };
      else {
        const h = o.filter((m) => m.type);
        nt(h) || (s = {
          ...s,
          [n]: h.concat(r || [])
        });
      }
      if (!nt(l)) {
        const { nav: h } = this.renderRFR({
          items: l ?? [],
          parent: d.documentId,
          parentNavItem: p,
          contentTypes: i,
          enabledCustomFieldsNames: a
        }), { pages: m } = this.renderRFR({
          items: l || [],
          parent: d.documentId,
          parentNavItem: p,
          contentTypes: i,
          enabledCustomFieldsNames: a
        });
        c = {
          ...c,
          ...m
        }, s = {
          ...s,
          ...h
        };
      }
    }), {
      pages: c,
      nav: s
    };
  },
  renderTree({
    items: t = [],
    documentId: n,
    path: r = "",
    itemParser: i = (a) => Promise.resolve(a)
  }) {
    return Promise.all(
      t.reduce((a, o) => (o.parent?.documentId === n && a.push(i(yu(o), r)), a), [])
    ).then(
      (a) => a.sort((o, s) => o.order !== void 0 && s.order !== void 0 ? o.order - s.order : 0)
    );
  },
  getCustomFields(t) {
    return t.reduce((n, r) => (r !== "audience" && n.push(r), n), []);
  },
  async renderType({
    criteria: t = {},
    filter: n,
    itemCriteria: r = {},
    locale: i,
    populate: a,
    rootPath: o,
    type: s = "FLAT",
    wrapRelated: c,
    status: f = "published"
  }) {
    const l = te(e, "admin"), u = te(e, "common"), p = {
      ...t,
      visible: !0
    }, d = Fe(e), h = Pe(e);
    let m;
    if (i ? m = await d.find({
      filters: {
        ...p
      },
      locale: i,
      limit: 1
    }) : m = await d.find({
      filters: p,
      limit: 1
    }), jr(m) && (m = mr(m)), m && m.documentId) {
      const g = await h.find({
        filters: {
          master: Ia(m, ["slug", "id"]),
          ...r
        },
        locale: i,
        limit: Number.MAX_SAFE_INTEGER,
        order: [{ order: "asc" }],
        populate: ["audience", "parent", "related"]
      }), b = await u.mapToNavigationItemDTO({
        locale: i,
        master: m,
        navigationItems: g,
        populate: a,
        status: f
      }), { contentTypes: x, contentTypesNameFields: T, additionalFields: _ } = await l.config({
        viaSettingsPage: !1
      }), C = this.getCustomFields(_).reduce(
        (A, O) => O.enabled ? [...A, O.name] : A,
        []
      ), R = (A) => c && A ? {
        documentId: A.documentId,
        ...A
      } : A, M = _.filter(
        (A) => typeof A != "string"
      ), S = (A) => (O, v) => {
        const D = M.find(({ name: G }) => G === v);
        let j = A.additionalFields?.[v];
        if (j)
          switch (D?.type) {
            case "media":
              j = JSON.parse(j);
              break;
            case "boolean":
              j = j === "true";
              break;
          }
        return { ...O, [v]: j };
      };
      switch (s) {
        case "TREE":
        case "RFR":
          const A = async (F, L = "") => {
            const H = F.type === "EXTERNAL", K = H ? void 0 : `${L === "/" ? "" : L}/${mr(F.path) === "/" ? F.path.substring(1) : F.path}`, Y = typeof K == "string" ? await u.getSlug({
              query: (mr(K) === "/" ? K.substring(1) : K).replace(/\//g, "-")
            }) : void 0, Z = jr(F.related) ? qn(F.related) : F.related, Ae = R(Z), $ = C.reduce(S(F), {});
            return {
              id: F.id,
              documentId: F.documentId,
              title: Ca(F, T, x) ?? "Title missing",
              menuAttached: F.menuAttached,
              order: F.order,
              path: (H ? F.externalPath : K) ?? "Path is missing",
              type: F.type,
              uiRouterKey: F.uiRouterKey,
              slug: !Y && F.uiRouterKey ? await u.getSlug({ query: F.uiRouterKey }) : Y,
              related: H || !Z ? void 0 : {
                ...Ae
              },
              audience: nt(F.audience) ? void 0 : F.audience,
              items: await this.renderTree({
                itemParser: A,
                path: K,
                documentId: F.documentId,
                items: b
              }),
              collapsed: F.collapsed,
              additionalFields: $ || {}
            };
          }, { items: O, root: v } = Ra(
            b,
            o
          ), D = await this.renderTree({
            itemParser: A,
            items: Ke(o) ? b : O,
            path: v?.parent?.path,
            documentId: v?.parent?.documentId
          }), j = n ? D.filter((F) => F.uiRouterKey === n) : D;
          return s === "RFR" ? this.renderRFR({
            items: j,
            contentTypes: x.map((F) => F.contentTypeName),
            enabledCustomFieldsNames: C
          }) : j;
        default:
          const G = Ke(o) ? b : Ra(b, o).items, w = /* @__PURE__ */ new Map(), E = (F, L = w) => {
            const H = L.get(F);
            if (!Ke(H)) return H;
            const K = G.find(($) => $.documentId === F);
            if (Ke(K)) return [];
            const { order: Y, parent: Z } = K, Ae = Z ? E(Z.documentId, L).concat(Y) : [Y];
            return L.set(F, Ae), Ae;
          };
          return G.map((F) => {
            const L = C.reduce(
              S(F),
              {}
            );
            return {
              ...F,
              audience: F.audience?.map((H) => H.key),
              title: Ca(F, T, x) || "",
              related: R(F.related),
              items: null,
              additionalFields: L
            };
          }).sort(
            (F, L) => EE(E(F.documentId), E(L.documentId))
          );
      }
    }
    throw new kt();
  },
  renderChildren({
    childUIKey: t,
    idOrSlug: n,
    locale: r,
    menuOnly: i,
    type: a = "FLAT",
    wrapRelated: o,
    status: s
  }) {
    const c = { $or: [{ documentId: n }, { slug: n }] }, f = a === "FLAT" ? void 0 : t, l = {
      ...i && { menuAttached: !0 },
      ...a === "FLAT" ? { uiRouterKey: t } : {}
    };
    return this.renderType({
      type: a,
      criteria: c,
      itemCriteria: l,
      filter: f,
      wrapRelated: o,
      locale: r,
      status: s
    });
  },
  render({
    idOrSlug: t,
    locale: n,
    menuOnly: r,
    populate: i,
    rootPath: a,
    type: o = "FLAT",
    wrapRelated: s,
    status: c
  }) {
    const f = { $or: [{ documentId: t }, { slug: t }] }, l = r ? { menuAttached: !0 } : {};
    return this.renderType({
      type: o,
      criteria: f,
      itemCriteria: l,
      rootPath: a,
      wrapRelated: s,
      locale: n,
      populate: i,
      status: c
    });
  }
}), xE = ({
  checkData: e,
  parentItem: t
}) => new Promise((n, r) => {
  if (t && t.items) {
    for (let i of e)
      for (let a of t.items)
        if (a.path === i.path && a.id !== i.id && i.type === "INTERNAL" && !a.removed)
          return r(
            new Ct(
              `Duplicate path:${i.path} in parent: ${t.title || "root"} for ${i.title} and ${a.title} items`,
              {
                parentTitle: t.title,
                parentId: t.id,
                path: i.path,
                errorTitles: [i.title, a.title]
              }
            )
          );
  }
  return n();
}), cn = {
  navigation: {},
  "navigation-item": {}
}, SE = (e) => ({
  async getPluginStore() {
    return await strapi.store({ type: "plugin", name: "navigation" });
  },
  async mapToNavigationItemDTO({
    locale: t,
    master: n,
    navigationItems: r,
    parent: i,
    populate: a,
    status: o = "published"
  }) {
    const s = [], f = await (await this.getPluginStore()).get({
      key: "config"
    }).then(Te.configSchema.parse), l = await Promise.all(
      r.map(async (u) => {
        if (!u.related?.__type || !u.related.documentId)
          return u;
        const p = f.contentTypesPopulate[u.related.__type], h = await En({ strapi }, u.related.__type).findById(
          u.related.documentId,
          p,
          o,
          {
            locale: t
          }
        );
        return {
          ...u,
          related: {
            ...h,
            __type: u.related.__type,
            documentId: u.related.documentId
          }
        };
      })
    );
    for (const u of l) {
      const { items: p = [], ...d } = u;
      s.push({
        ...d,
        parent: i ?? d.parent,
        items: await this.mapToNavigationItemDTO({
          navigationItems: p,
          populate: a,
          master: n,
          parent: d,
          locale: t,
          status: o
        })
      });
    }
    return s;
  },
  setDefaultConfig() {
    return Wa({ strapi, forceDefault: !0 });
  },
  getBranchName({ item: t }) {
    const n = !!t.documentId, r = t.removed;
    if (n && !r)
      return "toUpdate";
    if (n && r)
      return "toRemove";
    if (!n && !r)
      return "toCreate";
  },
  async analyzeBranch({
    masterEntity: t,
    navigationItems: n = [],
    parentItem: r,
    prevAction: i = {}
  }) {
    const { toCreate: a, toRemove: o, toUpdate: s } = n.reduce(
      (l, u) => {
        const p = this.getBranchName({
          item: u
        });
        return p ? { ...l, [p]: [...l[p], u] } : l;
      },
      {
        toRemove: [],
        toCreate: [],
        toUpdate: []
      }
    ), c = {
      create: i.create || a.length > 0,
      update: i.update || s.length > 0,
      remove: i.remove || o.length > 0
    }, f = [...a, ...s];
    return await xE({
      checkData: f,
      parentItem: r
    }), Promise.all([
      this.createBranch({
        action: c,
        masterEntity: t,
        navigationItems: a,
        parentItem: r
      }),
      this.removeBranch({
        navigationItems: o,
        action: c
      }),
      this.updateBranch({
        action: c,
        masterEntity: t,
        navigationItems: s,
        parentItem: r
      })
    ]).then(([l, u, p]) => [...l, ...u, ...p]);
  },
  async removeBranch({
    navigationItems: t = [],
    action: n = {}
  }) {
    const r = [];
    for (const i of t)
      i.documentId && (n.remove = !0, await Pe(e).remove(i), r.push(n), i.items?.length && (await this.removeBranch({
        navigationItems: i.items
      })).forEach((o) => {
        r.push(o);
      }));
    return r;
  },
  async createBranch({
    action: t,
    masterEntity: n,
    navigationItems: r,
    parentItem: i
  }) {
    let a = [];
    for (const o of r) {
      t.create = !0;
      const { parent: s, master: c, items: f, documentId: l, id: u, ...p } = o, d = l && u ? {
        ...p,
        documentId: l,
        id: u,
        master: n ? n.id : void 0,
        parent: i ? i.id : void 0
      } : {
        ...p,
        documentId: void 0,
        id: void 0,
        master: n ? n.id : void 0,
        parent: i ? i.id : void 0
      }, h = await Pe(e).save({
        item: d,
        locale: n?.locale
      });
      if (o.items?.length) {
        const m = await this.createBranch({
          action: {},
          masterEntity: n,
          navigationItems: o.items,
          parentItem: h
        });
        a = a.concat(m).concat([t]);
      } else
        a.push(t);
    }
    return a;
  },
  async updateBranch({
    masterEntity: t,
    navigationItems: n,
    action: r,
    parentItem: i
  }) {
    const a = [];
    for (const o of n) {
      r.update = !0;
      const { documentId: s, updated: c, parent: f, master: l, items: u, ...p } = o;
      let d;
      c ? d = await Pe(e).save({
        item: {
          documentId: s,
          ...p
        },
        locale: t?.locale
      }) : d = o, u?.length ? (await this.analyzeBranch({
        navigationItems: u,
        prevAction: {},
        masterEntity: t,
        parentItem: d
      })).forEach((m) => {
        a.push(m);
      }) : a.push(r);
    }
    return a;
  },
  async emitEvent({ entity: t, event: n, uid: r }) {
    const i = strapi.getModel(r), a = await bd(
      {
        ...i,
        schema: i.__schema__,
        getModel: () => i
      },
      t
    );
    strapi.webhookRunner ? strapi.webhookRunner.eventHub.emit(n, {
      model: i.modelName,
      entry: a
    }) : console.warn("Webhook runner not present. Contact with Strapi Navigation Plugin team.");
  },
  async pruneCustomFields({ removedFields: t }) {
    const n = t.map(({ name: o }) => `additionalFields.${o}`), r = t.map(({ name: o }) => o), a = (await Pe(e).find({
      filters: {
        additionalFields: {
          $contains: [r]
        }
      }
    })).map(
      (o) => gn(o, n)
    );
    for (const o of a)
      await Pe(e).save({
        item: {
          documentId: o.documentId,
          additionalFields: o.additionalFields
        }
      });
  },
  async getSlug({ query: t }) {
    let n = Pu(t);
    if (n) {
      const r = await Pe(e).count({
        $or: [
          {
            uiRouterKey: {
              $startsWith: n
            }
          },
          { uiRouterKey: n }
        ]
      });
      r && (n = `${n}-${r}`);
    }
    return n.toLowerCase();
  },
  registerLifeCycleHook({ callback: t, contentTypeName: n, hookName: r }) {
    cn[n][r] || (cn[n][r] = []), cn[n][r]?.push(t);
  },
  async runLifeCycleHook({ contentTypeName: t, event: n, hookName: r }) {
    const i = cn[t][r] ?? [];
    for (const a of i)
      await a(n);
  },
  buildNestedStructure({
    navigationItems: t,
    id: n
  }) {
    return t?.reduce((r, i) => (n && i.parent?.id !== n || r.push({
      ...gn(i, ["related", "items"]),
      related: i.related,
      items: this.buildNestedStructure({
        navigationItems: t,
        id: i.id
      })
    }), r), []) ?? [];
  },
  async readLocale() {
    const t = strapi.plugin("i18n").service("locales");
    let n = await t.getDefaultLocale(), r = (await t.find({})).map(({ code: i }) => i).filter((i) => i !== n);
    return n || (n = r[0], r = r.slice(1)), {
      defaultLocale: n,
      restLocale: r
    };
  },
  updateConfigSchema: nl,
  updateCreateNavigationSchema: ol,
  updateNavigationItemAdditionalField: rl,
  updateNavigationItemCustomField: il,
  updateUpdateNavigationSchema: al
}), Fa = "navigations_items", $a = "related", AE = (e) => ({
  async migrateRelatedIdToDocumentId() {
    if (!await strapi.db.connection.schema.hasColumn(
      Fa,
      $a
    ))
      return;
    console.log("Navigation plugin :: Migrations :: Related id to document id - START");
    const n = Pe(e), r = await n.findV4({
      filters: {},
      limit: Number.MAX_SAFE_INTEGER
    });
    await Promise.all(
      r.map(async (i) => {
        const a = i.related;
        if (a && typeof a == "string") {
          const [o, s] = a.split(ul);
          if (!vu(parseInt(s, 10))) {
            const c = await e.strapi.query(o).findOne({ where: { id: s } });
            c && await n.save({
              item: {
                documentId: i.documentId,
                related: { __type: o, documentId: c.documentId }
              }
            });
          }
        }
      })
    ), await strapi.db.connection.schema.alterTable(Fa, (i) => {
      i.dropColumn($a);
    }), console.log("Navigation plugin :: Migrations :: Related id to document id - DONE");
  }
}), _E = {
  admin: vE,
  common: SE,
  client: bE,
  migrate: AE
}, XE = {
  bootstrap: zl,
  destroy: Yl,
  register: Ql,
  config: Yr,
  controllers: df,
  contentTypes: of,
  middlewares: hf,
  policies: mf,
  routes: vf,
  services: _E
};
export {
  XE as default
};
