<script lang="ts">
import { h } from "vue";

export default {
  name: "HtmlComment",
  props: {
    text: {
      type: String,
      required: true,
    },
    showDev: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    // @ts-expect-error Because vite/client is not imported in deno
    if (this.showDev && import.meta.env.MODE === "development") {
      // Use textContent instead of innerHTML to prevent XSS
      return h("span", this.text);
    }
    // For production, create actual comment node (not visible in DOM)
    // Comments don't render visually, so we create a comment node
    return h({
      name: "Comment",
      render: () => {
        if (typeof document !== "undefined") {
          const comment = document.createComment(` ${this.text} `);
          return comment;
        }
        return null;
      },
    });
  },
};
</script>
