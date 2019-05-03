events = [];

module.exports = {
  events: () => {
    return events;
  },
  createEvent: args => {
    const { title, description, price } = args.eventInput;
    const event = {
      _id: Math.random().toString(),
      title,
      description,
      price: parseFloat(price),
      date: new Date().toISOString()
    };
    events.push(event);
    return event;
  }
};
