import { HopeIcon, Layout, NotFound, injectDarkmode, setupDarkmode, setupSidebarItems, scrollPromise } from "/Users/shuaimeng/Workspace/loca-boot/node_modules/vuepress-theme-hope/lib/client/export.js";

import { defineCatalogInfoGetter } from "/Users/shuaimeng/Workspace/loca-boot/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"

import "/Users/shuaimeng/Workspace/loca-boot/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/shuaimeng/Workspace/loca-boot/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/shuaimeng/Workspace/loca-boot/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/shuaimeng/Workspace/loca-boot/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.t;
  const shouldIndex = meta.I !== false;
  const icon = meta.i;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.O,
    index: meta.I,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);


  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,

  }
};
