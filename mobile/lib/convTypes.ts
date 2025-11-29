export type ConversationType = {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  lastMessage: string;
  time: string;
};
