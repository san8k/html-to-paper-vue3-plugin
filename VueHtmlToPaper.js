function addStyles(win, styles) {
  styles.forEach((style) => {
    const link = win.document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', style);
    win.document.getElementsByTagName('head')[0].appendChild(link);
  });
}

const VueHtmlToPaper = {
  install(app, options = {}) {
    // eslint-disable-next-line
    app.config.globalProperties.$htmlToPaper = (
      el,
      localOptions,
      cb = () => true,
    ) => {
      const defaultName = '_blank';
      const defaultSpecs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'];
      const defaultReplace = true;
      const defaultStyles = [];
      let {
        name = defaultName,
        specs = defaultSpecs,
        replace = defaultReplace,
        styles = defaultStyles,
      } = options;
      // If has localOptions
      if (localOptions) {
        if (localOptions.name) name = localOptions.name;
        if (localOptions.specs) specs = localOptions.specs;
        if (localOptions.replace) replace = localOptions.replace;
        if (localOptions.styles) styles = localOptions.styles;
      }

      specs = specs.length ? specs.join(',') : '';

      const element = window.document.getElementById(el);

      if (!element) {
        return;
      }

      const url = '';
      const win = window.open(url, name, specs, replace);

      win.document.write(`
          <html>
            <head>
              <title>${window.document.title}</title>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);

      addStyles(win, styles);

      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
        cb();
      }, 1000);
      // eslint-disable-next-line
      return true;
    };
  },
};

export default VueHtmlToPaper;
