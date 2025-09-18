// Simple mock dataset
const customers = [
  {
    id: "cust_1",
    name: "kevin",
    phone: "+1 (555) 123-4567",
    orderId: "ORD-1001",
    tags: ["Repeat Buyer"]
  },
  {
    id: "cust_2",
    name: "Taylor",
    phone: "+44 7700 900123",
    orderId: "ORD-1002",
    tags: []
  }
];

const chats = [
  {
    id: "chat_1",
    customerId: "cust_1",
    lastMessage: "Thanks! When will it ship?",
    lastTimestamp: Date.now() - 1000 * 60 * 60,
    unreadCount: 2,
    messages: [
      { id: "m1", from: "customer", text: "Hi, I want to check my order.", time: Date.now() - 1000 * 60 * 60 * 2, read: true },
      { id: "m2", from: "agent", text: "Sure — what's your order ID?", time: Date.now() - 1000 * 60 * 60 * 1.7, read: true },
      { id: "m3", from: "customer", text: "ORD-1001", time: Date.now() - 1000 * 60 * 60 * 1.1, read: false },
      { id: "m4", from: "customer", text: "Thanks! When will it ship?", time: Date.now() - 1000 * 60 * 30, read: false }
    ]
  },
  {
    id: "chat_2",
    customerId: "cust_2",
    lastMessage: "Can you confirm the color?",
    lastTimestamp: Date.now() - 1000 * 60 * 60 * 24,
    unreadCount: 0,
    messages: [
      { id: "m5", from: "customer", text: "Is the blue in stock?", time: Date.now() - 1000 * 60 * 60 * 24, read: true },
      { id: "m6", from: "agent", text: "Yes, blue and red", time: Date.now() - 1000 * 60 * 60 * 23.8, read: true }
    ]
  }
];

export { chats as defaultChats, customers };
