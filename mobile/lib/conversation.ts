import { ConversationType } from "./convTypes";

export const conversations: ConversationType[] = [
  {
    id: 1,
    user: {
      name: "Sarah Brown",
      username: "sarah_b",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80",
      verified: true,
    },
    lastMessage: "Sure! Let me check and send you the details.",
    time: "2m ago",
  },
  {
    id: 2,
    user: {
      name: "Daniel Roberts",
      username: "daniel.r",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
      verified: false,
    },
    lastMessage: "Thanks! Appreciate your help 👌",
    time: "14m ago",
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      username: "emma.w",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=400&q=80",
      verified: true,
    },
    lastMessage: "Can you send the file again?",
    time: "1h ago",
  },
  {
    id: 4,
    user: {
      name: "Mike Johnson",
      username: "mikej",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
      verified: false,
    },
    lastMessage: "I'll call you in 5 minutes.",
    time: "3h ago",
  },
  {
    id: 5,
    user: {
      name: "Alicia Keys",
      username: "alicia.k",
      avatar:
        "https://images.unsplash.com/photo-1531251445707-1f000e1e87de?w=400&q=80",
      verified: true,
    },
    lastMessage: "Perfect! Let’s meet tomorrow.",
    time: "Yesterday",
  },
  {
    id: 6,
    user: {
      name: "Jason Hunt",
      username: "jasonhunt",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80",
      verified: false,
    },
    lastMessage: "I’ll update you soon.",
    time: "Tue",
  },
];
