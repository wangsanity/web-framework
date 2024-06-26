(function () {
  const cachedTranslations = {
    'Hello i18n!': '[Hello i18n!]',
    'I don\'t output any element': '[I don\'t output any element]',
    'Updated just now': '[Updated just now]',
    'The author is female': '[The author is female]',
    'Updated: just now': '[Updated: just now]'
  };
  const allNodes = [];
  const translateKey = 'translated';

  const findNodeChildren = function (node) {
    if (node.hasAttribute && node.hasAttribute('no-translate')) {
        return;
    }

    if (node.getAttribute && !node.getAttribute(translateKey)) {
        node.setAttribute(translateKey, true);
        const attrKey = (node.nodeName === 'INPUT' ? 'value' : 'innerText');
        const text = node[attrKey];
        const translatedText = text && cachedTranslations[text];
        if (translatedText) {
            node[attrKey] = translatedText
        }
    } else if (node.nodeType === 3 && cachedTranslations[node.textContent]){
        node.textContent = cachedTranslations[node.textContent];
    }
  };

  const observer = new MutationObserver(function (mutationsList) {
    let newNodesCount = 0;
    const removeNode = function (node) {
      let index = allNodes.findIndex((existNode) => existNode === node);
      if (index > -1) {
        allNodes.splice(index, 1);
        return;
      }
      if (node.children && node.children.length > 0) {
        for (let item of node.children) {
          removeNode(item);
        }
      }
    };

    for (let mutation of mutationsList) {
      for (let node of mutation.addedNodes) {
        newNodesCount += findNodeChildren(node);
      }
      for (let node of mutation.removedNodes) {
        removeNode(node);
      }
    }

    if (newNodesCount > 0) {
      // callAPIDebounce();
    }
  });

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
    characterData: true,
  });
})();
