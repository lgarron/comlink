Comlink.transferHandlers.set("event", {
  canHandle(obj) {
    return obj instanceof Event;
  },
  serialize(obj) {
    return [
      {
        targetId: obj?.target?.id,
        targetClassList: obj?.target?.classList && [...obj.target.classList],
        detail: obj?.detail,
      },
      [],
    ];
  },
  deserialize(obj) {
    return obj;
  },
});
