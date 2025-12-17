// document.body を返す関数
store.common.create = ({data = {}, func = {}, components = {}, template = ""}) => { // 必ず1つタグにまとめる。
  // 引数に渡したcomponents からコンポーネントを取り出してtemplate に組み込む処理が欲しい。
  // .tagName でとれる名前は全部大文字になっている。変数にハイフン使えない
  // key をUpperにする処理を挟んでおく
  const keyedComponent = Object.fromEntries( // 二重配列からオブジェクトを作る関数
    Object.keys(components).map(key => [key.toUpperCase(), components[key]])
  );

  const insertComponent = (doc) => {
    [...doc.children].forEach(elm => {
      if (keyedComponent[elm.tagName] != undefined) {
        // すべての属性とその値を取り出し、key:value の形に。
        const attrMaped = Object.fromEntries([...elm.attributes].map(x => {
          if (elm.getAttribute(x.name)) {
            const val = elm.getAttribute(x.name).trim();
            elm.removeAttribute(x.name); // 外側の属性は外す。
            return [x.name, val];
          } else {
            elm.removeAttribute(x.name);
          }
        }));
        
        if (attrMaped.childtext == undefined) {
          attrMaped.childtext = elm.textContent || "";
        }

        // prop がある場合、該当のref と置き換える。
        if (attrMaped.prop != undefined) {
          attrMaped.prop = data[attrMaped.prop];
        }
        console.log(attrMaped)
        
        elm.innerHTML = ""; 
        elm.append(keyedComponent[elm.tagName](attrMaped));
      } else if (elm.children.length > 0) {
        insertComponent(elm);
      }
    })

    return doc;
  }

  // タグのみを再帰的に見ていき、イベントがあれば登録していく。
  const tagFunc = (doc) => {
    [...doc.children].forEach(elm => {
      // 文字列が登録されているイベントを取り出してそれぞれ関数をバインド
      [...elm.attributes].filter(x => x.name.match(/on.*/) != null).forEach(event => {
        if (elm.getAttribute(event.name)) {
          const key = elm.getAttribute(event.name).trim();
          elm.removeAttribute(event.name);
          elm[event.name] = func[key] || "none";
        }
      });
      if (elm.children.length > 0) {
        tagFunc(elm);
      }
    });

    return doc;
  };

  // 再帰的にマスタッシュ構文のref を見つけて、更新関数を入れていく。
  const mustache = (doc) => {
    [...doc.childNodes].forEach(node => {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          // タグ要素なら再帰的に処理する。
          mustache(node);
          break;
        case Node.TEXT_NODE:
          // マスタッシュ構文が見つからないなら処理を抜ける。
          if (node.textContent.match(/{{.*}}/) == null) break;

          // マスタッシュ構文とそれ以外で分ける。
          const splited = node.textContent.match(/({{.*}}|[^{{.*}}]*)/g);
          
          // マスタッシュ構文を該当する ref オブジェクトと入れ替える。
          const maped = splited.map(elm => {
            return elm.match(/{{.*}}/) != null
              ? data[elm.replace(/({{|}})/g, "").trim()]
              : elm;
          });
          
          // マスタッシュ構文で書かれているところのリストを作る。重複も含める。
          const mustaches = node.textContent.match(/{{.*}}/g).map(m => m.replace(/({{|}})/g, "").trim());
          // 取り出したものを重複なくし、それぞれのeffect に innerHTML 更新の関数を入れる。
          [...new Set(mustaches)].forEach(key => {
            if (data[key] == undefined) {
              console.log("ref notfound", data, key);
              return;
            }
            data[key].effect = () => {
              node.textContent = maped.map(elm => 
                typeof elm === "object" 
                ? elm.value 
                : elm
              ).join("");
            }
          })
          break;
      }
    });

    return doc;
  }

  // v-bind:, : がついている属性についてリアクティブに値を変更する。
  const bindAttr = (doc) => {
    [...doc.children].forEach(elm => {
      // バインド属性を取り出し、一つずつ処理。
      [...elm.attributes].filter(x => x.name.match(/(v-bind:.*|:.*)/) != null).forEach(bind => {
        const val = bind.value.replace(/(\w+)/g, '"$1"');
        const jsoned = (() => {
          try {
            return JSON.parse(val);
          } catch (e) {
            console.log("JSON.parse error. Value is :", val);
            console.log("error is : ", e);
            return {};
          }
        })();
        // bind.name = {attrValue: booleanRef}
        elm.removeAttribute(bind.name);
        console.log(jsoned)
        Object.keys(jsoned).forEach(key => {
          data[jsoned[key]].effect = () => {
            const attrName = bind.name.replace(/(v-bind:|:)/, "");
            console.log(elm.getAttribute(attrName))
            const attrVal = elm.getAttribute(attrName) || "";
            if (data[jsoned[key]].value) {
              const splited = attrVal.split(" ");
              splited.push(key);
              const seted = [...new Set(splited)].join(" ").trim();
              elm.setAttribute(attrName, seted);
            } else {
              const replaced = attrVal.replace(key, "");
              elm.setAttribute(attrName, replaced)
            }
          }
        });
      });
      if (elm.children.length > 0) {
        bindAttr(elm);
      }
    });

    return doc;
  }

  const doc = new DOMParser().parseFromString(template, "text/html"); // タグ内の改行空白は除去される
  doc.body.innerHTML = doc.body.innerHTML.split("\n").map(x => x.trim()).join(""); // タグ外の余計な空白改行を削除。
  const insered = insertComponent(doc);
  const funced = tagFunc(insered);
  const mustached = mustache(funced);
  const binded = bindAttr(mustached);
  return binded.body.children[0];
}