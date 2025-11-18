import "./style/reset.css";
import "./style/style.css";
import { createApp } from "vue";
import App from "./vue/App.vue";

const app = createApp(App);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err);
  console.error('Error info:', info);
  console.error('Component instance:', instance);

  // In production, you might want to send this to an error tracking service
  // Example: Sentry.captureException(err);
};

// Global warning handler (development only)
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue warning:', msg);
  console.warn('Warning trace:', trace);
};

app.mount("#app");
