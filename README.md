# html-to-paper-vue3-plugin
Based on npm package vue-html-to-paper (for vue 2)

### Using:
1. Copy file *VueHtmlToPaper.js* into your VUE 3 project.
2. In *main.js* add:
```
import VueHtmlToPaper from './plugins/VueHtmlToPaper';
...
app.use(VueHtmlToPaper)
...
``` 

3. Use in component:
```
print() {
      this.$htmlToPaper('elementToPrint', {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes',
        ],
        styles: [
          '/print.css',
        ],
      });
    },
```
