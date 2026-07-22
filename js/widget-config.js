import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://zeidalsuleiman.app.n8n.cloud/webhook/6629444f-3990-47ba-9e33-45b117ac9f90/chat',
  mode: 'window',
  showWelcomeScreen: true,
  initialMessages: [
    'Hi there! 👋',
    'Welcome to TheChefz support. How can I help you today?'
  ],
  i18n: {
    en: {
      title: 'The Chefz Support',
      subtitle: "We're here to help!",
      footer: '',
      getStarted: 'New Conversation',
      inputPlaceholder: 'Type your question...',
    },
  },
});
