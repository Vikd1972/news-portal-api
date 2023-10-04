type ServerToClientEventsType = {
  changeNews: (
    option: {
      newsid: number,
      title: string
      dateOfCange: Date,
      user: {
        userId: number;
        firstName: string;
        lastName: string;
        email: string;
      };
    }
  ) => void;
}

type ClientToServerEventsType = {
  changeNews: (
    option: {
      newsid: number,
      title: string
      dateOfCange: Date,
      user: {
        userId: number;
        firstName: string;
        lastName: string;
        email: string;
      };
    }
  ) => void;
}

export {
  ServerToClientEventsType,
  ClientToServerEventsType,
};
