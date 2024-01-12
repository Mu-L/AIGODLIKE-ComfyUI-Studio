import { app } from "../../../../scripts/app.js";
function enterLoader() {
  window.removeEventListener("message", message);
  const html = `<iframe id="loader_iframe" src="./extensions/AIGODLIKE-COMFYUI-TRANSLATION/web/index.html" frameborder="0">
  </iframe>`;
  document.body.insertAdjacentHTML("beforeend", html);

  window.addEventListener("message", message);
}

function message(event) {
  if (event.data.type === "close_loader_page") {
    document.body.removeChild(document.getElementById("loader_iframe"));
  }
}

const ext = {
  name: "AIGODLIKE.MMM",
  async init(app) {
    // Any initial setup to run as soon as the page loads
    /* 定义style:
      <style type="text/css">
      iframe {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: #000000;
      }
    
      .cs {
        position: absolute;
        left: 0;
        right: 0;
        width: 5vw;
        height: 5vw;
        background: #00ffff;
      }
      </style>
    */
    const style = document.createElement("style");
    style.type = "text/css"; // 已启用 需要更改
    style.innerHTML = `
      iframe {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: #000000;
      }
      .cs {
        position: absolute;
        left: 0;
        right: 0;
        width: 5vw;
        height: 5vw;
        background: #00ffff;
      }
    `;
    document.head.appendChild(style);
    // 在当前页面添加一个按钮
    const html = `<button type="button" class="cs">加载器</button>`;
    document.body.insertAdjacentHTML("beforeend", html);
    // 设置按钮button绑定的事件 为enterLoader()
    document.querySelector(".cs").addEventListener("click", enterLoader);
  },
  async setup(app) {},
  async addCustomNodeDefs(defs, app) {
    // Add custom node definitions
    // These definitions will be configured and registered automatically
    // defs is a lookup core nodes, add yours into this
    // console.log("[logging]", "add custom node definitions", "current nodes:", Object.keys(defs));
  },
  async getCustomWidgets(app) {
    // Return custom widget types
    // See ComfyWidgets for widget examples
    // console.log("[logging]", "provide custom widgets");
  },
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    // Run custom logic before a node definition is registered with the graph
    // console.log("[logging]", "before register node: ", nodeType.comfyClass);
    // This fires for every node definition so only log once
    // applyNodeTranslationDef(nodeType, nodeData);
    // delete ext.beforeRegisterNodeDef;
  },
  async registerCustomNodes(app) {
    // Register any custom node implementations here allowing for more flexability than a custom node def
    // console.log("[logging]", "register custom nodes");
  },
  loadedGraphNode(node, app) {},
  nodeCreated(node, app) {},
};

app.registerExtension(ext);