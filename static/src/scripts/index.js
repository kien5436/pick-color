import '../images/favicon.ico';
import 'bulma/css/bulma';
import '@fortawesome/fontawesome-free/css/all';
import '../styles/index.css';
import App from './App';
import { createApp } from 'vue';
import router from './router';

// eslint-disable-next-line newline-per-chained-call
createApp(App).use(router).mount('#vue');